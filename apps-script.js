/**
 * apps-script.js — NM FAST backend (Google Apps Script web app)
 *
 * Deploy this as a Web App under the NM FAST G-Suite account:
 *   - Execute as: Me (cmurguia@nmsu.edu or service account)
 *   - Who has access: Anyone (even anonymous)
 *
 * The deployed /exec URL goes into data.js as SHEETS_ENDPOINT.
 *
 * Frontend POSTs JSON (Content-Type: text/plain to avoid CORS preflight)
 * with one of these `kind` values:
 *
 *   newsletter         -> { kind, email, ts }
 *   survey             -> { kind, ts, answers, recommendations }
 *   larta-apply        -> { kind, ts, answers }
 *   microgrant-apply   -> { kind, ts, answers }
 *   travel-apply       -> { kind, ts, answers }
 *
 * Each kind appends a row to its own tab in the master Sheet.
 * The script also fires an email notification to cmurguia@nmsu.edu
 * for every submission (newsletter signups are batched daily — see
 * onTimeDrivenNewsletterDigest below).
 */

const MASTER_SHEET_ID = 'REPLACE_WITH_GOOGLE_SHEET_ID';
const NOTIFY_EMAIL    = 'cmurguia@nmsu.edu';

// Tab name + header row per kind. Order matters — header order = column order.
const SCHEMA = {
  'newsletter': {
    tab: 'Newsletter',
    headers: ['Timestamp', 'Email'],
    row: (p) => [p.ts, p.email],
    notify: false, // batched
  },
  'survey': {
    tab: 'Match Survey',
    headers: ['Timestamp', 'Name', 'Email', 'Company', 'County', 'Sector',
              'Stage', 'Agency', 'First Time', 'Timeline', 'Needs',
              'Demographics', 'Description', 'Recommendations'],
    row: (p) => {
      const a = p.answers || {};
      return [
        p.ts, a.name || '', a.email || '', a.company || '',
        a.county || '', a.sector || '', a.stage || '', a.agency || '',
        a.firstTime || '', a.timeline || '',
        (a.needs || []).join(', '),
        (a.demographics || []).join(', '),
        a.description || '',
        (p.recommendations || []).join(', '),
      ];
    },
    notify: true,
    notifySubject: (p) => 'NM FAST · New match survey from ' + ((p.answers && p.answers.name) || 'unknown'),
  },
  'larta-apply': {
    tab: 'Larta Applications',
    headers: ['Timestamp', 'Name', 'Email', 'Company', 'County', 'Sector',
              'Stage', 'Cohort', 'Description', 'Demographics',
              'Referral source', 'Referral details'],
    row: (p) => {
      const a = p.answers || {};
      return [
        p.ts, a.name || '', a.email || '', a.company || '', a.county || '',
        a.sector || '', a.stage || '', a.cohort || '',
        a.description || '',
        (a.demographics || []).join(', '),
        a.referral_source || '', a.referral_other || '',
      ];
    },
    notify: true,
    notifySubject: (p) => 'NM FAST · Larta application from ' + ((p.answers && p.answers.name) || 'unknown'),
  },
  'microgrant-apply': {
    tab: 'Micro-grant Applications',
    headers: ['Timestamp', 'Name', 'Email', 'Company', 'County',
              'Amount', 'Use of Funds', 'Target Deadline', 'Demographics',
              'Referral source', 'Referral details'],
    row: (p) => {
      const a = p.answers || {};
      return [
        p.ts, a.name || '', a.email || '', a.company || '', a.county || '',
        a.amount || '', a.useOfFunds || '', a.targetDeadline || '',
        (a.demographics || []).join(', '),
        a.referral_source || '', a.referral_other || '',
      ];
    },
    notify: true,
    notifySubject: (p) => 'NM FAST · Micro-grant application from ' + ((p.answers && p.answers.name) || 'unknown'),
  },
  'travel-apply': {
    tab: 'Travel Stipend Applications',
    headers: ['Timestamp', 'Name', 'Email', 'Company', 'County',
              'Conference', 'Conference Date', 'Rationale', 'Demographics',
              'Referral source', 'Referral details'],
    row: (p) => {
      const a = p.answers || {};
      return [
        p.ts, a.name || '', a.email || '', a.company || '', a.county || '',
        a.conferenceName || '', a.conferenceDate || '', a.rationale || '',
        (a.demographics || []).join(', '),
        a.referral_source || '', a.referral_other || '',
      ];
    },
    notify: true,
    notifySubject: (p) => 'NM FAST · Travel stipend application from ' + ((p.answers && p.answers.name) || 'unknown'),
  },
};

// ---- Web app entry point ----

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const schema = SCHEMA[payload.kind];
    if (!schema) {
      return jsonResponse({ ok: false, error: 'unknown kind: ' + payload.kind });
    }

    const sheet = getOrCreateTab(schema.tab, schema.headers);
    sheet.appendRow(schema.row(payload));

    // Auto-enroll all submitters in the newsletter (except newsletter form itself).
    if (payload.kind !== 'newsletter') {
      const email = payload.answers && payload.answers.email;
      if (email) {
        try {
          const nl = getOrCreateTab(SCHEMA.newsletter.tab, SCHEMA.newsletter.headers);
          nl.appendRow([payload.ts, email]);
        } catch (err) { /* swallow */ }
      }
    }

    if (schema.notify) {
      const subject = schema.notifySubject(payload);
      const body = 'New ' + payload.kind + ' submission:\n\n' +
                   JSON.stringify(payload, null, 2);
      try { MailApp.sendEmail(NOTIFY_EMAIL, subject, body); } catch (err) {}
    }

    return jsonResponse({ ok: true, kind: payload.kind });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'NM FAST backend', kinds: Object.keys(SCHEMA) });
}

// ---- Helpers ----

function getOrCreateTab(name, headers) {
  const ss = SpreadsheetApp.openById(MASTER_SHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- Daily newsletter digest (optional time-driven trigger) ----
//
// To wire this up: Triggers → Add Trigger → onTimeDrivenNewsletterDigest,
// time-driven, daily, 7am. Sends a single email summarizing new signups.
function onTimeDrivenNewsletterDigest() {
  const ss = SpreadsheetApp.openById(MASTER_SHEET_ID);
  const sheet = ss.getSheetByName(SCHEMA.newsletter.tab);
  if (!sheet) return;
  const since = new Date(); since.setDate(since.getDate() - 1);
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
  const recent = data.filter(r => r[0] && new Date(r[0]) >= since);
  if (recent.length === 0) return;
  const lines = recent.map(r => r[1]).join('\n');
  MailApp.sendEmail(NOTIFY_EMAIL,
    'NM FAST · ' + recent.length + ' new newsletter signups',
    'Yesterday\'s signups:\n\n' + lines);
}

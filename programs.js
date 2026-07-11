// programs.js — filterable program list with expandable detail blocks
(function () {
  const D = window.NMFAST_DATA;
  const listEl = document.getElementById('program-list');
  const filters = { stage: 'all', sector: 'all' };

  // Long-form details per program — edit here to update detail content.
  const DETAIL = {
    'acsa': {
      blurb: `The Arrowhead Center SBIR Accelerator (ACSA) is our flagship intensive. Three cohorts each year, each tailored to a different agency portfolio and stage of the SBIR/STTR journey.`,
      schedule: `Three cohorts per year — apply by 1 week before each start:
· Space &amp; Aerospace · apply by Jun 2 · starts Jun 9 — led by LARTA. NASA, Space Force, and related agencies. 10–12 weeks.
· Commercialization Bridge II–III · apply by Jul 1 · starts Jul 8 — led by Santa Fe Business Incubator. Phase II → Phase III transition, federal procurement, revenue generation. 4–5 weeks.
· DOE/Energy · apply by Sep 15 · starts Sep 22 — led by Timothy G. George, P.E. DOE SBIR/STTR focus. 10 weeks + wrap-up.`,
      whoFor: 'First-time and repeat SBIR applicants. Strong fit for teams targeting DOE, NASA, Space Force, or transitioning Phase II → Phase III.',
      whatYouGet: [
        'Weekly cohort sessions with expert-led content',
        '1-on-1 reviews of draft technical + commercial narratives',
        'Dedicated agency coaching aligned to each cohort',
        'Access to NM-based mentor network',
        'Submission-week support',
      ],
      apply: 'Rolling applications. Priority given to applicants who\'ve completed SBIR 101 or the match survey.',
      cta: { label: 'Apply to next cohort', href: 'apply.html' },
    },
    'larta': {
      blurb: `NM FAST partners with Larta Institute — the national SBIR commercialization training partner that has supported 3,000+ SBIR awardees — to run two NM-only cohorts each year.`,
      schedule: `Two cohorts per year, 8–12 weeks each, up to 20 companies per cohort.
Cohort 1: apply by May 1 · starts May 7
Cohort 2: apply by Jul 30 · starts Aug 6`,
      whoFor: 'Phase 0 founders preparing a first commercialization plan; Phase I winners building the Phase II plan; Phase II teams refining commercialization strategy.',
      whatYouGet: [
        'Structured workshops on SBIR commercialization',
        '1-on-1 PAIR advisor coaching',
        'Phase I application review',
        'Phase II commercialization plan review',
        'Market research report access',
        'Larta Library — 100+ archived webcasts',
      ],
      apply: 'Apply directly via the Larta application form. We review applications on a rolling basis.',
      cta: { label: 'Apply to Larta →', href: 'larta-apply.html' },
    },
    'workshops': {
      blurb: `Open-enrollment SBIR training delivered statewide and online. Two foundational SBIR 101 sessions anchor the year, and four agency-specific workshops drill into proposal requirements and review criteria.`,
      schedule: 'Six total sessions per year. SBIR 101: Spring + Fall. Topic workshops on cybersecurity, federal agency navigation, and more.',
      whoFor: 'Anyone — no application required. Especially valuable for first-timers or founders picking an agency.',
      whatYouGet: [
        'Free live sessions (in-person + Zoom)',
        'Recordings available after the fact',
        'Downloadable slides and checklists',
        'Q&amp;A with NM FAST staff and agency reps',
      ],
      apply: 'Free registration on the Calendar page. No screening.',
      cta: { label: 'See upcoming dates', href: 'calendar.html' },
    },
    'office-hours': {
      blurb: `The fastest way to get SBIR feedback in New Mexico. Book a 30-minute slot with one of our SBIR experts. Bring a rough draft, a budget question, a topic you're choosing between, or just an idea. No topic is too basic.`,
      schedule: 'Weekly · by appointment, year-round.',
      whoFor: 'Anyone at any stage. Unfiltered, no application.',
      whatYouGet: [
        '30 focused minutes with an SBIR expert',
        'Follow-up notes and resource links',
        'Optional hand-off into a longer program if it\'s a fit',
      ],
      apply: 'Book directly with John Waller, NM FAST Program Manager, using the link above. Available year-round.',
      cta: { label: 'Book a session →', href: 'https://nmfastmeetingscheduling.as.me/schedule/3516e259/appointment/47287547/calendar/8449404?calendarIds=8449404' },
    },
    'matching-grant': {
      blurb: `The NMEDD SBIR Matching Grant provides state-level matching funds to NM companies that win a federal SBIR/STTR award. NM FAST runs two dedicated information and training sessions each year to walk applicants through the process.`,
      schedule: 'Two info sessions per year — Spring (Jun 2) and Fall (Sep 24).',
      whoFor: 'NM companies with a Phase I or Phase II award in hand (or mid-application).',
      whatYouGet: [
        '2-hour info + training session',
        'State application walkthrough',
        '1-on-1 follow-up on request',
        'Referrals to NMEDD staff',
      ],
      apply: 'Attend a session or email us to be added to the waitlist.',
      cta: { label: 'Register for next session', href: 'calendar.html' },
    },
    'microgrants': {
      blurb: `Small direct grants up to $2,000 that unblock a submission. Use them for proposal editing, graphics, registration fees, travel, or any other cost that would otherwise delay or prevent an application. Priority for underserved and first-time applicants.`,
      schedule: 'Rolling. Apply anytime; reviewed weekly.',
      whoFor: 'NM-based SBIR applicants preparing a Phase 0 or Phase I submission.',
      whatYouGet: [
        'Up to $2,000 in non-dilutive support',
        'Fast review (typically &lt;1 week)',
        'Flexible use — editors, graphics, fees, travel',
      ],
      apply: 'Apply directly via the micro-grant application form.',
      cta: { label: 'Request a micro-grant', href: 'microgrant-apply.html' },
    },
    'travel': {
      blurb: `Two stipends per year to send NM founders to the National SBIR Innovation Summit and similar federal conferences. Priority for underserved and rural applicants who would not otherwise be able to attend.`,
      schedule: 'Announced 6–8 weeks before each target conference.',
      whoFor: 'NM founders already active in SBIR — attending the right conference is high-leverage.',
      whatYouGet: [
        'Travel + registration stipend',
        'Conference prep session before the event',
        'Debrief and connection support after',
      ],
      apply: 'Apply directly via the travel stipend application form.',
      cta: { label: 'Apply for a stipend', href: 'travel-apply.html' },
    },
    'los-alamos-makers': {
      blurb: `Los Alamos Makers is NM FAST's prototyping partner in northern New Mexico. For teams whose proposals hinge on a working demo, LAM provides access to shop space, biotech wet lab, tooling, and community-based technical expertise.`,
      schedule: 'Open-access on project-dependent timelines.',
      whoFor: 'Hardware-heavy teams who need a prototype or demo to strengthen their proposal.',
      whatYouGet: [
        'Access to Los Alamos Makers facilities',
        'Biotech wet lab access',
        'Community mentors with deep technical expertise',
        'Project-specific scoping before you start',
      ],
      apply: 'By referral from NM FAST. Take the match survey and flag prototyping need.',
      cta: { label: 'Request a prototyping intro', href: 'apply.html' },
    },
    'sfbi': {
      blurb: `The Commercialization Bridge program — operated by Santa Fe Business Incubator (SFBI) — is a 4–5 week high-touch pilot for NM companies transitioning from Phase II R&D into Phase III commercialization, federal procurement, and revenue generation.`,
      schedule: 'Cohort starts Jul 8. 4–5 weeks.',
      whoFor: 'NM companies with a Phase II award, ready to push into Phase III.',
      whatYouGet: [
        'Phase III commercialization roadmap',
        'Federal procurement readiness coaching',
        'Revenue and customer development support',
        'Direct line to NMEDD and federal program managers',
      ],
      apply: 'Apply via the match survey or email us — limited to 6–10 companies.',
      cta: { label: 'Apply to the Bridge', href: 'apply.html' },
    },
  };

  const stageLabel = {
    'pre-sbir': 'Pre-SBIR',
    'phase-0': 'Phase 0',
    'phase-1': 'Phase I',
    'phase-2': 'Phase II',
  };

  function render() {
    listEl.innerHTML = '';
    const filtered = D.programs.filter(p => {
      if (filters.stage !== 'all' && !p.stage.includes(filters.stage)) return false;
      if (filters.sector !== 'all' && !p.sectors.includes(filters.sector)) return false;
      return true;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="empty">No programs match this combo yet. Try loosening a filter, or <a href="apply.html">ask us directly</a>.</div>`;
      return;
    }

    filtered.forEach(p => {
      const d = DETAIL[p.id] || {};
      const nextDl = p.deadlines && p.deadlines[0];
      const nextStr = nextDl
        ? new Date(nextDl.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Rolling';
      const stagePills = p.stage.map(s => `<span class="pill">${stageLabel[s] || s}</span>`).join('');

      const article = document.createElement('article');
      article.className = 'program-detail';
      article.id = p.id;
      article.innerHTML = `
        <header class="pd-header">
          <div class="pd-meta">
            <div class="pd-agency">${p.agency}</div>
            <div class="pd-pills">${stagePills}</div>
          </div>
          <h2 class="h2">${p.title}</h2>
          <p class="pd-blurb">${d.blurb || p.shortDesc}</p>
        </header>
        <div class="pd-grid">
          <div class="pd-col pd-facts">
            <div class="fact">
              <div class="fact-label">Cost</div>
              <div class="fact-value">${p.cost}</div>
            </div>
            <div class="fact">
              <div class="fact-label">Duration</div>
              <div class="fact-value">${p.duration}</div>
            </div>
            <div class="fact">
              <div class="fact-label">Seats</div>
              <div class="fact-value">${p.seats}</div>
            </div>
            <div class="fact">
              <div class="fact-label">Next</div>
              <div class="fact-value">${nextStr}</div>
            </div>
          </div>
          <div class="pd-col pd-body">
            ${d.schedule ? `<div class="pd-block"><div class="pd-label">Schedule</div><p style="white-space: pre-line;">${d.schedule}</p></div>` : ''}
            ${d.whoFor ? `<div class="pd-block"><div class="pd-label">Who it's for</div><p>${d.whoFor}</p></div>` : ''}
            ${d.whatYouGet ? `<div class="pd-block"><div class="pd-label">What you get</div><ul>${d.whatYouGet.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}
            ${d.apply ? `<div class="pd-block"><div class="pd-label">How to apply</div><p>${d.apply}</p></div>` : ''}
          </div>
        </div>
        <footer class="pd-footer">
          <a href="${(d.cta && d.cta.href) || 'apply.html'}" class="btn btn-primary">${(d.cta && d.cta.label) || 'Apply or learn more'} →</a>
          <a href="calendar.html" class="btn btn-ghost">See in calendar</a>
        </footer>
      `;
      listEl.appendChild(article);
    });
  }

  document.querySelectorAll('.chips').forEach(group => {
    const kind = group.dataset.filterGroup;
    group.addEventListener('click', e => {
      const btn = e.target.closest('.chip'); if (!btn) return;
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      filters[kind] = btn.dataset.val;
      render();
    });
  });

  render();

  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) setTimeout(() => {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 200);
  }
})();

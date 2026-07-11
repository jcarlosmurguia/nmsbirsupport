// home.js — next-deadline card + programs grid (homepage only)
(function () {
  const D = window.NMFAST_DATA;
  if (!document.getElementById('deadline-date') || !document.getElementById('programs-grid')) return;

  // Use today's date (start of day) for filtering upcoming events
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcoming = [];
  D.programs.forEach(p => {
    (p.deadlines || []).forEach(dl => {
      const d = new Date(dl.date + 'T00:00:00');
      if (d >= now) upcoming.push({ date: d, dateStr: dl.date, label: dl.label, program: p });
    });
  });
  D.events.forEach(e => {
    const d = new Date(e.date + 'T00:00:00');
    if (d >= now && e.programId) {
      const p = D.programs.find(x => x.id === e.programId);
      if (p) upcoming.push({ date: d, dateStr: e.date, label: e.title, program: p });
    }
  });
  upcoming.sort((a, b) => a.date - b.date);

  // Dedupe (program.deadlines and events can both contribute the same date for the same program)
  const seen = new Set();
  const dedup = [];
  upcoming.forEach(u => {
    const k = u.dateStr + '|' + u.program.id + '|' + u.label;
    if (!seen.has(k)) { seen.add(k); dedup.push(u); }
  });
  // Also collapse near-duplicates where the label is the same but came from both sources (event title vs deadline label).
  // Keep the first hit per (date+programId).
  const tightSeen = new Set();
  const tight = [];
  dedup.forEach(u => {
    const k2 = u.dateStr + '|' + u.program.id;
    if (!tightSeen.has(k2)) { tightSeen.add(k2); tight.push(u); }
  });
  upcoming.length = 0;
  upcoming.push(...tight);

  // Render next-deadline card
  if (upcoming[0]) {
    const next = upcoming[0];
    const monthFmt = next.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('deadline-date').textContent = monthFmt;
    document.getElementById('deadline-program').textContent = next.program.title + ' · ' + next.label;
    const days = Math.ceil((next.date - now) / (1000 * 60 * 60 * 24));
    document.getElementById('deadline-countdown').textContent =
      days === 0 ? 'Today' : days === 1 ? '1 day away' : days + ' days away';
    const othersEl = document.getElementById('deadline-others');
    upcoming.slice(1, 4).forEach(u => {
      const row = document.createElement('div');
      const s = u.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      row.innerHTML = `<span>${u.program.title} · ${u.label}</span><strong>${s}</strong>`;
      othersEl.appendChild(row);
    });
  } else {
    // Fallback: hard-coded near-term workshop
    document.getElementById('deadline-date').textContent = 'Jul 21';
    document.getElementById('deadline-program').textContent = 'Cybersecurity for SBIR · Workshop';
    document.getElementById('deadline-countdown').textContent = 'Register now';
  }

  // Per-program button label + link
  const BTN = {
    'acsa':              { label: 'Apply →',     href: 'apply.html' },
    'larta':             { label: 'Apply →',     href: 'apply.html' },
    'workshops':         { label: 'Register →',  href: 'programs.html#workshops' },
    'office-hours':      { label: 'Book →',      href: 'https://nmfastmeetingscheduling.as.me/schedule/3516e259/appointment/47287547/calendar/8449404?calendarIds=8449404' },
    'matching-grant':    { label: 'Register →',  href: 'programs.html#matching-grant' },
    'microgrants':       { label: 'Apply →',     href: 'apply.html' },
    'travel':            { label: 'Apply →',     href: 'apply.html' },
    'los-alamos-makers': { label: 'Apply →',     href: 'apply.html' },
    'sfbi':              { label: 'Apply →',     href: 'apply.html' },
  };

  // Render featured programs grid (max 6)
  const grid = document.getElementById('programs-grid');
  D.programs.slice(0, 6).forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'program-card' + (i === 0 ? ' featured' : '');
    const nextDl = (p.deadlines && p.deadlines[0]) || null;
    const nextDlStr = nextDl
      ? new Date(nextDl.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : 'Rolling';
    const btn = BTN[p.id] || { label: 'Learn more →', href: 'programs.html#' + p.id };
    card.innerHTML = `
      <a class="pc-body-link" href="programs.html#${p.id}">
        <div class="pc-agency">${p.agency}</div>
        <div class="pc-title">${p.title}</div>
        <div class="pc-desc">${p.shortDesc}</div>
        <div class="pc-meta">
          <span>Cost · <strong>${p.cost}</strong></span>
          <span>Next · <strong>${nextDlStr}</strong></span>
        </div>
      </a>
      <a class="btn btn-primary btn-sm pc-cta" href="${btn.href}">${btn.label}</a>
    `;
    grid.appendChild(card);
  });
})();

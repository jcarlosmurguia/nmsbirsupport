// calendar.js — filterable event list built from data.js
(function () {
  const D = window.NMFAST_DATA;
  const listEl = document.getElementById('cal-list');
  const filters = { kind: 'all', when: 'upcoming' };

  const now = new Date(); now.setHours(0, 0, 0, 0);
  const feed = D.events.map(e => ({
    raw: e,
    date: new Date(e.date + 'T00:00:00'),
    title: e.title,
    kind: e.kind,
    format: e.format || null,
    time: e.time || null,
    facilitator: e.facilitator || null,
    partner: e.partner || null,
    tags: e.tags || [],
    registrationUrl: e.registrationUrl || null,
    applyViaForm: e.applyViaForm || false,
    program: e.programId ? D.programs.find(p => p.id === e.programId) : null,
  }));

  const monthStr = d => d.toLocaleDateString('en-US', { month: 'short' });

  function ctaFor(e) {
    if (e.registrationUrl) {
      return { label: 'Register →', href: e.registrationUrl, primary: true, target: '_blank' };
    }
    if (e.applyViaForm) {
      // Larta cohorts → larta apply page
      const href = (e.program && e.program.id === 'larta') ? 'larta-apply.html' : 'apply.html';
      return { label: 'Apply →', href, primary: true, target: null };
    }
    return { label: 'Get notified →', href: 'apply.html', primary: false, target: null };
  }

  function render() {
    listEl.innerHTML = '';
    const filtered = feed.filter(e => {
      if (filters.kind !== 'all' && e.kind !== filters.kind) return false;
      if (filters.when === 'upcoming' && e.date < now) return false;
      if (filters.when === 'past' && e.date >= now) return false;
      return true;
    }).sort((a, b) => filters.when === 'past' ? b.date - a.date : a.date - b.date);

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="empty">Nothing on the calendar for that filter. Try <a href="programs.html">browsing programs</a> instead.</div>`;
      return;
    }

    filtered.forEach(e => {
      const past = e.date < now;
      const row = document.createElement('div');
      row.className = 'cal-item' + (past ? ' past' : '');

      const cta = ctaFor(e);
      const targetAttr = cta.target ? ` target="${cta.target}" rel="noopener"` : '';
      const btnClass = cta.primary ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm';

      const tagBits = [];
      if (e.format) tagBits.push(`<span class="cal-tag cal-tag-format">${e.format}</span>`);
      if (e.partner) tagBits.push(`<span class="cal-tag cal-tag-partner">${e.partner}</span>`);

      const titleBadges = [];
      if (e.tags && e.tags.includes('underserved')) {
        titleBadges.push(`<span class="cal-badge cal-badge-underserved">Underserved outreach</span>`);
      }

      const programLine = e.program ? `<a href="programs.html#${e.program.id}" class="cal-prog-link">${e.program.title}</a>` : '';

      row.innerHTML = `
        <div class="cal-date">
          <span class="m">${monthStr(e.date)}</span>
          <span class="d">${e.date.getDate()}</span>
          <span class="y">${e.date.getFullYear()}</span>
          ${e.time ? `<span class="t">${e.time}</span>` : ''}
        </div>
        <div class="cal-body">
          <div class="cal-title-row">
            <div class="cal-title">${e.title}</div>
            ${titleBadges.join('')}
          </div>
          ${tagBits.length ? `<div class="cal-tags">${tagBits.join('')}</div>` : ''}
          ${e.facilitator ? `<div class="cal-facilitator">Facilitator · ${e.facilitator}</div>` : ''}
          <div class="cal-meta">${e.kind}${programLine ? ' · ' + programLine : ''}</div>
        </div>
        <a href="${cta.href}" class="${btnClass}"${targetAttr}>${cta.label}</a>
      `;
      listEl.appendChild(row);
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
})();

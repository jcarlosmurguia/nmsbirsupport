// survey.js — step controller + routing logic + submit
(function () {
  const D = window.NMFAST_DATA;
  const steps = document.querySelectorAll('.survey-step');
  const total = steps.length;
  let idx = 0;
  const answers = {};

  const stepNumEl  = document.getElementById('step-num');
  const stepTotalEl= document.getElementById('step-total');
  const barEl      = document.getElementById('progress-bar');
  const prevBtn    = document.getElementById('prev-btn');
  const nextBtn    = document.getElementById('next-btn');

  stepTotalEl.textContent = total;

  // Where the "Learn more" CTA on the result card points for each program.
  const RESULT_CTA = {
    'larta':       { label: 'Apply to Larta →', href: 'larta-apply.html' },
    'microgrants': { label: 'Request a micro-grant →', href: 'microgrant-apply.html' },
    'travel':      { label: 'Apply for a stipend →', href: 'travel-apply.html' },
    'office-hours':{ label: 'Book a session →', href: 'https://nmfastmeetingscheduling.as.me/schedule/3516e259/appointment/47287547/calendar/8449404?calendarIds=8449404' },
  };

  function show(i) {
    steps.forEach((s, n) => s.classList.toggle('active', n === i));
    stepNumEl.textContent = i + 1;
    barEl.style.width = ((i + 1) / total * 100) + '%';
    prevBtn.style.visibility = i === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = i === total - 1 ? 'See my matches →' : 'Next →';
  }

  document.querySelectorAll('.q-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const input = opt.querySelector('input');
      if (!input) return;
      if (input.type === 'radio') {
        document.querySelectorAll(`input[name="${input.name}"]`).forEach(r =>
          r.closest('.q-option').classList.remove('selected'));
      }
      setTimeout(() => {
        if (input.checked) opt.classList.add('selected');
        else opt.classList.remove('selected');
      }, 0);
    });
  });

  function collectCurrent() {
    const step = steps[idx];
    step.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(el => {
      if (el.id === 'q-name') answers.name = el.value.trim();
      if (el.id === 'q-email') answers.email = el.value.trim();
      if (el.id === 'q-company') answers.company = el.value.trim();
      if (el.id === 'q-desc') answers.description = el.value.trim();
    });
    const grp = step.querySelector('.q-options');
    if (grp) {
      const field = grp.dataset.field;
      const single = grp.hasAttribute('data-single');
      if (single) {
        const checked = grp.querySelector('input[type="radio"]:checked');
        if (checked) answers[field] = checked.value;
      } else {
        const vals = [...grp.querySelectorAll('input[type="checkbox"]:checked')].map(c => c.value);
        answers[field] = vals;
      }
    }
  }

  function validateCurrent() {
    const step = steps[idx];
    if (step.dataset.step === '1') {
      const name = step.querySelector('#q-name').value.trim();
      const email = step.querySelector('#q-email').value.trim();
      if (!name || !email) { alert('Name and email are required.'); return false; }
      if (!/^\S+@\S+\.\S+$/.test(email)) { alert('Please enter a valid email.'); return false; }
      return true;
    }
    const grp = step.querySelector('.q-options[data-single]');
    if (grp) {
      const checked = grp.querySelector('input[type="radio"]:checked');
      if (!checked) { alert('Please pick one option.'); return false; }
    }
    return true;
  }

  nextBtn.addEventListener('click', () => {
    if (!validateCurrent()) return;
    collectCurrent();
    if (idx === total - 1) {
      submit();
    } else {
      idx++;
      show(idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  prevBtn.addEventListener('click', () => {
    collectCurrent();
    if (idx > 0) { idx--; show(idx); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });

  function recommend(a) {
    const scored = D.programs.map(p => ({ prog: p, score: 0, why: [] }));
    const pick = (id) => scored.find(s => s.prog.id === id);

    const stageMap = {
      'pre-sbir':   ['workshops', 'office-hours', 'los-alamos-makers'],
      'phase-0':    ['acsa', 'workshops', 'larta', 'office-hours', 'microgrants'],
      'phase-1':    ['acsa', 'larta', 'microgrants', 'travel'],
      'phase-2':    ['larta', 'matching-grant', 'travel', 'sfbi'],
    };
    (stageMap[a.stage] || []).forEach((id, i) => {
      const s = pick(id); if (s) { s.score += (10 - i); s.why.push('stage fit'); }
    });

    if (a.agency === 'DOE') {
      const s = pick('acsa'); if (s) { s.score += 15; s.why.push('DOE-focused'); }
    }
    if (a.agency === 'Unsure') {
      const s = pick('workshops'); if (s) { s.score += 10; s.why.push('agency fit help'); }
      const o = pick('office-hours'); if (o) { o.score += 6; }
    }

    if (a.firstTime === 'yes') {
      const s = pick('workshops'); if (s) { s.score += 6; s.why.push('first-timer friendly'); }
      const a2 = pick('acsa'); if (a2) { a2.score += 4; }
    }
    if (a.firstTime === 'phase-1-winner') {
      const s = pick('larta'); if (s) { s.score += 8; s.why.push('Phase II prep'); }
      const m = pick('matching-grant'); if (m) { m.score += 6; }
    }

    if (a.timeline === 'lt-3') {
      const s = pick('office-hours'); if (s) { s.score += 8; s.why.push('tight timeline'); }
      const m = pick('microgrants'); if (m) { m.score += 4; }
    }
    if (a.timeline === '3-6') {
      const s = pick('acsa'); if (s) { s.score += 10; s.why.push('cohort-ready'); }
    }
    if (a.timeline === '6-12') {
      const s = pick('workshops'); if (s) { s.score += 6; }
      const a2 = pick('acsa'); if (a2) { a2.score += 6; }
    }

    // Phase II → Phase III bridge
    if (a.stage === 'phase-2') {
      const s = pick('sfbi'); if (s) { s.score += 15; s.why.push('Phase II-III bridge'); }
    }

    const needs = a.needs || [];
    const safePick = (id, n) => { const s = pick(id); if (s) s.score += n; };
    if (needs.includes('proposal-coaching')) { safePick('acsa', 8); safePick('larta', 6); }
    if (needs.includes('agency-fit'))         { safePick('workshops', 8); safePick('office-hours', 4); }
    if (needs.includes('budget-compliance'))  { safePick('office-hours', 6); safePick('workshops', 4); }
    if (needs.includes('commercialization'))  { safePick('larta', 10); }
    if (needs.includes('prototyping'))        { safePick('los-alamos-makers', 12); }
    if (needs.includes('phase-2-planning'))   {
      safePick('larta', 10);
      safePick('matching-grant', 5);
      const s = pick('sfbi'); if (s) { s.score += 10; }
    }
    if (needs.includes('funding'))            { safePick('microgrants', 10); safePick('travel', 6); }

    scored.sort((x, y) => y.score - x.score);
    return scored.filter(s => s.score > 0).slice(0, 3);
  }

  function submit() {
    collectCurrent();
    const recs = recommend(answers);

    if (D.SHEETS_ENDPOINT) {
      fetch(D.SHEETS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          kind: 'survey',
          ts: new Date().toISOString(),
          answers,
          recommendations: recs.map(r => r.prog.id),
        }),
      }).catch(err => console.warn('Submission failed (will retry from inbox):', err));
    }

    try { localStorage.setItem('nmfast_survey', JSON.stringify({ answers, recs: recs.map(r => r.prog.id) })); } catch (e) {}

    document.getElementById('survey-root').style.display = 'none';
    const resultRoot = document.getElementById('result-root');
    resultRoot.style.display = 'block';

    const firstName = (answers.name || 'founder').split(/\s+/)[0];
    document.getElementById('result-name').textContent = firstName + '.';

    if (!D.SHEETS_ENDPOINT) {
      document.getElementById('submission-note').textContent =
        'Note: Sheets backend not configured yet — your answers are only saved locally.';
    }

    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    recs.forEach((r, i) => {
      const card = document.createElement('div');
      card.className = 'rec-card' + (i === 0 ? '' : ' secondary');
      const nextDl = (r.prog.deadlines && r.prog.deadlines[0]) || null;
      const nextStr = nextDl
        ? new Date(nextDl.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Rolling';
      const cta = RESULT_CTA[r.prog.id] || { label: 'Learn more →', href: 'programs.html#' + r.prog.id };
      card.innerHTML = `
        <div>
          <div class="rec-badge">${i === 0 ? 'Top match' : 'Also a fit'}</div>
          <h3 class="h3">${r.prog.title}</h3>
          <p>${r.prog.shortDesc}</p>
          <div class="small" style="margin-top:10px;">Next · <strong>${nextStr}</strong></div>
        </div>
        <div>
          <a href="${cta.href}" class="btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}">${cta.label}</a>
        </div>
      `;
      container.appendChild(card);
    });
    if (recs.length === 0) {
      container.innerHTML = `
        <div class="rec-card">
          <div>
            <div class="rec-badge">We'll be in touch</div>
            <h3 class="h3">Let's talk first.</h3>
            <p>Based on your answers, we'd rather have a short call to recommend the right path. We'll reach out within 2 business days.</p>
          </div>
          <div><a href="mailto:cmurguia@nmsu.edu" class="btn btn-primary">Email us now</a></div>
        </div>
      `;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  show(0);
})();

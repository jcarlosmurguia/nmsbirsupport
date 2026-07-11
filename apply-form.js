// apply-form.js — generic submit handler for the three application pages
// (larta-apply, microgrant-apply, travel-apply).
// Reads a `data-kind` and a confirmation message from the form element.
//
// Each form must include:
//   <form id="apply-form" data-kind="larta-apply"
//         data-confirm-title="Application received."
//         data-confirm-body="We'll be in touch within 2 business days.">
//   <div id="confirm-root" class="form-confirm" style="display:none;">…</div>

(function () {
  const D = window.NMFAST_DATA;
  const form = document.getElementById('apply-form');
  if (!form) return;

  const confirmRoot = document.getElementById('confirm-root');
  const submitBtn = form.querySelector('button[type="submit"]');

  // ---- Auto-inject "How did you hear about us?" referral field ----
  // Same options on every NM FAST application + newsletter signup, so we
  // can roll up metrics for our referral partners (Los Alamos Makers,
  // NM Startup Alliance) and other channels.
  if (!form.querySelector('[name="referral_source"]')) {
    const fs = document.createElement('div');
    fs.className = 'form-field';
    fs.innerHTML = `
      <label for="referral_source">How did you hear about NM FAST? <span class="req">*</span></label>
      <select id="referral_source" name="referral_source" required>
        <option value="">Select one</option>
        <option value="los-alamos-makers">Los Alamos Makers</option>
        <option value="nm-startup-alliance">NM Startup Alliance</option>
        <option value="nmedd">NMEDD · Economic Development NM</option>
        <option value="nmsu">NMSU / Arrowhead Center</option>
        <option value="alum">Another NM FAST participant or alum</option>
        <option value="social">Social media (LinkedIn, X, etc.)</option>
        <option value="search">Web search</option>
        <option value="newsletter">Newsletter or email</option>
        <option value="event">Event or workshop</option>
        <option value="other">Other</option>
      </select>
      <input id="referral_other" name="referral_other" type="text"
             placeholder="Tell us who or where (optional)"
             style="margin-top: 10px; display: none;"/>
    `;
    // Insert just before the submit button (or at the end if no button).
    if (submitBtn && submitBtn.parentNode === form) {
      form.insertBefore(fs, submitBtn);
    } else {
      form.appendChild(fs);
    }
    const sel = fs.querySelector('#referral_source');
    const other = fs.querySelector('#referral_other');
    sel.addEventListener('change', () => {
      other.style.display = sel.value === 'other' ? 'block' : 'none';
      if (sel.value !== 'other') other.value = '';
    });
  }

  function gather() {
    const out = {};
    form.querySelectorAll('input, select, textarea').forEach(el => {
      if (!el.name) return;
      if (el.type === 'checkbox') {
        if (!out[el.name]) out[el.name] = [];
        if (el.checked) out[el.name].push(el.value);
      } else if (el.type === 'radio') {
        if (el.checked) out[el.name] = el.value;
      } else {
        out[el.name] = el.value.trim();
      }
    });
    return out;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const answers = gather();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';
    }

    const payload = {
      kind: form.dataset.kind || 'apply',
      ts: new Date().toISOString(),
      answers,
    };

    const send = D && D.SHEETS_ENDPOINT
      ? fetch(D.SHEETS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload),
        }).catch(() => {})
      : Promise.resolve();

    send.then(() => {
      try { localStorage.setItem('nmfast_lastapp_' + payload.kind, JSON.stringify(payload)); } catch (e) {}
      form.style.display = 'none';
      if (confirmRoot) {
        const title = form.dataset.confirmTitle || 'Application received.';
        const body  = form.dataset.confirmBody  || "We'll be in touch shortly.";
        confirmRoot.innerHTML = `
          <div class="eyebrow">Thank you</div>
          <h2 class="h2">${title}</h2>
          <p class="lead" style="margin: 0 auto;">${body}</p>
          <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="programs.html" class="btn btn-ghost">See all programs</a>
            <a href="calendar.html" class="btn btn-ghost">Upcoming events</a>
          </div>
        `;
        confirmRoot.style.display = 'block';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();

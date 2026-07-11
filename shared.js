// shared.js — newsletter handler + injectFooter() used across all pages
//
// NOTE: All Luma registrations and Google Form submissions should also
// be added to the newsletter list via Zapier or Apps Script automation.
// Manual enrollment: forward new Google Sheet rows to newsletter platform.

function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const email = input.value;
  const endpoint = window.NMFAST_DATA && window.NMFAST_DATA.SHEETS_ENDPOINT;
  if (endpoint) {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ kind: 'newsletter', email, ts: new Date().toISOString() }),
    }).catch(() => {});
  }
  input.value = '';
  const btn = e.target.querySelector('button');
  const t = btn.textContent;
  btn.textContent = "You're in ✓";
  setTimeout(() => { btn.textContent = t; }, 2400);
}

function injectFooter() {
  const mount = document.getElementById('site-footer-root');
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <div class="footer-col">
          <img src="assets/NMFAST_color_NMSU.png" alt="NM FAST · NMSU" class="footer-logo"/>
          <p>
            New Mexico Federal and State Technology Partnership.<br/>
            Operated by Arrowhead Center at New Mexico State University.
          </p>
          <img src="assets/EDNM-logo-RGB.png" alt="NM Economic Development Department" class="footer-funder"/>
        </div>
        <div class="footer-col">
          <div class="footer-label">Programs</div>
          <a href="programs.html#acsa">ACSA Accelerator</a>
          <a href="programs.html#larta">Larta Commercialization</a>
          <a href="programs.html#workshops">Workshops &amp; Webinars</a>
          <a href="programs.html#office-hours">Office Hours</a>
          <a href="programs.html#microgrants">Micro-grants &amp; Stipends</a>
          <div class="footer-sub-label">Apply directly</div>
          <a href="larta-apply.html">Apply to Larta →</a>
          <a href="microgrant-apply.html">Request a Micro-grant →</a>
          <a href="travel-apply.html">Travel Stipend →</a>
        </div>
        <div class="footer-col">
          <div class="footer-label">Get in touch</div>
          <a href="mailto:cmurguia@nmsu.edu">cmurguia@nmsu.edu</a>
          <a href="tel:+15754051042">(575) 405-1042</a>
          <div class="footer-addr">3655 Research Drive<br/>Las Cruces, NM 88003</div>
        </div>
        <div class="footer-col">
          <div class="footer-label">Stay in the loop</div>
          <form class="newsletter" onsubmit="subscribeNewsletter(event)">
            <input type="email" placeholder="your@email.com" required/>
            <button class="btn btn-gold btn-sm" type="submit">Subscribe</button>
          </form>
          <div class="footer-micro">Monthly newsletter. No spam.</div>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <div>© 2026 Arrowhead Center · NMSU | Funded by NMEDD</div>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', injectFooter);

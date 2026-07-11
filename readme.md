# NM FAST Website

Static HTML site for **New Mexico FAST** — the state's SBIR/STTR support program, operated by Arrowhead Center at NMSU.

## What's in here

```
site/
├── index.html       Homepage — hero, next deadline, programs grid, how-it-works, partners
├── programs.html    Programs hub — all 9 programs with filters (stage / sector) + detail blocks
├── apply.html       Match Survey — 10-step form → routes to 1–3 recommended programs
├── calendar.html    Filterable event calendar (cohort starts, workshops, info sessions)
├── resources.html   Self-serve library — guides, checklists, templates, federal links
├── about.html       Mission, team, partners, funding
│
├── styles.css       All site CSS — design tokens in :root, organized by page section
├── data.js          ⭐ SINGLE SOURCE OF TRUTH — programs, events, resources, backend URL
├── shared.js        Newsletter subscribe handler (used on every page)
├── home.js          Homepage-specific: next-deadline card + programs grid
├── programs.js      Programs hub: filters + detail rendering (DETAIL object inside)
├── survey.js        Match survey: step controller + routing logic + submit
└── calendar.js      Calendar: filters + rendering
```

Assets (logos, etc.) live in `../assets/` and are shared with the rest of the design system in this project.

---

## Editing content

**99% of content changes are in `data.js`.**

Want to:
- Add a new program? → Add an object to `NMFAST_DATA.programs` in `data.js`, then add a matching detail block to the `DETAIL` object in `programs.js`.
- Update a deadline? → Edit the `deadlines` array on the relevant program in `data.js`.
- Add an event to the calendar? → Add an object to `NMFAST_DATA.events`.
- Add a new resource card? → Add to `NMFAST_DATA.resources`.

**Design-level changes** (colors, spacing, headers, CTAs) live in `styles.css`. The design tokens are at the top of the file — changing `--maroon` or `--gold` updates every page.

---

## Hooking up submissions (Sheets backend)

The Match Survey and newsletter signup both POST to a URL in `data.js`:

```js
SHEETS_ENDPOINT: '', // paste your Apps Script Web App URL here
```

Until you paste a URL in, submissions are saved only to the user's `localStorage` (and show an in-page note). See **`docs/apps-script-backend.md`** for the full 10-minute setup: create a Google Sheet, paste in the Apps Script, deploy as Web App, paste the URL into `data.js`.

---

## Local preview

It's all static — just open any `.html` file in a browser, or serve the `site/` folder:

```
cd site
python3 -m http.server 8000
# then open http://localhost:8000
```

No build step, no npm install, nothing to compile.

---

## Deploying

Anywhere that serves static files works:

- **Netlify** — drag the `site/` folder onto netlify.com/drop. Done.
- **Cloudflare Pages** — push the repo, point Pages at `site/`.
- **GitHub Pages** — push, enable Pages, set root to `site/`.
- **NMSU's existing web hosting** — SFTP the `site/` folder contents. The `../assets/` path in HTML assumes assets ship alongside (update paths if you want everything in one folder).

**One-time path adjustment for deploy:** the HTML uses `../assets/nmfast-logo-color.png` because in this design project the logos live one level up. Before production deploy, either:
- Copy `assets/` into `site/assets/` and find-and-replace `../assets/` → `assets/` in the HTML, OR
- Move the logos to whatever public-facing path you use.

---

## Design system

This site uses the **NM FAST brand system** defined at the root of this project:
- `colors_and_type.css` — tokens + type scale
- `README.md` — content fundamentals, voice, iconography rules
- `ui_kits/linkedin_posts/` — matching social templates

Visit the project's **Design System** tab to review colors, type, components, and brand.

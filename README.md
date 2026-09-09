# Parv Shah — Portfolio Website

A modern, responsive single-page portfolio for **Parv Shah** — Full-Stack Developer, AI/ML Engineer and Data Analyst. All content is consolidated from the 12 résumé PDFs found at `d:\work\interview\resume\parv`.

Built with **pure HTML, CSS and vanilla JavaScript** — no frameworks, no build tools, no dependencies.

---

## 🚀 Quick start

Just open `index.html` in your browser:

```bash
# From the project folder
start index.html
```

For the best experience you can serve it locally (optional):

```bash
# Python
python -m http.server 5500 --bind 127.0.0.1

# Node
npx serve .
```

Then visit <http://127.0.0.1:5500>.

---

## 📁 Project structure

```
portflio website/
├── index.html        # All page content & structure
├── css/
│   └── style.css     # Styling, themes, responsive layout
├── js/
│   └── main.js       # Interactivity (theme, menu, filters, typing effect, ...)
└── README.md
```

---

## ✨ Sections

| Section | What it covers | Source résumés |
|---|---|---|
| **Hero** | Headline, stats, typewriter effect | all |
| **About** | Who Parv is, contact summary | all |
| **Skills** | Tabbed categories + proficiency bars | all |
| **Projects** | Filterable cards (AI/ML · Backend · Full-Stack · Data) | all |
| **Experience** | Wappnet (Full-Stack Dev) & Apollo Infotech (Intern) | all |
| **Education** | NIT Jalandhar, DDU Nadiad, Parth School | all |
| **Achievements & Certifications** | LeetCode, GATE, Kaggle, IBM | all |
| **Contact** | Email, phone, GitHub, LeetCode + contact form | all |

---

## 🎛 Features

- **Light / dark theme** toggle (persisted in `localStorage`; defaults to OS preference)
- **Responsive layout** with a mobile hamburger menu (≤760px)
- **Scroll-spy** navigation highlighting the active section
- **Reveal-on-scroll** animations (respects `prefers-reduced-motion`)
- **Tabbed skills**, **animated proficiency bars**, **project category filters**
- **Typed hero** headline with blinking caret
- **Back-to-top** button
- Contact form opens the visitor's email client via a `mailto:` link

---

## 🎨 Customisation

The colour scheme and fonts are driven by CSS variables at the top of `css/style.css`:

- `--accent`, `--accent-2`, `--grad` — brand colours / gradient
- `--text`, `--bg`, `--surface` — light & dark theme palettes
- Fonts are pulled from Google Fonts (`Inter` + `JetBrains Mono`) in `index.html`

To edit any content (skills, projects, roles), open `index.html` and update the relevant section. To add real project links, wrap a project title/link in an `<a>` tag — the résumés list "Source Code" links that weren't included (placeholders) in this version.

---

## ✔ Validation

- JavaScript passes `node --check` (valid syntax).
- No external runtime dependencies; all styling and logic are self-contained.
**Project Overview**

- **Repo**: `c:\Users\ptpk2\Resume Portfolio Website`
- **Purpose**: A responsive personal portfolio website (three main files: `index.html`, `styles.css`, `script.js`) built with Tailwind (CDN) and the Inter font.

**What I changed (high level)**

- Rewrote and organized the site structure in `index.html`.
- Repaired stylesheet link (now `styles.css`) and added custom CSS rules in `styles.css`.
- Implemented interactive behaviors in `script.js` (typing animation, sticky header, project filters, project modals, fade-in on scroll, scroll-to-top button, resume download handling, debug logs).
- Replaced the Skills section with a three-card layout (Frontend, Backend, Tools) and added styles for the new layout.
- Added a `Hire Me` mailto button in the About section.
- Reworked the Contact section: added an optional contact-form image (`assets/contact-form.png`), and four contact cards (Email, LinkedIn, GitHub, Instagram) using inline SVG icons and accessible labels.
- Fixed layout/spacing in the Education & Experience area and restored the two-column layout on wider viewports.
- Added `assets/profile.png` and a placeholder `assets/Preesha_Resume.pdf` (if present).

**Files changed/added**

# My Portfolio Website — What I Built and How I Built It

This is my personal portfolio website. I created the layout, styling, and all interactivity using plain HTML, Tailwind (CDN), custom CSS, and vanilla JavaScript.

## What I built (in my own words)
- A responsive, dark-themed portfolio with sections for Hero, About, Projects, Skills, Experience, and Contact.
- A typing animation in the hero that cycles short phrases describing my role and skills.
- Interactive project cards with client-side filtering (using `data-tags`) and modals for details.
- A three-card Skills section grouping Frontend, Backend, and Tools.
- Contact cards with icons and a `mailto:` Hire Me button.
- Fade-in-on-scroll animations (IntersectionObserver), sticky header behavior, and a scroll-to-top button.

## Files I changed or added
- `index.html` — main site structure and content.
- `styles.css` — custom CSS for animations, cards, modals and small design tweaks.
- `script.js` — client-side interactivity: typing, filtering, modals, fade-in, header behavior.
- `assets/` — images and my resume PDF (placeholders may be present).

## How to run this site locally (recommended)
I recommend running a small static HTTP server from the project folder so relative paths and scripts work reliably.

Using Python 3 (simplest):

```powershell
cd "C:\Users\ptpk2\Resume Portfolio Website"
python -m http.server 8888
# open http://localhost:8888 in your browser
```

Or using Node (no global install required):

```powershell
cd "C:\Users\ptpk2\Resume Portfolio Website"
npx http-server -p 8888
# open http://127.0.0.1:8888
```

## Deploying (quick)
- Vercel: connect your GitHub, import this repo, choose `Other` (static) and deploy.
- GitHub Pages: enable Pages on the `main` branch and serve from the root.

## Notes & small maintenance items
- I updated the public email in the site to `ptpk2810@gmail.com`.
- If something doesn't work, open DevTools → Console and look for `[portfolio]` debug logs.
- To change content (projects, skills, contact) edit `index.html`. For style changes edit `styles.css`. For behavior edit `script.js`.

## Next steps I can take for you
- Add screenshots and a live URL to the README.
- Add a simple deployment config (Vercel or GitHub Actions).
- Improve accessibility (modal focus trap, ARIA attributes).

If you want me to commit the README changes and push them, I can run the git commands for you.
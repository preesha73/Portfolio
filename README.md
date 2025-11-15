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

- `index.html` — primary structure and content.
- `styles.css` — custom styling for animations, skill cards, contact cards, modal, and small fixes.
- `script.js` — interactivity and user behaviors.
- `assets/` — images and resume (profile image and resume PDF).
- `README.md` — this file.

**How the main features were implemented**

- Layout & Styling
  - Tailwind CSS is included via CDN in the page `head`.
  - The `Inter` font is loaded from Google Fonts in the page `head`.
  - Custom styles that Tailwind utilities alone don't cover live in `styles.css` (modals, card shadows, typing cursor, skill-card layout, contact cards, small animations).

- JavaScript
  - `script.js` runs on `DOMContentLoaded` and wires up the following:
    - Typing animation loop for the hero text.
    - Sticky header color change on scroll.
    - Mobile menu toggle.
    - Project filter buttons and skill-pill toggles (client-side filtering by reading `data-tags`).
    - IntersectionObserver to add `.in-view` to `.fade-section` elements for fade-in-on-scroll animations.
    - Modal creation for project cards with overlay and Escape/overlay-close handling.
    - Scroll-to-top button show/hide and behavior.
    - Resume download behavior (local PDF with a download attribute, plus a HEAD check in JS and a bounce/shake fallback if missing).
  - Debugging console logs were added to help diagnose client-side issues (look for messages like `[portfolio] DOMContentLoaded - script running`).

**How to run & preview locally**

- Quick preview (file open): double-click `index.html` in File Explorer or right-click -> Open with browser. This will work for basic layout and CSS, but some browsers restrict features when `file://` is used (modals and scripts still work normally in modern browsers).

- Recommended: run a local static server (PowerShell examples):

```powershell
# If you have Python 3 installed
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

or using Node (if you prefer):

```powershell
# from project root, if you have http-server installed globally
npx http-server -p 8000
# then open http://127.0.0.1:8000
```

**Git remote note**

- If you previously tried `git remote add origin https://github.com/preesha73/Portfolio.git` and saw `error: remote origin already exists.`, check remotes with:

```powershell
git remote -v
```

- To update the existing remote URL use:

```powershell
git remote set-url origin https://github.com/preesha73/Portfolio.git
```

- Or remove+re-add:

```powershell
git remote remove origin
git remote add origin https://github.com/preesha73/Portfolio.git
```

**Troubleshooting & common fixes**

- If interactive features appear inactive:
  - Hard-refresh the browser (Ctrl+F5) to clear cache.
  - Open Developer Tools → Console and look for errors or the debug messages added in `script.js` (search for `[portfolio]` messages). If no messages appear, ensure `script.js` is being loaded (check Network tab and the `<script src="script.js"></script>` line is present at the bottom of `index.html`).

- If the contact image is missing: place your screenshot at `assets/contact-form.png`. The page uses `onerror` to hide a missing image gracefully.

- To change the contact cards (text, handles or icons): edit the anchors under the `#contact` section in `index.html`.

**Where to edit content**

- `index.html` — content, headings, projects, skills lists, contact details.
- `styles.css` — small style changes, color tweaks, spacing and animations.
- `script.js` — interactivity, filters, animations and modal logic.
- `assets/` — add your `profile.png` and `contact-form.png` and replace `Preesha_Resume.pdf` with your real resume.

**Accessibility & improvements you may want next**

- Add focus trapping inside modals to keep keyboard focus contained while modal is open.
- Replace inline SVG icons with official brand SVGs for visual parity.
- Improve ARIA attributes for dynamic elements (filters, pills) for screen readers.

If you'd like, I can:
- Add focus-visible outlines to interactive cards.
- Replace the contact card placeholders with official brand-colored SVGs.
- Generate a small `deploy` section (e.g., GitHub Pages setup) and add instructions for publishing.

---

If you want me to commit these changes and push them to the repo (I can run the `git` commands here), tell me whether you want the `origin` remote set to `https://github.com/preesha73/portfolio.git` (lowercase) or `https://github.com/preesha73/Portfolio.git` (capital `P`) and I will update the remote and push the `main` branch.
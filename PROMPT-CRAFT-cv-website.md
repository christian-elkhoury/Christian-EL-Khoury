# CRAFT Prompt: CV → Responsive Website on GitHub Pages

> Paste everything below the line into Claude Code, run from the project root
> (`Christian EL Khoury/`).

---

## C — Context

I have my CV as a Markdown file at `doc/cv-christian-el-khoury.md`. It is written in **French** and has these sections: header (name, title, internship search), Contact, Expériences professionnelles (4 entries), Formations (3 entries), Compétences (techniques + personnelles), Langues (table), Intérêts.

I want to turn it into a personal website that recruiters can open from a link on my LinkedIn or in an email. The project folder is **not yet a git repository**, and the GitHub CLI (`gh`) is **not installed** on my machine.

Constraints:
- **Static site only**: plain HTML5, CSS3 and a small amount of vanilla JavaScript. No framework, no build step, no npm. GitHub Pages must be able to serve the files as they are.
- **Content must match the CV**. Do not invent, embellish or reword achievements, dates, company names or skill levels. You may restructure and add visual hierarchy only.
- The site must work on **desktop and mobile**, from 320px to 1920px wide.
- Deployment to **GitHub Pages must be automatic** on every push to `main`, using a GitHub Actions workflow.
- **Commit step by step**: one logical change per commit, never one big commit at the end.

## R — Role

Act as a **senior front-end developer and web designer** who builds accessible, responsive personal portfolio sites and sets up CI/CD with GitHub Actions. You care about semantic HTML, performance, accessibility (WCAG 2.1 AA) and clean git history.

## A — Action

### Step 0: Decisions already made (do not ask again)
Read `doc/cv-christian-el-khoury.md`, then apply these decisions:
1. **Privacy:** the site is public. Show **email, LinkedIn and "Lyon, France" only**. Do **not** publish the phone number or the street address.
2. **Language:** **French only** (`lang="fr"`), the same language as the CV.
3. **Visual style:** clean and professional, with a **teal accent** (healthcare and data feel) on neutral backgrounds, and a matching dark mode.
4. **GitHub:** the repository is named **`cv`**. The site URL will be `https://<username>.github.io/cv/`. Use `<username>` as a placeholder until Step 8, where you ask me for my username.
5. **Extras:**
   - Add a **"Télécharger le CV (PDF)"** button that calls `window.print()`. With the print stylesheet, this lets visitors save the page as a PDF, so no separate PDF file is needed.
   - Add a **profile avatar**: a circle with my initials "CK" in the accent color. Structure it so it can be swapped for a photo at `assets/photo.jpg` by changing one line, and leave a comment explaining how.

### Step 1: Initialize the repository
- `git init`, set the default branch to `main`.
- Add `.gitignore` (macOS `.DS_Store`, editor folders) and a short `README.md` (what the project is, live URL placeholder, how to run it locally).
- **Commit:** `chore: initialize repository`

### Step 2: Page skeleton
- Create `index.html` with semantic structure: `<header>`, `<nav>`, `<main>` with one `<section>` per CV section, `<footer>`.
- Include `lang="fr"`, `<meta name="viewport">`, `<title>`, `<meta name="description">`, and Open Graph tags (title, description, type) so the link previews well on LinkedIn.
- **Commit:** `feat: add semantic HTML skeleton`

### Step 3: Content
- Transfer **all** CV content into the sections, word for word, following the privacy choices from Step 0.
- Experiences and education go in a **timeline**, most recent first.
- Languages become visual level indicators, with the text level always visible (not color-only).
- Contact links: `mailto:`, and LinkedIn opening in a new tab with `rel="noopener noreferrer"`.
- Hero section (first screen): the initials avatar, my name, "Étudiant en MSc Healthcare Innovation and Data Science", the internship search line ("Recherche stage de 4 à 6 mois · Paris · dès mars / avril"), a "Me contacter" button and the "Télécharger le CV (PDF)" button.
- **Commit:** `feat: add CV content`

### Step 4: Styling, mobile-first
- Put all styles in `css/style.css`. Use CSS custom properties for colors, spacing and type scale.
- Write mobile-first: base styles for small screens, then `min-width` media queries (e.g. 640px, 1024px). Use Flexbox/Grid with no fixed widths, so nothing scrolls horizontally at 320px.
- Use a system font stack or at most one Google Font with `display=swap`.
- Support dark mode with `prefers-color-scheme`.
- Add a print stylesheet (`@media print`) so the page prints as a clean one- or two-page CV. It powers the PDF button: hide the nav, the buttons and dark-mode colors, and print the email and LinkedIn URL as visible text.
- **Commit:** `style: add responsive mobile-first design`

### Step 5: Interactivity (light)
- In `js/main.js`: a sticky nav with smooth scroll to sections, a hamburger menu on mobile (keyboard accessible, with `aria-expanded`), and highlighting of the active section in the nav.
- Respect `prefers-reduced-motion`.
- The site must stay fully usable with JavaScript disabled.
- **Commit:** `feat: add navigation and mobile menu`

### Step 6: Accessibility and quality pass
- Check: one `<h1>` and a logical heading order, color contrast ≥ 4.5:1, visible focus styles, a "skip to content" link, alt text on any image.
- Validate the HTML (no errors) and check the layout at 320, 375, 768, 1024 and 1440px.
- Add a favicon (an inline SVG with my initials "CK" is fine).
- **Commit:** `fix: accessibility and validation improvements`

### Step 7: Automatic deployment
- Create `.github/workflows/deploy.yml` using the official GitHub Pages actions, triggered on `push` to `main` and `workflow_dispatch`:
  - permissions: `contents: read`, `pages: write`, `id-token: write`
  - `concurrency` group `pages` with `cancel-in-progress: false`
  - steps: `actions/checkout`, `actions/configure-pages`, `actions/upload-pages-artifact` (path: `.`), `actions/deploy-pages`, each on its current major version
- Add an empty `.nojekyll` file at the root.
- Exclude `doc/` and the prompt file from the published artifact if possible. If not, tell me what will be public.
- **Commit:** `ci: add GitHub Pages deployment workflow`

### Step 8: Publish (guide me, don't guess)
First ask me for my GitHub username, then replace the `<username>` placeholder everywhere (README, Open Graph `og:url`). Because `gh` is not installed, give me exact instructions to:
1. Create the empty **public** repository `cv` on github.com (no README, so there's no conflict).
2. `git remote add origin …` and `git push -u origin main`.
3. In the repo, go to **Settings → Pages → Source → "GitHub Actions"**.
4. Check the run in the **Actions** tab and open the live URL.

Then update `README.md` with the live URL. **Commit:** `docs: add live site URL`

**Rules for the whole task:**
- Never push, create remote repositories or change GitHub settings yourself without asking me first.
- After each commit, show me `git log --oneline` and a one-line summary of what changed.
- If something is ambiguous, ask rather than assume.

## F — Format

Final file structure:
```
.
├── index.html
├── css/style.css
├── js/main.js
├── assets/            (favicon.svg; optional photo.jpg later)
├── .github/workflows/deploy.yml
├── .nojekyll
├── .gitignore
├── README.md
└── doc/cv-christian-el-khoury.md   (source, unchanged)
```

Code expectations:
- Indented with 2 spaces, with short comments marking each section.
- No inline styles and no inline event handlers.
- Commit messages follow Conventional Commits (`feat:`, `style:`, `fix:`, `ci:`, `docs:`, `chore:`), each ending with the attribution trailer your environment requires.

At the end, give me a short report covering: the file tree, the list of commits, the steps I still have to do on GitHub, and the expected live URL.

## T — Target audience

- **Site visitors:** recruiters and hiring managers in **healthcare innovation, health-tech and data** in France, usually reading on a phone, often for under 30 seconds. They should see within the first screen: who I am, that I'm looking for a **4–6 month internship from March/April in Paris**, and how to contact me.
- **Tone of the site:** professional, modern, clean and confident. No gimmicks or heavy animations.
- **Tone with me (the developer):** I'm a student learning programming. Explain each step briefly in plain language, especially the git and GitHub Actions parts.

# DRV Development LLC — Marketing Site

Production React port of the design handoff (see `DRV/design_handoff_drv_site/README.md` for the full spec).

## Stack
- Vite + React 18
- Tailwind CSS (compiled)
- Framer Motion (animations, modal, process scroll-jack, testimonial carousel)
- Three.js (hero wireframe scene)

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Project layout

```
src/
├── App.jsx                  # composition root
├── main.jsx                 # React entry
├── index.css                # design tokens + base styles
├── assets/drv-logo.png
├── data/content.js          # EN/ES copy + projects/testimonials/pins
├── lib/heroScene.js         # Three.js wireframe-buildings scene
├── components/ui.jsx        # LangProvider, MagneticBtn, Reveal, SplitHeadline, CountUp, Eyebrow, ArchPlaceholder
└── sections/
    ├── Nav.jsx
    ├── Hero.jsx
    ├── TrustStrip.jsx
    ├── Services.jsx
    ├── Work.jsx
    ├── ProjectModal.jsx
    ├── Process.jsx
    ├── About.jsx
    ├── WhyDRV.jsx
    ├── Testimonials.jsx
    ├── ServiceArea.jsx
    ├── Contact.jsx
    └── Footer.jsx
```

## TODOs from the design spec
- Swap `ArchPlaceholder` for real photography on all project tiles, modal images, and About portrait.
- Wire contact form to a real submit endpoint (Resend, Postmark, Formspree, or a serverless route) and add zod validation + spam protection.
- Replace the inverted PNG logo in nav with a proper light-on-dark SVG export.
- Add JSON-LD `LocalBusiness` schema (legal details in design handoff README).

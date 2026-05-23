# Handoff — DRV Development LLC Marketing Site

## Overview
A premium, single-page marketing website for **DRV Development LLC**, a family-run Florida general contractor (license CGC1538931) serving Miami-Dade, Broward, and Palm Beach. The site is a dark-mode, architectural-feeling, interactive prototype. It includes an animated 3D hero, a scroll-jacked process timeline, a project lightbox, a stylized service-area map, a working contact form, an EN/ES language toggle, and a designer-facing "Tweaks" panel for accent color and typography.

## About the Design Files
The files inside `design/` are **design references created in HTML/JSX/Tailwind via CDN**. They are *prototypes showing the intended look, copy, and behavior* — not production code to ship as-is.

The task is to **recreate this design in a real production stack**. The prototype was built with React 18 + Tailwind (CDN) + Framer Motion + Three.js, all loaded from `unpkg`/`cdn.tailwindcss.com` and transpiled in-browser with Babel Standalone. That is fine for review, but the production build should use proper tooling.

**Recommended target stack (if there is no existing codebase yet):**
- **Next.js 14+ (App Router)** with TypeScript
- **Tailwind CSS** (compiled, not CDN) — port the CSS variables from `design/index.html` into `tailwind.config.ts` + `globals.css`
- **Framer Motion** for animations (already used in the prototype)
- **React Three Fiber + drei** for the hero 3D scene — the imperative `THREE.WebGLRenderer` code in `design/hero-scene.js` should be rewritten as a declarative R3F scene
- **`next/font`** for `Inter Tight`, `Inter`, and `JetBrains Mono`
- **`next/image`** for all photography placeholders
- **`react-hook-form` + `zod`** for the contact form
- **Lenis** (or `@studio-freight/lenis`) for the smooth-scroll effect the prototype currently lacks

If there is an existing codebase, defer to its conventions — port the *visual* tokens, not the file structure.

## Fidelity
**High-fidelity.** Final colors, type ramp, spacing rhythm, copy, and interaction patterns are locked. Recreate them pixel-faithful, then swap in real photography where the placeholders sit.

## Brand & Legal
| | |
|---|---|
| Legal name | DRV Development LLC |
| License | Florida CGC1538931 |
| Qualifier | Daniela Varela |
| Operations | Dennis Varela |
| Office | 9040 NW 32 CT RD, Miami, FL 33147 |
| Email | drvdevelopment17@gmail.com |
| Main phone | +1 (786) 481-9455 |
| Dennis phone | +1 (786) 961-4047 |
| Service area | Miami-Dade · Broward · Palm Beach |
| Logo | `design/assets/drv-logo.png` (full-color); `reference/DRV_logo.png` (original upload) |

The logo is a dark "DRV" wordmark with silver skyscraper silhouettes behind it. In the nav it is inverted to a light treatment via CSS filter — for production, export a proper light-on-dark SVG version.

---

## Design Tokens

### Colors
Defined as CSS custom properties on `:root` in `design/index.html`:

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0A1628` | Primary background — midnight navy |
| `--ink-2` | `#0d1a2e` | Secondary background (alternating sections, modal interior) |
| `--charcoal` | `#1F2937` | Tertiary surface, fog color in 3D scene |
| `--steel` | `#4B5563` | Mid gray |
| `--silver` | `#9CA3AF` | Light gray — body text, monospace labels |
| `--mist` | `#F8FAFC` | Off-white — headlines, primary text |
| `--accent` | `#3B82F6` | Electric blue — CTAs, accent rules, glow |

Border / divider tokens (used inline, port to Tailwind config):
- `rgba(255,255,255,0.06)` — section dividers, card borders
- `rgba(255,255,255,0.10)` — interactive borders (idle)
- `rgba(255,255,255,0.40)` — interactive borders (hover)

### Typography

| Font | Usage | Weights loaded |
|---|---|---|
| **Inter Tight** | Display / headlines | 300, 400, 500, 600, 700, 800 |
| **Inter** | Body | 300, 400, 500, 600, 700 |
| **JetBrains Mono** | Eyebrows, labels, numbers, coordinates | 400, 500 |
| Space Grotesk / DM Sans / Instrument Serif | Optional alternate display fonts (exposed via Tweaks) | 400–700 |

Type ramp (clamps shown — these are the design values, copy them exactly):

| Use | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Hero H1 | `clamp(48px, 9vw, 148px)` | 650 | `-0.035em` | `0.92` |
| Section H2 | `clamp(40px, 6vw, 64px)` | 600 | `-0.03em` | `1.02` |
| Section H2 (about / contact) | `clamp(44px, 7vw, 80px)` | 650 | `-0.035em` | `0.98` |
| Card / project H3 | 24–44px (responsive) | 600 | `-0.02em` | `1.05` |
| Process step H3 | `clamp(64px, 10vw, 120px)` | 700 | `-0.04em` | `0.92` |
| Body large | 17–20px | 400 | `0` | `1.55` |
| Body | 15–16px | 400 | `0` | `1.5–1.55` |
| Eyebrow / mono label | 10–12px | 400 (mono) | `0.18–0.28em` (UPPERCASE) | `1` |
| Footer wordmark | `clamp(96px, 22vw, 360px)` | 700 | `-0.05em` | `0.85` |

### Spacing & layout
- Site max-width: `1400px`, horizontal padding `24px` mobile / `40px` desktop (`px-6 lg:px-10`)
- Section vertical padding: `py-32 lg:py-44` (128px → 176px)
- 12-column grid using Tailwind `grid-cols-12 gap-6`
- Card grid gap: `gap-px` over a `bg-white/[0.06]` parent creates 1px dividers between cards (used in Why DRV)
- Border radius: `rounded-full` for pills and buttons; sections are square-cornered (`rounded-sm` only on a couple of decorative places); modal is square-edged

### Motion
- Standard ease: `cubic-bezier(0.22, 1, 0.36, 1)` (the "expo out" curve used everywhere)
- Reveal-up duration: `0.9s`; reveal-up Y: `24px`
- Headline split-line duration: `1.05s`, stagger `0.12s`
- Card hover: `0.3–0.5s` color/transform transitions
- Project hover scale: `1.03`, duration `0.7s`
- Process scroll-jack: section height `90vh × steps`, horizontal translate `0 → -80%`
- All animations respect `prefers-reduced-motion: reduce` (set duration to `0.01ms`)

---

## Screens / Views

This is a single-page site with a sticky nav and an off-canvas project modal. Sections in DOM order:

### 1. Nav (`design/sections-hero.jsx` → `Nav`)
- Fixed top, `z-50`
- Two states:
  - **At top** (`scrollY < 40px`): full-width, transparent background, `py-6`
  - **Scrolled** (`scrollY >= 40px`): pill-shaped (`rounded-full`), `bg-[var(--ink)]/85 backdrop-blur-xl`, `border border-white/[0.06]`, `py-3`
- Left: 36×36px circular badge with the DRV logo (inverted), wordmark "DRV" + monospace subline "DEVELOPMENT"
- Center (≥md): five nav links — Work, Services, Process, About, Contact (`text-[13px]`, hover `text-[var(--mist)]`) — smooth-scroll to anchors
- Right: EN/ES segmented toggle (pill, monospace 11px) + CTA button "Start a project" with a tiny pulsing blue dot

### 2. Hero (`Hero`)
- Full viewport (`min-h-screen`), background `var(--ink)`
- Layers (back to front):
  1. `<canvas>` filling the section — Three.js wireframe scene (see "Hero 3D Scene" below)
  2. Radial blue glow at 70%/50% (`rgba(59,130,246,0.10)` → transparent at 70%)
  3. Vertical vignette `bg-gradient-to-b from-[var(--ink)]/30 via-transparent to-[var(--ink)]`
  4. Four crosshair corner marks (4×4px L-shapes, `border-white/20`)
  5. Content
- Content (within max-width container, `pt-40 lg:pt-44 pb-32`):
  - **Eyebrow pill** — small dot (pulsing blue) + monospace `CGC1538931` license label
  - **Headline** — three lines, split-text reveal, oversize. Line 3 ("future.") uses italic-style `<em>` (display font, weight 300) colored `var(--accent)`
  - **Subhead** — 17px silver, max-width `xl`
  - **CTAs** — two magnetic buttons: primary "Start your project" (accent), secondary "View work" (ghost)
  - **Bottom bar** — left: animated scroll-line indicator + monospace "Scroll" label; right (≥md): "25.7891° N / 80.2264° W" coordinates and "Miami · FL"

#### Hero 3D Scene (`design/hero-scene.js`)
- `THREE.PerspectiveCamera` (38° fov) at `(14, 9, 22)` looking at `(6, 5, 0)`
- Building group offset `x: +4` to keep the headline area clear
- Six wireframe boxes via `EdgesGeometry` + `LineSegments`:
  - Hero tower (center) — 4×4×14, **accent blue** edges (`0x3b82f6`)
  - Stepped neighbor — 3×3×9, silver edges
  - Low slab — 3.5×3.5×6, silver edges
  - Three "ghost" towers in the distance — `0x4b5563` edges, no floor rings
- Each building gets horizontal "floor" line rings every ~1.2 units of height
- `THREE.GridHelper(40, 40, 0x1f2937)` ground grid at 35% opacity
- 80 floating dust particles (`THREE.Points`, size 0.04, silver, 60% opacity)
- Group rotates `time * 0.08 + mouseX * 0.25` on Y axis; mouse parallax on camera position
- Fog: `THREE.Fog(0x0a1628, 18, 80)`
- If `prefers-reduced-motion: reduce`: no rotation, no particles
- Production: rewrite as `<Canvas>` from `@react-three/fiber`; the geometry can stay declarative.

### 3. Trust strip (`design/sections-mid.jsx` → `TrustStrip`)
- Bordered top + bottom strip on `var(--ink)`, `py-14`
- 4-up grid (2-up on mobile)
  - License `CGC1538931` — rendered in **JetBrains Mono**, 26–34px
  - Projects `120+` — counter-up to 120 with `+` suffix, display font 52–72px
  - Years `15` — counter-up, display font
  - Counties `3` — counter-up, display font
- Each value: small monospace label below (`text-[12px] tracking-[0.18em] uppercase text-[var(--silver)]`)
- Counter implementation: `CountUp` component in `ui.jsx` — eases over `1.6s` after a `250ms` start delay, with a hard fallback at `duration + 1200ms` to force the final value if `requestAnimationFrame` is throttled

### 4. Services (`Services`)
- Dark section, 12-col grid
- Header: monospace eyebrow `02 / Services` + big section H2 lede in the right 6 cols
- Six rows separated by `border-t border-white/[0.08]`:
  - 2-col number (`01–06`, monospace)
  - 5-col title (display, 28–44px)
  - 5-col description (silver, 15–16px)
  - 1-col chevron in a 40×40 circle (border becomes accent on hover, rotates `-45deg`)
- **3D tilt on hover**: each row tilts via `perspective(900px) rotateX rotateY` driven by cursor position (mapped to ±6°)
- Bottom border accent rule fades in on hover: `bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent`

| # | Title (EN) | Title (ES) |
|---|---|---|
| 01 | New Construction | Construcción Nueva |
| 02 | Custom Homes | Casas a Medida |
| 03 | Commercial Build-outs | Locales Comerciales |
| 04 | Remodels & Additions | Remodelaciones |
| 05 | Project Management | Dirección de Obra |
| 06 | Design-Build | Diseño-Construcción |

(Full descriptions in `design/copy.js`.)

### 5. Featured Work (`Work` + `ProjectModal`)
- Header same pattern as Services
- Asymmetric 12-col masonry, `auto-rows: 300px`, project tile spans:
  - P1: `col-span-7 row-span-2` (h `620`) — feature
  - P2: `col-span-5` (h `300`)
  - P3: `col-span-5` (h `300`)
  - P4–P6: `col-span-4` (h `360` each)
- Each tile = `ArchPlaceholder` (striped architectural SVG, tinted warm/cool/steel) + overlay containing:
  - Top: type pill (e.g. `Custom Home`) + year monospace
  - Bottom: location label (mono), project name (display 24–32px), and a hidden "View project →" row that fades up on hover
- Tile scales `1.03` on hover (700ms)
- Click → opens **project modal**

**Project modal** (`ProjectModal`):
- Slides in from the right (`x: 100% → 0`, `0.5s`)
- Backdrop: `bg-[var(--ink)]/80 backdrop-blur-md`
- Max width 1100px, full height, scrollable
- Top: hero image (520px placeholder with the project's tone)
- Below: monospace meta line (`location · year`), big H2, scope paragraph
- 4-up metadata strip (Type / Area / Year / Status — separated by top border)
- 2-up detail image placeholders (280px each, alternating tones)
- Bordered "Note" card explaining where real photos go
- Close: top-right circular button or `Escape` key

Projects data in `design/copy.js` (`window.PROJECTS`):
1. Coral Gables Residence — 2025 · Custom Home · 6,400 sf
2. Brickell Penthouse — 2025 · Remodel · 3,200 sf
3. Doral Industrial Flex — 2024 · Commercial · 18,000 sf
4. Pinecrest Pavilion — 2024 · Addition · 1,800 sf
5. Wynwood Café — 2024 · Commercial · 2,400 sf
6. Fort Lauderdale Estate — 2023 · Custom Home · 8,100 sf

### 6. Process (`Process`)
- Scroll-jacked horizontal timeline
- Outer section height: `${steps.length * 90}vh` (450vh for 5 steps)
- Inner sticky container at top, full-screen
- Header (top, absolute): eyebrow `04 / Process` + H2 lede
- Track: horizontal flex of 5 step cards, each `60vw lg:52vw` wide, gap 8–12. Translates `x: 0 → -80%` over scroll progress (Framer Motion `useScroll` + `useTransform`)
- Each step card:
  - Left 7 cols: monospace `01 / 05` accent label, huge display number+title (64–120px), supporting paragraph
  - Right 5 cols: `ProcessDiagram` SVG that "builds up" — site outline → walls → permit seal → tower with windows → flag "CO ISSUED"
- Bottom: monospace `Phase` / progress bar (fills `0 → 100%`) / `Complete` row

Steps: Consult → Design → Permit → Build → Deliver

### 7. About (`About`)
- 12-col split: left 5 = sticky portrait `ArchPlaceholder` (warm, h 620, labeled `DANIELA + DENNIS VARELA`); right 7 = copy
- Eyebrow `05 / About`
- Massive H2: "A Miami family in the building business." (ES: "Una familia de Miami en el negocio de construir.")
- Two paragraphs (mist, then silver, both 17–20px)
- Tag row — 4 pill chips (`State-licensed`, `Insured & bonded`, `English / Español`, `South-Florida-born`)
- 2-up signature block at bottom: Qualifier (Daniela, CGC1538931) and Operations (Dennis, phone)

### 8. Why DRV (`WhyDRV`)
- Background switches to `var(--ink-2)` for visual rhythm
- 3-col grid of 6 cards, separated by 1px lines (`gap-px` + bg trick)
- Each card: accent monospace `01–06`, H3 (24–30px), description (silver)
- Hover: card lightens to `var(--ink)`; top-left horizontal blue rule grows from 0 → full width
- Items: Licensed & insured · On-time delivery (92%) · Transparent pricing · English / Español · South-Florida-born · Single point of contact

### 9. Testimonials (`Testimonials`)
- Back to `var(--ink)`
- Header pattern (eyebrow `07` + lede)
- Carousel: 4 quotes, autoadvance every `6.5s` (paused under reduced-motion)
- Quote rendered as display font 28–40px, italic quote marks SVG in accent blue
- Author row: initials avatar (10×10 circle, monospace), name, role
- Footer row: progress dashes (each becomes `w-12 bg-[var(--mist)]` when active) on the left; prev/next circular buttons on the right

### 10. Service Area (`ServiceArea`)
- Background `var(--ink-2)`
- 12-col layout: left 8 = stylized SVG map (4:5 / 5:6 aspect); right 4 = county list
- Map (`MapSVG`):
  - Two grid pattern layers (`mapgrid` 40px + `mapgridfine` 8px)
  - Atlantic ocean mass on the right edge (curved path, `rgba(31,41,55,0.4)` fill, accent-blue coastline stroke)
  - Everglades wash on the left (rgba `rgba(31,41,55,0.25)`)
  - Two horizontal dashed dividers separating the three counties
  - County labels: "PALM BEACH", "BROWARD", "MIAMI-DADE" (monospace, silver 50%)
  - Atlantic label + Everglades label
  - I-95 hint as a dashed accent line
- Pins (from `window.PINS`): 10 absolute-positioned dots (`2.5px` accent core + ping ring) with tooltip labels that fade in on hover
- Right side: 3 county cards (`bg-[var(--ink)]`, accent-colored border on hover) — Miami-Dade (62), Broward (38), Palm Beach (24)

### 11. Contact (`Contact`)
- `var(--ink)` with a giant decorative `DRV` wordmark at 260–440px in `text-white/[0.025]` floating at bottom-right (purely decorative)
- 12-col split:
  - Left 5: eyebrow `09 / Start a project`, H2 "Let's talk about your site.", kicker, then 4 direct-contact rows (label + value; hover turns accent):
    - Email — `mailto:`
    - Main — `tel:+17864819455`
    - Dennis — `tel:+17869614047`
    - Office address
  - Right 7: form with rows on a `bg-white/[0.04]` panel, separated by 1px gaps:
    - Name
    - Email + Phone (2-up)
    - Project type — pill chips (6 options); selected = accent-filled
    - Message — textarea (5 rows)
    - Footer row: monospace `Response within 1 business day` + accent magnetic "Send inquiry" button
- On submit (`AnimatePresence`):
  - Form fades out
  - Success card fades up: check icon in accent-bordered circle, "Thanks. We'll be in touch within one business day.", and a fake monospace inquiry ID `DRV-2026-0142`

### 12. Footer (`Footer`)
- `var(--ink-2)`
- Giant decorative `DRV` wordmark (clamp `96px → 360px`, weight 700, tight tracking) at the top
- Right-aligned tagline overlapping the wordmark baseline
- 4-column row separated above by 1px border:
  - Contact (email, two phones — Dennis labelled)
  - Office (address, two lines)
  - Legal (Florida CGC1538931, Daniela Varela · Qualifier)
  - Social (IG / FB / LI as 40×40 circular outline buttons with 10px monospace labels)
- Bottom: copyright + `Designed in Miami · v2026.1` rule

---

## Interactions & Behavior

### Navigation
- Header anchor links scroll-smooth to `#work`, `#services`, `#process`, `#about`, `#contact`
- Logo (top-left) scrolls to top
- Nav background, padding, and border-radius animate as `scrollY` crosses 40px

### Magnetic buttons (`MagneticBtn`)
- On `mousemove` within the button, the button translates 25% of the cursor's offset from its center
- On `mouseleave`, springs back to `(0,0)`
- Variants: `primary` (mist bg / ink text), `ghost` (transparent + border), `accent` (electric-blue bg + glow shadow)
- Use these for every primary CTA on the page

### Headline split reveal
- Each line wrapped in `overflow: hidden`; inner `<span>` animates `translateY(110%) → 0` via CSS keyframe `splitUp` (1.05s, expo-out, staggered by `0.12s`)
- Note: the prototype originally used Framer Motion's `useInView` for these, but it was swapped to a CSS keyframe so the headline is always visible even when the tab is throttled or animations fail to start. Production may reintroduce IO-driven reveals — just keep a server-rendered visible fallback.

### Service cards 3D tilt
- Pointer-driven `rotateX/rotateY` (±6°, smooth `0.25s ease-out`)
- Hover stroke at the bottom (`linear-gradient` blue rule)
- Chevron circle border turns accent + rotates `-45°`

### Project modal
- Slide-in from right (`0.5s` expo-out)
- `Escape` to close (`useEffect` keydown listener)
- Clicking the backdrop closes
- `document.body.overflow = "hidden"` while open

### Process scroll-jack
- `useScroll({ target, offset: ["start start", "end end"] })`
- `useTransform` maps `0..1` to track `x: 0% → -80%` and progress bar width `0% → 100%`
- Outer section is tall enough (`90vh × steps`) to give meaningful scroll length per step

### Testimonials autoplay
- `setInterval` every 6.5s, paused under `prefers-reduced-motion`
- Manual navigation via dashes or prev/next; both reset autoplay implicitly (advances from manual index)

### Contact form
- Local state only; submit handler `e.preventDefault()` and toggles `sent` to show success card
- Pill-chip selector for project type (6 options) — visually mark the selected one with accent fill
- For production: wire to an email service (Resend, Postmark, or a Netlify/Vercel form), add `zod` validation (name required, email format, message ≥ 10 chars), spam protection (honeypot or hCaptcha)

### EN/ES language toggle
- `LangProvider` context in `design/ui.jsx`
- All copy strings live in `design/copy.js` under `window.COPY.en` and `window.COPY.es`
- Toggle in nav swaps `lang` state; entire tree re-renders with translated copy
- For production: implement via `next-intl` or `next.js` `app` router locales (`/en`, `/es`); keep the same key structure as `copy.js`

### Tweaks panel (`design/app.jsx` → `TweaksApp`)
- This is **a designer-facing prototype affordance**, not a feature for the production site.
- It lets the reviewer flip accent color (5 swatches), headline font (4 options), and trust-strip visibility
- **Do not ship this panel in production.** Remove it from the production build. The token defaults are what should be hardcoded.

### Accessibility
- Respect `prefers-reduced-motion`: all CSS animations should collapse to `0.01ms`. The 3D scene already short-circuits rotation and particles under that media query
- All anchor links use real `<a href>` patterns; nav buttons should be `<button>` with `aria-label`
- Form fields need proper `<label htmlFor>` pairing (the prototype uses visual labels only)
- Color contrast: silver-on-ink passes AA at 16px+ but is borderline at smaller sizes; verify your final ramp with axe
- The decorative crosshair corners and oversized DRV wordmark should be `aria-hidden="true"` in production

---

## State Management

Minimal — all local component state. For production:

| Component | State | Notes |
|---|---|---|
| `Nav` | `scrolled: boolean` | from `window.scroll` listener |
| `App` | `project: Project \| null` | controls the modal |
| `Services` | `hovered: number \| null` | which row is active |
| `Testimonials` | `i: number` | active index + autoplay interval |
| `ServiceArea` | `hovered: number \| null` | which pin is hovered |
| `Contact` | `form, sent` | form fields + success state |
| `LangProvider` | `lang: 'en' \| 'es'` | i18n |

No server state required at design time. Production: contact form submit → POST to email service.

---

## Assets

| Asset | Path | Notes |
|---|---|---|
| DRV logo | `design/assets/drv-logo.png` | Used in nav (inverted via CSS); for production export a proper light SVG and reserve the dark PNG for light contexts |
| Original logo upload | `reference/DRV_logo.png` | Source file as provided by client |
| Florida license PDF | `reference/license9312456.pdf` | Source-of-truth for CGC1538931 |

### Photography placeholders
Every project tile, About portrait, and modal hero is an `ArchPlaceholder` — a striped SVG with a tinted gradient and a window-grid pattern. They are clearly marked `[ photo ]` in monospace. They need to be swapped with real photography:

- 6 featured-project hero images (one per project)
- 2 detail images per project (inside the modal, for ~12 more)
- 1 portrait of Daniela and Dennis Varela (About section)
- Optional: a real hero photo or full-bleed Miami skyline as an alternative to the 3D scene

Photo treatment: dark, architectural, no people in hardhats, no clipart construction tropes. Subtle film grain or atmospheric haze welcome.

---

## Copy & Tone

- Confident, declarative, short sentences. No "we are committed to excellence" filler.
- All EN/ES strings live in `design/copy.js` — keep keys identical when porting to `next-intl`.
- SEO keywords to weave naturally into meta + body: *South Florida general contractor, Miami custom home builder, licensed contractor Miami-Dade, Broward general contractor, design-build Miami*.

---

## Files

```
design_handoff_drv_site/
├── README.md                          ← this file
├── design/
│   ├── index.html                     ← entry; styles + CDN script imports + loader
│   ├── app.jsx                        ← React entry, Tweaks panel, root <App>
│   ├── ui.jsx                         ← LangProvider, MagneticBtn, Reveal, SplitHeadline, CountUp, Eyebrow, ArchPlaceholder
│   ├── copy.js                        ← all EN/ES strings + projects/testimonials/pins data
│   ├── hero-scene.js                  ← Three.js wireframe-building scene (imperative)
│   ├── sections-hero.jsx              ← Nav + Hero
│   ├── sections-mid.jsx               ← TrustStrip, Services, Work, ProjectModal, Process
│   ├── sections-end.jsx               ← About, WhyDRV, Testimonials, ServiceArea, Contact, Footer
│   ├── tweaks-panel.jsx               ← designer-only panel; do not port
│   └── assets/
│       └── drv-logo.png
└── reference/
    ├── DRV_logo.png                   ← original client upload
    └── license9312456.pdf             ← Florida CGC1538931
```

### How to open the prototype locally
The HTML is fully self-contained other than CDN imports. From the `design/` folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Hit `EN`/`ES` in the nav to swap languages. The "Tweaks" toggle in the host shell exposes the accent/font controls — those are review-only and should not ship.

---

## Implementation checklist (recommended order)

1. Bootstrap Next.js + Tailwind + TypeScript; install Framer Motion, `@react-three/fiber`, `@react-three/drei`, `next/font`, `react-hook-form`, `zod`, optionally `lenis`
2. Port the CSS variables and font setup into `tailwind.config.ts` + `globals.css` (extend `colors`, `fontFamily`, add custom font sizes if desired)
3. Bring over `copy.js` as `lib/content.ts` (typed), or migrate to `next-intl` JSON
4. Rebuild `Nav` and `Hero` first — including the R3F port of the wireframe scene
5. Rebuild static sections in this order: TrustStrip → Services → Work (with modal) → About → WhyDRV → Testimonials → ServiceArea → Contact → Footer
6. Wire the contact form to a real submit endpoint; add validation + spam protection
7. Swap `ArchPlaceholder` for real photography (`next/image` with explicit width/height + `priority` on the hero variant)
8. Run `axe` and Lighthouse; verify CLS = 0 (the hero canvas should `aspect-ratio` reserve space), LCP < 2.5s on 3G
9. Add SEO meta + JSON-LD `LocalBusiness` schema for the company (use the legal/contact block in this README)
10. Remove the Tweaks panel and any `cdn.tailwindcss.com` script tags from the production build

Reach out to the design owner before changing any of: the headline copy, the accent color, the type ramp, or the dark-mode-default treatment.

// ============================================================================
// Trust strip · Services · Work · Process
// ============================================================================
const { useState: useS2, useRef: useR2, useEffect: useE2 } = React;
const { motion: m2, useScroll: useScroll2, useTransform: useTransform2, useInView: useInView2 } = window.framerMotion;
const { Eyebrow: Eyebrow2, Reveal: Reveal2, CountUp: CountUp2, ArchPlaceholder: Arch2, MagneticBtn: Mag2, useLang: useLang2 } = window.DRV_UI;

// ---- Trust strip -----------------------------------------------------------
function TrustStrip() {
  const { t } = useLang2();
  const items = [
    { v: t.trust.lic.v, l: t.trust.lic.l, mono: true },
    { v: 120, suffix: "+", l: t.trust.proj.l },
    { v: 15, l: t.trust.yrs.l },
    { v: 3, l: t.trust.cnt.l }
  ];
  return (
    <section className="relative border-y border-white/[0.06] bg-[var(--ink)]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {items.map((it, i) => (
          <Reveal2 key={i} delay={i * 0.08} className="flex flex-col">
            <div className={`text-[var(--mist)] ${it.mono ? "font-mono text-[26px] lg:text-[34px] tracking-[0.04em]" : "font-display text-[52px] lg:text-[72px] leading-none tracking-[-0.03em] font-[650]"}`}>
              {it.mono ? it.v : <CountUp2 to={it.v} suffix={it.suffix || ""} />}
            </div>
            <div className="mt-3 text-[12px] font-mono tracking-[0.18em] uppercase text-[var(--silver)]">{it.l}</div>
            {i < 3 && <div className="hidden lg:block absolute" />}
          </Reveal2>
        ))}
      </div>
    </section>
  );
}

// ---- Services --------------------------------------------------------------
function ServiceCard({ item, idx, hovered, setHovered }) {
  const ref = useR2(null);
  const [tilt, setTilt] = useS2({ x: 0, y: 0 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6, y: px * 6 });
  }
  function onLeave() { setTilt({ x: 0, y: 0 }); setHovered(null); }

  const active = hovered === idx;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(idx)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative border-t border-white/[0.08] py-10 lg:py-12 cursor-pointer"
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.25s ease-out" }}
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-2 lg:col-span-1 font-mono text-[12px] tracking-[0.18em] text-[var(--silver)] mt-2">{item.n}</div>
        <div className="col-span-10 lg:col-span-5">
          <h3 className={`font-display text-[28px] lg:text-[44px] leading-[1.05] tracking-[-0.02em] font-[600] transition-colors duration-300 ${active ? "text-[var(--mist)]" : "text-[var(--mist)]/85"}`}>
            {item.t}
          </h3>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-7">
          <p className="text-[15px] lg:text-[16px] leading-[1.5] text-[var(--silver)] max-w-md">{item.d}</p>
        </div>
        <div className="col-span-12 lg:col-span-1 flex lg:justify-end">
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${active ? "border-[var(--accent)] bg-[var(--accent)]/10 rotate-[-45deg]" : "border-white/15"}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      {/* Hover glow */}
      <div className={`absolute inset-x-0 -bottom-px h-px transition-all duration-500 ${active ? "bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" : "bg-transparent"}`} />
    </div>
  );
}

function Services() {
  const { t } = useLang2();
  const [hovered, setHovered] = useS2(null);

  return (
    <section id="services" className="relative bg-[var(--ink)] py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow2 n="02">{t.services.title}</Eyebrow2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal2>
              <h2 className="font-display text-[40px] lg:text-[64px] leading-[1.02] tracking-[-0.03em] font-[600] text-[var(--mist)]">
                {t.services.kicker}
              </h2>
            </Reveal2>
          </div>
        </div>
        <div className="border-b border-white/[0.08]">
          {t.services.items.map((it, i) => (
            <ServiceCard key={i} item={it} idx={i} hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Featured Work ---------------------------------------------------------
function Work({ onOpen }) {
  const { t } = useLang2();
  const projects = window.PROJECTS;

  // Masonry-ish asymmetric grid using grid spans
  const spans = [
    "lg:col-span-7 lg:row-span-2",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-4"
  ];
  const heights = [620, 300, 300, 360, 360, 360];

  return (
    <section id="work" className="relative bg-[var(--ink)] py-32 lg:py-44 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow2 n="03">{t.work.title}</Eyebrow2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col gap-6">
            <Reveal2>
              <h2 className="font-display text-[40px] lg:text-[64px] leading-[1.02] tracking-[-0.03em] font-[600] text-[var(--mist)]">{t.work.kicker}</h2>
            </Reveal2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 lg:auto-rows-[300px]">
          {projects.map((p, i) => (
            <Reveal2 key={p.id} delay={i * 0.05} className={`${spans[i]} relative group cursor-pointer overflow-hidden`} >
              <div onClick={() => onOpen(p)} className="block h-full w-full">
                <Arch2 tone={p.tone} h={heights[i]} className="h-full transition-transform duration-700 group-hover:scale-[1.03]" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--ink)] opacity-90" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--mist)]/70 backdrop-blur-sm bg-white/5 border border-white/10 rounded-full px-3 py-1">{p.type}</span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--mist)]/70">{p.year}</span>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] mb-2">{p.loc}</div>
                    <h3 className="font-display text-[24px] lg:text-[32px] leading-[1.05] tracking-[-0.02em] font-[600] text-[var(--mist)]">{p.name}</h3>
                    <div className="mt-4 flex items-center gap-3 text-[var(--mist)]/80 text-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                      <span>View project</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal2>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Mag2 variant="ghost" onClick={() => onOpen(window.PROJECTS[0])}>{t.work.cta}</Mag2>
        </div>
      </div>
    </section>
  );
}

// ---- Project modal ---------------------------------------------------------
function ProjectModal({ project, onClose }) {
  useE2(() => {
    function esc(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", esc);
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [project, onClose]);

  return (
    <window.framerMotion.AnimatePresence>
      {project && (
        <m2.div
          className="fixed inset-0 z-[100] bg-[var(--ink)]/80 backdrop-blur-md flex items-stretch justify-end"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m2.div
            className="relative w-full lg:max-w-[1100px] h-full overflow-y-auto bg-[var(--ink-2)] border-l border-white/[0.06]"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-[var(--mist)]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <Arch2 tone={project.tone} h={520} label={project.name.toUpperCase()} />
            <div className="px-8 lg:px-14 py-12 lg:py-16">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-4">{project.loc} · {project.year}</div>
              <h2 className="font-display text-[40px] lg:text-[64px] leading-[1.02] tracking-[-0.03em] font-[600] text-[var(--mist)]">{project.name}</h2>
              <p className="mt-6 text-[16px] text-[var(--silver)] max-w-2xl leading-[1.55]">{project.scope}</p>

              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/[0.06] pt-10">
                {[
                  ["Type", project.type],
                  ["Area", project.sqft],
                  ["Year", String(project.year)],
                  ["Status", "Delivered"]
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] mb-2">{k}</div>
                    <div className="text-[var(--mist)] text-[18px] font-[500]">{v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4">
                <Arch2 tone={project.tone} h={280} />
                <Arch2 tone={project.tone === "warm" ? "steel" : "warm"} h={280} />
              </div>

              <div className="mt-12 p-8 lg:p-10 border border-white/[0.06] rounded-2xl bg-white/[0.02]">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-3">Note</div>
                <p className="text-[15px] text-[var(--mist)]/80 leading-[1.55]">Real project photography goes here. We'll drop in 6–10 high-resolution images per project with before/after pairings and detail shots.</p>
              </div>
            </div>
          </m2.div>
        </m2.div>
      )}
    </window.framerMotion.AnimatePresence>
  );
}

// ---- Process (horizontal scroll-jacked) ------------------------------------
function Process() {
  const { t } = useLang2();
  const ref = useR2(null);
  const { scrollYProgress } = useScroll2({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform2(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const progressW = useTransform2(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = t.process.steps;

  return (
    <section id="process" ref={ref} className="relative bg-[var(--ink-2)]" style={{ height: `${steps.length * 90}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 pt-32 px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px] flex items-end justify-between">
            <div>
              <Eyebrow2 n="04">{t.process.title}</Eyebrow2>
              <h2 className="mt-6 font-display text-[40px] lg:text-[64px] leading-[1.02] tracking-[-0.03em] font-[600] text-[var(--mist)] max-w-3xl">
                {t.process.kicker}
              </h2>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <m2.div style={{ x }} className="flex gap-8 lg:gap-12 pl-[10vw] pr-[10vw] pt-24">
          {steps.map((s, i) => (
            <div key={i} className="shrink-0 w-[80vw] lg:w-[60vw] xl:w-[52vw]">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-7">
                  <div className="font-mono text-[12px] tracking-[0.22em] text-[var(--accent)] mb-6">{s.n} / 05</div>
                  <h3 className="font-display text-[64px] lg:text-[120px] leading-[0.92] tracking-[-0.04em] font-[700] text-[var(--mist)]">{s.t}</h3>
                  <p className="mt-8 text-[17px] lg:text-[19px] text-[var(--silver)] max-w-lg leading-[1.5]">{s.d}</p>
                </div>
                <div className="col-span-12 lg:col-span-5 lg:pl-8 flex items-center">
                  <ProcessDiagram step={i} />
                </div>
              </div>
            </div>
          ))}
        </m2.div>

        {/* Progress bar */}
        <div className="absolute bottom-12 left-6 right-6 lg:left-10 lg:right-10">
          <div className="mx-auto max-w-[1400px] flex items-center gap-6">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">Phase</span>
            <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
              <m2.div className="absolute inset-y-0 left-0 bg-[var(--accent)]" style={{ width: progressW }} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">Complete</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessDiagram({ step }) {
  // A simple SVG that "builds up" across steps
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[360px]">
      <defs>
        <pattern id="pgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(156,163,175,0.12)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#pgrid)" />
      {/* Plot lines */}
      <line x1="50" y1="250" x2="350" y2="250" stroke="#9CA3AF" strokeOpacity="0.4" strokeWidth="1" />
      {step >= 0 && <line x1="50" y1="250" x2="50" y2="50" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 4" />}

      {/* Step 1: site outline */}
      {step >= 0 && <rect x="80" y="170" width="240" height="80" fill="none" stroke="#9CA3AF" strokeOpacity="0.5" strokeDasharray="3 3" />}
      {/* Step 2: building footprint + walls */}
      {step >= 1 && <rect x="110" y="120" width="180" height="130" fill="none" stroke="#9CA3AF" strokeWidth="1" />}
      {step >= 1 && <line x1="110" y1="170" x2="290" y2="170" stroke="#9CA3AF" strokeOpacity="0.7" />}
      {/* Step 3: permits/seals */}
      {step >= 2 && (
        <g>
          <circle cx="330" cy="80" r="22" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <circle cx="330" cy="80" r="14" fill="none" stroke="#3B82F6" strokeOpacity="0.5" strokeWidth="1" />
          <text x="330" y="84" textAnchor="middle" fill="#3B82F6" fontSize="9" fontFamily="monospace">CGC</text>
        </g>
      )}
      {/* Step 4: building filled */}
      {step >= 3 && (
        <g>
          <rect x="110" y="80" width="180" height="170" fill="#3B82F6" fillOpacity="0.08" />
          {[0,1,2,3].map(r => [0,1,2,3,4,5].map(c => (
            <rect key={`${r}-${c}`} x={130 + c * 27} y={100 + r * 35} width="14" height="20" fill="#3B82F6" fillOpacity={0.3 + r*0.1} />
          )))}
        </g>
      )}
      {/* Step 5: flag/delivered */}
      {step >= 4 && (
        <g>
          <line x1="200" y1="80" x2="200" y2="50" stroke="#3B82F6" strokeWidth="2" />
          <polygon points="200,50 230,58 200,66" fill="#3B82F6" />
          <text x="240" y="62" fill="#F8FAFC" fontSize="10" fontFamily="monospace">CO ISSUED</text>
        </g>
      )}
    </svg>
  );
}

window.DRV_MID = { TrustStrip, Services, Work, ProjectModal, Process };

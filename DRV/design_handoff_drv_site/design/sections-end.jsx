// ============================================================================
// About · Why DRV · Testimonials · Area · Contact · Footer
// ============================================================================
const { useState: useS3, useEffect: useE3, useRef: useR3 } = React;
const { motion: m3, AnimatePresence: AP3 } = window.framerMotion;
const { Eyebrow: Ey3, Reveal: Rv3, ArchPlaceholder: Arch3, MagneticBtn: Mag3, useLang: useLang3, CountUp: CU3 } = window.DRV_UI;

// ---- About -----------------------------------------------------------------
function About() {
  const { t } = useLang3();
  return (
    <section id="about" className="relative bg-[var(--ink)] py-32 lg:py-44 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Arch3 tone="warm" h={620} label="DANIELA + DENNIS VARELA" className="rounded-sm" />
              <div className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] flex justify-between">
                <span>[ portrait placeholder ]</span>
                <span>Miami · FL</span>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <Ey3 n="05">{t.about.kicker}</Ey3>
            <Rv3>
              <h2 className="mt-8 font-display text-[44px] lg:text-[80px] leading-[0.98] tracking-[-0.035em] font-[650] text-[var(--mist)]">
                {t.about.title}
              </h2>
            </Rv3>
            <Rv3 delay={0.2}>
              <p className="mt-10 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--mist)]/85 max-w-xl">{t.about.body_1}</p>
            </Rv3>
            <Rv3 delay={0.3}>
              <p className="mt-6 text-[17px] leading-[1.55] text-[var(--silver)] max-w-xl">{t.about.body_2}</p>
            </Rv3>
            <Rv3 delay={0.4} className="mt-10 flex flex-wrap gap-2">
              {t.about.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 text-[11px] font-mono tracking-[0.18em] uppercase border border-white/15 rounded-full text-[var(--silver)]">
                  {tag}
                </span>
              ))}
            </Rv3>

            {/* Signature mark */}
            <div className="mt-16 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] mb-2">Qualifier</div>
                <div className="text-[var(--mist)] text-[16px] font-[500]">Daniela Varela</div>
                <div className="font-mono text-[11px] text-[var(--silver)] mt-1">CGC1538931</div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] mb-2">Operations</div>
                <div className="text-[var(--mist)] text-[16px] font-[500]">Dennis Varela</div>
                <div className="font-mono text-[11px] text-[var(--silver)] mt-1">+1 (786) 961-4047</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Why DRV ---------------------------------------------------------------
function WhyDRV() {
  const { t } = useLang3();
  return (
    <section className="relative bg-[var(--ink-2)] py-32 lg:py-44 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <Ey3 n="06">{t.why.title}</Ey3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
          {t.why.items.map((it, i) => (
            <Rv3 key={i} delay={i * 0.06} className="relative bg-[var(--ink-2)] p-8 lg:p-10 group hover:bg-[var(--ink)] transition-colors duration-500">
              <div className="font-mono text-[11px] tracking-[0.22em] text-[var(--accent)] mb-6">{String(i+1).padStart(2,'0')}</div>
              <h3 className="font-display text-[24px] lg:text-[30px] leading-[1.1] tracking-[-0.02em] font-[600] text-[var(--mist)]">{it.t}</h3>
              <p className="mt-4 text-[15px] leading-[1.55] text-[var(--silver)]">{it.d}</p>
              {/* Hover stroke */}
              <div className="absolute left-0 top-0 h-px w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-500" />
            </Rv3>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Testimonials carousel -------------------------------------------------
function Testimonials() {
  const { t } = useLang3();
  const items = window.TESTIMONIALS;
  const [i, setI] = useS3(0);

  useE3(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI(x => (x + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="relative bg-[var(--ink)] py-32 lg:py-44 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <Ey3 n="07">{t.testi.title}</Ey3>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Rv3>
              <h2 className="font-display text-[36px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-[600] text-[var(--mist)]">
                {t.testi.kicker}
              </h2>
            </Rv3>
          </div>
        </div>

        <div className="relative min-h-[300px] lg:min-h-[260px]">
          <AP3 mode="wait">
            <m3.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 gap-6"
            >
              <div className="col-span-12 lg:col-span-1">
                <svg className="w-10 h-10 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 7h4v4H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V7zm9 0h4v4h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V7z"/>
                </svg>
              </div>
              <div className="col-span-12 lg:col-span-11">
                <p className="font-display text-[28px] lg:text-[40px] leading-[1.2] tracking-[-0.02em] font-[400] text-[var(--mist)] max-w-4xl">
                  "{items[i].q}"
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[12px] text-[var(--mist)]">
                    {items[i].n.split(" ").map(s => s[0]).join("")}
                  </div>
                  <div>
                    <div className="text-[var(--mist)] text-[15px] font-[500]">{items[i].n}</div>
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--silver)] mt-1">{items[i].r} · {items[i].proj}</div>
                  </div>
                </div>
              </div>
            </m3.div>
          </AP3>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {items.map((_, j) => (
              <button
                key={j}
                onClick={() => setI(j)}
                className={`h-px transition-all duration-500 ${i === j ? "w-12 bg-[var(--mist)]" : "w-6 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setI((i - 1 + items.length) % items.length)} className="w-11 h-11 rounded-full border border-white/15 hover:border-white/40 text-[var(--mist)] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={() => setI((i + 1) % items.length)} className="w-11 h-11 rounded-full border border-white/15 hover:border-white/40 text-[var(--mist)] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Service Area Map ------------------------------------------------------
function ServiceArea() {
  const { t } = useLang3();
  const [hovered, setHovered] = useS3(null);
  const pins = window.PINS;

  return (
    <section className="relative bg-[var(--ink-2)] py-32 lg:py-44 border-t border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <Ey3 n="08">{t.area.title}</Ey3>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Rv3>
              <h2 className="font-display text-[36px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-[600] text-[var(--mist)]">{t.area.kicker}</h2>
            </Rv3>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          {/* Map */}
          <div className="col-span-12 lg:col-span-8 relative aspect-[4/5] lg:aspect-[5/6] bg-[var(--ink)] border border-white/[0.06] overflow-hidden">
            <MapSVG />
            {/* Pins */}
            {pins.map((p, i) => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-6 h-6 rounded-full bg-[var(--accent)]/30 animate-ping" style={{ animationDelay: `${i*0.15}s` }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
                </span>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--mist)] bg-[var(--ink)]/90 border border-white/10 backdrop-blur-sm px-2 py-1 rounded transition-opacity duration-200 ${hovered === i ? "opacity-100" : "opacity-0"}`}>
                  {p.label}
                </span>
              </button>
            ))}
            {/* Compass / scale */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--silver)]/70 leading-relaxed">
                <div>SOUTH FLORIDA</div>
                <div>26.7°N · 80.2°W</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--silver)]/70">N ↑</div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-px bg-[var(--silver)]/50" />
                  <div className="font-mono text-[9px] text-[var(--silver)]/70">10 MI</div>
                </div>
              </div>
            </div>
          </div>

          {/* County list */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            {t.area.counties.map((c, i) => (
              <Rv3 key={c.n} delay={i * 0.1} className="p-6 lg:p-8 border border-white/[0.08] bg-[var(--ink)] hover:border-[var(--accent)]/50 transition-colors group">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">County 0{i+1}</div>
                <h3 className="mt-3 font-display text-[28px] lg:text-[36px] leading-[1.05] tracking-[-0.02em] font-[600] text-[var(--mist)] group-hover:text-[var(--accent)] transition-colors">{c.n}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[var(--silver)] text-[14px]">{c.c}</span>
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] group-hover:scale-150 transition-transform" />
                </div>
              </Rv3>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSVG() {
  // Stylized South Florida coastline silhouette
  return (
    <svg viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      <defs>
        <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(156,163,175,0.06)" strokeWidth="1" />
        </pattern>
        <pattern id="mapgridfine" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(156,163,175,0.03)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="600" height="700" fill="url(#mapgridfine)" />
      <rect width="600" height="700" fill="url(#mapgrid)" />

      {/* Atlantic — east side */}
      <path d="M 380 0 L 600 0 L 600 700 L 360 700 Q 380 600 370 500 Q 410 400 380 300 Q 420 200 395 100 Q 410 50 380 0 Z" fill="rgba(31,41,55,0.4)" />

      {/* Coastline stroke */}
      <path d="M 380 0 Q 410 50 395 100 Q 420 200 380 300 Q 410 400 370 500 Q 380 600 360 700"
        fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />

      {/* Everglades — west wash */}
      <path d="M 0 200 L 250 200 L 280 700 L 0 700 Z" fill="rgba(31,41,55,0.25)" />
      <path d="M 250 200 L 280 700" fill="none" stroke="rgba(156,163,175,0.15)" strokeWidth="1" strokeDasharray="2 4" />

      {/* County divisions */}
      <line x1="0" y1="220" x2="380" y2="220" stroke="rgba(156,163,175,0.15)" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="0" y1="400" x2="380" y2="400" stroke="rgba(156,163,175,0.15)" strokeWidth="1" strokeDasharray="3 6" />

      {/* County labels */}
      <text x="40" y="110" fill="rgba(156,163,175,0.5)" fontSize="11" fontFamily="monospace" letterSpacing="3">PALM BEACH</text>
      <text x="40" y="320" fill="rgba(156,163,175,0.5)" fontSize="11" fontFamily="monospace" letterSpacing="3">BROWARD</text>
      <text x="40" y="520" fill="rgba(156,163,175,0.5)" fontSize="11" fontFamily="monospace" letterSpacing="3">MIAMI-DADE</text>
      <text x="500" y="120" fill="rgba(59,130,246,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">ATLANTIC</text>
      <text x="40" y="600" fill="rgba(156,163,175,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="2">EVERGLADES</text>

      {/* Major routes (I-95 hint) */}
      <path d="M 360 0 Q 340 200 320 400 Q 300 600 280 700" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="6 4" />
      <text x="335" y="50" fill="rgba(59,130,246,0.5)" fontSize="9" fontFamily="monospace">I-95</text>
    </svg>
  );
}

// ---- Contact ---------------------------------------------------------------
function Contact() {
  const { t } = useLang3();
  const [form, setForm] = useS3({ name: "", email: "", phone: "", type: t.contact.types[0], msg: "" });
  const [sent, setSent] = useS3(false);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="relative bg-[var(--ink)] py-32 lg:py-44 border-t border-white/[0.06] overflow-hidden">
      {/* Decorative oversized DRV mark */}
      <div className="absolute -bottom-32 -right-20 pointer-events-none select-none font-display text-[260px] lg:text-[440px] font-[700] tracking-[-0.04em] text-white/[0.025] leading-none">
        DRV
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <Ey3 n="09">{t.contact.title}</Ey3>
            <Rv3>
              <h2 className="mt-8 font-display text-[44px] lg:text-[72px] leading-[0.98] tracking-[-0.035em] font-[650] text-[var(--mist)]">
                Let's talk about your site.
              </h2>
            </Rv3>
            <Rv3 delay={0.2}>
              <p className="mt-6 text-[17px] text-[var(--silver)] leading-[1.55] max-w-md">{t.contact.kicker}</p>
            </Rv3>

            <div className="mt-12 space-y-6">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">{t.contact.direct}</div>
              {[
                { label: "Email", val: "drvdevelopment17@gmail.com", href: "mailto:drvdevelopment17@gmail.com" },
                { label: "Main", val: "+1 (786) 481-9455", href: "tel:+17864819455" },
                { label: "Dennis", val: "+1 (786) 961-4047", href: "tel:+17869614047" },
                { label: "Office", val: "9040 NW 32 CT RD, Miami, FL 33147" }
              ].map((c, i) => (
                <a key={i} href={c.href} className="block group">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] mb-1">{c.label}</div>
                  <div className="text-[var(--mist)] text-[18px] lg:text-[20px] font-[500] group-hover:text-[var(--accent)] transition-colors">{c.val}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <form onSubmit={submit} className="relative">
              <AP3 mode="wait">
                {!sent ? (
                  <m3.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-px bg-white/[0.04] border border-white/[0.06]">
                    <FormRow label={t.contact.f_name}>
                      <input required value={form.name} onChange={e => set("name", e.target.value)} className="contact-input" placeholder="Your full name" />
                    </FormRow>
                    <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                      <FormRow label={t.contact.f_email}>
                        <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} className="contact-input" placeholder="you@email.com" />
                      </FormRow>
                      <FormRow label={t.contact.f_phone}>
                        <input value={form.phone} onChange={e => set("phone", e.target.value)} className="contact-input" placeholder="(305) 000-0000" />
                      </FormRow>
                    </div>
                    <FormRow label={t.contact.f_type}>
                      <div className="flex flex-wrap gap-2 px-6 pb-6 pt-1">
                        {t.contact.types.map(type => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => set("type", type)}
                            className={`px-4 py-2 rounded-full text-[12px] font-mono tracking-[0.14em] uppercase transition-all border ${form.type === type ? "bg-[var(--accent)] border-[var(--accent)] text-white" : "border-white/15 text-[var(--silver)] hover:border-white/30"}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </FormRow>
                    <FormRow label={t.contact.f_msg}>
                      <textarea rows={5} value={form.msg} onChange={e => set("msg", e.target.value)} className="contact-input resize-none" placeholder="Site address, timeline, budget range, anything we should know." />
                    </FormRow>
                    <div className="px-6 py-6 flex items-center justify-between">
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)]">Response within 1 business day</div>
                      <Mag3 as="button" variant="accent">{t.contact.submit}</Mag3>
                    </div>
                  </m3.div>
                ) : (
                  <m3.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.04] border border-[var(--accent)]/40 p-12 lg:p-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)] flex items-center justify-center mx-auto">
                      <svg className="w-7 h-7 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <h3 className="mt-8 font-display text-[32px] lg:text-[40px] tracking-[-0.02em] font-[600] text-[var(--mist)]">{t.contact.sent}</h3>
                    <div className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)]">Inquiry ID · DRV-2026-0142</div>
                  </m3.div>
                )}
              </AP3>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="bg-[var(--ink)] px-6 py-5">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-2">{label}</div>
      {children}
    </div>
  );
}

// ---- Footer ----------------------------------------------------------------
function Footer() {
  const { t } = useLang3();
  return (
    <footer className="relative bg-[var(--ink-2)] pt-20 lg:pt-28 pb-10 border-t border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Oversized wordmark */}
        <div className="relative">
          <div className="font-display text-[clamp(96px,22vw,360px)] font-[700] tracking-[-0.05em] text-[var(--mist)] leading-[0.85]">
            DRV
          </div>
          <div className="absolute right-0 bottom-4 lg:bottom-8 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] max-w-xs text-right">
            {t.footer.tag}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-12 gap-10 pt-10 border-t border-white/[0.06]">
          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-4">{t.footer.cols.contact}</div>
            <div className="space-y-2">
              <a href="mailto:drvdevelopment17@gmail.com" className="block text-[var(--mist)] text-[14px] hover:text-[var(--accent)] transition-colors">drvdevelopment17@gmail.com</a>
              <a href="tel:+17864819455" className="block text-[var(--mist)] text-[14px] hover:text-[var(--accent)] transition-colors">+1 (786) 481-9455</a>
              <a href="tel:+17869614047" className="block text-[var(--silver)] text-[14px] hover:text-[var(--accent)] transition-colors">+1 (786) 961-4047 — Dennis</a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-4">{t.footer.cols.office}</div>
            <div className="text-[var(--mist)] text-[14px] leading-[1.6]">
              9040 NW 32 CT RD<br />
              Miami, FL 33147
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-4">{t.footer.cols.legal}</div>
            <div className="text-[var(--mist)] text-[14px] leading-[1.6]">
              Florida CGC1538931<br />
              <span className="text-[var(--silver)]">Daniela Varela · Qualifier</span>
            </div>
          </div>
          <div className="lg:col-span-2 flex lg:justify-end">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-4">Social</div>
              <div className="flex gap-2">
                {["IG", "FB", "LI"].map(s => (
                  <a key={s} href="#" className="w-10 h-10 rounded-full border border-white/15 text-[var(--mist)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center font-mono text-[10px] tracking-[0.1em] transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)]">{t.footer.copyright}</div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)]">Designed in Miami · v2026.1</div>
        </div>
      </div>
    </footer>
  );
}

window.DRV_END = { About, WhyDRV, Testimonials, ServiceArea, Contact, Footer };

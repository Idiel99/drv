import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang, Eyebrow } from "../components/ui.jsx";

function ProcessDiagram({ step }) {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[360px]">
      <defs>
        <pattern id="pgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(156,163,175,0.12)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#pgrid)" />
      <line x1="50" y1="250" x2="350" y2="250" stroke="#9CA3AF" strokeOpacity="0.4" strokeWidth="1" />
      {step >= 0 && <line x1="50" y1="250" x2="50" y2="50" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 4" />}

      {step >= 0 && <rect x="80" y="170" width="240" height="80" fill="none" stroke="#9CA3AF" strokeOpacity="0.5" strokeDasharray="3 3" />}
      {step >= 1 && <rect x="110" y="120" width="180" height="130" fill="none" stroke="#9CA3AF" strokeWidth="1" />}
      {step >= 1 && <line x1="110" y1="170" x2="290" y2="170" stroke="#9CA3AF" strokeOpacity="0.7" />}
      {step >= 2 && (
        <g>
          <circle cx="330" cy="80" r="22" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <circle cx="330" cy="80" r="14" fill="none" stroke="#3B82F6" strokeOpacity="0.5" strokeWidth="1" />
          <text x="330" y="84" textAnchor="middle" fill="#3B82F6" fontSize="9" fontFamily="monospace">CGC</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="110" y="80" width="180" height="170" fill="#3B82F6" fillOpacity="0.08" />
          {[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4, 5].map(c => (
            <rect key={`${r}-${c}`} x={130 + c * 27} y={100 + r * 35} width="14" height="20" fill="#3B82F6" fillOpacity={0.3 + r * 0.1} />
          )))}
        </g>
      )}
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

export function Process() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = t.process.steps;

  return (
    <section id="process" className="relative bg-[var(--ink-2)]">
      {/* Mobile / tablet: simple vertical stack (no sticky horizontal scroll) */}
      <div className="lg:hidden mx-auto max-w-[1400px] px-6 py-28">
        <Eyebrow n="04">{t.process.title}</Eyebrow>
        <h2 className="mt-6 font-display text-[34px] sm:text-[44px] leading-[1.05] tracking-[-0.03em] font-[600] text-[var(--mist)]">
          {t.process.kicker}
        </h2>
        <div className="mt-14 space-y-14">
          {steps.map((s, i) => (
            <div key={i} className="border-t border-white/[0.08] pt-8">
              <div className="font-mono text-[12px] tracking-[0.22em] text-[var(--accent)] mb-4">{s.n} / 05</div>
              <h3 className="font-display text-[44px] sm:text-[64px] leading-[0.95] tracking-[-0.03em] font-[700] text-[var(--mist)]">{s.t}</h3>
              <p className="mt-5 text-[16px] sm:text-[17px] text-[var(--silver)] max-w-lg leading-[1.5]">{s.d}</p>
              <div className="mt-8 max-w-sm">
                <ProcessDiagram step={i} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: sticky horizontal scroll */}
      <div ref={ref} className="hidden lg:block relative" style={{ height: `${steps.length * 90}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          {/* Header — in normal flow so it reserves its own space */}
          <div className="shrink-0 pt-28 pb-6 px-10">
            <div className="mx-auto max-w-[1400px]">
              <Eyebrow n="04">{t.process.title}</Eyebrow>
              <h2 className="mt-5 font-display text-[36px] xl:text-[48px] leading-[1.05] tracking-[-0.03em] font-[600] text-[var(--mist)] max-w-4xl">
                {t.process.kicker}
              </h2>
            </div>
          </div>

          {/* Cards — fill and center within the space left below the header */}
          <div className="flex-1 min-h-0 flex items-center">
            <motion.div style={{ x }} className="flex gap-12 pl-[10vw] pr-[10vw]">
              {steps.map((s, i) => (
                <div key={i} className="shrink-0 w-[58vw] xl:w-[50vw]">
                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-7">
                      <div className="font-mono text-[12px] tracking-[0.22em] text-[var(--accent)] mb-5">{s.n} / 05</div>
                      <h3 className="font-display text-[clamp(64px,7.5vw,104px)] leading-[0.92] tracking-[-0.04em] font-[700] text-[var(--mist)]">{s.t}</h3>
                      <p className="mt-6 text-[18px] text-[var(--silver)] max-w-lg leading-[1.5]">{s.d}</p>
                    </div>
                    <div className="col-span-5 pl-8 flex items-center">
                      <ProcessDiagram step={i} />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Progress — in normal flow at the bottom */}
          <div className="shrink-0 pb-10 px-10">
            <div className="mx-auto max-w-[1400px] flex items-center gap-6">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">Phase</span>
              <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 bg-[var(--accent)]" style={{ width: progressW }} />
              </div>
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">Complete</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

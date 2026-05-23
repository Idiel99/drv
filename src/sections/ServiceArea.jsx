import React, { useState } from "react";
import { useLang, Eyebrow, Reveal } from "../components/ui.jsx";
import { PINS } from "../data/content.js";

function MapSVG() {
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

      <path d="M 380 0 L 600 0 L 600 700 L 360 700 Q 380 600 370 500 Q 410 400 380 300 Q 420 200 395 100 Q 410 50 380 0 Z" fill="rgba(31,41,55,0.4)" />

      <path d="M 380 0 Q 410 50 395 100 Q 420 200 380 300 Q 410 400 370 500 Q 380 600 360 700"
        fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />

      <path d="M 0 200 L 250 200 L 280 700 L 0 700 Z" fill="rgba(31,41,55,0.25)" />
      <path d="M 250 200 L 280 700" fill="none" stroke="rgba(156,163,175,0.15)" strokeWidth="1" strokeDasharray="2 4" />

      <line x1="0" y1="220" x2="380" y2="220" stroke="rgba(156,163,175,0.15)" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="0" y1="400" x2="380" y2="400" stroke="rgba(156,163,175,0.15)" strokeWidth="1" strokeDasharray="3 6" />

      <text x="40" y="110" fill="rgba(156,163,175,0.5)" fontSize="11" fontFamily="monospace" letterSpacing="3">PALM BEACH</text>
      <text x="40" y="320" fill="rgba(156,163,175,0.5)" fontSize="11" fontFamily="monospace" letterSpacing="3">BROWARD</text>
      <text x="40" y="520" fill="rgba(156,163,175,0.5)" fontSize="11" fontFamily="monospace" letterSpacing="3">MIAMI-DADE</text>
      <text x="500" y="120" fill="rgba(59,130,246,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">ATLANTIC</text>
      <text x="40" y="600" fill="rgba(156,163,175,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="2">EVERGLADES</text>

      <path d="M 360 0 Q 340 200 320 400 Q 300 600 280 700" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="6 4" />
      <text x="335" y="50" fill="rgba(59,130,246,0.5)" fontSize="9" fontFamily="monospace">I-95</text>
    </svg>
  );
}

export function ServiceArea() {
  const { t } = useLang();
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative bg-[var(--ink-2)] py-32 lg:py-44 border-t border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow n="08">{t.area.title}</Eyebrow>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 className="font-display text-[36px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-[600] text-[var(--mist)]">{t.area.kicker}</h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-8 relative aspect-[4/5] lg:aspect-[5/6] bg-[var(--ink)] border border-white/[0.06] overflow-hidden">
            <MapSVG />
            {PINS.map((p, i) => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                aria-label={p.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-6 h-6 rounded-full bg-[var(--accent)]/30 animate-ping" style={{ animationDelay: `${i * 0.15}s` }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
                </span>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--mist)] bg-[var(--ink)]/90 border border-white/10 backdrop-blur-sm px-2 py-1 rounded transition-opacity duration-200 ${hovered === i ? "opacity-100" : "opacity-0"}`}>
                  {p.label}
                </span>
              </button>
            ))}
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

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            {t.area.counties.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.1} className="p-6 lg:p-8 border border-white/[0.08] bg-[var(--ink)] hover:border-[var(--accent)]/50 transition-colors group">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">County 0{i + 1}</div>
                <h3 className="mt-3 font-display text-[28px] lg:text-[36px] leading-[1.05] tracking-[-0.02em] font-[600] text-[var(--mist)] group-hover:text-[var(--accent)] transition-colors">{c.n}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[var(--silver)] text-[14px]">{c.c}</span>
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] group-hover:scale-150 transition-transform" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

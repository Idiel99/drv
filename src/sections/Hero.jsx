import React, { useEffect, useRef } from "react";
import { useLang, SplitHeadline, Reveal, MagneticBtn } from "../components/ui.jsx";
import { initHeroScene } from "../lib/heroScene.js";

export function Hero({ onContact, onWork }) {
  const { t } = useLang();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    return initHeroScene(canvasRef.current);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[var(--ink)]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(60% 50% at 70% 50%, rgba(59,130,246,0.10) 0%, transparent 70%)"
      }} />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[var(--ink)]/30 via-transparent to-[var(--ink)]" />

      {[["top-24 left-6", "tl"], ["top-24 right-6", "tr"], ["bottom-6 left-6", "bl"], ["bottom-6 right-6", "br"]].map(([cls, k]) => (
        <div key={k} className={`absolute ${cls} w-4 h-4 pointer-events-none`} aria-hidden="true">
          <div className="absolute inset-0" style={{
            borderColor: "rgba(255,255,255,0.2)",
            borderRightWidth: k.includes("r") ? 1 : 0,
            borderBottomWidth: k.includes("b") ? 1 : 0,
            borderLeftWidth: k.includes("l") ? 1 : 0,
            borderTopWidth: k.includes("t") ? 1 : 0,
            borderStyle: "solid"
          }} />
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 lg:pt-44 pb-32 min-h-screen flex flex-col">
        <Reveal delay={0.2} className="mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <span className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-[var(--accent)] animate-ping opacity-50" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">{t.hero.eyebrow}</span>
          </div>
        </Reveal>

        <SplitHeadline
          lines={[
            t.hero.headline_1,
            t.hero.headline_2,
            <em key="3" className="not-italic font-light" style={{ color: "var(--accent)" }}>{t.hero.headline_3}</em>
          ]}
          className="font-display text-[clamp(48px,9vw,148px)] leading-[0.92] tracking-[-0.035em] font-[650] text-[var(--mist)] max-w-[12ch]"
        />

        <Reveal delay={0.7} className="mt-12 max-w-xl">
          <p className="text-[17px] leading-[1.55] text-[var(--silver)]">{t.hero.sub}</p>
        </Reveal>

        <Reveal delay={0.9} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticBtn onClick={onContact} variant="accent">{t.hero.cta}</MagneticBtn>
          <MagneticBtn onClick={onWork} variant="ghost">{t.hero.cta2}</MagneticBtn>
        </Reveal>

        <div className="mt-auto pt-20 flex items-end justify-between">
          <div className="flex items-center gap-3 text-[var(--silver)]">
            <div className="w-px h-12 bg-[var(--silver)]/30" style={{ animation: "scrollLine 2s ease-in-out infinite" }} />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase">{t.hero.scroll}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-right">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">25.7891° N</div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">80.2264° W</div>
            </div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--mist)]">Miami · FL</div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { useLang, Eyebrow, Reveal, ArchPlaceholder } from "../components/ui.jsx";

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="relative bg-[var(--ink)] py-32 lg:py-44 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <ArchPlaceholder tone="warm" h={620} label="DANIELA + DENNIS VARELA" className="rounded-sm" />
              <div className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] flex justify-end">
                <span>Miami · FL</span>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <Eyebrow n="05">{t.about.kicker}</Eyebrow>
            <Reveal>
              <h2 className="mt-8 font-display text-[44px] lg:text-[80px] leading-[0.98] tracking-[-0.035em] font-[650] text-[var(--mist)]">
                {t.about.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 text-[18px] lg:text-[20px] leading-[1.55] text-[var(--mist)]/85 max-w-xl">{t.about.body_1}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 text-[17px] leading-[1.55] text-[var(--silver)] max-w-xl">{t.about.body_2}</p>
            </Reveal>
            <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-2">
              {t.about.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 text-[11px] font-mono tracking-[0.18em] uppercase border border-white/15 rounded-full text-[var(--silver)]">
                  {tag}
                </span>
              ))}
            </Reveal>

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

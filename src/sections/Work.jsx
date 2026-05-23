import React from "react";
import { useLang, Eyebrow, Reveal, ArchPlaceholder, MagneticBtn } from "../components/ui.jsx";
import { PROJECTS } from "../data/content.js";

export function Work({ onOpen }) {
  const { t } = useLang();
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
            <Eyebrow n="03">{t.work.title}</Eyebrow>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col gap-6">
            <Reveal>
              <h2 className="font-display text-[40px] lg:text-[64px] leading-[1.02] tracking-[-0.03em] font-[600] text-[var(--mist)]">{t.work.kicker}</h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 lg:auto-rows-[300px]">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05} className={`${spans[i]} relative group cursor-pointer overflow-hidden`}>
              <div onClick={() => onOpen(p)} className="block h-full w-full">
                <ArchPlaceholder tone={p.tone} h={heights[i]} className="h-full transition-transform duration-700 group-hover:scale-[1.03]" />
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
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <MagneticBtn variant="ghost" onClick={() => onOpen(PROJECTS[0])}>{t.work.cta}</MagneticBtn>
        </div>
      </div>
    </section>
  );
}

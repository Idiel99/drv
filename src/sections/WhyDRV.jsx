import React from "react";
import { useLang, Eyebrow, Reveal } from "../components/ui.jsx";

export function WhyDRV() {
  const { t } = useLang();
  return (
    <section className="relative bg-[var(--ink-2)] py-32 lg:py-44 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow n="06">{t.why.title}</Eyebrow>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
          {t.why.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.06} className="relative bg-[var(--ink-2)] p-8 lg:p-10 group hover:bg-[var(--ink)] transition-colors duration-500">
              <div className="font-mono text-[11px] tracking-[0.22em] text-[var(--accent)] mb-6">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display text-[24px] lg:text-[30px] leading-[1.1] tracking-[-0.02em] font-[600] text-[var(--mist)]">{it.t}</h3>
              <p className="mt-4 text-[15px] leading-[1.55] text-[var(--silver)]">{it.d}</p>
              <div className="absolute left-0 top-0 h-px w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-500" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

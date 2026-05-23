import React from "react";
import { useLang, Reveal, CountUp } from "../components/ui.jsx";

export function TrustStrip() {
  const { t } = useLang();
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
          <Reveal key={i} delay={i * 0.08} className="flex flex-col">
            <div className={`text-[var(--mist)] ${it.mono ? "font-mono text-[26px] lg:text-[34px] tracking-[0.04em]" : "font-display text-[52px] lg:text-[72px] leading-none tracking-[-0.03em] font-[650]"}`}>
              {it.mono ? it.v : <CountUp to={it.v} suffix={it.suffix || ""} />}
            </div>
            <div className="mt-3 text-[12px] font-mono tracking-[0.18em] uppercase text-[var(--silver)]">{it.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

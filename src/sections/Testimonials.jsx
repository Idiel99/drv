import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang, Eyebrow, Reveal } from "../components/ui.jsx";
import { TESTIMONIALS } from "../data/content.js";

export function Testimonials() {
  const { t } = useLang();
  const items = TESTIMONIALS;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI(x => (x + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="relative bg-[var(--ink)] py-32 lg:py-44 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow n="07">{t.testi.title}</Eyebrow>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 className="font-display text-[36px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-[600] text-[var(--mist)]">
                {t.testi.kicker}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="relative min-h-[300px] lg:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 gap-6"
            >
              <div className="col-span-12 lg:col-span-1">
                <svg className="w-10 h-10 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 7h4v4H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V7zm9 0h4v4h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V7z" />
                </svg>
              </div>
              <div className="col-span-12 lg:col-span-11">
                <p className="font-display text-[28px] lg:text-[40px] leading-[1.2] tracking-[-0.02em] font-[400] text-[var(--mist)] max-w-4xl">
                  &ldquo;{items[i].q}&rdquo;
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
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {items.map((_, j) => (
              <button
                key={j}
                aria-label={`Go to testimonial ${j + 1}`}
                onClick={() => setI(j)}
                className={`h-px transition-all duration-500 ${i === j ? "w-12 bg-[var(--mist)]" : "w-6 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button aria-label="Previous" onClick={() => setI((i - 1 + items.length) % items.length)} className="w-11 h-11 rounded-full border border-white/15 hover:border-white/40 text-[var(--mist)] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button aria-label="Next" onClick={() => setI((i + 1) % items.length)} className="w-11 h-11 rounded-full border border-white/15 hover:border-white/40 text-[var(--mist)] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

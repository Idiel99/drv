import React from "react";
import { useLang } from "../components/ui.jsx";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative bg-[var(--ink-2)] pt-20 lg:pt-28 pb-10 border-t border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="relative">
          <div aria-hidden="true" className="font-display text-[clamp(72px,22vw,360px)] font-[700] tracking-[-0.05em] text-[var(--mist)] leading-[0.85]">
            DRV
          </div>
          <div className="mt-4 lg:mt-0 lg:absolute lg:right-0 lg:bottom-8 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] max-w-xs lg:text-right">
            {t.footer.tag}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pt-10 border-t border-white/[0.06]">
          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-4">{t.footer.cols.contact}</div>
            <div className="space-y-2">
              <a href="mailto:drvdevelopment17@gmail.com" className="block break-words text-[var(--mist)] text-[14px] hover:text-[var(--accent)] transition-colors">drvdevelopment17@gmail.com</a>
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
                  <a key={s} href="#" aria-label={s} className="w-10 h-10 rounded-full border border-white/15 text-[var(--mist)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center font-mono text-[10px] tracking-[0.1em] transition-colors">
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

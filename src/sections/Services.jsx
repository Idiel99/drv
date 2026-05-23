import React, { useRef, useState } from "react";
import { useLang, Eyebrow, Reveal } from "../components/ui.jsx";

function ServiceCard({ item, idx, hovered, setHovered }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6, y: px * 6 });
  }
  function onLeave() { setTilt({ x: 0, y: 0 }); setHovered(null); }

  const active = hovered === idx;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(idx)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative border-t border-white/[0.08] py-10 lg:py-12 cursor-pointer"
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.25s ease-out" }}
    >
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-2 lg:col-span-1 font-mono text-[12px] tracking-[0.18em] text-[var(--silver)] mt-2">{item.n}</div>
        <div className="col-span-10 lg:col-span-5">
          <h3 className={`font-display text-[28px] lg:text-[44px] leading-[1.05] tracking-[-0.02em] font-[600] transition-colors duration-300 ${active ? "text-[var(--mist)]" : "text-[var(--mist)]/85"}`}>
            {item.t}
          </h3>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-7">
          <p className="text-[15px] lg:text-[16px] leading-[1.5] text-[var(--silver)] max-w-md">{item.d}</p>
        </div>
        <div className="col-span-12 lg:col-span-1 flex lg:justify-end">
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${active ? "border-[var(--accent)] bg-[var(--accent)]/10 rotate-[-45deg]" : "border-white/15"}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div className={`absolute inset-x-0 -bottom-px h-px transition-all duration-500 ${active ? "bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" : "bg-transparent"}`} />
    </div>
  );
}

export function Services() {
  const { t } = useLang();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="relative bg-[var(--ink)] py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow n="02">{t.services.title}</Eyebrow>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 className="font-display text-[40px] lg:text-[64px] leading-[1.02] tracking-[-0.03em] font-[600] text-[var(--mist)]">
                {t.services.kicker}
              </h2>
            </Reveal>
          </div>
        </div>
        <div className="border-b border-white/[0.08]">
          {t.services.items.map((it, i) => (
            <ServiceCard key={i} item={it} idx={i} hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { COPY } from "../data/content.js";

// ---- Language context ------------------------------------------------------
const LangCtx = createContext({ lang: "en", t: COPY.en, setLang: () => {} });
export const useLang = () => useContext(LangCtx);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = COPY[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LangCtx.Provider value={{ lang, t, setLang }}>{children}</LangCtx.Provider>;
}

// ---- Magnetic button -------------------------------------------------------
export function MagneticBtn({ children, onClick, variant = "primary", className = "", as = "button", href, type }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e) {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  }
  function handleLeave() { setPos({ x: 0, y: 0 }); }

  const base = "relative inline-flex items-center gap-3 px-7 py-4 text-[13px] font-medium tracking-[0.14em] uppercase rounded-full transition-colors duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-[var(--mist)] text-[var(--ink)] hover:bg-white"
      : variant === "ghost"
        ? "border border-white/15 text-[var(--mist)] hover:border-white/40 hover:bg-white/5"
        : "bg-[var(--accent)] text-white shadow-[0_0_40px_-8px_var(--accent)] hover:shadow-[0_0_60px_-4px_var(--accent)]";

  const Comp = as;
  return (
    <Comp
      ref={ref}
      href={href}
      type={Comp === "button" ? (type || "button") : undefined}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <svg className="relative z-10 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Comp>
  );
}

// ---- Reveal ----------------------------------------------------------------
export function Reveal({ children, delay = 0, className = "", y = 24, as = "div" }) {
  const Tag = as;
  return (
    <Tag
      className={`reveal-up ${className}`}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` }}
    >
      {children}
    </Tag>
  );
}

export function SplitHeadline({ lines, className = "" }) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            className="block split-line"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}

// ---- Counter-up ------------------------------------------------------------
export function CountUp({ to, suffix = "", duration = 1.6 }) {
  const [v, setV] = useState(typeof to === "number" ? 0 : to);
  useEffect(() => {
    if (typeof to !== "number") { setV(to); return; }
    let raf, t0;
    let cancelled = false;
    function step(t) {
      if (cancelled) return;
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    const startDelay = setTimeout(() => { raf = requestAnimationFrame(step); }, 250);
    const safety = setTimeout(() => { cancelled = true; setV(to); }, duration * 1000 + 1200);
    return () => { cancelled = true; cancelAnimationFrame(raf); clearTimeout(startDelay); clearTimeout(safety); };
  }, [to, duration]);
  return <span>{v}{suffix}</span>;
}

// ---- Eyebrow ---------------------------------------------------------------
export function Eyebrow({ children, n }) {
  return (
    <div className="flex items-center gap-4 text-[11px] tracking-[0.28em] uppercase text-[var(--silver)]">
      {n && <span className="font-mono text-[var(--accent)]">{n}</span>}
      <span className="h-px w-8 bg-[var(--silver)]/40" />
      <span>{children}</span>
    </div>
  );
}

// ---- Architectural placeholder --------------------------------------------
export function ArchPlaceholder({ tone = "warm", h = 360, label, className = "" }) {
  const palettes = {
    warm: ["#3a2e26", "#5a463a", "#7a604f", "#d4a574"],
    cool: ["#172033", "#1f2c44", "#2c3d5c", "#3b82f6"],
    steel: ["#1a1f2a", "#2a3140", "#3a4356", "#9ca3af"]
  };
  const [a, b, c, accent] = palettes[tone] || palettes.warm;
  const gradId = useMemo(() => `g${Math.random().toString(36).slice(2, 8)}`, []);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height: h, background: a }}>
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="55%" stopColor={b} />
            <stop offset="100%" stopColor={c} />
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill={`url(#${gradId})`} />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 38} y1="80" x2={40 + i * 38} y2="540" stroke={accent} strokeOpacity="0.18" strokeWidth="1" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1="40" y1={80 + i * 42} x2="560" y2={80 + i * 42} stroke={accent} strokeOpacity="0.18" strokeWidth="1" />
        ))}
        <polygon points="60,540 60,260 140,260 140,180 240,180 240,120 320,120 320,200 420,200 420,300 520,300 520,540" fill="#000" fillOpacity="0.35" />
        <line x1="40" y1="540" x2="560" y2="540" stroke={accent} strokeOpacity="0.6" strokeWidth="2" />
      </svg>
      {label && (
        <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">{label}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/40 to-transparent" />
    </div>
  );
}

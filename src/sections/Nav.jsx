import React, { useEffect, useState } from "react";
import { useLang } from "../components/ui.jsx";
import logo from "../assets/drv-logo.png";

export function Nav({ onContact }) {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 40); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { k: "work", id: "work" },
    { k: "services", id: "services" },
    { k: "process", id: "process" },
    { k: "about", id: "about" },
    { k: "contact", id: "contact" }
  ];

  function go(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
      <div className={`mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-[var(--ink)]/85 backdrop-blur-xl border border-white/[0.06] rounded-full px-6" : ""}`}>
        <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="cursor-pointer flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <img src={logo} alt="DRV" className="w-7 h-7 object-contain" style={{ filter: "invert(1) brightness(2)" }} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-wide text-[var(--mist)]">DRV</span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-[var(--silver)] mt-0.5">DEVELOPMENT</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {items.map(it => (
            <button
              key={it.k}
              onClick={() => go(it.id)}
              className="px-4 py-2 text-[13px] text-[var(--silver)] hover:text-[var(--mist)] transition-colors rounded-full"
            >
              {t.nav[it.k]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-[11px] font-mono tracking-[0.18em] uppercase border border-white/10 rounded-full overflow-hidden">
            {["en", "es"].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 transition-colors ${lang === l ? "bg-white/10 text-[var(--mist)]" : "text-[var(--silver)] hover:text-[var(--mist)]"}`}
              >{l.toUpperCase()}</button>
            ))}
          </div>
          <button
            onClick={onContact}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[12px] font-medium tracking-wider uppercase text-[var(--ink)] bg-[var(--mist)] hover:bg-white rounded-full transition-colors"
          >
            {t.nav.cta}
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../components/ui.jsx";
import logo from "../assets/drv-logo.png";

export function Nav({ onContact }) {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 40); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const items = [
    { k: "work", id: "work" },
    { k: "services", id: "services" },
    { k: "process", id: "process" },
    { k: "about", id: "about" },
    { k: "contact", id: "contact" }
  ];

  function go(id) {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
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

            {/* Hamburger — mobile / tablet only */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden relative w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-[var(--mist)] transition-colors"
            >
              <span className="relative block w-4 h-3">
                <span className={`absolute left-0 w-4 h-px bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 w-4 h-px bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 w-4 h-px bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu overlay (sits below the nav bar so the toggle stays visible) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-[var(--ink)]/95 backdrop-blur-xl flex flex-col"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex-1 flex flex-col justify-center px-8 gap-3">
              {items.map((it, i) => (
                <motion.button
                  key={it.k}
                  onClick={() => go(it.id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="text-left font-display text-[40px] leading-[1.1] tracking-[-0.02em] font-[600] text-[var(--mist)] hover:text-[var(--accent)] transition-colors"
                >
                  {t.nav[it.k]}
                </motion.button>
              ))}
            </nav>
            <div className="px-8 pb-12">
              <button
                onClick={() => { setOpen(false); onContact(); }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-[13px] font-medium tracking-[0.14em] uppercase text-[var(--ink)] bg-[var(--mist)] rounded-full"
              >
                {t.nav.cta}
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

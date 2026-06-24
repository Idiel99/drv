import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArchPlaceholder } from "../components/ui.jsx";

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    function esc(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", esc);
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[var(--ink)]/80 backdrop-blur-md flex items-stretch justify-end"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full lg:max-w-[1100px] h-full overflow-y-auto bg-[var(--ink-2)] border-l border-white/[0.06]"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-[var(--mist)]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <ArchPlaceholder tone={project.tone} h={520} label={project.name.toUpperCase()} />
            <div className="px-8 lg:px-14 py-12 lg:py-16">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-4">{project.loc} · {project.year}</div>
              <h2 className="font-display text-[40px] lg:text-[64px] leading-[1.02] tracking-[-0.03em] font-[600] text-[var(--mist)]">{project.name}</h2>
              <p className="mt-6 text-[16px] text-[var(--silver)] max-w-2xl leading-[1.55]">{project.scope}</p>

              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/[0.06] pt-10">
                {[
                  ["Type", project.type],
                  ["Area", project.sqft],
                  ["Year", String(project.year)],
                  ["Status", "Delivered"]
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] mb-2">{k}</div>
                    <div className="text-[var(--mist)] text-[18px] font-[500]">{v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4">
                <ArchPlaceholder tone={project.tone} h={280} />
                <ArchPlaceholder tone={project.tone === "warm" ? "steel" : "warm"} h={280} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

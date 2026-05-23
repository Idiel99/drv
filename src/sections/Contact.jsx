import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang, Eyebrow, Reveal, MagneticBtn } from "../components/ui.jsx";

function FormRow({ label, children }) {
  return (
    <div className="bg-[var(--ink)] px-6 py-5">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)] mb-2">{label}</div>
      {children}
    </div>
  );
}

export function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: t.contact.types[0], msg: "" });
  const [sent, setSent] = useState(false);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="relative bg-[var(--ink)] py-32 lg:py-44 border-t border-white/[0.06] overflow-hidden">
      <div aria-hidden="true" className="absolute -bottom-32 -right-20 pointer-events-none select-none font-display text-[260px] lg:text-[440px] font-[700] tracking-[-0.04em] text-white/[0.025] leading-none">
        DRV
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow n="09">{t.contact.title}</Eyebrow>
            <Reveal>
              <h2 className="mt-8 font-display text-[44px] lg:text-[72px] leading-[0.98] tracking-[-0.035em] font-[650] text-[var(--mist)]">
                Let's talk about your site.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[17px] text-[var(--silver)] leading-[1.55] max-w-md">{t.contact.kicker}</p>
            </Reveal>

            <div className="mt-12 space-y-6">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--silver)]">{t.contact.direct}</div>
              {[
                { label: "Email", val: "drvdevelopment17@gmail.com", href: "mailto:drvdevelopment17@gmail.com" },
                { label: "Main", val: "+1 (786) 481-9455", href: "tel:+17864819455" },
                { label: "Dennis", val: "+1 (786) 961-4047", href: "tel:+17869614047" },
                { label: "Office", val: "9040 NW 32 CT RD, Miami, FL 33147" }
              ].map((c, i) => (
                <a key={i} href={c.href} className="block group">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)] mb-1">{c.label}</div>
                  <div className="text-[var(--mist)] text-[18px] lg:text-[20px] font-[500] group-hover:text-[var(--accent)] transition-colors">{c.val}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <form onSubmit={submit} className="relative">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-px bg-white/[0.04] border border-white/[0.06]">
                    <FormRow label={t.contact.f_name}>
                      <input required value={form.name} onChange={e => set("name", e.target.value)} className="contact-input" placeholder="Your full name" />
                    </FormRow>
                    <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                      <FormRow label={t.contact.f_email}>
                        <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} className="contact-input" placeholder="you@email.com" />
                      </FormRow>
                      <FormRow label={t.contact.f_phone}>
                        <input value={form.phone} onChange={e => set("phone", e.target.value)} className="contact-input" placeholder="(305) 000-0000" />
                      </FormRow>
                    </div>
                    <FormRow label={t.contact.f_type}>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {t.contact.types.map(type => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => set("type", type)}
                            className={`px-4 py-2 rounded-full text-[12px] font-mono tracking-[0.14em] uppercase transition-all border ${form.type === type ? "bg-[var(--accent)] border-[var(--accent)] text-white" : "border-white/15 text-[var(--silver)] hover:border-white/30"}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </FormRow>
                    <FormRow label={t.contact.f_msg}>
                      <textarea rows={5} value={form.msg} onChange={e => set("msg", e.target.value)} className="contact-input resize-none" placeholder="Site address, timeline, budget range, anything we should know." />
                    </FormRow>
                    <div className="px-6 py-6 flex items-center justify-between bg-[var(--ink)]">
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)]">Response within 1 business day</div>
                      <MagneticBtn as="button" type="submit" variant="accent">{t.contact.submit}</MagneticBtn>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.04] border border-[var(--accent)]/40 p-12 lg:p-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)] flex items-center justify-center mx-auto">
                      <svg className="w-7 h-7 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <h3 className="mt-8 font-display text-[32px] lg:text-[40px] tracking-[-0.02em] font-[600] text-[var(--mist)]">{t.contact.sent}</h3>
                    <div className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--silver)]">Inquiry ID · DRV-2026-0142</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

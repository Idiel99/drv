// ============================================================================
// DRV Development LLC — App entry
// ============================================================================
const { useState: useSA, useEffect: useEA } = React;
const { LangProvider, useLang: useLangA } = window.DRV_UI;
const { Nav, Hero } = window.DRV_HERO;
const { TrustStrip, Services, Work, ProjectModal, Process } = window.DRV_MID;
const { About, WhyDRV, Testimonials, ServiceArea, Contact, Footer } = window.DRV_END;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3B82F6",
  "headlineFont": "Inter Tight",
  "showTrustStrip": true,
  "heroEmphasis": "tower"
}/*EDITMODE-END*/;

function App() {
  const [project, setProject] = useSA(null);
  const [values, setTweakFn] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const t = { ...values, setTweak: setTweakFn };

  // Apply tweaks to CSS vars
  useEA(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--display-font", `"${t.headlineFont}", system-ui`);
  }, [t.accent, t.headlineFont]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <LangProvider>
      <div className="min-h-screen bg-[var(--ink)] text-[var(--mist)] antialiased">
        <Nav onContact={() => scrollTo("contact")} />
        <main>
          <Hero onContact={() => scrollTo("contact")} onWork={() => scrollTo("work")} />
          {t.showTrustStrip && <TrustStrip />}
          <Services />
          <Work onOpen={setProject} />
          <Process />
          <About />
          <WhyDRV />
          <Testimonials />
          <ServiceArea />
          <Contact />
          <Footer />
        </main>
        <ProjectModal project={project} onClose={() => setProject(null)} />
        {window.TweaksApp && <window.TweaksApp tweaks={t} />}
      </div>
    </LangProvider>
  );
}

// Tweaks panel content -------------------------------------------------------
function TweaksApp({ tweaks }) {
  const { TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakToggle, TweakRadio } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakColor
          label="Brand accent"
          value={tweaks.accent}
          onChange={v => tweaks.setTweak("accent", v)}
          options={["#3B82F6", "#60A5FA", "#22D3EE", "#F8FAFC", "#D4A574"]}
        />
      </TweakSection>
      <TweakSection title="Typography">
        <TweakSelect
          label="Headline font"
          value={tweaks.headlineFont}
          onChange={v => tweaks.setTweak("headlineFont", v)}
          options={[
            { value: "Inter Tight", label: "Inter Tight" },
            { value: "Space Grotesk", label: "Space Grotesk" },
            { value: "DM Sans", label: "DM Sans" },
            { value: "Instrument Serif", label: "Instrument Serif" }
          ]}
        />
      </TweakSection>
      <TweakSection title="Layout">
        <TweakToggle
          label="Trust strip"
          value={tweaks.showTrustStrip}
          onChange={v => tweaks.setTweak("showTrustStrip", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}
window.TweaksApp = TweaksApp;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

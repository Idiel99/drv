import React, { useState } from "react";
import { LangProvider } from "./components/ui.jsx";
import { Nav } from "./sections/Nav.jsx";
import { Hero } from "./sections/Hero.jsx";
import { TrustStrip } from "./sections/TrustStrip.jsx";
import { Services } from "./sections/Services.jsx";
import { Work } from "./sections/Work.jsx";
import { ProjectModal } from "./sections/ProjectModal.jsx";
import { Process } from "./sections/Process.jsx";
import { About } from "./sections/About.jsx";
import { WhyDRV } from "./sections/WhyDRV.jsx";
import { Testimonials } from "./sections/Testimonials.jsx";
import { ServiceArea } from "./sections/ServiceArea.jsx";
import { Contact } from "./sections/Contact.jsx";
import { Footer } from "./sections/Footer.jsx";

export default function App() {
  const [project, setProject] = useState(null);

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
          <TrustStrip />
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
      </div>
    </LangProvider>
  );
}

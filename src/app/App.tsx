import { FloatingOrbs } from "./components/FloatingOrbs";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { ArtifactsSection } from "./components/ArtifactsSection";
import { ConstellationSection } from "./components/ConstellationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { PortfolioAssistant } from "./components/PortfolioAssistant";
import React from "react";

export default function App() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "#05050f", fontFamily: "'Outfit', sans-serif" }}
    >
      <FloatingOrbs />
      <NavBar />

      <main className="relative z-10 md:pl-[224px]">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="projects">
          <ArtifactsSection />
        </section>
        <section id="skills">
          <ConstellationSection />
        </section>
        <section id="experience">
          <ExperienceSection />
        </section>
        <section id="articles">
          <BlogSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <PortfolioAssistant />
    </div>
  );
}

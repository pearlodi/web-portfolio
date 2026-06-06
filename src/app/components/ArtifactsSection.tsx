import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowBorderCard } from "./GlowBorderCard";
import { ExternalLink, ChevronDown, ChevronUp, Globe } from "lucide-react";
import React from "react";
import toks from "../../images/toks.webp";
import zeta from "../../images/zeta.webp";
import sehembz from "../../images/sehembz.webp";
import hqn from "../../images/hqn.webp";
import hqincub from "../../images/hqincub.webp";
import abitto from "../../images/abitto.webp";
import ferrys from "../../images/ferrys.webp";
import personal from "../../images/personal.webp";
import aedion from "../../images/aedionwe.webp";
import aedionapp from "../../images/aedionapp.webp";
import plays from "../../images/plyn.png";
const ARTIFACTS = [
  {
    id: 1,
    name: "Aedion AI",
    tagline: "AI-powered wellness guidance and health pattern tracking",
    description:
      "A wellness platform that combines AI health chat, skin and eye pattern analysis, and longitudinal health tracking. Users can explore potential wellness patterns, monitor scan history, and access educational health resources through an intuitive digital experience.",
    tags: ["Next js", "GraphQL", "Apollo Client", "Zustand", "Tailwind", "+5"],
    variant: "pink" as const,
    status: "live",
    link: "aedion.ai",
    image: aedion,
    company: "Toks Net",
  },
  {
    id: 2,
    name: "Aedion AI Mobile App",
    tagline: "AI wellness companion for health tracking",
    description:
      "Mobile application that enables AI-powered skin and eye scans, health record tracking, appointment management, and conversational wellness guidance. Designed to help users monitor changes over time through a seamless mobile experience.",
    tags: ["React Native", "Expo Go", "Native wind", "Apollo Client", "Zustand"],
    variant: "pink" as const,
    status: "live",
    link: "https://apps.apple.com/app/aedion/id6757245117",
    image: aedionapp,
    company: "Toks Net",
    apple: "https://apps.apple.com/app/aedion/id6757245117",
    google: "https://play.google.com/store/apps/details?id=ai.aedion.app",
  },
  {
    id: 3,
    name: "Aya Labs",
    tagline: "Building Africa's next generation of startups",
    description:
      "Innovation platform focused on supporting founders, startups, and emerging technology ventures through incubation programs, product development initiatives, and ecosystem-driven opportunities.",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    variant: "cyan" as const,
    status: "live",
    link: "ayahq.com/labs",
    image: hqn,
    company: "Aya Labs",
  },
  {
    id: 4,
    name: "Zeta Brent Education",
    tagline: "Digital learning platform for modern education",
    description:
      "Comprehensive e-learning platform featuring course management, student progress monitoring, interactive learning experiences, and educator tools. Built to deliver a seamless online education experience across devices.",
    tags: ["React", "GraphQL", "Apollo Client", "Zustand"],
    variant: "amber" as const,
    status: "live",
    link: "zetabrenteducation.com",
    image: zeta,
    company: "Toks Net",
  },
  {
    id: 5,
    name: "Aya Hackathons",
    tagline: "Platform for innovation challenges and hackathons",
    description:
      "End-to-end hackathon management platform supporting registrations, team formation, project submissions, judging workflows, and event administration. Designed to power large-scale innovation programs and developer communities.",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    variant: "cyan" as const,
    status: "live",
    link: "ayahq.com",
    image: hqincub,
    company: "Aya Labs",
  },
  {
    id: 6,
    name: "ToksNet Africa",
    tagline: "Digital telecom services made simple",
    description:
      "Telecom platform enabling airtime purchases, data subscriptions, bill payments, and subscriber management through a streamlined mobile-first experience tailored for modern users.",
    tags: ["Nextjs", "tailwind", "TypeScript", "Shadcn"],
    variant: "violet" as const,
    status: "live",
    link: "toks.net.ng",
    image: toks,
    company: "Toks Net",
  },
  {
    id: 7,
    name: "Sehembz",
    tagline: "Travel, visa, and tourism services",
    description:
      "Travel management platform offering flight bookings, hotel reservations, visa assistance, tour packages, executive transportation, and end-to-end travel planning for individuals and businesses.",
    tags: ["React", "GraphQL", "Apollo Client", "Zustand"],
    variant: "pink" as const,
    status: "live",
    link: "sehembztravels.com",
    image: sehembz,
    company: "Toks Net",
  },
  {
    id: 8,
    name: "Abitto",
    tagline: "Corporate services and business solutions",
    description:
      "Business-focused platform designed to showcase professional services, enterprise solutions, and operational support offerings through a modern, conversion-focused digital experience.",
    tags: ["React", "GraphQL", "Apollo Client", "Zustand"],
    variant: "pink" as const,
    status: "live",
    link: "abittoglobal.coms",
    image: abitto,
    company: "Abitto",
  },
  {
    id: 9,
    name: "Abitto Ferry",
    tagline: "Modern ferry booking experience",
    description:
      "Transportation platform built to simplify ferry travel through efficient booking workflows, route information, schedule management, and a user-friendly passenger experience.",
    tags: ["React", "GraphQL", "Apollo Client", "Zustand"],
    variant: "pink" as const,
    status: "live",
    link: "abittoferry.com",
    image: ferrys,
    company: "Abitto",
  },
  {
    id: 10,
    name: "Task Budy",
    tagline: "Simple productivity and task management",
    description:
      "Task management application designed to help users organize responsibilities, track progress, manage daily workflows, and improve productivity through an intuitive user experience.",
    tags: ["React", "GraphQL", "Apollo Client", "Zustand"],
    variant: "pink" as const,
    status: "live",
    link: "task-budy.netlify.app",
    image: personal,
    company: "Personal",
  },
];

export function ArtifactsSection() {
  // First card is active by default
  const [active, setActive] = useState<number>(1);
  const [show, setShow] = useState<number>(4);

  return (
    <section className="relative py-32 px-6 max-w-7xl mx-auto" id="artifacts">
      {/* Header */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            color: "#00f5d4",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 12,
          }}
        >
          02 / ARTIFACTS
        </div>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            background:
              "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.4))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Things I've
          <br />
          built &amp; shipped
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTIFACTS.slice(0, show).map((artifact, i) => {
          const isActive = active === artifact.id;
          return (
            <motion.div
              key={artifact.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <GlowBorderCard
                variant={artifact.variant}
                className="h-full"
                always={isActive}
              >
                <div className="flex flex-col h-full">
                  {/* Project image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 250, flexShrink: 0 }}
                  >
                    <img
                      src={artifact.image}
                      alt={artifact.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Image overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, rgba(5,5,20,0.1) 0%, rgba(5,5,20,0.75) 100%)",
                      }}
                    />
                    {/* Company badge */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(5,5,20,0.7)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        fontSize: "0.62rem",
                        color: "#94a3b8",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {artifact.company}
                    </div>
                    {/* Live badge */}
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(0,245,212,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(0,245,212,0.3)",
                      }}
                    >
                      <Globe size={9} style={{ color: "#00f5d4" }} />
                      <span
                        style={{
                          fontSize: "0.6rem",
                          color: "#00f5d4",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <div>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "#f1f5f9",
                          letterSpacing: "-0.02em",
                          marginBottom: 4,
                        }}
                      >
                        {artifact.name}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                        {artifact.tagline}
                      </p>
                    </div>

                    {/* Expandable description */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{
                            fontSize: "0.875rem",
                            color: "#94a3b8",
                            lineHeight: 1.75,
                            overflow: "hidden",
                          }}
                        >
                          {artifact.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {artifact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md"
                          style={{
                            fontSize: "0.68rem",
                            fontFamily: "'JetBrains Mono', monospace",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#94a3b8",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between gap-4 mt-auto pt-4"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {artifact.google || artifact.apple ? (
                       <>
                         {/* <a
                         href={artifact.apple}
                         target="_blank"
                         rel="noopener noreferrer"
                       >
                         <button>Download on App Store</button>
                       </a>
                 
                       <a
                         href={artifact.google}
                         target="_blank"
                         rel="noopener noreferrer"
                       >
                         <button>Get it on Google Play</button>
                       </a> */}
                       <div className="flex-col md:flex-row flex gap-2 ">
      {/* Apple App Store Button */}
      <a
        href="https://apple.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex  items-center rounded-lg border border-neutral-400 bg-black px-4 py-1 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-900"
      >
        <svg
          className="h-5 w-4 flex-shrink-0 fill-current"
          viewBox="0 0 384 512"
          xmlns="http://w3.org"
          aria-hidden="true"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 47.5-24.4 76.5 26.9 2.4 51.2-16 68.3-38.9z" />
        </svg>
        <div className="ml-3 flex flex-col items-start justify-center leading-tight">
          <span className="text-[7px] font-normal uppercase tracking-wider opacity-90">
            Download on the
          </span>
          <span className="-mt-0.5 text-xs font-semibold tracking-tight">
            App Store
          </span>
        </div>
      </a>

      {/* Google Play Store Button */}
      <a
        href="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex  items-center rounded-lg border border-neutral-400 bg-black px-4 py-0.5 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-900"
      >
        {/* <svg
          className="h-5 w-4 flex-shrink-0 fill-current"
          viewBox="0 0 512 512"
          xmlns="http://w3.org"
          aria-hidden="true"
        >
          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.4-60.1-60.1 60.1-60.1 58 33.4c13.1 7.6 21.8 19.7 21.8 33.3 0 13.6-8.7 25.7-21.8 33.3zM104.6 499l220.7-126.7-60.1-60.1L104.6 499z" />
        </svg> */}
        <img 
          className="h-5 w-4 flex-shrink-0 fill-current"
        
        src={plays}/>
        <div className="ml-3 flex flex-col items-start justify-center leading-tight">
          <span className="text-[7px] font-normal uppercase tracking-wider opacity-90">
            GET IT ON
          </span>
          <span className="-mt-0.5 text-xs font-semibold tracking-tight">
            Google Play
          </span>
        </div>
      </a>
    </div>
                       </>
                  
                      ) : (
                        <a
                          href={`https://${artifact.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                          style={{
                            fontSize: "0.78rem",
                            color: "#64748b",
                            textDecoration: "none",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={12} />
                          {artifact.link}
                        </a>
                      )}

                      {/* Obvious expand/collapse button */}
                      <button
                        onClick={() => setActive(artifact.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          background: isActive
                            ? "rgba(0,245,212,0.1)"
                            : "rgba(255,255,255,0.05)",
                          border: isActive
                            ? "1px solid rgba(0,245,212,0.3)"
                            : "1px solid rgba(255,255,255,0.08)",
                          color: isActive ? "#00f5d4" : "#94a3b8",
                          cursor: "pointer",
                        }}
                      >
                        {isActive ? (
                          <>
                            <ChevronUp size={12} /> Less
                          </>
                        ) : (
                          <>
                            <ChevronDown size={12} /> Read more
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </GlowBorderCard>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-4 mt-8">
        {show < ARTIFACTS.length && (
           <button
           onClick={() => setShow((prevShow) => prevShow + 2)}
           type="submit"
           className="flex items-center justify-center gap-2 py-2 cursor-pointer px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
           style={{
             background:  "linear-gradient(135deg, #00f5d4, #8b5cf6)",
             color:  "#05050f",
             fontWeight: 700,
             boxShadow: "0 0 40px rgba(0,245,212,0.15)",
           }}
         >
          load more
         </button>
       
        )}
        {show > 4 && (
          <p className="cursor-pointer text-xl font-extrabold bg-gradient-to-r from-violet-500 to-pink-400 bg-clip-text text-transparent" onClick={() => setShow((prevShow) => prevShow - 2)}>show less</p>
        )}
      </div>
    </section>
  );
}

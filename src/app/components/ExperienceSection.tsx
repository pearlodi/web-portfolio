import { useState } from "react";
import { motion } from "motion/react";
import { GlowBorderCard } from "./GlowBorderCard";
import { Briefcase, MapPin } from "lucide-react";
import React from "react";

const EXPERIENCES = [
  {
    id: 1,
    role: "Frontend Lead & Mobile Developer ",
    company: "Toks Net",
    type: "Full-time",
    period: "2024 — Present",
    location: "Nigeria",
    description:
      "Building web and mobile apps from scratch, integrating backend services to ship scalable, user-centered products. Responsible for the full frontend architecture of multiple products including AedionAI and Sehembz Travels and also projects that include CMS dashboards and admin panels ",
    tags: ["React", "React Native", "Expo", "TypeScript", "NativeWind","Next","GraphQl","Apollo client","etc"],
    variant: "violet" as const,
    current: true,
    country:"Nigeria"
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Aya HQ",
    type: "Contract",
    period: "3 Months",
    location: "Delaware, United States ",
    description:
      "Supported the frontend lead by creating reusable components, ensured responsiveness across breakpoints, and connecting  backend integrations. Contributed to the Aya Hackathons and Aya Incubation platforms.",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui","Zustand"],
    variant: "cyan" as const,
    current: false,

  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Ownage Fiditech LLC",
    type: "Internship",
    period: "2023",
    location: "Sheridan, Wyoming, United States",
    description:
      "As an intern i assited the frontend lead in creating reusable components, setting up the project structure",
    tags: ["React", "Vue", "JavaScript","Typescript", "Tailwind", "CSS"],
    variant: "amber" as const,
    current: false,
  },
  {
    id: 4,
    role: "Frontend Developer",
    company: "Wetech Mentorship",
    type: "Mentorship",
    period: "2023",
    location: "Lagos, Nigeria",
    description:
      "Supporting the frontend lead by crafting reusable components, boosting responsiveness across breakpoints, and wiring up backend integrations. Contributed to the Aya Hackathons and Aya Incubation platforms.",
    tags: ["React.js", "Javascript", "CSS", "Materia/ui"],
    variant: "violet" as const,
    current: false,

  },
  {
    id: 5,
    role: "Frontend Developer",
    company: "Abitto Global",
    type: "Full-time",
    period: "2022 - 2023",
    location: "Rivers, Nigeria",
    description:
      "Built responsive interfaces directly from Figma design files. Connected REST APIs to dynamic UI components and coordinated with design and backend teams for production delivery.",
    tags: ["HTML", "CSS", "JavaScript", "REST APIs","PHP"],
    variant: "pink" as const,
    current: false,
  },
  
  {
    id: 6,
    role: "Frontend Developer",
    company: "Sirinu Token",
    type: "Volunteer",
    period: "2022",
    location: "Toronto Island, Canada",
    description:
      "Crafted and refined user interfaces, ensuring performance and cross-device consistency. Collaborated closely with design and backend teams to deliver polished, production-ready features.",
      tags: ["HTML", "CSS", "JavaScript", "REST APIs"],
    variant: "amber" as const,
    current: false,
  },
  {
    id: 7,
    role: "Frontend Developer",
    company: "Iji Technologies",
    type: "Volunteer",
    period: "2021",
    location: "Rivers, Nigeria",
    description:
      "Built responsive interfaces directly from Figma design files. Connected REST APIs to dynamic UI components and coordinated with design and backend teams for production delivery.",
    tags: ["HTML", "CSS", "JavaScript", "REST APIs"],
    variant: "pink" as const,
    current: false,
  },
];

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "#00f5d4",
  "Contract": "#8b5cf6",
  "Internship": "#94a3b8",
  "Volunteer": "#FFC5D3",
  "Mentorship": "#88CFF1",
};

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <section className="relative py-32 px-6" id="experience">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div
            style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#00f5d4", fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}
          >
            03 / EXPERIENCE
          </div>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #ffffff 50%, rgba(255,255,255,0.4))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Where I've
            <br />made an impact
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 hidden md:block"
            style={{ width: 1, background: "linear-gradient(to bottom, #00f5d4, rgba(139,92,246,0.4), transparent)", left: 20 }}
          />

          <div className="flex flex-col gap-6">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="md:pl-14 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute hidden md:block"
                  style={{ left: 12, top: 24, width: 16, height: 16, borderRadius: "50%", zIndex: 2 }}
                >
                  {exp.current ? (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: "#00f5d4", opacity: 0.3 }}
                        animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#00f5d4", position: "relative", zIndex: 1 }} />
                    </>
                  ) : (
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(148,163,184,0.3)", border: "2px solid rgba(148,163,184,0.4)" }} />
                  )}
                </div>

                <GlowBorderCard
                  variant={exp.variant}
                  always={expanded === exp.id}
                  rounded="rounded-2xl"
                >
                  <button
                    className="w-full text-left"
                    onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                  >
                    <div className="p-6">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className="p-2.5 rounded-xl flex-shrink-0"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", marginTop: 2 }}
                          >
                            <Briefcase size={14} style={{ color: "#94a3b8" }} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.01em" }}>
                                {exp.role}
                              </h3>
                              {exp.current && (
                                <span
                                  className="px-2 py-0.5 rounded-full"
                                  style={{ fontSize: "0.58rem", color: "#00f5d4", background: "rgba(0,245,212,0.1)", border: "1px solid rgba(0,245,212,0.25)", fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#cbd5e1" }}>{exp.company}</span>
                              <span
                                className="px-2 py-0.5 rounded-md"
                                style={{ fontSize: "0.62rem", color: TYPE_COLORS[exp.type], background: `${TYPE_COLORS[exp.type]}15`, border: `1px solid ${TYPE_COLORS[exp.type]}30`, fontFamily: "'JetBrains Mono', monospace" }}
                              >
                                {exp.type}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right meta */}
                        <div className="text-right flex-shrink-0">
                          <div style={{ fontSize: "0.78rem", color: "#64748b", fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1 justify-end" style={{ color: "#475569", fontSize: "0.7rem" }}>
                            <MapPin size={10} />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Expanded content */}
                      {expanded === exp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-5 pt-5"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}
                        >
                          <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: 14 }}>
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {exp.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-md"
                                style={{ fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Expand hint */}
                      <div className="mt-4 flex justify-end">
                        <span 
                         className="cursor-pointer text-sm font-extrabold bg-gradient-to-r from-violet-500 to-pink-400 bg-clip-text text-transparent"
                        >
                          {expanded === exp.id ? "↑ collapse" : "↓ expand"}
                        </span>
                      </div>
                    </div>
                  </button>
                </GlowBorderCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

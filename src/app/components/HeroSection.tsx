import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GlowBorderCard } from "./GlowBorderCard";
import React from "react";

const ROLES = [
  "Frontend Developer",
  "Mobile App Builder",
  "Technical writer",
  "Figma → Code Translator",
];

const STATS = [
  { label: "Years coding", value: "5+" },
  { label: "Projects shipped", value: "9" },
  { label: "UI components", value: "50+" },
  { label: "Lines written", value: "∞" },
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="inline-flex items-center gap-1" style={{ color: "#00f5d4" }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        style={{ display: "inline-block", width: 2, height: "0.9em", background: "#00f5d4", borderRadius: 1 }}
      />
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16">
      <motion.div
        className="text-center mb-12 relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{ background: "rgba(0,245,212,0.08)", border: "1px solid rgba(0,245,212,0.2)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#00f5d4" }}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span style={{ fontSize: "0.7rem", color: "#00f5d4", letterSpacing: "0.15em", fontFamily: "'JetBrains Mono', monospace" }}>
            OPEN TO WORK · Lagos, NG
          </span>
        </motion.div>

        {/* Name */}
        <h1
          className="mb-4 select-none"
          style={{
            fontSize: "clamp(3.8rem, 11vw, 9.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.88,
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 20%, rgba(255,255,255,0.55) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Odi
          </span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00f5d4 0%, #8b5cf6 55%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pearl
          </span>
        </h1>

        {/* Role typewriter */}
        <div
          className="mb-6"
          style={{ fontSize: "clamp(1rem, 2.2vw, 1.5rem)", fontWeight: 300, color: "rgba(226,232,240,0.65)", minHeight: "2.2em" }}
        >
          <TypewriterRole />
        </div>

        {/* Bio */}
        {/* <p
          className="mb-10 mx-auto"
          style={{ maxWidth: 480, color: "#64748b", lineHeight: 1.75, fontSize: "0.95rem" }}
        >
          I blend creativity with code to build clean, functional software focused on performance and usability.
          I convert Figma designs into polished interfaces and love experimenting with animations and layout details.
        </p> */}
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        {STATS.map((stat, i) => (
          <GlowBorderCard key={stat.label} variant={i % 2 === 0 ? "cyan" : "violet"}>
            <div className="p-5 text-center">
              <div
                className="mb-1"
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, #00f5d4, #ffffff)"
                    : "linear-gradient(135deg, #8b5cf6, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.65rem", color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>
                {stat.label.toUpperCase()}
              </div>
            </div>
          </GlowBorderCard>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ color: "rgba(148,163,184,0.35)" }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", fontFamily: "'JetBrains Mono', monospace" }}>SCROLL</span>
        <div style={{ width: 1, height: 24, background: "linear-gradient(to bottom, rgba(0,245,212,0.4), transparent)" }} />
      </motion.div>
    </section>
  );
}

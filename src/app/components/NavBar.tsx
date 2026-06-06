import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Layers, Telescope, Briefcase, BookOpen, Mail } from "lucide-react";
import React from "react";

const LINKS = [
  { label: "Artifacts", href: "#artifacts", icon: Layers },
  { label: "Skills", href: "#constellation", icon: Telescope },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Articles", href: "#articles", icon: BookOpen },
  { label: "Signal", href: "#signal", icon: Mail },
];

function SidebarContent() {
  return (
    <div className="p-5 h-full flex flex-col gap-6">
      {/* Logo */}
      <div className="flex items-center gap-2.5 pt-1">
        <motion.div
          style={{ width: 10, height: 10, borderRadius: "50%", background: "#00f5d4", flexShrink: 0 }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <div>
          <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Odi Pearl
          </div>
          <div style={{ fontSize: "0.6rem", color: "#64748b", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
            FRONTEND DEV
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
              style={{ textDecoration: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,245,212,0.08)";
                (e.currentTarget as HTMLElement).style.color = "#00f5d4";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.7)";
              }}
            >
              <Icon size={14} style={{ color: "inherit", flexShrink: 0 }} />
              <span style={{ fontSize: "0.82rem", color: "inherit", fontWeight: 500 }}>{link.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

      {/* Availability */}
      <div className="pb-1">
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            className="flex-shrink-0"
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#00f5d4" }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span style={{ fontSize: "0.72rem", color: "#00f5d4", fontWeight: 600 }}>Open to work</span>
        </div>
        <div style={{ fontSize: "0.6rem", color: "#475569", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6 }}>
          Lagos, NG · Remote OK
        </div>
        <a
          href="mailto:pearlodi7@gmail.com"
          style={{
            display: "block",
            marginTop: 12,
            textAlign: "center",
            padding: "8px 0",
            borderRadius: 10,
            background: "linear-gradient(135deg, #00f5d4, #8b5cf6)",
            color: "#05050f",
            fontSize: "0.75rem",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Hire me ↗
        </a>
      </div>
    </div>
  );
}

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile nav on scroll
  useEffect(() => {
    const onScroll = () => setMobileOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div
        className="hidden md:block fixed left-4 top-4 bottom-4 z-50 rounded-2xl glow-border-active"
        style={{ width: 200 }}
      >
        {/* Inner glass panel */}
        <div
          className="absolute inset-[1px] rounded-2xl overflow-hidden flex flex-col"
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            background: "rgba(5,5,20,0.88)",
          }}
        >
          <SidebarContent />
        </div>
      </div>

      {/* ── Mobile hamburger button ── */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl"
        style={{
          background: "rgba(5,5,20,0.85)",
          border: "1px solid rgba(0,245,212,0.25)",
          backdropFilter: "blur(16px)",
          color: "#00f5d4",
        }}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="md:hidden fixed left-0 top-0 bottom-0 z-50"
              style={{ width: 220 }}
              initial={{ x: -220 }}
              animate={{ x: 0 }}
              exit={{ x: -220 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <div
                className="h-full flex flex-col"
                style={{
                  background: "rgba(5,5,20,0.95)",
                  borderRight: "1px solid rgba(0,245,212,0.15)",
                  backdropFilter: "blur(24px)",
                }}
              >
                <div className="mt-14">
                  <SidebarContent />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      containerRef.current.style.setProperty("--cursor-x", `${x}%`);
      containerRef.current.style.setProperty("--cursor-y", `${y}%`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cursor-follow glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none transition-all duration-700"
        style={{
          background: "radial-gradient(circle, #00f5d4 0%, transparent 70%)",
          left: "var(--cursor-x, 50%)",
          top: "var(--cursor-y, 50%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Static ambient orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(0,245,212,0.12) 0%, transparent 70%)",
          top: "-200px",
          left: "-150px",
        }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
          top: "30%",
          right: "-180px",
        }}
        animate={{ x: [0, -50, 20, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)",
          bottom: "10%",
          left: "20%",
        }}
        animate={{ x: [0, 70, -20, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 70%)",
          bottom: "30%",
          right: "25%",
        }}
        animate={{ x: [0, -40, 60, 0], y: [0, 80, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 10 }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,212,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,212,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, #05050f 100%)",
        }}
      />
    </div>
  );
}

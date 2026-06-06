import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import React from "react";

type GlowVariant = "cyan" | "violet" | "amber" | "pink";

interface GlowBorderCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: GlowVariant;
  always?: boolean;
  rounded?: string;
}

const variantClass: Record<GlowVariant, string> = {
  cyan: "glow-border-active",
  violet: "glow-border-violet",
  amber: "glow-border-amber",
  pink: "glow-border-violet",
};

export function GlowBorderCard({
  children,
  className = "",
  variant = "cyan",
  always = false,
  rounded = "rounded-2xl",
}: GlowBorderCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glowX = useTransform(mouseX, (v) => `${v}px`);
  const glowY = useTransform(mouseY, (v) => `${v}px`);

  const isActive = always || hovered;

  return (
    <div
      ref={cardRef}
      className={`relative ${rounded} ${className}`}
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Spinning border glow */}
      <div
        className={`absolute inset-0 ${rounded} ${isActive ? variantClass[variant] : ""}`}
        style={{ padding: 1 }}
      />
      {/* Static border fallback */}
      {!isActive && (
        <div
          className={`absolute inset-0 ${rounded}`}
          // style={{ border: "1px solid rgba(255,255,255,0.08)" ,

          // }}
        />
      )}

      {/* Inner surface */}
      <div
        className={`relative ${rounded} overflow-hidden`}
        style={{
          margin: isActive ? 1 : 0,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(10, 10, 30, 0.65)",

        }}
      >
        {/* Mouse follow inner glow */}
        {/* {hovered && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                variant === "cyan"
                  ? "radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 70%)"
                  : variant === "violet"
                  ? "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)",
              left: glowX,
              top: glowY,
              transform: "translate(-50%, -50%)",
            }}
          />
        )} */}
        {children}
      </div>
    </div>
  );
}

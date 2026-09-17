import { useState } from "react";
import { motion } from "motion/react";
import React from "react";
const SKILLS = [
  { id: "react", label: "React", level: 96, cx: 90, cy: 90, cat: "Framework" },
  { id: "nextjs", label: "Next.js", level: 92, cx: 190, cy: 60, cat: "Framework" },
  { id: "vue", label: "Vue", level: 80, cx: 155, cy: 145, cat: "Framework" },
  { id: "nuxt", label: "Nuxt", level: 76, cx: 265, cy: 100, cat: "Framework" },
  { id: "ts", label: "TypeScript", level: 92, cx: 330, cy: 65, cat: "Framework" },
  { id: "js", label: "JavaScript", level: 95, cx: 390, cy: 108, cat: "Framework" },

  { id: "rn", label: "React Native", level: 88, cx: 480, cy: 78, cat: "Mobile" },
  { id: "expo", label: "Expo", level: 82, cx: 565, cy: 50, cat: "Mobile" },
  { id: "nativewind", label: "NativeWind", level: 78, cx: 530, cy: 138, cat: "Mobile" },

  { id: "tailwind", label: "Tailwind", level: 93, cx: 440, cy: 175, cat: "UI Library" },
  { id: "shadcn", label: "shadcn/ui", level: 90, cx: 525, cy: 205, cat: "UI Library" },
  { id: "mui", label: "Material UI", level: 82, cx: 620, cy: 175, cat: "UI Library" },
  { id: "chakra", label: "Chakra UI", level: 80, cx: 665, cy: 108, cat: "UI Library" },
  { id: "antd", label: "Ant Design", level: 75, cx: 700, cy: 200, cat: "UI Library" },

  { id: "zustand", label: "Zustand", level: 88, cx: 175, cy: 275, cat: "State / API" },
  { id: "redux", label: "Redux", level: 80, cx: 275, cy: 300, cat: "State / API" },
  { id: "graphql", label: "GraphQL", level: 84, cx: 370, cy: 270, cat: "State / API" },
  { id: "apollo", label: "Apollo Client", level: 82, cx: 470, cy: 305, cat: "State / API" },

  { id: "figma", label: "Figma", level: 90, cx: 95, cy: 220, cat: "Tools" },
  { id: "github", label: "GitHub", level: 92, cx: 90, cy: 310, cat: "Tools" },
];

const CONNECTIONS = [
  ["react", "nextjs"], ["react", "vue"], ["react", "ts"],
  ["nextjs", "nuxt"], ["ts", "js"], ["ts", "nextjs"], ["js", "expo"],
  ["rn", "expo"], ["rn", "nativewind"], ["rn", "ts"],
  ["tailwind", "shadcn"], ["tailwind", "nativewind"],
  ["mui", "chakra"], ["shadcn", "mui"],
  ["zustand", "redux"], ["graphql", "apollo"],
  ["redux", "graphql"], ["zustand", "graphql"],
  ["figma", "react"], ["figma", "tailwind"],
  ["github", "react"],
];

const CAT_COLORS: Record<string, string> = {
  "Framework": "#00f5d4",
  "Mobile": "#8b5cf6",
  "UI Library": "#f472b6",
  "State / API": "#fbbf24",
  "Tools": "#34d399",
};

export function ConstellationSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Frontend",
    "Mobile",
    "Styling & UI",
    "State & API",
    "Tools",
  ];

  const visibleSkills =
    filter === "All"
      ? SKILLS
      : SKILLS.filter((skill) => skill.cat === filter);

  const hoveredSkill = SKILLS.find((skill) => skill.id === hovered);

  return (
    <section className="relative px-6 py-32" id="skills">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="mb-3"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: "#00f5d4",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            03 / SKILLS
          </div>

          <h2
            className="mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            The tools I
            <br />
            build with.
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = filter === category;
              const color =
                category === "All" ? "#00f5d4" : CAT_COLORS[category];

              return (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className="rounded-full px-4 py-2 transition-all duration-200"
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: active ? color : "#64748b",
                    background: active
                      ? `${color}10`
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${
                      active ? `${color}45` : "rgba(255,255,255,0.07)"
                    }`,
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills container */}
        <div
          className="rounded-2xl p-5 md:p-8"
          style={{
            background: "rgba(5,5,20,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {visibleSkills.map((skill, index) => {
              const color = CAT_COLORS[skill.cat];
              const isHovered = hovered === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.025,
                  }}
                  onMouseEnter={() => setHovered(skill.id)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -3 }}
                  className="group relative cursor-pointer rounded-xl p-4"
                  style={{
                    background: isHovered
                      ? `${color}08`
                      : "rgba(255,255,255,0.025)",
                    border: `1px solid ${
                      isHovered ? `${color}40` : "rgba(255,255,255,0.06)"
                    }`,
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: color,
                        boxShadow: isHovered
                          ? `0 0 12px ${color}`
                          : "none",
                      }}
                    />

                    <span
                      style={{
                        fontSize: "0.6rem",
                        color: isHovered ? color : "#475569",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  <div
                    className="mb-4"
                    style={{
                      color: isHovered ? "#f8fafc" : "#cbd5e1",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                    }}
                  >
                    {skill.label}
                  </div>

                  {/* Progress */}
                  <div
                    className="mb-3 h-1 overflow-hidden rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="h-full rounded-full"
                      style={{
                        background: color,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      color: isHovered ? `${color}cc` : "#475569",
                      fontSize: "0.52rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {skill.cat}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hover information */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 flex items-center justify-between rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${CAT_COLORS[hoveredSkill.cat]}25`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: CAT_COLORS[hoveredSkill.cat],
                    boxShadow: `0 0 10px ${CAT_COLORS[hoveredSkill.cat]}`,
                  }}
                />

                <span
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.75rem",
                  }}
                >
                  {hoveredSkill.label}
                </span>
              </div>

              <span
                style={{
                  color: CAT_COLORS[hoveredSkill.cat],
                  fontSize: "0.65rem",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {hoveredSkill.level}% proficiency
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
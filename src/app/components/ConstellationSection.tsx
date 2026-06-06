import { useState } from "react";
import { motion } from "motion/react";

const SKILLS = [
  // Frameworks / Frontend
  { id: "react", label: "React", level: 96, cx: 90, cy: 90, cat: "Framework" },
  { id: "nextjs", label: "Next.js", level: 92, cx: 190, cy: 60, cat: "Framework" },
  { id: "vue", label: "Vue", level: 80, cx: 155, cy: 145, cat: "Framework" },
  { id: "nuxt", label: "Nuxt", level: 76, cx: 265, cy: 100, cat: "Framework" },
  { id: "ts", label: "TypeScript", level: 92, cx: 330, cy: 65, cat: "Framework" },
  { id: "js", label: "JavaScript", level: 95, cx: 390, cy: 108, cat: "Framework" },

  // Mobile
  { id: "rn", label: "React Native", level: 88, cx: 480, cy: 78, cat: "Mobile" },
  { id: "expo", label: "Expo", level: 82, cx: 565, cy: 50, cat: "Mobile" },
  { id: "nativewind", label: "NativeWind", level: 78, cx: 530, cy: 138, cat: "Mobile" },

  // UI Libraries
  { id: "tailwind", label: "Tailwind", level: 93, cx: 440, cy: 175, cat: "UI Library" },
  { id: "shadcn", label: "shadcn/ui", level: 90, cx: 525, cy: 205, cat: "UI Library" },
  { id: "mui", label: "Material UI", level: 82, cx: 620, cy: 175, cat: "UI Library" },
  { id: "chakra", label: "Chakra UI", level: 80, cx: 665, cy: 108, cat: "UI Library" },
  { id: "antd", label: "Ant Design", level: 75, cx: 700, cy: 200, cat: "UI Library" },

  // State & API
  { id: "zustand", label: "Zustand", level: 88, cx: 175, cy: 275, cat: "State / API" },
  { id: "redux", label: "Redux", level: 80, cx: 275, cy: 300, cat: "State / API" },
  { id: "graphql", label: "GraphQL", level: 84, cx: 370, cy: 270, cat: "State / API" },
  { id: "apollo", label: "Apollo Client", level: 82, cx: 470, cy: 305, cat: "State / API" },

  // Tools
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
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Framework", "Mobile", "UI Library", "State / API", "Tools"];
  const skillMap = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

  const visibleSkills = filter === "All" ? SKILLS : SKILLS.filter((s) => s.cat === filter);
  const visibleIds = new Set(visibleSkills.map((s) => s.id));
  const visibleConnections = CONNECTIONS.filter(([a, b]) => visibleIds.has(a) && visibleIds.has(b));
  const hoveredSkill = hovered ? skillMap[hovered] : null;

  return (
    <section className="relative py-32 px-6" id="constellation">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#00f5d4", fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
            03 / CONSTELLATION
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
              marginBottom: 24,
            }}
          >
            Skills as
            <br />a star map
          </h2>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-4 py-1.5 rounded-full transition-all duration-300"
                style={{
                  fontSize: "0.72rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  background: filter === cat
                    ? `${cat === "All" ? "#00f5d4" : CAT_COLORS[cat]}18`
                    : "rgba(255,255,255,0.04)",
                  border: filter === cat
                    ? `1px solid ${cat === "All" ? "#00f5d4" : CAT_COLORS[cat]}55`
                    : "1px solid rgba(255,255,255,0.08)",
                  color: filter === cat
                    ? cat === "All" ? "#00f5d4" : CAT_COLORS[cat]
                    : "#64748b",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Constellation canvas */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "rgba(5,5,20,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
        >
          <svg viewBox="0 0 760 380" className="w-full" style={{ display: "block" }}>
            <defs>
              <filter id="node-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {visibleConnections.map(([a, b]) => {
              const sa = skillMap[a];
              const sb = skillMap[b];
              const highlight = hovered === a || hovered === b;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={sa.cx} y1={sa.cy} x2={sb.cx} y2={sb.cy}
                  stroke={highlight ? CAT_COLORS[sa.cat] : "rgba(255,255,255,0.055)"}
                  strokeWidth={highlight ? 1.5 : 0.8}
                  style={{ transition: "all 0.3s" }}
                />
              );
            })}

            {/* Skill nodes */}
            {SKILLS.map((skill) => {
              const color = CAT_COLORS[skill.cat];
              const r = 4 + (skill.level / 100) * 9;
              const visible = visibleIds.has(skill.id);
              const isHov = hovered === skill.id;
              return (
                <g
                  key={skill.id}
                  style={{ opacity: visible ? 1 : 0.1, transition: "opacity 0.4s", cursor: "pointer" }}
                  onMouseEnter={() => setHovered(skill.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {isHov && <circle cx={skill.cx} cy={skill.cy} r={r + 7} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.35} />}
                  <circle cx={skill.cx} cy={skill.cy} r={r + 3} fill={color} fillOpacity={isHov ? 0.18 : 0.07} style={{ transition: "all 0.3s" }} />
                  <circle
                    cx={skill.cx} cy={skill.cy} r={r}
                    fill={color}
                    fillOpacity={isHov ? 1 : 0.82}
                    stroke={color} strokeWidth={isHov ? 2 : 0}
                    filter={isHov ? "url(#node-glow)" : undefined}
                    style={{ transition: "all 0.2s" }}
                  />
                  {isHov && (
                    <text x={skill.cx} y={skill.cy + 4} textAnchor="middle" fill="#05050f" fontSize={7} fontFamily="JetBrains Mono,monospace" fontWeight="bold" style={{ userSelect: "none" }}>
                      {skill.level}
                    </text>
                  )}
                  <text
                    x={skill.cx} y={skill.cy + r + 13}
                    textAnchor="middle"
                    fill={isHov ? color : "rgba(148,163,184,0.65)"}
                    fontSize={isHov ? 10 : 9}
                    fontFamily="JetBrains Mono,monospace"
                    style={{ transition: "all 0.2s", userSelect: "none" }}
                  >
                    {skill.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredSkill && (
            <div
              className="absolute bottom-4 left-4 px-4 py-3 rounded-xl"
              style={{ background: "rgba(10,10,30,0.92)", border: `1px solid ${CAT_COLORS[hoveredSkill.cat]}35`, backdropFilter: "blur(12px)", pointerEvents: "none" }}
            >
              <div style={{ fontSize: "0.6rem", color: CAT_COLORS[hoveredSkill.cat], fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>
                {hoveredSkill.cat.toUpperCase()}
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>{hoveredSkill.label}</div>
              <div className="flex items-center gap-2">
                <div style={{ height: 3, width: 100, borderRadius: 2, background: "rgba(255,255,255,0.08)" }}>
                  <div style={{ height: "100%", width: `${hoveredSkill.level}%`, borderRadius: 2, background: `linear-gradient(90deg, ${CAT_COLORS[hoveredSkill.cat]}, transparent)` }} />
                </div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{hoveredSkill.level}%</span>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
            {Object.entries(CAT_COLORS).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-2">
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                <span style={{ fontSize: "0.58rem", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

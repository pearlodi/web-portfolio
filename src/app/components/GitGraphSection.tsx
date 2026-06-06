import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowBorderCard } from "./GlowBorderCard";
import { GitBranch, GitCommit, GitMerge, Tag } from "lucide-react";

const CELL_W = 88;
const CELL_H = 58;
const PAD_X = 50;
const PAD_Y = 45;
const R = 7;

const BRANCHES = [
  { lane: 0, name: "main", color: "#00f5d4" },
  { lane: 1, name: "design-system", color: "#8b5cf6" },
  { lane: 2, name: "feature/realtime", color: "#f472b6" },
  { lane: 3, name: "hotfix/perf", color: "#fbbf24" },
];

interface Commit {
  id: string;
  col: number;
  lane: number;
  message: string;
  short: string;
  date: string;
  parents: string[];
  isMerge?: boolean;
  isRelease?: boolean;
}

const COMMITS: Commit[] = [
  { id: "a1", col: 0, lane: 0, message: "Initial commit — project scaffold", short: "a1f2e3", date: "Mar 01", parents: [] },
  { id: "b1", col: 1, lane: 0, message: "Configure Vite + TypeScript strict mode", short: "b4d5f6", date: "Mar 02", parents: ["a1"] },
  { id: "c1", col: 2, lane: 0, message: "Setup React Router + auth guards", short: "c7e8f9", date: "Mar 04", parents: ["b1"] },
  { id: "c2", col: 2, lane: 1, message: "Branch: design-system (from b1)", short: "d1e2f3", date: "Mar 04", parents: ["b1"] },
  { id: "d1", col: 3, lane: 0, message: "Integrate REST API client + interceptors", short: "e4f5a6", date: "Mar 06", parents: ["c1"] },
  { id: "d2", col: 3, lane: 1, message: "Design token system & color palette", short: "f7b8c9", date: "Mar 06", parents: ["c2"] },
  { id: "e1", col: 4, lane: 0, message: "Add middleware + request queuing", short: "a1b2d3", date: "Mar 08", parents: ["d1"] },
  { id: "e2", col: 4, lane: 1, message: "Glass card + motion components", short: "e4f5b6", date: "Mar 08", parents: ["d2"] },
  { id: "e3", col: 4, lane: 2, message: "Branch: feature/realtime (from c1)", short: "c7d8e9", date: "Mar 08", parents: ["c1"] },
  { id: "f1", col: 5, lane: 0, message: "Merge: design-system → main", short: "f0a1b2", date: "Mar 10", parents: ["e1", "e2"], isMerge: true },
  { id: "f2", col: 5, lane: 2, message: "WebSocket client + reconnect logic", short: "c3d4e5", date: "Mar 10", parents: ["e3"] },
  { id: "g1", col: 6, lane: 0, message: "Dashboard scaffolding + routing", short: "f6a7b8", date: "Mar 12", parents: ["f1"] },
  { id: "g2", col: 6, lane: 2, message: "Live presence sync across tabs", short: "c9d0e1", date: "Mar 12", parents: ["f2"] },
  { id: "g3", col: 6, lane: 3, message: "Branch: hotfix/perf (from f1)", short: "f2a3b4", date: "Mar 12", parents: ["f1"] },
  { id: "h1", col: 7, lane: 0, message: "Analytics layer + event pipeline", short: "c5d6e7", date: "Mar 13", parents: ["g1"] },
  { id: "h2", col: 7, lane: 2, message: "CRDT conflict resolution engine", short: "f8a9b0", date: "Mar 13", parents: ["g2"] },
  { id: "h3", col: 7, lane: 3, message: "Lazy-load all routes → 40% smaller bundle", short: "c1d2e3", date: "Mar 13", parents: ["g3"] },
  { id: "i1", col: 8, lane: 0, message: "Merge: hotfix/perf → main", short: "f4a5b6", date: "Mar 14", parents: ["h1", "h3"], isMerge: true },
  { id: "i2", col: 8, lane: 2, message: "Cursor broadcast + throttle", short: "c7d8e9", date: "Mar 14", parents: ["h2"] },
  { id: "j1", col: 9, lane: 0, message: "Merge: feature/realtime → main", short: "f0a1b2", date: "Mar 16", parents: ["i1", "i2"], isMerge: true },
  { id: "k1", col: 10, lane: 0, message: "🚀 Release v1.0.0 — Phantom Canvas ships", short: "c3d4e5", date: "Mar 17", parents: ["j1"], isRelease: true },
];

function getCoords(col: number, lane: number) {
  return { cx: PAD_X + col * CELL_W, cy: PAD_Y + lane * CELL_H };
}

function buildConnectionPaths(commits: Commit[]) {
  const commitMap = Object.fromEntries(commits.map((c) => [c.id, c]));
  const paths: { path: string; color: string; key: string }[] = [];

  for (const commit of commits) {
    const to = getCoords(commit.col, commit.lane);
    for (const parentId of commit.parents) {
      const parent = commitMap[parentId];
      if (!parent) continue;
      const from = getCoords(parent.col, parent.lane);
      const fromColor = BRANCHES[parent.lane]?.color ?? "#ffffff";

      let d: string;
      if (from.cy === to.cy) {
        // Same lane — straight horizontal
        d = `M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`;
      } else {
        // Different lane — bezier curve
        const midX = (from.cx + to.cx) / 2;
        d = `M ${from.cx} ${from.cy} C ${midX} ${from.cy}, ${midX} ${to.cy}, ${to.cx} ${to.cy}`;
      }

      paths.push({ path: d, color: fromColor, key: `${parentId}::${commit.id}` });
    }
  }

  return paths;
}

const SVG_W = PAD_X * 2 + 10 * CELL_W;
const SVG_H = PAD_Y * 2 + 3 * CELL_H;

export function GitGraphSection() {
  const [hoveredCommit, setHoveredCommit] = useState<Commit | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const commitMap = Object.fromEntries(COMMITS.map((c) => [c.id, c]));
  const paths = buildConnectionPaths(COMMITS);

  const visibleLanes = selectedBranch
    ? new Set([0, BRANCHES.find((b) => b.name === selectedBranch)?.lane ?? 0])
    : null;

  const isCommitVisible = (c: Commit) =>
    !visibleLanes || visibleLanes.has(c.lane) || c.isMerge;

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div
            style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#00f5d4", fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}
          >
            04 / GIT GRAPH

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
              marginBottom: 12,
            }}
          >
            How the code
            <br />comes together
          </h2>
          <p style={{ color: "#64748b", maxWidth: 480 }}>
            A real commit history from Phantom Canvas — watch features branch, fix, and merge into production.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlowBorderCard variant="cyan" rounded="rounded-2xl" className="overflow-hidden">
            {/* Toolbar */}
            <div
              className="flex items-center justify-between gap-4 px-6 py-4 flex-wrap"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2">
                <GitBranch size={14} style={{ color: "#00f5d4" }} />
                <span style={{ fontSize: "0.75rem", color: "#00f5d4", fontFamily: "'JetBrains Mono', monospace" }}>
                  {COMMITS.length} commits
                </span>
                <span style={{ fontSize: "0.75rem", color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>·</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                  {BRANCHES.length} branches
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBranch(null)}
                  className="px-3 py-1 rounded-md transition-all"
                  style={{
                    fontSize: "0.65rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    background: !selectedBranch ? "rgba(0,245,212,0.15)" : "rgba(255,255,255,0.04)",
                    border: !selectedBranch ? "1px solid rgba(0,245,212,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    color: !selectedBranch ? "#00f5d4" : "#64748b",
                  }}
                >
                  all branches
                </button>
                {BRANCHES.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setSelectedBranch(selectedBranch === b.name ? null : b.name)}
                    className="px-3 py-1 rounded-md transition-all flex items-center gap-1.5"
                    style={{
                      fontSize: "0.65rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      background:
                        selectedBranch === b.name ? `${b.color}20` : "rgba(255,255,255,0.04)",
                      border:
                        selectedBranch === b.name
                          ? `1px solid ${b.color}50`
                          : "1px solid rgba(255,255,255,0.08)",
                      color: selectedBranch === b.name ? b.color : "#64748b",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: b.color,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Graph scroll area */}
            <div ref={scrollRef} className="overflow-x-auto" style={{ cursor: "grab" }}>
              <svg
                width={SVG_W}
                height={SVG_H + 20}
                viewBox={`0 0 ${SVG_W} ${SVG_H + 20}`}
                style={{ display: "block", minWidth: SVG_W }}
              >
                <defs>
                  {BRANCHES.map((b) => (
                    <filter key={b.lane} id={`glow-${b.lane}`}>
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  ))}
                </defs>

                {/* Branch lane backgrounds */}
                {BRANCHES.map((b) => (
                  <rect
                    key={b.lane}
                    x={0}
                    y={PAD_Y + b.lane * CELL_H - CELL_H / 2}
                    width={SVG_W}
                    height={CELL_H}
                    fill={b.color}
                    fillOpacity={
                      !visibleLanes || visibleLanes.has(b.lane) ? 0.025 : 0.008
                    }
                    style={{ transition: "fill-opacity 0.4s" }}
                  />
                ))}

                {/* Branch lane labels on left */}
                {BRANCHES.map((b) => (
                  <text
                    key={`label-${b.lane}`}
                    x={8}
                    y={PAD_Y + b.lane * CELL_H + 4}
                    fill={b.color}
                    fillOpacity={!visibleLanes || visibleLanes.has(b.lane) ? 0.6 : 0.15}
                    fontSize={8}
                    fontFamily="JetBrains Mono, monospace"
                    style={{ transition: "fill-opacity 0.4s", userSelect: "none" }}
                  >
                    {b.name}
                  </text>
                ))}

                {/* Connection paths */}
                {paths.map((p) => {
                  const [fromId, toId] = p.key.split("::");
                  const fromCommit = commitMap[fromId];
                  const toCommit = commitMap[toId];
                  const isVisible =
                    !visibleLanes ||
                    (fromCommit && (visibleLanes.has(fromCommit.lane) || fromCommit.isMerge)) ||
                    (toCommit && (visibleLanes.has(toCommit.lane) || toCommit.isMerge));

                  return (
                    <path
                      key={p.key}
                      d={p.path}
                      stroke={p.color}
                      strokeWidth={1.5}
                      fill="none"
                      strokeOpacity={isVisible ? 0.6 : 0.1}
                      style={{ transition: "stroke-opacity 0.4s" }}
                    />
                  );
                })}

                {/* Commit dots */}
                {COMMITS.map((commit) => {
                  const { cx, cy } = getCoords(commit.col, commit.lane);
                  const branch = BRANCHES[commit.lane];
                  const color = branch?.color ?? "#ffffff";
                  const visible = isCommitVisible(commit);
                  const isHov = hoveredCommit?.id === commit.id;

                  return (
                    <g
                      key={commit.id}
                      style={{ cursor: "pointer", opacity: visible ? 1 : 0.15, transition: "opacity 0.4s" }}
                      onMouseEnter={() => setHoveredCommit(commit)}
                      onMouseLeave={() => setHoveredCommit(null)}
                    >
                      {/* Pulse ring on hover */}
                      {isHov && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={R + 6}
                          fill="none"
                          stroke={color}
                          strokeWidth={1}
                          strokeOpacity={0.4}
                        />
                      )}

                      {/* Halo */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHov ? R + 4 : R + 2}
                        fill={color}
                        fillOpacity={isHov ? 0.2 : 0.08}
                        style={{ transition: "all 0.2s" }}
                      />

                      {/* Core */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={commit.isRelease ? R + 2 : R}
                        fill={commit.isRelease ? color : "rgba(5,5,20,0.9)"}
                        stroke={color}
                        strokeWidth={commit.isMerge ? 2.5 : 1.5}
                        filter={isHov ? `url(#glow-${commit.lane})` : undefined}
                        style={{ transition: "all 0.2s" }}
                      />

                      {/* Icons inside */}
                      {commit.isMerge && (
                        <text
                          x={cx}
                          y={cy + 3.5}
                          textAnchor="middle"
                          fill={color}
                          fontSize={7}
                          fontFamily="sans-serif"
                          style={{ userSelect: "none" }}
                        >
                          ⇣
                        </text>
                      )}
                      {commit.isRelease && (
                        <text
                          x={cx}
                          y={cy + 3.5}
                          textAnchor="middle"
                          fill="#05050f"
                          fontSize={8}
                          fontFamily="sans-serif"
                          style={{ userSelect: "none" }}
                        >
                          ✦
                        </text>
                      )}

                      {/* Date below last row */}
                      <text
                        x={cx}
                        y={SVG_H - 5}
                        textAnchor="middle"
                        fill="rgba(100,116,139,0.5)"
                        fontSize={7}
                        fontFamily="JetBrains Mono, monospace"
                        style={{ userSelect: "none" }}
                      >
                        {commit.date}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Commit detail panel */}
            <AnimatePresence>
              {hoveredCommit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-4 flex items-start gap-4 flex-wrap"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="flex items-center gap-2 flex-shrink-0"
                    style={{ minWidth: 120 }}
                  >
                    {hoveredCommit.isRelease ? (
                      <Tag size={14} style={{ color: BRANCHES[hoveredCommit.lane]?.color }} />
                    ) : hoveredCommit.isMerge ? (
                      <GitMerge size={14} style={{ color: BRANCHES[hoveredCommit.lane]?.color }} />
                    ) : (
                      <GitCommit size={14} style={{ color: BRANCHES[hoveredCommit.lane]?.color }} />
                    )}
                    <code
                      style={{
                        fontSize: "0.7rem",
                        color: BRANCHES[hoveredCommit.lane]?.color,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: `${BRANCHES[hoveredCommit.lane]?.color}15`,
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      {hoveredCommit.short}
                    </code>
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: "0.875rem", color: "#e2e8f0", marginBottom: 4 }}>
                      {hoveredCommit.message}
                    </p>
                    <div className="flex items-center gap-3">
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "#64748b",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {hoveredCommit.date} · 2024
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-md"
                        style={{
                          fontSize: "0.6rem",
                          fontFamily: "'JetBrains Mono', monospace",
                          background: `${BRANCHES[hoveredCommit.lane]?.color}15`,
                          color: BRANCHES[hoveredCommit.lane]?.color,
                          border: `1px solid ${BRANCHES[hoveredCommit.lane]?.color}30`,
                        }}
                      >
                        {BRANCHES[hoveredCommit.lane]?.name}
                      </span>
                      {hoveredCommit.parents.length > 0 && (
                        <span style={{ fontSize: "0.65rem", color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>
                          parent: {hoveredCommit.parents.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!hoveredCommit && (
              <div
                className="px-6 py-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <p style={{ fontSize: "0.75rem", color: "rgba(100,116,139,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
                  hover a commit to inspect ·  scroll to explore
                </p>
              </div>
            )}
          </GlowBorderCard>

          {/* Bottom stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { label: "Merged PRs", value: "4", color: "#8b5cf6" },
              { label: "Hotfixes", value: "1", color: "#fbbf24" },
              { label: "Contributors", value: "3", color: "#f472b6" },
              { label: "Days to ship", value: "16", color: "#00f5d4" },
            ].map((stat) => (
              <GlowBorderCard key={stat.label} rounded="rounded-xl">
                <div className="p-4 flex items-center gap-3">
                  <div
                    style={{ width: 8, height: 8, borderRadius: "50%", background: stat.color, flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.65rem", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              </GlowBorderCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

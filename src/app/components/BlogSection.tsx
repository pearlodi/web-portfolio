import { motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import { GlowBorderCard } from "./GlowBorderCard";
import React from "react";

const ARTICLES = [
  {
    id: 1,
    title: "Animate on Scroll in React & Vue",
    excerpt:
      "A deep dive into scroll-triggered animations — from Intersection Observer basics to orchestrated entrance sequences. Covers implementation in both React and Vue with reusable hooks and composables.",
    tag: "Animation",
    tagColor: "#00f5d4",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=700&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "The HTML-JSX Fusion: Where Two Worlds Collide",
    excerpt:
      "JSX is the fusion point where HTML's structure collides with JavaScript's power. Learn how JSX transforms your mental model and why it's more than just syntactic sugar.",
    tag: "React",
    tagColor: "#8b5cf6",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=700&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "React Hooks Demystified",
    excerpt:
      "Simplifying component logic with useState, useEffect, and custom hooks. A practical guide to replacing class component patterns with elegant, composable function hooks.",
    tag: "React",
    tagColor: "#8b5cf6",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "Browser Fingerprinting: Like Cookies, But on Steroids",
    excerpt:
      "How websites track you without storing a single cookie — canvas fingerprinting, WebGL entropy, and font enumeration. What it means for privacy, and how to detect it.",
    tag: "Privacy",
    tagColor: "#fbbf24",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "Building Reusable React Components",
    excerpt:
      "The principles behind component APIs that feel native to React — composition over configuration, render props, forwardRef patterns, and how to ship components your team will actually use.",
    tag: "Architecture",
    tagColor: "#f472b6",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=700&q=80",
    featured: false,
  },
];

function ArticleCard({
  article,
  delay = 0,
}: {
  article: (typeof ARTICLES)[number];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55 }}
      className="h-full"
    >
      <GlowBorderCard
        variant={
          article.tagColor === "#00f5d4"
            ? "cyan"
            : article.tagColor === "#8b5cf6"
            ? "violet"
            : article.tagColor === "#fbbf24"
            ? "amber"
            : "pink"
        }
        className="h-full"
        rounded="rounded-2xl"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Cover image */}
          <div className="relative overflow-hidden" style={{ height: article.featured ? 240 : 160, flexShrink: 0 }}>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(5,5,20,0.05), rgba(5,5,20,0.7))",
              }}
            />
            {/* Tag pill */}
            <div
              className="absolute bottom-3 left-4 px-2.5 py-1 rounded-full"
              style={{
                background: `${article.tagColor}20`,
                border: `1px solid ${article.tagColor}50`,
                backdropFilter: "blur(8px)",
                fontSize: "0.62rem",
                color: article.tagColor,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.08em",
              }}
            >
              {article.tag}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 p-5 flex-1">
            <h3
              style={{
                fontSize: article.featured ? "1.15rem" : "0.95rem",
                fontWeight: 700,
                color: "#f1f5f9",
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
              }}
            >
              {article.title}
            </h3>
            <p
              style={{
                fontSize: "0.82rem",
                color: "#64748b",
                lineHeight: 1.7,
                display: "-webkit-box",
                WebkitLineClamp: article.featured ? 3 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {article.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-1.5" style={{ color: "#475569", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace" }}>
                <Clock size={10} />
                {article.readTime} read
              </div>
              <button
                className="flex items-center gap-1 transition-all duration-200 hover:gap-2"
                style={{ fontSize: "0.75rem", fontWeight: 600, color: article.tagColor }}
              >
                Read more
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </GlowBorderCard>
    </motion.div>
  );
}

export function BlogSection() {
  const featured = ARTICLES.find((a) => a.featured)!;
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <section className="relative py-32 px-6" id="articles">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#00f5d4", fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
            05 / ARTICLES
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
            Writing &amp;
            <br />thinking out loud
          </h2>
        </motion.div>

        {/* Featured + grid layout */}
          {/* Featured article — takes 2 cols */}
         
          {/* Rest — 2x2 grid in remaining 3 cols */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <ArticleCard key={article.id} article={article} delay={0.08 * (i + 1)} />
            ))}
          </div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles } from "lucide-react";
import React from "react";

const CHIPS = [
  "Tell me about Odi",
  "Show React projects",
  "Tech stack",
  "Available for hire?",
  "Contact information",
];

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("tell me about odi") || (q.includes("about") && (q.includes("odi") || q.includes("pearl"))) || q.includes("who is")) {
    return "Odi Pearl is a Frontend & Mobile Developer based in Abuja, Nigeria 🇳🇬 with 4+ years of experience.\n\nShe blends creativity with code — converting Figma designs into polished, pixel-perfect interfaces with a sharp focus on performance and animation. Currently shipping at Toks Net (full-time) and Aya HQ (contract).";
  }
  if (q.includes("react project") || q.includes("show react")) {
    return "React projects Odi has shipped:\n\n• Aya Hackathons — Next.js + TypeScript\n• Zeta Brent Education — React + GraphQL + Apollo\n• AedionAI — Next.js with motion-heavy animations\n• ToksNet Africa — React Native + Expo\n\nEach one is live with real users.";
  }
  if (q.includes("project") || q.includes("built") || q.includes("shipped") || q.includes("portfolio")) {
    return "Odi has shipped 9 public projects:\n\n• Aya Hackathons (labs.ayahq.com)\n• ToksNet Africa (toks.net.ng)\n• AedionAI (AI product site)\n• Zeta Brent Education (e-learning)\n• AyaHQ (ayahq.com)\n• Abitto Global (abittoglobal.com)\n\nWant details on any of them?";
  }
  if (q.includes("stack") || q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("framework") || q.includes("tools")) {
    return "Odi's full stack:\n\nFrameworks — React, Next.js, Vue, Nuxt, React Native\nLanguages — TypeScript, JavaScript\nUI — Tailwind, shadcn/ui, Material UI, Chakra, Ant Design\nState & APIs — Zustand, Redux, GraphQL, Apollo Client\nTools — Figma, Expo, GitHub";
  }
  if (q.includes("available") || q.includes("hire") || q.includes("job") || q.includes("open to") || q.includes("looking")) {
    return "Yes — Odi is open to work right now 🟢\n\nShe's available for:\n• Full-time frontend / mobile roles\n• Contract engagements\n• Freelance collaborations\n\nAbuja, NG (UTC+1) · Remote preferred\n\nDrop her a line at pearlodi7@gmail.com!";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("get in touch") || q.includes("message")) {
    return "Here's how to reach Odi:\n\nEmail → pearlodi7@gmail.com\nLinkedIn → linkedin.com/in/odipearl\nGitHub → github.com/pearlodi\nWhatsApp → +234 704 124 0169";
  }
  if (q.includes("experience") || q.includes("role") || q.includes("company") || q.includes("career") || q.includes("work history")) {
    return "Odi's career timeline:\n\n2024–now · Toks Net — Frontend & Mobile Dev (Full-time)\n2024–now · Aya HQ — Frontend Dev (Contract)\n2023 · Ownage Fiditech — Frontend Dev (Intern)\n2022 · Abitto Global — Frontend Dev (Intern)";
  }
  if (q.includes("mobile") || q.includes("react native") || q.includes("expo") || q.includes("native")) {
    return "Odi builds cross-platform mobile apps with React Native and Expo.\n\nHer main mobile project is ToksNet Africa — a telecom app for Nigeria handling airtime, data, and bill payments. Styled with NativeWind for a native feel.";
  }
  if (q.includes("article") || q.includes("blog") || q.includes("writ")) {
    return "Odi's articles:\n\n• Animate on Scroll in React & Vue\n• The HTML-JSX Fusion: Where Two Worlds Collide\n• React Hooks Demystified\n• Browser Fingerprinting: Like Cookies, But on Steroids\n• Building Reusable React Components";
  }
  if (q.includes("figma") || q.includes("design")) {
    return "Odi is fluent in Figma and specialises in translating designs into pixel-perfect code. She brings a designer's eye to every component she builds.";
  }
  if (q.includes("location") || q.includes("where") || q.includes("based") || q.includes("nigeria") || q.includes("abuja")) {
    return "Odi is based in lagos, Nigeria 🇳🇬 (UTC+1). She's open to remote work globally and hybrid arrangements locally.";
  }
  return "Good question! I can tell you about Odi's projects, tech stack, career, availability, or how to get in touch. Try one of the chips below — or just ask! 💬";
}

function renderText(text: string, isUser: boolean) {
  return text.split("\n").map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={j} style={{ color: isUser ? "#fff" : "#e2e8f0", fontWeight: 700 }}>
              {p.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{p}</span>
          )
        )}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#00f5d4,#8b5cf6)", fontSize: "0.6rem", fontWeight: 800, color: "#05050f" }}
      >
        OP
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#00f5d4" }}
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  );
}

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [idCounter, setIdCounter] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasUserMessages = messages.some((m) => m.role === "user");

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const uid = idCounter;
    setMessages((m) => [...m, { id: uid, role: "user", text: trimmed }]);
    setIdCounter((n) => n + 2);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: uid + 1, role: "assistant", text: getResponse(trimmed) }]);
    }, 900 + Math.random() * 500);
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2">
        {/* "Ask Odi" label */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.88 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className="px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(6,6,22,0.92)",
                border: "1px solid rgba(0,245,212,0.28)",
                backdropFilter: "blur(14px)",
                fontSize: "0.72rem",
                color: "#00f5d4",
                fontWeight: 600,
                pointerEvents: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              Ask Odi ✦
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          style={{ position: "relative", width: 58, height: 58 }}
        >
          {/* Pulse rings (only when closed) */}
          {!open && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(0,245,212,0.3)" }}
                animate={{ scale: [1, 1.65], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(139,92,246,0.25)" }}
                animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.45 }}
              />
            </>
          )}

          {/* Core */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              background: open
                ? "rgba(20,20,45,0.95)"
                : "linear-gradient(135deg,#00f5d4 0%,#8b5cf6 55%,#f472b6 100%)",
              border: open ? "1px solid rgba(255,255,255,0.12)" : "none",
              boxShadow: open ? "none" : "0 8px 30px rgba(0,245,212,0.35),0 4px 16px rgba(139,92,246,0.25)",
            }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="x" initial={{ rotate: -80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 80, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X size={20} style={{ color: "#94a3b8" }} />
                </motion.div>
              ) : (
                <motion.div key="spark" initial={{ rotate: 80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -80, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Sparkles size={22} style={{ color: "#05050f" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop — subtle, just dims the page slightly */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[55]"
              style={{ background: "rgba(0,0,0,0.35)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal panel — anchored bottom-right above the button */}
            <motion.div
              key="modal"
              className="fixed z-[58] flex flex-col"
              style={{
                bottom: 100,
                right: 24,
                width: "min(420px, calc(100vw - 48px))",
                height: "min(580px, calc(100vh - 140px))",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
            >
              {/* Spinning glow border */}
              <div className="relative rounded-2xl glow-border-active h-full" style={{ boxShadow: "0 32px 100px rgba(0,0,0,0.7), 0 0 60px rgba(0,245,212,0.08)" }}>
                {/* Glass inner */}
                <div
                  className="absolute inset-[1px] rounded-2xl flex flex-col overflow-hidden"
                  style={{
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                    background: "rgba(6,6,22,0.96)",
                  }}
                >
                  {/* ── Header ── */}
                  <div
                    className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#00f5d4,#8b5cf6)" }}
                      >
                        <Sparkles size={17} style={{ color: "#05050f" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.01em" }}>Odi AI</div>
                        <div className="flex items-center gap-1.5">
                          <motion.div
                            style={{ width: 5, height: 5, borderRadius: "50%", background: "#00f5d4" }}
                            animate={{ opacity: [1, 0.35, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span style={{ fontSize: "0.63rem", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                            Portfolio Assistant · Always online
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-xl transition-colors"
                      style={{ color: "#64748b", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)")}
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* ── Messages ── */}
                  <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
                    {/* Welcome message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-end gap-2"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#00f5d4,#8b5cf6)", fontSize: "0.62rem", fontWeight: 800, color: "#05050f" }}
                      >
                        OP
                      </div>
                      <div
                        className="px-4 py-3 rounded-2xl rounded-bl-sm"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          fontSize: "0.85rem",
                          color: "#cbd5e1",
                          lineHeight: 1.7,
                          maxWidth: "85%",
                        }}
                      >
                        Hi! I'm Odi's portfolio assistant. Ask me about her projects, skills, experience, or availability. 👋
                      </div>
                    </motion.div>

                    {/* Suggestion chips — shown before first user message */}
                    {!hasUserMessages && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-wrap gap-2 pl-10"
                      >
                        {CHIPS.map((chip, i) => (
                          <motion.button
                            key={chip}
                            initial={{ opacity: 0, scale: 0.88 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.12 + i * 0.07 }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => send(chip)}
                            className="px-3 py-1.5 rounded-full"
                            style={{
                              fontSize: "0.75rem",
                              color: "#00f5d4",
                              background: "rgba(0,245,212,0.08)",
                              border: "1px solid rgba(0,245,212,0.22)",
                              cursor: "pointer",
                              fontFamily: "'Outfit', sans-serif",
                            }}
                          >
                            {chip}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Conversation messages */}
                    {messages.map((msg, i) => {
                      const isUser = msg.role === "user";
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22 }}
                          className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          {!isUser && (
                            <div
                              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                              style={{ background: "linear-gradient(135deg,#00f5d4,#8b5cf6)", fontSize: "0.62rem", fontWeight: 800, color: "#05050f" }}
                            >
                              OP
                            </div>
                          )}
                          <div
                            style={{
                              maxWidth: "80%",
                              padding: "10px 15px",
                              borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                              background: isUser
                                ? "linear-gradient(135deg,#00f5d4,#8b5cf6)"
                                : "rgba(255,255,255,0.07)",
                              border: isUser ? "none" : "1px solid rgba(255,255,255,0.09)",
                              fontSize: "0.84rem",
                              lineHeight: 1.7,
                              color: isUser ? "#05050f" : "#cbd5e1",
                              fontWeight: isUser ? 600 : 400,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {renderText(msg.text, isUser)}
                          </div>
                        </motion.div>
                      );
                    })}

                    {typing && <TypingIndicator />}
                    <div ref={bottomRef} />
                  </div>

                  {/* ── Input bar ── */}
                  <div
                    className="px-5 py-4 flex-shrink-0"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask something about Odi…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                        className="flex-1 bg-transparent outline-none"
                        style={{ fontSize: "0.85rem", color: "#e2e8f0", fontFamily: "'Outfit', sans-serif" }}
                      />
                      <motion.button
                        onClick={() => send(input)}
                        disabled={!input.trim() || typing}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        className="flex items-center justify-center rounded-lg flex-shrink-0"
                        style={{
                          width: 34,
                          height: 34,
                          background: input.trim() && !typing
                            ? "linear-gradient(135deg,#00f5d4,#8b5cf6)"
                            : "rgba(255,255,255,0.06)",
                          color: input.trim() && !typing ? "#05050f" : "#475569",
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                        <Send size={14} />
                      </motion.button>
                    </div>
                    <p style={{ fontSize: "0.58rem", color: "#1e293b", textAlign: "center", marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                      Odi AI · Portfolio Assistant
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

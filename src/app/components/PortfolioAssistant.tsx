import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, X, Send, Sparkles } from "lucide-react";
import React from "react";

const CHIPS = [
  "Tell me about Odi",
  "Best projects",
  "Tech stack",
  "Education",
  "Available for hire?",
  "Contact information",
];

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  action?: "contact";
};

type AssistantReply = {
  text: string;
  action?: "contact";
};

const PROFILE = {
  name: "Odi Pearl",
  title: "Frontend Web & Mobile Developer",
  location: "Lagos, Nigeria",
  timezone: "GMT+1",
  email: "pearlodi7@gmail.com",
  phone: "+234 704 124 0169",
  linkedin: "linkedin.com/in/odipearl",
  github: "github.com/pearlodi",
  portfolio: "pearlodi.netlify.app",
  birthDate: "May 25, 1999",
  age: 27,
  education: "BSc Accounting, University of Nigeria",
};

function renderText(text: string, isUser: boolean) {
  return text.split("\n").map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong
              key={j}
              style={{ color: isUser ? "#fff" : "#e2e8f0", fontWeight: 700 }}
            >
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
        style={{
          background: "linear-gradient(135deg,#00f5d4,#8b5cf6)",
          fontSize: "0.6rem",
          fontWeight: 800,
          color: "#05050f",
        }}
      >
        OP
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#00f5d4",
            }}
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const scrollToContact = () => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const SYSTEM_PROMPT = `
You are Pearl's portfolio assistant. Answer questions about Pearl Odi only using the information below. 
You are Pearl's portfolio assistant. Be friendly, confident, and easy to talk to. Answer questions about Pearl's experience, projects, skills, and background in a natural conversational style. Keep answers clear and concise, expanding only when helpful. Sound like a knowledgeable assistant—not a corporate chatbot. If a question falls outside what you know, be honest and direct the user to contact Pearl.If something isn't covered, say you don't have that detail and suggest the contact form.
If the user asks about contact details, return exactly this at the end of your reply: [ACTION:contact]

--- PEARL'S INFO ---
Full name: Odi Pearl
Title: Frontend Web & Mobile Developer
Location: Lagos, Nigeria (GMT+1)
Email: pearlodi7@gmail.com
Phone: +234 704 124 0169
LinkedIn: linkedin.com/in/odipearl
GitHub: github.com/pearlodi
Portfolio: pearlodi.netlify.app
Date of birth: May 25, 1999
Age: 27 (current year is 2026)
Education: BSc Accounting, University of Nigeria
Total experience: 5+ years coding, 4+ years professional frontend experience — always state it this way, do not calculate from job list.
  
  Tech stack:
  - Languages: JavaScript, TypeScript, HTML, CSS
  - Web: React.js, Next.js, Vue.js, Astro
  - Mobile: React Native, Expo, NativeWind
  - UI: TailwindCSS, shadcn/ui, Material UI
  - State & data: GraphQL, Apollo Client, REST APIs, Zustand, Redux, Pinia
  - Strengths: frontend architecture, performance optimization, responsive and mobile-first UI, API integration, state management, technical writing, remote collaboration
  
  Experience:
  - Toks Net, Frontend Lead & Mobile Developer, 2024–present: leads frontend standards, reusable component systems, code review, CMS/admin products, and Aedion AI web and mobile. First App Store + Play Store launch before leaving that specific project.
  - Aya HQ, Contract Frontend Developer: built reusable components, responsive pages, backend-connected flows, data-heavy UI for Aya Labs and hackathon products.
  - Ownage Fiditech LLC, Frontend Developer intern, 2023–2024: client-facing websites across multiple brands.
  - Abitto Global, Frontend Developer, 2022–2023: Figma-to-code, REST API integration, internal accounting software.
  - Sirinu Token, Volunteer Frontend Developer, 2022–2023.
  - Iji Technologies, Volunteer Frontend Developer.
  
  Projects:
  - Aedion AI web app — Next.js, TypeScript, GraphQL, Apollo Client, Zustand, shadcn/ui
  - Aedion AI mobile app — first mobile app, handled initial React Native/Expo build and first App Store + Play Store launch
  - Aya Labs — Next.js, TypeScript, Tailwind, shadcn/ui
  - Aya Hackathons — event and hackathon platform
  - Zeta Brent Education — React/TypeScript learning platform with GraphQL and Apollo Client
  - Sehembz Travels — travel, visa, tourism, bookings, logistics
  - ToksNet Africa — digital telecom services
  - Abitto Global and Abitto Ferry — corporate and ferry booking
  - Task Budy — personal productivity app
  
  Technical writing topics:
  - Animate on Scroll (AOS) in React and Vue
  - React Hooks
  - JavaScript Prototypal Inheritance
  - Factory Functions and Constructor Functions in JavaScript
  - Building Reusable React Components
  - Browser Fingerprinting
  
  Availability: Open to frontend developer, frontend lead, and React Native roles. Remote, contract, freelance, or hybrid.
  
  Growth areas (honest):
  - Work-life balance — actively improving, learning to pace and rest
  - Mobile development is still growing; deepest experience is frontend web
  - Testing is an area she is strengthening
  - Backend and DevOps are supporting skills, not her main specialty
  
  Do not answer questions unrelated to Pearl's professional profile. If asked something outside this scope, redirect politely and suggest the contact form.
  `;

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const uid = idCounter;
    setMessages((m) => [...m, { id: uid, role: "user", text: trimmed }]);
    setIdCounter((n) => n + 2);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              (import.meta as any).env.VITE_GROQ_API_KEY
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: trimmed },
            ],
            max_tokens: 400,
            temperature: 0.4,
          }),
        }
      );

      const data = await response.json();
      const raw = data.choices[0].message.content as string;

      const hasContactAction = raw.includes("[ACTION:contact]");
      const cleanText = raw.replace("[ACTION:contact]", "").trim();

      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: uid + 1,
          role: "assistant",
          text: cleanText,
          action: hasContactAction ? "contact" : undefined,
        },
      ]);
    } catch {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: uid + 1,
          role: "assistant",
          text: "Something went wrong. Please try again or reach Pearl directly at pearlodi7@gmail.com.",
        },
      ]);
    }
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
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.45,
                }}
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
              boxShadow: open
                ? "none"
                : "0 8px 30px rgba(0,245,212,0.35),0 4px 16px rgba(139,92,246,0.25)",
            }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -80, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 80, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={20} style={{ color: "#94a3b8" }} />
                </motion.div>
              ) : (
                <motion.div
                  key="spark"
                  initial={{ rotate: 80, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -80, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
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
              <div
                className="relative rounded-2xl glow-border-active h-full"
                style={{
                  boxShadow:
                    "0 32px 100px rgba(0,0,0,0.7), 0 0 60px rgba(0,245,212,0.08)",
                }}
              >
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
                        style={{
                          background: "linear-gradient(135deg,#00f5d4,#8b5cf6)",
                        }}
                      >
                        <Sparkles size={17} style={{ color: "#05050f" }} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "#f1f5f9",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          Pearl AI Assistant
                        </div>
                        <div className="flex items-center gap-1.5">
                          <motion.div
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              background: "#00f5d4",
                            }}
                            animate={{ opacity: [1, 0.35, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span
                            style={{
                              fontSize: "0.63rem",
                              color: "#64748b",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            AI Portfolio Assistant · Always online
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-xl transition-colors"
                      style={{
                        color: "#64748b",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.08)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.04)")
                      }
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
                        style={{
                          background: "linear-gradient(135deg,#00f5d4,#8b5cf6)",
                          fontSize: "0.62rem",
                          fontWeight: 800,
                          color: "#05050f",
                        }}
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
                        Hi! I'm Pearl's AI portfolio assistant. Ask me about her
                        projects, skills, experience, or availability.
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
                          className={`flex items-end gap-2 ${
                            isUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          {!isUser && (
                            <div
                              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                              style={{
                                background:
                                  "linear-gradient(135deg,#00f5d4,#8b5cf6)",
                                fontSize: "0.62rem",
                                fontWeight: 800,
                                color: "#05050f",
                              }}
                            >
                              OP
                            </div>
                          )}
                          <div
                            style={{
                              maxWidth: "80%",
                              padding: "10px 15px",
                              borderRadius: isUser
                                ? "18px 18px 4px 18px"
                                : "18px 18px 18px 4px",
                              background: isUser
                                ? "linear-gradient(135deg,#00f5d4,#8b5cf6)"
                                : "rgba(255,255,255,0.07)",
                              border: isUser
                                ? "none"
                                : "1px solid rgba(255,255,255,0.09)",
                              fontSize: "0.84rem",
                              lineHeight: 1.7,
                              color: isUser ? "#05050f" : "#cbd5e1",
                              fontWeight: isUser ? 600 : 400,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {renderText(msg.text, isUser)}
                            {!isUser && msg.action === "contact" && (
                              <button
                                type="button"
                                onClick={scrollToContact}
                                className="mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                  background:
                                    "linear-gradient(135deg,#00f5d4,#8b5cf6)",
                                  color: "#05050f",
                                  fontSize: "0.74rem",
                                  fontWeight: 800,
                                  fontFamily: "'Outfit', sans-serif",
                                }}
                              >
                                <ArrowDown size={13} />
                                Go to contact form
                              </button>
                            )}
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
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }}
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask something about Odi…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            send(input);
                          }
                        }}
                        className="flex-1 bg-transparent outline-none"
                        style={{
                          fontSize: "0.85rem",
                          color: "#e2e8f0",
                          fontFamily: "'Outfit', sans-serif",
                        }}
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
                          background:
                            input.trim() && !typing
                              ? "linear-gradient(135deg,#00f5d4,#8b5cf6)"
                              : "rgba(255,255,255,0.06)",
                          color:
                            input.trim() && !typing ? "#05050f" : "#475569",
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                        <Send size={14} />
                      </motion.button>
                    </div>
                    <p
                      style={{
                        fontSize: "0.58rem",
                        color: "#1e293b",
                        textAlign: "center",
                        marginTop: 8,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      Odi Portfolio Assistant
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

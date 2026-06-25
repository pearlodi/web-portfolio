import { useState } from "react";
import { motion } from "motion/react";
import { GlowBorderCard } from "./GlowBorderCard";
import { Send, Github, Linkedin, Mail, MessageCircle, Loader2 } from "lucide-react";
import React from "react";

const SOCIALS = [
  { icon: Github, label: "GitHub", handle: "github.com/pearlodi", color: "#e2e8f0", href: "https://github.com/pearlodi" },
  { icon: Linkedin, label: "LinkedIn", handle: "linkedin.com/in/odipearl", color: "#0a66c2", href: "https://linkedin.com/in/odipearl" },
  { icon: MessageCircle, label: "WhatsApp", handle: "+234 704 124 0169", color: "#25d366", href: "https://wa.me/2347041240169" },
  { icon: Mail, label: "Email", handle: "pearlodi7@gmail.com", color: "#00f5d4", href: "mailto:pearlodi7@gmail.com" },
];

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSent(true);
  //   setTimeout(() => setSent(false), 4000);
  //   setForm({ name: "", email: "", message: "" });
  // };
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formEndpoint = "https://formspree.io/f/movajqpq";

    try {
      setLoading(true);
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", number: "", email: "", message: "" });
        setLoading(false)
        setSent(true)
      } else {
        console.error("Form submission error:", response.statusText);
        setLoading(false)
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  if(sent) setTimeout(() => setSent(false), 4000)


  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "12px 16px",
    color: "#e2e8f0",
    outline: "none",
    width: "100%",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    transition: "border-color 0.2s",
  };

  return (
    <section className="relative py-32 px-6 pb-48" id="signal">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#00f5d4", fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
            06 / Contact
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
            Let's build
            <br />something real
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlowBorderCard variant="violet" rounded="rounded-2xl">
              <div className="p-6">
                <p style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
                  I'm open to frontend and mobile roles, contract engagements, and collaborations. Whether it's a product idea or a team needing a reliable developer let's talk.
                </p>
                <div className="space-y-2.5">
                  {SOCIALS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          textDecoration: "none",
                          display: "flex",
                        }}
                      >
                        <div className="p-2 rounded-lg" style={{ background: `${social.color}18` }}>
                          <Icon size={13} style={{ color: social.color }} />
                        </div>
                        <div>
                          <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{social.label}</div>
                          <div style={{ fontSize: "0.8rem", color: "#e2e8f0", fontFamily: "'JetBrains Mono', monospace" }}>
                            {social.handle}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </GlowBorderCard>

            {/* Availability badge */}
            <GlowBorderCard variant="cyan" rounded="rounded-2xl" always>
              <div className="p-5 flex items-center gap-4">
                <motion.div
                  style={{ width: 10, height: 10, borderRadius: "50%", background: "#00f5d4", flexShrink: 0 }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#00f5d4" }}>Open to work · Now</div>
                  <div style={{ fontSize: "0.65rem", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>
                    Lagos, NG · UTC+1 · Remote / Hybrid
                  </div>
                </div>
              </div>
            </GlowBorderCard>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <GlowBorderCard variant="cyan" rounded="rounded-2xl">
              <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace" }}>NAME</label>
                    <input
                      type="text" required placeholder="Your name"
                      value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,245,212,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace" }}>EMAIL</label>
                    <input
                     id="email"
                     name="email"
                     type="email"
                     required
                     value={formData.email}
                     className="rounded-full bg-[#ffffff14]  border-white border"
                     onChange={handleChange}
                     placeholder="Email"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,245,212,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace" }}>MESSAGE</label>
                  <textarea
                    required 
                    rows={6}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,245,212,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: sent ? "rgba(0,245,212,0.12)" : "linear-gradient(135deg, #00f5d4, #8b5cf6)",
                    color: sent ? "#00f5d4" : "#05050f",
                    fontWeight: 700,
                    border: sent ? "1px solid rgba(0,245,212,0.3)" : "none",
                    boxShadow: sent ? "none" : "0 0 40px rgba(0,245,212,0.15)",
                  }}
                >
                  {sent ? <>✓ Message sent — I'll reply within 24h</> : <>{loading ? <Loader2 className="animate-spin text-white"/>: <><Send size={15} /><p>Send Message</p></>}</>}
                </button>
              </form>
            </GlowBorderCard>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 py-8 px-6 flex items-center justify-between flex-wrap gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span style={{ fontSize: "0.65rem", color: "rgba(100,116,139,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
          © {new Date().getFullYear()} Odi Pearl
        </span>
     
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Nav = ({ active }) => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-xl text-[#e2e8f0] tracking-tight">
            aly<span className="text-[#06b6d4]">.</span>sibak
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className={`nav-link ${active === l.label ? 'nav-link-active' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>
          <button onClick={() => setOpen(p => !p)} className="md:hidden p-2 text-[#64748b] hover:text-[#e2e8f0] transition-colors">
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`h-px bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2.5 w-5' : 'w-5'}`} />
              <span className={`h-px bg-current transition-all duration-300 ${open ? 'opacity-0 w-5' : 'w-3.5'}`} />
              <span className={`h-px bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2.5 w-5' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-40 bg-[#080c14]/95 backdrop-blur-xl pt-20 md:hidden">
          <div className="px-6 flex flex-col gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-3.5 px-4 rounded-lg text-[#94a3b8] hover:text-[#e2e8f0] transition-all text-lg font-medium">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const Footer = () => (
  <footer className="border-t border-[#1a2540] py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="font-display font-bold text-lg text-[#e2e8f0]">aly<span className="text-[#06b6d4]">.</span>sibak</p>
      <p className="text-[#334155] text-xs font-mono-label">Built with Next.js &amp; Tailwind</p>
    </div>
  </footer>
);

const contactLinks = [
  {
    label: "Email",
    value: "asibak@uoguelph.ca",
    href: "mailto:asibak@uoguelph.ca",
    icon: <FaEnvelope />,
    color: "#06b6d4",
    desc: "Best way to reach me",
  },
  {
    label: "LinkedIn",
    value: "aly-sibak-721b85252",
    href: "https://linkedin.com/in/aly-sibak-721b85252",
    icon: <FaLinkedin />,
    color: "#38bdf8",
    desc: "Connect professionally",
  },
  {
    label: "GitHub",
    value: "alysibak",
    href: "https://github.com/alysibak",
    icon: <FaGithub />,
    color: "#a78bfa",
    desc: "See my code",
  },
];

const details = [
  { icon: <FaMapMarkerAlt />, label: "Location", value: "Guelph / Waterloo, ON" },
  { icon: <FaUniversity />, label: "School", value: "University of Guelph" },
  { icon: <FaEnvelope />, label: "Status", value: "Seeking Summer 2026 Co-op" },
];

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#080c14]" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send - replace with your actual form handler (Formspree, EmailJS, etc.)
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e2e8f0]">
      <div className="fixed inset-0 bg-dot-grid pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-top pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-bottom pointer-events-none z-0" />

      <Nav active="Contact" />

      <main className="relative z-10 pt-32 pb-20 px-5">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono-label text-[#06b6d4] mb-3">Say hello</p>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[#e2e8f0] mb-4">
              Get in Touch
            </h1>
            <div className="section-divider" />
            <p className="text-[#64748b] text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
              I&apos;m always open to new opportunities, collaborations, or just a good conversation about tech.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Left — contact info */}
            <motion.div className="lg:col-span-2 flex flex-col gap-4"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>

              {/* Status badge */}
              <div className="glass rounded-2xl p-6">
                <div className="h-px w-full mb-5 rounded-full opacity-30"
                  style={{ background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />
                <p className="font-mono-label text-[#06b6d4] mb-4">Current Status</p>
                <div className="flex items-center gap-3">
                  <span className="badge-available">
                    <span className="badge-dot" />
                    Available Summer 2026
                  </span>
                </div>
                <p className="text-[#64748b] text-sm mt-3 leading-relaxed">
                  Actively seeking Co-op positions in software development, AI/ML engineering, or full-stack roles.
                </p>
              </div>

              {/* Details */}
              <div className="glass rounded-2xl p-6">
                <p className="font-mono-label text-[#475569] mb-4">About Me</p>
                <div className="space-y-4">
                  {details.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                        style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4' }}>
                        {d.icon}
                      </div>
                      <div>
                        <p className="font-mono-label text-[#334155] text-[10px]">{d.label}</p>
                        <p className="text-[#94a3b8] text-sm">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3">
                {contactLinks.map((c, i) => (
                  <motion.a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="glass rounded-xl px-5 py-4 flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{ background: `${c.color}18`, color: c.color }}>
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono-label text-[10px] text-[#475569]">{c.label}</p>
                      <p className="text-[#94a3b8] text-sm truncate group-hover:text-[#e2e8f0] transition-colors">{c.value}</p>
                    </div>
                    <FaArrowRight size={11} className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: c.color }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <div className="glass rounded-2xl p-7 h-full">
                <div className="h-px w-full mb-6 rounded-full opacity-30"
                  style={{ background: 'linear-gradient(90deg, #a78bfa, #06b6d4, transparent)' }} />
                <p className="font-mono-label text-[#475569] mb-6">Send a Message</p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                      style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)' }}>
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#e2e8f0] mb-2">Message Sent!</h3>
                    <p className="text-[#64748b] text-sm">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                    <button onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-6 btn-outline text-sm py-2 px-5">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "name", label: "Name", placeholder: "Your name", type: "text" },
                        { id: "email", label: "Email", placeholder: "your@email.com", type: "email" },
                      ].map(f => (
                        <div key={f.id}>
                          <label className="font-mono-label text-[#475569] text-[10px] block mb-2">{f.label}</label>
                          <input
                            type={f.type}
                            required
                            placeholder={f.placeholder}
                            value={formState[f.id]}
                            onChange={e => setFormState(p => ({ ...p, [f.id]: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl text-sm text-[#e2e8f0] placeholder-[#334155] outline-none transition-all duration-200"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid #1a2540',
                            }}
                            onFocus={e => e.target.style.borderColor = 'rgba(6,182,212,0.4)'}
                            onBlur={e => e.target.style.borderColor = '#1a2540'}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="font-mono-label text-[#475569] text-[10px] block mb-2">Subject</label>
                      <input
                        type="text"
                        required
                        placeholder="What's this about?"
                        value={formState.subject}
                        onChange={e => setFormState(p => ({ ...p, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm text-[#e2e8f0] placeholder-[#334155] outline-none transition-all duration-200"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2540' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(6,182,212,0.4)'}
                        onBlur={e => e.target.style.borderColor = '#1a2540'}
                      />
                    </div>

                    <div>
                      <label className="font-mono-label text-[#475569] text-[10px] block mb-2">Message</label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Tell me what's on your mind..."
                        value={formState.message}
                        onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm text-[#e2e8f0] placeholder-[#334155] outline-none transition-all duration-200 resize-none"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2540' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(6,182,212,0.4)'}
                        onBlur={e => e.target.style.borderColor = '#1a2540'}
                      />
                    </div>

                    <button type="submit" disabled={sending}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                      {sending ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Message <FaArrowRight size={12} /></>
                      )}
                    </button>

                    <p className="text-[#334155] text-xs text-center font-mono-label">
                      Or email directly: asibak@uoguelph.ca
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
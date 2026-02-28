"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaCode, FaBriefcase, FaRocket, FaComments, FaArrowRight, FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const THEME_KEY = 'aly-sibak-theme';

/* ─── Typewriter ─────────────────────────────── */
const TypewriterText = ({ texts }) => {
  const [current, setCurrent] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = texts[idx];
    const timeout = setTimeout(() => {
      if (deleting) {
        setCurrent(prev => prev.slice(0, -1));
        if (current === '') { setDeleting(false); setIdx(p => (p + 1) % texts.length); }
      } else {
        setCurrent(word.slice(0, current.length + 1));
        if (current === word) setTimeout(() => setDeleting(true), 2200);
      }
    }, deleting ? 45 : 95);
    return () => clearTimeout(timeout);
  }, [current, idx, deleting, texts]);

  return (
    <span className="font-display text-gradient-cyan">
      {current}
      <span className="inline-block w-0.5 h-8 md:h-10 bg-[#06b6d4] ml-1 animate-pulse align-middle" />
    </span>
  );
};

/* ─── Count Up ───────────────────────────────── */
const CountUp = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Nav ────────────────────────────────────── */
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
          <a href="/" className="font-display font-bold text-xl text-[#e2e8f0] tracking-tight">
            aly<span className="text-[#06b6d4]">.</span>sibak
          </a>
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
                className="py-3.5 px-4 rounded-lg text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-white/4 transition-all text-lg font-medium">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

/* ─── Footer ─────────────────────────────────── */
const Footer = () => (
  <footer className="border-t border-[#1a2540] py-12 px-6 mt-0">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <p className="font-display font-bold text-lg text-[#e2e8f0]">aly<span className="text-[#06b6d4]">.</span>sibak</p>
        <p className="text-[#64748b] text-sm mt-1">Building software that matters.</p>
      </div>
      <div className="flex items-center gap-5">
        <a href="https://github.com/alysibak" target="_blank" rel="noopener noreferrer"
          className="text-[#475569] hover:text-[#06b6d4] transition-colors"><FaGithub size={18} /></a>
        <a href="https://linkedin.com/in/aly-sibak-721b85252" target="_blank" rel="noopener noreferrer"
          className="text-[#475569] hover:text-[#06b6d4] transition-colors"><FaLinkedin size={18} /></a>
        <a href="mailto:asibak@uoguelph.ca"
          className="text-[#475569] hover:text-[#06b6d4] transition-colors"><FaEnvelope size={18} /></a>
      </div>
      <p className="text-[#334155] text-xs font-mono-label">Built with Next.js &amp; Tailwind</p>
    </div>
  </footer>
);

/* ─── Home Page ──────────────────────────────── */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#080c14]" />;

  const metrics = [
    { value: 20, suffix: "+", label: "Global Facilities" },
    { value: 330, suffix: "+", label: "Students Supported" },
    { value: 83, suffix: "%", label: "Current GPA" },
    { value: 1, suffix: "", label: "Co-op Completed" },
  ];

  const heroTexts = ["Full-Stack Developer", "AI Systems Builder", "Problem Solver", "Tech Innovator"];

  const highlights = [
    {
      accent: "cyan",
      icon: <FaBriefcase />,
      company: "P&P Optica",
      role: "Software Developer Co-op",
      points: [
        "Integrated Google Gemini API across a system tracking 1,000+ daily incidents at 20+ global facilities",
        "Built full-stack features with React, TypeScript, Node.js for AI-powered food safety systems",
        "Optimized PostgreSQL and managed AWS (S3, RDS, EC2, IAM) in production",
      ],
    },
    {
      accent: "amber",
      icon: <FaCode />,
      company: "University of Guelph",
      role: "Academic Excellence",
      points: [
        "Maintaining 83% GPA in CS (Co-op) with a Project Management area of application",
        "TA for Web Design (80+ students) and Discrete Structures (250+ students)",
        "Built CarInfo and PocketChange — production full-stack apps with live API integrations",
      ],
    },
  ];

  const cards = [
    { href: "/skills", label: "Skills", desc: "React · TypeScript · Python · AWS", icon: <FaCode />, color: "#06b6d4" },
    { href: "/experience", label: "Experience", desc: "P&P Optica · Teaching Assistant", icon: <FaBriefcase />, color: "#38bdf8" },
    { href: "/projects", label: "Projects", desc: "CarInfo · PocketChange · More", icon: <FaRocket />, color: "#a78bfa" },
    { href: "/contact", label: "Contact", desc: "Available Summer 2026", icon: <FaComments />, color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e2e8f0] overflow-x-hidden">
      {/* Fixed bg layers */}
      <div className="fixed inset-0 bg-dot-grid pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-top pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-bottom pointer-events-none z-0" />

      <Nav active="Home" />

      {/* ── Hero ── */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 pt-20 pb-12">
        <motion.div
          className="text-center w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Available badge */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="badge-available">
              <span className="badge-dot" />
              Available for Summer 2026 Co-op
            </span>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="profile-ring w-28 h-28 md:w-36 md:h-36">
              <Image src="/profile.jpeg" alt="Aly Sibak" width={144} height={144}
                className="w-full h-full rounded-full object-cover" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#e2e8f0] tracking-tight mb-4 leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Aly Sibak
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10 md:h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <TypewriterText texts={heroTexts} />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-[#64748b] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            3rd-year CS Co-op student at the University of Guelph with production experience building
            AI-powered systems at P&P Optica. Passionate about scalable software and real-world impact.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <a href="/AlySibakResume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FaDownload size={14} />
              Download Resume
            </a>
            <a href="/projects" className="btn-outline">
              View My Work
              <FaArrowRight size={13} />
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            {metrics.map((m, i) => (
              <div key={i} className="metric-card">
                <div className="font-display font-extrabold text-3xl text-gradient-cyan">
                  <CountUp target={m.value} suffix={m.suffix} />
                </div>
                <div className="text-[#64748b] text-xs mt-1.5 font-mono-label">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll arrow */}
        <motion.a
          href="#highlights"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#334155] hover:text-[#06b6d4] transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <FaChevronDown size={16} />
        </motion.a>
      </section>

      {/* ── Highlights ── */}
      <section id="highlights" className="relative z-10 py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono-label text-[#06b6d4] mb-3">Experience</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[#e2e8f0]">Highlights</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                className={`rounded-2xl p-7 ${h.accent === 'cyan' ? 'glass-cyan' : 'glass-amber'}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-lg text-sm ${h.accent === 'cyan' ? 'bg-[#06b6d4]/15 text-[#06b6d4]' : 'bg-[#f59e0b]/15 text-[#f59e0b]'}`}>
                    {h.icon}
                  </div>
                  <div>
                    <h3 className={`font-display font-bold text-lg ${h.accent === 'cyan' ? 'text-gradient-cyan' : 'text-gradient-amber'}`}>{h.company}</h3>
                    <p className="text-[#64748b] text-xs font-mono-label">{h.role}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {h.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${h.accent === 'cyan' ? 'bg-[#06b6d4]' : 'bg-[#f59e0b]'}`} />
                      <p className="text-[#94a3b8] text-sm leading-relaxed">{pt}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a href="/experience" className="btn-outline inline-flex">
              View Full Experience <FaArrowRight size={12} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Access ── */}
      <section className="relative z-10 py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono-label text-[#06b6d4] mb-3">Navigate</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[#e2e8f0]">Explore</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c, i) => (
              <motion.a
                key={c.href}
                href={c.href}
                className="glass rounded-2xl p-6 flex flex-col gap-4 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all duration-300"
                  style={{ background: `${c.color}18`, color: c.color }}>
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[#e2e8f0] text-base mb-1 group-hover:text-[#06b6d4] transition-colors">
                    {c.label}
                  </h3>
                  <p className="text-[#64748b] text-xs leading-relaxed">{c.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs mt-auto" style={{ color: c.color, opacity: 0.7 }}>
                  <span>Explore</span>
                  <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
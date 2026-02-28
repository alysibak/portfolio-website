"use client";

import React, { useState, useEffect } from "react";
import { FaCode, FaServer, FaCloud, FaBrain, FaArrowRight } from "react-icons/fa";
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

const Footer = () => (
  <footer className="border-t border-[#1a2540] py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="font-display font-bold text-lg text-[#e2e8f0]">aly<span className="text-[#06b6d4]">.</span>sibak</p>
      <p className="text-[#334155] text-xs font-mono-label">Built with Next.js &amp; Tailwind</p>
    </div>
  </footer>
);

const categories = [
  {
    label: "Frontend",
    icon: <FaCode />,
    color: "#06b6d4",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "TSX", "HTML/CSS", "Tailwind CSS", "Responsive Design"],
  },
  {
    label: "Backend & Languages",
    icon: <FaServer />,
    color: "#38bdf8",
    skills: ["Node.js", "NestJS", "Python", "Java", "C", "PostgreSQL", "SQL", "RESTful APIs", "Database Design", "Data Processing"],
  },
  {
    label: "Cloud & DevOps",
    icon: <FaCloud />,
    color: "#a78bfa",
    skills: ["AWS S3", "AWS RDS", "AWS EC2", "AWS IAM", "CloudWatch", "Git", "CI/CD", "Docker", "Linux", "Agile / Scrum"],
  },
  {
    label: "AI & Data",
    icon: <FaBrain />,
    color: "#f59e0b",
    skills: ["Google Gemini API", "Prompt Engineering", "LLM Integration", "Anomaly Detection", "Pandas", "NumPy", "Data Pipelines"],
  },
];

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#080c14]" />;

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e2e8f0]">
      <div className="fixed inset-0 bg-dot-grid pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-top pointer-events-none z-0" />

      <Nav active="Skills" />

      <main className="relative z-10 pt-32 pb-20 px-5">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-mono-label text-[#06b6d4] mb-3">What I work with</p>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[#e2e8f0] mb-4">
              Technical Skills
            </h1>
            <div className="section-divider" />
            <p className="text-[#64748b] text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
              Built through production co-op work and personal projects — not just tutorials.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                className="glass rounded-2xl p-7"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: `${cat.color}18`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-[#e2e8f0] text-base">{cat.label}</h2>
                    <p className="font-mono-label text-xs mt-0.5" style={{ color: cat.color }}>
                      {cat.skills.length} technologies
                    </p>
                  </div>
                </div>

                {/* Top border accent */}
                <div className="h-px w-full mb-5 opacity-30 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, j) => (
                    <motion.span
                      key={j}
                      className="skill-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + j * 0.03 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-14 glass rounded-2xl p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-display font-bold text-3xl text-[#e2e8f0] mb-3">Want to see these in action?</h3>
            <p className="text-[#64748b] mb-8 max-w-md mx-auto">Check out my projects to see these technologies working together in real applications.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/projects" className="btn-primary justify-center">
                View Projects <FaArrowRight size={12} />
              </a>
              <a href="/contact" className="btn-outline justify-center">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
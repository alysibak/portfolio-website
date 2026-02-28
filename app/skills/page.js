"use client";

import React, { useState, useEffect } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiNestjs, SiPython, SiPostgresql,
  SiGit, SiDocker, SiLinux,
  SiPandas, SiNumpy, SiJira, SiVercel, SiGithub,
  SiStripe
} from "react-icons/si";
import { FaJava, FaCode, FaBrain, FaCloud, FaServer, FaArrowRight, FaDatabase, FaAws } from "react-icons/fa";
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

/* ── Skill data with brand colors ─────────────────────────────────── */
const categories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <FaCode />,
    accent: "#06b6d4",
    description: "Building fast, accessible, and beautiful user interfaces",
    skills: [
      { name: "React", icon: <SiReact />, color: "#61dafb", level: 90 },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff", level: 85 },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178c6", level: 85 },
      { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e", level: 90 },
      { name: "HTML5", icon: <SiHtml5 />, color: "#e34f26", level: 95 },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572b6", level: 90 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06b6d4", level: 85 },
    ],
  },
  {
    id: "backend",
    label: "Backend & Languages",
    icon: <FaServer />,
    accent: "#38bdf8",
    description: "Server-side logic, APIs, databases, and data processing",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933", level: 85 },
      { name: "NestJS", icon: <SiNestjs />, color: "#e0234e", level: 75 },
      { name: "Python", icon: <SiPython />, color: "#3776ab", level: 80 },
      { name: "Java", icon: <FaJava />, color: "#f89820", level: 75 },
      { name: "C", icon: <FaCode />, color: "#a8b9cc", level: 70 },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791", level: 80 },
      { name: "SQL", icon: <FaDatabase />, color: "#00758f", level: 85 },
      { name: "RESTful APIs", icon: <FaCode />, color: "#94a3b8", level: 90 },
      { name: "Stripe API", icon: <SiStripe />, color: "#635bff", level: 75 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: <FaCloud />,
    accent: "#a78bfa",
    description: "Cloud infrastructure, deployment pipelines, and tooling",
    skills: [
      { name: "AWS S3", icon: <FaAws />, color: "#ff9900", level: 80 },
      { name: "AWS RDS", icon: <FaAws />, color: "#ff9900", level: 75 },
      { name: "AWS EC2", icon: <FaAws />, color: "#ff9900", level: 75 },
      { name: "AWS IAM", icon: <FaCloud />, color: "#ff9900", level: 80 },
      { name: "Git", icon: <SiGit />, color: "#f05032", level: 90 },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff", level: 90 },
      { name: "Docker", icon: <SiDocker />, color: "#2496ed", level: 70 },
      { name: "Linux", icon: <SiLinux />, color: "#fcc624", level: 75 },
      { name: "Vercel", icon: <SiVercel />, color: "#ffffff", level: 85 },
      { name: "CI/CD", icon: <FaCode />, color: "#94a3b8", level: 75 },
      { name: "Agile / Scrum", icon: <SiJira />, color: "#0052cc", level: 85 },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    icon: <FaBrain />,
    accent: "#f59e0b",
    description: "AI integrations, data pipelines, and machine learning tools",
    skills: [
      { name: "Gemini API", icon: <FaBrain />, color: "#4285f4", level: 80 },
      { name: "Prompt Engineering", icon: <FaBrain />, color: "#f59e0b", level: 85 },
      { name: "LLM Integration", icon: <FaBrain />, color: "#a78bfa", level: 80 },
      { name: "Pandas", icon: <SiPandas />, color: "#150458", level: 75 },
      { name: "NumPy", icon: <SiNumpy />, color: "#013243", level: 75 },
      { name: "Anomaly Detection", icon: <FaBrain />, color: "#f59e0b", level: 70 },
      { name: "Data Pipelines", icon: <FaDatabase />, color: "#94a3b8", level: 75 },
    ],
  },
];

/* ── Skill Card ───────────────────────────────────────────────────── */
const SkillCard = ({ skill, index, accent }) => (
  <motion.div
    className="group relative flex flex-col items-center gap-2.5 p-4 rounded-xl cursor-default"
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid #1a2540',
      transition: 'all 0.2s ease',
    }}
    initial={{ opacity: 0, scale: 0.88 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.04 }}
    whileHover={{ y: -3, borderColor: `${skill.color}44` }}
  >
    {/* Glow on hover */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: `radial-gradient(circle at 50% 30%, ${skill.color}10, transparent 70%)` }} />

    {/* Icon */}
    <div className="text-2xl transition-all duration-200 group-hover:scale-110 relative z-10"
      style={{ color: skill.color }}>
      {skill.icon}
    </div>

    {/* Name */}
    <p className="font-mono-label text-[#64748b] group-hover:text-[#94a3b8] transition-colors text-center relative z-10 leading-tight">
      {skill.name}
    </p>

    {/* Proficiency bar */}
    <div className="w-full h-px rounded-full relative z-10 overflow-hidden"
      style={{ background: '#1a2540' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
        initial={{ width: 0 }}
        animate={{ width: `${skill.level}%` }}
        transition={{ delay: index * 0.04 + 0.3, duration: 0.7, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

/* ── Category Section ─────────────────────────────────────────────── */
const CategorySection = ({ cat, index }) => (
  <motion.div
    className="glass rounded-2xl overflow-hidden"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Top accent bar */}
    <div className="h-0.5 w-full"
      style={{ background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}00)` }} />

    <div className="p-7">
      {/* Category header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base"
            style={{ background: `${cat.accent}15`, color: cat.accent }}>
            {cat.icon}
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-[#e2e8f0]">{cat.label}</h2>
            <p className="text-[#475569] text-xs leading-tight mt-0.5">{cat.description}</p>
          </div>
        </div>
        <span className="font-mono-label text-[10px] px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ color: cat.accent, background: `${cat.accent}12`, border: `1px solid ${cat.accent}25` }}>
          {cat.skills.length} skills
        </span>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2.5">
        {cat.skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} accent={cat.accent} />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ── Summary bar ──────────────────────────────────────────────────── */
const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#080c14]" />;

  const filtered = activeFilter === "all" ? categories : categories.filter(c => c.id === activeFilter);

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e2e8f0]">
      <div className="fixed inset-0 bg-dot-grid pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-top pointer-events-none z-0" />

      <Nav active="Skills" />

      <main className="relative z-10 pt-32 pb-20 px-5">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono-label text-[#06b6d4] mb-3">What I work with</p>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[#e2e8f0] mb-4">
              Technical Skills
            </h1>
            <div className="section-divider" />
            <p className="text-[#64748b] text-base md:text-lg max-w-xl mx-auto mt-5">
              {totalSkills} technologies across {categories.length} domains — built through production work, not just tutorials.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {[{ id: "all", label: "All" }, ...categories.map(c => ({ id: c.id, label: c.label, accent: c.accent }))].map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                className="font-mono-label px-4 py-2 rounded-full text-xs transition-all duration-200"
                style={activeFilter === f.id ? {
                  background: f.accent ? `${f.accent}20` : 'rgba(6,182,212,0.2)',
                  border: `1px solid ${f.accent || '#06b6d4'}50`,
                  color: f.accent || '#06b6d4',
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #1a2540',
                  color: '#475569',
                }}>
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Categories */}
          <div className="space-y-5">
            {filtered.map((cat, i) => (
              <CategorySection key={cat.id} cat={cat} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 glass rounded-2xl p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-display font-bold text-3xl text-[#e2e8f0] mb-3">Want to see these in action?</h3>
            <p className="text-[#64748b] mb-8 max-w-md mx-auto">
              Check out my projects to see these technologies working together in real, deployed applications.
            </p>
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
"use client";

import React, { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
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

const projects = [
  {
    title: "CarInfo",
    tagline: "Compare Every Car Ever Made",
    description: "Full-stack vehicle research platform covering 15,470 vehicles with advanced multi-criteria filtering, sorting algorithms, and detailed spec comparisons. Features real-time search and data visualization.",
    tech: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/alysibak",
    live: "https://carinfo-client.vercel.app",
    status: "Live",
    statusColor: "#06b6d4",
    accentGradient: "from-[#06b6d4] to-[#38bdf8]",
  },
  {
    title: "PocketChange",
    tagline: "Donate Your Spare Change",
    description: "Fintech app with live bank connectivity via Plaid API and Stripe payment processing for donations across 40+ charities. Includes JWT auth, role-based access control, rate limiting, and anomaly detection.",
    tech: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Plaid API", "Stripe"],
    github: "https://github.com/alysibak",
    live: "https://pocket-change-75dq.vercel.app/login",
    status: "Live",
    statusColor: "#06b6d4",
    accentGradient: "from-[#a78bfa] to-[#06b6d4]",
  },
  {
    title: "3D Interactive Fitness App",
    tagline: "Train Smarter, See More",
    description: "Web application that visually connects muscle groups to exercises with interactive 3D elements and a responsive design for optimal UX across all devices.",
    tech: ["React", "Next.js", "TypeScript", "CSS"],
    github: null,
    live: null,
    status: "In Development",
    statusColor: "#f59e0b",
    accentGradient: "from-[#f59e0b] to-[#fb923c]",
  },
  {
    title: "Business Website Portfolio",
    tagline: "Clean, Responsive, Fast",
    description: "Multiple responsive websites built for local businesses, featuring clean design principles, optimized performance, and strong user experience across all screen sizes.",
    tech: ["React", "Next.js", "JavaScript", "HTML", "CSS"],
    github: null,
    live: null,
    status: "Completed",
    statusColor: "#22c55e",
    accentGradient: "from-[#22c55e] to-[#06b6d4]",
  },
  {
    title: "Investment Portfolio Manager",
    tagline: "Track Every Trade",
    description: "Java console application for managing stock and mutual fund investments with automated transaction processing and real-time portfolio evaluation and reporting.",
    tech: ["Java", "OOP"],
    github: null,
    live: null,
    status: "Completed",
    statusColor: "#22c55e",
    accentGradient: "from-[#38bdf8] to-[#a78bfa]",
  },
];

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="project-card flex flex-col h-full"
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
  >
    {/* Top gradient line */}
    <div className={`project-card-top-line bg-gradient-to-r ${project.accentGradient}`} />

    <div className="p-7 flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="font-display font-bold text-xl text-[#e2e8f0]">{project.title}</h3>
        <span className="font-mono-label flex-shrink-0 px-2.5 py-1 rounded-full text-[10px]"
          style={{ color: project.statusColor, background: `${project.statusColor}14`, border: `1px solid ${project.statusColor}28` }}>
          {project.status}
        </span>
      </div>

      {/* Tagline */}
      <p className={`font-mono-label text-xs mb-4 bg-gradient-to-r ${project.accentGradient} bg-clip-text text-transparent`}
        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {project.tagline}
      </p>

      {/* Description */}
      <p className="text-[#64748b] text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tech.map((t, i) => (
          <span key={i} className="tech-tag">{t}</span>
        ))}
      </div>

      {/* Buttons — only shown if there's something to link */}
      {(project.github || project.live) && (
        <div className="flex gap-3 mt-auto">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-sm py-2.5 px-4 flex-1 justify-center">
              <FaGithub size={13} /> GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-4 flex-1 justify-center">
              <FaExternalLinkAlt size={11} /> Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  </motion.div>
);

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#080c14]" />;

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e2e8f0]">
      <div className="fixed inset-0 bg-dot-grid pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-top pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-bottom pointer-events-none z-0" />

      <Nav active="Projects" />

      <main className="relative z-10 pt-32 pb-20 px-5">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-mono-label text-[#06b6d4] mb-3">What I&apos;ve built</p>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[#e2e8f0] mb-4">
              Projects
            </h1>
            <div className="section-divider" />
            <p className="text-[#64748b] text-base md:text-lg max-w-xl mx-auto mt-6">
              From fintech to automotive data — applications built to solve real problems.
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-14 glass rounded-2xl p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-display font-bold text-3xl text-[#e2e8f0] mb-3">Have a project in mind?</h3>
            <p className="text-[#64748b] mb-8 max-w-md mx-auto">I&apos;m always open to new challenges and interesting problems to solve.</p>
            <a href="/contact" className="btn-primary inline-flex">
              Let&apos;s Collaborate <FaArrowRight size={12} />
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
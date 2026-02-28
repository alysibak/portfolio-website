"use client";

import React, { useState, useEffect } from "react";
import { FaBriefcase, FaGraduationCap, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
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

const experience = [
  {
    title: "Software Developer Co-op",
    company: "P&P Optica",
    period: "May 2025 – Present",
    location: "Waterloo, ON",
    accent: "#06b6d4",
    icon: <FaBriefcase />,
    bullets: [
      "Built full-stack applications for AI-powered Smart Imaging Systems — supporting food safety for Tyson, Costco, and Hormel",
      "Integrated Google Gemini API across a system tracking 1,000+ daily incidents at 20+ global facilities",
      "Optimized PostgreSQL databases with indexing strategies, significantly reducing query load times",
      "Managed AWS infrastructure (S3, RDS, EC2, IAM, CloudWatch) for monitoring and deployment automation",
      "Implemented role-based access controls, JWT authentication, and rate limiting for multi-tenant data security",
      "Delivered features in TypeScript, React, and Node.js in a fast-paced Agile environment",
    ],
  },
  {
    title: "Teaching Assistant – Web Design",
    company: "University of Guelph",
    period: "Jan – Apr 2025",
    location: "Guelph, ON",
    accent: "#38bdf8",
    icon: <FaBriefcase />,
    bullets: [
      "Supported 80+ students in a Web Design course covering HTML, CSS, JavaScript, and UX principles",
      "Provided detailed feedback on assignments and projects covering responsive, accessible web development",
      "Held office hours to assist with debugging, design critiques, and frontend concepts",
    ],
  },
  {
    title: "Teaching Assistant – Discrete Structures",
    company: "University of Guelph",
    period: "Sep – Dec 2024",
    location: "Guelph, ON",
    accent: "#a78bfa",
    icon: <FaBriefcase />,
    bullets: [
      "Evaluated 250+ student assignments in discrete mathematics with detailed feedback on logic and proof techniques",
      "Conducted weekly office hours, clarifying graph theory, combinatorics, and formal logic",
      "Maintained grading consistency across the teaching team",
    ],
  },
];

const education = {
  school: "University of Guelph",
  degree: "B.Comp (Hons), Computer Science (Co-op)",
  aoa: "Area of Application: Project Management",
  gpa: "83% GPA",
  grad: "Expected April 2028",
  period: "Sep 2023 – Present",
  courses: [
    "Data Structures & Algorithms",
    "Discrete Mathematics",
    "Object-Oriented Programming",
    "Software Systems Development",
    "User Interface Design",
    "Microcomputer Architecture",
  ],
};

export default function Experience() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#080c14]" />;

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e2e8f0]">
      <div className="fixed inset-0 bg-dot-grid pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-top pointer-events-none z-0" />

      <Nav active="Experience" />

      <main className="relative z-10 pt-32 pb-20 px-5">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-mono-label text-[#06b6d4] mb-3">Where I&apos;ve worked</p>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[#e2e8f0] mb-4">
              Experience
            </h1>
            <div className="section-divider" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-3 bottom-0 timeline-line hidden md:block" style={{ width: '1px' }} />

            <div className="space-y-6">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  className="relative md:pl-14"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-7 -translate-x-[5px] items-center justify-center">
                    <div className="timeline-dot" style={{ background: exp.accent, boxShadow: `0 0 14px ${exp.accent}55` }} />
                  </div>

                  <div className="glass rounded-2xl p-7">
                    {/* Top accent line */}
                    <div className="h-px w-full mb-6 rounded-full opacity-30"
                      style={{ background: `linear-gradient(90deg, ${exp.accent}, transparent)` }} />

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div>
                        <h2 className="font-display font-bold text-xl text-[#e2e8f0]">{exp.title}</h2>
                        <p className="font-semibold mt-0.5" style={{ color: exp.accent }}>{exp.company}</p>
                        <p className="text-[#475569] text-sm mt-0.5">{exp.location}</p>
                      </div>
                      <span className="font-mono-label px-3 py-1.5 rounded-full text-[10px] self-start flex-shrink-0"
                        style={{ color: exp.accent, background: `${exp.accent}12`, border: `1px solid ${exp.accent}25` }}>
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.accent }} />
                          <p className="text-[#94a3b8] text-sm leading-relaxed">{b}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#1a2540]" />
              <p className="font-mono-label text-[#06b6d4]">Education</p>
            </div>

            <div className="glass rounded-2xl p-7">
              <div className="h-px w-full mb-6 rounded-full opacity-30"
                style={{ background: 'linear-gradient(90deg, #f59e0b, transparent)' }} />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm mt-0.5 flex-shrink-0"
                    style={{ background: '#f59e0b18', color: '#f59e0b' }}>
                    <FaGraduationCap />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-[#e2e8f0]">{education.school}</h2>
                    <p className="text-[#94a3b8] text-sm mt-0.5">{education.degree}</p>
                    <p className="text-[#64748b] text-xs mt-0.5">{education.aoa}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-mono-label text-[10px] px-2.5 py-1 rounded-full"
                        style={{ color: '#f59e0b', background: '#f59e0b12', border: '1px solid #f59e0b28' }}>
                        {education.gpa}
                      </span>
                      <span className="text-[#475569] text-xs">{education.grad}</span>
                    </div>
                  </div>
                </div>
                <span className="font-mono-label px-3 py-1.5 rounded-full text-[10px] self-start flex-shrink-0"
                  style={{ color: '#f59e0b', background: '#f59e0b12', border: '1px solid #f59e0b28' }}>
                  {education.period}
                </span>
              </div>

              <div>
                <p className="font-mono-label text-[#475569] mb-3">Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {education.courses.map((c, i) => (
                    <span key={i} className="skill-pill text-xs">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-10 glass rounded-2xl p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <h3 className="font-display font-bold text-2xl text-[#e2e8f0] mb-2">Interested in working together?</h3>
            <p className="text-[#64748b] text-sm mb-6">I&apos;m seeking Summer 2026 Co-op opportunities in software development.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/projects" className="btn-outline justify-center">View Projects</a>
              <a href="/contact" className="btn-primary justify-center">
                Get in Touch <FaArrowRight size={12} />
              </a>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaSun, FaMoon, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const THEME_KEY = 'aly-sibak-theme';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, [darkMode]);

  return { darkMode, toggleTheme, isLoading };
};

const experience = [
  {
    title: "Software Developer Co-op",
    company: "P&P Optica",
    duration: "May 2025 – Present",
    location: "Waterloo, ON",
    description: [
      "Built full-stack applications for AI-powered Smart Imaging Systems, supporting real-time food contamination detection for clients including Tyson, Costco, and Hormel",
      "Integrated Google Gemini API across a system tracking 1,000+ daily incidents, building data pipelines and output validation logic for production use",
      "Optimized PostgreSQL databases with indexing strategies that significantly reduced query load times across 20+ global facilities",
      "Managed AWS infrastructure including S3, RDS, EC2, IAM, and CloudWatch for monitoring and deployment automation",
      "Implemented role-based access controls, JWT authentication, and rate limiting for secure multi-tenant data access",
      "Delivered scalable solutions using TypeScript, React, Node.js, and AWS in an Agile environment"
    ]
  },
  {
    title: "Teaching Assistant – Web Design",
    company: "University of Guelph",
    duration: "Jan – Apr 2025",
    location: "Guelph, ON",
    description: [
      "Supported 80+ students in a Web Design course covering HTML, CSS, JavaScript, and UX principles",
      "Provided feedback on assignments and projects, helping students build responsive and accessible web applications",
      "Held office hours to assist with debugging, design critiques, and technical concepts"
    ]
  },
  {
    title: "Teaching Assistant – Discrete Structures",
    company: "University of Guelph",
    duration: "Sep – Dec 2024",
    location: "Guelph, ON",
    description: [
      "Evaluated 250+ student assignments in discrete mathematics, providing detailed feedback on logic and proof techniques",
      "Conducted weekly office hours, clarifying complex topics including graph theory, combinatorics, and formal logic",
      "Maintained grading consistency across the teaching team while contributing to improved student learning outcomes"
    ]
  }
];

export default function Experience() {
  const { darkMode, toggleTheme, isLoading } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white" : "bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 text-gray-900"
    }`}>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-blue-200'} backdrop-blur-xl border-b`}>
        <div className="container mx-auto flex justify-between items-center px-4 py-3 max-w-6xl">
          <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Aly Sibak</Link>
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            <Link href="/" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Home</Link>
            <Link href="/skills" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Skills</Link>
            <Link href="/experience" className="relative font-semibold transition-colors duration-300 hover:text-blue-600 group text-sm lg:text-base">
              Experience
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
            </Link>
            <Link href="/projects" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Projects</Link>
            <Link href="/contact" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Contact</Link>
          </div>
          <button onClick={toggleTheme} className="p-2 md:p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:scale-105 transition-all duration-300" aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
            {darkMode ? <FaSun className="text-sm md:text-base" /> : <FaMoon className="text-sm md:text-base" />}
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 pt-24 md:pt-32 max-w-5xl">
        <motion.div className="text-center mb-12 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
            Professional Experience
          </h1>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real-world experience building production software and supporting student learning
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-10">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                darkMode ? 'bg-gray-800 bg-opacity-80 border-gray-600 hover:border-blue-500' : 'bg-white bg-opacity-90 border-blue-200 hover:border-blue-400'
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex-shrink-0">
                    <FaBriefcase className="text-lg md:text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{exp.title}</h2>
                    <p className={`text-lg md:text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{exp.company}</p>
                    <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.location}</p>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold shadow-md ${
                    darkMode ? 'bg-blue-900 text-blue-200 border border-blue-700' : 'bg-blue-100 text-blue-700 border border-blue-300'
                  }`}>{exp.duration}</span>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                {exp.description.map((desc, i) => (
                  <motion.div key={i} className="flex items-start group" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (index * 0.2) + (i * 0.1) }}>
                    <span className="text-blue-500 mr-3 md:mr-4 mt-1 md:mt-2 text-base md:text-lg group-hover:scale-125 transition-transform duration-300 flex-shrink-0">▶</span>
                    <p className={`leading-relaxed text-sm md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 mt-8 md:mt-12 ${
            darkMode ? 'bg-gray-800 bg-opacity-80 border-gray-600 hover:border-cyan-500' : 'bg-white bg-opacity-90 border-blue-200 hover:border-cyan-400'
          }`}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="p-2 md:p-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white flex-shrink-0">
              <FaGraduationCap className="text-lg md:text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Education</h2>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>University of Guelph</h3>
              <p className={`text-lg md:text-xl mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>B.Comp (Hons), Computer Science (Co-op)</p>
              <p className={`text-base md:text-lg mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Area of Application: Project Management</p>
              <p className={`text-base md:text-lg mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>GPA: 83% · Expected Graduation: April 2028</p>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="mb-2 text-sm md:text-base"><strong className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Relevant Coursework:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2 md:ml-4 text-sm md:text-base">
                  <li>Data Structures & Algorithms</li>
                  <li>Discrete Mathematics</li>
                  <li>Object-Oriented Programming</li>
                  <li>Software Systems Development</li>
                  <li>User Interface Design</li>
                  <li>Microcomputer Architecture (68000 Assembly)</li>
                </ul>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold shadow-md ${
                darkMode ? 'bg-cyan-900 text-cyan-200 border border-cyan-700' : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
              }`}>Sep 2023 – Present</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="text-center mt-16 md:mt-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }}>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">Interested in working together?</h2>
          <p className={`text-base md:text-lg mb-6 md:mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>I&apos;m always open to discussing new opportunities and challenges</p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Link href="/projects" className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 md:px-8 py-3 md:py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-sm md:text-base">View My Projects</Link>
            <Link href="/contact" className={`border-2 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm md:text-base ${
              darkMode ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}>Contact Me</Link>
          </div>
        </motion.div>
      </div>

      <footer className={`py-8 md:py-12 px-4 sm:px-6 border-t ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-blue-200'} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Aly Sibak</h3>
              <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full-stack developer passionate about creating impactful solutions</p>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 md:mb-4 text-base md:text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Links</h4>
              <div className="space-y-2">
                <Link href="/skills" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm md:text-base">Skills</Link>
                <Link href="/experience" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm md:text-base">Experience</Link>
                <Link href="/projects" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm md:text-base">Projects</Link>
                <Link href="/contact" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm md:text-base">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 md:mb-4 text-base md:text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/alysibak" className="text-gray-600 hover:text-blue-600 transition-colors"><svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path></svg></a>
                <a href="https://linkedin.com/in/aly-sibak-721b85252" className="text-gray-600 hover:text-blue-600 transition-colors"><svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"></path></svg></a>
                <a href="mailto:asibak@uoguelph.ca" className="text-gray-600 hover:text-blue-600 transition-colors"><svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg></a>
              </div>
            </div>
          </div>
          <div className={`mt-6 md:mt-8 pt-6 md:pt-8 border-t text-center ${darkMode ? 'border-gray-700 text-gray-400' : 'border-blue-200 text-gray-600'}`}>
            <p className="text-xs md:text-sm">Built with React, Next.js, and passion for great UX.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
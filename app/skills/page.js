"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaSun, FaMoon, FaCode, FaServer, FaCloud, FaBrain } from "react-icons/fa";
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

const frontendSkills = ["React", "TypeScript", "JavaScript", "HTML/CSS", "TSX", "Next.js", "Tailwind CSS", "Responsive Design"];
const backendSkills = ["Node.js", "NestJS", "Python", "C", "RESTful APIs", "PostgreSQL", "SQL", "Data Processing"];
const cloudAndTools = ["AWS (S3, RDS, EC2, IAM)", "Git", "CI/CD", "Docker", "Linux", "Agile / Scrum"];
const aiAndData = ["Google Gemini API", "Prompt Engineering", "LLM Integration", "Anomaly Detection", "Pandas / NumPy", "Data Pipelines"];

const SkillCategory = ({ title, skills, icon, delay = 0, darkMode }) => (
  <motion.div
    className={`rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
      darkMode 
        ? 'bg-gray-800 bg-opacity-80 border-gray-600 hover:border-blue-500' 
        : 'bg-white bg-opacity-90 border-blue-200 hover:border-blue-400'
    }`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl">
        {icon}
      </div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {title}
      </h3>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className={`px-4 py-3 rounded-lg shadow-sm border transition-all duration-300 text-center hover:scale-105 ${
            darkMode 
              ? 'bg-blue-900 bg-opacity-50 text-blue-200 border-blue-700 hover:border-blue-500' 
              : 'bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 border-blue-200 hover:border-cyan-400'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <p className="font-medium text-sm">{skill}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default function Skills() {
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-blue-200'} backdrop-blur-xl border-b`}>
        <div className="container mx-auto flex justify-between items-center p-4 max-w-6xl">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Aly Sibak</Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium transition-colors duration-300 hover:text-blue-600">Home</Link>
            <Link href="/skills" className="relative font-semibold transition-colors duration-300 hover:text-blue-600 group">
              Skills
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
            </Link>
            <Link href="/experience" className="font-medium transition-colors duration-300 hover:text-blue-600">Experience</Link>
            <Link href="/projects" className="font-medium transition-colors duration-300 hover:text-blue-600">Projects</Link>
            <Link href="/contact" className="font-medium transition-colors duration-300 hover:text-blue-600">Contact</Link>
          </div>
          <button onClick={toggleTheme} className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:scale-105 transition-all duration-300" aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16 pt-32 max-w-6xl">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-6">Technical Skills</h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Technologies and tools I&apos;ve applied through production co-op work and personal projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SkillCategory title="Frontend Development" skills={frontendSkills} icon={<FaCode />} delay={0.2} darkMode={darkMode} />
          <SkillCategory title="Backend & Languages" skills={backendSkills} icon={<FaServer />} delay={0.4} darkMode={darkMode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <SkillCategory title="Cloud & DevOps" skills={cloudAndTools} icon={<FaCloud />} delay={0.6} darkMode={darkMode} />
          <SkillCategory title="AI & Data" skills={aiAndData} icon={<FaBrain />} delay={0.8} darkMode={darkMode} />
        </div>

        <motion.div
          className={`text-center mt-12 rounded-xl p-10 shadow-xl border-2 ${darkMode ? 'bg-gray-800 bg-opacity-80 border-gray-600' : 'bg-white bg-opacity-90 border-blue-200'}`}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">Ready to build something amazing?</h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Let&apos;s discuss how these skills can benefit your next project</p>
          <div className="flex gap-4 justify-center">
            <Link href="/projects" className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold">View My Work</Link>
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold">Get in Touch</Link>
          </div>
        </motion.div>
      </div>

      <footer className={`py-12 px-6 border-t ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-blue-200'} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Aly Sibak</h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Full-stack developer passionate about creating impactful solutions</p>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Links</h4>
              <div className="space-y-2">
                <Link href="/skills" className="block text-blue-600 hover:text-blue-500 transition-colors">Skills</Link>
                <Link href="/experience" className="block text-blue-600 hover:text-blue-500 transition-colors">Experience</Link>
                <Link href="/projects" className="block text-blue-600 hover:text-blue-500 transition-colors">Projects</Link>
                <Link href="/contact" className="block text-blue-600 hover:text-blue-500 transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/alysibak" className="text-gray-600 hover:text-blue-600 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path></svg></a>
                <a href="https://linkedin.com/in/aly-sibak-721b85252" className="text-gray-600 hover:text-blue-600 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"></path></svg></a>
                <a href="mailto:asibak@uoguelph.ca" className="text-gray-600 hover:text-blue-600 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg></a>
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t text-center ${darkMode ? 'border-gray-700 text-gray-400' : 'border-blue-200 text-gray-600'}`}>
            <p>Built with React, Next.js, and passion for great UX.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
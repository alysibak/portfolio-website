"use client";

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCode, FaServer, FaCloud } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const frontendSkills = ["React", "TypeScript", "JavaScript", "HTML/CSS", "TSX", "Next.js", "Responsive Design"];
const backendSkills = ["Node.js", "NestJS", "RESTful APIs", "Database Design", "SQL", "Data Processing"];
const cloudAndTools = ["AWS", "Git", "CI/CD", "Version Control", "Agile Development"];

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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage?.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', newMode ? 'dark' : 'light');
    }
  };

  return (
    <div className={darkMode ? "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white" : "min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 text-gray-900"}>
      {/* Dark/Light Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        className="fixed top-5 right-5 text-2xl z-50 p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-xl hover:scale-105 transition-all duration-300"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Navigation */}
      <nav className={darkMode 
        ? "bg-gray-900 bg-opacity-90 backdrop-blur-lg border-b border-gray-700" 
        : "bg-white bg-opacity-90 backdrop-blur-lg border-b border-blue-200"
      }>
        <div className="container mx-auto flex justify-between items-center p-4 max-w-6xl">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Aly Sibak
          </Link>
          <div className="flex space-x-8">
            <Link href="/" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Home</Link>
            <Link href="/skills" className={`relative font-semibold transition-colors duration-300 ${darkMode ? 'text-white hover:text-blue-400' : 'hover:text-blue-600'}`}>
              Skills
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
            </Link>
            <Link href="/experience" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Experience</Link>
            <Link href="/projects" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Projects</Link>
            <Link href="/contact" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Skills Content */}
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Technical Skills
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Technologies and tools I've mastered through hands-on experience at P&P Optica and personal projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <SkillCategory 
            title="Frontend Development" 
            skills={frontendSkills}
            icon={<FaCode />}
            delay={0.2}
            darkMode={darkMode}
          />
          
          <SkillCategory 
            title="Backend Development" 
            skills={backendSkills}
            icon={<FaServer />}
            delay={0.4}
            darkMode={darkMode}
          />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <SkillCategory 
              title="Cloud & DevOps" 
              skills={cloudAndTools}
              icon={<FaCloud />}
              delay={0.6}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className={`text-center mt-20 rounded-xl p-10 shadow-xl border-2 ${
            darkMode 
              ? 'bg-gray-800 bg-opacity-80 border-gray-600' 
              : 'bg-white bg-opacity-90 border-blue-200'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Ready to build something amazing?
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's discuss how these skills can benefit your next project
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/projects" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
            >
              View My Work
            </Link>
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
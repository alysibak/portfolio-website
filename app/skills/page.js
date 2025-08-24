// app/skills/page.js
"use client";

import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const frontendSkills = ["React", "TypeScript", "JavaScript", "HTML/CSS", "TSX", "Next.js", "Responsive Design"];
const backendSkills = ["Node.js", "NestJS", "RESTful APIs", "Database Design", "SQL", "Data Processing"];
const cloudAndTools = ["AWS", "Git", "CI/CD", "Version Control", "Agile Development"];

const SkillCategory = ({ title, skills, icon, delay = 0 }) => (
  <motion.div
    className="bg-white bg-opacity-80 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2 mb-4">
      <span className="text-2xl">{icon}</span> {title}
    </h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-2 rounded-lg shadow-sm border border-blue-200 hover:border-cyan-400 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-blue-700 font-medium">{skill}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default function Skills() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-900"}>
      {/* Dark/Light Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="fixed top-5 right-5 text-3xl z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Navigation */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto flex justify-between items-center p-4 max-w-6xl">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Aly Sibak
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-blue-600 transition-colors duration-300">Home</Link>
            <Link href="/skills" className="text-blue-600 font-semibold">Skills</Link>
            <Link href="/experience" className="hover:text-blue-600 transition-colors duration-300">Experience</Link>
            <Link href="/projects" className="hover:text-blue-600 transition-colors duration-300">Projects</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Skills Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies and tools I've mastered through hands-on experience at P&P Optica and personal projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <SkillCategory 
            title="Frontend Development" 
            skills={frontendSkills}
            icon="🎨"
            delay={0.2}
          />
          
          <SkillCategory 
            title="Backend Development" 
            skills={backendSkills}
            icon="⚙️"
            delay={0.4}
          />
        </div>

        <div className="flex justify-center">
          <SkillCategory 
            title="Cloud & DevOps" 
            skills={cloudAndTools}
            icon="☁️"
            delay={0.6}
          />
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Ready to build something amazing?</h2>
          <p className="text-gray-600 mb-6">Let's discuss how these skills can benefit your next project</p>
          <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 rounded-lg text-white hover:opacity-90 transition-opacity duration-300 inline-block">
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
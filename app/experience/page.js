"use client";

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const experience = [
  {
    title: "Software Developer Co-op",
    company: "P&P Optica",
    duration: "May 2024 – Aug 2024",
    location: "Waterloo, ON",
    description: [
      "Built full-stack applications for AI-powered Smart Imaging Systems, supporting real-time food contamination detection",
      "Developed version control and release management tools, improving deployment speed and system reliability",
      "Created CSV data upload functionality for the Insights platform, streamlining data workflows for end users",
      "Implemented security automation features that reduced manual incident handling for improved efficiency",
      "Enhanced developer documentation and setup processes, cutting new team member onboarding time",
      "Delivered scalable solutions using TypeScript, React, Node.js, and AWS for hyperspectral imaging applications",
      "Collaborated in Agile environment with cross-functional teams to ensure high-quality, on-time deliverables"
    ]
  },
  {
    title: "Teaching Assistant",
    company: "University of Guelph",
    duration: "Sep – Dec 2024",
    location: "Guelph, ON",
    description: [
      "Evaluated 250+ student assignments in discrete mathematics, providing detailed feedback on logic and algorithms",
      "Conducted weekly office hours, successfully clarifying complex mathematical concepts for consistent student attendance",
      "Maintained grading consistency across teaching team while contributing to improved student learning outcomes"
    ]
  }
];

export default function Experience() {
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
            <Link href="/skills" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Skills</Link>
            <Link href="/experience" className={`relative font-semibold transition-colors duration-300 ${darkMode ? 'text-white hover:text-blue-400' : 'hover:text-blue-600'}`}>
              Experience
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
            </Link>
            <Link href="/projects" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Projects</Link>
            <Link href="/contact" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Experience Content */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Professional Experience
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real-world experience building production software and contributing to educational excellence
          </p>
        </motion.div>

        <div className="space-y-10">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                darkMode 
                  ? 'bg-gray-800 bg-opacity-80 border-gray-600 hover:border-blue-500' 
                  : 'bg-white bg-opacity-90 border-blue-200 hover:border-blue-400'
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <FaBriefcase className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {exp.title}
                    </h2>
                    <p className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{exp.company}</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.location}</p>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className={`px-6 py-3 rounded-full text-sm font-bold shadow-md ${
                    darkMode 
                      ? 'bg-blue-900 text-blue-200 border border-blue-700' 
                      : 'bg-blue-100 text-blue-700 border border-blue-300'
                  }`}>
                    {exp.duration}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {exp.description.map((desc, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.2) + (i * 0.1) }}
                  >
                    <span className="text-blue-500 mr-4 mt-2 text-lg group-hover:scale-125 transition-transform duration-300">▶</span>
                    <p className={`leading-relaxed text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          className={`rounded-xl p-8 shadow-lg mt-12 border-2 ${
            darkMode 
              ? 'bg-gray-800 bg-opacity-80 border-gray-600' 
              : 'bg-white bg-opacity-90 border-blue-200'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
              <FaGraduationCap className="text-xl" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Education
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>University of Guelph</h3>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>B.Comp (Hons), Computer Science (Co-op)</p>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>GPA: 83%</p>
              <p className={`mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <strong className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Relevant Coursework:</strong> Data Structures & Algorithms, Discrete Mathematics, Object-Oriented Programming
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <span className={`px-6 py-3 rounded-full text-sm font-bold shadow-md ${
                darkMode 
                  ? 'bg-cyan-900 text-cyan-200 border border-cyan-700' 
                  : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
              }`}>
                Sep 2023 – Present
              </span>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Interested in working together?
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I&apos;m always open to discussing new opportunities and challenges
          </p>
          <div className="flex gap-6 justify-center">
            <Link 
              href="/projects" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
            >
              View My Projects
            </Link>
            <Link 
              href="/contact" 
              className={`border-2 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg ${
                darkMode 
                  ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
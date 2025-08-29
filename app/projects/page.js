"use client";

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "3D Interactive Fitness App",
    description: "Web application that visually connects muscle groups to exercises with interactive 3D elements and responsive design for optimal user experience across all devices.",
    techStack: "React, Next.js, TypeScript, CSS",
    githubLink: "https://github.com/alysibak",
    status: "In Development",
    category: "Web Application"
  },
  {
    title: "Business Website Portfolio",
    description: "Multiple responsive websites for local businesses using modern web technologies, featuring clean design principles and optimized user experience.",
    techStack: "React, Next.js, JavaScript, HTML, CSS",
    githubLink: "https://github.com/alysibak",
    status: "Completed",
    category: "Client Work"
  },
  {
    title: "Investment Portfolio Manager",
    description: "Java console application for managing stock and mutual fund investments with automated transaction processing and real-time portfolio evaluation.",
    techStack: "Java, Object-Oriented Programming",
    githubLink: "https://github.com/alysibak",
    status: "Completed",
    category: "Desktop Application"
  }
];

const ProjectCard = ({ project, index, darkMode }) => (
  <motion.div
    className={`group relative rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden ${
      darkMode 
        ? 'bg-gray-800 bg-opacity-80 border-gray-600 hover:border-blue-500' 
        : 'bg-white bg-opacity-90 border-blue-200 hover:border-blue-400'
    }`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block ${
            darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-700'
          }`}>
            {project.category}
          </span>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-300">
            {project.title}
          </h3>
        </div>
        <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-md ${
          project.status === 'Completed' 
            ? (darkMode ? 'bg-green-900 text-green-200 border border-green-700' : 'bg-green-100 text-green-700 border border-green-300')
            : (darkMode ? 'bg-yellow-900 text-yellow-200 border border-yellow-700' : 'bg-yellow-100 text-yellow-700 border border-yellow-300')
        }`}>
          {project.status}
        </span>
      </div>
      
      <p className={`leading-relaxed mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {project.description}
      </p>
      
      <div className="mb-8">
        <p className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Technologies Used:
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.split(', ').map((tech, i) => (
            <span 
              key={i} 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                darkMode 
                  ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <a 
          href={project.githubLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
        >
          <FaGithub />
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  </motion.div>
);

export default function Projects() {
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
            <Link href="/experience" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Experience</Link>
            <Link href="/projects" className={`relative font-semibold transition-colors duration-300 ${darkMode ? 'text-white hover:text-blue-400' : 'hover:text-blue-600'}`}>
              Projects
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
            </Link>
            <Link href="/contact" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Projects Content */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A showcase of applications and software I've built, demonstrating full-stack development skills and problem-solving abilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} darkMode={darkMode} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className={`text-center rounded-xl p-10 shadow-xl border-2 ${
            darkMode 
              ? 'bg-gray-800 bg-opacity-80 border-gray-600' 
              : 'bg-white bg-opacity-90 border-blue-200'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Have a project in mind?
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I'm always interested in taking on new challenges and building innovative solutions
          </p>
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 px-10 py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold inline-block"
          >
            Let's Collaborate
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
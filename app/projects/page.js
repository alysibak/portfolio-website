"use client";

import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "3D Interactive Fitness App",
    description: "Web application that visually connects muscle groups to exercises with interactive 3D elements and responsive design for optimal user experience across all devices.",
    techStack: "React, Next.js, TypeScript, CSS",
    githubLink: "https://github.com/alysibak",
    status: "In Development"
  },
  {
    title: "Business Website Portfolio",
    description: "Multiple responsive websites for local businesses using modern web technologies, featuring clean design principles and optimized user experience.",
    techStack: "React, Next.js, JavaScript, HTML, CSS",
    githubLink: "https://github.com/alysibak",
    status: "Completed"
  },
  {
    title: "Investment Portfolio Manager",
    description: "Java console application for managing stock and mutual fund investments with automated transaction processing and real-time portfolio evaluation.",
    techStack: "Java, Object-Oriented Programming",
    githubLink: "https://github.com/alysibak",
    status: "Completed"
  }
];

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="bg-white bg-opacity-80 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {project.title}
      </h3>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        project.status === 'Completed' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-yellow-100 text-yellow-700'
      }`}>
        {project.status}
      </span>
    </div>
    
    <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
    
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2"><strong>Tech Stack:</strong></p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.split(', ').map((tech, i) => (
          <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
    
    <a 
      href={project.githubLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity duration-300 inline-block"
    >
      View on GitHub
    </a>
  </motion.div>
);

export default function Projects() {
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
            <Link href="/skills" className="hover:text-blue-600 transition-colors duration-300">Skills</Link>
            <Link href="/experience" className="hover:text-blue-600 transition-colors duration-300">Experience</Link>
            <Link href="/projects" className="text-blue-600 font-semibold">Projects</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Projects Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of applications and software I&apos;ve built, demonstrating full-stack development skills and problem-solving abilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 bg-white bg-opacity-80 rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Have a project in mind?</h2>
          <p className="text-gray-600 mb-6">I&apos;m always interested in taking on new challenges and building innovative solutions</p>
          <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 rounded-lg text-white hover:opacity-90 transition-opacity duration-300 inline-block">
            Let&apos;s Collaborate
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
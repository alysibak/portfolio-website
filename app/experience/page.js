// app/experience/page.js
"use client";

import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
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
            <Link href="/experience" className="text-blue-600 font-semibold">Experience</Link>
            <Link href="/projects" className="hover:text-blue-600 transition-colors duration-300">Projects</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Experience Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Professional Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world experience building production software and contributing to educational excellence
          </p>
        </motion.div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {exp.title}
                  </h2>
                  <p className="text-lg text-gray-700 font-semibold">{exp.company}</p>
                  <p className="text-gray-600">{exp.location}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {exp.duration}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {exp.description.map((desc, i) => (
                  <div key={i} className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-2 text-sm">▸</span>
                    <p className="text-gray-700 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Education
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">University of Guelph</h3>
              <p className="text-lg text-gray-700">B.Comp (Hons), Computer Science (Co-op)</p>
              <p className="text-gray-600">GPA: 83%</p>
              <p className="text-gray-600 mt-2">
                <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Discrete Mathematics, Object-Oriented Programming
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
                Sep 2023 – Present
              </span>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Interested in working together?</h2>
          <p className="text-gray-600 mb-6">I'm always open to discussing new opportunities and challenges</p>
          <div className="flex gap-4 justify-center">
            <Link href="/projects" className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg text-white hover:opacity-90 transition-opacity duration-300">
              View My Projects
            </Link>
            <Link href="/contact" className="border-2 border-blue-600 px-6 py-3 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300">
              Contact Me
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
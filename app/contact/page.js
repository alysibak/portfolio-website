
// app/contact/page.js
"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
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
            <Link href="/projects" className="hover:text-blue-600 transition-colors duration-300">Projects</Link>
            <Link href="/contact" className="text-blue-600 font-semibold">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Contact Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to contribute to your next project! I'm always open to discussing opportunities, collaborations, and new challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a href="mailto:asibak@uoguelph.ca" className="text-blue-600 hover:underline">
                    asibak@uoguelph.ca
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaGithub className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">GitHub</h3>
                  <a href="https://github.com/alysibak" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    github.com/alysibak
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaLinkedin className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/aly-sibak-721b85252/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Connect with me
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/AlySibakResume (13).pdf" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                  View Resume
                </a>
                <Link href="/projects" className="block text-blue-600 hover:underline">
                  View My Projects
                </Link>
                <Link href="/experience" className="block text-blue-600 hover:underline">
                  Professional Experience
                </Link>
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">What I'm Looking For</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Co-op Opportunities</h3>
                <p className="text-gray-600">Software development internships where I can apply my full-stack skills and learn from experienced teams</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Project Collaborations</h3>
                <p className="text-gray-600">Open-source contributions and freelance projects involving modern web technologies</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Learning Opportunities</h3>
                <p className="text-gray-600">Hackathons, tech meetups, and development communities focused on innovation</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Current Status</h3>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block">
                Available for Summer 2025 Co-op
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <motion.div
          className="text-center bg-white bg-opacity-80 rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Connect on Social Media</h2>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://github.com/alysibak" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gray-800 text-white p-4 rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a 
              href="https://www.linkedin.com/in/aly-sibak-721b85252/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-500 transition-colors duration-300"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a 
              href="mailto:asibak@uoguelph.ca" 
              className="bg-red-600 text-white p-4 rounded-full hover:bg-red-500 transition-colors duration-300"
            >
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 backdrop-blur-sm py-6 text-center border-t border-blue-200">
        <p className="text-gray-500">© 2024 Aly Sibak • Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaMapMarkerAlt, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
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
            <Link href="/projects" className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'hover:text-blue-600'}`}>Projects</Link>
            <Link href="/contact" className={`relative font-semibold transition-colors duration-300 ${darkMode ? 'text-white hover:text-blue-400' : 'hover:text-blue-600'}`}>
              Contact
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Contact Content */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Let&apos;s Connect
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to contribute to your next project! I&apos;m always open to discussing opportunities, collaborations, and new challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Contact Information */}
          <motion.div
            className={`rounded-xl p-8 shadow-lg border-2 ${
              darkMode 
                ? 'bg-gray-800 bg-opacity-80 border-gray-600' 
                : 'bg-white bg-opacity-90 border-blue-200'
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-center space-x-4 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className={`p-4 rounded-xl transition-colors duration-300 ${
                  darkMode ? 'bg-blue-900 group-hover:bg-blue-800' : 'bg-blue-100 group-hover:bg-blue-200'
                }`}>
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Email</h3>
                  <a href="mailto:asibak@uoguelph.ca" className="text-blue-600 hover:text-blue-500 transition-colors duration-300 text-lg">
                    asibak@uoguelph.ca
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className={`p-4 rounded-xl transition-colors duration-300 ${
                  darkMode ? 'bg-gray-700 group-hover:bg-gray-600' : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <FaGithub className="text-gray-700 text-xl" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>GitHub</h3>
                  <a href="https://github.com/alysibak" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 transition-colors duration-300 text-lg">
                    github.com/alysibak
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className={`p-4 rounded-xl transition-colors duration-300 ${
                  darkMode ? 'bg-blue-900 group-hover:bg-blue-800' : 'bg-blue-100 group-hover:bg-blue-200'
                }`}>
                  <FaLinkedin className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/aly-sibak-721b85252/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 transition-colors duration-300 text-lg">
                    Connect with me
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
              >
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-cyan-900' : 'bg-cyan-100'
                }`}>
                  <FaMapMarkerAlt className="text-cyan-600 text-xl" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Location</h3>
                  <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ontario, Canada</p>
                </div>
              </motion.div>
            </div>

            <div className={`mt-8 pt-8 ${darkMode ? 'border-t border-gray-600' : 'border-t border-blue-200'}`}>
              <h3 className={`font-bold text-lg mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Links</h3>
              <div className="space-y-3">
                <a href="/AlySibakResume.pdf" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-500 transition-colors duration-300 text-lg font-medium">
                  View Resume
                </a>
                <Link href="/projects" className="block text-blue-600 hover:text-blue-500 transition-colors duration-300 text-lg font-medium">
                  View My Projects
                </Link>
                <Link href="/experience" className="block text-blue-600 hover:text-blue-500 transition-colors duration-300 text-lg font-medium">
                  Professional Experience
                </Link>
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            className={`rounded-xl p-8 shadow-lg border-2 ${
              darkMode 
                ? 'bg-gray-800 bg-opacity-80 border-gray-600' 
                : 'bg-white bg-opacity-90 border-blue-200'
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-8">
              What I&apos;m Looking For
            </h2>
            
            <div className="space-y-6">
              <div className={`p-6 rounded-lg border-l-4 border-blue-500 ${
                darkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-blue-50'
              }`}>
                <h3 className={`font-bold text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Co-op Opportunities</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Software development internships where I can apply my full-stack skills and learn from experienced teams
                </p>
              </div>

              <div className={`p-6 rounded-lg border-l-4 border-cyan-500 ${
                darkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-cyan-50'
              }`}>
                <h3 className={`font-bold text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Project Collaborations</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Open-source contributions and freelance projects involving modern web technologies
                </p>
              </div>

              <div className={`p-6 rounded-lg border-l-4 border-purple-500 ${
                darkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-purple-50'
              }`}>
                <h3 className={`font-bold text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Learning Opportunities</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Hackathons, tech meetups, and development communities focused on innovation
                </p>
              </div>
            </div>

            <div className={`mt-8 pt-8 ${darkMode ? 'border-t border-gray-600' : 'border-t border-blue-200'}`}>
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarCheck className="text-green-600 text-xl" />
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Current Status</h3>
              </div>
              <div className={`px-6 py-4 rounded-lg inline-flex items-center gap-3 shadow-md border-2 ${
                darkMode 
                  ? 'bg-green-900 text-green-200 border-green-700' 
                  : 'bg-green-100 text-green-800 border-green-300'
              }`}>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Available for Summer 2025 Co-op</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <motion.div
          className={`text-center rounded-xl p-10 shadow-lg border-2 ${
            darkMode 
              ? 'bg-gray-800 bg-opacity-80 border-gray-600' 
              : 'bg-white bg-opacity-90 border-blue-200'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
            Connect on Social Media
          </h2>
          <div className="flex justify-center space-x-8">
            <motion.a 
              href="https://github.com/alysibak" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-gray-800 text-white p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-600 hover:border-gray-500"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <FaGithub className="text-3xl group-hover:animate-pulse" />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/aly-sibak-721b85252/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-500 hover:border-blue-400"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <FaLinkedin className="text-3xl group-hover:animate-pulse" />
            </motion.a>
            <motion.a 
              href="mailto:asibak@uoguelph.ca" 
              className="group bg-red-600 text-white p-6 rounded-xl hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-red-500 hover:border-red-400"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <FaEnvelope className="text-3xl group-hover:animate-pulse" />
            </motion.a>
          </div>
        </motion.div>

        {/* Response Time Promise */}
        <motion.div
          className={`text-center mt-12 p-8 rounded-xl border-2 ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-700' 
              : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Quick Response Guaranteed
          </h3>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I typically respond to emails within 24 hours and am always excited to discuss new opportunities!
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className={darkMode 
        ? "bg-gray-900 bg-opacity-80 backdrop-blur-sm py-8 text-center border-t border-gray-700" 
        : "bg-white bg-opacity-80 backdrop-blur-sm py-8 text-center border-t border-blue-200"
      }>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
          Aly Sibak. Built with Next.js & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
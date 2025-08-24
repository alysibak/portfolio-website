// app/page.js (Homepage)
"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center" : "min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-900 flex flex-col items-center"}>
      {/* Dark/Light Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="fixed top-5 right-5 text-3xl z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm z-40 border-b border-blue-200">
        <div className="container mx-auto flex justify-between items-center p-4 max-w-6xl">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Aly Sibak
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-blue-600 transition-colors duration-300">Home</Link>
            <Link href="/skills" className="hover:text-blue-600 transition-colors duration-300">Skills</Link>
            <Link href="/experience" className="hover:text-blue-600 transition-colors duration-300">Experience</Link>
            <Link href="/projects" className="hover:text-blue-600 transition-colors duration-300">Projects</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-3/4 mt-32">
        <header className="text-center">
          <motion.h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Aly Sibak
          </motion.h1>
          <motion.p
            className="text-2xl mt-4 font-medium text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="font-bold text-blue-600">Full-Stack Developer</span> with real-world impact
          </motion.p>
          <motion.p
            className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Computer Science student at University of Guelph with hands-on experience building AI-powered food safety technology at P&P Optica. 
            Specialized in full-stack development, cloud deployment, and delivering measurable business impact.
          </motion.p>
          <div className="flex justify-center mt-6">
            <Image src="/profile.jpeg" alt="Aly Sibak" width={180} height={180} className="rounded-full shadow-lg border-4 border-blue-500" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a href="/AlySibakResume (13).pdf" download className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg text-white flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity duration-300">
              <FaDownload />
              <span>Download Resume</span>
            </a>
            <div className="flex space-x-4">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">Full-Stack Developer</span>
              <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-lg font-semibold">Ready for Impact</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <Link href="/skills" className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold text-blue-600">Technical Skills</h3>
              <p className="text-sm text-gray-600">Frontend, Backend, Cloud</p>
            </Link>
            <Link href="/experience" className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="font-semibold text-blue-600">Experience</h3>
              <p className="text-sm text-gray-600">P&P Optica, Teaching</p>
            </Link>
            <Link href="/projects" className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-semibold text-blue-600">Projects</h3>
              <p className="text-sm text-gray-600">Web Apps, Software</p>
            </Link>
            <Link href="/contact" className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-semibold text-blue-600">Contact</h3>
              <p className="text-sm text-gray-600">Let's connect!</p>
            </Link>
          </div>
        </header>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white bg-opacity-80 backdrop-blur-sm mt-20 py-6 text-center border-t border-blue-200">
        <p className="text-gray-500">© 2024 Aly Sibak • Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}
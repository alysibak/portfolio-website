"use client";

import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects, frontendSkills, backendSkills, experience } from "./data"; // Import data

const ProjectCard = ({ title, description, techStack, githubLink, liveDemo }) => (
  <motion.div
    className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-opacity-50 border border-gray-300"
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">{title}</h3>
    <p className="mt-2 text-gray-700">{description}</p>
    <p className="text-sm mt-1 text-gray-500">Tech Stack: {techStack}</p>
    <div className="mt-4 flex space-x-4">
      <a href={githubLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity duration-300">GitHub</a>
      {liveDemo && <a href={liveDemo} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-teal-600 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity duration-300">Live Demo</a>}
    </div>
  </motion.div>
);

const Section = ({ id, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.2 }}
    className="w-3/4 mt-20"
  >
    {children}
  </motion.section>
);

export default function Home() {
  const [darkMode, setDarkMode] = useState(false); // Default to light mode

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }, []);

  return (
    <div className={darkMode ? "min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center" : "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col items-center"}>
      {/* Dark/Light Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="fixed top-5 right-5 text-3xl z-50 p-2 bg-gray-700 text-white rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-50 backdrop-blur-sm z-40 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center p-4">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Aly Sibak</span>
          <div className="flex space-x-6">
            <a href="#home" className="hover:text-blue-400 transition-colors duration-300">Home</a>
            <a href="#about" className="hover:text-blue-400 transition-colors duration-300">About Me</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors duration-300">Experience</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors duration-300">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section id="home">
        <header className="text-center mt-32">
          <motion.h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Aly Sibak</motion.h1>
          <motion.p
            className="text-2xl mt-4 font-medium text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            I am ready for <span className="font-bold text-blue-500">internship opportunities</span>.
          </motion.p>
          <motion.p
            className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Hi! I'm Aly, a passionate software developer and full-stack engineer with experience in building modern web applications. I specialize in front-end and back-end development, and I'm always eager to learn new technologies and tackle challenging problems. Let's create something amazing together!
          </motion.p>
          <div className="flex justify-center mt-6">
            <Image src="/profile.jpeg" alt="Aly Sibak" width={180} height={180} className="rounded-full shadow-lg border-4 border-blue-500" />
          </div>
          {/* Download Resume Button */}
          <a href="/SibakAlyCoop.pdf" download className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg text-white flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity duration-300">
            <FaDownload />
            <span>Download Resume</span>
          </a>
        </header>
      </Section>

      {/* About Me Section */}
      <Section id="about">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">About Me</h2>
        <div className="mt-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Frontend Skills</h3>
          <div className="mt-4 flex flex-wrap gap-4">
            {frontendSkills.map((skill, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-3 rounded-lg shadow-md backdrop-blur-sm bg-opacity-50 border border-gray-300">
                <p className="text-lg font-medium text-gray-700">{skill}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Backend Skills</h3>
          <div className="mt-4 flex flex-wrap gap-4">
            {backendSkills.map((skill, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-3 rounded-lg shadow-md backdrop-blur-sm bg-opacity-50 border border-gray-300">
                <p className="text-lg font-medium text-gray-700">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Experience</h2>
        <div className="mt-6 space-y-4">
          {experience.map((exp, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-md backdrop-blur-sm bg-opacity-50 border border-gray-300">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">{exp.title}</h3>
              <p className="text-gray-500">{exp.company} | {exp.duration}</p>
              <ul className="mt-2 list-disc list-inside text-gray-700">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Contact</h2>
        <p className="mt-4 text-gray-600">Feel free to reach out for collaborations or opportunities!</p>
        <div className="flex space-x-6 mt-6 text-3xl justify-center">
          <a href="https://github.com/alysibak" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/aly-sibak-721b85252/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300"><FaLinkedin /></a>
          <a href="mailto:asibak@uoguelph.ca" className="hover:text-blue-400 transition-colors duration-300"><FaEnvelope /></a>
        </div>
      </Section>

      {/* Footer Section */}
      <footer className="w-full bg-white bg-opacity-50 backdrop-blur-sm mt-20 py-6 text-center border-t border-gray-200">
        <p className="text-gray-500">© 2024 Aly Sibak. All rights reserved.</p>
      </footer>
    </div>
  );
}
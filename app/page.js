"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaDownload, FaCode, FaBriefcase, FaRocket, FaComments, FaChevronDown, FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

const THEME_KEY = 'aly-sibak-theme';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, [darkMode]);

  return { darkMode, toggleTheme, isLoading };
};

const TypewriterText = ({ texts, className }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(current.slice(0, currentText.length + 1));
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const ParallaxSection = ({ children, offset = 0.5 }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      style={{ 
        transform: `translateY(${scrollY * offset}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

const MetricCard = ({ number, label, suffix = "", darkMode }) => (
  <div className={`text-center p-4 rounded-xl ${
    darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-blue-200'
  } backdrop-blur-sm`}>
    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
      {number}{suffix}
    </div>
    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>
  </div>
);

const TechStackCard = ({ category, technologies, experience, darkMode }) => (
  <div className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
    darkMode 
      ? 'bg-gray-800/80 border-gray-700 hover:border-blue-500' 
      : 'bg-white/80 border-blue-200 hover:border-blue-400'
  } backdrop-blur-sm`}>
    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
      {category}
    </h3>
    <div className="flex flex-wrap gap-2 mb-4">
      {technologies.map((tech, index) => (
        <span 
          key={index}
          className={`px-3 py-1 text-sm rounded-full ${
            darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-700'
          }`}
        >
          {tech}
        </span>
      ))}
    </div>
    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      {experience}
    </p>
  </div>
);

export default function AwardWinningHome() {
  const { darkMode, toggleTheme, isLoading } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const heroTexts = [
    "Full-Stack Developer",
    "Problem Solver",
    "Tech Innovator",
    "AI Enthusiast"
  ];

  const techStack = [
    {
      category: "Frontend Development",
      technologies: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "TSX"],
      experience: "Built production UIs for AI-powered food safety systems at P&P Optica. Created responsive interfaces for hyperspectral imaging applications."
    },
    {
      category: "Backend & Cloud",
      technologies: ["Node.js", "NestJS", "AWS", "RESTful APIs", "CI/CD"],
      experience: "Developed scalable backend systems and deployment pipelines. Implemented security automation and version control tools in professional environment."
    },
    {
      category: "Programming & Data",
      technologies: ["Java", "SQL", "Data Processing", "Object-Oriented Programming"],
      experience: "Strong foundation from academic coursework and projects. Built investment portfolio management system and completed discrete mathematics coursework."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white" 
        : "bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 text-gray-900"
    }`}>
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-900/90 border-gray-700' 
          : 'bg-white/90 border-blue-200'
      } backdrop-blur-xl border-b`}>
        <div className="container mx-auto flex justify-between items-center p-4 max-w-6xl">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Aly Sibak
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="relative font-semibold transition-colors duration-300 hover:text-blue-600 group">
              Home
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#skills" className="font-medium transition-colors duration-300 hover:text-blue-600">Skills</a>
            <a href="#projects" className="font-medium transition-colors duration-300 hover:text-blue-600">Projects</a>
            <a href="/experience" className="font-medium transition-colors duration-300 hover:text-blue-600">Experience</a>
            <a href="/contact" className="font-medium transition-colors duration-300 hover:text-blue-600">Contact</a>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:scale-105 transition-all duration-300"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl w-full text-center">
          <ParallaxSection offset={0.2}>
            <div className="mb-8">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 p-1">
                <Image 
                  src="/profile.jpeg" 
                  alt="Aly Sibak - Full Stack Developer"
                  width={192}
                  height={192}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            
            <h1 className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Aly Sibak
            </h1>
            
            <div className="text-4xl font-bold mb-8 h-16">
              <TypewriterText 
                texts={heroTexts}
                className={darkMode ? 'text-gray-200' : 'text-gray-700'}
              />
            </div>
            
            <p className={`text-xl max-w-3xl mx-auto mb-12 leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              2nd-year Computer Science Co-op student at University of Guelph with proven industry experience 
              building AI-powered hyperspectral imaging systems at P&P Optica. Passionate about creating scalable 
              web applications that solve real-world problems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a 
                href="/AlySibakResume.pdf"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3"
              >
                <FaDownload className="group-hover:animate-bounce" />
                <span className="font-semibold">Download Resume</span>
              </a>
              <a 
                href="#projects"
                className={`group border-2 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 ${
                  darkMode 
                    ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <FaPlay className="group-hover:translate-x-1 transition-transform" />
                <span>View My Work</span>
              </a>
            </div>
          </ParallaxSection>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <MetricCard number="6" suffix="+" label="Projects Completed" darkMode={darkMode} />
            <MetricCard number="250" suffix="+" label="Students Helped" darkMode={darkMode} />
            <MetricCard number="83" suffix="%" label="Current GPA" darkMode={darkMode} />
            <MetricCard number="1" label="Co-op Completed" darkMode={darkMode} />
          </div>

          <div className="animate-bounce">
            <FaChevronDown className={`text-3xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Technology Stack
          </h2>
          <p className={`text-xl text-center mb-16 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Technologies I&apos;ve used in professional and academic projects
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <TechStackCard 
                key={stack.category}
                category={stack.category}
                technologies={stack.technologies}
                experience={stack.experience}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: FaCode, 
                title: "Technical Skills", 
                desc: "React, TypeScript, Java, and more",
                color: "blue",
                href: "/skills"
              },
              { 
                icon: FaBriefcase, 
                title: "Experience", 
                desc: "Software development at P&P Optica",
                color: "cyan",
                href: "/experience"
              },
              { 
                icon: FaRocket, 
                title: "Projects", 
                desc: "Full-stack applications and solutions",
                color: "purple",
                href: "/projects"
              },
              { 
                icon: FaComments, 
                title: "Contact", 
                desc: "Available for Summer 2025 Co-op",
                color: "pink",
                href: "/contact"
              }
            ].map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                className={`group relative p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:scale-105 overflow-hidden ${
                  darkMode 
                    ? 'bg-gray-800/80 border-gray-700 hover:border-blue-500' 
                    : 'bg-white/80 border-blue-200 hover:border-blue-400'
                } backdrop-blur-sm`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <item.icon className={`text-5xl mb-4 text-${item.color}-600 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className={`text-xl font-bold mb-3 text-${item.color}-600`}>{item.title}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                  <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="mr-2">Explore</span>
                    <FaExternalLinkAlt className="text-sm" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className={`py-12 px-6 border-t ${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-blue-200'
      } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Aly Sibak
              </h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Full-stack developer passionate about creating impactful solutions
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Quick Links
              </h4>
              <div className="space-y-2">
                <a href="/skills" className="block text-blue-600 hover:text-blue-500 transition-colors">Skills</a>
                <a href="/experience" className="block text-blue-600 hover:text-blue-500 transition-colors">Experience</a>
                <a href="/projects" className="block text-blue-600 hover:text-blue-500 transition-colors">Projects</a>
                <a href="/contact" className="block text-blue-600 hover:text-blue-500 transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Connect
              </h4>
              <div className="flex space-x-4">
                <a href="https://github.com/alysibak" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FaGithub className="text-2xl" />
                </a>
                <a href="https://linkedin.com/in/aly-sibak-721b85252" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FaLinkedin className="text-2xl" />
                </a>
                <a href="mailto:asibak@uoguelph.ca" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FaEnvelope className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t text-center ${
            darkMode ? 'border-gray-700 text-gray-400' : 'border-blue-200 text-gray-600'
          }`}>
            <p>Built with React, Next.js, and passion for great UX.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
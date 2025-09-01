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
  <div className={`text-center p-3 sm:p-4 rounded-xl ${
    darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-blue-200'
  } backdrop-blur-sm`}>
    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
      {number}{suffix}
    </div>
    <div className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>
  </div>
);

export default function HomePage() {
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white" 
        : "bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 text-gray-900"
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-900/95 border-gray-700' 
          : 'bg-white/95 border-blue-200'
      } backdrop-blur-xl border-b`}>
        <div className="container mx-auto flex justify-between items-center px-4 py-3 max-w-6xl">
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Aly Sibak
          </div>
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            <a href="#home" className="relative font-semibold transition-colors duration-300 hover:text-blue-600 group text-sm lg:text-base">
              Home
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#highlights" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Highlights</a>
            <a href="/skills" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Skills</a>
            <a href="/experience" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Experience</a>
            <a href="/projects" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Projects</a>
            <a href="/contact" className="font-medium transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base">Contact</a>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 md:p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:scale-105 transition-all duration-300"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? <FaSun className="text-sm md:text-base" /> : <FaMoon className="text-sm md:text-base" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 relative z-10">
        <div className="max-w-5xl w-full text-center">
          <ParallaxSection offset={0.2}>
            <div className="mb-6 md:mb-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 p-1">
                <Image 
                  src="/profile.jpeg" 
                  alt="Aly Sibak - Full Stack Developer"
                  width={192}
                  height={192}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Aly Sibak
            </h1>
            
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 h-12 sm:h-14 md:h-16">
              <TypewriterText 
                texts={heroTexts}
                className={darkMode ? 'text-gray-200' : 'text-gray-700'}
              />
            </div>
            
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              2nd-year Computer Science Co-op student at University of Guelph with proven industry experience 
              building AI-powered hyperspectral imaging systems at P&P Optica. Passionate about creating scalable 
              web applications that solve real-world problems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16 px-4 relative z-30">
              <a 
                href="/AlySibakResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base relative z-40"
              >
                <FaDownload className="group-hover:animate-bounce text-sm sm:text-base" />
                <span className="font-semibold">Download Resume</span>
              </a>
              <a 
                href="/projects"
                className={`group border-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base relative z-40 ${
                  darkMode 
                    ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <FaPlay className="group-hover:translate-x-1 transition-transform text-sm sm:text-base" />
                <span>View My Work</span>
              </a>
            </div>
          </ParallaxSection>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 md:mb-12 px-4">
            <MetricCard number="6" suffix="+" label="Projects Completed" darkMode={darkMode} />
            <MetricCard number="250" suffix="+" label="Students Helped" darkMode={darkMode} />
            <MetricCard number="83" suffix="%" label="Current GPA" darkMode={darkMode} />
            <MetricCard number="1" label="Co-op Completed" darkMode={darkMode} />
          </div>

          <div className="animate-bounce">
            <FaChevronDown className={`text-2xl md:text-3xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section id="highlights" className="py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Experience Highlights
          </h2>
          <p className={`text-lg sm:text-xl text-center mb-12 md:mb-16 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real impact from professional software development and academic excellence
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* P&P Optica Highlight */}
            <div className={`p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700 hover:border-blue-500' 
                : 'bg-white/80 border-blue-200 hover:border-blue-400'
            } backdrop-blur-sm shadow-xl hover:shadow-2xl`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 md:p-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <FaBriefcase className="text-xl md:text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    P&P Optica
                  </h3>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Software Developer Co-op</p>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg md:text-xl flex-shrink-0">✓</span>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Built AI-powered food safety systems using React, TypeScript, and AWS
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg md:text-xl flex-shrink-0">✓</span>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Improved deployment speed and system reliability through automation
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg md:text-xl flex-shrink-0">✓</span>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Reduced new team member onboarding time with better documentation
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Excellence */}
            <div className={`p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700 hover:border-cyan-500' 
                : 'bg-white/80 border-blue-200 hover:border-cyan-400'
            } backdrop-blur-sm shadow-xl hover:shadow-2xl`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 md:p-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
                  <FaCode className="text-xl md:text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    Academic Excellence
                  </h3>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>University of Guelph</p>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg md:text-xl flex-shrink-0">✓</span>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Maintaining 83% GPA while taking advanced CS courses
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg md:text-xl flex-shrink-0">✓</span>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Teaching Assistant helping 250+ students in discrete mathematics
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg md:text-xl flex-shrink-0">✓</span>
                  <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Built multiple full-stack applications and enterprise-level projects
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 md:mt-16">
            <a 
              href="/experience" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 md:px-10 py-3 md:py-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold inline-block text-sm md:text-base"
            >
              View Full Experience
            </a>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Technical Skills Card */}
            <a
              href="/skills"
              className={`group relative p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:scale-105 overflow-hidden cursor-pointer ${
                darkMode 
                  ? 'bg-gray-800/80 border-gray-700 hover:border-blue-500' 
                  : 'bg-white/80 border-blue-200 hover:border-blue-400'
              } backdrop-blur-sm`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <FaCode className="text-4xl md:text-5xl mb-3 md:mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-blue-600">Technical Skills</h3>
                <p className={`mb-3 md:mb-4 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>React, TypeScript, Java, and more</p>
                <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2 text-sm md:text-base">Explore</span>
                  <FaExternalLinkAlt className="text-xs md:text-sm" />
                </div>
              </div>
            </a>

            {/* Experience Card */}
            <a
              href="/experience"
              className={`group relative p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:scale-105 overflow-hidden cursor-pointer ${
                darkMode 
                  ? 'bg-gray-800/80 border-gray-700 hover:border-cyan-500' 
                  : 'bg-white/80 border-blue-200 hover:border-cyan-400'
              } backdrop-blur-sm`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <FaBriefcase className="text-4xl md:text-5xl mb-3 md:mb-4 text-cyan-600 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-cyan-600">Experience</h3>
                <p className={`mb-3 md:mb-4 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Software development at P&P Optica</p>
                <div className="flex items-center text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2 text-sm md:text-base">Explore</span>
                  <FaExternalLinkAlt className="text-xs md:text-sm" />
                </div>
              </div>
            </a>

            {/* Projects Card */}
            <a
              href="/projects"
              className={`group relative p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:scale-105 overflow-hidden cursor-pointer ${
                darkMode 
                  ? 'bg-gray-800/80 border-gray-700 hover:border-purple-500' 
                  : 'bg-white/80 border-blue-200 hover:border-purple-400'
              } backdrop-blur-sm`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <FaRocket className="text-4xl md:text-5xl mb-3 md:mb-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-purple-600">Projects</h3>
                <p className={`mb-3 md:mb-4 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full-stack applications and solutions</p>
                <div className="flex items-center text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2 text-sm md:text-base">Explore</span>
                  <FaExternalLinkAlt className="text-xs md:text-sm" />
                </div>
              </div>
            </a>

            {/* Contact Card */}
            <a
              href="/contact"
              className={`group relative p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:scale-105 overflow-hidden cursor-pointer ${
                darkMode 
                  ? 'bg-gray-800/80 border-gray-700 hover:border-pink-500' 
                  : 'bg-white/80 border-blue-200 hover:border-pink-400'
              } backdrop-blur-sm`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <FaComments className="text-4xl md:text-5xl mb-3 md:mb-4 text-pink-600 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-pink-600">Contact</h3>
                <p className={`mb-3 md:mb-4 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available for Summer 2025 Co-op</p>
                <div className="flex items-center text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2 text-sm md:text-base">Explore</span>
                  <FaExternalLinkAlt className="text-xs md:text-sm" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 md:py-12 px-4 sm:px-6 border-t ${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-blue-200'
      } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Aly Sibak
              </h3>
              <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Full-stack developer passionate about creating impactful solutions
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 md:mb-4 text-base md:text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Quick Links
              </h4>
              <div className="space-y-2">
                <a href="/skills" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm md:text-base">Skills</a>
                <a href="/experience" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm md:text-base">Experience</a>
                <a href="/projects" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm md:text-base">Projects</a>
                <a href="/contact" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm md:text-base">Contact</a>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 md:mb-4 text-base md:text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Connect
              </h4>
              <div className="flex space-x-4">
                <a href="https://github.com/alysibak" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FaGithub className="text-xl md:text-2xl" />
                </a>
                <a href="https://linkedin.com/in/aly-sibak-721b85252" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FaLinkedin className="text-xl md:text-2xl" />
                </a>
                <a href="mailto:asibak@uoguelph.ca" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <FaEnvelope className="text-xl md:text-2xl" />
                </a>
              </div>
            </div>
          </div>
          <div className={`mt-6 md:mt-8 pt-6 md:pt-8 border-t text-center ${
            darkMode ? 'border-gray-700 text-gray-400' : 'border-blue-200 text-gray-600'
          }`}>
            <p className="text-xs md:text-sm">Built with React, Next.js, and passion for great UX.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
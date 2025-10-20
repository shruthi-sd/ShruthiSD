'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact', 'askai']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const askAI = async () => {
  if (!aiQuestion.trim()) return;
  
  setIsAiLoading(true);
  setAiAnswer('');
  
  try {
    const response = await fetch('/api/ask-ai', {  // Make sure this path is correct
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: aiQuestion }),
    });
    
    if (!response.ok) {
      // If API route doesn't exist, use local responses
      throw new Error('API route not available');
    }
    
    const data = await response.json();
    setAiAnswer(data.answer);
  } catch (error) {
    console.error('AI Error:', error);
    // Use local responses as fallback
    const questionLower = aiQuestion.toLowerCase();
    let fallbackAnswer = "I'm Shruthi's AI assistant! She's a talented Salesforce Developer with 1.7 years of experience, passionate about full-stack development and creating beautiful websites. ";
    
    if (questionLower.includes('skill')) {
      fallbackAnswer = "Shruthi's skills include Salesforce Development, HTML5/CSS3, JavaScript, React, Apex Programming, and Lightning Web Components. She's also solved 125+ DSA problems!";
    } else if (questionLower.includes('project')) {
      fallbackAnswer = "Shruthi has created XCruise (cruise booking platform) and XProfile (digital identity card). Both showcase her web development skills and are available to view online!";
    } else if (questionLower.includes('experience')) {
      fallbackAnswer = "Shruthi has 1.7 years of professional experience as a Salesforce Developer and is passionate about full-stack web development.";
    } else if (questionLower.includes('contact')) {
      fallbackAnswer = "You can contact Shruthi at shruthisdk@gmail.com or connect on LinkedIn: linkedin.com/in/shruthi-s-d2001";
    }
    
    setAiAnswer(fallbackAnswer);
  } finally {
    setIsAiLoading(false);
  }
};

  const projects = [
    {
      title: "XCruise",
      description: "Modern cruise booking platform with responsive design and elegant user interface.",
      category: "Web Development",
      image: "bg-gradient-to-br from-cyan-500 to-purple-600",
      link: "https://sd-x-cruise.netlify.app/"
    },
    {
      title: "XProfile",
      description: "Digital identity card showcasing modern CSS techniques and clean design principles.",
      category: "Web Design",
      image: "bg-gradient-to-br from-green-500 to-blue-600",
      link: "https://x-sd-profile.netlify.app/"
    }
  ]

  const skills = [
    { name: "Salesforce Development", percentage: 90 },
    { name: "HTML5 & CSS3", percentage: 95 },
    { name: "JavaScript", percentage: 80 },
    { name: "Responsive Design", percentage: 92 },
    { name: "Apex Programming", percentage: 85 },
    { name: "Lightning Web Components", percentage: 88 }
  ]

  const skillCategories = [
    {
      title: "Salesforce",
      skills: ["Apex", "Lightning Web Components", "SOQL", "Salesforce CRM", "Workflow Rules"]
    },
    {
      title: "Frontend",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Bootstrap"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "REST APIs", "VS Code", "Chrome DevTools", "Data Structures & Algorithms"]
    }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleGetInTouch = () => {
    scrollToSection('contact');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Cyber background */}
        <div className="absolute inset-0 binary-rain"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-8 cyber-glow"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-cyan-400 terminal-text"
          >
            Initializing System...
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 binary-rain"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/30 to-gray-900"></div>
        
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 glass-effect border-b border-cyan-500/20"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-cyan-400 cursor-pointer terminal-text"
            >
              Shruthi<span className="text-purple-400">.</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'projects', 'skills', 'contact', 'askai'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ y: -2 }}
                  className={`text-sm font-medium transition-all duration-300 capitalize terminal-text px-4 py-2 rounded-lg ${
                    activeSection === item 
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/50 cyber-glow' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                  }`}
                >
                  {item === 'askai' ? 'Ask AI' : item}
                </motion.button>
              ))}
              <motion.button
                onClick={handleGetInTouch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium cyber-glow hover:shadow-2xl transition-all terminal-text"
              >
                Get In Touch
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-cyan-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`h-0.5 bg-cyan-400 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`h-0.5 bg-cyan-400 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`h-0.5 bg-cyan-400 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-4 border-t border-cyan-500/20 pt-4 glass-effect rounded-lg p-4"
              >
                {['home', 'about', 'projects', 'skills', 'contact', 'askai'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block text-gray-300 hover:text-cyan-400 font-medium transition-colors w-full text-left capitalize terminal-text py-2 px-4 rounded hover:bg-cyan-500/5"
                    whileHover={{ x: 10 }}
                  >
                    {item === 'askai' ? 'Ask AI' : item}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Cyber grid pattern */}
          <div className="absolute inset-0 binary-rain"></div>
          
          {/* Animated orbs */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
         <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent terminal-text"
        >
          Shruthi SD
        </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-cyan-300 mb-8 max-w-3xl mx-auto font-light terminal-text"
          >
            Salesforce Developer & Full Stack Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed terminal-text"
          >
            Currently working as a Salesforce Developer, passionate about creating beautiful websites and digital solutions with modern technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold terminal-text cyber-glow hover:shadow-2xl transition-all text-lg border border-cyan-400/50"
            >
              Explore My Work
            </motion.button>
            <motion.a
              href="/ShruthiResume.pdf"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-bold terminal-text hover:bg-cyan-400 hover:text-gray-900 transition-all text-lg text-center cyber-glow"
              download
            >
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold mb-6 terminal-text"
                >
                  About <span className="text-cyan-400">Me</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-gray-300 mb-6 leading-relaxed terminal-text"
                >
                  I'm currently working as a Salesforce Developer with 1.7 years of experience, and I'm deeply passionate about full-stack development. I love creating efficient, scalable digital solutions that bridge the gap between design and technical implementation.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg text-gray-300 mb-8 leading-relaxed terminal-text"
                >
                  When I'm not developing Salesforce solutions, I'm exploring modern web technologies and building personal projects. I've also solved <strong className="text-green-400">125+ Data Structures & Algorithms problems</strong>, strengthening my problem-solving skills.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-3"
                >
                  {['Salesforce', 'Full Stack', 'Web Development', 'Problem Solving'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium terminal-text border border-cyan-400/30 cyber-glow"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              
              <motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="relative"
>
  <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl w-full aspect-square max-w-md mx-auto shadow-2xl border border-cyan-400/30 cyber-glow backdrop-blur-sm overflow-hidden">
    <img 
      src="/profile.jpeg" 
      alt="Shruthi SD"
      className="w-full h-full object-cover"
    />
  </div>
  {/* Floating cards remain the same */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-6 -left-6 bg-gray-900 rounded-2xl p-6 shadow-xl border border-cyan-400/30 cyber-glow backdrop-blur-sm"
      >
        <div className="text-2xl font-bold text-cyan-400 terminal-text">1.7+</div>
        <div className="text-gray-400 text-sm terminal-text">Years Experience</div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute -top-6 -right-6 bg-gray-900 rounded-2xl p-6 shadow-xl border border-purple-400/30 cyber-glow backdrop-blur-sm"
      >
        <div className="text-2xl font-bold text-purple-400 terminal-text">125+</div>
        <div className="text-gray-400 text-sm terminal-text">DSA Problems</div>
      </motion.div>
    </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 terminal-text">Featured <span className="text-cyan-400">Projects</span></h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto terminal-text">
              A showcase of my personal projects that demonstrate my passion for web development and clean design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-800/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-cyan-400/20 backdrop-blur-sm cyber-glow hover:cyber-glow">
                  <div className={`h-48 ${project.image} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-cyan-500/10 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gray-900/90 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm terminal-text border border-cyan-400/30">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors terminal-text">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed flex-1 terminal-text">
                      {project.description}
                    </p>
                    
                    <motion.a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-cyan-400 font-medium hover:text-cyan-300 transition-colors mt-auto terminal-text"
                    >
                      View Project
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 terminal-text">Skills & <span className="text-cyan-400">Expertise</span></h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto terminal-text">
                Technologies and tools I use to bring ideas to life and solve complex problems.
              </p>
            </div>

            {/* Skills Categories */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-800/50 p-6 rounded-2xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 cyber-glow backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 text-center terminal-text">{category.title}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full cyber-glow"></div>
                        <span className="text-gray-300 text-sm terminal-text">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ask AI Section */}
      <section id="askai" className="py-20 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-gray-900 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 terminal-text">Ask My <span className="text-cyan-400">AI</span></h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto terminal-text">
                Curious about my skills, experience, or projects? Ask anything!
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-3xl p-8 shadow-xl border border-cyan-400/30 cyber-glow backdrop-blur-sm">
              <div className="mb-6">
                <textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask me about my skills, projects, experience, or anything else..."
                  className="w-full h-32 bg-gray-900/50 border border-cyan-400/30 rounded-2xl p-4 text-cyan-400 placeholder-cyan-400/50 resize-none focus:outline-none focus:border-cyan-400 transition-colors terminal-text cyber-glow"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      askAI();
                    }
                  }}
                />
              </div>
              
              <motion.button
                onClick={askAI}
                disabled={isAiLoading || !aiQuestion.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cyber-glow hover:shadow-xl terminal-text"
              >
                {isAiLoading ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                    />
                    Thinking...
                  </div>
                ) : (
                  'Ask AI'
                )}
              </motion.button>

              {aiAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-cyan-500/10 rounded-2xl border border-cyan-400/30 cyber-glow"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 cyber-glow">
                      <span className="text-white text-sm font-bold terminal-text">AI</span>
                    </div>
                    <div>
                      <p className="text-cyan-300 leading-relaxed terminal-text">{aiAnswer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-cyan-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 terminal-text">Let's Create <span className="text-cyan-400">Together</span></h2>
            <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto terminal-text">
              Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: "📧",
                  title: "Email",
                  value: "shruthisdk@gmail.com",
                  link: "mailto:shruthisdk@gmail.com"
                },
                {
                  icon: "💼",
                  title: "LinkedIn", 
                  value: "Connect with me",
                  link: "https://www.linkedin.com/in/shruthi-s-d2001"
                },
                {
                  icon: "🐙",
                  title: "GitHub",
                  value: "View my work",
                  link: "https://github.com/shruthi-sd"
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.title}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-cyan-500/10 transition-all duration-300 border border-cyan-400/20 cyber-glow"
                >
                  <div className="text-2xl mb-3">{contact.icon}</div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2 terminal-text">{contact.title}</h3>
                  <p className="text-gray-300 text-sm terminal-text">{contact.value}</p>
                </motion.a>
              ))}
            </div>

            <motion.a
              href="mailto:shruthisdk@gmail.com"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg cyber-glow hover:shadow-2xl transition-all terminal-text border border-cyan-400/50"
            >
              Start a Conversation
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-cyan-500/20 py-12 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-300 mb-6 md:mb-0 text-center md:text-left"
            >
              <div className="text-2xl font-bold mb-2 terminal-text">Shruthi<span className="text-cyan-400">.</span></div>
              <p className="text-sm terminal-text">Building the future, one line of code at a time.</p>
            </motion.div>
            <div className="flex space-x-6">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shruthi-s-d2001' },
                { name: 'GitHub', url: 'https://github.com/shruthi-sd' },
                { name: 'Email', url: 'mailto:shruthisdk@gmail.com' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm terminal-text"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
          <div className="border-t border-cyan-500/20 mt-8 pt-8 text-center text-gray-400 text-sm terminal-text">
            <p>© 2024 Shruthi SD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
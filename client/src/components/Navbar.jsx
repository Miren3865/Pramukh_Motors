import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import MagneticButton from './MagneticButton'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Inventory', href: '#inventory' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Featured', href: '#featured' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
      setActiveLink(href)
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass glow-border-enhanced' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('#home')}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center"
              animate={{ boxShadow: ['0 0 0px rgba(0, 217, 255, 0)', '0 0 20px rgba(0, 217, 255, 0.6)', '0 0 0px rgba(0, 217, 255, 0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="text-white font-bold text-xl">PM</span>
            </motion.div>
            <motion.span
              className="text-xl font-bold gradient-text"
              animate={{ backgroundPosition: '0% 50%' }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Pramukh Motors
            </motion.span>
          </motion.div>

          {/* Desktop Menu with Enhanced Animations */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.08, color: '#00D9FF' }}
                onClick={() => scrollToSection(link.href)}
                className={`relative font-medium transition-colors ${
                  activeLink === link.href ? 'text-neon-blue' : 'text-white'
                }`}
              >
                {link.name}
                
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"
                  initial={{ width: activeLink === link.href ? '100%' : '0%' }}
                  whileHover={{ width: '100%' }}
                  animate={{ width: activeLink === link.href ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-r from-neon-blue to-neon-purple blur-md opacity-0"
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>

          {/* CTA Button removed per request */}

          {/* Mobile Menu Button with Enhanced Animation */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neon-blue relative"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
            {!isOpen && (
              <motion.div
                className="absolute inset-0 border-2 border-neon-blue rounded-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <motion.div
            className="flex flex-col gap-4 py-6 px-4 glass-dark mt-2 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className={`relative text-left font-medium transition-colors ${
                  activeLink === link.href ? 'text-neon-blue' : 'text-white'
                }`}
                whileHover={{ x: 4, color: '#00D9FF' }}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                {link.name}
                {activeLink === link.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"
                    layoutId="mobile-indicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            {/* Mobile CTA removed per request */}
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar

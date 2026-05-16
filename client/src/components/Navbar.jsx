import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

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
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary-bg/95 backdrop-blur-md border-b border-border-light shadow-luxury' : 'bg-transparent'
        }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <div className="w-10 h-10 border border-gold-accent rounded-sm flex items-center justify-center bg-primary-bg">
              <span className="text-gold-accent font-bold text-xl font-sans tracking-wider">PM</span>
            </div>
            <span className="text-xl font-bold text-text-primary tracking-wide">
              Pramukh <span className="text-gold-accent">Motors</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                whileHover={{ color: '#D4AF37' }}
                onClick={() => scrollToSection(link.href)}
                className={`relative font-medium transition-colors text-sm uppercase tracking-wider ${activeLink === link.href ? 'text-gold-accent' : 'text-text-secondary'
                  }`}
              >
                {link.name}

                {/* Animated underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-gold-accent"
                  initial={{ width: activeLink === link.href ? '100%' : '0%' }}
                  whileHover={{ width: '100%' }}
                  animate={{ width: activeLink === link.href ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-secondary hover:text-gold-accent transition-colors"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <motion.div
            className="flex flex-col gap-4 py-6 px-4 bg-primary-bg border border-border-light mt-2 rounded-sm shadow-luxury"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className={`relative text-left font-medium transition-colors uppercase tracking-wider text-sm ${activeLink === link.href ? 'text-gold-accent' : 'text-text-secondary'
                  }`}
                whileHover={{ x: 4, color: '#D4AF37' }}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                {link.name}
                {activeLink === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-[1px] bg-gold-accent"
                    layoutId="mobile-indicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar

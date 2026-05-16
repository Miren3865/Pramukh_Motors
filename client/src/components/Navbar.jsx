import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ hideLinks = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const navLinksRef = useRef([])
  const navContainerRef = useRef(null)
  const indicatorRef = useRef(null)
  
  const location = useLocation()
  const navigate = useNavigate()

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

  useEffect(() => {
    // Intersection Observer to detect active section
    if (typeof window === 'undefined') return

    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    if (!sections.length) return

    const onIntersect = (entries) => {
      // If we're at the very top, always set to home
      if (window.scrollY < 100) {
        setActiveLink('#home')
        return
      }

      // Find all sections that are currently intersecting
      const visibleSections = sections.filter(s => {
        const rect = s.getBoundingClientRect()
        // A section is active if it's in the top half of the viewport
        return rect.top < 400 && rect.bottom > 80
      })

      if (visibleSections.length > 0) {
        // Pick the one that is highest in the viewport among visible ones
        // Usually the last one in the DOM that has entered the "top" area
        const activeSection = visibleSections[visibleSections.length - 1]
        setActiveLink(`#${activeSection.id}`)
      }
    }

    const observer = new IntersectionObserver(onIntersect, {
      threshold: [0, 0.1, 0.2, 0.5, 0.8, 1], 
      rootMargin: '-80px 0px -50% 0px', 
    })

    sections.forEach((s) => observer.observe(s))

    // Handle scroll to top manually to ensure Home is highlighted
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveLink('#home')
      }
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    const handleResize = () => updateIndicatorForHref(activeLink)
    window.addEventListener('resize', handleResize)

    // initial placement
    setTimeout(() => updateIndicatorForHref(activeLink), 100)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // whenever activeLink changes, move the indicator
    updateIndicatorForHref(activeLink)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLink])

  const scrollToSection = (href) => {
    // Close mobile menu first
    setIsOpen(false)
    
    // Give time for layout to settle before scrolling
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        setActiveLink(href)
        // update indicator for desktop if visible
        if (window.innerWidth >= 768) {
          updateIndicatorForHref(href)
        }
      }
    }, 300)
  }

  const updateIndicatorForHref = (href) => {
    const index = navLinks.findIndex((l) => l.href === href)
    if (index === -1) return
    const el = navLinksRef.current[index]
    const container = navContainerRef.current
    const indicator = indicatorRef.current
    if (!el || !container || !indicator) return

    const elRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const left = elRect.left - containerRect.left
    const width = elRect.width

    // Apply transform and width with smooth easing
    indicator.style.transform = `translateX(${left}px)`
    indicator.style.width = `${width}px`
    indicator.style.opacity = '1'
  }

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      scrollToSection('#home')
    } else {
      navigate('/')
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
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 border border-gold-accent rounded-sm flex items-center justify-center bg-primary-bg">
              <span className="text-gold-accent font-bold text-xl font-sans tracking-wider">PM</span>
            </div>
            <span className="text-xl font-bold text-text-primary tracking-wide">
              Pramukh <span className="text-gold-accent">Motors</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          {!hideLinks && (
            <>
              <div
                ref={navContainerRef}
                className="hidden md:flex items-center gap-8 relative"
              >
                {navLinks.map((link, index) => (
                  <motion.button
                    key={index}
                    ref={(el) => (navLinksRef.current[index] = el)}
                    whileHover={{ color: '#D4AF37' }}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative font-medium transition-colors text-sm uppercase tracking-wider ${activeLink === link.href ? 'text-gold-accent' : 'text-text-secondary'
                      }`}
                  >
                    {link.name}
                  </motion.button>
                ))}

                {/* Sliding underline indicator */}
                <span
                  ref={indicatorRef}
                  className="absolute bottom-0 left-0 h-[2px] bg-gold-accent rounded"
                  style={{
                    width: 0,
                    transform: 'translateX(0px)',
                    transition: 'transform 400ms cubic-bezier(0.4,0,0.2,1), width 400ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease-in-out',
                    opacity: 0,
                  }}
                />
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
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {!hideLinks && (
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
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar

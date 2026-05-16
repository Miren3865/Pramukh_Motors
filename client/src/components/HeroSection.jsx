import React from 'react'
import { motion } from 'framer-motion'

const luxuryEase = [0.16, 1, 0.3, 1]

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Cinematic Timeline Variants
  const lineVariant = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: 60, opacity: 1, transition: { duration: 1.5, ease: luxuryEase, delay: 0.2 } }
  }

  const word1Variant = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.5, ease: luxuryEase, delay: 0.6 } }
  }

  const word2Variant = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.5, ease: luxuryEase, delay: 1.0 } }
  }

  const word3Variant = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.5, ease: luxuryEase, delay: 1.4 } }
  }

  const subtitleVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: luxuryEase, delay: 2.0 } }
  }

  const card1Variant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: luxuryEase, delay: 2.4 } }
  }

  const card2Variant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: luxuryEase, delay: 2.6 } }
  }

  const card3Variant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: luxuryEase, delay: 2.8 } }
  }

  const button1Variant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: luxuryEase, delay: 3.2 } }
  }

  const button2Variant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: luxuryEase, delay: 3.4 } }
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Light Luxury Background */}
      <div className="absolute inset-0 bg-primary-bg -z-10">
        {/* Subtle grid pattern for texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="container-custom z-10 text-center relative px-4">
        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Subtle Accent Line */}
          <motion.div
            variants={lineVariant}
            className="h-[2px] bg-gold-accent mb-8"
          />

          {/* Main Heading */}
          <div className="mb-6 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight flex flex-wrap justify-center gap-x-4 md:gap-x-6 mb-2">
              <motion.span variants={word1Variant} className="text-text-primary">
                Drive
              </motion.span>
              <motion.span variants={word2Variant} className="text-gold-accent font-serif italic font-medium">
                Confidence.
              </motion.span>
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              <motion.span variants={word3Variant} className="block text-text-primary">
                Own Value.
              </motion.span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariant}
            className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Experience the epitome of automotive excellence. Discover our curated collection of premium pre-owned vehicles, rigorously inspected for uncompromising quality and performance.
          </motion.p>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto text-center w-full">
            <motion.div
              variants={card1Variant}
              whileHover={{ y: -4, transition: { duration: 0.4, ease: luxuryEase } }}
              className="p-6 border border-border-light rounded-sm bg-primary-bg transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gold-accent mb-2">Curated Selection</p>
              <p className="text-text-primary text-lg font-medium">Premium Inventory</p>
            </motion.div>

            <motion.div
              variants={card2Variant}
              whileHover={{ y: -4, transition: { duration: 0.4, ease: luxuryEase } }}
              className="p-6 border border-border-light rounded-sm bg-primary-bg transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gold-accent mb-2">Transparent Value</p>
              <p className="text-text-primary text-lg font-medium">Exceptional Pricing</p>
            </motion.div>

            <motion.div
              variants={card3Variant}
              whileHover={{ y: -4, transition: { duration: 0.4, ease: luxuryEase } }}
              className="p-6 border border-border-light rounded-sm bg-primary-bg transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gold-accent mb-2">Uncompromised</p>
              <p className="text-text-primary text-lg font-medium">Quality Assured</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              variants={button1Variant}
              whileHover={{ scale: 1.01, borderColor: '#D4AF37', color: '#D4AF37' }}
              onClick={() => scrollToSection('#inventory')}
              className="btn-secondary w-full sm:w-auto uppercase tracking-wider text-sm"
              style={{ transition: 'border-color 0.4s ease, color 0.4s ease' }}
            >
              Explore Collection
            </motion.button>

            <motion.button
              variants={button2Variant}
              whileHover={{ scale: 1.01, borderColor: '#D4AF37', color: '#D4AF37' }}
              onClick={() => scrollToSection('#contact')}
              className="btn-secondary w-full sm:w-auto uppercase tracking-wider text-sm"
              style={{ transition: 'border-color 0.4s ease, color 0.4s ease' }}
            >
              Contact Concierge
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

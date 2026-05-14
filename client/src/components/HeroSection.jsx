import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, charRevealContainer, charReveal, badgeFloat } from '../animations/variants'
import MagneticButton from './MagneticButton'

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-neon-blue rounded-full"
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
      }}
      animate={{
        y: window.innerHeight + 100,
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: Math.random() * 0.5,
      }}
    />
  ))

  // Light rays animation
  const lightRays = Array.from({ length: 3 }, (_, i) => (
    <motion.div
      key={`ray-${i}`}
      className="absolute inset-0 opacity-0 pointer-events-none"
      style={{
        background: `linear-gradient(45deg, transparent, rgba(0, 217, 255, 0.3), transparent)`,
        transform: `rotate(${i * 60}deg)`,
      }}
      animate={{
        opacity: [0, 0.4, 0],
        transform: [`rotate(${i * 60}deg)`, `rotate(${i * 60 + 45}deg)`],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: i * 1.3,
      }}
    />
  ))

  // Character array for reveal effect
  const heading1 = "Drive Dreams."
  const heading2 = "Own Prestige."

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg -z-10">
        {/* Floating Gradients */}
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-neon-blue opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-blue opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Light rays */}
        {lightRays}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {particles}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 -z-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="container-custom z-10 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge with Enhanced Animation */}
          <motion.div
            variants={badgeFloat}
            initial="initial"
            animate="animate"
            className="inline-block mb-8"
          >
            <motion.div
              className="glass-dark px-6 py-3 rounded-full border border-neon-blue/30"
              whileHover={{
                borderColor: 'rgba(0, 217, 255, 0.8)',
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)',
              }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-neon-blue text-sm font-semibold">
                ✨ Premium Luxury Cars Await
              </p>
            </motion.div>
          </motion.div>

          {/* Main Heading with Character Reveal */}
          <motion.div
            variants={charRevealContainer}
            initial="hidden"
            animate="visible"
            className="mb-6 perspective"
          >
            <h1 className="text-6xl md:text-8xl font-bold font-playfair mb-4 leading-tight">
              <motion.div className="inline-block overflow-hidden">
                <motion.span variants={charRevealContainer} initial="hidden" animate="visible">
                  {heading1.split('').map((char, i) => (
                    <motion.span
                      key={`char-${i}-1`}
                      variants={charReveal}
                      className="inline-block"
                      style={{
                        background: i % 2 === 0 ? 'linear-gradient(120deg, #c9a962, #00d9ff)' : 'linear-gradient(120deg, #00d9ff, #9d7dff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.3))',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.div>
              <br />
              <span className="text-white">Own Prestige.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the pinnacle of luxury automotive excellence. Discover
            hand-picked, certified pre-owned vehicles from the world's most
            prestigious brands.
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton
              variant="primary"
              onClick={() => scrollToSection('#inventory')}
              className="text-lg px-8 py-4 font-bold"
            >
              Explore Cars
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={() => scrollToSection('#contact')}
              className="text-lg px-8 py-4 font-bold"
            >
              Sell Your Car
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
      </div>
    </section>
  )
}

export default HeroSection

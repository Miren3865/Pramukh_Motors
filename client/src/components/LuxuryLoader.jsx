import React from 'react'
import { motion } from 'framer-motion'

const luxuryLoaderVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const barVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const LuxuryLoader = ({ message = 'Loading Vehicle Experience' }) => {
  return (
    <motion.div
      variants={luxuryLoaderVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      <div className="flex flex-col items-center w-full max-w-xs px-6">
        {/* Animated Logo / Icon Placeholder */}
        <motion.div 
          className="w-16 h-16 border-2 border-gold-accent/30 rounded-sm mb-8 flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-gold-accent/10" />
          <motion.div 
            className="w-6 h-6 border-t-2 border-l-2 border-gold-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Minimal Typography */}
        <motion.p
          variants={textVariants}
          className="text-gold-accent text-xs uppercase tracking-[0.3em] mb-4 text-center"
        >
          {message}
        </motion.p>

        {/* Smooth Loading Bar */}
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            variants={barVariants}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-accent/40 via-gold-accent to-gold-accent/40 w-full origin-left"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default LuxuryLoader

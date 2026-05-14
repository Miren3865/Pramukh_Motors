import React from 'react'
import { motion } from 'framer-motion'

const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-dark-bg to-dark-card flex items-center justify-center z-50"
    >
      <div className="relative w-32 h-32">
        {/* Animated Circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border-4 border-transparent border-t-neon-blue border-r-neon-blue rounded-full"
        ></motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 border-4 border-transparent border-b-neon-purple rounded-full"
        ></motion.div>

        {/* Center Logo */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute bottom-20 text-neon-blue text-lg font-bold"
      >
        Loading Luxury Experience...
      </motion.p>
    </motion.div>
  )
}

export default PageLoader

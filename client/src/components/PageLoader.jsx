import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PageLoader = () => {
  const [textIndex, setTextIndex] = useState(0)

  const loadingTexts = [
    "WELCOME TO PRAMUKH MOTORS",
    "LOADING LUXURY EXPERIENCE",
    "ENTER THE EXECUTIVE PORTAL"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 bg-primary-bg flex flex-col items-center justify-center z-[100] overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-8">

        {/* Cinematic Main Brand Text */}
        <div className="overflow-hidden mb-12 py-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 text-3xl md:text-5xl font-bold text-text-primary uppercase"
          >
            <motion.span
              initial={{ letterSpacing: "0.05em" }}
              animate={{ letterSpacing: "0.2em" }}
              transition={{ duration: 7, ease: "easeOut" }}
            >
              Pramukh
            </motion.span>
            <span className="text-gold-accent font-serif italic normal-case font-medium">Motors</span>
          </motion.h1>
        </div>

        {/* Global Progress Line */}
        <div className="w-40 h-[1px] bg-border-light relative overflow-hidden mb-10">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gold-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
          ></motion.div>
        </div>

        {/* Shifting Subtext */}
        <div className="h-6 flex items-center justify-center overflow-hidden w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, filter: "blur(4px)", y: 5 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(4px)", y: -5 }}
              transition={{ duration: 0.8 }}
              className="text-text-secondary text-sm md:text-base uppercase tracking-[0.3em] font-light text-center"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  )
}

export default PageLoader

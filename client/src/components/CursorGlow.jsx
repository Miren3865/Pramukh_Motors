import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      animate={{ x: position.x - 50, y: position.y - 50 }}
      transition={{ type: 'spring', damping: 30, mass: 0.2, stiffness: 100 }}
      className="fixed w-24 h-24 pointer-events-none z-50 hidden lg:block"
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple opacity-20 blur-3xl"></div>
    </motion.div>
  )
}

export default CursorGlow

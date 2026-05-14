import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/18001234567"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-shadow cursor-pointer hover:shadow-neon-blue/50">
        <MessageCircle size={28} />
      </div>

      {/* Pulse Animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 rounded-full border-2 border-neon-blue opacity-50"
      ></motion.div>
    </motion.a>
  )
}

export default WhatsAppButton

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
      <div className="w-16 h-16 bg-primary-bg border border-border-light rounded-sm flex items-center justify-center text-text-secondary shadow-luxury hover:border-gold-accent hover:text-gold-accent transition-all cursor-pointer">
        <MessageCircle size={24} />
      </div>

      {/* Pulse Animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 rounded-sm border border-gold-accent/50 opacity-0"
      ></motion.div>
    </motion.a>
  )
}

export default WhatsAppButton

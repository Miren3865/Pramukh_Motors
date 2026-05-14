import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Gauge, Settings, Fuel, DollarSign, Star } from 'lucide-react'

const CarDetailModal = ({ car, isOpen, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const specs = [
    { icon: Fuel, label: 'Fuel Type', value: car?.fuel, color: 'text-yellow-400' },
    { icon: Gauge, label: 'Mileage', value: `${car?.mileage.toLocaleString()} km`, color: 'text-cyan-400' },
    { icon: Settings, label: 'Transmission', value: car?.transmission, color: 'text-purple-400' },
    { icon: Zap, label: 'Year', value: car?.year, color: 'text-green-400' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              className="glass-dark rounded-2xl border border-neon-blue/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background orbs */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-neon-blue opacity-5 rounded-full blur-3xl"
                animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ pointerEvents: 'none' }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple opacity-5 rounded-full blur-3xl"
                animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ pointerEvents: 'none' }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 bg-neon-purple/20 hover:bg-neon-purple/40 rounded-full flex items-center justify-center transition-colors z-20 border border-neon-purple/40"
                >
                  <X size={20} className="text-neon-purple" />
                </motion.button>

                {/* Car Image Section */}
                <motion.div
                  variants={itemVariants}
                  className="relative h-80 bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent flex items-center justify-center overflow-hidden rounded-t-2xl"
                >
                  <div className="text-center">
                    <motion.div
                      className="w-32 h-32 mx-auto mb-6 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple opacity-40"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <p className="text-gray-400 text-sm">Premium Car Image</p>
                  </div>

                  {/* Premium Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute top-6 left-6 flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 rounded-full"
                  >
                    <Star size={16} className="text-yellow-300" />
                    <span className="text-sm font-bold text-white">Premium Selection</span>
                  </motion.div>
                </motion.div>

                {/* Details Section */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-8"
                >
                  {/* Header */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-4xl font-bold text-white mb-2">{car?.name}</h2>
                    <p className="text-neon-blue font-semibold text-lg">{car?.year}</p>
                  </motion.div>

                  {/* Luxury Divider */}
                  <motion.div
                    variants={itemVariants}
                    className="luxury-divider mb-8"
                  />

                  {/* Price Highlight */}
                  <motion.div
                    variants={itemVariants}
                    className="mb-8 glass p-6 rounded-xl border border-neon-blue/30 hover:border-neon-blue/60 transition-all"
                    whileHover={{
                      boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)',
                      scale: 1.02,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="text-neon-blue" size={28} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Price</p>
                        <p className="text-3xl font-bold text-neon-blue">
                          ${(car?.price / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Specifications Grid */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {specs.map((spec, i) => {
                        const Icon = spec.icon
                        return (
                          <motion.div
                            key={i}
                            className="glass p-4 rounded-xl border border-neon-blue/20 hover:border-neon-blue/60 transition-all"
                            whileHover={{
                              y: -8,
                              boxShadow: '0 12px 24px rgba(0, 217, 255, 0.2)',
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.4 }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className={`${spec.color}`} size={20} />
                              <p className="text-gray-400 text-xs font-medium">{spec.label}</p>
                            </div>
                            <p className="text-white font-semibold text-lg">{spec.value}</p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>

                  {/* Additional Info */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Features & Benefits</h3>
                    <motion.div
                      className="grid grid-cols-1 gap-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {[
                        '🔒 Full Service History Available',
                        '✨ Professional Detailing Included',
                        '🛡️ Extended Warranty Option',
                        '🚗 Pre-Purchase Inspection Completed',
                      ].map((feature, i) => (
                        <motion.div
                          key={i}
                          className="glass p-3 rounded-lg border border-neon-blue/20 hover:border-neon-blue/40 transition-all flex items-center gap-3"
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                        >
                          <div className="w-1 h-1 rounded-full bg-neon-blue" />
                          <p className="text-gray-300 text-sm">{feature}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="flex-1 btn-primary py-3 font-bold rounded-lg"
                    >
                      Reserve This Car
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="flex-1 btn-secondary py-3 font-bold rounded-lg"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CarDetailModal

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Eye, Sparkles } from 'lucide-react'
import { itemVariants, card3D, glowHover } from '../animations/variants'
import MagneticButton from './MagneticButton'
import CarDetailModal from './CarDetailModal'

const CarCard = ({ car, index, onCarReserved }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isReserved = car?.status === 'reserved'
  const isSold = car?.status === 'sold'
  const isUnavailable = isReserved || isSold

  const handleViewDetails = () => {
    if (isUnavailable) return
    setIsModalOpen(true)
  }

  return (
    <motion.div
      variants={itemVariants}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        scale={1.08}
        transitionSpeed={450}
        className="h-full card-3d"
      >
        <motion.div 
          className="glass-dark rounded-xl overflow-hidden h-full flex flex-col border border-neon-blue/20 hover:border-neon-blue/60 transition-all group relative"
          variants={card3D}
          initial="hidden"
          whileInView="visible"
          whileHover="whileHover"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Light Ray Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), transparent)',
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 500 }}
              transition={{ duration: 1.5 }}
            />
          )}

          {/* Car Image */}
          <div className="relative overflow-hidden h-64 bg-gradient-to-b from-dark-bg to-dark-card">
            {car.imageUrl || car.thumbnailImage ? (
              <motion.img
                src={car.thumbnailImage || car.imageUrl}
                alt={car.name}
                className="w-full h-full object-cover"
                animate={isHovered ? { scale: 1.1, filter: 'brightness(1.1)' } : { scale: 1, filter: 'brightness(1)' }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <motion.div
                className="w-full h-full bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent flex items-center justify-center"
                animate={isHovered ? { scale: 1.1, filter: 'brightness(1.1)' } : { scale: 1, filter: 'brightness(1)' }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-center"
                  animate={isHovered ? { scale: 1.15, rotate: 10 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="w-24 h-24 mx-auto mb-4 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple opacity-30"
                    animate={isHovered ? { boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' } : { boxShadow: '0 0 0px rgba(0, 217, 255, 0)' }}
                    transition={{ duration: 0.4 }}
                  />
                  <p className="text-gray-400 text-sm">Luxury Car Image</p>
                </motion.div>
              </motion.div>
            )}

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent"
              animate={{ opacity: isHovered ? 0.8 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Enhanced Glow Border */}
            <motion.div
              className="absolute inset-0 border-2 border-neon-blue/40 rounded-t-xl"
              animate={isHovered ? { boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), inset 0 0 20px rgba(0, 217, 255, 0.2)' } : { boxShadow: '0 0 0px rgba(0, 217, 255, 0)' }}
              transition={{ duration: 0.4 }}
              style={{ pointerEvents: 'none' }}
            />

            {/* Premium Badge */}
            {isHovered && (
              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-center gap-1 bg-gradient-to-r from-neon-blue to-neon-purple px-3 py-2 rounded-full glass-dark border border-neon-blue/60">
                  <Sparkles size={14} className="text-neon-blue" />
                  <span className="text-xs font-bold text-white">Premium</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Car Info */}
            <motion.div
              className="mb-4"
              animate={isHovered ? { y: -2 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-2xl font-bold text-white mb-2"
                animate={isHovered ? { color: 'rgba(0, 217, 255, 1)' } : { color: 'rgba(255, 255, 255, 1)' }}
                transition={{ duration: 0.3 }}
              >
                {car.name}
              </motion.h3>
              <motion.p
                className="text-neon-blue font-semibold"
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {car.year}
              </motion.p>
            </motion.div>

            {/* Specs with Stagger Animation */}
            <motion.div
              className="grid grid-cols-2 gap-3 mb-6 text-sm"
              animate={isHovered ? { y: -2 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[
                { label: 'Fuel Type', value: car.fuel },
                { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
                { label: 'Transmission', value: car.transmission },
                { label: 'Price', value: `₹${car.price?.toLocaleString()}`, highlight: true },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  className={`glass p-3 rounded-lg border border-neon-blue/20 hover:border-neon-blue/60 transition-all ${
                    spec.highlight ? 'bg-neon-blue/10' : ''
                  }`}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 8px 20px rgba(0, 217, 255, 0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-400 text-xs mb-1">{spec.label}</p>
                  <motion.p
                    className={`font-semibold ${spec.highlight ? 'text-neon-blue' : 'text-white'}`}
                    animate={isHovered && spec.highlight ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {spec.value}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div
              className="mt-auto"
              animate={isHovered ? { y: -4 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
                  {isUnavailable ? (
                    <button
                      type="button"
                      disabled
                      className="w-full rounded-lg py-3 text-sm font-bold bg-gray-700 text-gray-300 cursor-not-allowed"
                    >
                      {isReserved ? 'This car is already reserved' : 'This car is already sold'}
                    </button>
                  ) : (
                    <MagneticButton
                      variant="primary"
                      onClick={handleViewDetails}
                      className="w-full flex items-center justify-center gap-2 text-sm font-bold"
                    >
                      <Eye size={18} />
                      View Details
                    </MagneticButton>
                  )}
            </motion.div>
          </div>

          {/* Corner Accent Glow */}
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full blur-3xl opacity-0 pointer-events-none"
            animate={isHovered ? { opacity: 0.15 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </Tilt>

      {/* Car Detail Modal */}
      <CarDetailModal
        car={car}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReserved={onCarReserved}
      />
    </motion.div>
  )
}

export default CarCard

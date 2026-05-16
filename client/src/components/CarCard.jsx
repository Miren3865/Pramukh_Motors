import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import { Eye, Sparkles } from 'lucide-react'
import { itemVariants, card3D } from '../animations/variants'

const CarCard = ({ car, index, onCarReserved }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const isReserved = car?.status === 'reserved'
  const isSold = car?.status === 'sold'
  const isUnavailable = isReserved || isSold

  const toSlug = (value) =>
    String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const handleViewDetails = () => {
    if (isUnavailable) return
    const slug = toSlug(car?.name) || car?._id
    navigate(`/car/${slug}`, { state: { car } })
  }

  return (
    <motion.div
      variants={itemVariants}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        scale={1.02}
        transitionSpeed={450}
        className="h-full"
      >
        <motion.div 
          className="bg-card-bg rounded-sm overflow-hidden h-full flex flex-col border border-border-light hover:border-gold-accent/50 transition-all duration-500 group relative"
          variants={card3D}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Car Image */}
          <div className="relative overflow-hidden h-64 bg-secondary-bg">
            {car.imageUrl || car.thumbnailImage ? (
              <motion.img
                src={car.thumbnailImage || car.imageUrl}
                alt={car.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              />
            ) : (
              <div className="w-full h-full bg-secondary-bg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border border-border-light rounded-sm bg-primary-bg" />
                  <p className="text-text-secondary text-xs uppercase tracking-widest">Image Unavailable</p>
                </div>
              </div>
            )}

            {/* Dark Gradient Overlay for Luxury Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-80" />

            {/* Premium Badge */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-1.5 bg-primary-bg/90 backdrop-blur-sm px-3 py-1.5 border border-gold-accent/30 rounded-sm">
                    <Sparkles size={12} className="text-gold-accent" />
                    <span className="text-[10px] font-bold text-gold-accent uppercase tracking-wider">Premium</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Car Info */}
            <div className="mb-6 border-b border-border-light pb-4">
              <h3 className="text-xl font-bold text-text-primary mb-1 tracking-tight">
                {car.name}
              </h3>
              <p className="text-gold-accent text-sm font-medium tracking-wide">
                {car.year}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
              {[
                { label: 'Fuel Type', value: car.fuel },
                { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
                { label: 'Transmission', value: car.transmission },
                { label: 'Price', value: `₹${car.price?.toLocaleString()}`, highlight: true },
              ].map((spec, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-sm border transition-colors ${
                    spec.highlight 
                      ? 'bg-gold-accent/5 border-gold-accent/30' 
                      : 'bg-secondary-bg/50 border-border-light'
                  }`}
                >
                  <p className="text-text-secondary text-[10px] uppercase tracking-wider mb-1">{spec.label}</p>
                  <p className={`font-semibold ${spec.highlight ? 'text-gold-accent text-lg' : 'text-text-primary text-sm'}`}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-auto">
              {isUnavailable ? (
                <button
                  type="button"
                  disabled
                  className="w-full rounded-sm py-3 text-xs uppercase tracking-widest font-bold bg-secondary-bg text-text-secondary border border-border-light cursor-not-allowed"
                >
                  {isReserved ? 'Reserved' : 'Sold'}
                </button>
              ) : (
                <button
                  onClick={handleViewDetails}
                  className="w-full btn-secondary flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                >
                  <Eye size={16} />
                  View Details
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  )
}

export default CarCard

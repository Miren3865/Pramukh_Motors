import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CarCard from './CarCard'
import { getAllCars } from '../services/api'
import { containerVariants, lineVariant, textRevealVariant, subtitleVariant } from '../animations/variants'

const FeaturedCarsSection = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCars = async () => {
    try {
      const result = await getAllCars()
      setCars(result.data || [])
    } catch (error) {
      console.error('Failed to load featured cars:', error)
      setCars([])
    } finally {
      setLoading(false)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    fetchCars()
  }, [])

  return (
    <section id="inventory" className="section-padding bg-secondary-bg relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.1 }
            }
          }}
          className="text-center mb-16"
        >
          {/* Luxury Divider Top */}
          <motion.div
            variants={lineVariant}
            className="h-[2px] bg-gold-accent mx-auto mb-6"
          />

          <motion.h2
            variants={textRevealVariant}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-text-primary"
          >
            Featured <span className="text-gold-accent font-serif italic font-medium">Inventory</span>
          </motion.h2>

          <motion.p
            variants={subtitleVariant}
            className="text-text-secondary text-base max-w-2xl mx-auto font-light leading-relaxed"
          >
            Curated selection of premium luxury vehicles, handpicked and verified for uncompromised excellence.
          </motion.p>
        </motion.div>

        {/* Cars Grid */}
        {loading ? (
          <div className="mb-12 text-center text-text-secondary font-light">Loading premium inventory...</div>
        ) : cars.filter((car) => car.showOnUser).length === 0 ? (
          <div className="mb-12 text-center text-text-secondary font-light">No featured vehicles are available right now. Please consult our concierge.</div>
        ) : (
          <motion.div
            id="inventory-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {cars.filter((car) => car.showOnUser).slice(0, 6).map((car, index) => (
              <CarCard key={car._id || car.id} car={car} index={index} onCarReserved={fetchCars} />
            ))}
          </motion.div>
        )}

        {/* Browse All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.01, borderColor: '#D4AF37', color: '#D4AF37' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="btn-secondary text-sm uppercase tracking-widest px-8"
            onClick={() => navigate('/cars')}
          >
            View Complete Collection
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCarsSection

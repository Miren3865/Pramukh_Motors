import React from 'react'
import { motion } from 'framer-motion'
import CarCard from './CarCard'
import MagneticButton from './MagneticButton'
import { containerVariants, charRevealContainer, charReveal } from '../animations/variants'

const FeaturedCarsSection = () => {
  const cars = [
    {
      id: 1,
      name: 'BMW 7 Series',
      year: 2023,
      fuel: 'Hybrid',
      mileage: 15000,
      transmission: 'Automatic',
      price: 125000,
    },
    {
      id: 2,
      name: 'Mercedes-Benz S-Class',
      year: 2023,
      fuel: 'Diesel',
      mileage: 20000,
      transmission: 'Automatic',
      price: 140000,
    },
    {
      id: 3,
      name: 'Audi A8',
      year: 2022,
      fuel: 'Petrol',
      mileage: 30000,
      transmission: 'Automatic',
      price: 110000,
    },
    {
      id: 4,
      name: 'Lamborghini Urus',
      year: 2023,
      fuel: 'Petrol',
      mileage: 10000,
      transmission: 'Automatic',
      price: 220000,
    },
    {
      id: 5,
      name: 'Porsche 911',
      year: 2022,
      fuel: 'Petrol',
      mileage: 25000,
      transmission: 'Automatic',
      price: 150000,
    },
    {
      id: 6,
      name: 'Range Rover Sport',
      year: 2023,
      fuel: 'Diesel',
      mileage: 18000,
      transmission: 'Automatic',
      price: 95000,
    },
  ]

  const heading = "Featured Inventory"

  return (
    <section id="inventory" className="section-padding bg-gradient-to-b from-dark-bg to-dark-card relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-10 left-1/4 w-80 h-80 bg-neon-blue opacity-5 rounded-full blur-3xl"
        animate={{ y: [-30, 30, -30], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        className="absolute bottom-10 right-1/4 w-80 h-80 bg-neon-purple opacity-5 rounded-full blur-3xl"
        animate={{ y: [30, -30, 30], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ pointerEvents: 'none' }}
      />

      <div className="container-custom relative z-10">
        {/* Header with Character Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Luxury Divider Top */}
          <motion.div
            className="luxury-divider mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            variants={charRevealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block overflow-hidden">
              {heading.split('').map((char, i) => (
                <motion.span
                  key={`char-${i}`}
                  variants={charReveal}
                  className="inline-block"
                  style={{
                    background: i % 3 === 0 ? 'linear-gradient(120deg, #c9a962, #00d9ff)' : 
                                i % 3 === 1 ? 'linear-gradient(120deg, #00d9ff, #9d7dff)' :
                                'linear-gradient(120deg, #c000ff, #c9a962)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Curated selection of premium luxury vehicles, handpicked and verified for excellence
          </motion.p>

          {/* Luxury Divider Bottom */}
          <motion.div
            className="luxury-divider mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Cars Grid with Enhanced Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </motion.div>

        {/* Browse All Button with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <MagneticButton
            variant="secondary"
            className="text-lg px-10 py-4 font-bold"
          >
            View All Cars →
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCarsSection

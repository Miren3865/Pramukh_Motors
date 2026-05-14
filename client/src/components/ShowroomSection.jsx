import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { itemVariants, containerVariants } from '../animations/variants'

const ShowroomSection = () => {
  const [carsSold, setCarsSold] = useState(0)
  const [customers, setCustomers] = useState(0)
  const [experience, setExperience] = useState(0)
  const [dealers, setDealers] = useState(0)

  const targetValues = {
    carsSold: 5420,
    customers: 12800,
    experience: 25,
    dealers: 180,
  }

  useEffect(() => {
    const intervals = {
      carsSold: setInterval(() => {
        setCarsSold((prev) => (prev < targetValues.carsSold ? prev + 100 : targetValues.carsSold))
      }, 50),
      customers: setInterval(() => {
        setCustomers((prev) => (prev < targetValues.customers ? prev + 150 : targetValues.customers))
      }, 50),
      experience: setInterval(() => {
        setExperience((prev) => (prev < targetValues.experience ? prev + 0.5 : targetValues.experience))
      }, 50),
      dealers: setInterval(() => {
        setDealers((prev) => (prev < targetValues.dealers ? prev + 3 : targetValues.dealers))
      }, 50),
    }

    return () => {
      clearInterval(intervals.carsSold)
      clearInterval(intervals.customers)
      clearInterval(intervals.experience)
      clearInterval(intervals.dealers)
    }
  }, [])

  const stats = [
    { label: 'Cars Sold', value: carsSold.toLocaleString(), icon: '🚗' },
    { label: 'Happy Customers', value: customers.toLocaleString(), icon: '😊' },
    { label: 'Years Experience', value: Math.floor(experience), icon: '⏱️' },
    { label: 'Verified Dealers', value: dealers.toLocaleString(), icon: '✓' },
  ]

  return (
    <section id="featured" className="section-padding bg-gradient-to-b from-dark-bg to-dark-card">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Luxury </span>
            <span className="gradient-text neon-glow">Showroom</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our premium collection in an immersive luxury showroom experience
          </p>
        </motion.div>

        {/* Showroom Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-dark rounded-xl overflow-hidden h-96 bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent flex items-center justify-center border border-neon-blue/20">
              <div className="text-center">
                <div className="text-6xl mb-4">🏢</div>
                <p className="text-gray-400">Premium Showroom</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">Experience Luxury</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Step into our state-of-the-art showroom and experience the pinnacle of automotive excellence. Our expert team is ready to guide you through our exclusive collection of hand-picked luxury vehicles. Each car tells a story of performance, elegance, and prestige.
            </p>
            <ul className="space-y-3">
              {['Expert Consultation', 'Test Drive Experience', 'Flexible Financing', 'Extended Warranty'].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="glass-dark p-8 rounded-xl text-center border border-neon-blue/20 hover:border-neon-blue/60 transition-all"
            >
              <div className="text-3xl mb-4">{stat.icon}</div>
              <motion.h4 className="text-4xl font-bold gradient-text mb-2">
                {stat.value}
                {index === 2 && '+'}
              </motion.h4>
              <p className="text-gray-400 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ShowroomSection

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import CarCard from '../components/CarCard'
import MagneticButton from '../components/MagneticButton'
import { getAllCarsAll } from '../services/api'
import { containerVariants } from '../animations/variants'

const AllCars = () => {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCars = async () => {
    try {
      const response = await getAllCarsAll()
      setCars(response.data || [])
    } catch (error) {
      console.error('Failed to fetch all cars:', error)
      setCars([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  // Ensure the page starts at the top when navigated to
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    } catch (e) {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <ScrollProgressBar />
      <Navbar />

      <section className="section-padding bg-gradient-to-b from-dark-bg to-dark-card relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-neon-blue mb-4">Luxury Collection</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Explore our complete premium inventory</h1>
            <p className="mx-auto max-w-2xl text-gray-400 text-lg">
              Browse every car which are currently available for sell.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-24 text-gray-400">Loading full inventory...</div>
          ) : cars.length === 0 ? (
            <div className="text-center py-24 text-gray-400">No cars were found in the inventory.</div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {cars.map((car, index) => (
                <CarCard key={car._id || car.id} car={car} index={index} onCarReserved={fetchCars} />
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <MagneticButton
              variant="secondary"
              className="text-lg px-10 py-4 font-bold"
              onClick={() => navigate('/')}
            >
              ← Go to Previous Page
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AllCars

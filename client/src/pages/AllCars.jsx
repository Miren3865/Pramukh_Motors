import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import CarCard from '../components/CarCard'
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
    <div className="min-h-screen bg-primary-bg text-text-primary">
      <ScrollProgressBar />
      <Navbar />

      <section className="section-padding bg-primary-bg relative overflow-hidden min-h-screen">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <div className="h-[2px] bg-gold-accent w-16 mx-auto mb-6" />
            <p className="text-xs uppercase tracking-[0.3em] text-gold-accent mb-4 font-semibold">Luxury Collection</p>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-4 tracking-tight">Explore Our Complete <span className="text-gold-accent font-serif italic font-medium">Inventory</span></h1>
            <p className="mx-auto max-w-2xl text-text-secondary font-light text-lg">
              Browse every vehicle currently available in our exclusive collection.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-24 text-text-secondary font-light">Loading full inventory...</div>
          ) : cars.length === 0 ? (
            <div className="text-center py-24 text-text-secondary font-light">No cars were found in the inventory.</div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            className="mt-16 text-center"
          >
            <button
              className="btn-secondary text-sm uppercase tracking-widest px-8"
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AllCars

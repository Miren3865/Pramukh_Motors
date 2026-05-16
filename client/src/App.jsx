import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturedCarsSection from './components/FeaturedCarsSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'
import ShowroomSection from './components/ShowroomSection'
import TestimonialSection from './components/TestimonialSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ScrollProgressBar from './components/ScrollProgressBar'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AllCars from './pages/AllCars'
import CarDetail from './pages/CarDetail'
import ReserveVehicle from './pages/ReserveVehicle'
import './App.css'

function Home() {
  const location = useLocation()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    if (!location.hash) return

    const targetId = location.hash.slice(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return (
    <AnimatePresence>
      <div>
        <ScrollProgressBar />
        <Navbar />
        <main className="overflow-x-hidden">
          <HeroSection />
          <FeaturedCarsSection />
          <WhyChooseUsSection />
          <ShowroomSection />
          <TestimonialSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/cars" element={<AllCars />} />
          <Route path="/car/:slug" element={<CarDetail />} />
          <Route path="/reserve/:slug" element={<ReserveVehicle />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App

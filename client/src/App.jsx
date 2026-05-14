import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturedCarsSection from './components/FeaturedCarsSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'
import ShowroomSection from './components/ShowroomSection'
import TestimonialSection from './components/TestimonialSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import ScrollProgressBar from './components/ScrollProgressBar'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && <PageLoader />}
      {!isLoading && (
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
      )}
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App

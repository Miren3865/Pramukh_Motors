import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Gauge, Settings, Fuel, IndianRupee , Star, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import { createReservation } from '../services/api'

const CarDetailModal = ({ car, isOpen, onClose, onReserved }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [reserving, setReserving] = useState(false)
  const [showReserveConfirm, setShowReserveConfirm] = useState(false)
  const [reservationDetails, setReservationDetails] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
  })

  useEffect(() => {
    if (!isOpen) return

    const originalBodyOverflow = document.body.style.overflow
    const originalBodyTouchAction = document.body.style.touchAction
    const originalHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.body.style.touchAction = originalBodyTouchAction
      document.documentElement.style.overflow = originalHtmlOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (showReserveConfirm) {
          setShowReserveConfirm(false)
          return
        }
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, showReserveConfirm])

  useEffect(() => {
    if (!isOpen) {
      setShowReserveConfirm(false)
      setReservationDetails({
        name: '',
        email: '',
        phone: '',
        note: '',
      })
    }
  }, [isOpen])

  // Get all available images for the gallery
  const getAllImages = () => {
    const images = []
    if (car?.thumbnailImage) images.push(car.thumbnailImage)
    if (car?.featuredImage) images.push(car.featuredImage)
    if (car?.galleryImages && car.galleryImages.length > 0) {
      images.push(...car.galleryImages.filter(img => img && !images.includes(img)))
    }
    if (car?.imageUrl && !images.includes(car.imageUrl)) images.push(car.imageUrl)
    return images
  }

  const allImages = getAllImages()
  const hasImages = allImages.length > 0

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }
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
    { icon: Fuel, label: 'Fuel Type', value: car?.fuel || 'N/A', color: 'text-yellow-400' },
    { icon: Gauge, label: 'Mileage', value: car?.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A', color: 'text-cyan-400' },
    { icon: Settings, label: 'Transmission', value: car?.transmission || 'N/A', color: 'text-purple-400' },
    { icon: Zap, label: 'Year', value: car?.year || 'N/A', color: 'text-green-400' },
  ]

  const detailItems = [
    { label: 'Vehicle Type', value: car?.vehicleType || 'N/A' },
    { label: 'Drive', value: car?.drive || 'N/A' },
    { label: 'Doors', value: car?.doors ?? 'N/A' },
    { label: 'Seats', value: car?.seats ?? 'N/A' },
    { label: 'Engine Size', value: car?.engineSize || 'N/A' },
    { label: 'Horsepower', value: car?.horsepower ?? 'N/A' },
    { label: 'Acceleration', value: car?.acceleration ? `${car.acceleration} sec` : 'N/A' },
    { label: 'Top Speed', value: car?.topSpeed ? `${car.topSpeed} km/h` : 'N/A' },
    { label: 'Fuel Consumption', value: car?.fuelConsumption || 'N/A' },
    { label: 'Registration Year', value: car?.registrationYear ?? 'N/A' },
    { label: 'Registration State', value: car?.registrationState || 'N/A' },
    { label: 'Ownership', value: car?.ownership || 'N/A' },
    { label: 'Trunk Capacity', value: car?.trunk || 'N/A' },
    { label: 'Service History', value: car?.serviceHistory === false ? 'No' : 'Yes' },
    { label: 'Color', value: car?.color || 'N/A' },
  ]

  const featureList = car?.features?.length > 0
    ? car.features
    : [
      '🔒 Full Service History Available',
      '✨ Professional Detailing Included',
      '🛡️ Extended Warranty Option',
      '🚗 Pre-Purchase Inspection Completed',
    ]

  const isUnavailable = car?.status === 'reserved' || car?.status === 'sold'
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email)
  const isReservationFormValid =
    reservationDetails.name.trim().length >= 2 &&
    isValidEmail(reservationDetails.email) &&
    reservationDetails.phone.trim().length >= 10

  const handleReservationDetailChange = (event) => {
    const { name, value } = event.target
    setReservationDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleReserveClick = () => {
    if (!car?._id || isUnavailable || reserving) return
    setShowReserveConfirm(true)
  }

  const handleReserveConfirm = async () => {
    if (!car?._id || isUnavailable || reserving || !isReservationFormValid) return

    try {
      setReserving(true)

      const response = await createReservation({
        carId: car._id,
        carName: car.name,
        carYear: car.year,
        carPrice: car.price,
        customerName: reservationDetails.name.trim(),
        customerEmail: reservationDetails.email.trim(),
        customerPhone: reservationDetails.phone.trim(),
        note: reservationDetails.note.trim(),
      })

      if (response?.success) {
        setShowReserveConfirm(false)
        setReservationDetails({
          name: '',
          email: '',
          phone: '',
          note: '',
        })
        toast.success('Reservation confirmed successfully')
        if (onReserved) {
          onReserved(response.car || response.data)
        }
        onClose()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reserve this car')
      console.error('Reserve car error:', error)
    } finally {
      setReserving(false)
    }
  }

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
                  className="relative h-80 bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent overflow-hidden rounded-t-2xl"
                >
                  {hasImages ? (
                    <>
                      {/* Main Image */}
                      <motion.img
                        key={currentImageIndex}
                        src={allImages[currentImageIndex]}
                        alt={`${car?.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Navigation Arrows */}
                      {allImages.length > 1 && (
                        <>
                          <motion.button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ChevronLeft size={20} className="text-white" />
                          </motion.button>
                          <motion.button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ChevronRight size={20} className="text-white" />
                          </motion.button>
                        </>
                      )}

                      {/* Image Counter */}
                      {allImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
                          <span className="text-white text-sm">
                            {currentImageIndex + 1} / {allImages.length}
                          </span>
                        </div>
                      )}

                      {/* Thumbnail Strip */}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
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
                    </div>
                  )}

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
                        <IndianRupee className="text-neon-blue" size={28} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Price</p>
                        <p className="text-3xl font-bold text-neon-blue">
                          ₹{car?.price?.toLocaleString()}
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

                  {/* Description */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                    <p className="text-gray-300 leading-7">{car?.description || 'No additional description available.'}</p>
                  </motion.div>

                  {/* Detailed Attributes */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Car Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {detailItems.map((item, index) => (
                        <motion.div
                          key={index}
                          className="glass p-4 rounded-xl border border-neon-blue/20 hover:border-neon-blue/60 transition-all"
                          whileHover={{ y: -6 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * index, duration: 0.35 }}
                        >
                          <p className="text-gray-400 text-xs uppercase tracking-[.2em] mb-2">{item.label}</p>
                          <p className="text-white font-semibold">{item.value}</p>
                        </motion.div>
                      ))}
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
                      {featureList.map((feature, i) => (
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
                      onClick={handleReserveClick}
                      disabled={isUnavailable || reserving}
                      className={`flex-1 py-3 font-bold rounded-lg transition-all ${
                        isUnavailable || reserving
                          ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                          : 'btn-primary'
                      }`}
                    >
                      {reserving
                        ? 'Reserving...'
                        : isUnavailable
                        ? car?.status === 'sold'
                          ? 'Already Sold'
                          : 'This car is already reserved'
                        : 'Reserve This Car'}
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

          <AnimatePresence>
            {showReserveConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
                onClick={() => setShowReserveConfirm(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                  className="w-full max-w-lg rounded-2xl border border-neon-blue/40 bg-dark-card/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-neon-purple/20 border border-neon-purple/50 p-3">
                      <AlertTriangle size={22} className="text-neon-purple" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Reservation Details Required</h4>
                      <p className="mt-2 text-sm text-gray-300 leading-6">
                        Please fill your details first. Final confirmation will appear after all required fields are valid.
                      </p>
                      <p className="mt-1 text-xs text-neon-blue">
                        {car?.name} will be reserved once you confirm.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs font-medium text-gray-300">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={reservationDetails.name}
                        onChange={handleReservationDetailChange}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-neon-blue/30 bg-dark-bg px-3 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs font-medium text-gray-300">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={reservationDetails.email}
                        onChange={handleReservationDetailChange}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-neon-blue/30 bg-dark-bg px-3 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-xs font-medium text-gray-300">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={reservationDetails.phone}
                        onChange={handleReservationDetailChange}
                        placeholder="Enter your phone number"
                        className="w-full rounded-lg border border-neon-blue/30 bg-dark-bg px-3 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-xs font-medium text-gray-300">Note (Optional)</label>
                      <textarea
                        name="note"
                        value={reservationDetails.note}
                        onChange={handleReservationDetailChange}
                        rows={3}
                        placeholder="Any specific request..."
                        className="w-full rounded-lg border border-neon-blue/30 bg-dark-bg px-3 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5 p-3">
                    <p className="text-xs text-neon-blue">
                      {isReservationFormValid
                        ? 'Details complete. Final confirmation is now enabled.'
                        : 'Fill all mandatory fields to unlock final confirmation.'}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowReserveConfirm(false)}
                      disabled={reserving}
                      className="flex-1 rounded-lg border border-neon-blue/40 bg-transparent py-3 font-semibold text-neon-blue transition-all hover:bg-neon-blue/10 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    {isReservationFormValid ? (
                      <button
                        type="button"
                        onClick={handleReserveConfirm}
                        disabled={reserving}
                        className="flex-1 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple py-3 font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {reserving ? 'Reserving...' : 'Final Confirm Reservation'}
                      </button>
                    ) : (
                      <div className="flex-1 rounded-lg border border-dashed border-neon-blue/40 bg-neon-blue/5 py-3 text-center text-xs font-medium text-gray-300">
                        Complete required details to unlock confirmation
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

export default CarDetailModal

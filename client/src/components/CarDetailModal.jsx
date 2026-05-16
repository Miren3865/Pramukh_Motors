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
    hidden: { opacity: 0, y: 30, scale: 0.98 },
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
      y: 30,
      scale: 0.98,
      transition: { duration: 0.2 },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const specs = [
    { icon: Fuel, label: 'Fuel Type', value: car?.fuel || 'N/A' },
    { icon: Gauge, label: 'Mileage', value: car?.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A' },
    { icon: Settings, label: 'Transmission', value: car?.transmission || 'N/A' },
    { icon: Zap, label: 'Year', value: car?.year || 'N/A' },
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
      'Full Service History Available',
      'Professional Detailing Included',
      'Extended Warranty Option',
      'Pre-Purchase Inspection Completed',
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
        toast.success('Reservation confirmed successfully', {
          style: {
            background: '#1E1E1E',
            color: '#FFFFFF',
            border: '1px solid #D4AF37',
          },
          iconTheme: {
            primary: '#D4AF37',
            secondary: '#1E1E1E',
          },
        })
        if (onReserved) {
          onReserved(response.car || response.data)
        }
        onClose()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reserve this car', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
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
            className="fixed inset-0 bg-primary-bg/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-50 px-4 py-8"
          >
            <motion.div
              className="bg-card-bg rounded-sm border border-border-light shadow-luxury max-w-2xl w-full max-h-full overflow-y-auto relative custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Content */}
              <div className="relative z-10">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-primary-bg hover:bg-secondary-bg border border-border-light rounded-sm flex items-center justify-center transition-colors z-20"
                >
                  <X size={20} className="text-text-secondary" />
                </motion.button>

                {/* Car Image Section */}
                <motion.div
                  variants={itemVariants}
                  className="relative h-72 md:h-80 bg-secondary-bg overflow-hidden border-b border-border-light"
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
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-bg/50 backdrop-blur-sm border border-border-light hover:bg-primary-bg hover:border-gold-accent rounded-sm flex items-center justify-center transition-all"
                          >
                            <ChevronLeft size={20} className="text-white" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-bg/50 backdrop-blur-sm border border-border-light hover:bg-primary-bg hover:border-gold-accent rounded-sm flex items-center justify-center transition-all"
                          >
                            <ChevronRight size={20} className="text-white" />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      {allImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary-bg/80 backdrop-blur-md px-3 py-1 border border-border-light rounded-sm">
                          <span className="text-white text-xs font-mono tracking-widest">
                            {currentImageIndex + 1} / {allImages.length}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 border border-border-light rounded-sm bg-primary-bg flex items-center justify-center" />
                        <p className="text-text-secondary text-xs tracking-widest uppercase">Image Unavailable</p>
                      </div>
                    </div>
                  )}

                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary-bg/80 backdrop-blur-md border border-gold-accent/50 px-3 py-1.5 rounded-sm">
                    <Star size={12} className="text-gold-accent" />
                    <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest">Premium Selection</span>
                  </div>
                </motion.div>

                {/* Details Section */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-8"
                >
                  {/* Header */}
                  <motion.div variants={itemVariants} className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">{car?.name}</h2>
                      <p className="text-gold-accent font-medium">{car?.year}</p>
                    </div>
                    
                    {/* Price Highlight */}
                    <div className="bg-primary-bg border border-gold-accent/30 px-6 py-4 rounded-sm flex items-center gap-4">
                      <div className="w-10 h-10 border border-gold-accent/50 rounded-sm flex items-center justify-center bg-gold-accent/10">
                        <IndianRupee className="text-gold-accent" size={20} />
                      </div>
                      <div>
                        <p className="text-text-secondary text-[10px] uppercase tracking-widest mb-1">Price</p>
                        <p className="text-2xl font-bold text-gold-accent">
                          ₹{car?.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="w-full h-[1px] bg-border-light mb-8" />

                  {/* Specifications Grid */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-sm text-text-secondary uppercase tracking-widest mb-4 font-semibold">Specifications</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {specs.map((spec, i) => {
                        const Icon = spec.icon
                        return (
                          <div
                            key={i}
                            className="bg-secondary-bg border border-border-light p-4 rounded-sm hover:border-gold-accent/50 transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="text-gold-accent" size={16} />
                              <p className="text-text-secondary text-xs uppercase tracking-wider">{spec.label}</p>
                            </div>
                            <p className="text-text-primary font-medium pl-6">{spec.value}</p>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-sm text-text-secondary uppercase tracking-widest mb-4 font-semibold">Description</h3>
                    <p className="text-black leading-relaxed font-light text-sm">{car?.description || 'No additional description available.'}</p>
                  </motion.div>

                  {/* Detailed Attributes */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h3 className="text-sm text-text-secondary uppercase tracking-widest mb-4 font-semibold">Car Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {detailItems.map((item, index) => (
                        <div
                          key={index}
                          className="bg-secondary-bg border border-border-light p-3 rounded-sm hover:border-gold-accent/50 transition-colors flex justify-between items-center"
                        >
                          <p className="text-text-secondary text-xs uppercase tracking-wider">{item.label}</p>
                          <p className="text-text-primary font-medium text-sm text-right">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Additional Info */}
                  <motion.div variants={itemVariants} className="mb-10">
                    <h3 className="text-sm text-text-secondary uppercase tracking-widest mb-4 font-semibold">Features & Benefits</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {featureList.map((feature, i) => (
                        <div
                          key={i}
                          className="bg-secondary-bg border border-border-light p-3 rounded-sm flex items-center gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-sm bg-gold-accent" />
                          <p className="text-black text-sm font-light">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <button
                      onClick={handleReserveClick}
                      disabled={isUnavailable || reserving}
                      className={`flex-1 btn-primary text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {reserving
                        ? 'Processing...'
                        : isUnavailable
                        ? car?.status === 'sold'
                          ? 'Sold Out'
                          : 'Reserved'
                        : 'Reserve Vehicle'}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 btn-secondary text-sm uppercase tracking-widest"
                    >
                      Close Details
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Reservation Confirmation Modal */}
          <AnimatePresence>
            {showReserveConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-primary-bg/90 backdrop-blur-md p-4"
                onClick={() => setShowReserveConfirm(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98 }}
                  className="w-full max-w-lg rounded-sm border border-border-light bg-card-bg p-8 shadow-luxury"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="shrink-0 border border-gold-accent/50 p-3 rounded-sm bg-gold-accent/10">
                      <AlertTriangle size={24} className="text-gold-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-text-primary tracking-tight">Client Information</h4>
                      <p className="mt-1 text-sm text-text-secondary leading-relaxed font-light">
                        Please provide your details. Our concierge will contact you to finalize the reservation.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="md:col-span-1">
                      <label className="mb-2 block text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={reservationDetails.name}
                        onChange={handleReservationDetailChange}
                        placeholder="John Doe"
                        className="form-field"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="mb-2 block text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={reservationDetails.email}
                        onChange={handleReservationDetailChange}
                        placeholder="john@example.com"
                        className="form-field"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={reservationDetails.phone}
                        onChange={handleReservationDetailChange}
                        placeholder="+91 9876543210"
                        className="form-field"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Additional Notes (Optional)</label>
                      <textarea
                        name="note"
                        value={reservationDetails.note}
                        onChange={handleReservationDetailChange}
                        rows={3}
                        placeholder="Any specific requests or preferred contact time..."
                        className="form-field resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowReserveConfirm(false)}
                      disabled={reserving}
                      className="flex-1 btn-secondary text-xs uppercase tracking-widest disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleReserveConfirm}
                      disabled={reserving || !isReservationFormValid}
                      className={`flex-1 btn-primary text-xs uppercase tracking-widest ${(!isReservationFormValid || reserving) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {reserving ? 'Processing...' : 'Confirm Request'}
                    </button>
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

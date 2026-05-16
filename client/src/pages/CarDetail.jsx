import React, { useEffect, useState, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Gauge, Settings, Fuel, IndianRupee, Star, ChevronLeft, ChevronRight, AlertTriangle, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { getCarById, getAllCarsAll, createReservation } from '../services/api'
import PageTransition from '../components/PageTransition'
import LuxuryLoader from '../components/LuxuryLoader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { containerVariants, itemVariants } from '../animations/variants'

const CarDetail = () => {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const toSlug = (value) =>
    String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const isObjectId = (value) => /^[a-f\d]{24}$/i.test(value || '')

  const [car, setCar] = useState(location.state?.car || null)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchingCar, setFetchingCar] = useState(!car)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [reserving, setReserving] = useState(false)
  const [showReserveConfirm, setShowReserveConfirm] = useState(false)
  const [reservationDetails, setReservationDetails] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
  })

  const [showArrows, setShowArrows] = useState(false)
  const idleTimerRef = useRef(null)

  const handleImageMouseMove = () => {
    setShowArrows(true)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      setShowArrows(false)
    }, 3000)
  }

  const handleImageMouseLeave = () => {
    setShowArrows(false)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
  }

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [])

  // Smooth scroll to top and loader duration
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Fetch car if not passed in state
  useEffect(() => {
    const fetchCar = async () => {
      if (!car && slug) {
        try {
          if (isObjectId(slug)) {
            const data = await getCarById(slug)
            setCar(data.car || data)
          } else {
            const response = await getAllCarsAll()
            const allCars = response?.data || response || []
            const matchedCar = allCars.find((vehicle) => toSlug(vehicle?.name) === slug)

            if (!matchedCar) {
              throw new Error('Car not found')
            }

            setCar(matchedCar)
          }
        } catch (error) {
          toast.error('Failed to load car details')
          navigate('/cars')
        } finally {
          setFetchingCar(false)
        }
      } else {
        setFetchingCar(false)
      }
    }
    fetchCar()
  }, [slug, car, navigate])

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
    const slug = toSlug(car?.name) || car?._id
    navigate(`/reserve/${slug}`, { state: { car } })
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
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reserve this car', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
    } finally {
      setReserving(false)
    }
  }

  // Combined loading state
  if (isLoading || fetchingCar) {
    return (
      <AnimatePresence>
        {(isLoading || fetchingCar) && <LuxuryLoader />}
      </AnimatePresence>
    )
  }

  return (
    <PageTransition className="min-h-screen bg-primary-bg flex flex-col">
      <Navbar hideLinks={true} />

      <main className="flex-1 pt-[80px]"> {/* Add padding-top to account for fixed navbar */}

        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-text-secondary hover:text-gold-accent transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Back to Collection
          </button>
        </div>

        {/* Hero Image Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[320px] md:h-[500px] lg:h-[650px] w-full overflow-hidden bg-transparent flex items-center justify-center"
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
          >
            {hasImages ? (
              <>
                <AnimatePresence>
                  <motion.img
                    key={currentImageIndex}
                    src={allImages[currentImageIndex]}
                    alt={`${car?.name} - Image ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-contain p-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className={`absolute z-20 left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-contrast-bg/80 backdrop-blur-md border border-gold-accent/30 hover:bg-contrast-bg hover:border-gold-accent rounded-sm flex items-center justify-center transition-all duration-500 shadow-luxury ${showArrows ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <ChevronLeft size={24} className="text-white hover:text-gold-accent transition-colors" />
                    </button>
                    <button
                      onClick={nextImage}
                      className={`absolute z-20 right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-contrast-bg/80 backdrop-blur-md border border-gold-accent/30 hover:bg-contrast-bg hover:border-gold-accent rounded-sm flex items-center justify-center transition-all duration-500 shadow-luxury ${showArrows ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <ChevronRight size={24} className="text-white hover:text-gold-accent transition-colors" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 bg-contrast-bg/80 backdrop-blur-md px-5 py-2 border border-gold-accent/30 rounded-sm shadow-luxury flex items-center justify-center">
                    <span className="text-white text-[11px] font-bold tracking-[0.3em] uppercase">
                      {currentImageIndex + 1} <span className="text-gold-accent mx-1">/</span> {allImages.length}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center z-10 relative">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 border border-border-light rounded-sm bg-primary-bg flex items-center justify-center" />
                  <p className="text-text-secondary text-sm tracking-widest uppercase">Image Unavailable</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Details Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left Column: Info & Specs */}
            <div className="flex-1">
              {/* Header */}
              <motion.div variants={itemVariants} className="mb-8">
                <p className="text-gold-accent font-medium tracking-widest uppercase mb-2">{car?.year}</p>
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-6">{car?.name}</h1>
                <div className="w-20 h-[1px] bg-gold-accent" />
              </motion.div>

              {/* Price Highlight (Mobile/Tablet only, Desktop shown on right panel) */}
              <motion.div variants={itemVariants} className="lg:hidden mb-8">
                <div className="bg-card-bg border border-gold-accent/30 p-6 rounded-sm flex items-center gap-4 shadow-luxury">
                  <div className="w-12 h-12 border border-gold-accent/50 rounded-sm flex items-center justify-center bg-gold-accent/10">
                    <IndianRupee className="text-gold-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-text-secondary text-[10px] uppercase tracking-widest mb-1">Asking Price</p>
                    <p className="text-3xl font-bold text-gold-accent">
                      ₹{car?.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants} className="mb-12">
                <h3 className="text-sm text-text-secondary uppercase tracking-widest mb-6 font-semibold flex items-center gap-4">
                  <span>Overview</span>
                  <div className="flex-1 h-[1px] bg-border-light" />
                </h3>
                <p className="text-text-primary leading-relaxed font-light text-lg">
                  {car?.description || 'No additional description available for this vehicle.'}
                </p>
              </motion.div>

              {/* Specifications Grid */}
              <motion.div variants={itemVariants} className="mb-12">
                <h3 className="text-sm text-text-secondary uppercase tracking-widest mb-6 font-semibold flex items-center gap-4">
                  <span>Key Specifications</span>
                  <div className="flex-1 h-[1px] bg-border-light" />
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {specs.map((spec, i) => {
                    const Icon = spec.icon
                    return (
                      <div
                        key={i}
                        className="bg-card-bg border border-border-light p-6 rounded-sm hover:border-gold-accent/50 transition-colors group"
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          <Icon className="text-text-secondary group-hover:text-gold-accent transition-colors" size={24} />
                          <div>
                            <p className="text-text-secondary text-[10px] uppercase tracking-wider mb-1">{spec.label}</p>
                            <p className="text-text-primary font-medium">{spec.value}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Detailed Attributes */}
              <motion.div variants={itemVariants} className="mb-12">
                <h3 className="text-sm text-text-secondary uppercase tracking-widest mb-6 font-semibold flex items-center gap-4">
                  <span>Technical Details</span>
                  <div className="flex-1 h-[1px] bg-border-light" />
                </h3>
                <div className="bg-card-bg border border-border-light rounded-sm overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-light">
                    {detailItems.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 flex justify-between items-center hover:bg-secondary-bg/50 transition-colors"
                      >
                        <p className="text-text-secondary text-xs uppercase tracking-wider">{item.label}</p>
                        <p className="text-text-primary font-medium text-sm text-right">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Pricing & Action (Sticky) */}
            <motion.div variants={itemVariants} className="lg:w-[400px]">
              <div className="sticky top-[100px] bg-card-bg border border-border-light rounded-sm p-8 shadow-luxury">

                {/* Desktop Price */}
                <div className="hidden lg:block mb-8 pb-8 border-b border-border-light">
                  <p className="text-text-secondary text-xs uppercase tracking-widest mb-2">Asking Price</p>
                  <p className="text-4xl font-bold text-gold-accent mb-4">
                    ₹{car?.price?.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Available for immediate delivery</span>
                  </div>
                </div>

                <h3 className="text-sm text-text-primary uppercase tracking-widest mb-6 font-semibold">Premium Features</h3>
                <div className="grid grid-cols-1 gap-4 mb-10">
                  {featureList.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-accent shrink-0" />
                      <p className="text-text-secondary text-sm font-light leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleReserveClick}
                    disabled={isUnavailable || reserving}
                    className={`w-full py-4 bg-gold-accent text-primary-bg font-bold text-sm uppercase tracking-widest rounded-sm transition-all hover:bg-gold-accent/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {reserving
                      ? 'Processing...'
                      : isUnavailable
                        ? car?.status === 'sold'
                          ? 'Sold Out'
                          : 'Reserved'
                        : 'Reserve Vehicle'}
                  </button>
                  <p className="text-center text-text-secondary text-xs font-light">
                    Our concierge will contact you to finalize the reservation details.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />

      {/* Reservation Confirmation Modal */}
      <AnimatePresence>
        {showReserveConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-primary-bg/90 backdrop-blur-md p-4"
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
    </PageTransition>
  )
}

export default CarDetail

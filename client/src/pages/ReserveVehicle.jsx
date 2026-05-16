import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertTriangle, IndianRupee } from 'lucide-react'
import toast from 'react-hot-toast'
import { getCarById, getAllCarsAll, createReservation } from '../services/api'
import PageTransition from '../components/PageTransition'
import LuxuryLoader from '../components/LuxuryLoader'

const ReserveVehicle = () => {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [car, setCar] = useState(location.state?.car || null)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchingCar, setFetchingCar] = useState(!car)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
  })

  const toSlug = (value) =>
    String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const isObjectId = (value) => /^[a-f\d]{24}$/i.test(value || '')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

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
          toast.error('Failed to load vehicle details')
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

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email)
  const isValidPhone = (phone) => /^\d{10}$/.test(phone)
  const isFormValid =
    formData.name.trim().length >= 2 &&
    isValidEmail(formData.email) &&
    isValidPhone(formData.phone.trim())

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10)
      setFormData((prev) => ({
        ...prev,
        [name]: digitsOnly,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!car?._id || submitting || !isFormValid) return

    try {
      setSubmitting(true)
      const response = await createReservation({
        carId: car._id,
        carName: car.name,
        carYear: car.year,
        carPrice: car.price,
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        note: formData.note.trim(),
      })

      const updatedCar = response?.car || { ...car, status: 'reserved' }

      if (response?.success) {
        toast.success('Reservation submitted successfully')
        const slug = toSlug(updatedCar?.name) || updatedCar?._id
        navigate(`/car/${slug}`, { state: { car: updatedCar } })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit reservation')
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading || fetchingCar) {
    return <LuxuryLoader message="Reservation Confirmation Form is Opening" />
  }

  return (
    <PageTransition className="min-h-screen bg-primary-bg">
      <main className="min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-text-secondary hover:text-gold-accent transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="rounded-3xl border border-border-light bg-card-bg/95 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col items-center text-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full border border-gold-accent/30 bg-gold-accent/10 flex items-center justify-center">
                  <AlertTriangle size={22} className="text-gold-accent" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-text-secondary mb-2">Reserve Vehicle</p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">{car?.name}</h1>
                  <p className="mt-2 text-text-secondary text-sm">Fill the form below from this centered page.</p>
                </div>
              </div>

              <div className="mb-8 flex justify-center">
                <div className="w-full max-w-xl rounded-2xl overflow-hidden bg-primary-bg border border-border-light">
                  <img
                    src={car?.thumbnailImage || car?.featuredImage || car?.imageUrl}
                    alt={car?.name || 'Vehicle'}
                    className="w-full h-56 sm:h-72 object-contain p-4"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="form-field"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="form-field"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      inputMode="numeric"
                      pattern="\d{10}"
                      maxLength={10}
                      title="Phone number must be exactly 10 digits"
                      className="form-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Additional Notes</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any preferred time or request..."
                    className="form-field resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 btn-secondary text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !isFormValid}
                    className={`flex-1 btn-primary text-xs uppercase tracking-widest ${(!isFormValid || submitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {submitting ? 'Submitting...' : 'Confirm Request'}
                  </button>
                </div>

                <div className="pt-4 text-center">
                  <div className="inline-flex items-center gap-2 text-gold-accent">
                    <IndianRupee size={16} />
                    <span className="text-sm font-semibold">₹{car?.price?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default ReserveVehicle

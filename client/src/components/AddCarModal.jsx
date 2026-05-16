import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { createCar } from '../services/api'
import ImageUploader from './ImageUploader'
import CustomSelect from '@/components/ui/CustomSelect'

const AddCarModal = ({ onClose, onCarAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    fuel: 'Petrol',
    transmission: 'Automatic',
    color: '',
    vehicleType: '',
    registrationYear: '',
    registrationState: '',
    ownership: '',
    peakTorque: '',
    drive: 'AWD',
    features: '',
    description: '',
    engineSize: '',
    horsepower: '',
    acceleration: '',
    topSpeed: '',
    fuelConsumption: '',
    doors: 4,
    seats: 5,
    trunk: '',
    warranty: '',
    serviceHistory: true,
    showOnUser: false,
  })

  const [loading, setLoading] = useState(false)
  const [thumbnailImage, setThumbnailImage] = useState([])
  const [galleryImages, setGalleryImages] = useState([])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.year || !formData.price || !formData.mileage || !formData.color) {
      toast.error('Please fill in all required fields', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
      return
    }

    if (galleryImages.length === 0) {
      toast.error('Please upload at least one image', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
      return
    }

    try {
      setLoading(true)

      // Create FormData for file uploads
      const formDataToSend = new FormData()

      // Add cars data
      const carData = {
        ...formData,
        status: 'available',
        price: parseInt(formData.price),
        mileage: parseInt(formData.mileage),
        registrationYear: formData.registrationYear ? parseInt(formData.registrationYear) : null,
        horsepower: formData.horsepower ? parseInt(formData.horsepower) : null,
        doors: parseInt(formData.doors),
        seats: parseInt(formData.seats),
        features: formData.features ? formData.features.split(',').map((f) => f.trim()) : [],
        showOnUser: formData.showOnUser,
      }

      // Append all car data to FormData
      Object.keys(carData).forEach(key => {
        if (carData[key] !== null && carData[key] !== undefined) {
          formDataToSend.append(key, carData[key])
        }
      })

      // Add images
      if (thumbnailImage.length > 0) {
        formDataToSend.append('thumbnail', thumbnailImage[0])
      }
      galleryImages.forEach((file, index) => {
        formDataToSend.append('gallery', file)
      })

      const response = await createCar(formDataToSend)

      if (response.success) {
        toast.success('Vehicle added successfully!', {
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
        onCarAdded()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add vehicle', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
      console.error('Error adding car:', error)
    } finally {
      setLoading(false)
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  useEffect(() => {
    // Disable background scrolling
    document.body.style.overflow = 'hidden'

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
      // Re-enable background scrolling
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const modalVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, y: 30, scale: 0.98 },
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
        className="fixed inset-0 bg-primary-bg/90 backdrop-blur-md z-40"
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
          className="bg-card-bg rounded-sm border border-border-light shadow-luxury max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-border-light bg-secondary-bg/95 backdrop-blur-sm">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gold-accent font-semibold mb-1">Inventory Manager</p>
              <h2 className="text-2xl font-bold text-text-primary tracking-tight">Add New Vehicle</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 bg-primary-bg border border-border-light rounded-sm hover:border-gold-accent hover:text-gold-accent text-text-secondary transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Required Fields */}
            <div>
              <h3 className="text-xs font-semibold text-gold-accent uppercase tracking-widest mb-6">Essential Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Vehicle Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Rolls-Royce Phantom"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Manufacturing Year *</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Price (INR) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 85000000"
                    min="0"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Mileage (km) *</label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="e.g., 15000"
                    min="0"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Exterior Color *</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g., Obsidian Black"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Powertrain *</label>
                  <div className="border border-border-light rounded-sm overflow-hidden bg-primary-bg h-[46px]">
                    <CustomSelect
                      value={formData.fuel}
                      onChange={(val) => handleChange({ target: { name: 'fuel', value: val, type: 'select-one' } })}
                      options={[
                        { value: 'Petrol', label: 'Petrol' },
                        { value: 'Diesel', label: 'Diesel' },
                        { value: 'Hybrid', label: 'Hybrid' },
                        { value: 'Electric', label: 'Electric' },
                      ]}
                      placeholder="Select Fuel Type"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Transmission *</label>
                  <div className="border border-border-light rounded-sm overflow-hidden bg-primary-bg h-[46px]">
                    <CustomSelect
                      value={formData.transmission}
                      onChange={(val) => handleChange({ target: { name: 'transmission', value: val, type: 'select-one' } })}
                      options={[
                        { value: 'Manual', label: 'Manual' },
                        { value: 'Automatic', label: 'Automatic' },
                      ]}
                      placeholder="Select Transmission"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="border-t border-border-light pt-8">
              <h3 className="text-xs font-semibold text-gold-accent uppercase tracking-widest mb-6">Visual Assets *</h3>

              {/* Thumbnail Image */}
              <div className="bg-secondary-bg border border-border-light p-6 rounded-sm mb-6">
                <ImageUploader
                  images={thumbnailImage}
                  onImagesChange={setThumbnailImage}
                  maxImages={1}
                  label="Primary Thumbnail"
                  description="Upload the main showcase image for the vehicle (Optional)"
                  thumbnailMode={true}
                />
              </div>

              {/* Gallery Images */}
              <div className="bg-secondary-bg border border-border-light p-6 rounded-sm">
                <ImageUploader
                  images={galleryImages}
                  onImagesChange={setGalleryImages}
                  maxImages={10}
                  label="Gallery Collection"
                  description="Upload detailed images of interior and exterior"
                  galleryMode={true}
                />
              </div>
            </div>

            {/* Optional Fields */}
            <div className="border-t border-border-light pt-8">
              <h3 className="text-xs font-semibold text-gold-accent uppercase tracking-widest mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Body Style</label>
                  <input
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    placeholder="e.g., Luxury Sedan"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Registration Year</label>
                  <input
                    type="number"
                    name="registrationYear"
                    value={formData.registrationYear}
                    onChange={handleChange}
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    placeholder="e.g., 2023"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Registration State</label>
                  <input
                    type="text"
                    name="registrationState"
                    value={formData.registrationState}
                    onChange={handleChange}
                    placeholder="e.g., MH"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Ownership History</label>
                  <input
                    type="text"
                    name="ownership"
                    value={formData.ownership}
                    onChange={handleChange}
                    placeholder="e.g., 1st Owner"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Engine Capacity</label>
                  <input
                    type="text"
                    name="engineSize"
                    value={formData.engineSize}
                    onChange={handleChange}
                    placeholder="e.g., 6.75L V12"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Power Output</label>
                  <input
                    type="number"
                    name="horsepower"
                    value={formData.horsepower}
                    onChange={handleChange}
                    placeholder="e.g., 563 HP"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Acceleration (0-100 km/h)</label>
                  <input
                    type="text"
                    name="acceleration"
                    value={formData.acceleration}
                    onChange={handleChange}
                    placeholder="e.g., 5.3s"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Top Speed</label>
                  <input
                    type="text"
                    name="topSpeed"
                    value={formData.topSpeed}
                    onChange={handleChange}
                    placeholder="e.g., 250 km/h"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Editorial Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a detailed, premium description of the vehicle..."
                  rows="5"
                  className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="mt-6">
                <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Key Features</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Comma-separated list (e.g., Starlight Headliner, Bespoke Audio, Massage Seats)"
                  rows="3"
                  className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light placeholder-gray-600 focus:border-gold-accent focus:outline-none transition-colors resize-none"
                />
              </div>

              <label className="flex items-center gap-3 mt-6 cursor-pointer p-4 bg-secondary-bg border border-border-light rounded-sm w-fit">
                <input
                  type="checkbox"
                  name="serviceHistory"
                  checked={formData.serviceHistory}
                  onChange={handleChange}
                  className="w-4 h-4 accent-gold-accent bg-primary-bg border-border-light"
                />
                <span className="text-text-primary text-sm font-medium tracking-wide">Verified Service History</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-8 border-t border-border-light sticky bottom-0 bg-card-bg pb-6 z-10">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary text-xs uppercase tracking-widest py-4"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ y: -2, borderColor: '#D4AF37', color: '#D4AF37' }}
                whileTap={{ y: 0 }}
                type="submit"
                disabled={loading}
                className="flex-[2] btn-secondary text-xs uppercase tracking-widest py-4 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Publish Vehicle'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  )
}

export default AddCarModal

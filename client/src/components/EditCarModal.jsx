import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { updateCar } from '../services/api'
import ImageUploader from './ImageUploader'
import CustomSelect from '@/components/ui/CustomSelect'

const EditCarModal = ({ car, onClose, onCarUpdated }) => {
  const [formData, setFormData] = useState({
    name: car.name,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    fuel: car.fuel,
    transmission: car.transmission,
    color: car.color,
    features: car.features?.join(', ') || '',
    description: car.description || '',
    status: car.status,
    engineSize: car.engineSize || '',
    horsepower: car.horsepower || '',
    acceleration: car.acceleration || '',
    topSpeed: car.topSpeed || '',
    fuelConsumption: car.fuelConsumption || '',
    doors: car.doors,
    seats: car.seats,
    trunk: car.trunk || '',
    warranty: car.warranty || '',
    showOnUser: car.showOnUser || false,
    serviceHistory: car.serviceHistory,
  })

  const [loading, setLoading] = useState(false)
  const [galleryImages, setGalleryImages] = useState(car.galleryImages && car.galleryImages.length > 0 ? car.galleryImages : (car.imageUrl ? [car.imageUrl] : []))

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

    try {
      setLoading(true)

      // Create FormData for file uploads
      const formDataToSend = new FormData()

      // Add car data
      const carData = {
        ...formData,
        price: parseInt(formData.price),
        mileage: parseInt(formData.mileage),
        horsepower: formData.horsepower ? parseInt(formData.horsepower) : null,
        doors: parseInt(formData.doors),
        seats: parseInt(formData.seats),
        features: formData.features ? (typeof formData.features === 'string' ? formData.features.split(',').map((f) => f.trim()) : formData.features) : [],
        showOnUser: formData.showOnUser,
      }

      // Append all car data to FormData
      Object.keys(carData).forEach(key => {
        if (carData[key] !== null && carData[key] !== undefined) {
          formDataToSend.append(key, carData[key])
        }
      })

      // Add gallery images (separate new files from retained existing ones)
      const retainedImages = []
      galleryImages.forEach((item) => {
        if (item instanceof File) {
          formDataToSend.append('gallery', item)
        } else if (typeof item === 'string') {
          retainedImages.push(item)
        }
      })

      formDataToSend.append('retainedGalleryImages', JSON.stringify(retainedImages))

      const response = await updateCar(car._id, formDataToSend)

      if (response.success) {
        toast.success('Vehicle updated successfully!', {
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
        onCarUpdated()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update vehicle', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
      console.error('Error updating car:', error)
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
        className="fixed inset-0 flex items-center justify-center z-50 px-0 sm:px-4 py-0 sm:py-8"
      >
        <motion.div
          className="bg-card-bg sm:rounded-sm border-x sm:border border-border-light shadow-luxury max-w-3xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-border-light bg-secondary-bg/95 backdrop-blur-sm">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gold-accent font-semibold mb-1">Inventory Manager</p>
              <h2 className="text-2xl font-bold text-text-primary tracking-tight">Edit Vehicle Record</h2>
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
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
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
                    min="0"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
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
                    min="0"
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
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
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
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
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Availability Status *</label>
                  <div className="border border-border-light rounded-sm overflow-hidden bg-primary-bg h-[46px]">
                    <CustomSelect
                      value={formData.status}
                      onChange={(val) => handleChange({ target: { name: 'status', value: val, type: 'select-one' } })}
                      options={
                        car.status === 'reserved'
                          ? [
                            { value: 'reserved', label: 'Reserved' },
                            { value: 'sold', label: 'Sold' },
                          ]
                          : [{ value: 'available', label: 'Available' }]
                      }
                      placeholder="Select Status"
                      disabled={car.status === 'available'}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="border-t border-border-light pt-8">
              <h3 className="text-xs font-semibold text-gold-accent uppercase tracking-widest mb-6">Visual Assets</h3>
              <div className="bg-secondary-bg border border-border-light p-6 rounded-sm">
                <ImageUploader
                  images={galleryImages}
                  onImagesChange={setGalleryImages}
                  maxImages={10}
                  label="Update Gallery Collection"
                  description="Upload new images or remove existing ones"
                  galleryMode={true}
                />
              </div>
            </div>

            {/* Optional Fields */}
            <div className="border-t border-border-light pt-8">
              <h3 className="text-xs font-semibold text-gold-accent uppercase tracking-widest mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Engine Capacity</label>
                  <input
                    type="text"
                    name="engineSize"
                    value={formData.engineSize}
                    onChange={handleChange}
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Power Output</label>
                  <input
                    type="number"
                    name="horsepower"
                    value={formData.horsepower}
                    onChange={handleChange}
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Acceleration (0-100 km/h)</label>
                  <input
                    type="text"
                    name="acceleration"
                    value={formData.acceleration}
                    onChange={handleChange}
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Top Speed</label>
                  <input
                    type="text"
                    name="topSpeed"
                    value={formData.topSpeed}
                    onChange={handleChange}
                    className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Editorial Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="mt-6">
                <label className="text-text-secondary text-[10px] uppercase tracking-widest font-semibold mb-2 block">Key Features</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Comma-separated list"
                  rows="3"
                  className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:border-gold-accent focus:outline-none transition-colors resize-none"
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
                {loading ? 'Processing...' : 'Save Changes'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  )
}

export default EditCarModal

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
      toast.error('Please fill in all required fields')
      return
    }

    if (galleryImages.length === 0) {
      toast.error('Please upload at least one image')
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
        toast.success('Car added successfully!')
        onCarAdded()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add car')
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
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, y: 50, scale: 0.95 },
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
          className="glass-dark rounded-2xl border border-neon-blue/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-neon-blue/20 bg-dark-card">
            <h2 className="text-2xl font-bold text-white">Add New Car</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-neon-purple/20 rounded-lg transition-colors"
            >
              <X size={20} className="text-neon-purple" />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Required Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Car Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., BMW 7 Series"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white focus:border-neon-blue focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Price (INR) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 125000"
                  min="0"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Mileage (km) *</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  placeholder="e.g., 15000"
                  min="0"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Color *</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g., Black"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Fuel Type *</label>
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
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Transmission *</label>
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

            {/* Image Upload Section */}
            <div className="border-t border-neon-blue/20 pt-4">
              <h3 className="text-lg font-semibold text-neon-blue mb-4">Car Images *</h3>

              {/* Thumbnail Image */}
              <ImageUploader
                images={thumbnailImage}
                onImagesChange={setThumbnailImage}
                maxImages={1}
                label="Thumbnail Image"
                description="Upload the main image for the car (optional, first gallery image will be used if not provided)"
                thumbnailMode={true}
                className="mb-6"
              />

              {/* Gallery Images */}
              <ImageUploader
                images={galleryImages}
                onImagesChange={setGalleryImages}
                maxImages={10}
                label="Gallery Images"
                description="Upload multiple images of the car (interior, exterior, details)"
                galleryMode={true}
                className="mb-6"
              />
            </div>

            {/* Optional Fields */}
            <div className="border-t border-neon-blue/20 pt-4">
              <h3 className="text-lg font-semibold text-neon-blue mb-4">Additional Details (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  placeholder="Vehicle Type (e.g., SUV)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="number"
                  name="registrationYear"
                  value={formData.registrationYear}
                  onChange={handleChange}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  placeholder="Registration Year"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="text"
                  name="registrationState"
                  value={formData.registrationState}
                  onChange={handleChange}
                  placeholder="Registration State (e.g., CH)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="text"
                  name="ownership"
                  value={formData.ownership}
                  onChange={handleChange}
                  placeholder="Ownership (e.g., 1st Owner)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="text"
                  name="peakTorque"
                  value={formData.peakTorque}
                  onChange={handleChange}
                  placeholder="Peak Torque (e.g., 400Nm)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <CustomSelect
                  value={formData.drive}
                  onChange={(val) => handleChange({ target: { name: 'drive', value: val, type: 'select-one' } })}
                  options={[
                    { value: 'AWD', label: 'AWD' },
                    { value: 'RWD', label: 'RWD' },
                    { value: 'FWD', label: 'FWD' },
                    { value: '4WD', label: '4WD' },
                  ]}
                  placeholder="Drive Type"
                />
                <input
                  type="text"
                  name="engineSize"
                  value={formData.engineSize}
                  onChange={handleChange}
                  placeholder="Engine Size (e.g., 3.0L)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="number"
                  name="horsepower"
                  value={formData.horsepower}
                  onChange={handleChange}
                  placeholder="Horsepower"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="text"
                  name="acceleration"
                  value={formData.acceleration}
                  onChange={handleChange}
                  placeholder="0-100 km/h (e.g., 5.2s)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="text"
                  name="topSpeed"
                  value={formData.topSpeed}
                  onChange={handleChange}
                  placeholder="Top Speed (e.g., 250 km/h)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="text"
                  name="fuelConsumption"
                  value={formData.fuelConsumption}
                  onChange={handleChange}
                  placeholder="Fuel Consumption (e.g., 8.5 L/100km)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="text"
                  name="trunk"
                  value={formData.trunk}
                  onChange={handleChange}
                  placeholder="Trunk Size (e.g., 540L)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
                <CustomSelect
                  value={String(formData.doors)}
                  onChange={(val) => handleChange({ target: { name: 'doors', value: val, type: 'select-one' } })}
                  options={[
                    { value: '2', label: '2 Doors' },
                    { value: '4', label: '4 Doors' },
                    { value: '5', label: '5 Doors' },
                  ]}
                  placeholder="Select Doors"
                />
                <CustomSelect
                  value={String(formData.seats)}
                  onChange={(val) => handleChange({ target: { name: 'seats', value: val, type: 'select-one' } })}
                  options={[2, 3, 4, 5, 6, 7, 8].map(num => ({ value: String(num), label: `${num} Seats` }))}
                  placeholder="Select Seats"
                />
                <input
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                  placeholder="Warranty (e.g., 3 years)"
                  className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
                />
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Car description..."
                rows="4"
                className="w-full mt-4 bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
              />

              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Features (comma-separated, e.g., Leather Seats, Sunroof, GPS)"
                rows="3"
                className="w-full mt-4 bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
              />

              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="serviceHistory"
                  checked={formData.serviceHistory}
                  onChange={handleChange}
                  className="w-4 h-4 accent-neon-blue"
                />
                <span className="text-gray-300 text-sm">Full Service History Available</span>
              </label>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="showOnUser"
                  checked={formData.showOnUser}
                  onChange={handleChange}
                  className="w-4 h-4 accent-neon-blue"
                />
                <span className="text-gray-300 text-sm">Show this car on the user site</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-neon-blue/20">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-blue/50 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Car'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  )
}

export default AddCarModal

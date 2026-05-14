import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Eye, EyeOff, Car, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { getAllCars, deleteCar, getCarStats } from '../services/api'
import AddCarModal from './AddCarModal'
import EditCarModal from './EditCarModal'

const AdminCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalCars: 0, availableCars: 0, soldCars: 0, reservedCars: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)

  useEffect(() => {
    fetchCars()
    fetchStats()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const response = await getAllCars()
      if (response.success) {
        setCars(response.data)
      }
    } catch (error) {
      toast.error('Failed to load cars')
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await getCarStats()
      if (response.success) {
        setStats(response.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return

    try {
      await deleteCar(id)
      setCars(cars.filter((car) => car._id !== id))
      toast.success('Car deleted successfully')
      fetchStats()
    } catch (error) {
      toast.error('Failed to delete car')
    }
  }

  const handleEditClick = (car) => {
    setSelectedCar(car)
    setShowEditModal(true)
  }

  const handleCarAdded = () => {
    fetchCars()
    fetchStats()
    setShowAddModal(false)
  }

  const handleCarUpdated = () => {
    fetchCars()
    fetchStats()
    setShowEditModal(false)
  }

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || car.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Car className="text-neon-blue" size={32} />
          <div>
            <h2 className="text-3xl font-bold text-white">Car Inventory</h2>
            <p className="text-gray-400 text-sm">Manage your luxury car collection</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-blue/50 transition-all"
        >
          <Plus size={20} />
          Add Car
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Cars', value: stats.totalCars, icon: '🚗' },
          { label: 'Available', value: stats.availableCars, icon: '✅' },
          { label: 'Reserved', value: stats.reservedCars, icon: '🔔' },
          { label: 'Sold', value: stats.soldCars, icon: '✔️' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="glass rounded-xl p-6 border border-neon-blue/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-xl p-6 border border-neon-blue/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Search Cars</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-dark-card border border-neon-blue/20 rounded-lg px-4 py-2 text-white focus:border-neon-blue focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Cars Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl border border-neon-blue/20 overflow-hidden"
      >
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
            <p className="text-gray-400 mt-4">Loading cars...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400">No cars found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neon-blue/10 border-b border-neon-blue/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Fuel</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Transmission</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car, index) => (
                  <motion.tr
                    key={car._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-neon-blue/10 hover:bg-neon-blue/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-white font-medium">{car.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{car.year}</td>
                    <td className="px-6 py-4 text-sm text-neon-blue font-semibold">
                      ${(car.price / 1000).toFixed(0)}K
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{car.fuel}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{car.transmission}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          car.status === 'available'
                            ? 'bg-green-500/20 text-green-400'
                            : car.status === 'reserved'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditClick(car)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg text-blue-400 transition-colors"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(car._id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && <AddCarModal onClose={() => setShowAddModal(false)} onCarAdded={handleCarAdded} />}
        {showEditModal && selectedCar && (
          <EditCarModal car={selectedCar} onClose={() => setShowEditModal(false)} onCarUpdated={handleCarUpdated} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminCars

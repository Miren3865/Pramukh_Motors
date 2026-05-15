import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Eye, EyeOff, Car, AlertCircle, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { getAllCars, deleteCar, getCarStats, updateCar } from '../services/api'
import AddCarModal from './AddCarModal'
import CustomSelect from '@/components/ui/CustomSelect'
import EditCarModal from './EditCarModal'

const AdminCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalCars: 0, availableCars: 0, soldCars: 0, reservedCars: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    fetchCars()
    fetchStats()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchCars()
      fetchStats()
    }, 15000)

    return () => clearInterval(intervalId)
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

  const handleDelete = (car) => {
    setDeleteTarget(car)
    setShowDeleteModal(true)
  }

  const handleToggleShowOnUser = async (car) => {
    try {
      const response = await updateCar(car._id, { showOnUser: !car.showOnUser })
      if (response.success) {
        setCars((prevCars) => prevCars.map((item) => item._id === car._id ? response.data : item))
        toast.success(`Car ${!car.showOnUser ? 'shown' : 'hidden'} on user site`)
      }
    } catch (error) {
      toast.error('Failed to update visibility')
      console.error('Visibility toggle error:', error)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    try {
      await deleteCar(deleteTarget._id)
      setCars(cars.filter((car) => car._id !== deleteTarget._id))
      toast.success('Car deleted successfully')
      fetchStats()
    } catch (error) {
      toast.error('Failed to delete car')
    } finally {
      setShowDeleteModal(false)
      setDeleteTarget(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setDeleteTarget(null)
  }

  useEffect(() => {
    if (!showDeleteModal) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        cancelDelete()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showDeleteModal])

  const handleEditClick = (car) => {
    if (car.status === 'sold') return
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

  const visibleCarsCount = cars.filter((car) => car.showOnUser).length

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
              className="w-full rounded-lg px-4 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none"
              style={{ height: '44px', background: '#0d1b2e', border: '1px solid rgba(99,179,237,0.3)' }}
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Filter by Status</label>
            <CustomSelect
              value={filterStatus}
              onChange={(val) => setFilterStatus(val)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'available', label: 'Available' },
                { value: 'reserved', label: 'Reserved' },
                { value: 'sold', label: 'Sold' },
              ]}
              placeholder="Filter by Status"
            />
          </div>
        </div>
      </motion.div>

      {/* Cars Table */}
      <div className="glass rounded-xl border border-neon-blue/20 p-4">
        <p className="text-sm text-yellow-300">Only 6 cars can be publicly visible at one time.</p>
      </div>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Public</th>
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
                      ₹{car.price?.toLocaleString()}
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
                    <td className="px-6 py-4 text-sm">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleToggleShowOnUser(car)}
                        disabled={!car.showOnUser && visibleCarsCount >= 6}
                        title={!car.showOnUser && visibleCarsCount >= 6 ? 'Maximum 6 public cars allowed' : ''}
                        className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          car.showOnUser
                            ? 'bg-green-500/10 border border-green-500/20 text-green-300 hover:bg-green-500/20'
                            : 'bg-slate-700/10 border border-slate-600/20 text-slate-300 hover:bg-slate-700/20'
                        } ${!car.showOnUser && visibleCarsCount >= 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {car.showOnUser ? <Eye size={14} /> : <EyeOff size={14} />}
                        <span>{car.showOnUser ? 'Visible' : 'Hidden'}</span>
                      </motion.button>
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: car.status === 'sold' ? 1 : 1.05 }}
                        whileTap={{ scale: car.status === 'sold' ? 1 : 0.95 }}
                        onClick={() => handleEditClick(car)}
                        disabled={car.status === 'sold'}
                        className={`inline-flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-xs font-medium transition-all ${
                          car.status === 'sold'
                            ? 'bg-gray-700/50 border-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 text-blue-300'
                        }`}
                      >
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(car)}
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-300 transition-all"
                      >
                        <Trash2 size={16} />
                        <span className="text-xs font-medium">Delete</span>
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
        {showDeleteModal && deleteTarget && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-slate-950/95 p-6 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                onClick={cancelDelete}
                className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-100 transition-all duration-200 hover:scale-105 hover:bg-red-500/10 hover:border-red-400/30"
                aria-label="Cancel delete"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Confirm Delete</p>
                <h3 className="mt-3 text-2xl font-bold text-white">Delete this car?</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  This will permanently remove the car from inventory. You cannot undo this action.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/85 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Car preview</p>
                <p className="mt-3 text-sm text-white font-semibold">{deleteTarget.name}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {deleteTarget.year} · {deleteTarget.fuel} · {deleteTarget.transmission}
                </p>
                <p className="mt-2 text-xs text-slate-500">Price: ₹{deleteTarget.price?.toLocaleString()}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:bg-slate-900/95 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="w-full rounded-3xl bg-gradient-to-r from-red-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 sm:w-auto"
                >
                  Delete Car
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminCars

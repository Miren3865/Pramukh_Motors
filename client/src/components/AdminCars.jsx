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
      toast.error('Failed to load cars', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
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
        toast.success(`Vehicle ${!car.showOnUser ? 'visible' : 'hidden'} on public showroom`, {
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
      toast.error('Failed to update visibility', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
      console.error('Visibility toggle error:', error)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    try {
      await deleteCar(deleteTarget._id)
      setCars(cars.filter((car) => car._id !== deleteTarget._id))
      toast.success('Vehicle deleted successfully', {
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
      fetchStats()
    } catch (error) {
      toast.error('Failed to delete vehicle', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
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
    <div className="space-y-8">
      {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary-bg border border-border-light rounded-sm flex items-center justify-center shrink-0">
              <Car className="text-gold-accent w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">Inventory Management</h2>
              <p className="text-text-secondary text-[10px] md:text-sm font-light mt-1">Oversee and update your premium vehicle collection</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto btn-secondary text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 px-6 py-3 md:py-2.5"
          >
            <Plus size={16} />
            Add Vehicle
          </button>
        </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Vehicles', value: stats.totalCars },
          { label: 'Available', value: stats.availableCars },
          { label: 'Reserved', value: stats.reservedCars },
          { label: 'Sold', value: stats.soldCars },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-secondary-bg rounded-sm p-6 border border-border-light text-center"
          >
            <p className="text-text-secondary text-[10px] uppercase tracking-widest mb-2 font-semibold">{stat.label}</p>
            <p className="text-3xl font-bold text-text-primary tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-secondary-bg rounded-sm p-6 border border-border-light"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-text-secondary text-[10px] uppercase tracking-widest mb-2 block font-semibold">Search Inventory</label>
            <input
              type="text"
              placeholder="Search by vehicle name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-primary-bg border border-border-light rounded-sm px-4 py-3 text-text-primary text-sm font-light focus:outline-none focus:border-gold-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-text-secondary text-[10px] uppercase tracking-widest mb-2 block font-semibold">Filter by Status</label>
            <div className="border border-border-light rounded-sm overflow-hidden bg-primary-bg h-[46px]">
               <CustomSelect
                value={filterStatus}
                onChange={(val) => setFilterStatus(val)}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'available', label: 'Available' },
                  { value: 'reserved', label: 'Reserved' },
                  { value: 'sold', label: 'Sold' },
                ]}
                placeholder="Select Status"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cars Table */}
      <div className="bg-secondary-bg rounded-sm border border-border-light p-4">
        <p className="text-xs text-text-secondary flex items-center gap-2">
          <AlertCircle size={14} className="text-gold-accent" />
          Note: Only 6 vehicles can be publicly visible on the showroom floor at one time.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary-bg rounded-sm border border-border-light overflow-hidden"
      >
        {loading ? (
          <div className="p-16 text-center">
            <div className="loader mx-auto"></div>
            <p className="text-text-secondary mt-6 text-sm uppercase tracking-widest">Loading inventory...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="p-16 text-center">
            <Car className="mx-auto text-text-secondary mb-4 opacity-50" size={48} strokeWidth={1} />
            <p className="text-text-secondary text-sm uppercase tracking-widest">No vehicles found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-primary-bg border-b border-border-light">
                  <tr>
                    <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Vehicle Details</th>
                    <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Showroom</th>
                    <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((car, index) => (
                    <motion.tr
                      key={car._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border-light hover:bg-primary-bg transition-colors"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm text-text-primary font-medium">{car.name}</p>
                        <p className="text-xs text-text-secondary font-light mt-1">
                          {car.year} · {car.fuel} · {car.transmission}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-sm text-text-primary font-semibold">
                        ₹{car.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-widest ${
                            car.status === 'available'
                              ? 'bg-success/10 text-success border border-success/20'
                              : car.status === 'reserved'
                              ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                              : 'bg-text-secondary/10 text-text-secondary border border-text-secondary/20'
                          }`}
                        >
                          {car.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => handleToggleShowOnUser(car)}
                          disabled={!car.showOnUser && visibleCarsCount >= 6}
                          title={!car.showOnUser && visibleCarsCount >= 6 ? 'Maximum 6 public cars allowed' : ''}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all ${
                            car.showOnUser
                              ? 'bg-gold-accent/10 border border-gold-accent/50 text-gold-accent hover:bg-gold-accent/20'
                              : 'bg-primary-bg border border-border-light text-text-secondary hover:border-text-secondary'
                          } ${!car.showOnUser && visibleCarsCount >= 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {car.showOnUser ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{car.showOnUser ? 'Visible' : 'Hidden'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-5 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(car)}
                          disabled={car.status === 'sold'}
                          className={`w-8 h-8 rounded-sm inline-flex items-center justify-center transition-colors ${
                            car.status === 'sold'
                              ? 'bg-primary-bg border border-border-light text-text-secondary opacity-50 cursor-not-allowed'
                              : 'bg-primary-bg border border-border-light text-text-secondary hover:text-text-primary hover:border-gold-accent'
                          }`}
                          title="Edit Vehicle"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(car)}
                          className="w-8 h-8 rounded-sm bg-primary-bg border border-border-light inline-flex items-center justify-center text-text-secondary hover:text-error hover:border-error transition-colors"
                          title="Delete Vehicle"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="lg:hidden p-4 space-y-4">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-primary-bg border border-border-light rounded-sm p-5 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-text-primary font-bold text-base">{car.name}</p>
                      <p className="text-[10px] text-text-secondary uppercase tracking-widest mt-1">
                        {car.year} · {car.fuel} · {car.transmission}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span
                        className={`px-3 py-1 rounded-sm text-[9px] font-semibold uppercase tracking-widest text-center ${
                          car.status === 'available'
                            ? 'bg-success/10 text-success border border-success/20'
                            : car.status === 'reserved'
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                            : 'bg-text-secondary/10 text-text-secondary border border-text-secondary/20'
                        }`}
                      >
                        {car.status}
                      </span>
                      <p className="text-xs text-gold-accent font-bold text-right">₹{car.price?.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border-light">
                    <button
                      onClick={() => handleToggleShowOnUser(car)}
                      disabled={!car.showOnUser && visibleCarsCount >= 6}
                      className={`flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] font-semibold uppercase tracking-widest transition-all ${
                        car.showOnUser
                          ? 'bg-gold-accent/10 border border-gold-accent/50 text-gold-accent'
                          : 'bg-secondary-bg border border-border-light text-text-secondary'
                      } ${!car.showOnUser && visibleCarsCount >= 6 ? 'opacity-30' : ''}`}
                    >
                      {car.showOnUser ? <Eye size={14} /> : <EyeOff size={14} />}
                      {car.showOnUser ? 'Visible' : 'Hidden'}
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(car)}
                        disabled={car.status === 'sold'}
                        className="w-10 h-10 rounded-sm bg-secondary-bg border border-border-light flex items-center justify-center text-text-secondary hover:text-gold-accent transition-colors disabled:opacity-30"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(car)}
                        className="w-10 h-10 rounded-sm bg-secondary-bg border border-border-light flex items-center justify-center text-text-secondary hover:text-error transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/90 backdrop-blur-md px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-sm border border-border-light bg-card-bg p-8 shadow-luxury"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 border border-error/50 p-3 rounded-sm bg-error/10">
                  <AlertCircle size={24} className="text-error" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-text-primary tracking-tight">Delete Vehicle</h4>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed font-light">
                    This will permanently remove the vehicle from inventory. This action cannot be reversed.
                  </p>
                </div>
              </div>

              <div className="rounded-sm border border-border-light bg-secondary-bg p-5 mb-8">
                <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-2">Vehicle Preview</p>
                <p className="text-sm text-text-primary font-medium">{deleteTarget.name}</p>
                <p className="mt-1 text-xs text-text-secondary font-light">
                  {deleteTarget.year} · {deleteTarget.fuel} · {deleteTarget.transmission}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="flex-1 btn-secondary text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 bg-error text-white font-semibold rounded-sm px-6 py-3 text-xs uppercase tracking-widest hover:bg-red-700 transition-colors"
                >
                  Delete Vehicle
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

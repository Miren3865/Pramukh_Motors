import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertCircle,
  Calendar,
  Car,
  ClipboardList,
  Clock3,
  Mail,
  Phone,
  Search,
  Trash2,
  User,
  X,
  XCircle,
  ShieldAlert,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { cancelReservation, deleteReservation, getReservations } from '../services/api'

const statusStyles = {
  reserved: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  cancelled: 'bg-error/10 text-error border-error/20',
  sold: 'bg-success/10 text-success border-success/20',
}

const AdminReservations = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchReservations = async () => {
    try {
      setLoading(true)
      const response = await getReservations()
      if (response.success) {
        setReservations(response.data)
      }
    } catch (error) {
      toast.error('Failed to load reservations')
      console.error('Error fetching reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  useEffect(() => {
    if (!selectedReservation && !confirmAction) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedReservation(null)
        setConfirmAction(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedReservation, confirmAction])

  const filteredReservations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return reservations

    return reservations.filter((reservation) => {
      return [
        reservation.customerName,
        reservation.customerEmail,
        reservation.customerPhone,
        reservation.carName,
        String(reservation.carYear || ''),
        String(reservation.carPrice || ''),
        reservation.status,
        reservation.note,
      ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    })
  }, [reservations, searchTerm])

  const openActionModal = (reservation, action) => {
    setSelectedReservation(reservation)
    setConfirmAction(action)
  }

  const closeActionModal = () => {
    if (actionLoading) return
    setSelectedReservation(null)
    setConfirmAction(null)
  }

  const handleConfirmAction = async () => {
    if (!selectedReservation || !confirmAction) return

    try {
      setActionLoading(true)

      if (confirmAction === 'cancel') {
        const response = await cancelReservation(selectedReservation._id)
        if (response.success) {
          setReservations((prev) =>
            prev.map((item) =>
              item._id === selectedReservation._id
                ? { ...item, status: 'cancelled', cancelledAt: response.data?.cancelledAt || new Date().toISOString() }
                : item
            )
          )
          toast.success('Reservation cancelled successfully', {
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
      }

      if (confirmAction === 'delete') {
        const response = await deleteReservation(selectedReservation._id)
        if (response.success) {
          setReservations((prev) => prev.filter((item) => item._id !== selectedReservation._id))
          toast.success('Reservation deleted successfully', {
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
      }

      setSelectedReservation(null)
      setConfirmAction(null)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
      console.error('Reservation action error:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const activeReservations = reservations.filter((reservation) => reservation.status === 'reserved').length
  const cancelledReservations = reservations.filter((reservation) => reservation.status === 'cancelled').length
  const soldReservations = reservations.filter((reservation) => reservation.status === 'sold').length
  const totalReservations = activeReservations + soldReservations

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary-bg border border-border-light rounded-sm flex items-center justify-center">
            <ClipboardList className="text-gold-accent" size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">Client Reservations</h2>
            <p className="text-text-secondary text-sm font-light mt-1">Manage inquiries and finalized vehicle acquisitions</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Inquiries', value: totalReservations },
          { label: 'Active', value: activeReservations },
          { label: 'Sold', value: soldReservations },
          { label: 'Cancelled', value: cancelledReservations },
        ].map((stat, i) => (
          <div key={i} className="bg-secondary-bg p-6 rounded-sm border border-border-light text-center">
            <p className="text-text-secondary text-[10px] uppercase tracking-widest mb-2 font-semibold">{stat.label}</p>
            <p className="text-3xl font-bold text-text-primary tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary-bg rounded-sm p-6 border border-border-light"
      >
        <label className="text-text-secondary text-[10px] uppercase tracking-widest mb-2 block font-semibold">Search Records</label>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-3.5 text-gold-accent" />
          <input
            type="text"
            placeholder="Search by customer, vehicle, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-primary-bg border border-border-light rounded-sm pl-12 pr-4 py-3 text-text-primary text-sm font-light focus:outline-none focus:border-gold-accent transition-colors"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary-bg rounded-sm border border-border-light overflow-hidden"
      >
        {loading ? (
          <div className="text-center py-16">
            <div className="loader mx-auto"></div>
            <p className="text-text-secondary mt-6 text-sm uppercase tracking-widest">Loading reservations...</p>
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="mx-auto text-text-secondary mb-4 opacity-50" size={48} strokeWidth={1} />
            <p className="text-text-secondary text-sm uppercase tracking-widest">No records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-primary-bg border-b border-border-light">
                <tr>
                  <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Client</th>
                  <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Vehicle</th>
                  <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Note</th>
                  <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-text-secondary text-[10px] font-semibold uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation, index) => {
                  const isCancelled = reservation.status === 'cancelled'
                  const isSold = reservation.status === 'sold'
                  const isFinalized = isCancelled || isSold

                  return (
                    <motion.tr
                      key={reservation._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-border-light transition-colors ${
                        isCancelled ? 'bg-primary-bg/50 opacity-70' : isSold ? 'bg-primary-bg/30' : 'hover:bg-primary-bg'
                      }`}
                    >
                      <td className={`px-6 py-5 text-sm font-medium ${isCancelled ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                        {reservation.customerName}
                      </td>
                      <td className={`px-6 py-5 ${isCancelled ? 'opacity-70' : ''}`}>
                        <p className="text-sm text-text-primary font-medium mb-1">{reservation.carName}</p>
                        <p className="text-xs text-text-secondary font-light">
                          {reservation.carYear ? `${reservation.carYear} · ` : ''}
                          {reservation.carPrice ? `₹${reservation.carPrice.toLocaleString()}` : ''}
                        </p>
                      </td>
                      <td className={`px-6 py-5 ${isCancelled ? 'opacity-70' : ''}`}>
                        <div className="space-y-2 text-xs text-text-secondary font-light">
                          <div className="flex items-center gap-2">
                            <Mail size={12} className="text-gold-accent" />
                            <span>{reservation.customerEmail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={12} className="text-gold-accent" />
                            <span>{reservation.customerPhone}</span>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-5 max-w-xs truncate ${isCancelled ? 'opacity-70' : ''}`}>
                         <div className="flex items-start gap-2 text-xs text-text-secondary font-light">
                          <Clock3 size={12} className="mt-0.5 shrink-0 text-gold-accent" />
                          <span className="truncate">{reservation.note || 'No note provided'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex px-3 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-widest border ${statusStyles[reservation.status] || 'bg-text-secondary/10 text-text-secondary border-text-secondary/20'}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-xs text-text-secondary font-light">
                        {new Date(reservation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => openActionModal(reservation, 'cancel')}
                          disabled={isFinalized}
                          className="w-8 h-8 rounded-sm bg-primary-bg border border-border-light inline-flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-gold-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Cancel Reservation"
                        >
                          <XCircle size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openActionModal(reservation, 'delete')}
                          className="w-8 h-8 rounded-sm bg-primary-bg border border-border-light inline-flex items-center justify-center text-text-secondary hover:text-error hover:border-error transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Action Confirmation Modal */}
      <AnimatePresence>
        {selectedReservation && confirmAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/90 backdrop-blur-md px-4 py-8"
            onClick={closeActionModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg overflow-hidden rounded-sm border border-border-light bg-card-bg p-8 shadow-luxury"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`shrink-0 border p-3 rounded-sm ${confirmAction === 'cancel' ? 'bg-gold-accent/10 border-gold-accent/50 text-gold-accent' : 'bg-error/10 border-error/50 text-error'}`}>
                  {confirmAction === 'cancel' ? <XCircle size={24} /> : <Trash2 size={24} />}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-text-primary tracking-tight">
                    {confirmAction === 'cancel' ? 'Cancel Reservation' : 'Delete Record'}
                  </h4>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed font-light">
                    {confirmAction === 'cancel'
                        ? 'This will cancel the reservation and make the vehicle available again.'
                        : 'This will permanently remove the reservation record from the dashboard.'}
                  </p>
                </div>
              </div>

              <div className="rounded-sm border border-border-light bg-secondary-bg p-5 mb-8">
                <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-3">Record Details</p>
                <div className="space-y-2 text-sm text-text-primary font-medium">
                  <p>Client: <span className="font-light">{selectedReservation.customerName}</span></p>
                  <p>Vehicle: <span className="font-light">{selectedReservation.carName}</span></p>
                  <p>Status: <span className="font-light uppercase">{selectedReservation.status}</span></p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={closeActionModal}
                  disabled={actionLoading}
                  className="flex-1 btn-secondary text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAction}
                  disabled={actionLoading}
                  className={`flex-1 font-semibold rounded-sm px-6 py-3 text-xs uppercase tracking-widest transition-colors disabled:opacity-50 text-text-primary ${
                    confirmAction === 'cancel'
                      ? 'bg-gold-accent hover:bg-gold-hover text-primary-bg'
                      : 'bg-error hover:bg-red-700'
                  }`}
                >
                  {actionLoading
                    ? 'Processing...'
                    : confirmAction === 'cancel'
                      ? 'Confirm Cancel'
                      : 'Confirm Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminReservations
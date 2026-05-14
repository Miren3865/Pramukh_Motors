import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertCircle,
  Calendar,
  Car,
  Clock3,
  Mail,
  Phone,
  Search,
  Trash2,
  User,
  X,
  XCircle,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { cancelReservation, deleteReservation, getReservations } from '../services/api'

const statusStyles = {
  reserved: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20',
  cancelled: 'bg-rose-500/15 text-rose-300 border-rose-400/20',
  sold: 'bg-sky-500/15 text-sky-300 border-sky-400/20',
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
          toast.success('Reservation cancelled successfully')
        }
      }

      if (confirmAction === 'delete') {
        const response = await deleteReservation(selectedReservation._id)
        if (response.success) {
          setReservations((prev) => prev.filter((item) => item._id !== selectedReservation._id))
          toast.success('Reservation deleted successfully')
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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Car className="text-neon-blue" size={32} />
          <div>
            <h2 className="text-3xl font-bold text-white">Reservations & Sold</h2>
            <p className="text-gray-400 text-sm">Customer reservation requests and sold vehicles overview</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reservations & Sold', value: totalReservations, icon: '📌' },
          { label: 'Active', value: activeReservations, icon: '✅' },
          { label: 'Sold', value: soldReservations, icon: '✔️' },
          { label: 'Cancelled', value: cancelledReservations, icon: '⛔' },
        ].map((stat) => (
          <div key={stat.label} className="glass-dark p-6 rounded-xl border border-neon-blue/20">
            <div className="text-3xl mb-3">{stat.icon}</div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold gradient-text">{stat.value}</p>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 border border-neon-blue/20"
      >
        <label className="text-gray-300 text-sm mb-2 block">Search Reservations</label>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search customer, car, email, phone, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none"
            style={{ background: '#0d1b2e', border: '1px solid rgba(99,179,237,0.3)' }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-xl border border-neon-blue/20 p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Reservation Records</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="loader mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading reservations...</p>
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400">No reservations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neon-blue/20">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Customer</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Car</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Contact</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Note</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Action</th>
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
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-neon-blue/10 transition-colors ${
                        isCancelled ? 'bg-rose-500/5 opacity-85' : isSold ? 'bg-sky-500/5 opacity-90' : 'hover:bg-neon-blue/5'
                      }`}
                    >
                      <td className={`py-4 px-4 text-white font-semibold ${isCancelled ? 'line-through decoration-rose-400/70 decoration-2' : ''}`}>
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-cyan-300" />
                          {reservation.customerName}
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-gray-300 ${isCancelled ? 'line-through decoration-rose-400/50 decoration-2' : ''}`}>
                        <div className="flex flex-col gap-1">
                          <span className="text-white font-medium">{reservation.carName}</span>
                          <span className="text-xs text-gray-500">
                            {reservation.carYear ? `${reservation.carYear} · ` : ''}
                            {reservation.carPrice ? `₹${reservation.carPrice.toLocaleString()}` : ''}
                          </span>
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-gray-400 ${isCancelled ? 'line-through decoration-rose-400/40 decoration-2' : ''}`}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>{reservation.customerEmail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>{reservation.customerPhone}</span>
                          </div>
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-gray-400 max-w-xs truncate ${isCancelled ? 'line-through decoration-rose-400/40 decoration-2' : ''}`}>
                        <div className="flex items-start gap-2">
                          <Clock3 size={14} className="mt-1 shrink-0" />
                          <span>{reservation.note || 'No note provided'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-400">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] border ${statusStyles[reservation.status] || 'bg-slate-500/15 text-slate-300 border-slate-400/20'}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">
                        <Calendar size={16} className="inline mr-2" />
                        {new Date(reservation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-gray-400">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => openActionModal(reservation, 'cancel')}
                            disabled={isFinalized}
                            className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <XCircle size={16} />
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => openActionModal(reservation, 'delete')}
                            className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-sm font-semibold text-fuchsia-200 transition hover:bg-fuchsia-400/20"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedReservation && confirmAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
            onClick={closeActionModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-slate-950/95 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.35),transparent_45%),radial-gradient(circle_at_left,rgba(192,0,255,0.2),transparent_30%)]" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.45em] text-cyan-300/80">
                      {confirmAction === 'cancel' ? 'Confirm Cancel' : 'Confirm Delete'}
                    </p>
                    <h3 className="mt-3 text-3xl font-bold text-white">
                      {confirmAction === 'cancel' ? 'Cancel reservation?' : 'Delete reservation?'}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                      {confirmAction === 'cancel'
                        ? 'This will mark the reservation as cancelled and make the car available again. The record will remain in this tab.'
                        : selectedReservation.status === 'cancelled'
                          ? 'This will permanently remove the cancelled reservation record from the dashboard.'
                          : 'This will permanently remove the reservation record and also make the car available again.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeActionModal}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-100 transition-all duration-200 hover:scale-105 hover:bg-red-500/10 hover:border-red-400/30"
                    aria-label="Close confirmation"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/85 p-5">
                  <div className="flex items-center gap-3 text-cyan-400">
                    <User size={18} />
                    <p className="uppercase text-xs tracking-[0.35em] text-cyan-300/80">Customer</p>
                  </div>
                  <p className="mt-4 text-xl font-semibold text-white">{selectedReservation.customerName}</p>
                  <p className="mt-2 text-sm text-slate-400">{selectedReservation.customerEmail}</p>
                  <p className="mt-1 text-sm text-slate-400">{selectedReservation.customerPhone}</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/85 p-5">
                  <div className="flex items-center gap-3 text-cyan-400">
                    <Car size={18} />
                    <p className="uppercase text-xs tracking-[0.35em] text-cyan-300/80">Car</p>
                  </div>
                  <p className="mt-4 text-xl font-semibold text-white">{selectedReservation.carName}</p>
                  <p className="mt-2 text-sm text-slate-400">
                    {selectedReservation.carYear || 'N/A'} · {selectedReservation.carPrice ? `₹${selectedReservation.carPrice.toLocaleString()}` : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-[1.5rem] border border-cyan-400/10 bg-slate-900/90 p-5">
                  <div className="flex items-center gap-3 text-cyan-400">
                    <ShieldAlert size={18} />
                    <p className="uppercase text-xs tracking-[0.35em] text-cyan-300/80">Note</p>
                  </div>
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-200">
                    {selectedReservation.note || 'No note provided'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 bg-slate-950/80 p-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeActionModal}
                  disabled={actionLoading}
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:bg-slate-900/95 sm:w-auto disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAction}
                  disabled={actionLoading}
                  className={`w-full rounded-3xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] sm:w-auto disabled:opacity-60 ${
                    confirmAction === 'cancel'
                      ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500'
                      : 'bg-gradient-to-r from-fuchsia-500 to-orange-500'
                  }`}
                >
                  {actionLoading
                    ? confirmAction === 'cancel'
                      ? 'Cancelling...'
                      : 'Deleting...'
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
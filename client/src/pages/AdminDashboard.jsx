import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LogOut, Trash2, Mail, User, MessageSquare, Calendar, Car, Eye, X, ClipboardList } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { getContacts, deleteContact, getStats } from '../services/api'
import AdminCars from '../components/AdminCars'
import AdminReservations from '../components/AdminReservations'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(
    ['cars', 'contacts', 'reservations'].includes(searchParams.get('tab'))
      ? searchParams.get('tab')
      : 'contacts'
  )
  const [contacts, setContacts] = useState([])
  const [stats, setStats] = useState({ totalContacts: 0 })
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'cars' || tab === 'contacts' || tab === 'reservations') {
      setActiveTab(tab)
    } else {
      setSearchParams({ tab: 'contacts' }, { replace: true })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }

    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [contactsResponse, statsResponse] = await Promise.all([
        getContacts(),
        getStats(),
      ])

      if (contactsResponse.success) {
        setContacts(contactsResponse.data)
      }
      if (statsResponse.success) {
        setStats(statsResponse.data)
      }
    } catch (error) {
      toast.error('Failed to load dashboard data')
      console.error('Dashboard error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (contact) => {
    setDeleteTarget(contact)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    try {
      await deleteContact(deleteTarget._id)
      setContacts(contacts.filter((contact) => contact._id !== deleteTarget._id))
      if (selectedMessage?._id === deleteTarget._id) {
        setSelectedMessage(null)
      }
      toast.success('Message deleted successfully')
    } catch (error) {
      toast.error('Failed to delete message')
    } finally {
      setShowDeleteConfirm(false)
      setDeleteTarget(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const handleViewMessage = (message) => {
    setSelectedMessage(message)
  }

  const closeMessageModal = () => {
    setSelectedMessage(null)
  }

  useEffect(() => {
    if (!selectedMessage) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMessageModal()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedMessage])

  useEffect(() => {
    if (!showDeleteConfirm) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        cancelDelete()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showDeleteConfirm])

  useEffect(() => {
    if (!showLogoutConfirm) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowLogoutConfirm(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showLogoutConfirm])

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    setShowLogoutConfirm(false)
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
    toast.success('Logged out successfully')
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  const filteredContacts = contacts

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-card">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="glass border-b border-neon-blue/20 sticky top-0 z-40">
        <div className="container-custom h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">PM</span>
            </div>
            <span className="text-xl font-bold gradient-text">Pramukh Motors Admin</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 btn-secondary text-sm"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-neon-blue/20 bg-dark-card sticky top-20 z-30 pt-4 pb-4 mb-6">
        <div className="container-custom flex gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveTab('contacts')
              setSearchParams({ tab: 'contacts' })
            }}
            className={`px-7 py-3 font-semibold transition-all border-b-2 flex items-center gap-3 ${
              activeTab === 'contacts'
                ? 'text-neon-blue border-neon-blue'
                : 'text-gray-400 border-transparent hover:text-neon-blue'
            }`}
          >
            <Mail size={20} />
            Messages
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveTab('cars')
              setSearchParams({ tab: 'cars' })
            }}
            className={`px-7 py-3 font-semibold transition-all border-b-2 flex items-center gap-3 ${
              activeTab === 'cars'
                ? 'text-neon-blue border-neon-blue'
                : 'text-gray-400 border-transparent hover:text-neon-blue'
            }`}
          >
            <Car size={20} />
            Inventory
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveTab('reservations')
              setSearchParams({ tab: 'reservations' })
            }}
            className={`px-7 py-3 font-semibold transition-all border-b-2 flex items-center gap-3 ${
              activeTab === 'reservations'
                ? 'text-neon-blue border-neon-blue'
                : 'text-gray-400 border-transparent hover:text-neon-blue'
            }`}
          >
            <ClipboardList size={20} />
            Reservations
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-dark p-6 rounded-xl border border-neon-blue/20"
              >
                <div className="text-3xl mb-3">📧</div>
                <p className="text-gray-400 text-sm mb-1">Total Messages</p>
                <p className="text-3xl font-bold gradient-text">{stats.totalContacts}</p>
              </motion.div>
            </div>

            {/* Contacts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-dark rounded-xl border border-neon-blue/20 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Contact Submissions</h2>


              {/* Table */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="loader mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading contacts...</p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-400">No messages found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neon-blue/20">
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">Name</th>
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">Email</th>
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">Message</th>
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((contact, index) => (
                        <motion.tr
                          key={contact._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-neon-blue/10 hover:bg-neon-blue/5 transition-colors"
                        >
                          <td className="py-4 px-4 text-white font-semibold">{contact.name}</td>
                          <td className="py-4 px-4 text-gray-400 flex items-center gap-2">
                            <Mail size={16} />
                            {contact.email}
                          </td>
                          <td className="py-4 px-4 text-gray-400 truncate max-w-xs">
                            {contact.message.substring(0, 50)}...
                          </td>
                          <td className="py-4 px-4 text-gray-400 text-sm">
                            <Calendar size={16} className="inline mr-2" />
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleViewMessage(contact)}
                              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                            >
                              <Eye size={16} className="inline mr-2" />
                              View
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(contact)}
                              className="rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/20"
                              title="Delete"
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
          </>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && <AdminCars />}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && <AdminReservations />}
      </main>

      {selectedMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
          onClick={closeMessageModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-slate-950/95 p-6 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeMessageModal}
              className="absolute right-5 top-5 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-100 transition-all duration-200 hover:scale-105 hover:bg-red-500/10 hover:border-red-400/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.18)] focus:outline-none"
              aria-label="Close message"
            >
              <X size={18} />
            </button>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:pr-12">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Message Preview</p>
                <h2 className="text-4xl font-bold text-white">{selectedMessage.name}</h2>
                <p className="text-sm text-slate-400 max-w-2xl">Full message details from the contact submission are shown below.</p>
              </div>
              <div className="rounded-full border border-cyan-400/20 bg-slate-900/90 px-4 py-2 text-sm text-slate-300 shadow-sm">
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/85 p-5 shadow-[0_30px_80px_-40px_rgba(14,165,233,0.15)]">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Mail size={18} />
                  <p className="uppercase text-xs tracking-[0.35em] text-cyan-300/80">Email</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-white break-all">{selectedMessage.email}</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/85 p-5 shadow-[0_30px_80px_-40px_rgba(14,165,233,0.15)]">
                <div className="flex items-center gap-3 text-cyan-400">
                  <MessageSquare size={18} />
                  <p className="uppercase text-xs tracking-[0.35em] text-cyan-300/80">Subject</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-white">{selectedMessage.subject || 'General Inquiry'}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-cyan-400/10 bg-slate-900/90 p-6 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.3)]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Message</p>
                  <h3 className="text-xl font-semibold text-white">Customer note</h3>
                </div>
                <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                  {selectedMessage.status || 'New'}
                </span>
              </div>
              <p className="whitespace-pre-line text-sm leading-7 text-slate-200">{selectedMessage.message}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showDeleteConfirm && deleteTarget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
          onClick={cancelDelete}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-slate-950/95 p-6 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cancelDelete}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-100 transition-all duration-200 hover:scale-105 hover:bg-red-500/10 hover:border-red-400/30"
              aria-label="Close delete confirmation"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Confirm Delete</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Delete this message?</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                This will permanently remove the message from the inbox. You cannot undo this action.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/85 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Message preview</p>
              <p className="mt-3 text-sm text-white">{deleteTarget.message}</p>
              <p className="mt-3 text-xs text-slate-500">From: {deleteTarget.name} — {deleteTarget.email}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={cancelDelete}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:bg-slate-900/95 sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full rounded-3xl bg-gradient-to-r from-red-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 sm:w-auto"
              >
                Delete Message
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
          onClick={cancelLogout}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-slate-950/95 p-6 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Confirm Logout</p>
                <h3 className="mt-3 text-2xl font-bold text-white">Are you sure you want to logout?</h3>
              </div>
              <button
                onClick={cancelLogout}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-100 transition-all duration-200 hover:scale-105 hover:bg-red-500/10 hover:border-red-400/30"
                aria-label="Cancel logout"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-300">
              Logging out will end your current admin session. Any unsaved changes in the dashboard will be lost.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={cancelLogout}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:bg-slate-900/95 sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="w-full rounded-3xl bg-gradient-to-r from-red-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 sm:w-auto"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  )
}

export default AdminDashboard

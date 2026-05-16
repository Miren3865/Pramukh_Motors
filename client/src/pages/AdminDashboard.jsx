import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LogOut, Trash2, Mail, MessageSquare, Calendar, Car, Eye, X, ClipboardList, AlertTriangle } from 'lucide-react'
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
      toast.error('Failed to load dashboard data', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
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
      setStats((prev) => ({ ...prev, totalContacts: prev.totalContacts - 1 }))
      if (selectedMessage?._id === deleteTarget._id) {
        setSelectedMessage(null)
      }
      toast.success('Message deleted successfully', {
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
    } catch (error) {
      toast.error('Failed to delete message', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
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
    toast.success('Logged out successfully', {
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

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  const filteredContacts = contacts

  return (
    <div className="min-h-screen bg-primary-bg font-sans">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-secondary-bg border-b border-border-light sticky top-0 z-40">
        <div className="container-custom h-20 flex items-center justify-between px-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-primary-bg border border-gold-accent rounded-sm flex items-center justify-center shrink-0">
              <span className="text-gold-accent font-bold text-base md:text-lg font-sans tracking-wider">PM</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-text-primary tracking-wide uppercase truncate">
              Pramukh <span className="text-gold-accent font-serif italic normal-case">Motors</span> 
              <span className="text-text-secondary text-xs md:text-sm ml-2 hidden sm:inline">| Portal</span>
            </span>
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-primary-bg border border-border-light text-text-secondary rounded-sm text-[10px] md:text-xs font-semibold uppercase tracking-widest hover:border-gold-accent hover:text-gold-accent transition-colors shrink-0"
          >
            <LogOut size={14} className="md:w-4 md:h-4" />
            <span className="hidden xs:inline">Logout</span>
          </motion.button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-border-light bg-secondary-bg sticky top-20 z-30 pt-4 overflow-x-auto no-scrollbar">
        <div className="container-custom flex gap-2 md:gap-8 px-4 min-w-max">
          <button
            onClick={() => {
              setActiveTab('contacts')
              setSearchParams({ tab: 'contacts' })
            }}
            className={`px-4 md:px-6 py-4 font-semibold text-[10px] md:text-xs uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 md:gap-3 whitespace-nowrap ${activeTab === 'contacts'
                ? 'text-gold-accent border-gold-accent'
                : 'text-text-secondary border-transparent hover:text-gold-accent'
              }`}
          >
            <Mail size={14} className="md:w-4 md:h-4" />
            Inquiries
          </button>
          <button
            onClick={() => {
              setActiveTab('cars')
              setSearchParams({ tab: 'cars' })
            }}
            className={`px-4 md:px-6 py-4 font-semibold text-[10px] md:text-xs uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 md:gap-3 whitespace-nowrap ${activeTab === 'cars'
                ? 'text-gold-accent border-gold-accent'
                : 'text-text-secondary border-transparent hover:text-gold-accent'
              }`}
          >
            <Car size={14} className="md:w-4 md:h-4" />
            Inventory
          </button>
          <button
            onClick={() => {
              setActiveTab('reservations')
              setSearchParams({ tab: 'reservations' })
            }}
            className={`px-4 md:px-6 py-4 font-semibold text-[10px] md:text-xs uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 md:gap-3 whitespace-nowrap ${activeTab === 'reservations'
                ? 'text-gold-accent border-gold-accent'
                : 'text-text-secondary border-transparent hover:text-gold-accent'
              }`}
          >
            <ClipboardList size={14} className="md:w-4 md:h-4" />
            Reservations
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-6 md:py-10 px-4 sm:px-0">
        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary-bg p-8 rounded-sm border border-border-light flex items-center justify-between"
              >
                <div>
                  <p className="text-text-secondary text-xs uppercase tracking-widest mb-2 font-semibold">Total Inquiries</p>
                  <p className="text-4xl font-bold text-text-primary">{stats.totalContacts}</p>
                </div>
                <div className="w-16 h-16 bg-primary-bg border border-border-light rounded-sm flex items-center justify-center">
                  <Mail className="text-gold-accent" size={28} strokeWidth={1.5} />
                </div>
              </motion.div>
            </div>

            {/* Contacts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-secondary-bg rounded-sm border border-border-light p-8"
            >
              <h2 className="text-xl font-bold text-text-primary mb-8 tracking-wide">Client Submissions</h2>

              {/* Table */}
              {loading ? (
                <div className="text-center py-16">
                  <div className="loader mx-auto"></div>
                  <p className="text-text-secondary mt-6 text-sm uppercase tracking-widest">Loading records...</p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="text-center py-16">
                  <MessageSquare className="mx-auto text-text-secondary mb-4 opacity-50" size={48} strokeWidth={1} />
                  <p className="text-text-secondary text-sm uppercase tracking-widest">No inquiries found</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-border-light">
                          <th className="py-4 px-4 text-text-secondary text-xs font-semibold uppercase tracking-widest">Client Name</th>
                          <th className="py-4 px-4 text-text-secondary text-xs font-semibold uppercase tracking-widest">Contact Details</th>
                          <th className="py-4 px-4 text-text-secondary text-xs font-semibold uppercase tracking-widest">Inquiry Preview</th>
                          <th className="py-4 px-4 text-text-secondary text-xs font-semibold uppercase tracking-widest">Received Date</th>
                          <th className="py-4 px-4 text-text-secondary text-xs font-semibold uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContacts.map((contact, index) => (
                          <motion.tr
                            key={contact._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-border-light hover:bg-primary-bg transition-colors"
                          >
                            <td className="py-5 px-4 text-text-primary font-medium text-sm">{contact.name}</td>
                            <td className="py-5 px-4 text-text-secondary text-sm">
                              <div className="flex items-center gap-2">
                                <Mail size={14} className="text-gold-accent" />
                                {contact.email}
                              </div>
                            </td>
                            <td className="py-5 px-4 text-text-secondary text-sm truncate max-w-xs font-light">
                              {contact.message.substring(0, 50)}...
                            </td>
                            <td className="py-5 px-4 text-text-secondary text-sm font-light">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-gold-accent" />
                                {new Date(contact.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="py-5 px-4 flex items-center justify-end gap-3">
                              <button
                                onClick={() => handleViewMessage(contact)}
                                className="w-8 h-8 rounded-sm bg-primary-bg border border-border-light flex items-center justify-center text-text-secondary hover:text-gold-accent hover:border-gold-accent transition-colors"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(contact)}
                                className="w-8 h-8 rounded-sm bg-primary-bg border border-border-light flex items-center justify-center text-text-secondary hover:text-error hover:border-error transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card List */}
                  <div className="lg:hidden space-y-4">
                    {filteredContacts.map((contact, index) => (
                      <motion.div
                        key={contact._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-primary-bg border border-border-light rounded-sm p-5 space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-text-primary font-bold text-base">{contact.name}</p>
                            <p className="text-xs text-text-secondary mt-1 flex items-center gap-1.5">
                              <Calendar size={12} className="text-gold-accent" />
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewMessage(contact)}
                              className="w-10 h-10 rounded-sm bg-secondary-bg border border-border-light flex items-center justify-center text-text-secondary hover:text-gold-accent transition-colors"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(contact)}
                              className="w-10 h-10 rounded-sm bg-secondary-bg border border-border-light flex items-center justify-center text-text-secondary hover:text-error transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="bg-secondary-bg p-3 border border-border-light rounded-sm">
                          <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-1">Email</p>
                          <p className="text-xs text-text-primary break-all">{contact.email}</p>
                        </div>
                        <div className="bg-secondary-bg p-3 border border-border-light rounded-sm">
                          <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-1">Inquiry Preview</p>
                          <p className="text-xs text-text-secondary font-light line-clamp-2">{contact.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && <AdminCars />}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && <AdminReservations />}
      </main>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/90 backdrop-blur-md px-4 py-8"
            onClick={closeMessageModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl overflow-hidden rounded-sm border border-border-light bg-card-bg p-8 shadow-luxury"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeMessageModal}
                className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center rounded-sm border border-border-light bg-secondary-bg text-text-secondary transition-all hover:bg-primary-bg hover:text-text-primary"
                aria-label="Close message"
              >
                <X size={20} />
              </button>

              <div className="mb-8 border-b border-border-light pb-6">
                <p className="text-xs uppercase tracking-widest text-gold-accent font-semibold mb-2">Inquiry Details</p>
                <h2 className="text-3xl font-bold text-text-primary tracking-tight">{selectedMessage.name}</h2>
                <div className="mt-4 inline-flex items-center gap-2 rounded-sm border border-border-light bg-secondary-bg px-3 py-1.5 text-xs text-text-secondary">
                  <Calendar size={14} className="text-gold-accent" />
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-sm border border-border-light bg-secondary-bg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={16} className="text-gold-accent" />
                    <p className="uppercase text-[10px] tracking-widest text-text-secondary font-semibold">Email Address</p>
                  </div>
                  <p className="text-base font-medium text-text-primary break-all">{selectedMessage.email}</p>
                </div>
              </div>

              <div className="rounded-sm border border-border-light bg-secondary-bg p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-1">Message Content</p>
                    <h3 className="text-lg font-semibold text-text-primary">Client Note</h3>
                  </div>
                </div>
                <div className="bg-primary-bg border border-border-light rounded-sm p-5">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-text-secondary font-light">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {showDeleteConfirm && deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/90 backdrop-blur-md px-4 py-8"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md overflow-hidden rounded-sm border border-border-light bg-card-bg p-8 shadow-luxury"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 border border-error/50 p-3 rounded-sm bg-error/10">
                  <AlertTriangle size={24} className="text-error" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-text-primary tracking-tight">Delete Record</h4>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed font-light">
                    This will permanently remove the inquiry from the database. This action cannot be reversed.
                  </p>
                </div>
              </div>

              <div className="rounded-sm border border-border-light bg-secondary-bg p-5 mb-8">
                <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-2">Record Preview</p>
                <p className="text-sm text-text-primary font-medium">{deleteTarget.name}</p>
                <p className="text-xs text-text-secondary mt-1">{deleteTarget.email}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={cancelDelete}
                  className="flex-1 btn-secondary text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-error text-text-primary font-semibold rounded-sm px-6 py-3 text-xs uppercase tracking-widest hover:bg-red-700 transition-colors"
                >
                  Confirm Deletion
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirm Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/90 backdrop-blur-md px-4 py-8"
            onClick={cancelLogout}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md overflow-hidden rounded-sm border border-border-light bg-card-bg p-8 shadow-luxury"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-secondary-bg border border-border-light rounded-sm flex items-center justify-center mx-auto mb-6">
                  <LogOut size={24} className="text-gold-accent" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">End Session</h3>
                <p className="text-sm text-text-secondary font-light">
                  Are you sure you want to log out of the executive portal?
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={cancelLogout}
                  className="flex-1 btn-secondary text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 btn-primary text-xs uppercase tracking-widest"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default AdminDashboard

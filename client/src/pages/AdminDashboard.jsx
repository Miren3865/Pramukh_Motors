import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogOut, Trash2, Mail, User, MessageSquare, Calendar, Car } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { getContacts, deleteContact, getStats } from '../services/api'
import AdminCars from '../components/AdminCars'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('contacts')
  const [contacts, setContacts] = useState([])
  const [stats, setStats] = useState({ totalContacts: 0, newContacts: 0, respondedContacts: 0 })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    try {
      await deleteContact(id)
      setContacts(contacts.filter((contact) => contact._id !== id))
      toast.success('Message deleted successfully')
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
    toast.success('Logged out successfully')
  }

  const filteredContacts = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-card">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="glass border-b border-neon-blue/20 sticky top-0 z-40">
        <div className="container-custom h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold gradient-text">Revora Motors Admin</span>
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
      <div className="border-b border-neon-blue/20 bg-dark-card sticky top-20 z-30">
        <div className="container-custom flex gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-4 font-semibold transition-all border-b-2 flex items-center gap-2 ${
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
            onClick={() => setActiveTab('cars')}
            className={`px-6 py-4 font-semibold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'cars'
                ? 'text-neon-blue border-neon-blue'
                : 'text-gray-400 border-transparent hover:text-neon-blue'
            }`}
          >
            <Car size={20} />
            Inventory
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Messages', value: stats.totalContacts, icon: '📧' },
                { label: 'New Messages', value: stats.newContacts, icon: '🆕' },
                { label: 'Responded', value: stats.respondedContacts, icon: '✅' },
                { label: 'Read Messages', value: stats.totalContacts - stats.newContacts, icon: '👁️' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-dark p-6 rounded-xl border border-neon-blue/20"
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Contacts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-dark rounded-xl border border-neon-blue/20 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Contact Submissions</h2>

              {/* Filter Buttons */}
              <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                {['all', 'new', 'read', 'responded'].map((status) => (
                  <motion.button
                    key={status}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      filter === status
                        ? 'btn-primary'
                        : 'glass border border-neon-blue/20 text-gray-400 hover:text-neon-blue'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </motion.button>
                ))}
              </div>

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
                        <th className="text-left py-4 px-4 text-gray-400 font-semibold">Status</th>
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
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                contact.status === 'new'
                                  ? 'bg-neon-blue/20 text-neon-blue'
                                  : contact.status === 'responded'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-gray-500/20 text-gray-400'
                              }`}
                            >
                              {contact.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(contact._id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
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
      </main>
    </div>
  )
}

export default AdminDashboard

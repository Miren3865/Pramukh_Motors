import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { loginAdmin } from '../services/api'
import { Lock, Mail } from 'lucide-react'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await loginAdmin(formData)
      
      if (response.success) {
        localStorage.setItem('adminToken', response.token)
        toast.success('Login successful!')
        navigate('/admin/dashboard')
      }
    } catch (error) {
      toast.error('Invalid email or password')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-card flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-dark p-8 rounded-2xl border border-neon-blue/20">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white font-bold text-3xl">R</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Pramukh Motors</h1>
            <p className="text-gray-400">Admin Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white font-semibold mb-3">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 text-neon-blue" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-card border border-neon-blue/30 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-semibold mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3 text-neon-blue" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-card border border-neon-blue/30 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg py-3 font-bold mt-8 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin

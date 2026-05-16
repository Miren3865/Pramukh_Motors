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
        toast.success('Authentication successful', {
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
        navigate('/admin/dashboard')
      }
    } catch (error) {
      toast.error('Authentication failed', {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-secondary-bg p-10 rounded-sm border border-border-light shadow-luxury relative overflow-hidden">
          {/* Subtle Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold-accent" />

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary-bg border border-gold-accent rounded-sm flex items-center justify-center mx-auto mb-6">
              <span className="text-gold-accent font-bold text-2xl font-sans tracking-wider">PM</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary tracking-wide uppercase">Pramukh <span className="text-gold-accent font-serif italic normal-case">Motors</span></h1>
            <p className="text-text-secondary text-xs uppercase tracking-[0.2em] mt-2">Executive Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-text-secondary text-xs font-semibold uppercase tracking-widest mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gold-accent" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-primary-bg border border-border-light rounded-sm pl-12 pr-4 py-3 text-text-primary focus:outline-none focus:border-gold-accent transition-all text-sm font-light placeholder:text-gray-600"
                  placeholder="admin@pramukhmotors.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-text-secondary text-xs font-semibold uppercase tracking-widest mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gold-accent" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-primary-bg border border-border-light rounded-sm pl-12 pr-4 py-3 text-text-primary focus:outline-none focus:border-gold-accent transition-all text-sm font-light placeholder:text-gray-600"
                  placeholder="Enter authorized password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-xs uppercase tracking-widest py-4 mt-8 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Access Portal'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin

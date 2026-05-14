import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Check } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { submitContact } from '../services/api'
import LuxuryFormField from './LuxuryFormField'
import { formFieldContainer, iconHover, parallaxItem } from '../animations/variants'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fieldStates, setFieldStates] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    message: '',
  })

  const validateField = (name, value) => {
    const trimmed = value.trim()
    if (name === 'email') {
      if (!trimmed) return 'Please enter your email address.'
      if (!/^[^\s@]+@[^\s@]+\.com$/i.test(trimmed)) return 'Please enter a valid .com email address.'
      return ''
    }
    if (name === 'name') {
      if (!trimmed) return 'Please enter your full name.'
      if (trimmed.length < 2) return 'Name must be at least 2 characters.'
      return ''
    }
    if (name === 'message') {
      if (!trimmed) return 'Please enter your message.'
      if (trimmed.length < 10) return 'Message must be at least 10 characters.'
      return ''
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setFieldErrors((prev) => ({ ...prev, [name]: error }))
    setFieldStates((prev) => ({ ...prev, [name]: !error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const nameError = validateField('name', formData.name)
    const emailError = validateField('email', formData.email)
    const messageError = validateField('message', formData.message)

    const errors = {
      name: nameError,
      email: emailError,
      message: messageError,
    }

    setFieldErrors(errors)
    setFieldStates({
      name: !nameError,
      email: !emailError,
      message: !messageError,
    })

    if (nameError || emailError || messageError) {
      setLoading(false)
      return
    }

    try {
      await submitContact(formData)
      setSuccess(true)
      toast.success('Message sent successfully! We will contact you soon.')
      
      // Reset form with success animation
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setFieldStates({ name: false, email: false, message: false })
        setSuccess(false)
      }, 2000)
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.'
      toast.error(errorMessage)
      console.error('Contact submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9238764501',
      delay: 0,
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@pramukhmotors.com',
      delay: 0.1,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '23, Pramukh Society, Varacha 395006 ',
      delay: 0.2,
    },
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-dark-bg to-dark-card relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-neon-blue opacity-5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-neon-purple opacity-5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ pointerEvents: 'none' }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            animate={{ backgroundPosition: '0% 50%' }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-white">Get in </span>
            <span className="gradient-text-animated neon-glow">Touch</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Have questions? Our dedicated team is ready to assist you
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={index}
                    variants={parallaxItem}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="whileHover"
                    transition={{ delay: info.delay }}
                    viewport={{ once: true }}
                    className="glass-dark p-6 rounded-xl border border-neon-blue/20 hover:border-neon-blue/60 transition-all flex items-center gap-4 cursor-pointer group"
                  >
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center flex-shrink-0"
                      variants={iconHover}
                      whileHover="whileHover"
                    >
                      <Icon className="text-neon-blue" size={24} />
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <motion.p
                        className="text-white font-semibold"
                        whileHover={{ color: '#00D9FF', x: 4 }}
                        transition={{ duration: 0.3 }}
                      >
                        {info.value}
                      </motion.p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Extra Info with Animated Border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-10 glass-dark p-8 rounded-xl border border-neon-blue/20 hover:border-neon-blue/60 transition-all glow-border-enhanced"
            >
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  🕐
                </motion.div>
                Working Hours
              </h4>
              <div className="space-y-2 text-gray-400">
                <motion.p
                  whileHover={{ x: 4, color: '#00D9FF' }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                >
                  Monday - Friday: 9:00 AM - 6:00 PM
                </motion.p>
                <motion.p
                  whileHover={{ x: 4, color: '#00D9FF' }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                >
                  Saturday: 10:00 AM - 5:00 PM
                </motion.p>
                <motion.p
                  whileHover={{ x: 4, color: '#00D9FF' }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                >
                  Sunday: 12:00 PM - 4:00 PM
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="glass-dark p-8 rounded-xl border border-neon-blue/20 glow-border-enhanced relative overflow-hidden"
          >
            {/* Success Overlay Animation */}
            {success && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-xl flex items-center justify-center z-50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.5, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Check className="text-green-400" size={32} />
                  </motion.div>
                  <p className="text-white font-bold">Message Sent!</p>
                </motion.div>
              </motion.div>
            )}

            <motion.div
              className="space-y-6"
              variants={formFieldContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Name Input */}
              <LuxuryFormField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                success={fieldStates.name}
                error={fieldErrors.name}
                required
              />

              {/* Email Input */}
              <LuxuryFormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                success={fieldStates.email}
                error={fieldErrors.email}
                required
              />

              {/* Message Input */}
              <LuxuryFormField
                label="Message"
                type="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your interest or questions..."
                success={fieldStates.message}
                error={fieldErrors.message}
                rows={5}
                required
              />

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-cyan-500 text-slate-950 text-base font-semibold transition duration-200 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </motion.div>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

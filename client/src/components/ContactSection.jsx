import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Check } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { submitContact } from '../services/api'
import LuxuryFormField from './LuxuryFormField'
import { lineVariant, textRevealVariant, subtitleVariant } from '../animations/variants'

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
      if (!/^[^\s@]+@[^\s@]+\.com$/i.test(trimmed)) return 'Please enter a valid email address ending with .com'
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
      toast.success('Message sent successfully. Our concierge will contact you soon.', {
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

      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setFieldStates({ name: false, email: false, message: false })
        setSuccess(false)
      }, 3000)
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.'
      toast.error(errorMessage, {
        style: {
          background: '#1E1E1E',
          color: '#FFFFFF',
          border: '1px solid #C62828',
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Direct Line',
      value: '+91 9238764501',
    },
    {
      icon: Mail,
      label: 'Electronic Mail',
      value: 'admin@pramukhmotors.com',
    },
    {
      icon: MapPin,
      label: 'Showroom Location',
      value: '23, Pramukh Society, Varacha 395006',
    },
  ]

  return (
    <section id="contact" className="section-padding bg-secondary-bg border-t border-border-light relative overflow-hidden">
      <Toaster position="top-right" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.1 }
            }
          }}
          className="text-center mb-16"
        >
          <motion.div
            variants={lineVariant}
            className="h-[2px] bg-gold-accent mx-auto mb-6"
          />
          <motion.h2
            variants={textRevealVariant}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-text-primary"
          >
            Private <span className="text-gold-accent font-serif italic font-medium">Consultation</span>
          </motion.h2>
          <motion.p
            variants={subtitleVariant}
            className="text-text-secondary text-base max-w-2xl mx-auto font-light leading-relaxed"
          >
            Connect with our executive team for bespoke automotive solutions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-8 tracking-wide">Concierge Details</h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    className="bg-primary-bg p-6 rounded-sm border border-border-light hover:border-gold-accent/50 transition-all duration-300 flex items-center gap-6 group"
                  >
                    <div className="w-12 h-12 bg-secondary-bg border border-border-light group-hover:border-gold-accent/50 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="text-gold-accent" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-text-secondary text-[10px] uppercase tracking-widest mb-1">{info.label}</p>
                      <p className="text-text-primary font-medium text-lg group-hover:text-gold-accent transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Business Hours */}
            <div className="mt-10 bg-primary-bg p-8 rounded-sm border border-border-light">
              <h4 className="text-sm font-bold text-text-primary mb-6 uppercase tracking-widest flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold-accent rotate-45" />
                Operating Hours
              </h4>
              <div className="space-y-4 text-text-secondary font-light text-sm">
                <div className="flex justify-between border-b border-border-light pb-2">
                  <span>Monday - Friday</span>
                  <span className="text-text-primary">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between border-b border-border-light pb-2">
                  <span>Saturday</span>
                  <span className="text-text-primary">10:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-text-primary">By Appointment</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="bg-primary-bg p-8 rounded-sm border border-border-light relative overflow-hidden"
          >
            {/* Success Overlay Animation */}
            <AnimatePresence>
              {success && (
                <motion.div
                  className="absolute inset-0 bg-primary-bg/95 backdrop-blur-md flex items-center justify-center z-50 border border-gold-accent/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="text-center px-6"
                    initial={{ scale: 0.9, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="w-16 h-16 bg-gold-accent/10 border border-gold-accent rounded-sm flex items-center justify-center mx-auto mb-6">
                      <Check className="text-gold-accent" size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Message Received</h3>
                    <p className="text-text-secondary font-light">Our concierge will attend to your inquiry shortly.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-2xl font-bold text-text-primary mb-8 tracking-wide">Direct Inquiry</h3>

            <div className="space-y-6">
              <LuxuryFormField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                success={fieldStates.name}
                error={fieldErrors.name}
                required
              />

              <LuxuryFormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                success={fieldStates.email}
                error={fieldErrors.email}
                required
              />

              <LuxuryFormField
                label="Message"
                type="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How may we assist you?"
                success={fieldStates.message}
                error={fieldErrors.message}
                rows={5}
                required
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, borderColor: '#D4AF37', color: '#D4AF37' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="btn-secondary w-full uppercase tracking-wider text-sm mt-4"
                disabled={loading}
                style={{ transition: 'border-color 0.4s ease, color 0.4s ease' }}
              >
                {loading ? 'Transmitting...' : 'Send Inquiry'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

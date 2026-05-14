import React from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, CreditCard, Zap, Users, Award } from 'lucide-react'
import { containerVariants, itemVariants } from '../animations/variants'

const WhyChooseUsSection = () => {
  const reasons = [
    {
      id: 1,
      icon: Shield,
      title: 'Trusted Dealer Network',
      description: 'Partner with verified, certified dealers with decades of combined experience in luxury automotive sales',
    },
    {
      id: 2,
      icon: CheckCircle,
      title: 'Verified Cars',
      description: 'Every vehicle undergoes rigorous multi-point inspection and comes with complete service history verification',
    },
    {
      id: 3,
      icon: CreditCard,
      title: 'Affordable Financing',
      description: 'Flexible payment plans with competitive rates to make your dream car ownership possible',
    },
    {
      id: 4,
      icon: Zap,
      title: 'Fast Documentation',
      description: 'Complete paperwork and registration within 48 hours with our streamlined process',
    },
    {
      id: 5,
      icon: Users,
      title: 'Expert Support',
      description: 'Dedicated customer service team available 24/7 to assist with your purchase',
    },
    {
      id: 6,
      icon: Award,
      title: 'Extended Warranty',
      description: 'Comprehensive warranty coverage with hassle-free claims and nationwide service center network',
    },
  ]

  return (
    <section id="why-us" className="section-padding bg-gradient-to-b from-dark-card to-dark-bg">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="gradient-text neon-glow">Pramukh Motors</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Premium service backed by industry expertise and customer satisfaction
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-dark p-8 rounded-xl border border-neon-blue/20 hover:border-neon-blue/60 transition-all group"
              >
                {/* Icon */}
                <div className="mb-6 relative">
                  <motion.div
                    whileHover={{ rotate: 20, scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl flex items-center justify-center group-hover:from-neon-blue/40 group-hover:to-neon-purple/40 transition-colors"
                  >
                    <Icon className="text-neon-blue group-hover:text-neon-blue" size={28} />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">{reason.description}</p>

                {/* Animated Border */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neon-blue to-neon-purple w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection

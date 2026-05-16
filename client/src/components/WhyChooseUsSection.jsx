import React from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, CreditCard, Zap, Users, Award } from 'lucide-react'
import { containerVariants, itemVariants, lineVariant, textRevealVariant, subtitleVariant } from '../animations/variants'

const WhyChooseUsSection = () => {
  const reasons = [
    {
      id: 1,
      icon: Shield,
      title: 'Trusted Network',
      description: 'Partner with verified, certified dealers with decades of combined experience in luxury automotive sales.',
    },
    {
      id: 2,
      icon: CheckCircle,
      title: 'Verified Inventory',
      description: 'Every vehicle undergoes rigorous multi-point inspection and comes with complete service history verification.',
    },
    {
      id: 3,
      icon: CreditCard,
      title: 'Bespoke Financing',
      description: 'Flexible payment plans with competitive rates tailored to make your dream car ownership possible.',
    },
    {
      id: 4,
      icon: Zap,
      title: 'Seamless Acquisition',
      description: 'Complete paperwork and registration handled smoothly by our dedicated concierge team.',
    },
    {
      id: 5,
      icon: Users,
      title: 'Expert Concierge',
      description: 'Dedicated customer service team available around the clock to assist with your every need.',
    },
    {
      id: 6,
      icon: Award,
      title: 'Extended Assurance',
      description: 'Comprehensive warranty coverage with hassle-free claims and nationwide service center network.',
    },
  ]

  return (
    <section id="why-us" className="section-padding bg-primary-bg">
      <div className="container-custom">
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
            The Pramukh <span className="text-gold-accent font-serif italic font-medium">Advantage</span>
          </motion.h2>
          <motion.p
            variants={subtitleVariant}
            className="text-text-secondary text-base max-w-2xl mx-auto font-light leading-relaxed"
          >
            Premium service backed by industry expertise and an unwavering commitment to client satisfaction.
          </motion.p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                className="bg-secondary-bg p-8 rounded-sm border border-border-light hover:border-gold-accent/50 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group"
              >
                {/* Icon */}
                <div className="mb-8">
                  <div className="w-14 h-14 bg-primary-bg border border-border-light group-hover:border-gold-accent/50 rounded-sm flex items-center justify-center transition-colors">
                    <Icon className="text-gold-accent" size={24} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary mb-3 tracking-wide">{reason.title}</h3>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed font-light text-sm">{reason.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection

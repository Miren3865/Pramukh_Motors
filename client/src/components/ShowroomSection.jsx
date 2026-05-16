import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants, lineVariant, textRevealVariant, subtitleVariant } from '../animations/variants'
import showroomImage from '../assets/showroom.png'

const ShowroomSection = () => {
  const [carsSold, setCarsSold] = useState(0)
  const [customers, setCustomers] = useState(0)
  const [experience, setExperience] = useState(0)
  const [dealers, setDealers] = useState(0)

  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" })

  const targetValues = {
    carsSold: 5420,
    customers: 12800,
    experience: 25,
    dealers: 180,
  }

  useEffect(() => {
    if (!isStatsInView) return;

    const intervals = {
      carsSold: setInterval(() => {
        setCarsSold((prev) => (prev < targetValues.carsSold ? prev + 100 : targetValues.carsSold))
      }, 50),
      customers: setInterval(() => {
        setCustomers((prev) => (prev < targetValues.customers ? prev + 150 : targetValues.customers))
      }, 50),
      experience: setInterval(() => {
        setExperience((prev) => (prev < targetValues.experience ? prev + 0.5 : targetValues.experience))
      }, 50),
      dealers: setInterval(() => {
        setDealers((prev) => (prev < targetValues.dealers ? prev + 3 : targetValues.dealers))
      }, 50),
    }

    return () => {
      clearInterval(intervals.carsSold)
      clearInterval(intervals.customers)
      clearInterval(intervals.experience)
      clearInterval(intervals.dealers)
    }
  }, [isStatsInView])

  const stats = [
    { label: 'Cars Sold', value: carsSold.toLocaleString(), icon: '🚗' },
    { label: 'Happy Customers', value: customers.toLocaleString(), icon: '😊' },
    { label: 'Years Experience', value: Math.floor(experience), icon: '⏱️' },
    { label: 'Verified Dealers', value: dealers.toLocaleString(), icon: '✔️' },
  ]

  return (
    <section id="featured" className="section-padding bg-secondary-bg">
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
            Executive <span className="text-gold-accent font-serif italic font-medium">Showroom</span>
          </motion.h2>
          <motion.p
            variants={subtitleVariant}
            className="text-text-secondary text-base max-w-2xl mx-auto font-light leading-relaxed"
          >
            Immerse yourself in our premier automotive collection, designed for the uncompromising connoisseur.
          </motion.p>
        </motion.div>

        {/* Showroom Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="bg-primary-bg p-2 rounded-sm border border-border-light relative">
              <div className="overflow-hidden rounded-sm relative h-96">
                <img
                  src={showroomImage}
                  alt="Pramukh Motors Luxury Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="pl-0 lg:pl-8"
          >
            <h3 className="text-3xl font-bold text-text-primary mb-6 tracking-tight">The Art of Mobility</h3>
            <p className="text-text-secondary mb-8 leading-relaxed font-light">
              Step into our state-of-the-art facility and experience the pinnacle of automotive excellence. Our dedicated concierges are ready to guide you through an exclusive collection of hand-picked luxury vehicles, each with its own distinguished pedigree.
            </p>
            <ul className="space-y-4">
              {['Bespoke Consultation', 'Private Viewings', 'Tailored Financing', 'White-Glove Delivery'].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-1.5 h-1.5 bg-gold-accent transform rotate-45"></div>
                  <span className="text-text-primary text-sm uppercase tracking-widest">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-primary-bg p-8 rounded-sm border border-border-light hover:border-gold-accent/50 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center group"
            >
              <div className="text-3xl mb-4">{stat.icon}</div>
              <h4 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 tracking-tight">
                {stat.value}
                <span className="text-gold-accent">{index === 2 ? '+' : ''}</span>
              </h4>
              <p className="text-text-secondary text-[10px] uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ShowroomSection

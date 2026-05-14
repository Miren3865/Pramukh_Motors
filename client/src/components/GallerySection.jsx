import React from 'react'
import { motion } from 'framer-motion'
import { Image as ImageIcon, Maximize2 } from 'lucide-react'

const GallerySection = () => {
  const galleryImages = [
    {
      id: 1,
      title: 'Sports Car',
      category: 'Sports',
      emoji: '🏎️',
    },
    {
      id: 2,
      title: 'Luxury SUV',
      category: 'SUV',
      emoji: '🚙',
    },
    {
      id: 3,
      title: 'Premium Sedan',
      category: 'Sedan',
      emoji: '🚗',
    },
    {
      id: 4,
      title: 'Interior Luxury',
      category: 'Interior',
      emoji: '🎨',
    },
    {
      id: 5,
      title: 'Showroom',
      category: 'Showroom',
      emoji: '🏢',
    },
    {
      id: 6,
      title: 'Dashboard Tech',
      category: 'Technology',
      emoji: '📊',
    },
  ]

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-dark-card to-dark-bg">
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
            <span className="text-white">Luxury </span>
            <span className="gradient-text neon-glow">Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium automotive imagery
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-xl group cursor-pointer h-64 glass-dark border border-neon-blue/20"
            >
              {/* Image Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 via-neon-purple/10 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-3">{image.emoji}</div>
                  <p className="text-gray-300">{image.title}</p>
                </div>
              </div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent flex items-end justify-between p-6 group-hover:bg-dark-bg/60"
              >
                <div>
                  <p className="text-white font-bold mb-1">{image.title}</p>
                  <p className="text-neon-blue text-sm">{image.category}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-10 h-10 bg-neon-blue rounded-lg flex items-center justify-center text-white"
                >
                  <Maximize2 size={20} />
                </motion.div>
              </motion.div>

              {/* Glow Border on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 border-2 border-neon-blue rounded-xl pointer-events-none"
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection

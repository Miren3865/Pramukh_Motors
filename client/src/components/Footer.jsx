import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: ['About Us', 'Careers', 'Blog', 'Press'],
    Support: ['Help Center', 'Contact Us', 'FAQ', 'Documentation'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
    Social: [
      { icon: Facebook, label: 'Facebook', url: '#' },
      { icon: Instagram, label: 'Instagram', url: '#' },
      { icon: Twitter, label: 'Twitter', url: '#' },
      { icon: Linkedin, label: 'LinkedIn', url: '#' },
    ],
  }

  return (
    <footer className="bg-gradient-to-b from-dark-card to-dark-bg border-t border-neon-blue/20">
      {/* Gradient Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-neon-blue to-neon-purple"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-[320px] leading-relaxed"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl shrink-0 bg-gradient-to-br from-neon-blue to-neon-purple shadow-[0_0_30px_rgba(0,217,255,0.18)]">
                <span className="text-white font-bold text-lg">PM</span>
              </div>
              <span className="text-2xl font-bold gradient-text whitespace-nowrap">Pramukh Motors</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Premium second-hand luxury cars for discerning buyers who demand excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-neon-blue transition-colors">
                <Phone size={18} className="flex-shrink-0" />
                <span className="leading-relaxed">+91 9238764501</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-neon-blue transition-colors">
                <Mail size={18} className="flex-shrink-0" />
                <span className="leading-relaxed break-words">hello@pramukhmotors.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-neon-blue transition-colors">
                <MapPin size={18} className="flex-shrink-0" />
                <span className="leading-relaxed break-words">23, Pramukh Society, Varacha 395006</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.18em] mb-4">Company</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footerLinks.Company.map((link, index) => (
                <li key={index}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href="#"
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-200 block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.18em] mb-4">Support</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footerLinks.Support.map((link, index) => (
                <li key={index}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href="#"
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-200 block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.18em] mb-4">Legal</h4>
            <ul className="space-y-3 text-sm font-medium">
              {footerLinks.Legal.map((link, index) => (
                <li key={index}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href="#"
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-200 block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-[0.18em] mb-3">Follow Us</h4>
            <div className="flex items-center gap-4">
              {footerLinks.Social.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    href={social.url}
                    className="w-11 h-11 bg-dark-card border border-neon-blue/10 rounded-2xl flex items-center justify-center text-neon-blue hover:border-neon-blue/30 hover:bg-neon-blue/10 transition-all duration-200"
                    title={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neon-blue/20 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              © {currentYear} Pramukh Motors. All rights reserved. Designed with{' '}
              <Heart className="inline w-4 h-4 text-neon-blue" /> by the Pramukh Team.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4"
            >
              <span className="text-gray-400 text-sm">Made with ❤️ for car enthusiasts</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

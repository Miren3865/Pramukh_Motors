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

      <div className="container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold gradient-text">Revora Motors</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Premium second-hand luxury cars for discerning buyers who demand excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm hover:text-neon-blue transition-colors">
                <Phone size={16} />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm hover:text-neon-blue transition-colors">
                <Mail size={16} />
                <span>hello@revoramotors.com</span>
              </div>
              <div className="flex items-start gap-2 text-gray-400 text-sm hover:text-neon-blue transition-colors">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.Company.map((link, index) => (
                <li key={index}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="text-gray-400 hover:text-neon-blue transition-colors text-sm"
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
          >
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.Support.map((link, index) => (
                <li key={index}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="text-gray-400 hover:text-neon-blue transition-colors text-sm"
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
          >
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.Legal.map((link, index) => (
                <li key={index}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="text-gray-400 hover:text-neon-blue transition-colors text-sm"
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
          >
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {footerLinks.Social.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    href={social.url}
                    className="w-10 h-10 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center text-neon-blue hover:from-neon-blue/40 hover:to-neon-purple/40 transition-colors"
                    title={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-dark p-8 rounded-xl border border-neon-blue/20 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400">Get updates on new luxury car arrivals and exclusive offers</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 md:flex-none bg-dark-card border border-neon-blue/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-all placeholder-gray-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-3 font-bold"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-neon-blue/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              © {currentYear} Revora Motors. All rights reserved. Designed with{' '}
              <Heart className="inline w-4 h-4 text-neon-blue" /> by the Revora Team.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
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

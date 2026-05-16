import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react'

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
    <footer className="bg-primary-bg border-t border-border-light">
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-sm shrink-0 bg-secondary-bg border border-gold-accent">
                <span className="text-gold-accent font-bold text-lg font-sans tracking-wider">PM</span>
              </div>
              <span className="text-xl font-bold text-text-primary tracking-wide uppercase">Pramukh <span className="text-gold-accent font-serif italic normal-case">Motors</span></span>
            </div>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              Premium second-hand luxury cars for discerning buyers who demand excellence and uncompromised quality.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-text-secondary text-sm hover:text-gold-accent transition-colors">
                <Phone size={18} className="flex-shrink-0" />
                <span className="leading-relaxed">+91 9238764501</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm hover:text-gold-accent transition-colors">
                <Mail size={18} className="flex-shrink-0" />
                <span className="leading-relaxed break-words">concierge@pramukhmotors.com</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm hover:text-gold-accent transition-colors">
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
            <h4 className="text-text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              {footerLinks.Company.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-text-secondary hover:text-gold-accent transition-colors duration-200 block text-left w-full"
                  >
                    {link}
                  </motion.button>
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
            <h4 className="text-text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              {footerLinks.Support.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link === 'Contact Us') {
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-text-secondary hover:text-gold-accent transition-colors duration-200 block text-left w-full"
                  >
                    {link}
                  </motion.button>
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
            <h4 className="text-text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              {footerLinks.Legal.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-text-secondary hover:text-gold-accent transition-colors duration-200 block text-left w-full"
                  >
                    {link}
                  </motion.button>
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
            <h4 className="text-text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Follow Us</h4>
            <div className="flex items-center gap-4">
              {footerLinks.Social.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    href={social.url}
                    className="w-10 h-10 bg-secondary-bg border border-border-light rounded-sm flex items-center justify-center text-text-secondary hover:border-gold-accent hover:text-gold-accent transition-all duration-200"
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
        <div className="border-t border-border-light pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-text-secondary text-xs uppercase tracking-wider text-center md:text-left"
            >
              © {currentYear} Pramukh Motors. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4"
            >
              <span className="text-text-secondary text-xs uppercase tracking-wider">Executive Automotive Experience</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

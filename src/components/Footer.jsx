import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Mail, Phone, MapPin, Github, Twitter, Instagram } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '/Logo.svg'

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past 200vh (2 * window.innerHeight)
      setShowBackToTop(window.scrollY > 2 * window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <img src={Logo} alt="StyleMe Logo" className="h-12 md:h-16" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            STYLE ME
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl">
            Transform your fashion ideas into reality with AI-powered design tools
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12 border-y border-white/[0.08]">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {['Home', 'Generate', 'Pricing', 'Dashboard'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-base text-zinc-400 hover:text-white transition-colors inline-block hover:translate-x-0.5 transform duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Company</h3>
            <ul className="space-y-2.5">
              {['About'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '')}`}
                    className="text-base text-zinc-400 hover:text-white transition-colors inline-block hover:translate-x-0.5 transform duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Resources</h3>
            <ul className="space-y-2.5">
              {['Documentation', 'Help Center', 'Community', 'Updates'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-base text-zinc-400 hover:text-white transition-colors inline-block hover:translate-x-0.5 transform duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-xl font-semibold text-white">Contact</h3>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="mailto:support@styleme.com" 
                  className="text-base text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group hover:translate-x-0.5 transform duration-200"
                >
                  <Mail className="h-4 w-4 group-hover:text-white/90" />
                  support@styleme.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+1234567890" 
                  className="text-base text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group hover:translate-x-0.5 transform duration-200"
                >
                  <Phone className="h-4 w-4 group-hover:text-white/90" />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <div className="text-base text-zinc-400 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  123 Fashion Ave, Style City
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Twitter className="h-5 w-5" />, url: 'https://twitter.com' },
              { icon: <Instagram className="h-5 w-5" />, url: 'https://instagram.com' },
              { icon: <Github className="h-5 w-5" />, url: 'https://github.com' }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.url}
                className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/[0.06] rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
            <span className="text-zinc-400">
              © {new Date().getFullYear()} StyleMe. All rights reserved.
            </span>
            <div className="flex items-center gap-4 md:ml-6">
              <Link to="/privacy" className="text-zinc-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <span className="text-zinc-700">•</span>
              <Link to="/terms" className="text-zinc-400 hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 right-6 bg-black hover:bg-zinc-900 border border-white/[0.08] rounded-full p-3 backdrop-blur-sm transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <ArrowUp className="h-5 w-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}

export default Footer
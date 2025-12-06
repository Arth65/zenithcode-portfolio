'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Define your navigation links here
// We changed '#' to '/' so they go to the actual pages you are building
const items = [
  { label: 'What we do', href: '/what-we-do' }, // Make sure you have a folder for this
  { label: 'Work', href: '/work' },             // Make sure you have a folder for this
  { label: 'About us', href: '/about-us' },        // Make sure you have a folder for this
  { label: 'Our solution', href: '/our-solution' } // ✅ FIXED: Points to your new page
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Handle Intro Animation timing
  useEffect(() => {
    const handler = () => setReady(true)
    if (typeof window !== 'undefined' && window.__introDone) setReady(true)
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 bg-transparent" // Changed z-20 to z-50 so it sits above everything
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10 py-5">

        {/* LOGO */}
        <Link href="/" className="text-white/90 font-semibold tracking-tight text-xl z-50">
          ZenithCode
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {items.map((i) => (
            <Link
              key={i.label}
              href={i.href}
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex rounded-full bg-white/10 px-5 py-2 text-sm text-white/90 backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/5"
          >
            Get in touch
          </Link>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-white/20 z-50 backdrop-blur-md"
          >
            <span className="sr-only">Menu</span>
            {/* Hamburger / Close Icon Switch */}
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU FULLSCREEN OVERLAY */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8" role="dialog" aria-modal="true">
            {items.map((i) => (
              <Link
                key={i.label}
                href={i.href}
                onClick={() => setOpen(false)}
                className="text-white/90 text-2xl font-light hover:text-purple-400 transition-colors"
              >
                {i.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
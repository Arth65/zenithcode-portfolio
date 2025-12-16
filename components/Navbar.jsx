'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Define your navigation links here
const items = [
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'About us', href: '/about-us' },
  { label: 'Our solution', href: '/our-solution' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [videoMode, setVideoMode] = useState(false) // New state for Logo vs Tagline
  const pathname = usePathname()

  // Use GSAP for Scroll ScrollTrigger - trigger when video is fully visible
  useGSAP(() => {
    // If not on home page, always show logo (videoMode = true)
    if (pathname !== '/') {
      setVideoMode(true)
      return
    }

    // On home page, start with tagline (videoMode = false) unless scrolled
    setVideoMode(false)

    const trigger = ScrollTrigger.create({
      // Trigger after the hero animation completes (200vh scroll distance)
      start: () => `top -${window.innerHeight * 1.8}px`, // ~180vh scroll
      onEnter: () => setVideoMode(true),
      onLeaveBack: () => setVideoMode(false),
      // markers: true 
    })

    return () => trigger.kill()
  }, [pathname])


  // Handle Intro Animation timing
  useEffect(() => {
    const handler = () => setReady(true)
    if (typeof window !== 'undefined' && window.__introDone) setReady(true)
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])

  // Keep existing reveal/hide logic for specific pages if needed, but simplify for this request

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-500`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10 py-5">

        {/* LOGO / TAGLINE AREA */}
        <div className="relative z-50 h-6 flex items-center overflow-hidden w-[300px]">
          {/* Tagline */}
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 text-white/80 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-500 ${videoMode ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-[-50%]'}`}
          >
            TURNING COMPLEXITY INTO CLARITY
          </span>

          {/* Logo (Appears on Scroll) */}
          <Link
            href="/"
            className={`absolute left-0 top-1/2 -translate-y-1/2 text-white font-[family-name:var(--font-outfit)] font-bold text-xl tracking-tight transition-all duration-500 ${videoMode ? 'opacity-100 translate-y-[-50%]' : 'opacity-0 translate-y-full'}`}
          >
            ZENITH
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-12">
          {items.map((i) => (
            <Link
              key={i.label}
              href={i.href}
              className="text-white/60 hover:text-white transition-colors text-[13px] font-mono tracking-widest uppercase"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 hover:text-white text-white/80 px-4 py-2 text-[12px] font-mono tracking-widest uppercase transition-all backdrop-blur-sm border border-white/10 rounded-sm"
          >
            CONTACT <span className="text-xs">↗</span>
          </Link>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-white/20 z-50 backdrop-blur-md"
          >
            <span className="sr-only">Menu</span>
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

      {/* Mobile Menu */}
      {open && (
        <motion.div className="md:hidden fixed inset-0 z-30 bg-black/95 backdrop-blur-xl" onClick={() => setOpen(false)}>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white/90 hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <div className="mx-auto mt-24 w-full px-6 flex flex-col gap-8">
            {items.map((i) => (
              <Link
                key={i.label}
                href={i.href}
                className="text-white/90 text-2xl font-light tracking-wide border-b border-white/10 pb-4"
              >
                {i.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-4 inline-flex justify-center rounded-sm bg-white text-black px-6 py-3 font-mono text-sm uppercase tracking-widest">
              Get in touch
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
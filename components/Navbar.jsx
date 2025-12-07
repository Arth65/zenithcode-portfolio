'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const items = [
  { label: 'What we do', href: '/what-we-do' },
  { label: 'Work', href: '#work' },
  { label: 'About us', href: '#about' },
  { label: 'Our solution', href: '#solution' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const lastY = useRef(0)
  const pathname = usePathname()
  const solid = pathname === '/' ? false : !atTop
  const [revealHide, setRevealHide] = useState(false)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    const handler = () => setReady(true)
    if (typeof window !== 'undefined' && window.__introDone) setReady(true)
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      setScrolled(y > 4)
      setAtTop(y <= 4)
      if (open) { setHidden(false); lastY.current = y; return }
      if (y > lastY.current + 8 && y > 40) setHidden(true)
      else if (y < lastY.current - 6 || y <= 40) setHidden(false)
      lastY.current = y
    }
    if (typeof window !== 'undefined' && window.__lenis && window.__lenis.on) {
      window.__lenis.on('scroll', onScroll)
      return () => { if (window.__lenis && window.__lenis.off) window.__lenis.off('scroll', onScroll) }
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [open])
  useEffect(() => {
    const onReveal = (e) => {
      const val = typeof e.detail === 'boolean' ? e.detail : (window.__wwdReveal || false)
      if (pathname === '/what-we-do') setRevealHide(!!val)
      else setRevealHide(false)
    }
    window.addEventListener('wwd:reveal', onReveal)
    return () => window.removeEventListener('wwd:reveal', onReveal)
  }, [pathname])
  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={ready ? (revealHide ? { opacity: 0, y: -100 } : hidden ? { opacity: 1, y: -100 } : { opacity: 1, y: 0 }) : { opacity: 0, y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-20 ${solid ? 'bg-black' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10 py-5">
        <Link href="/" className="text-white/90 font-semibold tracking-tight">ZenithCode</Link>
        <nav className="hidden md:flex items-center gap-10">
          {items.map((i) => (
            <Link
              key={i.label}
              href={i.href}
              onClick={() => {
                window.dispatchEvent(new Event('nav:loader'))
              }}
              className="text-white/70 hover:text-white transition-colors text-[16px]"
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="#contact" onClick={() => window.dispatchEvent(new Event('nav:loader'))} className="hidden md:inline-flex rounded-full bg-white/10 px-4 py-2 text-[16px] text-white/90 backdrop-blur-sm hover:bg-white/20 transition-colors">Get in touch</Link>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white/90 hover:bg-white/20"
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: solid && scrolled ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10"
      />
      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white/90 hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <div className="mx-auto mt-20 w-full max-w-7xl px-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-start gap-6" role="dialog" aria-modal="true">
              {items.map((i) => (
                <Link
                  key={i.label}
                  href={i.href}
                  onClick={() => {
                    window.dispatchEvent(new Event('nav:loader'))
                    setOpen(false)
                  }}
                  className="text-white/90 text-lg"
                >
                  {i.label}
                </Link>
              ))}
              <Link href="#contact" onClick={() => { window.dispatchEvent(new Event('nav:loader')); setOpen(false) }} className="rounded-full bg-white/10 px-4 py-2 text-white/90">Get in touch</Link>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  )
}

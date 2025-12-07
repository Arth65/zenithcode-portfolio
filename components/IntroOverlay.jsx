'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const text = 'precision is our baseline.'

const parent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.035, delayChildren: 0.15 }
  },
  exit: { opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const letter = {
  hidden: { opacity: 0, y: 8, filter: 'blur(2px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

function ArcLoader() {
  return (
    <div className="relative h-[140px] w-[140px] flex items-center justify-center">
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0) 60%)' }}
        animate={{ scale: [0.94, 1.06, 0.94], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.svg
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        width="140"
        height="140"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
        style={{ color: '#fff' }}
      >
        <path
          d={`M120 120 C60 40, 20 40, 20 120 C20 200, 60 200, 120 120`}
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M120 120 C180 40, 220 40, 220 120 C220 200, 180 200, 120 120`}
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>
    </div>
  )
}

export default function IntroOverlay() {
  const [show, setShow] = useState(true)
  const [mode, setMode] = useState('intro')
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const onNavLoader = () => {
      setMode('nav')
      setShow(true)
      const t = setTimeout(() => setShow(false), 900)
      return () => clearTimeout(t)
    }
    window.addEventListener('nav:loader', onNavLoader)
    return () => window.removeEventListener('nav:loader', onNavLoader)
  }, [])

  return (
    <AnimatePresence onExitComplete={() => {
      if (mode === 'intro') {
        const ssr = document.getElementById('intro-overlay-ssr')
        if (ssr) ssr.style.display = 'none'
        if (typeof window !== 'undefined') {
          window.__introDone = true
          window.dispatchEvent(new Event('intro:done'))
        }
      }
    }}>
      {show && (
        mode === 'intro' ? (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={parent}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
          >
            <motion.p className="text-white/90 font-extralight tracking-tight text-center px-6 text-[clamp(1.25rem,4.5vw,2.25rem)]">
              {text.split('').map((ch, i) => (
                <motion.span key={i} variants={letter} className="inline-block">
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black will-change-transform"
          >
            <ArcLoader />
          </motion.div>
        )
      )}
    </AnimatePresence>
  )
}

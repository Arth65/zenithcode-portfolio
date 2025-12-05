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

export default function IntroOverlay() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={() => {
      const ssr = document.getElementById('intro-overlay-ssr')
      if (ssr) ssr.style.display = 'none'
      if (typeof window !== 'undefined') {
        // @ts-ignore
        window.__introDone = true
        window.dispatchEvent(new Event('intro:done'))
      }
    }}>
      {show && (
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
      )}
    </AnimatePresence>
  )
}

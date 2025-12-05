'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const textParent = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const textChild = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.06 }
  }
}

 

export default function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const handler = () => setReady(true)
    if (typeof window !== 'undefined' && window.__introDone) setReady(true)
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-transparent">

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 md:pt-24"
      >
        <div className="flex w-full items-start justify-between gap-10">
          <motion.div initial="hidden" animate="show" variants={textParent} className="max-w-3xl">
            <motion.h1 variants={textChild} className="font-sans text-white/95 font-extralight leading-[1.02] sm:leading-[0.98] tracking-tight text-[clamp(2rem,8vw,6rem)] sm:text-[clamp(2.2rem,7vw,6.5rem)] xl:text-[clamp(3rem,6vw,7rem)]">
              Where thoughtful design meets
            </motion.h1>
            <motion.h1 variants={textChild} className="font-sans text-white/95 font-extralight leading-[1.02] sm:leading-[0.98] tracking-tight text-[clamp(2rem,8vw,6rem)] sm:text-[clamp(2.2rem,7vw,6.5rem)] xl:text-[clamp(3rem,6vw,7rem)]">
              powerful automation.
            </motion.h1>
            <motion.p variants={textChild} className="mt-6 max-w-xl text-white/70 text-[clamp(0.95rem,1.3vw,1.25rem)] sm:text-[clamp(1rem,1.5vw,1.35rem)] leading-relaxed">
              We help businesses grow through modern Web Development and smart Automation. From fast, clean websites to automated workflows and AI-powered systems, we build solutions that save time, improve efficiency, and scale with your business.
            </motion.p>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  )
}


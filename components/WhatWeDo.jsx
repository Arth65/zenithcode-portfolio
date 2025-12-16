'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView, useReducedMotion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import FlowingMenu from './FlowingMenu'
import ChromaGrid from './ChromaGrid'
import Footer from './Footer'


export default function WhatWeDo() {
  const [reveal, setReveal] = useState(false)
  const reduce = useReducedMotion()
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.25 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const glowY1 = useTransform(scrollYProgress, [0, 1], [0, 80])
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, -60])

  useEffect(() => {
    if (reduce) controls.set({ opacity: 1, y: 0 })
    else if (inView) controls.start({ opacity: 1, y: 0 })
  }, [inView, reduce, controls])

  useEffect(() => {
    const handler = () => { if (!reduce && inView) controls.start({ opacity: 1, y: 0 }) }
    if (typeof window !== 'undefined' && window.__lenis && window.__lenis.on) {
      window.__lenis.on('scroll', handler)
      return () => { if (window.__lenis && window.__lenis.off) window.__lenis.off('scroll', handler) }
    }
  }, [inView, reduce, controls])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.__wwdReveal = reveal
      window.dispatchEvent(new CustomEvent('wwd:reveal', { detail: reveal }))
    }
  }, [reveal])

  return (
    <section ref={ref} className="relative w-full bg-black">
      <div id="wwd-hero-video" className="relative h-[100dvh] w-full" onMouseLeave={() => setReveal(false)}>
        <video src="/what_we_do.mp4" autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: reveal ? 0 : 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-black/60 pointer-events-none"
        />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 md:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={reveal ? { opacity: 0 } : { opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.2, damping: 22 }}
            className="max-w-5xl text-white/95 font-extralight tracking-tight leading-[1.02] text-[clamp(2rem,6vw,5.5rem)] font-[family-name:var(--font-outfit)]"
          >
            Crafting intelligent systems that power the next generation of business.
          </motion.h1>
        </div>
        <motion.button
          aria-label="Reveal video"
          aria-pressed={reveal}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: reveal ? 0 : 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 right-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white/90 backdrop-blur-sm"
          onMouseEnter={() => setReveal(true)}
          onMouseLeave={() => setReveal(false)}
          onFocus={() => setReveal(true)}
          onBlur={() => setReveal(false)}
          onClick={() => setReveal((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </motion.button>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ y: reduce ? 0 : glowY1, opacity: 0.75, filter: 'blur(50px)' }} className="absolute top-10 left-1/4 h-72 w-72 rounded-full">
          <div className="h-full w-full" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(147,197,253,0.16) 0%, rgba(0,0,0,0) 70%)' }} />
        </motion.div>
        <motion.div style={{ y: reduce ? 0 : glowY2, opacity: 0.7, filter: 'blur(60px)' }} className="absolute bottom-10 right-1/5 h-80 w-80 rounded-full">
          <div className="h-full w-full" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(167,139,250,0.14) 0%, rgba(0,0,0,0) 70%)' }} />
        </motion.div>
      </div>

      <ImpactSection />
      <ExpertiseSection />
      <PartnershipsSection />
      <Footer />
    </section>
  )
}

function ImpactRow({ label, text, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] })
  const scale = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [1, 1.02, 1])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.6, 1, 0.6])


  return (
    <div ref={ref} className="relative" data-impact-row={index}>
      <motion.div style={{ scale, opacity }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.4, once: false }} transition={{ duration: 0.6, ease: 'easeOut' }} className="grid grid-cols-1 gap-2 py-8 lg:grid-cols-12">
        <motion.h4 data-impact-label={index} className="lg:col-span-4 text-white/90 text-[clamp(1.1rem,1.6vw,1.5rem)] font-medium">
          {label}
        </motion.h4>
        <p className="lg:col-span-8 text-neutral-300 text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed">
          {text}
        </p>
      </motion.div>
      <div className="h-px w-full bg-white/10" />
    </div>
  )
}

function BubbleArrow({ className = '', style }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.button
      aria-label="Scroll focus"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={("relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md ") + className}
      style={style}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 40%, rgba(255,255,255,0.35))'
        }}
        animate={{ rotate: hover ? 45 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="absolute inset-[2px] rounded-full bg-black/60 ring-1 ring-white/20" />
      <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 12h10M15 8l4 4-4 4" />
      </svg>
    </motion.button>
  )
}

function ImpactSection() {
  const impactItems = [
    {
      link: '#seamless',
      text: 'Seamless integration',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop'
    },
    {
      link: '#execution',
      text: 'Bias toward execution',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
    },
    {
      link: '#excellence',
      text: 'Engineering excellence',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop'
    },
    {
      link: '#ai',
      text: 'AI-driven acceleration',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
    }
  ]

  return (
    <section className="relative w-full bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-white/95 font-extralight tracking-tight text-[clamp(2rem,5vw,4.5rem)] leading-[1.04] text-center mb-12 font-[family-name:var(--font-outfit)]"
        >
          How we elevate your product
        </motion.h2>

        {/* Flowing Menu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="h-[500px] sm:h-[550px] lg:h-[600px] relative"
        >
          <FlowingMenu items={impactItems} />
        </motion.div>
      </div>
    </section>
  )
}

function Avatars({ count = 5, more = '', images = [] }) {
  // Use provided images or fallback to random Unsplash images
  const avatarImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  ]

  const displayImages = avatarImages.slice(0, count)

  return (
    <div className="mt-8 flex items-center">
      <div className="flex -space-x-3">
        {displayImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="inline-block h-10 w-10 rounded-full ring-2 ring-black object-cover"
          />
        ))}
      </div>
      {more && <span className="ml-4 text-white/50 text-sm font-light">{more}</span>}
    </div>
  )
}

function ExpertiseSection() {
  const cols = [
    {
      title: 'STRATEGY & PRODUCT',
      items: [
        'Digital Strategy & Roadmapping',
        'Automation Strategy',
        'AI Opportunity Mapping'
      ],
      more: '+3',
      avatarCount: 4,
      offset: 'lg:mt-20' // Most offset - at bottom
    },
    {
      title: 'DESIGN & EXPERIENCE',
      items: [
        'UX Design',
        'UI & Visual Design',
        'Workflow & System Design'
      ],
      more: '+6',
      avatarCount: 5,
      offset: 'lg:mt-10' // Middle offset
    },
    {
      title: 'ENGINEERING & AUTOMATION',
      items: [
        'Web Development',
        'AI Engineering',
        'Automation & Integrations',
        'Cloud & DevOps'
      ],
      more: '+12',
      avatarCount: 5,
      offset: 'lg:mt-0' // No offset - at top
    }
  ]

  return (
    <section className="relative w-full bg-black py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/95 font-extralight tracking-tight text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-[family-name:var(--font-outfit)]"
        >
          Excellence in every layer
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {cols.map((c, colIndex) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: colIndex * 0.15
              }}
              className={`relative ${c.offset}`}
            >
              {/* Top divider line with animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: colIndex * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-full bg-white/15 origin-left"
              />

              <div className="mt-6">
                {/* Category label */}
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: colIndex * 0.15 + 0.3 }}
                  className="text-white/50 text-[11px] tracking-[0.2em] font-medium uppercase"
                >
                  {c.title}
                </motion.p>

                {/* Service items with staggered animation */}
                <ul className="mt-6 space-y-3">
                  {c.items.map((it, itemIndex) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: colIndex * 0.15 + 0.4 + itemIndex * 0.08,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="text-white/90 text-[clamp(1.1rem,1.6vw,1.4rem)] font-light leading-relaxed"
                    >
                      {it}
                    </motion.li>
                  ))}
                </ul>

                {/* Avatar group with fade in */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: colIndex * 0.15 + 0.6 }}
                >
                  <Avatars count={c.avatarCount} more={c.more} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnershipsSection() {
  const partnerItems = [
    {
      image: '/what_to_do_testimonial_1.jpg',
      title: 'TechFlow Inc.',
      subtitle: 'AI-Powered Analytics',
      borderColor: '#3B82F6',
      gradient: 'linear-gradient(145deg, #3B82F6, #000)',
      objectPosition: '50% 35%', // Shifted down to show face
      description: "ZenithCode became an extension of our engineering team almost instantly. Their focus, clarity, and execution speed helped us launch a platform we had delayed for months."
    },
    {
      image: '/what_to_do_testimonial_2.jpg',
      title: 'Nexus Systems',
      subtitle: 'Cloud Infrastructure',
      borderColor: '#10B981',
      gradient: 'linear-gradient(180deg, #10B981, #000)',
      objectPosition: 'bottom', // Focus on subject at bottom
      description: "What impressed us most wasn’t just the technical depth, but the way ZenithCode translated ideas into elegant, scalable systems. Every delivery was thoughtful and pushed our product forward."
    },
    {
      image: '/what_to_do_testimonial_3.jpg',
      title: 'Vertex Labs',
      subtitle: 'Machine Learning',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg, #F59E0B, #000)',
      objectPosition: 'top',
      description: "We approached ZenithCode with a chaotic vision and left with a product that feels intentional, fast, and beautifully engineered. Their mix of design intuition and backend rigor is rare to find today."
    },
    {
      image: '/what_to_do_testimonial_4.jpg',
      title: 'Quantum Digital',
      subtitle: 'Digital Transformation',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg, #EF4444, #000)',
      objectPosition: 'top',
      description: "ZenithCode streamlined workflows we thought were impossible to automate. The impact on productivity was immediate—our team now saves hours every single day."
    },
    {
      image: '/what_to_do_testimonial_5.jpg',
      title: 'Nova Enterprises',
      subtitle: 'Enterprise Solutions',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
      objectPosition: 'top',
      description: "The commitment ZenithCode brings to each project is outstanding. They obsess over details, communicate clearly, and never compromise on quality. It felt like working with a deeply invested internal team."
    },
    {
      image: '/what_to_do_testimonial_6.jpg',
      title: 'Horizon Tech',
      subtitle: 'Innovation Partners',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4, #000)',
      objectPosition: '50% 0%',
      description: "Working with ZenithCode elevated our product experience. They understand design at a conceptual level and engineer interactions that feel alive. Their craftsmanship is something we truly admire."
    }
  ]

  return (
    <section className="relative w-full bg-black py-24 sm:py-32 overflow-hidden border-t border-white/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/95 font-extralight tracking-tight text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-center mb-16 font-[family-name:var(--font-outfit)]"
        >
          Partnerships we're proud of
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="min-h-[600px] relative"
        >
          <ChromaGrid
            items={partnerItems}
            radius={280}
            damping={0.4}
            fadeOut={0.5}
            ease="power3.out"
          />
        </motion.div>
      </div>
    </section>
  )
}


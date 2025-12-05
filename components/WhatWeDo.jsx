'use client'
import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion'

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 }
  }
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const cards = [
  {
    title: 'Web Development',
    body:
      'Beautiful, fast, and resilient websites built with Next.js & modern tooling. Deliverables: Custom Next.js / React builds, responsive UI, server-side rendering, e-commerce, Headless CMS, performance optimization, accessibility.'
  },
  {
    title: 'UX & Product Design',
    body:
      'Human-first interfaces that make complex things feel simple. Deliverables: UX research, wireframes, high-fidelity UI, interactive prototypes (Figma), micro-interactions, design systems.'
  },
  {
    title: 'Automation & Integrations',
    body:
      'Remove manual work — automate business workflows end-to-end. Deliverables: Zapier / Make / custom API integrations, scheduled jobs, Google Workspace automations, data sync, notifications & alerts.'
  },
  {
    title: 'AI & Intelligent Systems',
    body:
      'Practical AI that adds value (not hype). Deliverables: Conversational agents, summarization & classification pipelines, retrieval-augmented search, prompt engineering, model orchestration with safety and observability.'
  }
]

function TechIcon({ label }) {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
      </svg>
      <span className="text-sm text-white/70">{label}</span>
    </div>
  )
}

export default function WhatWeDo() {
  const reduce = useReducedMotion()
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2 })

  useEffect(() => {
    if (reduce) controls.set('show')
    else if (inView) controls.start('show')
  }, [inView, reduce, controls])

  useEffect(() => {
    const handler = () => {
      if (!reduce && inView) controls.start('show')
    }
    if (typeof window !== 'undefined' && window.__lenis && window.__lenis.on) {
      window.__lenis.on('scroll', handler)
      return () => {
        if (window.__lenis && window.__lenis.off) window.__lenis.off('scroll', handler)
      }
    }
  }, [inView, reduce, controls])

  return (
    <section ref={ref} className="relative w-full bg-black py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={container}
            className="lg:col-span-9"
          >
            <motion.h2 variants={item} className="text-white/95 font-extralight tracking-tight text-[clamp(2rem,5vw,5rem)] leading-[1.05]">
              What we do
            </motion.h2>
            <motion.p variants={item} className="mt-6 max-w-3xl text-white/70 text-[clamp(1rem,1.3vw,1.25rem)] leading-relaxed">
              We design and build modern web products and AI-driven automation that make businesses faster, smarter, and easier to scale. Our work blends beautiful UX, rock-solid engineering, and pragmatic automation to ship measurable outcomes.
            </motion.p>

            <motion.ul variants={container} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {cards.map((c) => (
                <motion.li
                  key={c.title}
                  variants={item}
                  tabIndex={0}
                  role="article"
                  aria-label={c.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 focus:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 4l7 4v8l-7 4-7-4V8z" />
                    </svg>
                    <h3 className="text-white/90 font-light tracking-tight text-[clamp(1.25rem,2.2vw,1.75rem)]">
                      {c.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-white/70 text-[clamp(0.95rem,1.1vw,1.1rem)] leading-relaxed">
                    {c.body}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-6">
              <a href="/get-in-touch" aria-label="Start a project" className="inline-flex rounded-full bg-white/10 px-5 py-2 text-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/20">
                Start a project
              </a>
              <a href="/work" aria-label="See our work" className="group relative inline-flex items-center text-white/90">
                <span>See our work</span>
                <span className="absolute left-0 -bottom-[2px] h-px w-0 bg-white/70 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </a>
            </motion.div>

            <motion.p variants={item} className="mt-8 text-white/60 text-sm">
              We ship in short cycles — research, design, build, automate, measure — so you see value early and often.
            </motion.p>
            <motion.p variants={item} className="mt-6 text-white/70 text-[clamp(0.95rem,1vw,1.05rem)]">
              Secondary offerings: Landing pages & marketing sites; Analytics & tracking; Performance & SEO audits; Monitoring & support retainer.
            </motion.p>
          </motion.div>

          <aside className="hidden lg:flex lg:col-span-3">
            <div className="ml-auto flex w-full max-w-xs flex-col gap-4 border-l border-white/10 pl-6">
              <p className="text-white/70 text-sm">Technologies:</p>
              <TechIcon label="Next.js" />
              <TechIcon label="React" />
              <TechIcon label="Tailwind" />
              <TechIcon label="Node.js" />
              <TechIcon label="OpenAI" />
              <TechIcon label="Zapier" />
              <TechIcon label="Vercel" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}


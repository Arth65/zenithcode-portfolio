'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import './ChromaGrid.css'

export const ChromaGrid = ({
    items,
    className = '',
    radius = 300,
    columns = 3,
    rows = 2,
    damping = 0.45,
    fadeOut = 0.6,
    ease = 'power3.out'
}) => {
    const rootRef = useRef(null)
    const colorLayerRef = useRef(null)
    const pos = useRef({ x: -9999, y: -9999 })

    const demo = [
        {
            image: 'https://i.pravatar.cc/300?img=8',
            title: 'Alex Rivera',
            subtitle: 'Full Stack Developer',
            handle: '@alexrivera',
            borderColor: '#4F46E5',
            gradient: 'linear-gradient(145deg, #4F46E5, #000)',
            url: 'https://github.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=11',
            title: 'Jordan Chen',
            subtitle: 'DevOps Engineer',
            handle: '@jordanchen',
            borderColor: '#10B981',
            gradient: 'linear-gradient(210deg, #10B981, #000)',
            url: 'https://linkedin.com/in/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=3',
            title: 'Morgan Blake',
            subtitle: 'UI/UX Designer',
            handle: '@morganblake',
            borderColor: '#F59E0B',
            gradient: 'linear-gradient(165deg, #F59E0B, #000)',
            url: 'https://dribbble.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=16',
            title: 'Casey Park',
            subtitle: 'Data Scientist',
            handle: '@caseypark',
            borderColor: '#EF4444',
            gradient: 'linear-gradient(195deg, #EF4444, #000)',
            url: 'https://kaggle.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=25',
            title: 'Sam Kim',
            subtitle: 'Mobile Developer',
            handle: '@thesamkim',
            borderColor: '#8B5CF6',
            gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
            url: 'https://github.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=60',
            title: 'Tyler Rodriguez',
            subtitle: 'Cloud Architect',
            handle: '@tylerrod',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg, #06B6D4, #000)',
            url: 'https://aws.amazon.com/'
        }
    ]
    const data = items?.length ? items : demo

    useEffect(() => {
        const el = colorLayerRef.current
        if (!el) return
        // Set initial position off-screen
        el.style.setProperty('--mouse-x', '-9999px')
        el.style.setProperty('--mouse-y', '-9999px')
        el.style.setProperty('--radius', `${radius}px`)
    }, [radius])

    const moveTo = (x, y) => {
        gsap.to(pos.current, {
            x,
            y,
            duration: damping,
            ease,
            onUpdate: () => {
                if (colorLayerRef.current) {
                    colorLayerRef.current.style.setProperty('--mouse-x', `${pos.current.x}px`)
                    colorLayerRef.current.style.setProperty('--mouse-y', `${pos.current.y}px`)
                }
            },
            overwrite: true
        })
    }

    const handleMove = e => {
        const r = rootRef.current.getBoundingClientRect()
        moveTo(e.clientX - r.left, e.clientY - r.top)
        // Show the color layer
        gsap.to(colorLayerRef.current, { opacity: 1, duration: 0.25, overwrite: true })
    }

    const handleLeave = () => {
        // Hide the color layer smoothly
        gsap.to(colorLayerRef.current, {
            opacity: 0,
            duration: fadeOut,
            overwrite: true
        })
    }

    const handleCardClick = url => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    }

    const CardContent = ({ c }) => (
        <article
            className="chroma-card"
            onClick={() => handleCardClick(c.url)}
            style={{
                '--card-border': c.borderColor || 'transparent',
                '--card-gradient': c.gradient,
                cursor: c.url ? 'pointer' : 'default'
            }}
        >
            <div className="chroma-img-wrapper">
                <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    style={{ objectPosition: c.objectPosition || 'center' }}
                />
            </div>
            <footer className="chroma-info">
                <div className="chroma-header-grid">
                    <h3 className="name">{c.title}</h3>
                    {c.handle && <span className="handle">{c.handle}</span>}
                    <p className="role">{c.subtitle}</p>
                    {c.location && <span className="location">{c.location}</span>}
                </div>
                {c.description && <p className="description">{c.description}</p>}
            </footer>
        </article>
    )

    return (
        <div
            ref={rootRef}
            className={`chroma-container ${className}`}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
        >
            {/* Grayscale base layer */}
            <div
                className="chroma-grid chroma-grid-grayscale"
                style={{ '--cols': columns, '--rows': rows }}
            >
                {data.map((c, i) => (
                    <CardContent key={i} c={c} />
                ))}
            </div>

            {/* Colored layer with radial gradient mask */}
            <div
                ref={colorLayerRef}
                className="chroma-grid chroma-grid-colored"
                style={{
                    '--cols': columns,
                    '--rows': rows,
                    '--mouse-x': '-9999px',
                    '--mouse-y': '-9999px',
                    '--radius': `${radius}px`
                }}
            >
                {data.map((c, i) => (
                    <CardContent key={i} c={c} />
                ))}
            </div>
        </div>
    )
}

export default ChromaGrid

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CreativitySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        // Simple fade in up animation for the text
        gsap.from(textRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative z-50 w-full py-12 md:py-16 px-4 md:px-8 flex items-center"
            style={{ backgroundColor: '#111111' }}
        >
            <div
                className="relative w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 p-6 md:p-8 lg:p-10 rounded-md overflow-hidden"
                style={{ backgroundColor: '#2A2A2A' }}
            >
                {/* Left Label */}
                <div className="col-span-1 md:col-span-3">
                    <span className="inline-block text-xs font-mono tracking-widest uppercase text-white/60">
                        CREATIVITY AND PROBLEM<br />SOLVING
                    </span>
                </div>

                {/* Right Content */}
                <div className="col-span-1 md:col-span-9">
                    <p
                        ref={textRef}
                        className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-tight text-white"
                    >
                        Living and working in changing contexts demands <span className="inline-block bg-[#DBD40F] px-1.5 mx-0.5 rounded-sm font-normal text-black">creative solutions</span> and improvisation. We are used to thinking outside the box and acting pragmatically.
                    </p>
                </div>

                {/* Geometric Pattern - Bottom Right */}
                <div className="absolute -bottom-8 -right-8 w-72 h-48 opacity-[0.15] pointer-events-none">
                    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        {/* Abstract mountain/wave lines */}
                        <g stroke="#888888" strokeWidth="1.5">
                            {/* Wave pattern 1 */}
                            <path d="M50 180 L120 100 L190 180" fill="none" />
                            <path d="M80 180 L150 100 L220 180" fill="none" />
                            <path d="M110 180 L180 100 L250 180" fill="none" />
                            <path d="M140 180 L210 100 L280 180" fill="none" />
                            {/* Smaller accent lines */}
                            <path d="M170 180 L210 130 L250 180" fill="none" />
                            <path d="M200 180 L230 145 L260 180" fill="none" />
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    );
}

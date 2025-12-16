'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhyZenith() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%', // Start animation when top of section hits 80% viewport height
                    toggleActions: 'play none none reverse',
                },
            });

            tl.fromTo(
                headingRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            ).fromTo(
                textRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.6'
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-black text-white px-6 md:px-12 py-32 flex flex-col items-center justify-center min-h-[60vh]"
        >
            <div className="max-w-4xl w-full flex flex-col items-center text-center gap-12">
                {/* Button-style Heading */}
                <div ref={headingRef} className="opacity-0">
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-mono tracking-widest uppercase rounded-sm text-white/90">
                        WHY ZENITH?
                    </span>
                </div>

                {/* Body Text */}
                <p
                    ref={textRef}
                    className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight opacity-0"
                >
                    Because we think like <span className="text-white/60">innovators</span> — independent, fast, efficient, and always focused on the goal.
                    <br className="hidden md:block" />
                    We work flexibly, think in networks, and deliver real results — <span className="italic font-serif">anytime, anywhere.</span>
                </p>
            </div>
        </section>
    );
}

"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// --- Configuration: The Gallery Content ---
const galleryImages = [
    // Column 1
    { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop", label: "Team Collaboration" },
    { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop", label: "Code Development" },
    { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop", label: "Creative Workspace" },

    // Column 2
    { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop", label: "Focused Work" },
    { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop", label: "Team Meeting" },
    { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop", label: "Success Celebration" },

    // Column 3
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop", label: "Brainstorming" },
    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop", label: "Tech Discussion" },
    { src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop", label: "Innovation" },
];

export default function AboutGallery() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax Speeds: 
    // y1 (Col 1) moves slightly up
    // y2 (Col 2) moves up faster (creating depth)
    // y3 (Col 3) moves up slower 
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -75]);

    return (
        <section ref={containerRef} className="w-full bg-black text-white py-24 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 mb-32">
                <h2 className="font-sans text-white/95 font-extralight leading-[1.05] tracking-tight text-[clamp(2.5rem,5vw,5rem)] max-w-4xl">
                    Where <span className="text-white/40 font-light">logic</span> meets <span className="text-white/40 font-light">creativity</span> <br />
                    for the love of the craft.
                </h2>
            </div>

            {/* The Masonry Grid */}
            <div className="container mx-auto px-6 md:px-12 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-[120vh] md:h-auto overflow-hidden md:overflow-visible">

                    {/* Column 1 */}
                    <Column images={[galleryImages[0], galleryImages[1], galleryImages[2]]} y={y1} />

                    {/* Column 2 (Offset start for visual variation) */}
                    <Column images={[galleryImages[3], galleryImages[4], galleryImages[5]]} y={y2} className="md:-mt-24" />

                    {/* Column 3 */}
                    <Column images={[galleryImages[6], galleryImages[7], galleryImages[8]]} y={y3} />

                </div>
            </div>
        </section>
    );
}

// Sub-component for a single column
const Column = ({ images, y, className = "" }: { images: { src: string, label: string }[], y: MotionValue<number>, className?: string }) => {
    return (
        <motion.div style={{ y }} className={`flex flex-col gap-6 md:gap-8 ${className}`}>
            {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[3/4] md:aspect-[4/5]">
                    <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Label */}
                    <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white font-medium text-lg">{img.label}</span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};
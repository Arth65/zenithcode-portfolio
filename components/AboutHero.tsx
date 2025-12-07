"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const teamImages = [
    {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        alt: "Team collaboration at pool party",
        height: "h-[280px] md:h-[340px]" // Medium
    },
    {
        src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
        alt: "Team member working on laptop",
        height: "h-[320px] md:h-[400px]" // Tall
    },
    {
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
        alt: "Team celebrating success",
        height: "h-[260px] md:h-[320px]" // Short
    },
    {
        src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
        alt: "Team brainstorming session",
        height: "h-[300px] md:h-[380px]" // Medium-Tall
    },
    {
        src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
        alt: "Team members in office",
        height: "h-[280px] md:h-[350px]" // Medium
    }
];

export default function AboutHero() {
    // Duplicate images for seamless infinite scroll
    const duplicatedImages = [...teamImages, ...teamImages];

    // Helper function to extract numeric height from Tailwind class
    const getNumericHeight = (heightClass: string): number => {
        const match = heightClass.match(/h-\[(\d+)px\]/);
        return match ? parseInt(match[1]) : 0;
    };

    // Determine if an image should have rounded corners
    const shouldRoundCorners = (index: number): boolean => {
        const actualIndex = index % teamImages.length;
        const currentHeight = getNumericHeight(teamImages[actualIndex].height);

        // Get neighbors (wrap around for circular array)
        const prevIndex = (actualIndex - 1 + teamImages.length) % teamImages.length;
        const nextIndex = (actualIndex + 1) % teamImages.length;

        const prevHeight = getNumericHeight(teamImages[prevIndex].height);
        const nextHeight = getNumericHeight(teamImages[nextIndex].height);

        // Only round if taller than BOTH neighbors
        return currentHeight > prevHeight && currentHeight > nextHeight;
    };

    return (
        <div className="w-full bg-black text-white pt-32 pb-8 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 mb-12">

                {/* Heading at Top */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-sans text-white/95 font-extralight leading-[1.02] tracking-tight text-[clamp(2.5rem,7vw,6rem)] max-w-5xl"
                >
                    Where exceptional people unite for the love of the craft.
                </motion.h1>

            </div>

            {/* Auto-Scrolling Images - No Gaps */}
            <div className="relative w-full overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, -50 + "%"]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear"
                        }
                    }}
                    className="flex gap-0 items-end"
                >
                    {duplicatedImages.map((image, index) => {
                        const hasRoundedCorners = shouldRoundCorners(index);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5) }}
                                className={`relative flex-shrink-0 w-[380px] md:w-[480px] lg:w-[550px] ${image.height} ${hasRoundedCorners ? 'rounded-t-2xl' : ''} overflow-hidden bg-gray-900 group`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    priority={index < 3}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    sizes="(max-width: 768px) 380px, (max-width: 1024px) 480px, 550px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    quality={85}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

        </div>
    );
}

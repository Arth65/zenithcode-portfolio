'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export enum ImageAspectRatio {
    MOBILE = 'mobile',    // Tall aspect ratio (9:16)
    DESKTOP = 'desktop'   // Wide aspect ratio (16:9)
}

export interface Project {
    name: string;
    subtitle: string;
    description: string;
    images: string[];
    aspectRatio: ImageAspectRatio;
}

interface ProjectShowcaseSectionProps {
    project: Project;
}

export default function ProjectShowcaseSection({ project }: ProjectShowcaseSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Determine dimensions based on aspect ratio
    const isDesktop = project.aspectRatio === ImageAspectRatio.DESKTOP;
    const imageWidth = isDesktop ? 640 : 360;
    const imageHeight = isDesktop ? 360 : 640;


    useEffect(() => {
        checkScrollButtons();
    }, [project.images]);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scrollToIndex = (index: number) => {
        if (scrollContainerRef.current) {
            const scrollAmount = index * (imageWidth + 24); // 24px is gap-6
            scrollContainerRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            setCurrentIndex(index);
        }
    };

    const scrollLeft = () => {
        const newIndex = Math.max(0, currentIndex - 1);
        scrollToIndex(newIndex);
    };

    const scrollRight = () => {
        const newIndex = Math.min(project.images.length - 1, currentIndex + 1);
        scrollToIndex(newIndex);
    };

    const handleScroll = () => {
        checkScrollButtons();
        
        if (scrollContainerRef.current) {
            const { scrollLeft } = scrollContainerRef.current;
            const index = Math.round(scrollLeft / (imageWidth + 24));
            setCurrentIndex(index);
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-black text-white py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Number */}
                <p className="text-sm md:text-base text-gray-400 mb-4 tracking-wide uppercase">
                    {project.subtitle}
                </p>

                {/* Project Name - Large, Flowing Typography */}
                <h2  className="text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-light mb-4 text-white leading-tight tracking-tight max-w-5xl">
                    {project.name}
                </h2>

                {/* Project Description - Smaller, Subtle */}
                <p className="text-sm md:text-base text-gray-400 mb-16 max-w-4xl leading-relaxed">
                    {project.description}
                </p>

                {/* Navigation Controls */}
                <div className="flex items-center gap-4 mb-12">
                    <button
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        className="p-2 text-white hover:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        className="p-2 text-white hover:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="flex-1" />
                    <button className="text-xs md:text-sm text-white hover:text-gray-300 tracking-widest uppercase transition-colors">
                        VIEW ALL
                    </button>
                </div>

                {/* Image Carousel Container */}
                <div className="relative">
                    {/* Horizontal Scrollable Carousel */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar pb-4"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {project.images.map((image, index) => (
                            <div
                                key={index}
                                className="shrink-0 snap-start"
                                style={{
                                    width: `${imageWidth}px`,
                                }}
                            >
                                <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
                                    <img
                                        src={image}
                                        alt={`${project.name} - Image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            width: `${imageWidth}px`,
                                            height: `${imageHeight}px`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}

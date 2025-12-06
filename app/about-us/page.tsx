import React from "react";
import AboutHero from "@/components/AboutHero";
import AboutValues from "@/components/AboutValues";
import AboutCulture from "@/components/AboutCulture";
import AboutGallery from "@/components/AboutGallery";
import Navbar from '@/components/Navbar';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Zenith Code",
    description: "We are builders, makers, and strategists crafting the future of web and AI.",
};

export default function AboutPage() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />

            {/* Hero Section with Image Transitions */}
            <AboutHero />

            {/* 1. The Values Section (Sticky Left, Scrolling Right) */}
            <AboutValues />

            {/* 2. The Culture Section (3 Column Grid) */}
            <AboutCulture />

            {/* 3. The Gallery Section (Visuals) */}
            <AboutGallery />

            {/* Final Call to Action Spacer */}
            <div className="py-24 text-center bg-black text-white">
                <p className="text-gray-400 mb-4">Ready to build something extraordinary?</p>
                <a href="/our-solution" className="inline-block border-b border-white pb-1 text-xl hover:text-gray-300 transition-colors">
                    View Our Solutions
                </a>
            </div>

        </main>
    );
}
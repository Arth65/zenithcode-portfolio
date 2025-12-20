'use client';

import Navbar from "@/components/Navbar";
import ShippingShowcaseSection from "@/components/OurWork/ShippingShowcaseSection";
import ProjectShowcaseSection, { ImageAspectRatio, Project } from "@/components/OurWork/ProjectShowcaseSection";

// Example projects - replace with your actual data
const exampleProjects: Project[] = [
    {
        name: "E-Commerce",
        subtitle: "(01) CRM Solutions",
        description: "A modern, scalable e-commerce solution built with cutting-edge technologies. Features include real-time inventory management, seamless checkout experience, and advanced analytics dashboard for business insights.",
        images: [
            "/warp-bg-1.jpg",
            "/warp-bg-2.jpg",
            "/warp-bg-1.jpg",
            "/warp-bg-2.jpg",
        ],
        aspectRatio: ImageAspectRatio.DESKTOP
    },
    {
        name: "Mobile Banking",
        subtitle: "(02) Mobile Applications",
        description: "Intuitive mobile banking application providing secure transactions, budget tracking, and personalized financial insights. Designed with user experience at the forefront, making banking accessible to everyone.",
        images: [
            "/warp-bg-2.jpg",
            "/warp-bg-1.jpg",
            "/warp-bg-2.jpg",
        ],
        aspectRatio: ImageAspectRatio.MOBILE
    }
];

export default function OurWorkPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />
            <ShippingShowcaseSection />
            
            {/* Project Showcases */}
            {exampleProjects.map((project, index) => (
                <ProjectShowcaseSection key={index} project={project} />
            ))}
        </main>
    );
}
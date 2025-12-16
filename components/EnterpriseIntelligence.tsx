'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
    title: string;
    content: string;
}

const accordionData: AccordionItem[] = [
    {
        title: 'AI THAT INSPIRES, NOT REPLACES',
        content: "Artificial Intelligence shouldn't just replace human effort—it should amplify it. We build AI solutions that empower your teams to achieve more, automating the mundane so your people can focus on the meaningful."
    },
    {
        title: 'INTELLIGENCE WITHOUT BORDERS',
        content: "Data doesn't live in silos, and neither should your intelligence. We integrate AI across your entire ecosystem, breaking down barriers between departments and systems to create a truly connected, intelligent enterprise."
    },
    {
        title: 'FROM DATA TO DIRECTION',
        content: "Raw data is noise; actionable insight is power. We transform your vast data landscapes into clear strategic direction, using advanced analytics to predict trends, optimize operations, and drive decisive action."
    }
];

export default function EnterpriseIntelligence() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            className="relative z-50 w-full py-16 md:py-24 px-4 md:px-8"
            style={{ backgroundColor: '#111111' }}
        >
            <div className="w-full max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
                    {/* Left: Title */}
                    <div>
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight text-white">
                            Enterprise<br />
                            Intelligence
                        </h2>
                    </div>

                    {/* Right: Description & CTA */}
                    <div className="flex flex-col justify-end items-end gap-6 text-right">
                        <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-md">
                            We enable intelligent enterprises with AI – not just automate processes.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-sm font-medium tracking-wide uppercase text-white hover:bg-white hover:text-black transition-all duration-300 w-fit"
                        >
                            BRING INTELLIGENCE INTO ACTION
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Accordion Section */}
                <div className="border-t border-white/10">
                    {accordionData.map((item, index) => (
                        <div
                            key={index}
                            className="border-b border-white/10"
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleAccordion(index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`w-full flex items-center justify-between py-8 px-6 text-left transition-all duration-300 ${hoveredIndex === index
                                    ? 'bg-[#DBD40F]' /* Highlight color */
                                    : 'bg-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-6">
                                    <span className={`w-3 h-3 rounded-full transition-colors duration-300 ${hoveredIndex === index ? 'bg-white' : 'bg-[#DBD40F]'
                                        }`} />
                                    <span className="text-xl md:text-3xl font-light tracking-wide uppercase text-white transition-colors duration-300">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="text-white/60">
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </div>
                            </button>

                            {/* Accordion Content */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-4 pb-6 pt-2 pl-13">
                                    <p className="text-base text-white/70 leading-relaxed max-w-2xl ml-9">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

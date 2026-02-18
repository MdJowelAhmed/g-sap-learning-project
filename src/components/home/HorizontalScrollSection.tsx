'use client';

/**
 * ===================================================
 * Horizontal Scroll Section — Home Page
 * ===================================================
 *
 * A services preview that scrolls horizontally while the section
 * is pinned in the viewport. This is one of ScrollTrigger's most
 * impressive features.
 *
 * How it works:
 * 1. The section container is pinned (stays fixed on screen)
 * 2. The inner `.horizontal-scroll-container` translates left
 *    based on scroll progress (scrub: true)
 * 3. The total scroll distance = container width - viewport width
 *
 * refreshPriority: 5
 * This section is pinned, so it must calculate its dimensions
 * BEFORE any sections below it that depend on the document height.
 * Higher priority = refreshes first.
 *
 * scrub: true means the animation progress is directly mapped to
 * scroll position — no playback, the user controls the speed.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Web Development',
        description: 'Custom websites built with Next.js, React, and modern frameworks for blazing fast performance.',
        icon: '⚡',
        color: '#c9f31d',
    },
    {
        title: 'UI/UX Design',
        description: 'User-centered design that balances beauty with usability. Every pixel tells a story.',
        icon: '🎨',
        color: '#3b82f6',
    },
    {
        title: 'Motion Design',
        description: 'GSAP-powered animations that bring interfaces to life with scroll-driven storytelling.',
        icon: '🎬',
        color: '#f59e0b',
    },
    {
        title: 'Brand Identity',
        description: 'Complete brand systems from logo to guidelines that make lasting impressions.',
        icon: '💎',
        color: '#ec4899',
    },
    {
        title: 'E-Commerce',
        description: 'High-converting online stores with seamless checkout experiences and inventory management.',
        icon: '🛒',
        color: '#10b981',
    },
];

export default function HorizontalScrollSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !scrollContainerRef.current) return;

            const scrollContainer = scrollContainerRef.current;

            /**
             * Calculate how far we need to scroll horizontally:
             * totalWidth = container's scrollWidth - one viewport width
             * This ensures the last card is fully visible at scroll end.
             */
            const totalScrollWidth = scrollContainer.scrollWidth - window.innerWidth;

            gsap.to(scrollContainer, {
                x: -totalScrollWidth,
                ease: 'none', /* Linear — scroll position maps 1:1 to horizontal translation */
                scrollTrigger: {
                    trigger: sectionRef.current,
                    /**
                     * start: 'top top' → pinning begins when section top hits viewport top
                     * end: dynamic → pin duration equals the horizontal scroll distance
                     * This makes the scroll feel natural — 1px vertical = ~1px horizontal
                     */
                    start: 'top top',
                    end: () => `+=${totalScrollWidth}`,
                    pin: true,
                    scrub: true,
                    /**
                     * refreshPriority: 5 because pinned sections change the document
                     * height. Sections below this depend on the updated height.
                     * Higher priority = refreshes first in the queue.
                     */
                    refreshPriority: 5,
                    /* Uncomment below for development debugging: */
                    /* markers: true, */
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });

            /* Stagger-animate individual cards as they enter the viewport */
            const cards = scrollContainer.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: gsap.getById('horizontalScroll') || undefined,
                        start: 'left 80%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                    delay: index * 0.1,
                });
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {/* Section Header */}
            <div className="absolute top-12 left-0 w-full z-10 px-6 md:px-12">
                <span
                    className="text-xs tracking-widest uppercase font-medium"
                    style={{ color: '#c9f31d' }}
                >
                    What We Do
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2">Our Services</h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollContainerRef}
                className="flex items-center gap-8 px-6 md:px-12 pt-32 pb-20"
                style={{ width: 'fit-content' }}
            >
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card flex-shrink-0 w-[350px] md:w-[420px] h-[320px] rounded-2xl p-8 flex flex-col justify-between group transition-all duration-500"
                        style={{
                            background: '#161616',
                            border: '1px solid #222',
                        }}
                        data-cursor="pointer"
                    >
                        <div>
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                                style={{ background: `${service.color}15` }}
                            >
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                                {service.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: service.color }}>
                            Learn More
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path
                                    d="M3 8H13M13 8L9 4M13 8L9 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

'use client';

/**
 * ===================================================
 * Service Cards — Service Page
 * ===================================================
 *
 * Grid of service cards with two key GSAP features:
 *
 * 1. STAGGER ENTRANCE: Cards reveal sequentially with
 *    stagger: { each: 0.15, from: "start" }
 *    This creates a left-to-right cascade that leads the eye.
 *
 * 2. 3D TILT ON HOVER: On mousemove, card rotateX/rotateY
 *    are animated based on cursor position relative to card center.
 *    This creates a realistic perspective tilt effect.
 *
 * The parent container has perspective: 1000px which is the
 * viewing distance for 3D transforms. Lower values = more
 * dramatic tilt, higher = subtler. 1000px is the sweet spot.
 */

import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceCards = [
    {
        title: 'Web Development',
        description: 'Custom Next.js applications with server-side rendering, API routes, and optimal performance scores.',
        icon: '⚡',
        features: ['Next.js / React', 'TypeScript', 'API Integration', 'Performance'],
        color: '#c9f31d',
    },
    {
        title: 'UI/UX Design',
        description: 'Research-driven design that converts. Wireframes, prototypes, and design systems that scale.',
        icon: '🎨',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        color: '#3b82f6',
    },
    {
        title: 'Motion Design',
        description: 'GSAP-powered animations that make your interface feel alive and intentional.',
        icon: '🎬',
        features: ['GSAP / Framer Motion', 'Scroll Animations', 'Page Transitions', 'Micro-interactions'],
        color: '#f59e0b',
    },
    {
        title: 'Brand Strategy',
        description: 'Complete brand identity systems from naming to visual language to guidelines.',
        icon: '💎',
        features: ['Brand Identity', 'Style Guides', 'Tone of Voice', 'Visual Language'],
        color: '#ec4899',
    },
    {
        title: 'E-Commerce',
        description: 'High-converting online stores with seamless checkout and inventory management.',
        icon: '🛒',
        features: ['Shopify / Custom', 'Payment Integration', 'Inventory', 'Analytics'],
        color: '#10b981',
    },
    {
        title: 'SEO & Analytics',
        description: 'Data-driven optimization strategies that increase visibility and conversions.',
        icon: '📊',
        features: ['Technical SEO', 'Content Strategy', 'A/B Testing', 'Reporting'],
        color: '#8b5cf6',
    },
];

export default function ServiceCards() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    /* Entrance stagger animation */
    useGSAP(
        () => {
            if (!sectionRef.current) return;
            const cards = sectionRef.current.querySelectorAll('.service-card-item');

            gsap.from(cards, {
                y: 80,
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                ease: 'back.out(1.7)',
                /**
                 * Stagger: each: 0.15 from: 'start'
                 * 6 cards × 0.15s = 0.9s total stagger cascade.
                 * 'start' means left-to-right, first card first.
                 * Using 'random' would create a more chaotic feel,
                 * but 'start' is orderly and professional.
                 */
                stagger: {
                    each: 0.15,
                    from: 'start',
                },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });
        },
        { scope: sectionRef }
    );

    /**
     * 3D TILT HANDLER:
     * Calculates cursor position relative to card center,
     * then maps it to rotateX and rotateY values.
     *
     * The math:
     * - normalizedX = (cursorX - cardCenterX) / (cardWidth/2) → range [-1, 1]
     * - rotateY = normalizedX * maxTilt (positive X → positive rotateY)
     * - rotateX = -normalizedY * maxTilt (positive Y → negative rotateX, simulates "pushing top away")
     *
     * maxTilt of 15deg gives a noticeable but not nauseating effect.
     */
    const handleMouseMove = useCallback((e: React.MouseEvent, index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normalizedX = (e.clientX - centerX) / (rect.width / 2);
        const normalizedY = (e.clientY - centerY) / (rect.height / 2);

        const maxTilt = 15; /* degrees */

        gsap.to(card, {
            rotateY: normalizedX * maxTilt,
            rotateX: -normalizedY * maxTilt,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    }, []);

    const handleMouseLeave = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;

        gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    }, []);

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#c9f31d' }}>
                        Services
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">What We Offer</h2>
                    <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: '#888' }}>
                        Hover over any card to experience the 3D tilt effect powered by GSAP.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
                    {serviceCards.map((service, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="service-card-item rounded-2xl p-8 transition-shadow duration-500 hover:shadow-2xl"
                            style={{
                                background: '#161616',
                                border: '1px solid #222',
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                            }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            data-cursor="pointer"
                        >
                            <div
                                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6"
                                style={{
                                    background: `${service.color}15`,
                                    transform: 'translateZ(30px)',
                                }}
                            >
                                {service.icon}
                            </div>

                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ transform: 'translateZ(20px)' }}
                            >
                                {service.title}
                            </h3>

                            <p
                                className="text-sm leading-relaxed mb-6"
                                style={{ color: '#888', transform: 'translateZ(15px)' }}
                            >
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(10px)' }}>
                                {service.features.map((feature, fIndex) => (
                                    <span
                                        key={fIndex}
                                        className="px-3 py-1 rounded-full text-xs"
                                        style={{
                                            background: `${service.color}10`,
                                            color: service.color,
                                            border: `1px solid ${service.color}30`,
                                        }}
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

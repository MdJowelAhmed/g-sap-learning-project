'use client';

/**
 * ===================================================
 * Values Section — About Us Page
 * ===================================================
 *
 * Company values displayed as icon + text cards with
 * a stagger reveal and rotation entrance. Each card
 * rotates slightly from a random angle as it enters,
 * creating an organic, varied feel.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        icon: '🎯',
        title: 'Purpose-Driven',
        description: 'Every animation, every interaction, every pixel is intentional and serves the user experience.',
        color: '#c9f31d',
    },
    {
        icon: '✨',
        title: 'Premium Quality',
        description: 'We never settle for "good enough." Our work is polished to the highest standard.',
        color: '#3b82f6',
    },
    {
        icon: '🤝',
        title: 'Collaborative',
        description: 'We work as an extension of your team, ensuring alignment at every step.',
        color: '#f59e0b',
    },
    {
        icon: '⚡',
        title: 'Performance First',
        description: '60fps animations, Lighthouse 95+, and Core Web Vitals that exceed targets.',
        color: '#10b981',
    },
    {
        icon: '🔄',
        title: 'Iteration',
        description: 'We believe in rapid prototyping, testing, and refining until it feels perfect.',
        color: '#ec4899',
    },
    {
        icon: '🌱',
        title: 'Growth Mindset',
        description: 'We invest in learning new technologies and pushing the boundaries of what\'s possible.',
        color: '#8b5cf6',
    },
];

export default function ValuesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const cards = sectionRef.current.querySelectorAll('.value-card');

            /**
             * Stagger reveal with slight rotation for organic feel.
             * rotation uses a random value between -5 and 5 per card
             * (handled by GSAP's string syntax with random()).
             */
            gsap.from(cards, {
                y: 80,
                opacity: 0,
                rotation: 'random(-8, 8)',
                scale: 0.9,
                duration: 0.7,
                ease: 'back.out(1.7)',
                stagger: {
                    /**
                     * Grid stagger:
                     * 'each' with 'from: random' creates an organic
                     * cascading reveal where cards appear in random order.
                     */
                    each: 0.12,
                    from: 'random',
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

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#c9f31d' }}>
                        What We Believe
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">Our Core Values</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="value-card rounded-2xl p-8 group transition-all duration-500 hover:border-[#c9f31d]/20"
                            style={{
                                background: '#161616',
                                border: '1px solid #222',
                            }}
                            data-cursor="pointer"
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                                style={{ background: `${value.color}15` }}
                            >
                                {value.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h3 className="text-2xl md:text-4xl font-bold mb-4">
                        Ready to <span className="gradient-text">Join Us?</span>
                    </h3>
                    <p className="text-sm mb-8" style={{ color: '#888' }}>
                        We&apos;re always looking for talented people who share our values.
                    </p>
                    <MagneticButton variant="outline">View Open Positions</MagneticButton>
                </div>
            </div>
        </section>
    );
}

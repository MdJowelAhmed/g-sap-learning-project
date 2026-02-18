'use client';

/**
 * ===================================================
 * Testimonials Section — Home Page
 * ===================================================
 *
 * Client testimonials displayed in a staggered card layout.
 * Each card fades in with a stagger delay and has a subtle
 * floating animation on idle (using yoyo: true).
 *
 * Stagger timing: 0.2s between cards
 * For 4 cards: total stagger time = 4 * 0.2 = 0.8s
 * Combined with 0.6s duration = last card finishes at 1.4s
 * This keeps the cascade visually connected.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'CEO, TechVentures',
        text: 'The animations brought our landing page to life. Conversion rates increased by 40% after the redesign. Absolutely stunning work.',
        avatar: 'SC',
        color: '#c9f31d',
    },
    {
        name: 'Marcus Rivera',
        role: 'Creative Director, Pulse',
        text: 'Every interaction feels intentional and premium. The GSAP animations are buttery smooth and our clients love the attention to detail.',
        avatar: 'MR',
        color: '#3b82f6',
    },
    {
        name: 'Emily Nakamura',
        role: 'Founder, Bloom Studio',
        text: 'They delivered a website that feels like a native app. The scroll-driven storytelling perfectly captures our brand narrative.',
        avatar: 'EN',
        color: '#ec4899',
    },
    {
        name: 'David Okonkwo',
        role: 'CTO, NovaPay',
        text: 'Performance was never sacrificed for aesthetics. 60fps animations with a Lighthouse score of 98. Impressive engineering.',
        avatar: 'DO',
        color: '#10b981',
    },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;
            const cards = sectionRef.current.querySelectorAll('.testimonial-card');

            /* Entrance animation with stagger */
            gsap.from(cards, {
                y: 80,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                /**
                 * Stagger config:
                 * each: 0.2 → 200ms between each card starting
                 * from: 'start' → left-to-right cascade (natural reading direction)
                 */
                stagger: {
                    each: 0.2,
                    from: 'start',
                },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });

            /**
             * Idle floating animation:
             * Each card gently bobs up and down with different timing
             * using yoyo + repeat: -1 (infinite). Random delay prevents
             * all cards from moving in sync — looks more organic.
             */
            cards.forEach((card, index) => {
                gsap.to(card, {
                    y: -8,
                    duration: 2 + index * 0.3,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: index * 0.5,
                });
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span
                        className="text-xs tracking-widest uppercase font-medium"
                        style={{ color: '#c9f31d' }}
                    >
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">
                        What Our Clients Say
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="testimonial-card rounded-2xl p-8 transition-all duration-500 hover:border-[#c9f31d]/20"
                            style={{
                                background: '#161616',
                                border: '1px solid #222',
                            }}
                            data-cursor="pointer"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{
                                        background: `${testimonial.color}20`,
                                        color: testimonial.color,
                                    }}
                                >
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                                    <p className="text-xs" style={{ color: '#888' }}>
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                            <p
                                className="text-sm leading-relaxed italic"
                                style={{ color: '#aaa' }}
                            >
                                &ldquo;{testimonial.text}&rdquo;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

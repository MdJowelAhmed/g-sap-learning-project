'use client';

/**
 * ===================================================
 * Counters Section — About Us Page
 * ===================================================
 *
 * Animated number counters that count from 0 to the target
 * value when the section scrolls into view.
 *
 * How the snap pattern works:
 * gsap.to() animates a proxy object's value from 0 to target.
 * On each frame, the onUpdate callback reads the current value
 * and sets the innerHTML of the element. The snap property
 * ensures values are rounded to whole numbers (snap: 1 = round
 * to nearest integer).
 *
 * This is the standard GSAP pattern for counter animations
 * without any plugins.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const counters = [
    { value: 150, suffix: '+', label: 'Projects Delivered', color: '#c9f31d' },
    { value: 80, suffix: '+', label: 'Happy Clients', color: '#3b82f6' },
    { value: 12, suffix: '', label: 'Design Awards', color: '#f59e0b' },
    { value: 8, suffix: '+', label: 'Years Experience', color: '#ec4899' },
];

export default function CountersSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            counters.forEach((counter, index) => {
                const el = numberRefs.current[index];
                if (!el) return;

                /**
                 * Counter animation pattern:
                 * We animate a proxy object { val: 0 } to { val: target }.
                 * On each GSAP tick, onUpdate reads the current val and sets
                 * the element's text content.
                 *
                 * snap: 1 ensures we only display whole numbers — no decimals
                 * flickering during the animation.
                 *
                 * Duration is proportional to the target value to ensure
                 * small numbers (8) don't animate too long and large
                 * numbers (150) have enough time to feel impressive.
                 */
                const proxy = { val: 0 };

                gsap.to(proxy, {
                    val: counter.value,
                    duration: 2 + (counter.value / 100), /* Adaptive duration */
                    ease: 'expo.out',
                    snap: { val: 1 }, /* Round to whole numbers */
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                    onUpdate: () => {
                        el.textContent = String(Math.round(proxy.val));
                    },
                    delay: index * 0.15,
                });
            });

            /* Card entrance animation */
            const cards = sectionRef.current.querySelectorAll('.counter-card');
            gsap.from(cards, {
                y: 60,
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                ease: 'back.out(1.7)',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
        >
            {/* Background decoration */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#c9f31d' }}>
                        By The Numbers
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">Our Impact</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {counters.map((counter, index) => (
                        <div
                            key={index}
                            className="counter-card text-center rounded-2xl p-8"
                            style={{
                                background: '#161616',
                                border: '1px solid #222',
                            }}
                        >
                            <div className="flex items-baseline justify-center gap-1 mb-3">
                                <span
                                    ref={(el) => { numberRefs.current[index] = el; }}
                                    className="text-4xl md:text-5xl font-black"
                                    style={{ color: counter.color }}
                                >
                                    0
                                </span>
                                {counter.suffix && (
                                    <span
                                        className="text-2xl md:text-3xl font-bold"
                                        style={{ color: counter.color }}
                                    >
                                        {counter.suffix}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm font-medium" style={{ color: '#888' }}>
                                {counter.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

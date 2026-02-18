'use client';

/**
 * ===================================================
 * Feature List — Service Page
 * ===================================================
 *
 * A scroll-linked feature list where text highlights/changes
 * color as the user scrolls past each point. This uses
 * ScrollTrigger with scrub: true and per-item triggers.
 *
 * How it works:
 * Each feature item has its own ScrollTrigger that:
 * 1. Starts when the item reaches the viewport center
 * 2. Ends when the item passes the center
 * 3. Transitions color from muted (#444) to bright (#e8e8e8)
 * 4. Also scales a decorative accent bar
 *
 * scrub: true makes the animation directly controlled by
 * scroll position — no auto-play, the user is in control.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        number: '01',
        title: 'Discovery & Strategy',
        description: 'We deep-dive into your business goals, audience, and competitors to build a strategy that works.',
    },
    {
        number: '02',
        title: 'Wireframing & Prototyping',
        description: 'Interactive prototypes that let you experience the flow before a single line of code is written.',
    },
    {
        number: '03',
        title: 'Visual Design',
        description: 'Pixel-perfect designs with a focus on typography, spacing, and visual hierarchy that converts.',
    },
    {
        number: '04',
        title: 'Development & Animation',
        description: 'Clean, performant code with GSAP animations that bring your designs to life at 60fps.',
    },
    {
        number: '05',
        title: 'Testing & Optimization',
        description: 'Rigorous cross-browser testing, performance optimization, and accessibility auditing.',
    },
    {
        number: '06',
        title: 'Launch & Support',
        description: 'Smooth deployment with ongoing support, analytics monitoring, and iterative improvements.',
    },
];

export default function FeatureList() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const items = sectionRef.current.querySelectorAll('.feature-item');

            items.forEach((item) => {
                const title = item.querySelector('.feature-title');
                const description = item.querySelector('.feature-desc');
                const number = item.querySelector('.feature-number');
                const bar = item.querySelector('.feature-bar');

                /**
                 * Per-item ScrollTrigger with scrub:
                 *
                 * start: 'top 60%' — begin highlighting when item is in
                 * the upper-middle of the viewport (user is focused on it)
                 *
                 * end: 'top 40%' — complete the highlight over a short
                 * scroll distance (20% of viewport height) for tight timing
                 *
                 * scrub: true means 1:1 mapping between scroll and progress.
                 * Unlike scrub: 1 (which adds a 1s buffer), true is instant.
                 */
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 65%',
                        end: 'top 35%',
                        scrub: true,
                        /* markers: true, // Uncomment for development debugging */
                    },
                });

                tl.to(number, {
                    color: '#c9f31d',
                    duration: 0.5,
                })
                    .to(
                        title,
                        {
                            color: '#e8e8e8',
                            x: 10,
                            duration: 0.5,
                        },
                        0
                    )
                    .to(
                        description,
                        {
                            color: '#aaa',
                            opacity: 1,
                            duration: 0.5,
                        },
                        0
                    )
                    .to(
                        bar,
                        {
                            scaleX: 1,
                            duration: 0.5,
                        },
                        0
                    );
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#c9f31d' }}>
                        Our Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">
                        How We Work
                    </h2>
                    <p className="mt-4 text-sm" style={{ color: '#888' }}>
                        Scroll through to see each step highlight as it enters focus.
                    </p>
                </div>

                <div className="space-y-0">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-item py-10 border-b flex gap-6 md:gap-10 items-start"
                            style={{ borderColor: '#222' }}
                        >
                            <span
                                className="feature-number text-3xl md:text-4xl font-black shrink-0 transition-none"
                                style={{ color: '#333', fontFamily: 'var(--font-heading)' }}
                            >
                                {feature.number}
                            </span>

                            <div className="flex-1">
                                <h3
                                    className="feature-title text-lg md:text-xl font-bold mb-2 transition-none"
                                    style={{ color: '#555' }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    className="feature-desc text-sm leading-relaxed transition-none"
                                    style={{ color: '#444', opacity: 0.6 }}
                                >
                                    {feature.description}
                                </p>
                                <div
                                    className="feature-bar h-0.5 mt-4 rounded-full origin-left"
                                    style={{
                                        background: '#c9f31d',
                                        transform: 'scaleX(0)',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

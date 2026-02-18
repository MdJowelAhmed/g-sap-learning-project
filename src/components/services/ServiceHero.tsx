'use client';

/**
 * ===================================================
 * Service Hero — Service Page
 * ===================================================
 *
 * Animated headline with line-by-line reveal for the service page.
 * Each line slides up from below with stagger, creating a
 * cascading reveal that guides the eye downward.
 *
 * Easing: expo.out for fast entry that decelerates smoothly.
 * This creates an authoritative, confident entrance that
 * suits a professional services page.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ServiceHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const lines = containerRef.current.querySelectorAll('.reveal-line');
            const badge = containerRef.current.querySelector('.hero-badge');
            const description = containerRef.current.querySelector('.hero-description');

            const tl = gsap.timeline({ delay: 0.5 });

            tl.from(badge, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out',
            })
                /**
                 * Line-by-line reveal:
                 * each: 0.15 creates a 150ms gap between lines.
                 * For 3 lines: total cascade = 3 * 0.15 = 0.45s
                 * Combined with 0.8s duration, the animation stays tight.
                 */
                .from(lines, {
                    y: 100,
                    opacity: 0,
                    rotationX: -20,
                    duration: 0.8,
                    ease: 'expo.out',
                    stagger: {
                        each: 0.15,
                        from: 'start',
                    },
                }, '-=0.2')
                .from(description, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                }, '-=0.3');
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="min-h-[80vh] flex items-center relative overflow-hidden"
            style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '5vw', paddingRight: '5vw' }}
        >
            {/* Background decoration */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
                style={{
                    background: 'radial-gradient(circle, #c9f31d 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                <span
                    className="hero-badge inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border mb-8"
                    style={{
                        borderColor: 'rgba(201, 243, 29, 0.3)',
                        color: '#c9f31d',
                        background: 'rgba(201, 243, 29, 0.05)',
                    }}
                >
                    Our Services
                </span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05]" style={{ perspective: '800px' }}>
                    <span className="reveal-line block">We Design &amp;</span>
                    <span className="reveal-line block gradient-text">Build Premium</span>
                    <span className="reveal-line block">Digital Products</span>
                </h1>

                <p
                    className="hero-description mt-8 text-base md:text-lg max-w-xl leading-relaxed"
                    style={{ color: '#888' }}
                >
                    From concept to launch, we craft every pixel with purpose. Our services
                    span strategy, design, development, and animation — all under one roof.
                </p>
            </div>
        </section>
    );
}

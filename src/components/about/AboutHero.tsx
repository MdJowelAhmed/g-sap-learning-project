'use client';

/**
 * ===================================================
 * About Hero — About Us Page
 * ===================================================
 *
 * "Our Story" headline with a word-by-word reveal and
 * a parallax background image that moves slower than
 * the scroll speed, creating depth.
 *
 * Word-by-word is chosen over character-by-character here
 * because the About page is about narrative — words carry
 * more meaning than individual characters.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !bgRef.current) return;

            const words = containerRef.current.querySelectorAll('.word-reveal');
            const subtitle = containerRef.current.querySelector('.about-subtitle');

            /* Word-by-word entrance */
            const tl = gsap.timeline({ delay: 0.5 });

            tl.from(words, {
                y: 80,
                opacity: 0,
                rotationX: -40,
                duration: 0.7,
                ease: 'expo.out',
                /**
                 * Word stagger: 0.08s per word
                 * Faster than letter stagger (0.03s) but slower than
                 * line stagger (0.15s) — a middle ground for readability.
                 */
                stagger: 0.08,
            }).from(
                subtitle,
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                },
                '-=0.3'
            );

            /**
             * Parallax background:
             * The background moves at 50% of scroll speed (yPercent: -20
             * over the full section scroll). This creates a subtle depth
             * effect where the background "lags behind" the content.
             */
            gsap.to(bgRef.current, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        },
        { scope: containerRef }
    );

    const headlineWords = ['Our', 'Story,', 'Our', 'Passion,', 'Your', 'Vision'];

    return (
        <section
            ref={containerRef}
            className="min-h-[80vh] flex items-center relative overflow-hidden"
            style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '5vw', paddingRight: '5vw' }}
        >
            {/* Parallax background */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0"
                style={{
                    background: 'radial-gradient(ellipse at 30% 50%, #1a1a2e 0%, #0a0a0a 70%)',
                }}
            >
                <div
                    className="absolute w-[500px] h-[500px] rounded-full opacity-15"
                    style={{
                        background: 'radial-gradient(circle, #c9f31d 0%, transparent 70%)',
                        top: '20%',
                        left: '10%',
                        filter: 'blur(80px)',
                    }}
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <span
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border mb-8"
                    style={{
                        borderColor: 'rgba(201, 243, 29, 0.3)',
                        color: '#c9f31d',
                        background: 'rgba(201, 243, 29, 0.05)',
                    }}
                >
                    About Us
                </span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1]" style={{ perspective: '800px' }}>
                    {headlineWords.map((word, index) => (
                        <span key={index} className="word-reveal inline-block mr-3 md:mr-5">
                            {index === 3 || index === 5 ? (
                                <span className="gradient-text">{word}</span>
                            ) : (
                                word
                            )}
                        </span>
                    ))}
                </h1>

                <p
                    className="about-subtitle mt-8 text-base md:text-lg max-w-xl leading-relaxed"
                    style={{ color: '#888' }}
                >
                    We&apos;re a team of designers, developers, and motion artists who believe
                    that great digital experiences are built at the intersection of art and engineering.
                </p>
            </div>
        </section>
    );
}

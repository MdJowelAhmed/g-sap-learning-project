'use client';

/**
 * ===================================================
 * Hero Section — Home Page
 * ===================================================
 *
 * Animation Sequence (gsap.timeline):
 * 1. Background image scales from 1.3 → 1.0 (cinematic zoom settle)
 * 2. Headline text reveals character by character (manual SplitText)
 * 3. Subtitle fades up
 * 4. CTA button enters with elastic bounce
 *
 * Why this sequence:
 * - The background settling draws the eye to the viewport first
 * - Character reveal creates reading momentum left-to-right
 * - The elastic CTA at the end is the focal point after reading
 *
 * SplitText alternative: We manually wrap each character in a <span>
 * to avoid the GSAP Club dependency. Each span gets animated
 * individually with stagger timing.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MagneticButton from '@/components/ui/MagneticButton';

/**
 * Helper: Splits text into individual character spans.
 * Each character is wrapped in an inline-block span for
 * independent transform animation. Spaces get a &nbsp; width.
 */
function SplitChars({ text, className = '' }: { text: string; className?: string }) {
    return (
        <span className={className} aria-label={text}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className="inline-block char-reveal"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !bgRef.current) return;

            const chars = containerRef.current.querySelectorAll('.char-reveal');
            const subtitle = containerRef.current.querySelector('.hero-subtitle');
            const cta = containerRef.current.querySelector('.hero-cta');

            const tl = gsap.timeline({ delay: 0.8 });

            /**
             * Step 1: Background image scale-down
             * Starting at 1.3 and settling to 1.0 creates a cinematic
             * "camera landing" effect. expo.out provides fast initial
             * deceleration that feels like a physical camera settling.
             */
            tl.from(bgRef.current, {
                scale: 1.3,
                duration: 2,
                ease: 'expo.out',
            });

            /**
             * Step 2: Character-by-character reveal
             * stagger: 0.03s creates a typewriter-like effect
             * that's fast enough to feel fluid, not letter-by-letter slow.
             * y: 100 + rotation gives a 3D "flip up from below" entrance.
             */
            tl.from(
                chars,
                {
                    y: 100,
                    opacity: 0,
                    rotationX: -80,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    /**
                     * Stagger timing: 0.03s per character.
                     * For "Crafting Digital Experiences" (28 chars),
                     * total reveal time = 28 * 0.03 = 0.84s
                     * This keeps the full reveal under 1 second — snappy.
                     */
                    stagger: 0.03,
                },
                '-=1.5' /* Overlap with bg animation for concurrency */
            );

            /**
             * Step 3: Subtitle fade-in
             * Simple y + opacity — subtitle is secondary, shouldn't
             * compete with the headline for attention.
             */
            tl.from(
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
             * Step 4: CTA with elastic entrance
             * elastic.out(1, 0.3) creates a bouncy overshoot that
             * draws the user's eye to the primary action button.
             * scale from 0 makes it "pop" into existence.
             */
            tl.from(
                cta,
                {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.3)',
                },
                '-=0.2'
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background with parallax scale */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0a0a0a 70%)',
                }}
            >
                {/* Animated gradient orbs for visual interest */}
                <div
                    className="absolute w-[600px] h-[600px] rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, #c9f31d 0%, transparent 70%)',
                        top: '10%',
                        right: '10%',
                        filter: 'blur(80px)',
                    }}
                />
                <div
                    className="absolute w-[400px] h-[400px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
                        bottom: '20%',
                        left: '15%',
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-5xl px-6">
                <div className="mb-4">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border mb-8"
                        style={{
                            borderColor: 'rgba(201, 243, 29, 0.3)',
                            color: '#c9f31d',
                            background: 'rgba(201, 243, 29, 0.05)',
                        }}
                    >
                        Next.js + GSAP Studio
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6" style={{ perspective: '1000px' }}>
                    <SplitChars text="Crafting Digital" />
                    <br />
                    <span className="gradient-text">
                        <SplitChars text="Experiences" />
                    </span>
                </h1>

                <p
                    className="hero-subtitle text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                    style={{ color: '#888888' }}
                >
                    We build premium web experiences with buttery-smooth animations,
                    scroll-driven storytelling, and pixel-perfect interactions that
                    captivate your audience.
                </p>

                <div className="hero-cta">
                    <MagneticButton>Explore Our Work</MagneticButton>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-xs tracking-widest uppercase" style={{ color: '#888888' }}>
                    Scroll
                </span>
                <div
                    className="w-5 h-8 rounded-full border flex justify-center pt-1.5"
                    style={{ borderColor: '#333' }}
                >
                    <div
                        className="w-1 h-2 rounded-full animate-bounce"
                        style={{ background: '#c9f31d' }}
                    />
                </div>
            </div>
        </section>
    );
}

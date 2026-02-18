'use client';

/**
 * ===================================================
 * SVG Morph Section — Home Page
 * ===================================================
 *
 * SVG shape morphing section using GSAP-animated CSS clip-path.
 * Since MorphSVGPlugin requires GSAP Club, we achieve a similar
 * visual effect by animating clipPath between complex polygon shapes.
 *
 * The morph is scroll-linked (scrub: 1) so the user controls
 * the transformation speed by scrolling. scrub: 1 means there's
 * a 1-second lag between scroll position and animation position,
 * creating a buttery smooth interpolation
 *
 * Shape Sequence (during scroll):
 * Circle → Blob → Star → Diamond
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Clip-path keyframes for the morph animation.
 * These are carefully crafted polygon/circle points that
 * create distinct recognizable shapes.
 */
const shapes = [
    'circle(30% at 50% 50%)',
    'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
];

const shapeLabels = ['Circle', 'Organic Blob', 'Star', 'Diamond'];

export default function SVGMorphSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const shapeRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !shapeRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    /**
                     * start: 'top center' — morphing begins when section
                     * center aligns with viewport center (user is focused on it).
                     * end: 'bottom center' — morphing completes when section exits.
                     */
                    start: 'top center',
                    end: 'bottom center',
                    /**
                     * scrub: 1 creates a 1-second smoothing buffer between
                     * scroll position and animation progress. This prevents
                     * jerky movements from fast scrolling.
                     */
                    scrub: 1,
                    refreshPriority: 1,
                },
            });

            /* Animate through each shape keyframe */
            shapes.forEach((shape, index) => {
                if (index === 0) return; /* Skip first shape (it's the starting state) */
                tl.to(shapeRef.current, {
                    clipPath: shape,
                    duration: 1,
                    ease: 'none',
                });
            });

            /**
             * Also animate the background hue during morph
             * to add visual interest beyond just shape changes.
             */
            tl.to(
                shapeRef.current,
                {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #c9f31d 50%, #ec4899 100%)',
                    duration: 3,
                    ease: 'none',
                },
                0
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
            style={{ minHeight: '100vh' }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
                {/* Left: Text Content */}
                <div className="flex-1">
                    <span
                        className="text-xs tracking-widest uppercase font-medium"
                        style={{ color: '#c9f31d' }}
                    >
                        Shape Morphing
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
                        Fluid Shape
                        <br />
                        <span className="gradient-text">Transitions</span>
                    </h2>
                    <p className="text-sm leading-relaxed max-w-md" style={{ color: '#888' }}>
                        Watch the shape transform as you scroll. This demonstrates
                        GSAP&apos;s power to animate complex CSS clip-path values with
                        scroll-linked precision using <code style={{ color: '#c9f31d' }}>scrub: 1</code>.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {shapeLabels.map((label, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                    background: '#161616',
                                    border: '1px solid #222',
                                    color: '#888',
                                }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right: Morphing Shape */}
                <div className="flex-1 flex items-center justify-center">
                    <div
                        ref={shapeRef}
                        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
                        style={{
                            background: 'linear-gradient(135deg, #c9f31d 0%, #3b82f6 100%)',
                            clipPath: shapes[0],
                            transition: 'clip-path 0s', /* Disable CSS transition — GSAP handles it */
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

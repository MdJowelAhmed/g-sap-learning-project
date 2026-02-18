'use client';

/**
 * ===================================================
 * Dynamic Gallery — Home Page
 * ===================================================
 *
 * A grid of images that respond to mouse movement with
 * a parallax effect. Different images move at different
 * speeds/depths, creating a volumetric 3D feel.
 *
 * Performance strategy:
 * gsap.quickSetter() is used instead of gsap.to() to set
 * x/y transforms on each frame. quickSetter skips tween
 * creation overhead and directly writes to inline styles,
 * keeping the animation at a solid 60fps even with many elements.
 *
 * Depth calculation:
 * Each image has a "depth" factor (0.02 to 0.06).
 * Higher depth = more movement = appears "closer" to the viewer.
 * This simulates Z-axis layering in a 2D plane.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
    {
        title: 'Abstract Forms',
        color: '#c9f31d',
        gradient: 'linear-gradient(135deg, #c9f31d 0%, #0a0a0a 100%)',
        depth: 0.06,
        size: 'col-span-2 row-span-2',
    },
    {
        title: 'Geometry',
        color: '#3b82f6',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e1b4b 100%)',
        depth: 0.03,
        size: 'col-span-1 row-span-1',
    },
    {
        title: 'Motion',
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #451a03 100%)',
        depth: 0.05,
        size: 'col-span-1 row-span-2',
    },
    {
        title: 'Texture',
        color: '#ec4899',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #4a044e 100%)',
        depth: 0.02,
        size: 'col-span-1 row-span-1',
    },
    {
        title: 'Depth',
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
        depth: 0.04,
        size: 'col-span-2 row-span-1',
    },
    {
        title: 'Contrast',
        color: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #1e1b4b 100%)',
        depth: 0.035,
        size: 'col-span-1 row-span-1',
    },
];

export default function DynamicGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        /**
         * Create quickSetters for each gallery item.
         * quickSetter pre-compiles the style setter for maximum perf.
         * We store an array of setters: [setX, setY] per item.
         */
        const setters = itemRefs.current.map((el) => {
            if (!el) return null;
            return {
                setX: gsap.quickSetter(el, 'x', 'px'),
                setY: gsap.quickSetter(el, 'y', 'px'),
            };
        });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = sectionRef.current!.getBoundingClientRect();

            /* Normalize mouse position to -0.5 ... 0.5 range (center = 0) */
            const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
            const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

            galleryItems.forEach((item, index) => {
                const setter = setters[index];
                if (!setter) return;

                /**
                 * Multiply normalized position by depth factor and a base range.
                 * depth=0.06 with range 100px → max movement = ±3px
                 * This keeps movement subtle but noticeable.
                 */
                setter.setX(normalizedX * item.depth * 1600);
                setter.setY(normalizedY * item.depth * 1600);
            });
        };

        const section = sectionRef.current;
        section.addEventListener('mousemove', handleMouseMove);

        return () => {
            section.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    /* Entrance animation for the gallery */
    useGSAP(
        () => {
            const items = itemRefs.current.filter(Boolean);
            gsap.from(items, {
                y: 80,
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: {
                    each: 0.1,
                    from: 'random',
                },
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
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <span
                        className="text-xs tracking-widest uppercase font-medium"
                        style={{ color: '#c9f31d' }}
                    >
                        Our Work
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2">
                        Dynamic Gallery
                    </h2>
                    <p className="mt-3 text-sm max-w-lg" style={{ color: '#888' }}>
                        Move your cursor across the gallery to see the parallax depth effect.
                        Each layer moves at a different speed.
                    </p>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
                    {galleryItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { itemRefs.current[index] = el; }}
                            className={`${item.size} rounded-2xl overflow-hidden relative group`}
                            data-cursor="pointer"
                            style={{ willChange: 'transform' }}
                        >
                            <div
                                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                                style={{ background: item.gradient }}
                            />
                            <div className="absolute inset-0 flex items-end p-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                    <div
                                        className="w-8 h-0.5 mt-2 rounded-full transition-all duration-500 group-hover:w-16"
                                        style={{ background: item.color }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

/**
 * ===================================================
 * Section Wrapper Component
 * ===================================================
 *
 * Reusable wrapper that adds a consistent fade-in-up entrance
 * animation to any section when it scrolls into the viewport.
 *
 * Uses ScrollTrigger with once: true so the animation only
 * plays once (not on scroll back up). This is the standard
 * pattern for content reveal animations.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default function SectionWrapper({
    children,
    className = '',
    id,
    delay = 0,
}: SectionWrapperProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            gsap.from(sectionRef.current, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                delay,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    /**
                     * start: 'top 85%' means the animation begins when the TOP
                     * of the section reaches 85% from the top of the viewport.
                     * This triggers early enough that users see the full animation,
                     * not just the tail end of it.
                     */
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id={id} className={`section-padding ${className}`}>
            {children}
        </section>
    );
}

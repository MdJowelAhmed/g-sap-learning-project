'use client';

/**
 * ===================================================
 * Custom Cursor Component
 * ===================================================
 *
 * A dual-element custom cursor system:
 * 1. Inner dot (small, instant) — represents exact cursor position
 * 2. Outer ring (larger, slightly delayed) — creates a laggy follow
 *
 * The lag between inner/outer creates depth and polish.
 * gsap.quickSetter is used for maximum performance — it skips the
 * overhead of gsap.to() by directly setting CSS properties on each frame.
 *
 * Interaction states:
 * - Default: small dot + thin ring
 * - Hovering interactive elements: ring expands, gets subtle fill
 * - Hovering images/galleries: ring changes to crosshair-like state
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        /**
         * gsap.quickSetter() is far more performant than gsap.to() for
         * continuous mouse tracking because it:
         * 1. Pre-parses the property string once
         * 2. Skips the tween creation overhead
         * 3. Applies values directly via style property
         *
         * We use 'px' suffix to set left/top in pixels.
         */
        const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
        const setCursorY = gsap.quickSetter(cursor, 'y', 'px');

        /**
         * The follower uses gsap.to() with a short duration instead of
         * quickSetter so it has a slight delay/lerp — this creates the
         * "trailing" effect that adds visual depth.
         */
        const handleMouseMove = (e: MouseEvent) => {
            /* Inner dot — instant, no interpolation */
            setCursorX(e.clientX);
            setCursorY(e.clientY);

            /* Outer ring — slight drag for trailing effect */
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power2.out',
            });
        };

        /**
         * Scale up the cursor when hovering interactive elements.
         * Using event delegation on document for performance —
         * we don't need individual listeners on every element.
         */
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.hasAttribute('data-cursor') ||
                target.closest('[data-cursor]');

            if (isInteractive) {
                follower.classList.add('is-hovering');
                gsap.to(cursor, { scale: 0.5, duration: 0.3 });
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.hasAttribute('data-cursor') ||
                target.closest('[data-cursor]');

            if (isInteractive) {
                follower.classList.remove('is-hovering');
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            }
        };

        /* Hide cursor when it leaves the viewport */
        const handleMouseLeave = () => {
            gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
        };

        const handleMouseEnter = () => {
            gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" />
            <div ref={followerRef} className="cursor-follower" />
        </>
    );
}

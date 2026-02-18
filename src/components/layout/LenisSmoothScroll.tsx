'use client';

/**
 * ===================================================
 * Lenis Smooth Scroll Wrapper
 * ===================================================
 *
 * Integrates Lenis smooth scrolling with GSAP ScrollTrigger.
 * Lenis provides buttery-smooth inertia scrolling that enhances
 * the premium feel. The integration with ScrollTrigger ensures
 * all scroll-triggered animations respond to Lenis's scroll
 * position rather than the native scroll.
 *
 * Architecture:
 * 1. Initialize Lenis with lerp-based smoothing
 * 2. Pipe Lenis scroll events into ScrollTrigger.update()
 * 3. Use gsap.ticker to drive Lenis's RAF loop (single RAF)
 */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LenisSmoothScrollProps {
    children: React.ReactNode;
}

export default function LenisSmoothScroll({ children }: LenisSmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        /**
         * lerp: 0.1 controls smoothing intensity
         * Lower = smoother/slower (more lag), Higher = snappier
         * 0.1 is the premium sweet spot — smooth without feeling sluggish.
         */
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        /**
         * Bridge Lenis → ScrollTrigger:
         * Every time Lenis completes a scroll frame, we tell ScrollTrigger
         * to recalculate all trigger positions relative to the new scroll pos.
         */
        lenis.on('scroll', ScrollTrigger.update);

        /**
         * Use GSAP's ticker instead of a separate requestAnimationFrame.
         * This ensures Lenis and GSAP animations share the same frame loop,
         * preventing visual desync between scroll position and animations.
         */
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000); // GSAP ticker uses seconds, Lenis expects ms
        };
        gsap.ticker.add(tickerCallback);

        /**
         * Disable Lenis's internal RAF since GSAP's ticker drives it.
         * Using lagSmoothing(0) prevents GSAP from compensating for
         * frame drops, which can cause scroll position jumps.
         */
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}

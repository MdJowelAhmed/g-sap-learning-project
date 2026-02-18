'use client';

/**
 * ===================================================
 * useMagnetic Hook
 * ===================================================
 *
 * Creates a magnetic attraction effect where an element follows
 * the cursor when the mouse enters its vicinity. The element
 * snaps back to its original position with an elastic ease
 * when the mouse leaves.
 *
 * How it works:
 * 1. On mouseMove within the element, calculate the offset
 *    between the cursor and element center.
 * 2. Apply a fraction of that offset (strength) to the element
 *    using gsap.to() for smooth interpolation.
 * 3. On mouseLeave, animate back to (0,0) with elastic ease
 *    for a satisfying snap-back effect.
 */

import { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface MagneticOptions {
    /** How much the element follows the cursor. 0.3 = 30% of distance. */
    strength?: number;
    /** Duration of the follow animation in seconds. */
    duration?: number;
    /** Duration of the snap-back animation in seconds. */
    resetDuration?: number;
}

export const useMagnetic = (options: MagneticOptions = {}) => {
    const { strength = 0.3, duration = 0.4, resetDuration = 0.7 } = options;
    const elementRef = useRef<HTMLElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!elementRef.current) return;

            const rect = elementRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            /* Calculate offset from element center to cursor */
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            /**
             * Multiply by strength factor so the element only moves
             * a fraction of the total distance — too much movement
             * makes the element feel out of control.
             */
            gsap.to(elementRef.current, {
                x: deltaX * strength,
                y: deltaY * strength,
                duration,
                ease: 'power2.out',
            });
        },
        [strength, duration]
    );

    const handleMouseLeave = useCallback(() => {
        if (!elementRef.current) return;

        /**
         * elastic.out(1, 0.3) creates a playful bounce-back effect.
         * The (1, 0.3) parameters control amplitude and period:
         * - amplitude 1 = full overshoot
         * - period 0.3 = moderate oscillation speed
         */
        gsap.to(elementRef.current, {
            x: 0,
            y: 0,
            duration: resetDuration,
            ease: 'elastic.out(1, 0.3)',
        });
    }, [resetDuration]);

    return {
        ref: elementRef,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    };
};

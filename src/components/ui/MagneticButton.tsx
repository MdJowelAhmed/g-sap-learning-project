'use client';

/**
 * ===================================================
 * Magnetic Button Component
 * ===================================================
 *
 * A reusable button that creates a magnetic attraction effect.
 * When the mouse enters the button's vicinity, the button
 * follows the cursor position with a dampened movement.
 *
 * Uses the useMagnetic hook for the core effect,
 * and adds visual styling appropriate for CTAs.
 */

import { useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'outline';
}

export default function MagneticButton({
    children,
    className = '',
    onClick,
    variant = 'primary',
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current || !textRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        /**
         * The button moves at 30% of cursor offset, while the inner
         * text moves at 40% — this parallax between container and content
         * adds extra depth and dimensionality to the effect.
         */
        gsap.to(buttonRef.current, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out',
        });

        gsap.to(textRef.current, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        if (!buttonRef.current || !textRef.current) return;

        /**
         * elastic.out(1, 0.3) for snap-back:
         * - amplitude 1 = the overshoot reaches the target distance
         * - period 0.3 = controls how fast the oscillation decays
         * This creates a satisfying "rubber band" snap-back.
         */
        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)',
        });

        gsap.to(textRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    const baseStyles =
        variant === 'primary'
            ? 'bg-[#c9f31d] text-[#0a0a0a] hover:bg-[#d4f74a]'
            : 'bg-transparent text-[#c9f31d] border border-[#c9f31d] hover:bg-[#c9f31d]/10';

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="pointer"
            className={`
        inline-flex items-center justify-center
        px-8 py-4 rounded-full
        text-sm font-semibold tracking-wide uppercase
        transition-colors duration-300
        ${baseStyles}
        ${className}
      `}
        >
            <span ref={textRef}>{children}</span>
        </button>
    );
}

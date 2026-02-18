'use client';

/**
 * ===================================================
 * Page Transition Component
 * ===================================================
 *
 * Creates a full-screen color overlay that animates on route change.
 * The transition follows a "reveal wipe" pattern:
 *
 * 1. User clicks a nav link
 * 2. Overlay scales up from bottom (covers current page)
 * 3. Route changes while overlay is fully covering
 * 4. Overlay scales down from top (reveals new page)
 *
 * The overlay uses scaleY transform (GPU-accelerated) instead of
 * height animation for buttery 60fps performance.
 *
 * Uses usePathname() to detect route changes.
 */

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const isFirstRender = useRef(true);

    useEffect(() => {
        /* Skip animation on initial page load */
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setDisplayChildren(children);
            return;
        }

        const overlay = overlayRef.current;
        if (!overlay) {
            setDisplayChildren(children);
            return;
        }

        /**
         * Timeline for the page wipe transition:
         *
         * expo.inOut is used because it provides equal acceleration on entry
         * and deceleration on exit — making both halves feel balanced.
         * A bouncy or elastic ease would feel jarring for a full-screen wipe.
         */
        const tl = gsap.timeline({
            onComplete: () => {
                /* Scroll to top after transition */
                window.scrollTo(0, 0);
            },
        });

        tl.set(overlay, { transformOrigin: 'bottom', scaleY: 0 })
            .to(overlay, {
                scaleY: 1,
                duration: 0.5,
                ease: 'expo.inOut',
            })
            .add(() => {
                /* Swap content while overlay is fully covering the page */
                setDisplayChildren(children);
            })
            .set(overlay, { transformOrigin: 'top' })
            .to(overlay, {
                scaleY: 0,
                duration: 0.5,
                ease: 'expo.inOut',
                delay: 0.1, /* Brief pause so new page has time to render */
            });

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [pathname]);

    return (
        <>
            <div ref={overlayRef} className="page-transition-overlay" />
            {displayChildren}
        </>
    );
}

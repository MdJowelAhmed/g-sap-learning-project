'use client';

/**
 * ===================================================
 * GsapBasicsShowcase — Main Page Component
 * ===================================================
 *
 * Renders Example 1 (to vs from) inline, then imports
 * separate demo components for Examples 2-4:
 *   - FromToDemo   → gsap.fromTo()
 *   - StaggerDemo  → stagger cascade & center-out
 *   - TimelineDemo → sequenced timeline with position param
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FromToDemo from './FromToDemo';
import StaggerDemo from './StaggerDemo';
import TimelineDemo from './TimelineDemo';

export default function GsapBasicsShowcase() {
    /**
     * useRef is used here to get a reference to the container DOM element.
     * This ref is passed as `scope` to useGSAP, which means GSAP will only
     * look for animation targets INSIDE this container — preventing conflicts
     * with other components on the page.
     */
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * We store the GSAP context here so we can call context.revert() + re-run
     * animations when the "Replay" button is clicked.
     */
    const ctx = useRef<gsap.Context | null>(null);

    /**
     * The core animation function — creates (or re-creates) the GSAP context
     * and runs both animations. Called on mount and on replay button click.
     */
    const runAnimations = () => {
        // Kill the old context before creating a new one (for clean replay)
        if (ctx.current) {
            ctx.current.revert();
        }

        // Create a new GSAP context scoped to the container
        ctx.current = gsap.context(() => {
            // ─────────────────────────────────────────────
            // gsap.from() — The "From Box"
            // ─────────────────────────────────────────────
            /**
             * gsap.from() animates FROM the specified values TO the element's
             * natural CSS position. Here the box STARTS invisible, scaled to 0,
             * and 200px to the left / 100px below, then bounces into place.
             *
             * WHY elastic.out(1, 0.5)?
             *   elastic.out gives a springy, bouncy feel — great for elements
             *   that should feel alive as they enter the screen.
             *   The first param (1) = amplitude (how far it overshoots).
             *   The second param (0.5) = period (how quickly it oscillates).
             */
            gsap.from('.from-box', {
                x: -200,        // Starts 200px to the LEFT of its natural position
                y: 100,         // Starts 100px BELOW its natural position
                scale: 0,       // Starts completely shrunk (invisible size)
                opacity: 0,     // Starts fully transparent
                duration: 1.5,
                ease: 'elastic.out(1, 0.5)', // Bouncy spring ease — fun & lively
                delay: 0.5,     // Short delay before the animation begins
            });

            // ─────────────────────────────────────────────
            // gsap.to() — The "To Box"
            // ─────────────────────────────────────────────
            /**
             * gsap.to() animates FROM the element's natural CSS position TO the
             * specified target values. Here the box starts in place and glides
             * to the right while rotating, changing color, scaling up, and fading.
             *
             * WHY power2.inOut?
             *   power2.inOut creates a smooth acceleration and deceleration —
             *   the animation starts slow, speeds up through the middle, and
             *   slows back down at the end. Ideal for mechanical/continuous motion.
             *
             * WHY repeat: -1 (Infinite Loop)?
             *   A value of -1 means "repeat forever". Combined with yoyo: true,
             *   the animation plays forward then reverses, endlessly oscillating
             *   between the start and end state — perfect for a live demo.
             *
             * WHY yoyo: true?
             *   yoyo makes the animation reverse back to its starting values
             *   after each forward pass. Without yoyo, the box would jump back
             *   to the start before repeating, which looks jarring.
             */
            gsap.to('.to-box', {
                x: 300,                        // Moves 300px to the RIGHT
                rotation: 180,                 // Full 360° clockwise spin
                backgroundColor: '#ef4444',    // Changes from accent color to red
                scale: 1.2,                    // Grows slightly larger
                opacity: 0.5,                  // Becomes semi-transparent
                duration: 2,
                ease: 'power2.inOut',          // Smooth in-out ease
                repeat: -1,                    // Repeat infinitely
                yoyo: true,                    // Reverse back on each repeat
            });
        }, containerRef); // ← `scope`: all selectors above only match inside containerRef
    };

    /**
     * useGSAP is the official GSAP hook for React/Next.js.
     *
     * WHY use useGSAP instead of useEffect?
     *   useGSAP automatically creates and reverts a GSAP context, preventing
     *   memory leaks and cleaning up animations when the component unmounts.
     *   It also handles StrictMode double-invocation correctly.
     *
     * The `scope` option restricts querySelector lookups to within containerRef,
     * so '.from-box' only matches elements inside THIS component — not globally.
     */
    useGSAP(
        () => {
            runAnimations();
        },
        { scope: containerRef }
    );

    return (
        <div style={{ background: '#0a0a0a', marginTop: '100px' }}>
            {/* ══════════════════════════════════════════
            Example 1 — to() vs from()
        ══════════════════════════════════════════ */}
            <div
                ref={containerRef}
                className="w-full flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
            >
                {/* ── Page Header ── */}
                <div className="text-center mb-16 max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] mb-3 font-medium" style={{ color: '#c9f31d' }}>
                        GSAP Fundamentals
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        <span style={{ color: '#c9f31d' }}>to()</span> vs{' '}
                        <span style={{ color: '#60a5fa' }}>from()</span>
                    </h1>
                    <p className="text-white/50 text-base md:text-lg leading-relaxed">
                        Two core GSAP methods — same result, opposite direction of travel.
                    </p>
                </div>

                {/* ── Explanation Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-10 ">
                    {/* from() Card */}
                    <div
                        className="rounded-2xl p-4 border "
                        style={{
                            background: 'rgba(96,165,250,0.05)',
                            borderColor: 'rgba(96,165,250,0.2)',

                        }}
                    >
                        <span
                            className="text-xs uppercase tracking-widest font-semibold mb-2 block"
                            style={{ color: '#60a5fa' }}
                        >
                            gsap.from()
                        </span>
                        <p className="text-white/70 text-sm leading-relaxed ">
                            You define the <strong className="text-white">starting state</strong>. GSAP animates the
                            element <em>from</em> those values back to its natural CSS position. The element was always
                            &quot;there&quot; — it just flies in.
                        </p>
                    </div>

                    {/* to() Card */}
                    <div
                        className="rounded-2xl p-6 border"
                        style={{
                            background: 'rgba(201,243,29,0.05)',
                            borderColor: 'rgba(201,243,29,0.2)',
                        }}
                    >
                        <span
                            className="text-xs uppercase tracking-widest font-semibold mb-2 block"
                            style={{ color: '#c9f31d' }}
                        >
                            gsap.to()
                        </span>
                        <p className="text-white/70 text-sm leading-relaxed">
                            You define the <strong className="text-white">ending state</strong>. GSAP animates the element
                            from its natural CSS position <em>to</em> those values. The element starts where it is and
                            travels somewhere new.
                        </p>
                    </div>
                </div>

                {/* ── Animation Arena ── */}
                <div
                    className="relative w-full max-w-4xl rounded-3xl overflow-hidden "
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        minHeight: '360px',
                        // marginTop: "100px"
                    }}
                >
                    {/* Grid lines for visual depth */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-12 p-12 md:p-16">
                        {/* ── FROM BOX ── */}
                        <div className="flex flex-col items-center gap-5">
                            <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: '#60a5fa' }}>
                                gsap.from()
                            </span>
                            {/**
                         * .from-box is the GSAP target selector.
                         * It starts at x:-200, y:100, scale:0, opacity:0
                         * and naturally lands at this exact position (x:0, y:0, scale:1, opacity:1).
                         */}
                            <div
                                className="from-box w-24 h-24 rounded-2xl flex items-center justify-center text-xs font-bold text-white/80 shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                    boxShadow: '0 0 40px rgba(59,130,246,0.3)',
                                }}
                            >
                                FROM
                            </div>
                            <div className="text-center max-w-[160px]">
                                <p className="text-white/30 text-xs leading-relaxed">
                                    Flies in from{' '}
                                    <span className="text-white/60">left+below</span>,{' '}
                                    scaled zero → lands here
                                </p>
                            </div>
                        </div>

                        {/* ── Divider ── */}
                        <div className="hidden md:block w-px h-32" style={{ background: 'rgba(255,255,255,0.08)' }} />

                        {/* ── TO BOX ── */}
                        <div className="flex flex-col items-center gap-5">
                            <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: '#c9f31d' }}>
                                gsap.to()
                            </span>
                            {/**
                         * .to-box is the GSAP target selector.
                         * It STARTS here (its natural CSS position) and animates
                         * TO x:300, rotation:360, backgroundColor:#ef4444, scale:1.2, opacity:0.5.
                         * With repeat:-1 and yoyo:true it loops back and forth forever.
                         */}
                            <div
                                className="to-box w-24 h-24 rounded-2xl flex items-center justify-center text-xs font-bold text-white/80 shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #c9f31d, #84a80a)',
                                    boxShadow: '0 0 40px rgba(201,243,29,0.25)',
                                }}
                            >
                                TO
                            </div>
                            <div className="text-center max-w-[160px]">
                                <p className="text-white/30 text-xs leading-relaxed">
                                    Starts here → travels right,
                                    spins, turns{' '}
                                    <span className="text-red-400">red</span>,
                                    yoyos forever
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Replay Button ── */}
                <div className="mt-12 flex flex-col items-center gap-3">
                    <button
                        onClick={runAnimations}
                        className="group relative px-10 py-4 rounded-full font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300"
                        style={{
                            background: '#c9f31d',
                            color: '#0a0a0a',
                            boxShadow: '0 0 30px rgba(201,243,29,0.3)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                '0 0 50px rgba(201,243,29,0.5)';
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                '0 0 30px rgba(201,243,29,0.3)';
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                        }}
                    >
                        ↺ &nbsp;Replay Animations
                    </button>
                    <p className="text-white/20 text-xs">
                        Restarts both animations simultaneously
                    </p>
                </div>

                {/* ── Properties Reference Table ── */}
                <div className="mt-20 w-full max-w-4xl">
                    <h2 className="text-lg font-semibold text-white/80 mb-6 text-center">Quick Reference</h2>
                    <div
                        className="rounded-2xl overflow-hidden border text-sm"
                        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                        <table className="w-full">
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                                    <th className="text-left px-6 py-4 text-white/50 font-medium">Property</th>
                                    <th className="text-left px-6 py-4 font-medium" style={{ color: '#60a5fa' }}>
                                        gsap.from() (Blue Box)
                                    </th>
                                    <th className="text-left px-6 py-4 font-medium" style={{ color: '#c9f31d' }}>
                                        gsap.to() (Yellow Box)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['x', '-200 (starts left)', '300 (ends right)'],
                                    ['y', '100 (starts below)', '—'],
                                    ['scale', '0 → 1 (grows in)', '1 → 1.2 (grows out)'],
                                    ['opacity', '0 → 1', '1 → 0.5'],
                                    ['rotation', '—', '0 → 360°'],
                                    ['duration', '1.5s', '2s'],
                                    ['ease', 'elastic.out(1, 0.5)', 'power2.inOut'],
                                    ['repeat', '—', '-1 (∞)'],
                                    ['yoyo', '—', 'true'],
                                    ['delay', '0.5s', '—'],
                                ].map(([prop, from, to], i) => (
                                    <tr
                                        key={prop}
                                        style={{
                                            background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                                            borderTop: '1px solid rgba(255,255,255,0.04)',
                                        }}
                                    >
                                        <td className="px-6 py-3 text-white/40 font-mono text-xs">{prop}</td>
                                        <td className="px-6 py-3 text-white/60">{from}</td>
                                        <td className="px-6 py-3 text-white/60">{to}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>{/* /Example 1 wrapper */}

            {/* ══════════════════════════════════════════
            Examples 2, 3, 4 — separate components
        ══════════════════════════════════════════ */}
            <div className="w-full flex flex-col items-center px-6 pb-24 gap-0">
                <FromToDemo />
                <StaggerDemo />
                <TimelineDemo />
            </div>

        </div>/* /outer bg wrapper */
    );
}

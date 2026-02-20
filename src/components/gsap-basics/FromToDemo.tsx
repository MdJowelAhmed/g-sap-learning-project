'use client';

/**
 * ===================================================
 * FromToDemo — gsap.fromTo() Showcase
 * ===================================================
 *
 * CONCEPT:
 * gsap.fromTo() is the most EXPLICIT of the three core methods.
 * You define BOTH the starting values AND the ending values yourself.
 * GSAP ignores the element's current CSS state entirely.
 *
 * Syntax:
 *   gsap.fromTo(target, { /* FROM values *\/ }, { /* TO values *\/ })
 *
 * WHY use fromTo() instead of from() or to()?
 *   - When you want total control — no dependency on the element's CSS state.
 *   - When replaying animations: gsap.from() re-reads the current CSS values,
 *     which can drift. fromTo() always snaps back to the defined FROM state.
 *   - Great for looping, timeline sequencing, or when elements have been
 *     previously animated and their "natural" position is ambiguous.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function FromToDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ctx = useRef<gsap.Context | null>(null);

    const runAnimation = () => {
        if (ctx.current) ctx.current.revert();

        ctx.current = gsap.context(() => {
            /**
             * Box 1 — fromTo() with explicit size & color change
             * FROM: small (scale 0.3), blue, left side
             * TO:   full size (scale 1), purple, right side
             */
            gsap.fromTo(
                '.fromto-box-1',
                {
                    // ─── FROM (starting state) ───
                    x: -120,
                    scale: 0.3,
                    opacity: 0,
                    borderRadius: '4px',
                },
                {
                    // ─── TO (ending state) ───
                    x: 120,
                    scale: 1,
                    opacity: 1,
                    borderRadius: '50%', // morphs into a circle on arrival
                    duration: 1.2,
                    ease: 'back.out(1.7)', // overshoots slightly before settling
                }
            );

            /**
             * Box 2 — fromTo() showing independent control of start/end
             * regardless of the element's actual CSS position.
             * FROM: top, rotated, yellow
             * TO:   bottom, upright, white — with a bounce ease
             */
            gsap.fromTo(
                '.fromto-box-2',
                {
                    y: -80,
                    rotation: -90,
                    opacity: 0.2,
                    scale: 0.5,
                },
                {
                    y: 80,
                    rotation: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.4,
                    ease: 'bounce.out', // simulates gravity/bouncing on landing
                    delay: 0.3,
                }
            );

            /**
             * Box 3 — fromTo() looping with yoyo
             * Proves that fromTo() always returns to the exact FROM state
             * on each loop — consistent and predictable, unlike gsap.from().
             */
            gsap.fromTo(
                '.fromto-box-3',
                {
                    x: -100,
                    skewX: 30,      // tilted/skewed at start
                    opacity: 0.1,
                },
                {
                    x: 100,
                    skewX: 0,       // straightens out on arrival
                    opacity: 1,
                    duration: 1,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: 0.6,
                }
            );
        }, containerRef);
    };

    useGSAP(
        () => { runAnimation(); },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="w-full max-w-4xl rounded-3xl p-8 md:p-12 mt-6"
            style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            {/* Header */}
            <div className="mb-8">
                <span
                    className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full mb-3"
                    style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}
                >
                    Example 2
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    gsap<span style={{ color: '#a855f7' }}>.fromTo()</span>
                </h2>
                <p className="text-white/50 text-sm max-w-xl leading-relaxed">
                    You control <strong className="text-white">both</strong> the start AND end state explicitly.
                    GSAP ignores the element&#39;s CSS — perfect for predictable, repeatable animations.
                </p>
            </div>

            {/* Code hint */}
            <div
                className="rounded-xl px-5 py-3 mb-8 font-mono text-xs text-white/60 leading-relaxed"
                style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)' }}
            >
                <span style={{ color: '#a855f7' }}>gsap</span>
                <span className="text-white/40">.fromTo(</span>
                <span className="text-yellow-300">target</span>
                <span className="text-white/40">, </span>
                <span className="text-blue-300">{'{ /* FROM */ }'}</span>
                <span className="text-white/40">, </span>
                <span style={{ color: '#c9f31d' }}>{'{ /* TO */ }'}</span>
                <span className="text-white/40">)</span>
            </div>

            {/* Animation Stage */}
            <div
                className="relative rounded-2xl overflow-hidden flex flex-col gap-10 items-center justify-center py-10 px-4"
                style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    minHeight: '280px',
                }}
            >
                {/* Box 1 */}
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[11px] text-white/30 uppercase tracking-widest">→ morphs to circle</span>
                    <div
                        className="fromto-box-1 w-16 h-16 flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #a855f7, #6d28d9)', borderRadius: '4px' }}
                    >
                        1
                    </div>
                </div>

                {/* Box 2 */}
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[11px] text-white/30 uppercase tracking-widest">↓ falls with bounce</span>
                    <div
                        className="fromto-box-2 w-16 h-16 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                    >
                        2
                    </div>
                </div>

                {/* Box 3 */}
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[11px] text-white/30 uppercase tracking-widest">↔ loops with skew</span>
                    <div
                        className="fromto-box-3 w-16 h-16 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #9d174d)' }}
                    >
                        3
                    </div>
                </div>
            </div>

            {/* Key insight callout */}
            <div
                className="mt-6 rounded-xl px-5 py-4 text-sm leading-relaxed"
                style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.12)' }}
            >
                <strong style={{ color: '#a855f7' }}>💡 Key Insight: </strong>
                <span className="text-white/60">
                    When you replay an animation built with <code className="text-white/90 text-xs">gsap.from()</code>,
                    it re-reads the element&#39;s current CSS position as the destination — which may have shifted.
                    <code className="text-white/90 text-xs"> fromTo()</code> always snaps to your defined FROM values,
                    making loops and replays <strong className="text-white">100% predictable</strong>.
                </span>
            </div>

            {/* Replay */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={runAnimation}
                    className="px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                    style={{
                        background: 'rgba(168,85,247,0.2)',
                        color: '#a855f7',
                        border: '1px solid rgba(168,85,247,0.4)',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,0.35)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,0.2)')}
                >
                    ↺ Replay fromTo()
                </button>
            </div>
        </section>
    );
}

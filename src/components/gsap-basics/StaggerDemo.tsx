'use client';

/**
 * ===================================================
 * StaggerDemo — GSAP Stagger Showcase
 * ===================================================
 *
 * CONCEPT:
 * Stagger lets you animate MULTIPLE elements with the SAME animation,
 * but each element starts with a small time offset after the previous one.
 * This creates a "wave" or "cascade" effect without writing separate tweens.
 *
 * Syntax (as part of gsap.from / gsap.to / gsap.fromTo):
 *   gsap.from('.item', {
 *     y: 50,
 *     opacity: 0,
 *     stagger: 0.1   // each element starts 0.1s after the previous
 *   });
 *
 * Advanced stagger options:
 *   stagger: {
 *     amount: 1,          // total time distributed across ALL elements
 *     from: 'center',     // start stagger from center outward
 *     ease: 'power2.in',  // ease the stagger timing itself
 *   }
 *
 * WHY stagger?
 *   Without stagger: all elements animate simultaneously — looks robotic.
 *   With stagger: elements animate in sequence — looks natural and polished.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ITEMS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'];
const GRID_ITEMS = Array.from({ length: 9 }, (_, i) => i + 1);

export default function StaggerDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ctx = useRef<gsap.Context | null>(null);

    const runAnimation = () => {
        if (ctx.current) ctx.current.revert();

        ctx.current = gsap.context(() => {
            /**
             * Demo 1 — Basic linear stagger
             * Each list item flies up from below, 0.12s apart.
             * Looks like a menu appearing item by item.
             */
            gsap.from('.stagger-list-item', {
                y: 40,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.12,  // each item waits 0.12s longer than the one before
            });

            /**
             * Demo 2 — Center stagger (radiates outward from the middle)
             * The center card animates first, then cards expand outward.
             * `from: 'center'` tells GSAP to stagger starting from the middle element.
             */
            gsap.from('.stagger-grid-item', {
                scale: 0,
                opacity: 0,
                rotation: 180,
                duration: 0.5,
                ease: 'back.out(2)',
                delay: 0.5,
                stagger: {
                    amount: 1.2,        // total 1.2 seconds spread across all 9 items
                    from: 'center',     // start from the center grid cell outward
                    ease: 'power1.in',  // the stagger timing itself eases in
                },
            });
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
                    style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}
                >
                    Example 3
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    gsap <span style={{ color: '#10b981' }}>stagger</span>
                </h2>
                <p className="text-white/50 text-sm max-w-xl leading-relaxed">
                    Apply the same animation to multiple elements with a cascading time offset.
                    From a simple list to a 2D grid — one property, infinite elegance.
                </p>
            </div>

            {/* Code hint */}
            <div
                className="rounded-xl px-5 py-3 mb-8 font-mono text-xs text-white/60 leading-relaxed"
                style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
            >
                <span style={{ color: '#10b981' }}>stagger</span>
                <span className="text-white/40">: </span>
                <span className="text-yellow-300">0.12</span>
                <span className="text-white/30"> &nbsp;// linear — each item waits 0.12s</span>
                <br />
                <span style={{ color: '#10b981' }}>stagger</span>
                <span className="text-white/40">: {'{ '}</span>
                <span className="text-blue-300">amount</span>
                <span className="text-white/40">: </span>
                <span className="text-yellow-300">1.2</span>
                <span className="text-white/40">, </span>
                <span className="text-blue-300">from</span>
                <span className="text-white/40">: </span>
                <span className="text-orange-300">&apos;center&apos;</span>
                <span className="text-white/40">{' }'} &nbsp;</span>
                <span className="text-white/30">// radiates from middle</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Demo 1 — List Stagger */}
                <div>
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-4">
                        Linear stagger — list items
                    </p>
                    <div className="flex flex-col gap-2">
                        {ITEMS.map((item, i) => (
                            <div
                                key={i}
                                className="stagger-list-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white"
                                style={{
                                    background: `rgba(16,185,129,${0.06 + i * 0.03})`,
                                    border: '1px solid rgba(16,185,129,0.1)',
                                }}
                            >
                                <span style={{ color: '#10b981' }}>{item}</span>
                                <span className="text-white/50">Item — stagger {(i * 0.12).toFixed(2)}s delay</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Demo 2 — Grid stagger from center */}
                <div>
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-4">
                        Center stagger — 3×3 grid
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        {GRID_ITEMS.map((n) => (
                            <div
                                key={n}
                                className="stagger-grid-item aspect-square rounded-xl flex items-center justify-center text-lg font-bold text-white"
                                style={{
                                    background:
                                        n === 5
                                            ? 'linear-gradient(135deg, #10b981, #059669)' // center cell highlighted
                                            : 'rgba(16,185,129,0.12)',
                                    border: '1px solid rgba(16,185,129,0.15)',
                                    color: n === 5 ? '#fff' : 'rgba(255,255,255,0.5)',
                                }}
                            >
                                {n === 5 ? '★' : n}
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-white/25 mt-3 text-center">
                        ★ = center cell animates first
                    </p>
                </div>
            </div>

            {/* Key insight */}
            <div
                className="mt-8 rounded-xl px-5 py-4 text-sm leading-relaxed"
                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.12)' }}
            >
                <strong style={{ color: '#10b981' }}>💡 Key Insight: </strong>
                <span className="text-white/60">
                    <code className="text-white/90 text-xs">stagger: 0.12</code> is shorthand for a simple linear offset.
                    Use the object syntax{' '}
                    <code className="text-white/90 text-xs">{'{ amount, from, ease }'}</code> for advanced control —
                    start from <code className="text-white/90 text-xs">&apos;center&apos;</code>,{' '}
                    <code className="text-white/90 text-xs">&apos;end&apos;</code>,{' '}
                    <code className="text-white/90 text-xs">&apos;edges&apos;</code>, or even a specific index.
                </span>
            </div>

            {/* Replay */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={runAnimation}
                    className="px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                    style={{
                        background: 'rgba(16,185,129,0.15)',
                        color: '#10b981',
                        border: '1px solid rgba(16,185,129,0.3)',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.3)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.15)')}
                >
                    ↺ Replay Stagger
                </button>
            </div>
        </section>
    );
}

'use client';

/**
 * ===================================================
 * StaggerDemo — GSAP Stagger Showcase (Redesigned)
 * ===================================================
 *
 * CONCEPT:
 * Stagger animates multiple elements with the SAME tween but each
 * element starts with a small time offset — creating wave / cascade effects.
 *
 * stagger: 0.12             → simple linear — each item waits 0.12 s
 * stagger: { amount, from } → advanced — radiate from 'center', 'end', etc.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ITEMS = [
    { label: 'Component', sub: '0.00s', icon: '▸' },
    { label: 'Styling', sub: '0.12s', icon: '▸' },
    { label: 'Animation', sub: '0.24s', icon: '▸' },
    { label: 'Interaction', sub: '0.36s', icon: '▸' },
    { label: 'Performance', sub: '0.48s', icon: '▸' },
    { label: 'Deployment', sub: '0.60s', icon: '▸' },
];

const GRID_SIZE = 9;
const GRID_ITEMS = Array.from({ length: GRID_SIZE }, (_, i) => i);

export default function StaggerDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ctx = useRef<gsap.Context | null>(null);

    const runAnimation = () => {
        if (ctx.current) ctx.current.revert();

        ctx.current = gsap.context(() => {
            /**
             * Demo 1 — Linear stagger
             * Each list row slides in from the left, 0.12 s apart.
             */
            gsap.from('.sg-list-row', {
                x: -60,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.15,
            });

            // Accent bar fills in after item
            gsap.from('.sg-list-bar', {
                scaleX: 0,
                opacity: 0,
                duration: 0.9,
                ease: 'power2.out',
                stagger: 0.15,
                delay: 0.3,
                transformOrigin: 'left center',
            });

            /**
             * Demo 2 — Center stagger on 3×3 grid
             * Center cell fires first, then radiates outward.
             */
            gsap.from('.sg-grid-cell', {
                scale: 0,
                opacity: 0,
                rotation: 90,
                duration: 0.9,
                ease: 'back.out(2.5)',
                delay: 0.3,
                stagger: {
                    amount: 1.8,
                    from: 'center',
                    ease: 'power1.in',
                },
            });
        }, containerRef);
    };

    useGSAP(() => { runAnimation(); }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full max-w-4xl mt-8 rounded-3xl overflow-hidden"
            style={{
                background: 'linear-gradient(145deg, rgba(16,185,129,0.04) 0%, rgba(10,10,10,0) 60%)',
                border: '1px solid rgba(16,185,129,0.12)',
            }}
        >
            {/* Ambient glow */}
            <div
                className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
            />

            <div className="relative z-10 p-8 md:p-12">

                {/* ── Header ── */}
                <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <span
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-4"
                            style={{
                                background: 'rgba(16,185,129,0.1)',
                                color: '#10b981',
                                border: '1px solid rgba(16,185,129,0.2)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Example 3
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            gsap <span style={{ color: '#10b981' }}>stagger</span>
                        </h2>
                        <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                            One tween, many targets — each slightly offset in time.
                            The secret sauce behind every polished UI reveal.
                        </p>
                    </div>

                    {/* Syntax chip */}
                    <div
                        className="self-start rounded-2xl px-5 py-4 font-mono text-xs leading-6"
                        style={{
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid rgba(16,185,129,0.2)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        <span style={{ color: '#10b981' }}>stagger</span>
                        <span className="text-white/30">: </span>
                        <span className="text-yellow-300/80">0.12</span>
                        <span className="text-white/20 text-[10px]"> // linear</span>
                        <br />
                        <span style={{ color: '#10b981' }}>stagger</span>
                        <span className="text-white/30">: {'{ '}</span>
                        <span className="text-blue-300/80">amount</span>
                        <span className="text-white/20">: </span>
                        <span className="text-yellow-300/80">1.1</span>
                        <span className="text-white/20">, </span>
                        <br />
                        <span className="ml-8 text-blue-300/80">from</span>
                        <span className="text-white/20">: </span>
                        <span className="text-orange-300/80">&apos;center&apos;</span>
                        <span className="text-white/30">{' }'}</span>
                    </div>
                </div>

                {/* ── Two Demo Panels ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    {/* Panel 1 — Linear List */}
                    <div
                        className="rounded-2xl p-6 relative overflow-hidden"
                        style={{
                            background: 'rgba(0,0,0,0.35)',
                            border: '1px solid rgba(16,185,129,0.1)',
                        }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-1 font-mono">Demo A</p>
                        <p className="text-sm font-semibold text-white/60 mb-5">
                            Linear <span style={{ color: '#10b981' }}>stagger: 0.12</span>
                        </p>

                        <div className="flex flex-col gap-2.5">
                            {ITEMS.map((item, i) => (
                                <div
                                    key={i}
                                    className="sg-list-row group relative flex items-center gap-3 px-4 py-3 rounded-xl overflow-hidden cursor-default"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(16,185,129,0.08)',
                                    }}
                                >
                                    {/* Fill bar */}
                                    <div
                                        className="sg-list-bar absolute inset-0 rounded-xl pointer-events-none"
                                        style={{
                                            background: `linear-gradient(90deg, rgba(16,185,129,${0.05 + i * 0.015}) 0%, transparent 100%)`,
                                            transformOrigin: 'left center',
                                        }}
                                    />

                                    {/* Left accent dot */}
                                    <div
                                        className="relative z-10 w-2 h-2 rounded-full flex-shrink-0"
                                        style={{
                                            background: `rgba(16,185,129,${0.4 + i * 0.08})`,
                                            boxShadow: `0 0 6px rgba(16,185,129,${0.4 + i * 0.08})`,
                                        }}
                                    />

                                    <span className="relative z-10 text-sm font-medium text-white/70 flex-1">{item.label}</span>

                                    <span
                                        className="relative z-10 text-[10px] font-mono px-2 py-0.5 rounded"
                                        style={{
                                            color: '#10b981',
                                            background: 'rgba(16,185,129,0.08)',
                                        }}
                                    >
                                        +{item.sub}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel 2 — Grid Center Stagger */}
                    <div
                        className="rounded-2xl p-6 relative overflow-hidden flex flex-col"
                        style={{
                            background: 'rgba(0,0,0,0.35)',
                            border: '1px solid rgba(16,185,129,0.1)',
                        }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-1 font-mono">Demo B</p>
                        <p className="text-sm font-semibold text-white/60 mb-5">
                            Center-out <span style={{ color: '#10b981' }}>stagger: {'{ from: "center" }'}</span>
                        </p>

                        {/* 3×3 Grid */}
                        <div className="grid grid-cols-3 gap-3 flex-1">
                            {GRID_ITEMS.map((n) => {
                                const isCenter = n === 4;
                                return (
                                    <div
                                        key={n}
                                        className="sg-grid-cell aspect-square rounded-xl flex items-center justify-center text-sm font-bold relative overflow-hidden"
                                        style={{
                                            background: isCenter
                                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                                : 'rgba(16,185,129,0.07)',
                                            border: `1px solid ${isCenter ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.12)'}`,
                                            boxShadow: isCenter ? '0 0 20px rgba(16,185,129,0.35)' : 'none',
                                            color: isCenter ? '#fff' : 'rgba(255,255,255,0.3)',
                                        }}
                                    >
                                        {isCenter ? (
                                            <span className="text-lg">★</span>
                                        ) : (
                                            <span className="text-xs font-mono">{n < 4 ? n + 1 : n + 1}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <p className="text-[10px] text-white/20 mt-4 text-center font-mono tracking-wide">
                            ★ center fires first · radiates outward
                        </p>
                    </div>
                </div>

                {/* ── Insight + Replay ── */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                    <div
                        className="flex-1 rounded-2xl px-5 py-4 text-sm leading-relaxed"
                        style={{
                            background: 'rgba(16,185,129,0.05)',
                            border: '1px solid rgba(16,185,129,0.12)',
                        }}
                    >
                        <strong style={{ color: '#10b981' }}>💡 Key Insight: </strong>
                        <span className="text-white/50">
                            <code className="text-white/80 text-xs bg-white/5 px-1.5 py-0.5 rounded">stagger: 0.12</code> is shorthand for a linear delay offset.
                            Use the object form <code className="text-white/80 text-xs bg-white/5 px-1.5 py-0.5 rounded">{'{ amount, from, ease }'}</code> to radiate
                            from <strong className="text-white/80">center</strong>, edges, or any specific index.
                        </span>
                    </div>

                    <button
                        onClick={runAnimation}
                        className="group px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex-shrink-0 self-stretch flex items-center justify-center gap-2"
                        style={{
                            background: 'rgba(16,185,129,0.12)',
                            color: '#34d399',
                            border: '1px solid rgba(16,185,129,0.25)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.25)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(16,185,129,0.25)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.12)';
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                    >
                        <span className="text-base">↺</span>
                        Replay Stagger
                    </button>
                </div>
            </div>
        </section>
    );
}

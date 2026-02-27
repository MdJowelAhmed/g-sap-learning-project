'use client';

/**
 * ===================================================
 * FromToDemo — gsap.fromTo() Showcase (Redesigned)
 * ===================================================
 *
 * CONCEPT:
 * gsap.fromTo() gives you TOTAL control — you define both
 * the starting AND ending values, making animations 100% predictable.
 *
 * Syntax:
 *   gsap.fromTo(target, { /* FROM *\/ }, { /* TO *\/ })
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CARDS = [
    {
        id: 'fromto-orb-1',
        label: 'Morph',
        icon: '◈',
        from: 'Scale 0 · Left',
        to: 'Scale 1 · Circle',
        gradient: 'linear-gradient(135deg, #a855f7 0%, #6d28d9 50%, #4c1d95 100%)',
        glow: 'rgba(168,85,247,0.6)',
        glowSoft: 'rgba(168,85,247,0.15)',
        border: 'rgba(168,85,247,0.4)',
        ease: 'back.out(1.7)',
        desc: 'borderRadius morphs from square → circle',
    },
    {
        id: 'fromto-orb-2',
        label: 'Fall',
        icon: '◉',
        from: 'Top · Rotated',
        to: 'Down · Bounce',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
        glow: 'rgba(245,158,11,0.6)',
        glowSoft: 'rgba(245,158,11,0.15)',
        border: 'rgba(245,158,11,0.4)',
        ease: 'bounce.out',
        desc: 'Simulates gravity — falls & bounces on land',
    },
    {
        id: 'fromto-orb-3',
        label: 'Skew Loop',
        icon: '◇',
        from: 'Left · Tilted',
        to: 'Right · Straight',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #9d174d 100%)',
        glow: 'rgba(236,72,153,0.6)',
        glowSoft: 'rgba(236,72,153,0.15)',
        border: 'rgba(236,72,153,0.4)',
        ease: 'sine.inOut',
        desc: 'Loops yoyo — always snaps to defined FROM',
    },
];

export default function FromToDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ctx = useRef<gsap.Context | null>(null);

    const runAnimation = () => {
        if (ctx.current) ctx.current.revert();

        ctx.current = gsap.context(() => {
            // Card 1 — scale + borderRadius morph
            gsap.fromTo(
                '.fromto-orb-1',
                { x: -140, scale: 0.2, opacity: 0, borderRadius: '6px', rotate: -45 },
                { x: 0, scale: 1, opacity: 1, borderRadius: '50%', rotate: 0, duration: 1.3, ease: 'back.out(1.7)' }
            );

            // Card 2 — fall with bounce
            gsap.fromTo(
                '.fromto-orb-2',
                { y: -100, rotation: -90, opacity: 0, scale: 0.4 },
                { y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'bounce.out', delay: 0.25 }
            );

            // Card 3 — skew loop
            gsap.fromTo(
                '.fromto-orb-3',
                { x: -110, skewX: 35, opacity: 0.1, scale: 0.6 },
                { x: 110, skewX: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.5 }
            );

            // Animate the connector lines
            gsap.fromTo(
                '.fromto-line',
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15, delay: 0.2 }
            );

            // Badge pulse on each card
            gsap.fromTo(
                '.fromto-badge',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.15, delay: 0.4 }
            );
        }, containerRef);
    };

    useGSAP(() => { runAnimation(); }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full max-w-4xl mt-8 rounded-3xl overflow-hidden"
            style={{
                background: 'linear-gradient(145deg, rgba(168,85,247,0.04) 0%, rgba(10,10,10,0) 60%)',
                border: '1px solid rgba(168,85,247,0.12)',
            }}
        >
            {/* Ambient glow top-left */}
            <div
                className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            <div className="relative z-10 p-8 md:p-12">
                {/* ── Header ── */}
                <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <span
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-4"
                            style={{
                                background: 'rgba(168,85,247,0.12)',
                                color: '#a855f7',
                                border: '1px solid rgba(168,85,247,0.25)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                            Example 2
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            gsap<span style={{ color: '#a855f7' }}>.fromTo()</span>
                        </h2>
                        <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                            You define <em className="text-white/70 not-italic font-semibold">both</em> endpoints.
                            GSAP ignores CSS — every replay is predictable.
                        </p>
                    </div>

                    {/* Syntax chip */}
                    <div
                        className="rounded-2xl px-5 py-4 font-mono text-xs leading-6 self-start"
                        style={{
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid rgba(168,85,247,0.2)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        <span style={{ color: '#a855f7' }}>gsap</span>
                        <span className="text-white/30">.fromTo(</span>
                        <br />
                        <span className="ml-4 text-yellow-300/80">target</span>
                        <span className="text-white/20">,</span>
                        <br />
                        <span className="ml-4 text-blue-300/80">{'{ from }'}</span>
                        <span className="text-white/20">,</span>
                        <br />
                        <span className="ml-4 text-emerald-300/80">{'{ to }'}</span>
                        <br />
                        <span className="text-white/30">)</span>
                    </div>
                </div>

                {/* ── Animation Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    {CARDS.map((card, i) => (
                        <div
                            key={card.id}
                            className="relative rounded-2xl p-6 flex flex-col items-center gap-5 overflow-hidden"
                            style={{
                                background: 'rgba(0,0,0,0.35)',
                                border: `1px solid ${card.border.replace('0.4', '0.15')}`,
                                backdropFilter: 'blur(16px)',
                            }}
                        >
                            {/* Corner glow */}
                            <div
                                className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle, ${card.glowSoft} 0%, transparent 70%)`,
                                    filter: 'blur(20px)',
                                    transform: 'translate(30%, -30%)',
                                }}
                            />

                            {/* From → To labels */}
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 font-mono fromto-badge">
                                <span className="px-2 py-0.5 rounded bg-white/5">{card.from}</span>
                                <span className="text-white/20">→</span>
                                <span className="px-2 py-0.5 rounded" style={{ background: card.glowSoft, color: card.border.replace('0.4', '0.9') }}>
                                    {card.to}
                                </span>
                            </div>

                            {/* The animated orb */}
                            <div className="relative flex items-center justify-center h-20">
                                {/* Track line */}
                                {card.id !== 'fromto-orb-2' && (
                                    <div
                                        className="fromto-line absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 h-px my-auto"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${card.border.replace('0.4', '0.3')}, transparent)`,
                                            transformOrigin: 'left center',
                                        }}
                                    />
                                )}
                                <div
                                    className={`${card.id} w-16 h-16 flex items-center justify-center text-xl font-black text-white relative z-10`}
                                    style={{
                                        background: card.gradient,
                                        boxShadow: `0 0 32px ${card.glow.replace('0.6', '0.35')}, 0 0 80px ${card.glow.replace('0.6', '0.1')}`,
                                        borderRadius: '16px',
                                    }}
                                >
                                    {card.icon}
                                </div>
                            </div>

                            {/* Label */}
                            <div className="text-center">
                                <p
                                    className="text-xs font-bold uppercase tracking-widest mb-1"
                                    style={{ color: card.border.replace('0.4', '0.9') }}
                                >
                                    {card.label}
                                </p>
                                <p className="text-[11px] text-white/30 leading-relaxed">{card.desc}</p>
                                <p className="text-[10px] font-mono mt-1" style={{ color: card.border.replace('0.4', '0.5') }}>
                                    ease: {card.ease}
                                </p>
                            </div>

                            {/* Card number */}
                            <div
                                className="absolute bottom-3 right-4 text-[10px] font-mono opacity-20 text-white"
                            >
                                0{i + 1}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Insight + Replay Row ── */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                    <div
                        className="flex-1 rounded-2xl px-5 py-4 text-sm leading-relaxed"
                        style={{
                            background: 'rgba(168,85,247,0.06)',
                            border: '1px solid rgba(168,85,247,0.12)',
                        }}
                    >
                        <strong style={{ color: '#a855f7' }}>💡 Key Insight: </strong>
                        <span className="text-white/50">
                            <code className="text-white/80 text-xs bg-white/5 px-1.5 py-0.5 rounded">gsap.from()</code> re-reads the element&apos;s position on replay — it can drift.{' '}
                            <code className="text-white/80 text-xs bg-white/5 px-1.5 py-0.5 rounded">fromTo()</code> always snaps to your defined FROM state, making loops{' '}
                            <strong className="text-white/80">100% predictable</strong>.
                        </span>
                    </div>

                    <button
                        onClick={runAnimation}
                        className="group relative px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 overflow-hidden flex-shrink-0 self-stretch flex items-center justify-center gap-2"
                        style={{
                            background: 'rgba(168,85,247,0.15)',
                            color: '#c084fc',
                            border: '1px solid rgba(168,85,247,0.3)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,0.28)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(168,85,247,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,0.15)';
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                    >
                        <span className="text-base">↺</span>
                        Replay fromTo()
                    </button>
                </div>
            </div>
        </section>
    );
}

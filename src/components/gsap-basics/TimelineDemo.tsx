'use client';

/**
 * ===================================================
 * TimelineDemo — gsap.timeline() Showcase (Redesigned)
 * ===================================================
 *
 * CONCEPT:
 * A GSAP Timeline chains tweens into one controlled sequence.
 * No manual delay math — use the position parameter to queue,
 * overlap, or offset animations with surgical precision.
 *
 * Position param cheat-sheet:
 *   tl.to(el, {...})          → starts AFTER previous tween ends
 *   tl.to(el, {...}, "<")     → starts at SAME TIME as previous
 *   tl.to(el, {...}, "+=0.5") → starts 0.5s AFTER previous ends
 *   tl.to(el, {...}, "-=0.3") → overlaps — 0.3s before previous ends
 *   tl.to(el, {...}, 2)       → starts at exactly 2-second mark
 */

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const STEPS = [
    {
        label: 'Expands',
        desc: 'scale 0 → 1',
        color: '#f97316',
        glow: 'rgba(249,115,22,0.5)',
        glowSoft: 'rgba(249,115,22,0.1)',
        pos: 'default',
        icon: '⬛',
    },
    {
        label: 'Slides Right',
        desc: 'x → 120px',
        color: '#eab308',
        glow: 'rgba(234,179,8,0.5)',
        glowSoft: 'rgba(234,179,8,0.1)',
        pos: 'default',
        icon: '→',
    },
    {
        label: 'Spins + Color',
        desc: 'rotation 360° simultaneously',
        color: '#a855f7',
        glow: 'rgba(168,85,247,0.5)',
        glowSoft: 'rgba(168,85,247,0.1)',
        pos: '"<"',
        icon: '↻',
    },
    {
        label: 'Centers',
        desc: 'x → 0, color red',
        color: '#ef4444',
        glow: 'rgba(239,68,68,0.5)',
        glowSoft: 'rgba(239,68,68,0.1)',
        pos: '"-=0.2"',
        icon: '◎',
    },
    {
        label: 'Fades Out',
        desc: 'scale → 0.1, opacity 0',
        color: '#64748b',
        glow: 'rgba(100,116,139,0.5)',
        glowSoft: 'rgba(100,116,139,0.1)',
        pos: '"+=0.1"',
        icon: '○',
    },
];

const POS_TOKENS = [
    { token: 'default', color: '#10b981', label: 'after previous ends' },
    { token: '"<"', color: '#3b82f6', label: 'same time as previous' },
    { token: '"+=0.5"', color: '#8b5cf6', label: 'after + gap' },
    { token: '"-=0.3"', color: '#f59e0b', label: 'before ends — overlap' },
];

export default function TimelineDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);
    const [progress, setProgress] = useState(0);

    const buildTimeline = () => {
        if (tlRef.current) tlRef.current.kill();
        setActiveStep(-1);
        setProgress(0);
        setIsPlaying(true);

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onUpdate: function () {
                setProgress(Math.round(tl.progress() * 100));
            },
            onComplete: () => {
                setIsPlaying(false);
                setActiveStep(-1);
            },
        });

        tlRef.current = tl;

        // Step 1 — expands
        tl.fromTo(
            '.tl-hero-box',
            { scale: 0, opacity: 0, x: 0, rotation: 0, backgroundColor: '#f97316' },
            { scale: 1, opacity: 1, duration: 0.65, ease: 'back.out(2)', onStart: () => setActiveStep(0) }
        );

        // Step 2 — slides right
        tl.to('.tl-hero-box', {
            x: 120,
            duration: 0.7,
            ease: 'expo.out',
            onStart: () => setActiveStep(1),
        });

        // Step 3 — spin (and simultaneously color change via '<')
        tl.to('.tl-hero-box', {
            rotation: 360,
            duration: 0.9,
            ease: 'linear',
            onStart: () => setActiveStep(2),
        });
        tl.to('.tl-hero-box', { backgroundColor: '#a855f7', duration: 0.9, ease: 'none' }, '<');

        // Step 4 — center + red (overlap previous)
        tl.to(
            '.tl-hero-box',
            { backgroundColor: '#ef4444', x: 0, rotation: 360, duration: 0.7, onStart: () => setActiveStep(3) },
            '-=0.2'
        );

        // Step 5 — fade out (small gap)
        tl.to(
            '.tl-hero-box',
            { scale: 0.1, opacity: 0, duration: 0.8, ease: 'power3.in', onStart: () => setActiveStep(4) },
            '+=0.1'
        );
    };

    useGSAP(() => { buildTimeline(); }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full max-w-4xl mt-8 rounded-3xl overflow-hidden"
            style={{
                background: 'linear-gradient(145deg, rgba(249,115,22,0.04) 0%, rgba(10,10,10,0) 60%)',
                border: '1px solid rgba(249,115,22,0.12)',
            }}
        >
            {/* Ambient top-right glow */}
            <div
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(249,115,22,0.09) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            <div className="relative z-10 p-8 md:p-12">

                {/* ── Header ── */}
                <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <span
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-4"
                            style={{
                                background: 'rgba(249,115,22,0.1)',
                                color: '#fb923c',
                                border: '1px solid rgba(249,115,22,0.2)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                            Example 4
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            gsap<span style={{ color: '#fb923c' }}>.timeline()</span>
                        </h2>
                        <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                            Chain tweens into a masterful sequence. Use the{' '}
                            <span className="text-white/70 font-semibold">position parameter</span> to
                            overlap, queue, or offset with zero delay math.
                        </p>
                    </div>

                    {/* Position param mini-reference */}
                    <div
                        className="self-start rounded-2xl px-5 py-4 font-mono text-xs leading-6"
                        style={{
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid rgba(249,115,22,0.18)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        {POS_TOKENS.map((t) => (
                            <div key={t.token} className="flex items-center gap-2">
                                <span style={{ color: t.color }} className="w-16 text-right">{t.token}</span>
                                <span className="text-white/15">→</span>
                                <span className="text-white/30 text-[10px]">{t.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Main Split Layout ── */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start mb-8">

                    {/* Step tracker */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-2 font-mono">Sequence</p>
                        {STEPS.map((step, i) => {
                            const isActive = i === activeStep;
                            return (
                                <div
                                    key={i}
                                    className="relative flex items-center gap-3 px-4 py-3 rounded-xl overflow-hidden transition-all duration-300"
                                    style={{
                                        background: isActive
                                            ? `rgba(${step.color === '#f97316' ? '249,115,22' : step.color === '#eab308' ? '234,179,8' : step.color === '#a855f7' ? '168,85,247' : step.color === '#ef4444' ? '239,68,68' : '100,116,139'},0.15)`
                                            : 'rgba(255,255,255,0.025)',
                                        border: `1px solid ${isActive ? step.color + '50' : 'rgba(255,255,255,0.05)'}`,
                                        transform: isActive ? 'translateX(6px)' : 'none',
                                        boxShadow: isActive ? `0 0 20px ${step.glow.replace('0.5', '0.2')}` : 'none',
                                    }}
                                >
                                    {/* Active glow fill */}
                                    {isActive && (
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: `linear-gradient(90deg, ${step.glowSoft} 0%, transparent 100%)`,
                                            }}
                                        />
                                    )}

                                    {/* Icon */}
                                    <div
                                        className="relative z-10 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
                                        style={{
                                            background: isActive ? step.color : 'rgba(255,255,255,0.05)',
                                            color: isActive ? '#fff' : 'rgba(255,255,255,0.25)',
                                            boxShadow: isActive ? `0 0 12px ${step.glow}` : 'none',
                                        }}
                                    >
                                        {step.icon}
                                    </div>

                                    {/* Text */}
                                    <div className="relative z-10 flex-1 min-w-0">
                                        <p
                                            className="text-xs font-semibold transition-colors duration-300 truncate"
                                            style={{ color: isActive ? step.color : 'rgba(255,255,255,0.4)' }}
                                        >
                                            {i + 1}. {step.label}
                                        </p>
                                        <p className="text-[10px] text-white/20 font-mono">{step.desc}</p>
                                    </div>

                                    {/* Position badge */}
                                    {step.pos !== 'default' && (
                                        <span
                                            className="relative z-10 text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                                            style={{
                                                background: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.03)',
                                                color: isActive ? step.color : 'rgba(255,255,255,0.15)',
                                                border: `1px solid ${isActive ? step.color + '40' : 'transparent'}`,
                                            }}
                                        >
                                            {step.pos}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Live Preview + Controls */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-mono">Live Preview</p>

                        {/* Stage */}
                        <div
                            className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                            style={{
                                background: 'rgba(0,0,0,0.45)',
                                border: '1px solid rgba(255,255,255,0.04)',
                                height: '220px',
                            }}
                        >
                            {/* Grid bg */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                                    backgroundSize: '28px 28px',
                                }}
                            />

                            {/* Center crosshair */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-px h-full bg-white/3" />
                                <div className="h-px w-full bg-white/3 absolute" />
                            </div>

                            {/* The animated box */}
                            <div
                                className="tl-hero-box relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xs shadow-2xl"
                                style={{
                                    background: '#f97316',
                                    boxShadow:
                                        activeStep >= 0
                                            ? `0 0 40px ${STEPS[activeStep]?.glow ?? 'rgba(249,115,22,0.5)'}`
                                            : '0 0 30px rgba(249,115,22,0.4)',
                                    opacity: 0,
                                }}
                            >
                                TL
                            </div>

                            {/* Active step overlay badge */}
                            {activeStep >= 0 && (
                                <div
                                    className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all duration-300"
                                    style={{
                                        background: `${STEPS[activeStep]?.color}18`,
                                        color: STEPS[activeStep]?.color,
                                        border: `1px solid ${STEPS[activeStep]?.color}30`,
                                    }}
                                >
                                    Step {activeStep + 1} / {STEPS.length}
                                </div>
                            )}
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-100"
                                style={{
                                    width: `${progress}%`,
                                    background:
                                        activeStep >= 0
                                            ? `linear-gradient(90deg, ${STEPS[Math.max(0, activeStep - 1)]?.color ?? '#f97316'}, ${STEPS[activeStep]?.color ?? '#fb923c'})`
                                            : 'rgba(249,115,22,0.4)',
                                }}
                            />
                        </div>

                        {/* Controls */}
                        <div className="flex gap-3">
                            <button
                                onClick={buildTimeline}
                                disabled={isPlaying}
                                className="flex-1 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2"
                                style={{
                                    background: isPlaying ? 'rgba(249,115,22,0.08)' : 'rgba(249,115,22,0.15)',
                                    color: '#fb923c',
                                    border: '1px solid rgba(249,115,22,0.25)',
                                }}
                                onMouseEnter={(e) => !isPlaying && ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(249,115,22,0.3)')}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
                            >
                                {isPlaying ? (
                                    <>
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                        Playing…
                                    </>
                                ) : (
                                    <>▶ Play Timeline</>
                                )}
                            </button>

                            <button
                                onClick={() => { tlRef.current?.reverse(); setIsPlaying(false); }}
                                className="px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-1.5"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    color: 'rgba(255,255,255,0.4)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)')}
                            >
                                ◀ Reverse
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Insight ── */}
                <div
                    className="rounded-2xl px-5 py-4 text-sm leading-relaxed"
                    style={{
                        background: 'rgba(249,115,22,0.05)',
                        border: '1px solid rgba(249,115,22,0.12)',
                    }}
                >
                    <strong style={{ color: '#fb923c' }}>💡 Key Insight: </strong>
                    <span className="text-white/50">
                        Step ③ (rotation) and the color change run{' '}
                        <strong className="text-white/80">simultaneously</strong> using{' '}
                        <code className="text-white/80 text-xs bg-white/5 px-1.5 py-0.5 rounded">&quot;&lt;&quot;</code>.
                        This is the <strong className="text-white/80">position parameter</strong> — chain, overlap,
                        or gap any tween in your sequence without ever touching delay numbers.
                    </span>
                </div>
            </div>
        </section>
    );
}

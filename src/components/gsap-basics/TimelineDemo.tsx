'use client';

/**
 * ===================================================
 * TimelineDemo — gsap.timeline() Showcase
 * ===================================================
 *
 * CONCEPT:
 * A GSAP Timeline chains multiple tweens together into one controlled sequence.
 * Each animation plays AFTER the previous one ends by default — no manual delay
 * math needed. You can also overlap, offset, and label animations precisely.
 *
 * WHY Timeline instead of multiple gsap.to() calls?
 *   Without timeline: you manually calculate delays (0.5, 1.0, 1.5...) — fragile.
 *   With timeline:    each tween is automatically queued after the last — clean.
 *
 * Time Position Parameter (the 3rd argument in .to / .from):
 *   tl.to(el, {...})          → same as "<"  — starts AFTER previous tween ends
 *   tl.to(el, {...}, "<")     → starts at the SAME TIME as the previous tween
 *   tl.to(el, {...}, "+=0.5") → starts 0.5s AFTER the previous tween ends
 *   tl.to(el, {...}, "-=0.3") → starts 0.3s BEFORE the previous tween ends (overlap)
 *   tl.to(el, {...}, 2)       → starts exactly at the 2-second mark
 *
 * Timeline controls (available after creation):
 *   tl.play()    tl.pause()    tl.reverse()    tl.restart()    tl.seek(time)
 */

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const STEPS = [
    { label: '① Box expands', color: '#f97316' },
    { label: '② Moves right', color: '#eab308' },
    { label: '③ Rotates 360°', color: '#a855f7' },
    { label: '④ Changes color', color: '#ef4444' },
    { label: '⑤ Fades & shrinks', color: '#64748b' },
];

export default function TimelineDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);

    const buildTimeline = () => {
        // Kill old timeline completely
        if (tlRef.current) tlRef.current.kill();
        setActiveStep(-1);
        setIsPlaying(true);

        const tl = gsap.timeline({
            // Timeline-level defaults: apply to every tween inside this timeline
            defaults: { ease: 'power2.inOut' },
            // onComplete fires when the ENTIRE sequence finishes
            onComplete: () => setIsPlaying(false),
        });

        tlRef.current = tl;

        /**
         * Step 1 — Box expands from a dot to full size
         * Position: default (starts after previous, but this is the first tween)
         */
        tl.fromTo(
            '.tl-box',
            { scale: 0, opacity: 0, x: 0, rotation: 0, backgroundColor: '#f97316' },
            {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: 'back.out(2)',
                onStart: () => setActiveStep(0),
            }
        );

        /**
         * Step 2 — Slides to the right
         * Position: default — starts AFTER step 1 ends
         */
        tl.to('.tl-box', {
            x: 100,
            duration: 0.7,
            ease: 'expo.out',
            onStart: () => setActiveStep(1),
        });

        /**
         * Step 3 — Spins 360° while the color changes SIMULTANEOUSLY
         * '<' means "start at the same time as the PREVIOUS tween"
         * This creates overlapping animation — spin + color together.
         */
        tl.to('.tl-box', {
            rotation: 360,
            duration: 0.9,
            ease: 'linear',
            onStart: () => setActiveStep(2),
        });

        tl.to(
            '.tl-box',
            {
                backgroundColor: '#a855f7', // color changes during the spin
                duration: 0.9,
                ease: 'none',
            },
            '<'  // ← '<' = starts at the SAME TIME as the spin above
        );

        /**
         * Step 4 — Jumps to red, moves back to center
         * '-=0.2' = starts 0.2s BEFORE the previous tween ends (slight overlap)
         */
        tl.to(
            '.tl-box',
            {
                backgroundColor: '#ef4444',
                x: 0,
                rotation: 360,
                duration: 0.7,
                onStart: () => setActiveStep(3),
            },
            '-=0.2'  // overlaps last 0.2s of previous step
        );

        /**
         * Step 5 — Fades out and shrinks
         * '+=0.1' = add a 0.1s pause AFTER the previous tween ends
         */
        tl.to(
            '.tl-box',
            {
                scale: 0.2,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.in',
                onStart: () => setActiveStep(4),
            },
            '+=0.1'  // short pause before final fade
        );
    };

    useGSAP(
        () => { buildTimeline(); },
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
                    style={{ background: 'rgba(251,146,60,0.15)', color: '#fb923c' }}
                >
                    Example 4
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    gsap<span style={{ color: '#fb923c' }}>.timeline()</span>
                </h2>
                <p className="text-white/50 text-sm max-w-xl leading-relaxed">
                    Chain multiple tweens into one controlled sequence. No manual delay math —
                    just queue, overlap, or offset with the{' '}
                    <span className="text-white/80">position parameter</span>.
                </p>
            </div>

            {/* Position Parameter Reference */}
            <div
                className="rounded-xl px-5 py-4 mb-8 font-mono text-xs leading-6 text-white/50"
                style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.15)' }}
            >
                <div><span style={{ color: '#fb923c' }}>tl</span><span className="text-white/30">.to(el, {'{}'})</span><span className="text-white/20 ml-4">// default — starts AFTER previous ends</span></div>
                <div><span style={{ color: '#fb923c' }}>tl</span><span className="text-white/30">.to(el, {'{}'}, </span><span className="text-blue-300">&quot;&lt;&quot;</span><span className="text-white/30">)</span><span className="text-white/20 ml-4">// starts at SAME TIME as previous</span></div>
                <div><span style={{ color: '#fb923c' }}>tl</span><span className="text-white/30">.to(el, {'{}'}, </span><span className="text-green-300">&quot;+=0.5&quot;</span><span className="text-white/30">)</span><span className="text-white/20 ml-4">// starts 0.5s AFTER previous ends</span></div>
                <div><span style={{ color: '#fb923c' }}>tl</span><span className="text-white/30">.to(el, {'{}'}, </span><span className="text-yellow-300">&quot;-=0.3&quot;</span><span className="text-white/30">)</span><span className="text-white/20 ml-4">// overlaps — 0.3s before previous ends</span></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                {/* Step tracker */}
                <div className="md:col-span-2 flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-widest text-white/25 mb-2">Sequence Steps</p>
                    {STEPS.map((step, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-300"
                            style={{
                                background:
                                    i === activeStep
                                        ? `rgba(${i === 0 ? '249,115,22' : i === 1 ? '234,179,8' : i === 2 ? '168,85,247' : i === 3 ? '239,68,68' : '100,116,139'},0.2)`
                                        : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${i === activeStep ? step.color + '60' : 'rgba(255,255,255,0.05)'}`,
                                transform: i === activeStep ? 'translateX(4px)' : 'none',
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                                style={{
                                    background: i === activeStep ? step.color : 'rgba(255,255,255,0.1)',
                                    boxShadow: i === activeStep ? `0 0 8px ${step.color}` : 'none',
                                }}
                            />
                            <span
                                className="text-xs font-medium"
                                style={{ color: i === activeStep ? step.color : 'rgba(255,255,255,0.35)' }}
                            >
                                {step.label}
                            </span>
                            {i === 2 && (
                                <span className="ml-auto text-[10px] text-white/20 font-mono">&lt;</span>
                            )}
                            {i === 3 && (
                                <span className="ml-auto text-[10px] text-white/20 font-mono">-=0.2</span>
                            )}
                            {i === 4 && (
                                <span className="ml-auto text-[10px] text-white/20 font-mono">+=0.1</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Animation Stage */}
                <div className="md:col-span-3">
                    <p className="text-xs uppercase tracking-widest text-white/25 mb-2">Live Preview</p>
                    <div
                        className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                        style={{
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.04)',
                            height: '200px',
                        }}
                    >
                        {/* Grid bg */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                                backgroundSize: '30px 30px',
                            }}
                        />
                        {/**
                         * .tl-box — targeted by all timeline tweens above.
                         * Its initial CSS state is irrelevant because the first tween
                         * uses fromTo() to fully define both its start and end values.
                         */}
                        <div
                            className="tl-box relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white text-sm shadow-lg"
                            style={{
                                background: '#f97316',
                                boxShadow: '0 0 30px rgba(249,115,22,0.4)',
                                opacity: 0,
                            }}
                        >
                            TL
                        </div>
                    </div>

                    {/* Timeline playback controls */}
                    <div className="mt-4 flex gap-3 flex-wrap">
                        <button
                            onClick={buildTimeline}
                            disabled={isPlaying}
                            className="flex-1 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-40"
                            style={{
                                background: 'rgba(251,146,60,0.2)',
                                color: '#fb923c',
                                border: '1px solid rgba(251,146,60,0.3)',
                            }}
                            onMouseEnter={(e) => !isPlaying && ((e.currentTarget as HTMLElement).style.background = 'rgba(251,146,60,0.35)')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(251,146,60,0.2)')}
                        >
                            {isPlaying ? '⏳ Playing...' : '▶ Play Timeline'}
                        </button>
                        <button
                            onClick={() => { tlRef.current?.reverse(); setIsPlaying(false); }}
                            className="px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                color: 'rgba(255,255,255,0.5)',
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)')}
                        >
                            ◀ Reverse
                        </button>
                    </div>
                </div>
            </div>

            {/* Key insight */}
            <div
                className="mt-8 rounded-xl px-5 py-4 text-sm leading-relaxed"
                style={{ background: 'rgba(251,146,60,0.05)', border: '1px solid rgba(251,146,60,0.12)' }}
            >
                <strong style={{ color: '#fb923c' }}>💡 Key Insight: </strong>
                <span className="text-white/60">
                    Notice how Step ③ (rotation) and its color change run <strong className="text-white">simultaneously</strong> using{' '}
                    <code className="text-white/90 text-xs">&quot;&lt;&quot;</code>. This is the{' '}
                    <strong className="text-white">position parameter</strong> — the most powerful feature of GSAP timelines.
                    It lets you create complex choreography without ever manually calculating delay times.
                </span>
            </div>
        </section>
    );
}

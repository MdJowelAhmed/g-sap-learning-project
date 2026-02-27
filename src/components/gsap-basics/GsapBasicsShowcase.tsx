'use client';

/**
 * ===================================================
 * GsapBasicsShowcase — Main Page Component (Redesigned)
 * ===================================================
 *
 * Example 1 — gsap.to() vs gsap.from()
 * Rendered inline here. Examples 2-4 are separate components.
 */

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FromToDemo from './FromToDemo';
import StaggerDemo from './StaggerDemo';
import TimelineDemo from './TimelineDemo';

const TABLE_ROWS = [
    ['x', '−200  (starts left)', '300  (ends right)'],
    ['y', '100  (starts below)', '—'],
    ['scale', '0 → 1  (grows in)', '1 → 1.2  (grows out)'],
    ['opacity', '0 → 1', '1 → 0.5'],
    ['rotation', '—', '0 → 180°'],
    ['duration', '1.5 s', '2 s'],
    ['ease', 'elastic.out(1, 0.5)', 'power2.inOut'],
    ['repeat', '—', '−1 (∞)'],
    ['yoyo', '—', 'true'],
    ['delay', '0.5 s', '—'],
];

export default function GsapBasicsShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ctx = useRef<gsap.Context | null>(null);

    /* ── Core animation runner ── */
    const runAnimations = () => {
        if (ctx.current) ctx.current.revert();

        ctx.current = gsap.context(() => {

            // ── FROM box: springs in from off-screen ──
            gsap.from('.gsap-from-box', {
                x: -220,
                y: 80,
                scale: 0,
                opacity: 0,
                duration: 1.4,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.5,
            });

            // ── TO box: infinite yoyo loop ──
            gsap.to('.gsap-to-box', {
                x: 260,
                rotation: 180,
                backgroundColor: '#ef4444',
                scale: 1.15,
                opacity: 0.55,
                duration: 2,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
            });

            // ── Hero headline stagger entrance ──
            gsap.from('.hero-word', {
                y: 60,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.08,
                delay: 0.1,
            });

            // ── Explanation cards slide in ──
            gsap.from('.card-from, .card-to', {
                y: 30,
                opacity: 0,
                duration: 0.55,
                ease: 'power2.out',
                stagger: 0.15,
                delay: 0.3,
            });

            // ── Arena border glow pulse ──
            gsap.to('.arena-border-glow', {
                opacity: 0.6,
                duration: 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });

            // ── Table rows stagger ──
            gsap.from('.ref-row', {
                x: -20,
                opacity: 0,
                duration: 0.35,
                ease: 'power2.out',
                stagger: 0.045,
                delay: 0.5,
            });

        }, containerRef);
    };

    useGSAP(
        () => { runAnimations(); },
        { scope: containerRef }
    );

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden"
            style={{ background: '#080810' }}
        >
            {/* ══ Global background decoration ══ */}
            {/* large blue orb — top left */}
            <div
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            {/* lime orb — bottom right */}
            <div
                className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(201,243,29,0.07) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            {/* subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            {/* ══════════════════════════
                EXAMPLE 1 — wrapper
            ══════════════════════════ */}
            <div
                ref={containerRef}
                className="relative z-10 w-full flex flex-col items-center px-6 pt-20 pb-16 mt-6"
            >
                {/* ── Section pill ── */}
                <span
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold px-5 py-2 rounded-full mb-2"
                    style={{
                        background: 'rgba(201,243,29,0.08)',
                        color: '#c9f31d',
                        border: '1px solid rgba(201,243,29,0.2)',
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                    GSAP Fundamentals — Example 1
                </span>

                {/* ── Hero headline ── */}
                <div className="text-center mb-4 overflow-hidden">
                    <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight flex flex-wrap justify-center gap-x-4">
                        {['gsap', 'to()', 'vs', 'from()'].map((w, i) => (
                            <span
                                key={i}
                                className="hero-word inline-block"
                                style={{
                                    color:
                                        w === 'to()' ? '#c9f31d'
                                            : w === 'from()' ? '#60a5fa'
                                                : 'rgba(255,255,255,0.85)',
                                }}
                            >
                                {w}
                            </span>
                        ))}
                    </h1>
                </div>
                <p className="text-white/35 text-base md:text-lg leading-relaxed mb-6 max-w-2xl text-center">
                    Two core GSAP methods — same destination, opposite direction of travel.
                </p>

                {/* ── Explanation cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mb-10">
                    {/* from() card */}
                    <div
                        className="card-from rounded-2xl p-6 relative overflow-hidden"
                        style={{
                            background: 'rgba(96,165,250,0.04)',
                            border: '1px solid rgba(96,165,250,0.18)',
                        }}
                    >
                        <div
                            className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)', filter: 'blur(20px)' }}
                        />
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(96,165,250,0.12)', color: '#60a5fa' }}>
                            gsap.from()
                        </span>
                        <p className="text-white/55 text-sm leading-relaxed">
                            You define the <strong className="text-white/90">starting state</strong>. GSAP animates the element{' '}
                            <em>from</em> those values back to its natural CSS position.
                            The element was always &quot;there&quot; — it just <em>flies in</em>.
                        </p>
                        {/* <div className="mt-4 font-mono text-xs text-blue-300/60">
                            gsap.from(<span className="text-yellow-300/70">target</span>, {'{ x: -200, opacity: 0 }'})
                        </div> */}
                    </div>

                    {/* to() card */}
                    <div
                        className="card-to rounded-2xl p-6 relative overflow-hidden"
                        style={{
                            background: 'rgba(201,243,29,0.04)',
                            border: '1px solid rgba(201,243,29,0.18)',
                        }}
                    >
                        <div
                            className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(201,243,29,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }}
                        />
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(201,243,29,0.1)', color: '#c9f31d' }}>
                            gsap.to()
                        </span>
                        <p className="text-white/55 text-sm leading-relaxed">
                            You define the <strong className="text-white/90">ending state</strong>. GSAP animates the element from its
                            natural CSS position <em>to</em> those values. The element starts where it is and{' '}
                            <em>travels somewhere new</em>.
                        </p>
                        {/* <div className="mt-4 font-mono text-xs text-lime-300/60">
                            gsap.to(<span className="text-yellow-300/70">target</span>, {'{ x: 300, rotation: 180 }'})
                        </div> */}
                    </div>
                </div>

                {/* ── Animation Arena ── */}
                <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden mb-8">
                    {/* Glowing border */}
                    <div
                        className="arena-border-glow absolute inset-0 rounded-3xl pointer-events-none opacity-0"
                        style={{
                            boxShadow: 'inset 0 0 60px rgba(96,165,250,0.06), inset 0 0 60px rgba(201,243,29,0.04)',
                        }}
                    />

                    {/* Arena bg */}
                    <div
                        className="relative"
                        style={{
                            background: 'rgba(255,255,255,0.025)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            minHeight: '300px',
                        }}
                    >
                        {/* Interior grid */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                                backgroundSize: '36px 36px',
                            }}
                        />

                        {/* Arena label */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2">
                            <span className="text-[10px] uppercase tracking-[0.25em] text-white font-mono ">Animation Arena</span>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-12 p-8 md:p-10">

                            {/* ── FROM BOX ── */}
                            <div className="flex flex-col items-center gap-6">
                                <div
                                    className="text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full"
                                    style={{ color: '#60a5fa', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}
                                >
                                    gsap.from()
                                </div>

                                {/* Box + trail effect */}
                                <div className="relative">
                                    {/* Blur trail */}
                                    <div
                                        className="gsap-from-box absolute inset-0 w-24 h-24 rounded-2xl opacity-30 blur-lg"
                                        style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
                                    />
                                    <div
                                        className="gsap-from-box w-24 h-24 rounded-2xl flex items-center justify-center text-sm font-black text-white/90 relative"
                                        style={{
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 60%, #1e3a8a 100%)',
                                            boxShadow: '0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.15)',
                                        }}
                                    >
                                        FROM
                                    </div>
                                </div>

                                <div className="text-center max-w-[160px]">
                                    <p className="text-white/25 text-xs leading-relaxed">
                                        Flies in from{' '}
                                        <span className="text-blue-400/70">left + below</span>,
                                        scaled zero → lands here
                                    </p>
                                    <p className="text-[10px] font-mono text-blue-300/40 mt-1">elastic.out(1, 0.5)</p>
                                </div>
                            </div>

                            {/* ── Divider ── */}
                            <div className="hidden md:flex flex-col items-center gap-2">
                                <div className="w-px flex-1 min-h-[80px]" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255), transparent)' }} />
                                <span className="text-white text-xs font-mono">vs</span>
                                <div className="w-px flex-1 min-h-[80px]" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255), transparent)' }} />
                            </div>

                            {/* ── TO BOX ── */}
                            <div className="flex flex-col items-center gap-6">
                                <div
                                    className="text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full"
                                    style={{ color: '#c9f31d', background: 'rgba(201,243,29,0.08)', border: '1px solid rgba(201,243,29,0.2)' }}
                                >
                                    gsap.to()
                                </div>

                                <div className="relative">
                                    {/* Blur trail */}
                                    <div
                                        className="gsap-to-box absolute inset-0 w-24 h-24 rounded-2xl opacity-30 blur-lg"
                                        style={{ background: 'linear-gradient(135deg, #c9f31d, #84a80a)' }}
                                    />
                                    <div
                                        className="gsap-to-box w-24 h-24 rounded-2xl flex items-center justify-center text-sm font-black text-black/80 relative"
                                        style={{
                                            background: 'linear-gradient(135deg, #c9f31d 0%, #a3c407 60%, #84a80a 100%)',
                                            boxShadow: '0 0 40px rgba(201,243,29,0.4), 0 0 80px rgba(201,243,29,0.12)',
                                        }}
                                    >
                                        TO
                                    </div>
                                </div>

                                <div className="text-center max-w-[160px]">
                                    <p className="text-white/25 text-xs leading-relaxed">
                                        Starts here → travels right,
                                        spins, turns{' '}
                                        <span className="text-red-400/70">red</span>,
                                        yoyos forever
                                    </p>
                                    <p className="text-[10px] font-mono text-lime-300/40 mt-1">power2.inOut · repeat −1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Replay Button ── */}
                <div className="flex flex-col items-center gap-3 mb-20">
                    <button
                        onClick={runAnimations}
                        className="relative group px-12 py-4 rounded-full font-bold text-sm tracking-wide overflow-hidden transition-all duration-300"
                        style={{
                            background: 'linear-gradient(90deg, #c9f31d, #a3c407)',
                            color: '#080810',
                            boxShadow: '0 0 35px rgba(201,243,29,0.35)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 55px rgba(201,243,29,0.55)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 35px rgba(201,243,29,0.35)';
                        }}
                    >
                        {/* Shimmer overlay */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                                backgroundSize: '200% 100%',
                            }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            <span className="text-lg">↺</span>
                            Replay Animations
                        </span>
                    </button>
                    <p className="text-white/20 text-xs tracking-wide">Restarts both animations simultaneously</p>
                </div>

                {/* ── Quick Reference Table ── */}
                <div className="w-full max-w-4xl">
                    {/* Table header label */}
                    <div className="flex items-center gap-4 mb-5">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))' }} />
                        <h2 className="text-xs uppercase tracking-[0.25em] text-white/25 font-mono">Quick Reference</h2>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }} />
                    </div>

                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            border: '1px solid rgba(255,255,255,0.07)',
                            background: 'rgba(255,255,255,0.018)',
                        }}
                    >
                        {/* Table head */}
                        <div
                            className="grid grid-cols-3 px-6 py-3.5 text-xs font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <span className="text-white/30">Property</span>
                            <span style={{ color: '#60a5fa' }}>from() — Blue Box</span>
                            <span style={{ color: '#c9f31d' }}>to() — Yellow Box</span>
                        </div>

                        {/* Table rows */}
                        {TABLE_ROWS.map(([prop, from, to], i) => (
                            <div
                                key={prop}
                                className="ref-row grid grid-cols-3 px-6 py-3 text-sm"
                                style={{
                                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.018)',
                                    borderTop: '1px solid rgba(255,255,255,0.038)',
                                }}
                            >
                                <span className="font-mono text-xs text-white/30">{prop}</span>
                                <span className="text-white/50 text-xs">{from}</span>
                                <span className="text-white/50 text-xs">{to}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════
                Examples 2, 3, 4
            ══════════════════════════ */}
            <div className="relative z-10 w-full flex flex-col items-center px-6 pb-24 gap-0">
                <FromToDemo />
                <StaggerDemo />
                <TimelineDemo />
            </div>
        </div>
    );
}

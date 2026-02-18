'use client';

/**
 * ===================================================
 * Timeline Section — About Us Page (Modern Redesign)
 * ===================================================
 *
 * Company milestones with a vertical timeline line drawn on scroll.
 * All items come from the LEFT side with colorful gradient icons
 * and glassmorphism card design. Each milestone has a unique color.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        year: '2016',
        title: 'Founded',
        description: 'Started as a two-person freelance team in a small co-working space with a vision to transform digital experiences.',
        gradient: 'linear-gradient(135deg, #fb923c, #f97316)',
        glowColor: 'rgba(251, 146, 60, 0.12)',
        accentColor: '#fb923c',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <defs>
                    <linearGradient id="tg1" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fb923c" />
                        <stop offset="1" stopColor="#f97316" />
                    </linearGradient>
                </defs>
                <path d="M14 4L17 11L14 24L11 11L14 4Z" fill="url(#tg1)" opacity="0.3" />
                <path d="M14 4L17 11L14 24L11 11L14 4Z" stroke="url(#tg1)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <circle cx="9" cy="8" r="1.5" fill="url(#tg1)" opacity="0.5" />
                <circle cx="19" cy="8" r="1.5" fill="url(#tg1)" opacity="0.5" />
                <line x1="6" y1="22" x2="10" y2="18" stroke="url(#tg1)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <line x1="22" y1="22" x2="18" y2="18" stroke="url(#tg1)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            </svg>
        ),
    },
    {
        year: '2018',
        title: 'First Major Client',
        description: 'Landed our first enterprise project — a complete brand overhaul for a Fortune 500 company.',
        gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        glowColor: 'rgba(251, 191, 36, 0.12)',
        accentColor: '#fbbf24',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <defs>
                    <linearGradient id="tg2" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fbbf24" />
                        <stop offset="1" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>
                <path d="M7 22H21V18L18 14L14 8L10 14L7 18V22Z" stroke="url(#tg2)" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(251,191,36,0.15)" />
                <rect x="10" y="22" width="8" height="3" rx="1" stroke="url(#tg2)" strokeWidth="1.5" fill="none" />
                <circle cx="14" cy="15" r="2" fill="url(#tg2)" opacity="0.5" />
            </svg>
        ),
    },
    {
        year: '2020',
        title: 'Team Expansion',
        description: 'Grew to 15 people and opened our first dedicated studio space in the heart of the city.',
        gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
        glowColor: 'rgba(99, 102, 241, 0.12)',
        accentColor: '#818cf8',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <defs>
                    <linearGradient id="tg3" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366f1" />
                        <stop offset="1" stopColor="#818cf8" />
                    </linearGradient>
                </defs>
                <circle cx="14" cy="9" r="4" stroke="url(#tg3)" strokeWidth="1.5" fill="rgba(99,102,241,0.2)" />
                <circle cx="6" cy="13" r="3" stroke="url(#tg3)" strokeWidth="1.5" fill="rgba(99,102,241,0.15)" />
                <circle cx="22" cy="13" r="3" stroke="url(#tg3)" strokeWidth="1.5" fill="rgba(99,102,241,0.15)" />
                <path d="M4 24C4 20 6 18 14 18C22 18 24 20 24 24" stroke="url(#tg3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
        ),
    },
    {
        year: '2022',
        title: 'Award Recognition',
        description: 'Won three Awwwards site of the day and a CSS Design Award for creative excellence.',
        gradient: 'linear-gradient(135deg, #c9f31d, #a8e600)',
        glowColor: 'rgba(201, 243, 29, 0.12)',
        accentColor: '#c9f31d',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <defs>
                    <linearGradient id="tg4" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#c9f31d" />
                        <stop offset="1" stopColor="#a8e600" />
                    </linearGradient>
                </defs>
                <polygon points="14,3 17,10 24,11 19,16 20,23 14,20 8,23 9,16 4,11 11,10" stroke="url(#tg4)" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(201,243,29,0.15)" />
            </svg>
        ),
    },
    {
        year: '2024',
        title: 'Global Reach',
        description: 'Now 30+ team members serving clients across 12 countries with a growing international footprint.',
        gradient: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
        glowColor: 'rgba(34, 211, 238, 0.12)',
        accentColor: '#22d3ee',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <defs>
                    <linearGradient id="tg5" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#22d3ee" />
                        <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
                <circle cx="14" cy="14" r="10" stroke="url(#tg5)" strokeWidth="1.5" fill="none" />
                <ellipse cx="14" cy="14" rx="5" ry="10" stroke="url(#tg5)" strokeWidth="1" fill="rgba(34,211,238,0.1)" />
                <line x1="4" y1="10" x2="24" y2="10" stroke="url(#tg5)" strokeWidth="1" opacity="0.4" />
                <line x1="4" y1="18" x2="24" y2="18" stroke="url(#tg5)" strokeWidth="1" opacity="0.4" />
                <line x1="14" y1="4" x2="14" y2="24" stroke="url(#tg5)" strokeWidth="1" opacity="0.3" />
            </svg>
        ),
    },
];

export default function TimelineSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !lineRef.current) return;

            /* Draw the timeline line */
            gsap.to(lineRef.current, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    end: 'bottom 50%',
                    scrub: 1,
                },
            });

            /* All milestones slide in from the LEFT */
            const items = sectionRef.current.querySelectorAll('.timeline-item');
            items.forEach((item) => {
                gsap.from(item, {
                    x: -120,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                });
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-5xl mx-auto">
                {/* Section Header — Left Aligned */}
                <div className="mb-20">
                    <span
                        className="text-xs tracking-widest uppercase font-medium inline-block mb-4"
                        style={{
                            color: '#c9f31d',
                            background: 'rgba(201, 243, 29, 0.08)',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            border: '1px solid rgba(201, 243, 29, 0.15)',
                        }}
                    >
                        Our Journey
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-3">
                        The <span className="gradient-text">Timeline</span>
                    </h2>
                    <p className="mt-4 text-sm max-w-md" style={{ color: '#666' }}>
                        Key moments that shaped who we are today.
                    </p>
                </div>

                {/* Timeline — All items from the LEFT */}
                <div className="relative">
                    {/* Vertical line on the left */}
                    <div
                        className="absolute top-0 bottom-0 w-px"
                        style={{
                            background: '#1a1a1a',
                            left: '28px',
                        }}
                    >
                        <div
                            ref={lineRef}
                            className="w-full"
                            style={{
                                background: 'linear-gradient(180deg, #c9f31d, #22d3ee)',
                                height: '0%',
                            }}
                        />
                    </div>

                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className="timeline-item relative flex items-start"
                                style={{ paddingLeft: '68px' }}
                            >
                                {/* Dot on the line */}
                                <div
                                    className="absolute flex items-center justify-center rounded-full z-10"
                                    style={{
                                        left: '18px',
                                        top: '24px',
                                        width: '22px',
                                        height: '22px',
                                        background: '#0a0a0a',
                                        border: `2px solid ${milestone.accentColor}`,
                                        boxShadow: `0 0 12px ${milestone.accentColor}44`,
                                    }}
                                >
                                    <div
                                        className="rounded-full"
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            background: milestone.accentColor,
                                        }}
                                    />
                                </div>

                                {/* Card */}
                                <div
                                    className="flex-1 rounded-2xl p-6 md:p-8 transition-none"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(22,22,22,0.9), rgba(22,22,22,0.6))',
                                        border: '1px solid #1a1a1a',
                                        backdropFilter: 'blur(10px)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {/* Glow */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '-30%',
                                            right: '-10%',
                                            width: '180px',
                                            height: '180px',
                                            background: milestone.glowColor,
                                            borderRadius: '50%',
                                            filter: 'blur(50px)',
                                            pointerEvents: 'none',
                                        }}
                                    />

                                    <div className="relative" style={{ zIndex: 1 }}>
                                        {/* Top row: icon + year */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div
                                                className="flex items-center justify-center rounded-xl"
                                                style={{
                                                    width: '52px',
                                                    height: '52px',
                                                    background: milestone.glowColor,
                                                    border: `1px solid ${milestone.accentColor}33`,
                                                }}
                                            >
                                                {milestone.icon}
                                            </div>
                                            <div>
                                                <span
                                                    className="text-xs font-bold tracking-widest"
                                                    style={{ color: milestone.accentColor }}
                                                >
                                                    {milestone.year}
                                                </span>
                                                <div
                                                    className="h-px mt-1"
                                                    style={{
                                                        width: '40px',
                                                        background: `linear-gradient(90deg, ${milestone.accentColor}66, transparent)`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#e8e8e8' }}>
                                            {milestone.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed" style={{ color: '#777' }}>
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

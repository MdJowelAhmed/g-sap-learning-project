'use client';

/**
 * ===================================================
 * Feature List — Service Page (Modern Redesign)
 * ===================================================
 *
 * Premium glassmorphism cards with colorful gradient SVG icons.
 * Items slide in from the left side with staggered scroll animations.
 * Each card has a unique color theme with glow effects.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        number: '01',
        title: 'Discovery & Strategy',
        description: 'We deep-dive into your business goals, audience, and competitors to build a strategy that works.',
        gradient: 'linear-gradient(135deg, #c9f31d, #a8e600)',
        glowColor: 'rgba(201, 243, 29, 0.15)',
        iconColor: '#c9f31d',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#c9f31d" />
                        <stop offset="1" stopColor="#a8e600" />
                    </linearGradient>
                </defs>
                <circle cx="14" cy="14" r="9" stroke="url(#grad1)" strokeWidth="2.5" fill="none" />
                <line x1="20.5" y1="20.5" x2="28" y2="28" stroke="url(#grad1)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="14" cy="14" r="3" fill="url(#grad1)" opacity="0.5" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Wireframing & Prototyping',
        description: 'Interactive prototypes that let you experience the flow before a single line of code is written.',
        gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
        glowColor: 'rgba(99, 102, 241, 0.15)',
        iconColor: '#818cf8',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                    <linearGradient id="grad2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366f1" />
                        <stop offset="1" stopColor="#818cf8" />
                    </linearGradient>
                </defs>
                <rect x="3" y="3" width="12" height="12" rx="2" stroke="url(#grad2)" strokeWidth="2" fill="none" />
                <rect x="17" y="3" width="12" height="12" rx="2" stroke="url(#grad2)" strokeWidth="2" fill="rgba(99,102,241,0.2)" />
                <rect x="3" y="17" width="12" height="12" rx="2" stroke="url(#grad2)" strokeWidth="2" fill="rgba(99,102,241,0.2)" />
                <rect x="17" y="17" width="12" height="12" rx="2" stroke="url(#grad2)" strokeWidth="2" fill="none" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Visual Design',
        description: 'Pixel-perfect designs with a focus on typography, spacing, and visual hierarchy that converts.',
        gradient: 'linear-gradient(135deg, #f472b6, #ec4899)',
        glowColor: 'rgba(244, 114, 182, 0.15)',
        iconColor: '#f472b6',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                    <linearGradient id="grad3" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f472b6" />
                        <stop offset="1" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
                <circle cx="10" cy="10" r="6" fill="rgba(244,114,182,0.3)" stroke="url(#grad3)" strokeWidth="2" />
                <circle cx="22" cy="10" r="6" fill="rgba(236,72,153,0.3)" stroke="url(#grad3)" strokeWidth="2" />
                <circle cx="16" cy="20" r="6" fill="rgba(244,114,182,0.3)" stroke="url(#grad3)" strokeWidth="2" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Development & Animation',
        description: 'Clean, performant code with GSAP animations that bring your designs to life at 60fps.',
        gradient: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
        glowColor: 'rgba(34, 211, 238, 0.15)',
        iconColor: '#22d3ee',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                    <linearGradient id="grad4" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#22d3ee" />
                        <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
                <polyline points="10,8 3,16 10,24" stroke="url(#grad4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <polyline points="22,8 29,16 22,24" stroke="url(#grad4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="18" y1="5" x2="14" y2="27" stroke="url(#grad4)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
        ),
    },
    {
        number: '05',
        title: 'Testing & Optimization',
        description: 'Rigorous cross-browser testing, performance optimization, and accessibility auditing.',
        gradient: 'linear-gradient(135deg, #fb923c, #f97316)',
        glowColor: 'rgba(251, 146, 60, 0.15)',
        iconColor: '#fb923c',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                    <linearGradient id="grad5" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fb923c" />
                        <stop offset="1" stopColor="#f97316" />
                    </linearGradient>
                </defs>
                <path d="M16 3L28 28H4L16 3Z" stroke="url(#grad5)" strokeWidth="2" strokeLinejoin="round" fill="none" />
                <circle cx="16" cy="16" r="4" fill="url(#grad5)" opacity="0.4" />
                <polyline points="12,16 15,19 21,13" stroke="url(#grad5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
        ),
    },
    {
        number: '06',
        title: 'Launch & Support',
        description: 'Smooth deployment with ongoing support, analytics monitoring, and iterative improvements.',
        gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
        glowColor: 'rgba(167, 139, 250, 0.15)',
        iconColor: '#a78bfa',
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                    <linearGradient id="grad6" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a78bfa" />
                        <stop offset="1" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
                <path d="M16 4L20 12L16 28L12 12L16 4Z" fill="url(#grad6)" opacity="0.3" />
                <path d="M16 4L20 12L16 28L12 12L16 4Z" stroke="url(#grad6)" strokeWidth="2" strokeLinejoin="round" fill="none" />
                <circle cx="10" cy="8" r="1.5" fill="url(#grad6)" opacity="0.6" />
                <circle cx="22" cy="8" r="1.5" fill="url(#grad6)" opacity="0.6" />
                <circle cx="8" cy="16" r="1" fill="url(#grad6)" opacity="0.4" />
                <circle cx="24" cy="16" r="1" fill="url(#grad6)" opacity="0.4" />
            </svg>
        ),
    },
];

export default function FeatureList() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const items = sectionRef.current.querySelectorAll('.feature-item');

            items.forEach((item, index) => {
                const card = item.querySelector('.feature-card');
                const icon = item.querySelector('.feature-icon-wrap');
                const number = item.querySelector('.feature-number');
                const title = item.querySelector('.feature-title');
                const desc = item.querySelector('.feature-desc');

                // Items slide in from the left with stagger
                gsap.from(item, {
                    x: -100,
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

                // Per-item scroll-linked highlight
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 65%',
                        end: 'top 35%',
                        scrub: true,
                    },
                });

                tl.to(card as Element, {
                    borderColor: 'rgba(201, 243, 29, 0.3)',
                    duration: 0.5,
                }, 0)
                    .to(icon as Element, {
                        scale: 1.15,
                        duration: 0.5,
                    }, 0)
                    .to(number as Element, {
                        color: '#c9f31d',
                        scale: 1.1,
                        duration: 0.5,
                    }, 0)
                    .to(title as Element, {
                        color: '#ffffff',
                        duration: 0.5,
                    }, 0)
                    .to(desc as Element, {
                        color: '#aaa',
                        opacity: 1,
                        duration: 0.5,
                    }, 0);
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
                        Our Process
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-3">
                        How We <span className="gradient-text">Work</span>
                    </h2>
                    <p className="mt-4 text-sm max-w-md" style={{ color: '#666' }}>
                        A refined six-step process designed to deliver exceptional digital experiences.
                    </p>
                </div>

                {/* Feature Items — Left Aligned */}
                <div className="space-y-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-item"
                        >
                            <div
                                className="feature-card flex items-start gap-5 md:gap-8 p-6 md:p-8 rounded-2xl transition-none"
                                style={{
                                    background: `linear-gradient(135deg, rgba(22,22,22,0.9), rgba(22,22,22,0.6))`,
                                    border: '1px solid #1a1a1a',
                                    backdropFilter: 'blur(10px)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Glow effect behind card */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-50%',
                                        left: '-20%',
                                        width: '200px',
                                        height: '200px',
                                        background: feature.glowColor,
                                        borderRadius: '50%',
                                        filter: 'blur(60px)',
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* Icon */}
                                <div
                                    className="feature-icon-wrap shrink-0 flex items-center justify-center rounded-xl transition-none"
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        background: feature.glowColor,
                                        border: `1px solid ${feature.iconColor}33`,
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                >
                                    {feature.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 relative" style={{ zIndex: 1 }}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className="feature-number text-sm font-bold tracking-widest transition-none"
                                            style={{ color: '#333', fontFamily: 'var(--font-heading)' }}
                                        >
                                            {feature.number}
                                        </span>
                                        <div
                                            className="h-px flex-1"
                                            style={{
                                                background: `linear-gradient(90deg, ${feature.iconColor}33, transparent)`,
                                                maxWidth: '80px',
                                            }}
                                        />
                                    </div>
                                    <h3
                                        className="feature-title text-lg md:text-xl font-bold mb-2 transition-none"
                                        style={{ color: '#777' }}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p
                                        className="feature-desc text-sm leading-relaxed transition-none"
                                        style={{ color: '#444', opacity: 0.7 }}
                                    >
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

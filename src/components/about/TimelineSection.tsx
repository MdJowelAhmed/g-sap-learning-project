'use client';

/**
 * ===================================================
 * Timeline Section — About Us Page
 * ===================================================
 *
 * Company milestones displayed on a vertical timeline.
 * The connecting line progressively draws as the user scrolls,
 * and each milestone fades in with alternating left/right stagger.
 *
 * This uses the same "scroll-drawn line" technique as
 * ProcessSection but with more visual polish and detail.
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
        description: 'Started as a two-person freelance team in a small co-working space.',
        icon: '🚀',
    },
    {
        year: '2018',
        title: 'First Major Client',
        description: 'Landed our first enterprise project — a complete brand overhaul for a Fortune 500.',
        icon: '🏆',
    },
    {
        year: '2020',
        title: 'Team Expansion',
        description: 'Grew to 15 people and opened our first dedicated studio space.',
        icon: '👥',
    },
    {
        year: '2022',
        title: 'Award Recognition',
        description: 'Won three Awwwards site of the day and a CSS Design Award.',
        icon: '🏅',
    },
    {
        year: '2024',
        title: 'Global Reach',
        description: 'Now 30+ team members serving clients across 12 countries.',
        icon: '🌍',
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

            /* Milestone entrances */
            const items = sectionRef.current.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                gsap.from(item, {
                    x: index % 2 === 0 ? -80 : 80,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
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
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#c9f31d' }}>
                        Our Journey
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">The Timeline</h2>
                </div>

                <div className="relative">
                    {/* Background line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: '#222' }}>
                        <div
                            ref={lineRef}
                            className="w-full"
                            style={{ background: '#c9f31d', height: '0%' }}
                        />
                    </div>

                    <div className="space-y-20">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`timeline-item relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Dot */}
                                <div
                                    className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 flex items-center justify-center"
                                    style={{
                                        background: '#0a0a0a',
                                        border: '2px solid #c9f31d',
                                        top: '4px',
                                    }}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#c9f31d' }} />
                                </div>

                                <div
                                    className={`ml-14 md:ml-0 md:w-1/2 rounded-2xl p-6 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                                        }`}
                                    style={{ background: '#161616', border: '1px solid #222' }}
                                >
                                    <div className="flex items-center gap-3 mb-3" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                                        <span className="text-2xl">{milestone.icon}</span>
                                        <span className="text-sm font-bold tracking-widest" style={{ color: '#c9f31d' }}>
                                            {milestone.year}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                                    <p className="text-sm" style={{ color: '#888' }}>
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

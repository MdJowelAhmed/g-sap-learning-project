'use client';

/**
 * ===================================================
 * Team Section — About Us Page
 * ===================================================
 *
 * Team member photos revealed with clip-path animations.
 * Using gsap.fromTo() to animate clipPath from fully clipped
 * (hidden) to fully visible as each member scrolls into view.
 *
 * Clip-path animation:
 * inset(100% 0 0 0) → inset(0% 0 0 0)
 * This creates an "uncover" effect from bottom to top.
 * inset() is used instead of polygon() for simplicity and
 * smooth interpolation — GSAP handles the number parsing.
 *
 * Each team member has a slightly different direction for variety:
 * - Member 1: reveals from bottom
 * - Member 2: reveals from right
 * - Member 3: reveals from top
 * - Member 4: reveals from left
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
    {
        name: 'Alex Morgan',
        role: 'Lead Developer',
        gradient: 'linear-gradient(135deg, #c9f31d 0%, #1a1a2e 100%)',
        clipFrom: 'inset(100% 0 0 0)', /* Reveal from bottom */
        initials: 'AM',
    },
    {
        name: 'Priya Sharma',
        role: 'Design Director',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e1b4b 100%)',
        clipFrom: 'inset(0 100% 0 0)', /* Reveal from right */
        initials: 'PS',
    },
    {
        name: 'James Chen',
        role: 'Motion Designer',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #451a03 100%)',
        clipFrom: 'inset(0 0 100% 0)', /* Reveal from top */
        initials: 'JC',
    },
    {
        name: 'Olivia Williams',
        role: 'Strategy Lead',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #4a044e 100%)',
        clipFrom: 'inset(0 0 0 100%)', /* Reveal from left */
        initials: 'OW',
    },
];

export default function TeamSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const cards = sectionRef.current.querySelectorAll('.team-card');
            const images = sectionRef.current.querySelectorAll('.team-image');

            /* Card entrance with stagger */
            gsap.from(cards, {
                y: 60,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });

            /**
             * Clip-path reveal for each team member image.
             * gsap.fromTo() gives us explicit control of both start
             * and end values for the clipPath property.
             */
            images.forEach((img, index) => {
                const member = teamMembers[index];

                gsap.fromTo(
                    img,
                    {
                        clipPath: member.clipFrom,
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1.2,
                        ease: 'expo.inOut',
                        scrollTrigger: {
                            trigger: img,
                            start: 'top 75%',
                            toggleActions: 'play none none none',
                            once: true,
                        },
                        delay: index * 0.15,
                    }
                );
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#c9f31d' }}>
                        The Team
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">Meet Our People</h2>
                    <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: '#888' }}>
                        Each photo reveals with a unique clip-path animation as it enters the viewport.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card group" data-cursor="pointer">
                            {/* Image container with clip-path animation */}
                            <div
                                className="team-image aspect-[3/4] rounded-2xl overflow-hidden mb-4 relative"
                                style={{
                                    clipPath: member.clipFrom,
                                }}
                            >
                                <div
                                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                                    style={{ background: member.gradient }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-5xl font-black opacity-20 text-white">
                                        {member.initials}
                                    </span>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <p className="text-sm" style={{ color: '#888' }}>
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

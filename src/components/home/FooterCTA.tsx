'use client';

/**
 * ===================================================
 * Footer CTA Section — Home Page
 * ===================================================
 *
 * A bold full-width CTA section that uses a large magnetic
 * button as the focal point. The background has an animated
 * gradient that slowly shifts hues.
 *
 * The text entrance uses a word-by-word reveal with stagger
 * for cinematic impact.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function FooterCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const heading = sectionRef.current.querySelector('.cta-heading');
            const subtitle = sectionRef.current.querySelector('.cta-subtitle');
            const button = sectionRef.current.querySelector('.cta-button');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });

            tl.from(heading, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'expo.out',
            })
                .from(
                    subtitle,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '-=0.3'
                )
                .from(
                    button,
                    {
                        scale: 0,
                        opacity: 0,
                        duration: 1,
                        ease: 'elastic.out(1, 0.3)',
                    },
                    '-=0.2'
                );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
            style={{ minHeight: '60vh' }}
        >
            {/* Background decoration */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 100%, rgba(201,243,29,0.08) 0%, transparent 60%)',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2
                    className="cta-heading text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
                >
                    Ready to Build
                    <br />
                    <span className="gradient-text">Something Amazing?</span>
                </h2>

                <p
                    className="cta-subtitle text-base md:text-lg max-w-xl mx-auto mb-10"
                    style={{ color: '#888' }}
                >
                    Let&apos;s create a digital experience that captivates your audience
                    and drives results. Your vision, our animation expertise.
                </p>

                <div className="cta-button">
                    <MagneticButton>Start a Project</MagneticButton>
                </div>
            </div>

            {/* Bottom border decoration */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div
                    className="w-full max-w-7xl mx-auto px-6"
                    style={{ borderTop: '1px solid #222' }}
                >
                    <div className="flex justify-between items-center py-8 text-xs" style={{ color: '#888' }}>
                        <span>© 2024 GSAP Studio. All rights reserved.</span>
                        <span>Crafted with Next.js + GSAP</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

/**
 * ===================================================
 * Service CTA — Service Page
 * ===================================================
 *
 * Call-to-action section with a magnetic "Contact" button
 * and animated background gradient.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const heading = sectionRef.current.querySelector('.service-cta-heading');
            const text = sectionRef.current.querySelector('.service-cta-text');
            const btn = sectionRef.current.querySelector('.service-cta-btn');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });

            tl.from(heading, { y: 50, opacity: 0, duration: 0.8, ease: 'expo.out' })
                .from(text, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
                .from(btn, { scale: 0, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.3)' }, '-=0.2');
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="section-padding text-center relative overflow-hidden"
        >
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(201,243,29,0.06) 0%, transparent 60%)',
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="service-cta-heading text-4xl md:text-6xl font-black mb-6">
                    Let&apos;s Work <span className="gradient-text">Together</span>
                </h2>
                <p className="service-cta-text text-sm md:text-base mb-10" style={{ color: '#888' }}>
                    Have a project in mind? We&apos;d love to hear about it.
                    Let&apos;s create something extraordinary.
                </p>
                <div className="service-cta-btn">
                    <MagneticButton>Get in Touch</MagneticButton>
                </div>
            </div>
        </section>
    );
}

'use client';

/**
 * ===================================================
 * Process Section — Service Page
 * ===================================================
 *
 * A step-by-step workflow visualization with a connecting
 * line that "draws" itself as the user scrolls. Each step
 * fades in as the line reaches it.
 *
 * The SVG line uses strokeDasharray/strokeDashoffset to create
 * the drawing animation — controlled by ScrollTrigger scrub.
 */

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { title: 'Kickoff Meeting', desc: 'We align on vision, goals, and timeline.' },
    { title: 'Design Sprint', desc: 'Rapid prototyping and user testing.' },
    { title: 'Development', desc: 'Building with clean, scalable code.' },
    { title: 'Animation Layer', desc: 'GSAP magic applied to every interaction.' },
    { title: 'Launch', desc: 'Smooth deployment and monitoring.' },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !lineRef.current) return;

            const stepElements = sectionRef.current.querySelectorAll('.process-step');

            /* Animate the connecting line height from 0 to 100% */
            gsap.to(lineRef.current, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    scrub: 1,
                },
            });

            /* Each step fades in when the line reaches it */
            stepElements.forEach((step, index) => {
                gsap.from(step, {
                    x: index % 2 === 0 ? -60 : 60,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                });
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="section-padding relative">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#c9f31d' }}>
                        Workflow
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3">Our Process</h2>
                </div>

                <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: '#222' }}>
                        <div
                            ref={lineRef}
                            className="w-full"
                            style={{ background: '#c9f31d', height: '0%' }}
                        />
                    </div>

                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`process-step relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Dot */}
                                <div
                                    className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                                    style={{ background: '#c9f31d', top: '6px' }}
                                />

                                {/* Content */}
                                <div
                                    className={`ml-14 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                                        }`}
                                >
                                    <span className="text-xs font-bold tracking-widest" style={{ color: '#c9f31d' }}>
                                        Step {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="text-xl font-bold mt-1">{step.title}</h3>
                                    <p className="text-sm mt-2" style={{ color: '#888' }}>
                                        {step.desc}
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

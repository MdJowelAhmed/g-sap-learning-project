'use client';

/**
 * ===================================================
 * Navbar Component
 * ===================================================
 *
 * Fixed-position navigation bar with:
 * - Scroll-based hide/show (hide on scroll down, show on scroll up)
 * - Glassmorphism background effect
 * - Magnetic effect on nav links using the useMagnetic hook
 * - Animated hamburger menu for mobile
 * - GSAP-powered entrance animation on page load
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/gsap-basics', label: 'GSAP Basics' },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    /**
     * Entrance animation using useGSAP for automatic cleanup.
     * The navbar fades in and slides down from above on first load.
     */
    useGSAP(
        () => {
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'expo.out',
                delay: 0.5,
            });
        },
        { scope: navRef }
    );

    /**
     * Scroll-based show/hide logic:
     * - Scrolling DOWN past 100px → navbar slides up (hidden)
     * - Scrolling UP → navbar slides back down (visible)
     * This uses ScrollTrigger's onUpdate callback to check direction.
     */
    useEffect(() => {
        let lastScrollY = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (!navRef.current) return;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                /* Scrolling down — hide */
                gsap.to(navRef.current, {
                    y: -100,
                    duration: 0.4,
                    ease: 'power3.out',
                });
            } else {
                /* Scrolling up — show */
                gsap.to(navRef.current, {
                    y: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                });
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-4"
        >
            <div
                className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-6 md:px-10 py-3"
                style={{
                    background: 'rgba(10, 10, 10, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.05)',
                }}
            >
                {/* Logo */}
                <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight" data-cursor="pointer">
                    <span style={{ color: '#c9f31d' }}>G</span>
                    <span className="text-white">SAP</span>
                    <span className="text-white/40 text-sm ml-1 font-light">studio</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} href={link.href} label={link.label} isActive={pathname === link.href} />
                    ))}
                    <Link
                        href="/about#contact"
                        data-cursor="pointer"
                        className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                        style={{
                            background: '#c9f31d',
                            color: '#0a0a0a',
                        }}
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    data-cursor="pointer"
                    aria-label="Toggle menu"
                >
                    <span
                        className="block w-6 h-0.5 transition-all duration-300"
                        style={{
                            background: '#c9f31d',
                            transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                        }}
                    />
                    <span
                        className="block w-6 h-0.5 transition-all duration-300"
                        style={{
                            background: '#c9f31d',
                            opacity: mobileOpen ? 0 : 1,
                        }}
                    />
                    <span
                        className="block w-6 h-0.5 transition-all duration-300"
                        style={{
                            background: '#c9f31d',
                            transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
                        }}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    className="md:hidden mt-2 rounded-2xl p-6 flex flex-col gap-4"
                    style={{
                        background: 'rgba(10, 10, 10, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-lg font-medium py-2"
                            style={{ color: pathname === link.href ? '#c9f31d' : '#e8e8e8' }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

/**
 * Individual nav link with magnetic hover effect.
 * The link text subtly follows the cursor when hovered.
 */
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!linkRef.current) return;
        const rect = linkRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(linkRef.current, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        if (!linkRef.current) return;
        gsap.to(linkRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    return (
        <Link
            ref={linkRef}
            href={href}
            data-cursor="pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative text-sm font-medium tracking-wide transition-colors duration-300 inline-block"
            style={{ color: isActive ? '#c9f31d' : '#e8e8e8' }}
        >
            {label}
            {isActive && (
                <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                    style={{ background: '#c9f31d' }}
                />
            )}
        </Link>
    );
}

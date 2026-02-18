import type { Metadata } from 'next';
import './globals.css';
import LenisSmoothScroll from '@/components/layout/LenisSmoothScroll';
import CustomCursor from '@/components/layout/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/layout/PageTransition';

export const metadata: Metadata = {
  title: 'GSAP Studio | Premium Web Animations',
  description:
    'A high-end multi-page Next.js application showcasing the full power of GSAP animations — ScrollTrigger, page transitions, magnetic effects, and more.',
  keywords: ['GSAP', 'Next.js', 'animations', 'ScrollTrigger', 'web development'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Lenis Smooth Scroll wraps everything for consistent scroll behavior */}
        <LenisSmoothScroll>
          {/* Custom cursor visible globally */}
          <CustomCursor />

          {/* Fixed navbar — always on top */}
          <Navbar />

          {/* Page transition overlay + content */}
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
        </LenisSmoothScroll>
      </body>
    </html>
  );
}

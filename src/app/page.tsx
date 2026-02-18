/**
 * ===================================================
 * Home Page — The Showcase
 * ===================================================
 *
 * Assembles all home page sections in order.
 * Each section is a separate client component with its own
 * GSAP animation logic and ScrollTrigger setup.
 *
 * Section order:
 * 1. Hero — first impression, timeline animation
 * 2. HorizontalScroll — services preview (pinned)
 * 3. DynamicGallery — mouse-follow parallax
 * 4. SVGMorph — scroll-linked shape morphing
 * 5. Testimonials — social proof with stagger
 * 6. FooterCTA — call to action
 */

import HeroSection from '@/components/home/HeroSection';
import HorizontalScrollSection from '@/components/home/HorizontalScrollSection';
import DynamicGallery from '@/components/home/DynamicGallery';
import SVGMorphSection from '@/components/home/SVGMorphSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FooterCTA from '@/components/home/FooterCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HorizontalScrollSection />
      <DynamicGallery />
      <SVGMorphSection />
      <TestimonialsSection />
      <FooterCTA />
    </>
  );
}

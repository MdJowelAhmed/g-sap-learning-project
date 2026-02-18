/**
 * ===================================================
 * About Us Page — Storytelling
 * ===================================================
 *
 * Assembles all About page sections:
 * 1. AboutHero — word-by-word reveal + parallax bg
 * 2. TeamSection — clip-path image reveals
 * 3. CountersSection — animated numbers with snap
 * 4. TimelineSection — scroll-drawn milestone timeline
 * 5. ValuesSection — random rotation stagger cards
 */

import AboutHero from '@/components/about/AboutHero';
import TeamSection from '@/components/about/TeamSection';
import CountersSection from '@/components/about/CountersSection';
import TimelineSection from '@/components/about/TimelineSection';
import ValuesSection from '@/components/about/ValuesSection';

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <TeamSection />
            <CountersSection />
            <TimelineSection />
            <ValuesSection />
        </>
    );
}

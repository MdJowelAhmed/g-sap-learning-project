/**
 * ===================================================
 * Service Page — Interaction Focused
 * ===================================================
 *
 * Assembles all service page sections:
 * 1. ServiceHero — animated headline
 * 2. ServiceCards — stagger reveal + 3D tilt hover
 * 3. FeatureList — scroll-linked text highlight (scrub)
 * 4. ProcessSection — scroll-drawn workflow timeline
 * 5. ServiceCTA — magnetic contact button
 */

import ServiceHero from '@/components/services/ServiceHero';
import ServiceCards from '@/components/services/ServiceCards';
import FeatureList from '@/components/services/FeatureList';
import ProcessSection from '@/components/services/ProcessSection';
import ServiceCTA from '@/components/services/ServiceCTA';

export default function ServicesPage() {
    return (
        <>
            <ServiceHero />
            <ServiceCards />
            <FeatureList />
            <ProcessSection />
            <ServiceCTA />
        </>
    );
}

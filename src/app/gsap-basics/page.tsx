import type { Metadata } from 'next';
import GsapBasicsShowcase from '@/components/gsap-basics/GsapBasicsShowcase';

export const metadata: Metadata = {
    title: 'GSAP Basics | to() vs from() | GSAP Studio',
    description:
        'An interactive, educational showcase of the difference between gsap.to() and gsap.from() — two core GSAP animation methods explained with live demos.',
};

export default function GsapBasicsPage() {
    return <GsapBasicsShowcase />;
}

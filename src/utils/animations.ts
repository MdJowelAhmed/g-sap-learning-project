/**
 * ===================================================
 * GSAP Animation Utilities & Presets
 * ===================================================
 *
 * Centralized animation configuration to maintain consistency
 * across the entire application. All easing values and durations
 * are chosen for a premium, high-end feel.
 */

/**
 * EASING PRESETS
 *
 * - expo.out: Used for entrance animations — starts fast, decelerates smoothly.
 *   Creates a snappy, premium feel that's responsive but not jarring.
 *
 * - expo.inOut: Used for page transitions and major state changes — symmetrical
 *   acceleration/deceleration feels intentional and polished.
 *
 * - elastic.out(1, 0.3): Used for CTA buttons and interactive elements —
 *   the overshoot creates a playful, attention-grabbing bounce.
 *
 * - power3.out: A softer alternative to expo for secondary elements.
 *
 * - back.out(1.7): Used for elements that need a subtle overshoot
 *   without the oscillation of elastic ease.
 */
export const EASE = {
  /* Primary entrance ease — fast entry with smooth decel */
  entrance: 'expo.out',
  /* Exit animations — smooth acceleration into disappearance */
  exit: 'expo.in',
  /* Page transitions — symmetrical for equal attention on both directions */
  transition: 'expo.inOut',
  /* CTA / buttons — playful overshoot draws eyes */
  elastic: 'elastic.out(1, 0.3)',
  /* Secondary elements — less dramatic than expo */
  smooth: 'power3.out',
  /* Subtle overshoot for card/element entrances */
  overshoot: 'back.out(1.7)',
  /* Linear for scrub-linked scroll animations — 1:1 mapping feels natural */
  scrub: 'none',
} as const;

/**
 * DURATION PRESETS (in seconds)
 *
 * Timing hierarchy ensures visual hierarchy:
 * - Hero (longest) draws the most attention
 * - Standard elements are quick but noticeable
 * - Micro-interactions are nearly instant
 */
export const DURATION = {
  hero: 1.4,
  standard: 0.8,
  fast: 0.5,
  micro: 0.3,
  pageTransition: 0.6,
} as const;

/**
 * STAGGER PRESETS
 *
 * Stagger timing creates a cascade/wave effect.
 * The value represents delay between each element starting.
 * - 0.1s between items feels connected (part of the same group)
 * - 0.15s is the sweet spot for card grids
 * - 0.05s is for text characters (fast enough to read as a reveal)
 */
export const STAGGER = {
  characters: 0.03,
  words: 0.08,
  items: 0.15,
  cards: 0.2,
  sections: 0.3,
} as const;

/**
 * ScrollTrigger default configuration factory.
 *
 * refreshPriority logic:
 * - Higher numbers refresh first. Pinned sections should have HIGHER priority
 *   so their dimensions are calculated before dependent triggers.
 * - Hero = 10 (refreshes first, sets scroll positions)
 * - Horizontal scroll = 5 (depends on hero height)
 * - Standard sections = 1 (default)
 * - Footer sections = -1 (calculated last)
 */
export const createScrollTriggerConfig = (
  trigger: string | Element,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    refreshPriority?: number;
    toggleActions?: string;
    once?: boolean;
  } = {}
) => ({
  trigger,
  start: options.start ?? 'top 80%',
  end: options.end ?? 'bottom 20%',
  scrub: options.scrub ?? false,
  pin: options.pin ?? false,
  markers: options.markers ?? (process.env.NODE_ENV === 'development' ? false : false),
  refreshPriority: options.refreshPriority ?? 1,
  toggleActions: options.toggleActions ?? 'play none none none',
  once: options.once ?? true,
});

/**
 * Fade-in-up animation defaults — the most common entrance animation.
 */
export const fadeInUpVars = (delay = 0) => ({
  y: 60,
  opacity: 0,
  duration: DURATION.standard,
  ease: EASE.entrance,
  delay,
});

/**
 * Stagger reveal from below — used for card grids, lists, etc.
 */
export const staggerRevealVars = (staggerAmount = STAGGER.items) => ({
  y: 80,
  opacity: 0,
  duration: DURATION.standard,
  ease: EASE.overshoot,
  stagger: {
    each: staggerAmount,
    from: 'start' as const,
  },
});

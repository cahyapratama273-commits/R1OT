'use client';

import { useEffect, useRef, useCallback } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import useAnimeOnView from '@/hooks/useAnimeOnView';
import { useTheme } from '@/context/ThemeContext';

/**
 * HeroAnime — handles entrance animations for the hero section using Anime.js v4.
 * Children are passed via render-props pattern so we can grab real DOM refs.
 */
export default function HeroAnime({ children }) {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || hasAnimated.current) return;
    hasAnimated.current = true;

    const el = containerRef.current;
    if (!el) return;

    const badge = el.querySelector('[data-anime="badge"]');
    const title = el.querySelector('[data-anime="title"]');
    const sub = el.querySelector('[data-anime="sub"]');
    const ctas = el.querySelectorAll('[data-anime="cta"]');
    const card = el.querySelector('[data-anime="card"]');

    // Set initial invisible state before animating
    const targets = [badge, title, sub, ...ctas, card].filter(Boolean);
    targets.forEach((t) => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(28px)';
    });

    const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 900 } });

    if (badge) {
      tl.add(badge, { opacity: [0, 1], translateY: [28, 0], duration: 700 }, 200);
    }
    if (title) {
      tl.add(title, { opacity: [0, 1], translateY: [36, 0], duration: 800 }, 350);
    }
    if (sub) {
      tl.add(sub, { opacity: [0, 1], translateY: [20, 0], duration: 700 }, 550);
    }
    if (ctas.length) {
      tl.add(ctas, {
        opacity: [0, 1],
        translateY: [16, 0],
        scale: [0.95, 1],
        duration: 600,
        delay: stagger(100),
      }, 700);
    }
    if (card) {
      tl.add(card, { opacity: [0, 1], translateY: [32, 0], scale: [0.97, 1], duration: 800 }, 900);
    }
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * SectionTitle — wraps a section heading block and applies a smooth
 * Anime.js reveal animation (fade + slide up) when it enters the viewport.
 * Drops in seamlessly next to existing AOS-animated siblings.
 */
export default function SectionTitle({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    // Initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          animate(el, {
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 800,
            ease: 'outExpo',
            delay,
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

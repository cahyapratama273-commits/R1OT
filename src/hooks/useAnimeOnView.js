'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook: triggers an Anime.js animation once when the element
 * enters the viewport. Respects prefers-reduced-motion.
 *
 * @param {Function} animateFn  - receives the element ref.current and must return an Anime.js animation instance
 * @param {Object}   options
 * @param {number}   options.threshold   - IntersectionObserver threshold (default 0.15)
 * @param {boolean}  options.once        - only trigger once (default true)
 * @param {boolean}  options.disabled    - skip animation entirely (default false)
 */
export default function useAnimeOnView(animateFn, options = {}) {
  const { threshold = 0.15, once = true, disabled = false } = options;
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (disabled) return;

    // Respect user's motion preference
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && triggered.current) return;
          triggered.current = true;
          animateFn(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateFn, threshold, once, disabled]);

  return ref;
}

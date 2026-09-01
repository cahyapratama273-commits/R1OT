'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import useAnimeOnView from '@/hooks/useAnimeOnView';

export default function Counter({ end, duration = 2000, suffix = '' }) {
  const numberRef = useRef(null);

  const triggerAnimation = (el) => {
    animate(el, {
      innerHTML: [0, end],
      duration: duration,
      ease: 'outExpo',
      round: 1, // Round to integer
    });
  };

  const ref = useAnimeOnView(triggerAnimation);

  return (
    <span>
      <span ref={(el) => {
        ref.current = el;
        numberRef.current = el;
      }} className="anime-counter">
        0
      </span>
      {suffix}
    </span>
  );
}

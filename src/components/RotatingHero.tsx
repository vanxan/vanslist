'use client';

import { useState, useEffect } from 'react';

const words = ["Plumbers", "Electricians", "Landscapers", "Therapists", "Photographers", "Restaurants"];

export function RotatingHero() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-[62px] font-extrabold leading-[1.15] tracking-tight">
      Find The Best AI For
      <br />
      <span
        className="inline-block underline decoration-gold decoration-[3px] underline-offset-[6px] min-w-[280px] transition-all duration-300"
        style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
        }}
      >
        {words[index]}
      </span>
    </h1>
  );
}

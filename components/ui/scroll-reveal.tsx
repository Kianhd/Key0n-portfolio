"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

// Register GSAP plugin only once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Simple fade and rotation animation
      gsap.fromTo(
        textRef.current,
        {
          opacity: baseOpacity,
          rotateX: baseRotation,
          filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
        },
        {
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1,
            markers: false,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [baseOpacity, baseRotation, blurStrength, enableBlur]);

  return (
    <div ref={containerRef} className={cn(containerClassName)}>
      <p ref={textRef} className={cn(textClassName)}>
        {children}
      </p>
    </div>
  );
};

export default ScrollReveal;
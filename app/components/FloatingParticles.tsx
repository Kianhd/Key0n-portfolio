"use client";

import { motion } from "motion/react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";
import { throttle } from "@/lib/throttle";
import { useThrottledMouseTracking } from "@/app/hooks/useThrottledAnimation";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

const FloatingParticles = React.memo(function FloatingParticles({ count = 20, className = "" }: FloatingParticlesProps) {
  const browserOpts = useBrowserOptimizations();
  
  // Completely disable for Firefox, Zen Browser, or reduced motion preference
  if (browserOpts.disableInfiniteAnimations || browserOpts.useStaticFallbacks || browserOpts.prefersReducedMotion) {
    return null;
  }
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Reduce particle count for Firefox
  const adjustedCount = browserOpts.reduceParticles ? Math.max(5, Math.floor(count / 3)) : count;

  // Memoize particles to prevent recreation on every render
  const particles = useMemo(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < adjustedCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      });
    }
    return newParticles;
  }, [adjustedCount]);

  // Use throttled mouse tracking for better Firefox performance
  useThrottledMouseTracking((clientX: number, clientY: number) => {
    setMousePosition({
      x: (clientX / window.innerWidth) * 100,
      y: (clientY / window.innerHeight) * 100,
    });
  });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-foreground/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Subtle gradient overlay that follows mouse */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-radial from-foreground/5 to-transparent rounded-full pointer-events-none"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

export default FloatingParticles;
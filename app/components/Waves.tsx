"use client";

import { useRef, useEffect, useCallback } from "react";
import { getBrowserOptimizations } from "@/lib/browser-detect";
import { throttle } from "@/lib/throttle";

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  xGap?: number;
  yGap?: number;
}

export default function Waves({
  lineColor = "#690707",
  backgroundColor = "transparent",
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 120,
  xGap = 12,
  yGap = 36,
}: WavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });
  const browserOpts = getBrowserOptimizations();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let time = 0;
    const points: Array<{
      x: number;
      y: number;
      baseY: number;
      targetY: number;
      vx: number;
      vy: number;
    }> = [];

    // Initialize grid points
    const initPoints = () => {
      points.length = 0;
      const cols = Math.ceil(canvas.width / xGap) + 1;
      const rows = Math.ceil(canvas.height / yGap) + 1;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * xGap;
          const y = j * yGap;
          points.push({
            x,
            y,
            baseY: y,
            targetY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    initPoints();

    // Mouse tracking
    const handleMouseMoveRaw = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    
    const handleMouseMove = browserOpts.throttleMouseEvents
      ? throttle(handleMouseMoveRaw, 16)
      : handleMouseMoveRaw;

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }; // Move mouse far away
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop with Firefox optimization
    const animate = () => {
      if (!ctx || !canvas) return;

      // Firefox: Reduce animation frequency slightly
      time += browserOpts.reduceMotionComplexity ? 0.025 : 0.016;

      // Firefox: Skip some frames for performance (but not too aggressive)
      if (browserOpts.reduceMotionComplexity && Math.floor(time * 40) % 3 === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Firefox: Slightly reduce calculation complexity
      const pointsToUpdate = browserOpts.reduceMotionComplexity 
        ? points.filter((_, i) => i % 2 === 0) // Process every other point
        : points;

      // Update points
      pointsToUpdate.forEach((point, index) => {
        if (browserOpts.reduceMotionComplexity) {
          // Firefox: Simplified wave calculation (single wave instead of 3)
          const wave1 = Math.sin(time * waveSpeedX + point.x * 0.008) * waveAmpX * 0.5;
          
          // Simplified mouse influence
          const dx = mouseRef.current.x - point.x;
          const dy = mouseRef.current.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, Math.min(1, 1 - distance / maxCursorMove));
          const mouseEffect = influence * -30; // Reduced effect

          // Calculate target position (simplified)
          point.targetY = point.baseY + wave1 + mouseEffect;
        } else {
          // Full complexity for other browsers
          const wave1 = Math.sin(time * waveSpeedX + point.x * 0.008) * waveAmpX * 0.3;
          const wave2 = Math.cos(time * waveSpeedY * 1.5 + point.y * 0.012) * waveAmpY * 0.4;
          const wave3 = Math.sin(time * waveSpeedX * 0.7 + (point.x + point.y) * 0.005) * waveAmpX * 0.2;

          // Mouse influence with smooth falloff
          const dx = mouseRef.current.x - point.x;
          const dy = mouseRef.current.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, Math.min(1, 1 - distance / maxCursorMove));
          const mouseEffect = influence * influence * -60;

          // Calculate target position
          point.targetY = point.baseY + wave1 + wave2 + wave3 + mouseEffect;
        }

        // Apply spring physics for smooth movement
        const springForce = (point.targetY - point.y) * tension;
        point.vy += springForce;
        point.vy *= friction;
        point.y += point.vy;

        // Horizontal movement (simplified for Firefox)
        if (!browserOpts.reduceMotionComplexity) {
          const horizontalWave = Math.sin(time * waveSpeedX * 0.5 + point.y * 0.01) * 2;
          point.x = (index % Math.ceil(canvas.width / xGap)) * xGap + horizontalWave;
        }
      });

      // Draw connections
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.4;

      const cols = Math.ceil(canvas.width / xGap) + 1;
      const rows = Math.ceil(canvas.height / yGap) + 1;

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < cols - 1; i++) {
          const currentIndex = i * rows + j;
          const nextIndex = (i + 1) * rows + j;
          
          if (currentIndex < points.length && nextIndex < points.length) {
            const current = points[currentIndex];
            const next = points[nextIndex];
            
            if (!started) {
              ctx.moveTo(current.x, current.y);
              started = true;
            }
            ctx.lineTo(next.x, next.y);
          }
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        let started = false;
        for (let j = 0; j < rows - 1; j++) {
          const currentIndex = i * rows + j;
          const nextIndex = i * rows + (j + 1);
          
          if (currentIndex < points.length && nextIndex < points.length) {
            const current = points[currentIndex];
            const next = points[nextIndex];
            
            if (!started) {
              ctx.moveTo(current.x, current.y);
              started = true;
            }
            ctx.lineTo(next.x, next.y);
          }
        }
        ctx.stroke();
      }

      // Add some particle effects near cursor
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const mouseDistance = Math.sqrt(mouseRef.current.x ** 2 + mouseRef.current.y ** 2);
        if (mouseDistance < canvas.width) {
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = lineColor;
          
          // Draw glowing dot at cursor position
          const glowRadius = 8 + Math.sin(time * 3) * 2;
          const gradient = ctx.createRadialGradient(
            mouseRef.current.x, mouseRef.current.y, 0,
            mouseRef.current.x, mouseRef.current.y, glowRadius
          );
          gradient.addColorStop(0, lineColor.replace('07', '40'));
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(mouseRef.current.x, mouseRef.current.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    lineColor,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ background: backgroundColor }}
    />
  );
}
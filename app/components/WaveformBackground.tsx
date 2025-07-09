"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { isFirefox } from "@/lib/browser-detect";

interface WaveformBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  waveColor?: string;
  backgroundColor?: string;
  enableMouseInteraction?: boolean;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  speedMultiplier?: number;
}

const WaveformBackground: React.FC<WaveformBackgroundProps> = ({
  className = "",
  children,
  waveColor = "#dc2626",
  backgroundColor = "#050505",
  enableMouseInteraction = true,
  amplitude = 50,
  frequency = 0.02,
  speed = 0.005,
  speedMultiplier = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const frameCountRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const isFirefoxBrowser = isFirefox();
  const [disableCanvas, setDisableCanvas] = useState(false);

  const [audioData, setAudioData] = useState<number[]>(
    Array.from({ length: 64 }, () => Math.random() * 0.3 + 0.1)
  );
  const performanceCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return;
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const updateAudioData = () => {
      // Skip audio updates for Firefox to reduce overhead
      if (!isFirefoxBrowser) {
        setAudioData(prev => 
          prev.map(value => {
            const target = Math.random() * 0.6 + 0.2;
            return value + (target - value) * 0.1;
          })
        );
      }
    };

    const drawWaveform = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center the waveforms at 50% height (where TELLS text is positioned)
      const centerY = canvas.height * 0.5;
      const mouseInfluence = enableMouseInteraction ? 
        (mouseRef.current.y - 0.5) * 100 : 0;

      // Draw fewer waveform layers for Firefox
      const layerCount = isFirefoxBrowser ? 2 : 5;
      for (let layer = 0; layer < layerCount; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = waveColor;
        ctx.globalAlpha = 0.15 - layer * 0.025;
        ctx.lineWidth = 2 - layer * 0.2;

        // Reduce sampling rate for Firefox
        const step = isFirefoxBrowser ? 8 : 4;
        for (let x = 0; x < canvas.width; x += step) {
          const normalizedX = x / canvas.width;
          const audioIndex = Math.floor(normalizedX * audioData.length);
          const audioValue = audioData[audioIndex] || 0;
          
          const baseWave = Math.sin(normalizedX * Math.PI * 8 + timeRef.current + layer * 0.5) * amplitude;
          const audioWave = audioValue * amplitude * 2;
          const mouseWave = enableMouseInteraction ? 
            Math.sin(normalizedX * Math.PI * 4 + timeRef.current) * mouseInfluence : 0;
          
          const y = centerY + baseWave + audioWave + mouseWave + (layer - 2) * 15;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      // Skip frequency bars for Firefox to improve performance
      if (!isFirefoxBrowser) {
        const barWidth = canvas.width / audioData.length;
        audioData.forEach((value, index) => {
          const x = index * barWidth;
          const barHeight = value * 100;
          
          ctx.fillStyle = waveColor;
          ctx.globalAlpha = 0.05;
          ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
        });
      }

      ctx.globalAlpha = 1;
    };

    const animate = (currentTime: number) => {
      // Firefox frame throttling - skip frames to maintain performance
      if (isFirefoxBrowser) {
        frameCountRef.current++;
        const timeDelta = currentTime - lastFrameTimeRef.current;
        
        // Target 30fps for Firefox (33ms per frame)
        if (timeDelta < 33) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameTimeRef.current = currentTime;
        
        // Performance monitoring - disable canvas if too slow
        if (frameCountRef.current % 60 === 0) {
          const fps = 1000 / timeDelta;
          if (fps < 20) {
            performanceCountRef.current++;
            if (performanceCountRef.current > 3) {
              setDisableCanvas(true);
              return;
            }
          }
        }
      }
      
      timeRef.current += speed * speedMultiplier;
      drawWaveform();
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    
    resizeCanvas();
    animate(0);

    const audioUpdateInterval = isFirefoxBrowser ? null : setInterval(updateAudioData, 100);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioUpdateInterval) clearInterval(audioUpdateInterval);
    };
  }, [waveColor, backgroundColor, enableMouseInteraction, amplitude, frequency, speed, speedMultiplier]); // Remove audioData from deps to prevent constant re-renders

  return (
    <div className={cn("relative w-full h-screen overflow-hidden", className)}>
      {!disableCanvas ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: backgroundColor }}
        />
      ) : (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: `linear-gradient(135deg, ${backgroundColor} 0%, ${waveColor}10 50%, ${backgroundColor} 100%)`,
          }}
        />
      )}
      
      {/* Subtle overlay pattern - disabled for Firefox */}
      {!isFirefoxBrowser && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${waveColor} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      )}
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      
      {/* Premium spotlight effect - simplified for Firefox */}
      {!isFirefoxBrowser ? (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
            delay: 0.5,
          }}
          style={{
            background: `
              radial-gradient(
                ellipse 120% 40% at 50% -10%,
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.08) 25%,
                rgba(255, 255, 255, 0.03) 40%,
                transparent 60%
              ),
              radial-gradient(
                ellipse 80% 30% at 50% 0%,
                rgba(220, 38, 38, 0.08) 0%,
                rgba(220, 38, 38, 0.04) 30%,
                transparent 50%
              )
            `,
            mixBlendMode: 'screen',
          }}
        />
      ) : (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          }}
        />
      )}
      
      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 150% 150% at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
          mixBlendMode: 'multiply',
          opacity: 0.5,
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export default WaveformBackground;
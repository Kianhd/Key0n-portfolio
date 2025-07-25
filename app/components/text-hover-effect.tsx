"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";
import { throttle } from "@/lib/throttle";
import { useThrottledMouseTracking } from "@/app/hooks/useThrottledAnimation";

export const TextHoverEffect = ({
  text,
  duration,
  color,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  color?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const browserOpts = useBrowserOptimizations();

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // Use throttled mouse tracking hook instead of manual throttling
  useThrottledMouseTracking((x: number, y: number) => {
    setCursor({ x, y });
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // This will be automatically throttled by the hook for Firefox
    if (!browserOpts.throttleMouseEvents) {
      setCursor({ x: e.clientX, y: e.clientY });
    }
  }, [browserOpts.throttleMouseEvents]);

  if (browserOpts.reduceSVGEffects || browserOpts.useStaticFallbacks || browserOpts.prefersReducedMotion) {
    return (
      <div className="text-7xl font-bold text-neutral-200 dark:text-neutral-800 font-[helvetica]">
        {text}
      </div>
    );
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="select-none"
    >
      <defs>
        <linearGradient
          id={`textGradient-${text.replace(/\s+/g, '')}`}
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor={color || "#eab308"} />
              <stop offset="25%" stopColor={color || "#ef4444"} />
              <stop offset="50%" stopColor={color || "#3b82f6"} />
              <stop offset="75%" stopColor={color || "#06b6d4"} />
              <stop offset="100%" stopColor={color || "#8b5cf6"} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id={`revealMask-${text.replace(/\s+/g, '')}`}
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`textMask-${text.replace(/\s+/g, '')}`}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#revealMask-${text.replace(/\s+/g, '')})`}
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#textGradient-${text.replace(/\s+/g, '')})`}
        strokeWidth="0.3"
        mask={`url(#textMask-${text.replace(/\s+/g, '')})`}
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

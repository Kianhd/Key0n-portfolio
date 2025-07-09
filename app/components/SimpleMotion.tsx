"use client";

import { motion, MotionProps } from "motion/react";
import { getBrowserOptimizations } from "@/lib/browser-detect";

interface SimpleMotionProps extends MotionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
}

export function SimpleMotion({ children, fallback, tag = "div", ...props }: SimpleMotionProps) {
  const browserOpts = getBrowserOptimizations();
  
  // For Firefox/Zen Browser, use compositor-friendly approach
  if (browserOpts.simplifyFramerMotion || browserOpts.preventLayoutThrashing) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Return element with CSS animation classes instead of JS animations
    const Tag = tag as any;
    const className = `${props.className || ''} animate-fade-in`;
    
    return (
      <Tag 
        className={className}
        style={{ 
          opacity: 1, 
          transform: 'none',
          // Use compositor-friendly properties only
          willChange: 'auto'
        }}
      >
        {children}
      </Tag>
    );
  }
  
  // For other browsers, use optimized Framer Motion
  const MotionTag = motion[tag as keyof typeof motion] as any;
  
  // Optimize props to avoid layout thrashing
  const optimizedProps = {
    ...props,
    // Use only transform/opacity for animations
    style: {
      ...props.style,
      willChange: browserOpts.conservativeWillChange ? 'auto' : props.style?.willChange
    }
  };
  
  return <MotionTag {...optimizedProps}>{children}</MotionTag>;
}

// Specific motion components for common use cases
export function SimpleMotionDiv(props: SimpleMotionProps) {
  return <SimpleMotion tag="div" {...props} />;
}

export function SimpleMotionH1(props: SimpleMotionProps) {
  return <SimpleMotion tag="h1" {...props} />;
}

export function SimpleMotionP(props: SimpleMotionProps) {
  return <SimpleMotion tag="p" {...props} />;
}

export function SimpleMotionSpan(props: SimpleMotionProps) {
  return <SimpleMotion tag="span" {...props} />;
}

export default SimpleMotion;
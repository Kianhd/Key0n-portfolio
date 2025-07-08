import { useEffect, useRef, useCallback } from 'react';
import { createThrottledAnimationFrame, getBrowserOptimizations } from '@/lib/browser-detect';

/**
 * Custom hook for throttled animations optimized for Firefox performance
 * Automatically reduces frame rate to 30fps for Firefox browsers
 */
export function useThrottledAnimation(
  animationCallback: (timestamp: number) => void,
  shouldAnimate: boolean = true
) {
  const animationRef = useRef<number | null>(null);
  const callbackRef = useRef(animationCallback);
  const browserOpts = getBrowserOptimizations();

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = animationCallback;
  }, [animationCallback]);

  const animate = useCallback((timestamp: number) => {
    callbackRef.current(timestamp);
    
    if (shouldAnimate) {
      animationRef.current = createThrottledAnimationFrame(animate);
    }
  }, [shouldAnimate]);

  const startAnimation = useCallback(() => {
    if (shouldAnimate && !animationRef.current) {
      animationRef.current = createThrottledAnimationFrame(animate);
    }
  }, [animate, shouldAnimate]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (shouldAnimate) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return stopAnimation;
  }, [shouldAnimate, startAnimation, stopAnimation]);

  return {
    startAnimation,
    stopAnimation,
    isThrottled: browserOpts.enableFrameThrottling,
    frameRate: browserOpts.targetFrameRate
  };
}

/**
 * Hook for throttled mouse tracking optimized for Firefox
 */
export function useThrottledMouseTracking(
  callback: (x: number, y: number) => void,
  element?: HTMLElement | null
) {
  const browserOpts = getBrowserOptimizations();
  const lastCallTime = useRef(0);
  const throttleDelay = browserOpts.enableFrameThrottling ? 33 : 16; // 30fps vs 60fps

  const throttledCallback = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastCallTime.current >= throttleDelay) {
      lastCallTime.current = now;
      callback(e.clientX, e.clientY);
    }
  }, [callback, throttleDelay]);

  useEffect(() => {
    const target = element || window;
    
    if (browserOpts.throttleMouseEvents) {
      target.addEventListener('mousemove', throttledCallback);
      return () => target.removeEventListener('mousemove', throttledCallback);
    } else {
      // Use normal callback for non-Firefox browsers
      const normalCallback = (e: MouseEvent) => callback(e.clientX, e.clientY);
      target.addEventListener('mousemove', normalCallback);
      return () => target.removeEventListener('mousemove', normalCallback);
    }
  }, [throttledCallback, callback, element, browserOpts.throttleMouseEvents]);
}

/**
 * Hook for performance-optimized scroll animations
 */
export function useThrottledScrollAnimation(
  callback: (scrollY: number) => void
) {
  const browserOpts = getBrowserOptimizations();
  const lastCallTime = useRef(0);
  const throttleDelay = browserOpts.enableFrameThrottling ? 33 : 16;

  const throttledCallback = useCallback(() => {
    const now = Date.now();
    if (now - lastCallTime.current >= throttleDelay) {
      lastCallTime.current = now;
      callback(window.scrollY);
    }
  }, [callback, throttleDelay]);

  useEffect(() => {
    if (browserOpts.enableFrameThrottling) {
      window.addEventListener('scroll', throttledCallback, { passive: true });
      return () => window.removeEventListener('scroll', throttledCallback);
    } else {
      const normalCallback = () => callback(window.scrollY);
      window.addEventListener('scroll', normalCallback, { passive: true });
      return () => window.removeEventListener('scroll', normalCallback);
    }
  }, [throttledCallback, callback, browserOpts.enableFrameThrottling]);
}
import { useEffect, useRef } from 'react';
import { isFirefox, getBrowserOptimizations } from '@/lib/browser-detect';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  lagFrames: number;
}

/**
 * Performance monitoring hook specifically optimized for Firefox debugging
 * Tracks frame rate, frame timing, and performance bottlenecks
 */
export function usePerformanceMonitor(enabled: boolean = process.env.NODE_ENV === 'development') {
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    lagFrames: 0
  });
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const lagThresholdRef = useRef(isFirefox() ? 33 : 16); // 30fps vs 60fps threshold
  
  useEffect(() => {
    if (!enabled) return;
    
    let animationFrameId: number;
    
    const measurePerformance = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      frameCountRef.current++;
      
      // Calculate FPS every second
      if (deltaTime >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
        const avgFrameTime = deltaTime / frameCountRef.current;
        
        metricsRef.current = {
          fps,
          frameTime: avgFrameTime,
          memoryUsage: (performance as any).memory?.usedJSHeapSize,
          lagFrames: metricsRef.current.lagFrames
        };
        
        // Log performance warnings for Firefox
        if (isFirefox()) {
          if (fps < 25) {
            console.warn(`🔥 Firefox Performance Warning: Low FPS detected (${fps}fps)`);
          }
          if (avgFrameTime > lagThresholdRef.current * 2) {
            console.warn(`🔥 Firefox Performance Warning: High frame time (${avgFrameTime.toFixed(2)}ms)`);
          }
        }
        
        // Reset counters
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }
      
      // Track individual lag frames
      if (deltaTime > lagThresholdRef.current * 2) {
        metricsRef.current.lagFrames++;
      }
      
      animationFrameId = requestAnimationFrame(measurePerformance);
    };
    
    animationFrameId = requestAnimationFrame(measurePerformance);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [enabled]);
  
  return {
    metrics: metricsRef.current,
    isFirefox: isFirefox(),
    browserOpts: getBrowserOptimizations()
  };
}

/**
 * Hook to detect and warn about performance bottlenecks
 */
export function usePerformanceWarnings() {
  const browserOpts = getBrowserOptimizations();
  
  useEffect(() => {
    if (!isFirefox()) return;
    
    // Monitor for long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn(`🔥 Firefox Long Task Detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['longtask', 'measure'] });
      } catch (e) {
        // PerformanceObserver not fully supported
      }
      
      return () => observer.disconnect();
    }
  }, []);
  
  useEffect(() => {
    if (!isFirefox()) return;
    
    // Warn about potential performance issues in Firefox
    const warnings = [];
    
    if (document.querySelectorAll('[style*="blur("]').length > 5) {
      warnings.push('Multiple blur effects detected - may cause Firefox lag');
    }
    
    if (document.querySelectorAll('video').length > 2) {
      warnings.push('Multiple videos detected - consider lazy loading');
    }
    
    if (document.querySelectorAll('[class*="animate-"]').length > 10) {
      warnings.push('Many concurrent animations - may impact Firefox performance');
    }
    
    if (warnings.length > 0) {
      console.warn('🔥 Firefox Performance Warnings:', warnings);
    }
  }, []);
  
  return {
    browserOpts,
    recommendations: [
      'Use hardware acceleration (transform: translateZ(0))',
      'Limit concurrent animations',
      'Avoid heavy blur effects',
      'Use will-change sparingly',
      'Optimize video loading'
    ]
  };
}
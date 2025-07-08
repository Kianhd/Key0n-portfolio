export function isFirefox(): boolean {
  if (typeof window === 'undefined') return false;
  return navigator.userAgent.toLowerCase().includes('firefox');
}

export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  return navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLowerCase().includes('chrome');
}

export function getBrowserOptimizations() {
  const firefox = isFirefox();
  const safari = isSafari();
  
  return {
    reduceBlur: firefox || safari,
    disableBackdropFilter: firefox,
    reduceSVGEffects: firefox,
    throttleMouseEvents: firefox,
    reduceParticles: firefox,
    // Firefox-specific performance optimizations - SELECTIVE
    disableComplexAnimations: false, // Keep complex animations, just optimize them
    simplifyFramerMotion: firefox,
    disableCanvasAnimations: false, // Keep canvas, just reduce frequency
    forceHardwareAcceleration: firefox,
    disableFilterAnimations: false, // Only disable animated filters, not static ones
    reduceMotionComplexity: firefox,
    // Only disable heavy blur animations, not essential filters
    disableHeavyBlurAnimations: firefox,
    // Specifically disable blur transitions that get stuck in Firefox
    disableBlurTransitions: firefox,
    // Enhanced Firefox Motion optimizations
    useSimpleEasing: firefox, // Use linear/ease instead of complex bezier curves
    reduceConcurrentAnimations: firefox, // Limit simultaneous animations
    // Frame rate optimization
    targetFrameRate: firefox ? 30 : 60, // Limit Firefox to 30fps
    enableFrameThrottling: firefox,
    disableFilterStacking: safari,
    useSimpleHover: safari,
    avoidFilterAnimations: safari,
    reduceSafariBlur: safari,
    disableSafariBackdrop: safari,
    limitGlowLayers: safari,
  };
}

// Frame rate throttling utilities
export function getFrameRateLimit(): number {
  if (isFirefox()) return 30; // 30fps for Firefox
  return 60; // 60fps for other browsers
}

export function createThrottledAnimationFrame(callback: FrameRequestCallback): number {
  if (isFirefox()) {
    // Throttle to 30fps for Firefox (33.33ms interval)
    const targetInterval = 1000 / 30;
    let lastTime = 0;
    
    const throttledCallback = (currentTime: number) => {
      if (currentTime - lastTime >= targetInterval) {
        lastTime = currentTime;
        callback(currentTime);
      } else {
        requestAnimationFrame(throttledCallback);
      }
    };
    
    return requestAnimationFrame(throttledCallback);
  }
  
  // Normal requestAnimationFrame for other browsers
  return requestAnimationFrame(callback);
}
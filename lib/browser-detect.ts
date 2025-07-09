export function isFirefox(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent.toLowerCase();
  // Detect Firefox, Zen Browser, and other Firefox-based browsers
  return userAgent.includes('firefox') || 
         userAgent.includes('zen/') ||
         userAgent.includes('gecko/') && !userAgent.includes('webkit');
}

export function isZenBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('zen/') || userAgent.includes('zen browser');
}

export function isPrivacyFocusedBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent.toLowerCase();
  // Detect privacy-focused browsers that typically have reduced hardware acceleration
  return userAgent.includes('zen/') || 
         userAgent.includes('librewolf') ||
         userAgent.includes('tor browser') ||
         (userAgent.includes('firefox') && userAgent.includes('resist'));
}

export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  return navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLowerCase().includes('chrome');
}

export function getBrowserOptimizations() {
  // Only run browser detection on client-side to prevent hydration mismatches
  if (typeof window === 'undefined') {
    // Server-side fallback - return safe defaults
    return {
      reduceBlur: false,
      disableBackdropFilter: false,
      reduceSVGEffects: false,
      throttleMouseEvents: false,
      reduceParticles: false,
      disableComplexAnimations: false,
      simplifyFramerMotion: false,
      disableCanvasAnimations: false,
      forceHardwareAcceleration: false,
      disableFilterAnimations: false,
      reduceMotionComplexity: false,
      disableHeavyBlurAnimations: false,
      disableBlurTransitions: false,
      disableVideoBackgrounds: false,
      useStaticFallbacks: false,
      disableParallax: false,
      limitLayerCreation: false,
      disableTransform3D: false,
      useCSSAnimationsOnly: false,
      useSimpleEasing: false,
      reduceConcurrentAnimations: false,
      targetFrameRate: 60,
      enableFrameThrottling: false,
      disableFilterStacking: false,
      useSimpleHover: false,
      avoidFilterAnimations: false,
      reduceSafariBlur: false,
      disableSafariBackdrop: false,
      limitGlowLayers: false,
      useCompositorAnimations: false,
      preventLayoutThrashing: false,
      conservativeWillChange: false,
      replaceBackdropBlur: false,
      disableInfiniteAnimations: false,
      useRequestIdleCallback: false,
      avoidTransform3d: false,
      prefersReducedMotion: false,
      isZenBrowser: false,
      isPrivacyFocused: false,
    };
  }

  const firefox = isFirefox();
  const safari = isSafari();
  const zen = isZenBrowser();
  const privacyFocused = isPrivacyFocusedBrowser();
  
  // Check for reduced motion preference - only on client
  const prefersReducedMotion = window.matchMedia && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    // Basic browser optimizations
    reduceBlur: firefox || safari,
    disableBackdropFilter: firefox || zen,
    reduceSVGEffects: firefox || zen,
    throttleMouseEvents: firefox || zen,
    reduceParticles: firefox || zen,
    
    // Enhanced Zen Browser optimizations
    disableComplexAnimations: zen || privacyFocused || prefersReducedMotion,
    simplifyFramerMotion: firefox || zen,
    disableCanvasAnimations: firefox || zen || privacyFocused,
    forceHardwareAcceleration: false, // Don't force - Zen may have it disabled for privacy
    disableFilterAnimations: firefox || zen,
    reduceMotionComplexity: firefox || zen || prefersReducedMotion,
    disableHeavyBlurAnimations: firefox || zen,
    disableBlurTransitions: firefox || zen,
    
    // Zen-specific aggressive optimizations
    disableVideoBackgrounds: zen || privacyFocused,
    useStaticFallbacks: zen || privacyFocused || prefersReducedMotion,
    disableParallax: zen || privacyFocused || prefersReducedMotion,
    limitLayerCreation: zen || privacyFocused,
    disableTransform3D: zen || privacyFocused,
    useCSSAnimationsOnly: zen || privacyFocused,
    
    // Performance settings
    useSimpleEasing: firefox || zen,
    reduceConcurrentAnimations: firefox || zen || prefersReducedMotion,
    targetFrameRate: zen ? 24 : firefox ? 30 : 60, // Even lower for Zen
    enableFrameThrottling: firefox || zen,
    
    // Safari optimizations
    disableFilterStacking: safari,
    useSimpleHover: safari,
    avoidFilterAnimations: safari,
    reduceSafariBlur: safari,
    disableSafariBackdrop: safari,
    limitGlowLayers: safari,
    
    // Advanced optimizations
    useCompositorAnimations: firefox || zen,
    preventLayoutThrashing: firefox || zen,
    conservativeWillChange: firefox || zen,
    replaceBackdropBlur: firefox || zen,
    disableInfiniteAnimations: zen || privacyFocused || prefersReducedMotion,
    useRequestIdleCallback: firefox || zen,
    avoidTransform3d: firefox || zen,
    
    // User preference respect
    prefersReducedMotion,
    isZenBrowser: zen,
    isPrivacyFocused: privacyFocused,
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
'use client';

import { useEffect, useState } from 'react';
import { getBrowserOptimizations } from '@/lib/browser-detect';

export function useBrowserOptimizations() {
  const [browserOpts, setBrowserOpts] = useState(() => getBrowserOptimizations());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Only run after hydration to prevent mismatches
    setIsHydrated(true);
    setBrowserOpts(getBrowserOptimizations());
  }, []);

  // Return safe defaults during SSR and before hydration
  return isHydrated ? browserOpts : {
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
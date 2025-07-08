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
    // Safari-specific optimizations
    disableFilterStacking: safari,
    useSimpleHover: safari,
    avoidFilterAnimations: safari,
    reduceSafariBlur: safari,
    disableSafariBackdrop: safari,
    limitGlowLayers: safari,
  };
}
"use client";

import { useEffect } from 'react';

export default function DynamicFavicon() {
  useEffect(() => {
    const setFavicon = (isDark: boolean) => {
      // Remove existing favicon links
      const existingIcons = document.querySelectorAll('link[rel*="icon"]:not([rel*="apple"])');
      existingIcons.forEach(icon => {
        if (icon.getAttribute('href')?.includes('favicon')) {
          icon.remove();
        }
      });

      // Create new favicon link with cache busting
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.sizes = '32x32';
      const timestamp = Date.now();
      favicon.href = isDark 
        ? `/favicons/favicon-white.png?v=${timestamp}` 
        : `/favicons/favicon-black.png?v=${timestamp}`;
      
      document.head.appendChild(favicon);
      
      // Force browser to update favicon
      const link = document.querySelector('link[rel*="icon"][href*="favicon"]') as HTMLLinkElement;
      if (link) {
        document.head.removeChild(link);
        document.head.appendChild(link);
      }
    };

    // Function to check color scheme preference
    const checkColorScheme = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('Color scheme detected:', isDark ? 'dark' : 'light');
      console.log('Setting favicon to:', isDark ? 'white' : 'black');
      setFavicon(isDark);
    };

    // Initial check
    checkColorScheme();

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setFavicon(e.matches);
    };

    // Add event listener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
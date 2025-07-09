'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useActiveSection() {
  const pathname = usePathname();
  // Initialize with safe default to prevent hydration mismatch
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated and set initial state
    setIsHydrated(true);
    
    // Handle route-based navigation (e.g., /beats)
    if (pathname === '/beats') {
      setActiveSection('beats');
      return;
    }

    // Handle section-based navigation on main page
    if (pathname === '/') {
      const sections = ['home', 'about', 'work', 'contact']; // Fixed order to match navigation
      
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // Trigger when section is in upper 30% of viewport
        threshold: 0
      };

      const observerCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id || 'home';
            setActiveSection(sectionId);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      // Observe all sections including home
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.observe(element);
        }
      });

      // Set initial active section based on scroll position or hash
      const checkInitialSection = () => {
        // Check if there's a hash in the URL
        const hash = window.location.hash.slice(1);
        if (hash && sections.includes(hash)) {
          setActiveSection(hash);
        } else {
          // Default to home if at top of page
          const scrollPosition = window.scrollY;
          if (scrollPosition < 100) {
            setActiveSection('home');
          }
        }
      };
      
      // Run check after a brief delay to ensure DOM is ready
      setTimeout(checkInitialSection, 0);

      return () => {
        observer.disconnect();
      };
    }
  }, [pathname]);

  // Return safe default until hydrated to prevent mismatches
  return isHydrated ? activeSection : 'home';
}
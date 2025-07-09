import React, { useState, useEffect } from "react";
import { useSwiper } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Get total number of slides
  const totalSlides = swiper.slides?.length || 0;

  useEffect(() => {
    const updateNavigation = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    // Initial check
    updateNavigation();

    // Listen for slide changes
    swiper.on('slideChange', updateNavigation);
    swiper.on('reachBeginning', () => setIsBeginning(true));
    swiper.on('reachEnd', () => setIsEnd(true));
    swiper.on('fromEdge', updateNavigation);

    return () => {
      swiper.off('slideChange', updateNavigation);
      swiper.off('reachBeginning');
      swiper.off('reachEnd');
      swiper.off('fromEdge', updateNavigation);
    };
  }, [swiper]);

  // Don't render buttons if there's only one slide
  if (totalSlides <= 1) {
    return null;
  }

  return (
    <>
      {/* Previous Button */}
      <button
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 backdrop-blur-sm border rounded-full transition-all duration-300 flex items-center justify-center group ${
          isBeginning 
            ? 'bg-background/40 border-border/50 text-foreground/30 cursor-not-allowed' 
            : 'bg-background/80 border-border text-foreground hover:bg-background/90 hover:border-foreground/40'
        }`}
        onClick={() => !isBeginning && swiper.slidePrev()}
        disabled={isBeginning}
        aria-label="Previous video"
      >
        <svg 
          className={`w-5 h-5 transition-transform ${!isBeginning ? 'group-hover:-translate-x-0.5' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 backdrop-blur-sm border rounded-full transition-all duration-300 flex items-center justify-center group ${
          isEnd 
            ? 'bg-background/40 border-border/50 text-foreground/30 cursor-not-allowed' 
            : 'bg-background/80 border-border text-foreground hover:bg-background/90 hover:border-foreground/40'
        }`}
        onClick={() => !isEnd && swiper.slideNext()}
        disabled={isEnd}
        aria-label="Next video"
      >
        <svg 
          className={`w-5 h-5 transition-transform ${!isEnd ? 'group-hover:translate-x-0.5' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </button>
    </>
  );
};

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import VideoPlayer from './VideoPlayer';

interface Video {
  id: string;
  videoFile?: string;
  videoUrl: string;
  thumbnail?: string;
}

interface VideoCarouselProps {
  videos: Video[];
  onVideoClick?: (video: Video) => void;
  autoSlide?: boolean;
  className?: string;
}

export default function VideoCarousel({ 
  videos, 
  onVideoClick, 
  autoSlide = true,
  className = ""
}: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlide && !isHovered && videos.length > 1) {
      autoSlideRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [currentIndex, isHovered, autoSlide, videos.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false); // Reset play state when changing videos
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false); // Reset play state when changing videos
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsPlaying(false); // Reset play state when changing videos
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        handlePrev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        handleNext();
        break;
    }
  };


  // Swipe handling with better mobile sensitivity
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 50; // Lower threshold for mobile
    const velocity = Math.abs(info.velocity.x);
    
    // Consider both distance and velocity for better mobile experience
    if (info.offset.x > threshold || (velocity > 500 && info.offset.x > 20)) {
      handlePrev();
    } else if (info.offset.x < -threshold || (velocity > 500 && info.offset.x < -20)) {
      handleNext();
    }
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Subtle accent glow - simplified */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(250, 250, 250, 0.02) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
      
      {/* Main video container */}
      <div 
        className="relative aspect-video rounded-lg overflow-hidden bg-card border border-border group z-10 focus-within:ring-2 focus-within:ring-foreground/20 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={`Video carousel, ${currentIndex + 1} of ${videos.length}`}
      >
      {/* Main Video Display */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            {currentVideo.videoFile && (
              <VideoPlayer
                src={currentVideo.videoFile}
                poster={currentVideo.thumbnail}
                className="w-full h-full"
                showControls={true}
                autoPlay={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false);
                  // Auto-advance to next video if available
                  if (videos.length > 1) {
                    setTimeout(() => handleNext(), 1000);
                  }
                }}
                onError={(e) => {
                  console.error('Video load error:', e);
                  console.error('Video URL:', currentVideo.videoFile);
                  console.error('Thumbnail URL:', currentVideo.thumbnail);
                }}
              />
            )}
            {!currentVideo.videoFile && currentVideo.thumbnail && (
              <img 
                src={currentVideo.thumbnail} 
                alt={`Video ${currentIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {videos.length > 1 && (
          <>
            <motion.button
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground border border-foreground/20 transition-all duration-300 z-10 cursor-pointer touch-manipulation"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              onMouseEnter={(e) => e.stopPropagation()}
              onMouseLeave={() => {}}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isHovered || (typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 0, x: isHovered || (typeof window !== 'undefined' && window.innerWidth < 768) ? 0 : -20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground border border-foreground/20 transition-all duration-300 z-10 cursor-pointer touch-manipulation"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              onMouseEnter={(e) => e.stopPropagation()}
              onMouseLeave={() => {}}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered || (typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 0, x: isHovered || (typeof window !== 'undefined' && window.innerWidth < 768) ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}

      </div>

      {/* Dot Navigation */}
      {videos.length > 1 && (
        <motion.div 
          className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {videos.map((video, index) => (
            <motion.button
              key={video.id}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border transition-all duration-300 cursor-pointer touch-manipulation ${
                index === currentIndex 
                  ? 'bg-foreground border-foreground' 
                  : 'bg-transparent border-foreground/30 hover:border-foreground/60'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </motion.div>
      )}

      {/* Video Counter */}
      {videos.length > 1 && (
        <motion.div 
          className="absolute top-4 right-4 glass-dark rounded-full px-3 py-1 text-sm font-usb-club"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {currentIndex + 1}/{videos.length}
        </motion.div>
      )}
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import VideoPlayer from "./VideoPlayer";


interface Video {
  id: string;
  videoFile?: string;
  videoUrl: string;
  thumbnail?: string;
}

interface VideoCarouselProps {
  videos: Video[];
  className?: string;
}

export default function VideoCarousel({
  videos,
  className = "",
}: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [togglePlayPause, setTogglePlayPause] = useState<(() => void) | null>(
    null
  );
  const [mobileControlsData, setMobileControlsData] = useState<any>(null);


  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    // Pause current video before changing
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setDirection(1);
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    // Pause current video before changing
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setDirection(-1);
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleDotClick = (index: number) => {
    // Pause current video before changing
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setDirection(index > currentIndex ? 1 : -1);
    setIsPlaying(false);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        handlePrev();
        break;
      case "ArrowRight":
        event.preventDefault();
        handleNext();
        break;
    }
  };

  // Swipe handling with better mobile sensitivity
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold =
      typeof window !== "undefined" && (('ontouchstart' in window || navigator.maxTouchPoints > 0) && (window.innerWidth <= 768 || window.innerHeight <= 768)) ? 30 : 50; // Lower threshold for mobile
    const velocity = Math.abs(info.velocity.x);

    // Consider both distance and velocity for better mobile experience
    if (info.offset.x > threshold || (velocity > 500 && info.offset.x > 20)) {
      handlePrev();
    } else if (
      info.offset.x < -threshold ||
      (velocity > 500 && info.offset.x < -20)
    ) {
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
            background:
              "radial-gradient(circle at center, rgba(250, 250, 250, 0.02) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Main video container */}
      <div
        className="relative aspect-video rounded-lg bg-card border border-border group z-10 focus-within:ring-2 focus-within:ring-foreground/20 transition-all duration-300"
        onMouseEnter={() => {
          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = setTimeout(() => setIsHovered(false), 100);
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={`Video carousel, ${currentIndex + 1} of ${videos.length}`}
      >
        {/* Main Video Display */}
        <div className="relative w-full h-full bg-card rounded-lg">
          <div className="absolute inset-0 w-full h-full">
            {currentVideo.videoFile && (
              <VideoPlayer
                key={`${currentVideo.id}-${currentIndex}`}
                src={currentVideo.videoFile}
                poster={currentVideo.thumbnail}
                className="w-full h-full bg-card"
                showControls={true}
                autoPlay={!isUnmuted}
                muted={!isUnmuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onUnmute={() => {
                  // Callback when unmuted
                }}
                onTogglePlayPause={(toggleFn) =>
                  setTogglePlayPause(() => toggleFn)
                }
                onMobileControlsChange={(controlsData) => {
                  setMobileControlsData(controlsData);
                }}
                onEnded={() => {
                  setIsPlaying(false);
                }}
                onError={(e) => {
                  console.error("Video load error:", e);
                  console.error("Video URL:", currentVideo.videoFile);
                  console.error("Thumbnail URL:", currentVideo.thumbnail);
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
          </div>

          {/* Center Unmute Button */}
          {!isUnmuted && (
            <motion.button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 transition-all duration-300 z-20 cursor-pointer"
              onClick={() => {
                setIsUnmuted(true);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.9)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Unmute and replay video"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.764L4.394 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.394l3.989-3.764a1 1 0 011.626.076zM12.22 6.22a.75.75 0 011.06 0L15 7.94l1.72-1.72a.75.75 0 111.06 1.06L16.06 9l1.72 1.72a.75.75 0 11-1.06 1.06L15 10.06l-1.72 1.72a.75.75 0 11-1.06-1.06L13.94 9l-1.72-1.72a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          )}

          {/* Center Play/Pause Button (shown after unmuting) - Hidden on mobile */}
          {isUnmuted && !(typeof window !== "undefined" && (('ontouchstart' in window || navigator.maxTouchPoints > 0) && (window.innerWidth <= 768 || window.innerHeight <= 768))) && (
            <motion.button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 transition-all duration-300 z-20 cursor-pointer opacity-0 group-hover:opacity-100"
              onClick={() => {
                if (togglePlayPause) {
                  togglePlayPause();
                }
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.5 3.5A1.5 1.5 0 017 2h.5a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 017.5 18H7a1.5 1.5 0 01-1.5-1.5v-13zM11.5 3.5A1.5 1.5 0 0113 2h.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5v-13z" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              )}
            </motion.button>
          )}

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
                animate={{
                  opacity:
                    isHovered ||
                    (typeof window !== "undefined" && (('ontouchstart' in window || navigator.maxTouchPoints > 0) && (window.innerWidth <= 768 || window.innerHeight <= 768)))
                      ? 1
                      : 0,
                  x:
                    isHovered ||
                    (typeof window !== "undefined" && (('ontouchstart' in window || navigator.maxTouchPoints > 0) && (window.innerWidth <= 768 || window.innerHeight <= 768)))
                      ? 0
                      : -20,
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
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
                animate={{
                  opacity:
                    isHovered ||
                    (typeof window !== "undefined" && (('ontouchstart' in window || navigator.maxTouchPoints > 0) && (window.innerWidth <= 768 || window.innerHeight <= 768)))
                      ? 1
                      : 0,
                  x:
                    isHovered ||
                    (typeof window !== "undefined" && (('ontouchstart' in window || navigator.maxTouchPoints > 0) && (window.innerWidth <= 768 || window.innerHeight <= 768)))
                      ? 0
                      : 20,
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
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
              </motion.button>
            </>
          )}
        </div>

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

      {/* Dot Navigation - Outside video container */}
      {videos.length > 1 && (
        <motion.div
          className="flex justify-center mt-4 gap-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {videos.map((video, index) => (
            <motion.button
              key={video.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${
                index === currentIndex
                  ? "bg-foreground"
                  : "bg-foreground/30 hover:bg-foreground/60"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </motion.div>
      )}

      {/* Premium Mobile Video Player - Netflix/YouTube Premium Inspired - Hidden when using native controls */}
      {mobileControlsData && mobileControlsData.isMobile && mobileControlsData.hasBeenUnmuted && !mobileControlsData.isFullscreen && false && (
        <div className="relative">
          {/* Ultra-Thin Progress Line - Modern Separation */}
          <div 
            className={`mb-3 transition-all duration-300 ease-out ${mobileControlsData.showControls ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: mobileControlsData.showControls ? 'translateY(0)' : 'translateY(8px)'
            }}
          >
            <div className="relative h-1 bg-white/30 backdrop-blur-sm rounded-full overflow-hidden">
              {/* Progress Fill with Premium Gradient */}
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-foreground via-foreground/95 to-foreground/90 transition-all duration-200 ease-out rounded-full"
                style={{
                  width: `${mobileControlsData.duration ? (mobileControlsData.currentTime / mobileControlsData.duration) * 100 : 0}%`,
                  boxShadow: '0 0 16px rgba(250, 250, 250, 0.5)'
                }}
              />
              
              {/* Interactive Touch Zone */}
              <div 
                className="absolute inset-0 cursor-pointer touch-manipulation"
                style={{ minHeight: '46px', marginTop: '-22px', marginBottom: '-22px' }}
                onTouchStart={(e) => {
                  if (!mobileControlsData.showControls) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  const percentage = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
                  const newTime = percentage * (mobileControlsData.duration || 0);
                  mobileControlsData.handleSeek(newTime);
                }}
              />
            </div>
          </div>

          {/* Glassmorphism Control Bar - Premium Design */}
          <div 
            className={`bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 mx-2 shadow-2xl transition-all duration-300 ease-out ${
              mobileControlsData.showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="flex items-center justify-between">
              
              {/* Primary Control - Play/Pause */}
              <button
                onClick={(e) => {
                  if (!mobileControlsData.showControls) return;
                  e.stopPropagation();
                  mobileControlsData.togglePlayPause();
                }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-200 touch-manipulation"
                style={{ minWidth: '46px', minHeight: '46px' }}
                aria-label={mobileControlsData.isPlaying ? "Pause video" : "Play video"}
              >
                {mobileControlsData.isPlaying ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 3.5A1.5 1.5 0 017 2h.5a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 017.5 18H7a1.5 1.5 0 01-1.5-1.5v-13zM11.5 3.5A1.5 1.5 0 0113 2h.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5v-13z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                )}
              </button>

              {/* Time Display - Netflix Style */}
              <div className="text-sm text-white/90 font-mono tracking-wide px-3 py-1 rounded-lg bg-black/20">
                {mobileControlsData.formatTime(mobileControlsData.currentTime)} / {mobileControlsData.formatTime(mobileControlsData.duration)}
              </div>

              {/* Fullscreen Control */}
              <button
                onClick={(e) => {
                  if (!mobileControlsData.showControls) return;
                  e.stopPropagation();
                  mobileControlsData.toggleFullscreen();
                }}
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-all duration-200 touch-manipulation"
                style={{ minWidth: '46px', minHeight: '46px' }}
                aria-label={mobileControlsData.isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {mobileControlsData.isFullscreen ? (
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

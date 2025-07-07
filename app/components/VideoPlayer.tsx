'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (e: any) => void;
  className?: string;
  showControls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  onUnmute?: () => void;
  onTogglePlayPause?: (toggleFn: () => void) => void;
  onMobileControlsChange?: (controlsData: {
    showControls: boolean;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;
    isFullscreen: boolean;
    hasBeenUnmuted: boolean;
    isMobile: boolean;
    togglePlayPause: () => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
    handleSeek: (time: number) => void;
    formatTime: (time: number) => string;
  }) => void;
}

export default function VideoPlayer({
  src,
  poster,
  onPlay,
  onPause,
  onEnded,
  onError,
  className = '',
  showControls = true,
  autoPlay = false,
  muted = false,
  onUnmute,
  onTogglePlayPause,
  onMobileControlsChange
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [lastTouchX, setLastTouchX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [showSeekFeedback, setShowSeekFeedback] = useState<{show: boolean, direction: 'forward' | 'backward', time: number}>({show: false, direction: 'forward', time: 0});
  const [showVolumeIndicator, setShowVolumeIndicator] = useState(false);
  const [showBrightnessIndicator, setShowBrightnessIndicator] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to detect mobile devices properly
  const isMobileDevice = () => {
    if (typeof window === "undefined") return false;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768 || window.innerHeight <= 768;
    return isTouchDevice && isSmallScreen;
  };

  // Mobile detection and fullscreen handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    const checkMobileWithDelay = () => {
      // Add small delay for orientation changes to ensure proper dimensions
      setTimeout(checkMobile, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobileWithDelay);
    
    // Fullscreen change listener
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobileWithDelay);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Only reset states when src actually changes, not on every render
    const currentSrc = video.src;
    if (currentSrc !== src) {
      setIsLoading(true);
      setLoadError(false);
      setCurrentTime(0);
      setDuration(0);
      setLoadProgress(0);
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded:', video.src);
      setDuration(video.duration);
      video.volume = volume;
      setIsLoading(false);
      
      // Check if video is vertical (portrait)
      const aspectRatio = video.videoWidth / video.videoHeight;
      setIsVertical(aspectRatio < 1);
      console.log('Video aspect ratio:', aspectRatio, 'Is vertical:', aspectRatio < 1);
    };
    
    const handleLoadStart = () => {
      console.log('Video loading started:', video.src);
      // Only show loading if video is not already loaded
      if (video.readyState < 2) {
        setIsLoading(true);
      }
      setLoadError(false);
      
      // Set a timeout for loading - if video doesn't load in 30 seconds, show error
      // Increased timeout for larger video files
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = setTimeout(() => {
        // Use video.readyState to check if video is still loading instead of stale isLoading state
        if (video.readyState === 0 || video.readyState === 1) {
          console.error('Video loading timeout after 30s');
          setIsLoading(false);
          setLoadError(true);
        }
      }, 30000); // Increased from 10s to 30s
    };
    
    const handleCanPlay = () => {
      console.log('Video can play:', video.src);
      console.log('Video ready state:', video.readyState);
      setIsLoading(false);
      setLoadError(false);
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
    
    const handleLoadedData = () => {
      console.log('Video data loaded:', video.src);
      setIsLoading(false);
      setLoadError(false);
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
    
    const handleError = (e: Event) => {
      console.error('Video error event:', e);
      console.error('Video src:', video.src);
      console.error('Video error details:', video.error);
      console.error('Video ready state:', video.readyState);
      setIsLoading(false);
      setLoadError(true);
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      onError?.(e);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleProgress = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setLoadProgress((bufferedEnd / duration) * 100);
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('error', handleError);
    video.addEventListener('progress', handleProgress);

    return () => {
      // Clean up timeouts on unmount
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
      if (mobileControlsTimeoutRef.current) clearTimeout(mobileControlsTimeoutRef.current);
      
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('error', handleError);
      video.removeEventListener('progress', handleProgress);
    };
  }, [volume, onPlay, onPause, onEnded, src]);

  // Mobile touch controls auto-hide
  const showMobileControlsTemporary = () => {
    if (!isMobile) return;
    
    setShowMobileControls(true);
    
    if (mobileControlsTimeoutRef.current) {
      clearTimeout(mobileControlsTimeoutRef.current);
    }
    
    mobileControlsTimeoutRef.current = setTimeout(() => {
      setShowMobileControls(false);
    }, 3000);
  };

  // Enhanced mobile touch handler with industry-standard gestures
  const handleMobileTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setLastTouchX(touch.clientX);
    setTouchStartY(touch.clientY);
  };

  const handleMobileTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const now = Date.now();
    const timeDiff = now - lastTouchTime;
    const touchX = touch.clientX;
    const containerWidth = containerRef.current?.clientWidth || 0;
    
    // Only handle touch if video has been unmuted
    if (!hasBeenUnmuted) {
      setLastTouchTime(now);
      setLastTouchX(touchX);
      return;
    }

    // Don't handle gestures if touch is on a button area and controls are visible
    const target = e.target as Element;
    if (showMobileControls && (target.closest('button') || target.closest('input'))) {
      setLastTouchTime(now);
      setLastTouchX(touchX);
      return;
    }

    // Double tap detection with left/right zones for seek
    if (timeDiff < 300 && Math.abs(touchX - lastTouchX) < 50) {
      const isLeftSide = touchX < containerWidth * 0.3;
      const isRightSide = touchX > containerWidth * 0.7;
      
      if (isLeftSide || isRightSide) {
        // Double tap seek: -10s on left, +10s on right (YouTube style)
        const seekDirection = isLeftSide ? 'backward' : 'forward';
        const seekAmount = isLeftSide ? -10 : 10;
        
        const video = videoRef.current;
        if (video) {
          const newTime = Math.max(0, Math.min(video.currentTime + seekAmount, duration || 0));
          video.currentTime = newTime;
          
          // Show seek feedback
          setShowSeekFeedback({
            show: true,
            direction: seekDirection,
            time: Math.abs(seekAmount)
          });
          
          setTimeout(() => {
            setShowSeekFeedback({show: false, direction: 'forward', time: 0});
          }, 1000);
        }
      } else {
        // Center double tap = fullscreen
        toggleFullscreen();
      }
    } else {
      // Single tap to show/hide controls
      // In fullscreen mode, only toggle controls if tapping on video area (not on control elements)
      if (isFullscreen) {
        const target = e.target as Element;
        const isControlElement = target.closest('button') || 
                                target.closest('.mobile-controls-container') || 
                                target.closest('.mobile-control-bar') ||
                                target.closest('[class*="control"]') || 
                                target.closest('[class*="progress"]');
        
        // Only toggle controls if NOT clicking on control elements
        if (!isControlElement) {
          if (showMobileControls) {
            setShowMobileControls(false);
            if (mobileControlsTimeoutRef.current) {
              clearTimeout(mobileControlsTimeoutRef.current);
            }
          } else {
            showMobileControlsTemporary();
          }
        }
      } else {
        // Non-fullscreen mode: normal behavior
        if (showMobileControls) {
          setShowMobileControls(false);
          if (mobileControlsTimeoutRef.current) {
            clearTimeout(mobileControlsTimeoutRef.current);
          }
        } else {
          showMobileControlsTemporary();
        }
      }
    }
    
    setLastTouchTime(now);
    setLastTouchX(touchX);
  };

  // Removed volume and brightness control via vertical swipe for mobile

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Handle unmute and replay (only on initial unmute)
  const [hasBeenUnmuted, setHasBeenUnmuted] = useState(false);
  
  useEffect(() => {
    if (onUnmute && !muted && !hasBeenUnmuted && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.play();
      setHasBeenUnmuted(true);
      
      // Show mobile controls immediately when unmuted with a slight delay
      if (isMobile) {
        setTimeout(() => {
          showMobileControlsTemporary();
        }, 100);
      }
    }
  }, [muted, onUnmute, hasBeenUnmuted, isMobile]);

  // Additional effect to handle when muted state changes to false (unmute)
  useEffect(() => {
    if (!muted && hasBeenUnmuted && isMobile) {
      // Ensure controls show when video is unmuted
      setTimeout(() => {
        showMobileControlsTemporary();
      }, 100);
    }
  }, [muted, hasBeenUnmuted, isMobile]);

  // Reset hasBeenUnmuted when src changes (new video)
  useEffect(() => {
    setHasBeenUnmuted(false);
    setShowMobileControls(false);
  }, [src]);

  // Notify parent about mobile controls state changes
  useEffect(() => {
    if (onMobileControlsChange && isMobile) {
      onMobileControlsChange({
        showControls: showMobileControls,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isFullscreen,
        hasBeenUnmuted,
        isMobile,
        togglePlayPause,
        toggleMute,
        toggleFullscreen,
        handleSeek,
        formatTime
      });
    }
  }, [showMobileControls, isPlaying, currentTime, duration, volume, isMuted, isFullscreen, hasBeenUnmuted, isMobile, onMobileControlsChange]);

  // Expose toggle play/pause function to parent
  useEffect(() => {
    if (onTogglePlayPause) {
      onTogglePlayPause(togglePlayPause);
    }
  }, [onTogglePlayPause]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
    
    // Keep volume slider visible for a bit after change
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 2000);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSeek = (newTime: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative group ${isVertical ? 'bg-background/40' : 'bg-card'} ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}
      onTouchStart={isMobile ? handleMobileTouchStart : undefined}
      onTouchEnd={isMobile ? handleMobileTouchEnd : undefined}
      onTouchMove={undefined}
      onClick={!isMobile ? undefined : (e) => e.preventDefault()}
      style={{
        filter: `brightness(${brightness})`
      }}
    >
      {/* Subtle gradient for vertical videos */}
      {isVertical && (
        <div className="absolute inset-0 bg-gradient-to-br from-card/30 via-transparent to-card/30 pointer-events-none" />
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full transition-all duration-300 object-contain bg-transparent"
        playsInline
        autoPlay={autoPlay}
        muted={muted}
        onError={onError}
        controls={isMobile && hasBeenUnmuted}
      />

      {/* Loading Spinner with Progress */}
      {isLoading && !loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-border border-t-foreground/40 rounded-full animate-spin mb-3" />
          {loadProgress > 0 && (
            <div className="w-32 h-1 bg-border/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-foreground/60 transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          )}
          <p className="text-xs text-muted mt-2">Loading video...</p>
        </div>
      )}
      
      {/* Error State */}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm text-foreground">
          <svg className="w-12 h-12 mb-3 text-muted/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-small text-muted text-center px-4 mb-4">Unable to load video</p>
          <button 
            onClick={() => {
              setLoadError(false);
              setIsLoading(true);
              videoRef.current?.load();
            }}
            className="px-4 py-2 border border-border hover:border-foreground/40 bg-card hover:bg-card-hover rounded-sm text-small transition-all duration-300 uppercase tracking-wide"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Desktop Controls - only show after unmuting */}
      {showControls && !isLoading && !muted && !isMobile && (
        <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

          {/* Center Play/Pause Button */}
          <motion.button
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-card/80 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center text-foreground/90 hover:bg-card hover:border-foreground/30 transition-all duration-300"
            onClick={togglePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 3.5A1.5 1.5 0 017 2h.5a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 017.5 18H7a1.5 1.5 0 01-1.5-1.5v-13zM11.5 3.5A1.5 1.5 0 0113 2h.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5v-13z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            )}
          </motion.button>

          {/* Bottom Controls */}
          <div className="relative z-10 p-4 bg-background/40 backdrop-blur-sm border-t border-border/30">
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="w-full h-0.5 bg-border rounded-full appearance-none cursor-pointer transition-all duration-200 hover:h-1"
                style={{
                  background: `linear-gradient(to right, var(--color-foreground) 0%, var(--color-foreground) ${duration ? (currentTime / duration) * 100 : 0}%, var(--color-border) ${duration ? (currentTime / duration) * 100 : 0}%, var(--color-border) 100%)`
                }}
              />
            </div>

            {/* Control Bar */}
            <div className="flex items-center justify-between text-foreground/90">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlayPause}
                  className="w-7 h-7 flex items-center justify-center hover:text-foreground transition-colors duration-200"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.5 3.5A1.5 1.5 0 017 2h.5a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 017.5 18H7a1.5 1.5 0 01-1.5-1.5v-13zM11.5 3.5A1.5 1.5 0 0113 2h.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5v-13z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  )}
                </button>

                {/* Volume Control */}
                <div 
                  className="flex items-center gap-3"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => {
                    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
                    volumeTimeoutRef.current = setTimeout(() => setShowVolumeSlider(false), 1000);
                  }}
                >
                  <button
                    onClick={toggleMute}
                    className="w-6 h-6 flex items-center justify-center hover:text-foreground transition-colors duration-200"
                  >
                    {isMuted || volume === 0 ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.764L4.394 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.394l3.989-3.764a1 1 0 011.626.076zM12.22 6.22a.75.75 0 011.06 0L15 7.94l1.72-1.72a.75.75 0 111.06 1.06L16.06 9l1.72 1.72a.75.75 0 11-1.06 1.06L15 10.06l-1.72 1.72a.75.75 0 11-1.06-1.06L13.94 9l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.764L4.394 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.394l3.989-3.764a1 1 0 011.626.076zM12 8a1 1 0 011 1v2a1 1 0 11-2 0V9a1 1 0 011-1zM14 7a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1zM16 6a1 1 0 011 1v6a1 1 0 11-2 0V7a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {showVolumeSlider && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '70px' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-[70px] h-0.5 bg-border rounded-full appearance-none cursor-pointer transition-all duration-200 hover:h-1"
                          style={{
                            background: `linear-gradient(to right, var(--color-foreground) 0%, var(--color-foreground) ${(isMuted ? 0 : volume) * 100}%, var(--color-border) ${(isMuted ? 0 : volume) * 100}%, var(--color-border) 100%)`
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time Display */}
                <div className="text-xs text-muted/80 font-mono tracking-wider">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Seek Feedback (YouTube style) */}
      {isMobile && showSeekFeedback.show && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-background/80 backdrop-blur-sm rounded-lg px-6 py-4 flex items-center gap-3 border border-border/30">
            {showSeekFeedback.direction === 'backward' ? (
              <svg className="w-8 h-8 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-foreground font-medium">
              {showSeekFeedback.direction === 'backward' ? '-' : '+'}{showSeekFeedback.time}s
            </span>
          </div>
        </motion.div>
      )}


      {/* Mobile Center Play/Pause Button - Hidden when using native controls */}
      {showControls && !isLoading && hasBeenUnmuted && isMobile && false && (
        <motion.button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-card/80 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center text-foreground/90 hover:bg-card hover:border-foreground/30 transition-all duration-300 z-20"
          onClick={togglePlayPause}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showMobileControls ? 1 : 0, scale: showMobileControls ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 3.5A1.5 1.5 0 017 2h.5a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 017.5 18H7a1.5 1.5 0 01-1.5-1.5v-13zM11.5 3.5A1.5 1.5 0 0113 2h.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5v-13z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          )}
        </motion.button>
      )}

      {/* Fullscreen Exit Button - Top Left Corner - MOBILE ONLY - Hidden when using native controls */}
      {showControls && !isLoading && hasBeenUnmuted && isMobile && isFullscreen && false && (
        <motion.button
          className="absolute top-6 left-6 w-10 h-10 bg-black/60 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/90 hover:bg-black/80 hover:border-white/40 transition-all duration-200 z-30 touch-manipulation"
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen();
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showMobileControls ? 1 : 0, scale: showMobileControls ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Exit fullscreen"
          style={{ minWidth: '46px', minHeight: '46px' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}

      {/* Premium Mobile Controls - Netflix/YouTube Premium Style - ONLY IN FULLSCREEN - Hidden when using native controls */}
      {showControls && !isLoading && hasBeenUnmuted && isMobile && isFullscreen && false && (
        <div className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${showMobileControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Subtle Gradient Overlay for Premium Feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Premium Mobile Controls Container */}
          <div className="relative z-10 p-4 pb-6 mobile-controls-container">
            {/* Ultra-Thin Progress Line - Modern Separation */}
            <div className="mb-4">
              <div className="relative h-1 bg-white/30 backdrop-blur-sm rounded-full overflow-hidden">
                {/* Progress Fill with Premium Gradient */}
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-white via-white/95 to-white/90 transition-all duration-200 ease-out rounded-full"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    boxShadow: '0 0 16px rgba(255, 255, 255, 0.6)'
                  }}
                />
                
                {/* Interactive Touch Zone */}
                <div 
                  className="absolute inset-0 cursor-pointer touch-manipulation"
                  style={{ minHeight: '46px', marginTop: '-22px', marginBottom: '-22px' }}
                  onTouchStart={(e) => {
                    if (!showMobileControls) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const touch = e.touches[0];
                    const percentage = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
                    const newTime = percentage * duration;
                    handleSeek(newTime);
                  }}
                />
              </div>
            </div>

            {/* Glassmorphism Control Bar - Premium Design */}
            <div 
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl mobile-control-bar"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="flex items-center justify-between">
                
                {/* Primary Control - Play/Pause */}
                <button
                  onClick={(e) => {
                    if (!showMobileControls) return;
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 transition-all duration-200 touch-manipulation"
                  style={{ minWidth: '46px', minHeight: '46px' }}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
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
                <div className="text-sm text-white/90 font-mono tracking-wide px-3 py-1 rounded-lg bg-black/30">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* Fullscreen Control */}
                <button
                  onClick={(e) => {
                    if (!showMobileControls) return;
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/15 active:bg-white/25 transition-all duration-200 touch-manipulation"
                  style={{ minWidth: '46px', minHeight: '46px' }}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <svg className="w-5 h-5 text-white/90" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white/90" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
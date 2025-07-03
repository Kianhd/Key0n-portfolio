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
  autoPlay = false
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded:', video.src);
      setDuration(video.duration);
      video.volume = volume;
      setIsLoading(false);
    };
    
    const handleLoadStart = () => {
      console.log('Video loading started:', video.src);
      setIsLoading(true);
      setLoadError(false);
      
      // Set a timeout for loading - if video doesn't load in 10 seconds, show error
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = setTimeout(() => {
        if (isLoading) {
          console.error('Video loading timeout');
          setIsLoading(false);
          setLoadError(true);
        }
      }, 10000);
    };
    
    const handleCanPlay = () => {
      console.log('Video can play:', video.src);
      setIsLoading(false);
      setLoadError(false);
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
    
    const handleError = (e: Event) => {
      console.error('Video error event:', e);
      console.error('Video src:', video.src);
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

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('error', handleError);
    };
  }, [volume, onPlay, onPause, onEnded]);

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
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        autoPlay={autoPlay}
        onError={onError}
      />

      {/* Loading Spinner */}
      {isLoading && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-border border-t-foreground/40 rounded-full animate-spin" />
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

      {/* Custom Controls */}
      {showControls && !isLoading && (
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
    </div>
  );
}
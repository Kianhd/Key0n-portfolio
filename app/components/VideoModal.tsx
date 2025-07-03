'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';

interface Video {
  id: string;
  videoFile?: string;
  videoUrl: string;
  thumbnail?: string;
}

interface VideoModalProps {
  project: {
    title: string;
    videos: Video[];
  } | null;
  initialVideoIndex?: number;
  onClose: () => void;
}

export default function VideoModal({ project, initialVideoIndex = 0, onClose }: VideoModalProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentVideoIndex(initialVideoIndex);
  }, [initialVideoIndex]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && project) handlePrev();
      if (e.key === 'ArrowRight' && project) handleNext();
    };

    if (project) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const handleNext = () => {
    if (project.videos.length > 1) {
      setDirection(1);
      setCurrentVideoIndex((prev) => (prev + 1) % project.videos.length);
    }
  };

  const handlePrev = () => {
    if (project.videos.length > 1) {
      setDirection(-1);
      setCurrentVideoIndex((prev) => (prev - 1 + project.videos.length) % project.videos.length);
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
  };

  const currentVideo = project.videos[currentVideoIndex];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Blurred background */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(20px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
          />
          
          {/* Video container */}
          <motion.div
            className="relative w-full max-w-6xl aspect-video glass-dark rounded-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-foreground hover:bg-white/20 transition-colors"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Navigation - Previous */}
            {project.videos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-foreground hover:bg-white/20 transition-colors"
                  aria-label="Previous video"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-foreground hover:bg-white/20 transition-colors"
                  aria-label="Next video"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Video Content */}
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentVideoIndex}
                  custom={direction}
                  initial={{ x: direction > 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? "-50%" : "50%", opacity: 0 }}
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
                  {currentVideo.videoFile ? (
                    <video
                      src={currentVideo.videoFile}
                      className="w-full h-full object-contain bg-black"
                      controls
                      autoPlay
                      playsInline
                      controlsList="nodownload"
                      onLoadedMetadata={(e) => {
                        // Set initial volume to 70%
                        const video = e.target as HTMLVideoElement;
                        video.volume = 0.7;
                      }}
                    />
                  ) : (
                    <iframe
                      src={currentVideo.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Video Counter */}
            {project.videos.length > 1 && (
              <div className="absolute top-4 left-4 z-20 glass-dark rounded-full px-4 py-2 text-sm font-usb-club">
                {currentVideoIndex + 1} / {project.videos.length}
              </div>
            )}

            {/* Bottom Thumbnail Navigation */}
            {project.videos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 glass-dark rounded-full px-4 py-2 z-20">
                {project.videos.map((video, index) => (
                  <button
                    key={video.id}
                    className={`relative w-12 h-8 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      index === currentVideoIndex 
                        ? 'border-accent scale-110' 
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    onClick={() => {
                      setDirection(index > currentVideoIndex ? 1 : -1);
                      setCurrentVideoIndex(index);
                    }}
                  >
                    {video.thumbnail && (
                      <img 
                        src={video.thumbnail} 
                        alt={`Video ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    {index === currentVideoIndex && (
                      <motion.div 
                        className="absolute inset-0 bg-accent/20"
                        layoutId="activeModalThumbnail"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
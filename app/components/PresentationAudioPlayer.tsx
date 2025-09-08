"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";

interface AudioExample {
  id: string;
  title: string;
  duration: string;
  cloudinaryId: string;
  waveformData?: number[]; // Simplified waveform representation
}

interface PresentationAudioPlayerProps {
  examples: AudioExample[];
  accentColor: string;
  onHover?: (exampleId: string | null) => void;
}

// Mock waveform data generator (in real implementation, this would come from audio analysis)
const generateWaveformData = (length: number = 50): number[] => {
  return Array.from({ length }, () => Math.random() * 100 + 20);
};

const PresentationAudioPlayer: React.FC<PresentationAudioPlayerProps> = ({
  examples,
  accentColor,
  onHover
}) => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hoveredExample, setHoveredExample] = useState<string | null>(null);
  const [previewPlaying, setPreviewPlaying] = useState<string | null>(null);

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio elements
    examples.forEach(example => {
      if (!audioRefs.current[example.id]) {
        const audio = new Audio();
        // In real implementation, use Cloudinary URL
        audio.src = `/audio/examples/${example.cloudinaryId}.mp3`;
        audio.preload = 'metadata';
        
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
        
        audio.addEventListener('timeupdate', () => {
          if (currentPlaying === example.id) {
            setCurrentTime(audio.currentTime);
          }
        });
        
        audio.addEventListener('ended', () => {
          setCurrentPlaying(null);
          setCurrentTime(0);
        });

        audioRefs.current[example.id] = audio;
      }
    });

    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [examples, currentPlaying]);

  const handlePlay = (exampleId: string) => {
    // Stop any currently playing audio
    if (currentPlaying && audioRefs.current[currentPlaying]) {
      audioRefs.current[currentPlaying].pause();
    }

    if (currentPlaying === exampleId) {
      setCurrentPlaying(null);
    } else {
      const audio = audioRefs.current[exampleId];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
        setCurrentPlaying(exampleId);
      }
    }
  };

  const handleHover = (exampleId: string) => {
    setHoveredExample(exampleId);
    onHover?.(exampleId);

    // Start preview after 500ms hover
    previewTimeoutRef.current = setTimeout(() => {
      if (currentPlaying !== exampleId) {
        const audio = audioRefs.current[exampleId];
        if (audio) {
          audio.volume = 0.3; // Lower volume for preview
          audio.currentTime = 0;
          audio.play().catch(console.error);
          setPreviewPlaying(exampleId);

          // Stop preview after 3 seconds
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
            setPreviewPlaying(null);
          }, 3000);
        }
      }
    }, 500);
  };

  const handleHoverEnd = (exampleId: string) => {
    setHoveredExample(null);
    onHover?.(null);

    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }

    // Stop preview if playing
    if (previewPlaying === exampleId && currentPlaying !== exampleId) {
      const audio = audioRefs.current[exampleId];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setPreviewPlaying(null);
      }
    }
  };

  const toggleMute = () => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.muted = !isMuted;
    });
    setIsMuted(!isMuted);
  };

  return (
    <div className="space-y-6">
      {examples.map((example, index) => {
        const isPlaying = currentPlaying === example.id;
        const isPreviewing = previewPlaying === example.id;
        const isHovered = hoveredExample === example.id;
        const waveformData = example.waveformData || generateWaveformData();

        return (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
            onMouseEnter={() => handleHover(example.id)}
            onMouseLeave={() => handleHoverEnd(example.id)}
          >
            <div 
              className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: isHovered || isPlaying 
                  ? `0 0 20px ${accentColor}20, inset 0 0 20px ${accentColor}05`
                  : '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1">{example.title}</h4>
                  <p className="text-white/60 text-sm">{example.duration}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? <FiVolumeX className="w-4 h-4" /> : <FiVolume2 className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => handlePlay(example.id)}
                    className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: isPlaying ? `${accentColor}40` : `${accentColor}20`,
                      border: `2px solid ${accentColor}`,
                    }}
                  >
                    {isPlaying ? (
                      <FiPause className="w-5 h-5" style={{ color: accentColor }} />
                    ) : (
                      <FiPlay className="w-5 h-5 ml-0.5" style={{ color: accentColor }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Waveform Visualization */}
              <div className="relative h-16 bg-black/20 rounded-lg overflow-hidden">
                <div className="flex items-end justify-center h-full px-2 gap-0.5">
                  {waveformData.map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-full min-w-[2px] max-w-[4px]"
                      style={{
                        backgroundColor: (isPlaying || isPreviewing) && i < (currentTime / duration) * waveformData.length
                          ? accentColor
                          : isHovered
                          ? `${accentColor}60`
                          : 'rgba(255, 255, 255, 0.3)',
                        height: `${Math.max(height * 0.6, 8)}%`,
                      }}
                      animate={{
                        scaleY: (isPlaying || isPreviewing) && i < (currentTime / duration) * waveformData.length
                          ? [1, 1.2, 1]
                          : 1
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: (isPlaying || isPreviewing) && i < (currentTime / duration) * waveformData.length ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Progress Overlay */}
                {(isPlaying || isPreviewing) && (
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    style={{
                      width: `${(currentTime / duration) * 100}%`,
                      background: `linear-gradient(90deg, transparent 0%, ${accentColor}20 50%, transparent 100%)`
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>

              {/* Status Indicators */}
              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="text-white/60">
                  {isPlaying ? "Playing..." : isPreviewing ? "Preview..." : "Click to play"}
                </div>
                <div className="text-white/40">
                  {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {example.duration}
                </div>
              </div>

              {/* Hover Preview Indicator */}
              <AnimatePresence>
                {isHovered && !isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-xs text-center"
                    style={{ color: accentColor }}
                  >
                    Hover for 3s preview • Click to play full track
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PresentationAudioPlayer;
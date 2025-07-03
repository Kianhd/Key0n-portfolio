"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Beat {
  id: string;
  title: string;
  price: number;
  bpm: number;
  genre: string;
  tags: string[];
  audioFile: string;
  coverImage?: string;
  paymentLink: string;
}

interface BeatCardProps {
  beat: Beat;
  onCustomize: () => void;
}

export default function BeatCard({ beat, onCustomize }: BeatCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative">
      {/* Main beat card */}
      <motion.div
        className="relative rounded-sm overflow-hidden group z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          // background: 'rgba(255, 255, 255, 0.05)',
          // backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <audio ref={audioRef} src={beat.audioFile} preload="metadata" />

        {/* Telegram-style Audio Player */}
        <div className="p-4 bg-gradient-to-br from-card to-card-hover">
          <div className="flex items-center gap-3">
            {/* Play Button - Left Side */}
            <div className="relative group">
              <motion.button
                onClick={togglePlay}
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                style={{
                  backgroundColor: "rgba(255, 198, 11, 0.2)",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255, 198, 11, 0.3)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  isPlaying
                    ? {
                        boxShadow: [
                          "0 0 15px rgba(255, 198, 11, 0.3)",
                          "0 0 25px rgba(255, 198, 11, 0.5)",
                          "0 0 15px rgba(255, 198, 11, 0.3)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0 }}
              >
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.svg
                    key="play"
                    className="w-5 h-5 ml-0.5 text-[#FFC60B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="pause"
                    className="w-5 h-5 text-[#FFC60B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <path d="M5.5 3.5A1.5 1.5 0 017 2h.5a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 017.5 18H7a1.5 1.5 0 01-1.5-1.5v-13zM11.5 3.5A1.5 1.5 0 0113 2h.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5v-13z" />
                  </motion.svg>
                )}
              </AnimatePresence>
              </motion.button>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-full" />
                <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-full blur-sm" />
                <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-full blur-md opacity-50" />
              </div>
            </div>

            {/* Waveform and Progress - Right Side */}
            <div className="flex-1 min-w-0">
              {/* Waveform Visualization */}
              <div className="flex items-center gap-0.5 h-8 mb-2">
                {[...Array(40)].map((_, i) => {
                  const baseHeight = Math.random() * 20 + 4;
                  const playedPercentage = progress / 100;
                  const barPosition = i / 40;
                  const isPlayed = barPosition <= playedPercentage;

                  return (
                    <motion.div
                      key={i}
                      className={`flex-1 rounded-full transition-colors duration-200 cursor-pointer ${
                        isPlayed ? "bg-[#FFC60B]" : "bg-[#FFC60B]/30"
                      }`}
                      style={{
                        height: baseHeight,
                        minWidth: "2px",
                      }}
                      animate={
                        isPlaying
                          ? {
                              height: [
                                baseHeight,
                                Math.random() * 25 + 8,
                                baseHeight,
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.6,
                        repeat: isPlaying ? Infinity : 0,
                        delay: i * 0.02,
                        ease: "easeInOut",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (duration > 0) {
                          const newTime = (i / 40) * duration;
                          if (audioRef.current) {
                            audioRef.current.currentTime = newTime;
                            setCurrentTime(newTime);
                          }
                        }
                      }}
                    />
                  );
                })}
              </div>

              {/* Time Display */}
              <div className="flex justify-between items-center text-xs text-muted">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Beat Info */}
        <div className="relative p-4">
          {/* Text content */}
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-foreground mb-2 uppercase">
              {beat.title}
            </h3>

            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted">
                <span className="text-[#FFC60B] font-semibold">
                  {beat.bpm} BPM
                </span>
                <span className="mx-2">•</span>
                <span>{beat.genre}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {beat.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-zinc-800/50 text-muted rounded-full border border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Always Visible Action Row */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              {/* Price Display */}
              <div className="text-lg font-bold text-[#FFC60B]">
                ${beat.price}
              </div>

              {/* Compact Action Buttons */}
              <div className="flex gap-2">
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={beat.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-[#FFC60B] bg-[#FFC60B] text-background hover:bg-transparent hover:text-[#FFC60B] text-xs font-semibold uppercase rounded-sm transition-all duration-300 relative z-10 inline-block"
                  >
                    BUY
                  </a>
                  <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-sm" />
                    <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-sm blur-sm" />
                    <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-sm blur-md opacity-50" />
                  </div>
                </motion.div>

                <motion.button
                  onClick={onCustomize}
                  className="px-4 py-2 border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background text-xs font-semibold uppercase rounded-sm transition-all duration-300 relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  REQUEST CUSTOM
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { motion } from "motion/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { SwiperNavButtons } from "./SwiperNavButtons";

interface Video {
  id: string;
  videoFile: string;
  videoUrl: string;
  thumbnail: string;
}

interface VideoCarouselProps {
  videos: Video[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  if (!videos.length) return null;

  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.activeIndex;

    // Pause previous video
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex]?.pause();
    }

    setCurrentIndex(newIndex);
    setIsUnmuted(false);

    // Reset video to beginning (no auto-play)
    if (videoRefs.current[newIndex]) {
      const video = videoRefs.current[newIndex];
      video!.currentTime = 0;
      video!.muted = true;
      // Removed auto-play
    }
  };

  const handleUnmute = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.muted = false;
      currentVideo.play();
      setIsUnmuted(true);
    }
  };

  const handleVideoLoad = (index: number) => {
    // Reset current video when it loads (no auto-play)
    if (index === currentIndex) {
      const video = videoRefs.current[index];
      if (video) {
        video.currentTime = 0;
        video.muted = true;
        // Removed auto-play
      }
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          onSlideChange={handleSlideChange}
          className="aspect-video bg-card rounded-lg overflow-hidden"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={video.id}>
              <div className="relative w-full h-full bg-black">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.videoFile}
                  poster={video.thumbnail}
                  className="w-full h-full object-contain"
                  playsInline
                  controls
                  loop
                  muted
                  onLoadedData={() => handleVideoLoad(index)}
                  onError={() =>
                    console.error("Video failed to load:", video.videoFile)
                  }
                />

                {/* Unmute Button */}
                {!isUnmuted && index === currentIndex && (
                  <motion.button
                    onClick={handleUnmute}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/80 hover:scale-110 transition-all duration-300">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    </div>
                  </motion.button>
                )}
              </div>
            </SwiperSlide>
          ))}
          <SwiperNavButtons />
        </Swiper>
        {/* Custom Navigation Buttons */}
      </div>

      {/* Pagination Dots */}
      <div className="swiper-pagination !z-10 !mt-4 !relative !bottom-auto [&_.swiper-pagination-bullet]:!w-3 [&_.swiper-pagination-bullet]:!h-3 [&_.swiper-pagination-bullet]:!bg-border [&_.swiper-pagination-bullet-active]:!bg-foreground [&_.swiper-pagination-bullet]:!transition-all [&_.swiper-pagination-bullet]:!duration-300 [&_.swiper-pagination-bullet]:hover:!bg-foreground/60"></div>
    </div>
  );
}

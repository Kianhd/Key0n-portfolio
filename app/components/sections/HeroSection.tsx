"use client";

import React from "react";
import { motion } from "motion/react";
import WaveformBackground from "../WaveformBackground";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";

interface HeroSectionProps {
  isButtonHovered: boolean;
  setIsButtonHovered: (hovered: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isButtonHovered,
  setIsButtonHovered,
}) => {
  const browserOpts = useBrowserOptimizations();

  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-16">
      <WaveformBackground
        waveColor="#dc2626"
        backgroundColor="#0a0a0a"
        enableMouseInteraction={!browserOpts.isZenBrowser}
        amplitude={60}
        speed={0.008}
        speedMultiplier={isButtonHovered ? 2 : 1}
        className="gradient-fade-bottom"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10 py-32 sm:py-40">
          <motion.h1
            className="text-hero mb-12 relative leading-[0.85]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: browserOpts.simplifyFramerMotion ? 0.3 : 1,
              delay: browserOpts.simplifyFramerMotion ? 0 : 0.2,
              ease: browserOpts.useSimpleEasing ? "easeOut" : [0.4, 0, 0.2, 1],
            }}
            style={{
              willChange: browserOpts.forceHardwareAcceleration
                ? "transform, opacity"
                : "auto",
            }}
          >
            <motion.span
              className="relative inline-block font-bold tracking-tight"
              initial={{
                opacity: 0,
                y: browserOpts.simplifyFramerMotion ? 10 : 20,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: browserOpts.simplifyFramerMotion ? 0.3 : 0.8,
                delay: browserOpts.simplifyFramerMotion ? 0.05 : 0.3,
                ease: browserOpts.useSimpleEasing ? "easeOut" : "easeOut",
              }}
              style={{
                willChange: browserOpts.forceHardwareAcceleration
                  ? "transform, opacity"
                  : "auto",
                background: "linear-gradient(180deg, #fafafa 0%, #e0e0e0 50%, #b0b0b0 51%, #fafafa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15)) drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                transform: "perspective(1000px) rotateX(5deg)",
                transformOrigin: "center bottom",
              }}
            >
              MUSIC THAT
            </motion.span>
            <br />
            <motion.span
              className="relative inline-block font-bold tracking-wider"
              initial={{
                opacity: 0,
                y: browserOpts.simplifyFramerMotion ? 10 : 20,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: browserOpts.simplifyFramerMotion ? 0.3 : 0.8,
                delay: browserOpts.simplifyFramerMotion ? 0.1 : 0.5,
                ease: browserOpts.useSimpleEasing ? "easeOut" : "easeOut",
              }}
              style={{
                willChange: browserOpts.forceHardwareAcceleration
                  ? "transform, opacity"
                  : "auto",
                background: "linear-gradient(180deg, #d0d0d0 0%, #a0a0a0 50%, #808080 51%, #c0c0c0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.12)) drop-shadow(0 1px 3px rgba(0,0,0,0.08))",
                transform: "perspective(1000px) rotateX(3deg)",
                transformOrigin: "center bottom",
              }}
            >
              TELLS
            </motion.span>
            <br />
            {browserOpts.isZenBrowser ? (
              // Static fallback for Zen Browser to prevent animation issues
              <span 
                className="relative inline-block font-bold tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #ff6b6b 0%, #dc2626 25%, #991b1b 50%, #dc2626 75%, #ff6b6b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 6px 12px rgba(220, 38, 38, 0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  transform: "perspective(1000px) rotateX(8deg) translateZ(20px)",
                  transformOrigin: "center bottom",
                }}
              >
                YOUR STORY
              </span>
            ) : (
              <motion.span
                className="relative inline-block font-bold tracking-tight"
                initial={{
                  opacity: 0,
                  y: browserOpts.simplifyFramerMotion ? 10 : 20,
                  ...(browserOpts.disableBlurTransitions
                    ? {}
                    : { filter: "blur(4px)" }),
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  ...(browserOpts.disableBlurTransitions
                    ? {}
                    : { filter: "blur(0px)" }),
                }}
                transition={{
                  duration: browserOpts.simplifyFramerMotion ? 0.3 : 1.2,
                  delay: browserOpts.simplifyFramerMotion ? 0.15 : 0.6,
                  ease: browserOpts.useSimpleEasing ? "easeOut" : "easeOut",
                }}
                style={{
                  willChange: browserOpts.forceHardwareAcceleration
                    ? "transform, opacity"
                    : "auto",
                  background: "linear-gradient(135deg, #ff6b6b 0%, #dc2626 25%, #991b1b 50%, #dc2626 75%, #ff6b6b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 3s ease-in-out infinite",
                  filter: "drop-shadow(0 6px 12px rgba(220, 38, 38, 0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  transform: "perspective(1000px) rotateX(8deg) translateZ(20px)",
                  transformOrigin: "center bottom",
                  textShadow: "0 20px 40px rgba(220, 38, 38, 0.3)",
                }}
              >
                YOUR STORY
              </motion.span>
            )}
          </motion.h1>
          <motion.p
            className="text-body-large text-muted/60 mb-16 max-w-xl mx-auto leading-relaxed font-normal tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: browserOpts.simplifyFramerMotion ? 0.3 : 1,
              delay: browserOpts.simplifyFramerMotion ? 0.2 : 1.2,
              ease: browserOpts.useSimpleEasing ? "easeOut" : [0.4, 0, 0.2, 1],
            }}
            style={{
              willChange: browserOpts.forceHardwareAcceleration
                ? "opacity"
                : "auto",
            }}
          >
            Helping brands express their unique identity through unforgettable,
            custom-made music.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto sm:max-w-none">
            <div 
              className="relative group"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <a
                href="#work"
                className={`border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background px-12 py-5 text-small uppercase font-medium transition-all duration-300 inline-block rounded-sm relative z-10 ${
                  browserOpts.disableBackdropFilter
                    ? "bg-background/80"
                    : "backdrop-blur-[20px]"
                }`}
              >
                View Our Work
              </a>
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {browserOpts.reduceBlur ? (
                  <div
                    className="absolute inset-0 border-2 border-foreground rounded-sm"
                    style={{
                      boxShadow: "0 0 8px rgba(250, 250, 250, 0.5)",
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
                  </>
                )}
              </div>
            </div>
            <div 
              className="relative group"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <a
                href="#contact"
                className="border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background px-12 py-5 text-small uppercase font-medium transition-all duration-300 inline-block rounded-sm relative z-10"
              >
                Get In Touch
              </a>
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {browserOpts.reduceBlur ? (
                  <div
                    className="absolute inset-0 border-2 border-foreground rounded-sm"
                    style={{
                      boxShadow: "0 0 8px rgba(250, 250, 250, 0.5)",
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{
              opacity: 0,
              y: browserOpts.simplifyFramerMotion ? -10 : -20,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: browserOpts.simplifyFramerMotion ? 0.2 : 0.6,
              delay: browserOpts.simplifyFramerMotion ? 0.25 : 1.4,
              ease: browserOpts.useSimpleEasing ? "easeOut" : [0.4, 0, 0.2, 1],
            }}
            style={{
              willChange: browserOpts.forceHardwareAcceleration
                ? "transform, opacity"
                : "auto",
            }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={
                browserOpts.reduceMotionComplexity
                  ? { y: [0, 3, 0] }
                  : { y: [0, 8, 0] }
              }
              transition={{
                duration: browserOpts.reduceMotionComplexity ? 2.5 : 2,
                repeat: Infinity,
                ease: browserOpts.useSimpleEasing ? "linear" : "easeInOut",
                repeatType: "reverse",
              }}
              style={{
                willChange: browserOpts.forceHardwareAcceleration
                  ? "transform"
                  : "auto",
              }}
            >
              <span className="text-xs text-muted/60 uppercase tracking-wider">
                Scroll
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-muted/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </WaveformBackground>
    </section>
  );
};

export default HeroSection;
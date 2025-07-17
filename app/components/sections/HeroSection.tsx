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
    <section id="home" className="min-h-screen relative pt-16">
      <WaveformBackground
        waveColor="#dc2626"
        backgroundColor="#0a0a0a"
        enableMouseInteraction={!browserOpts.isZenBrowser}
        amplitude={60}
        speed={0.008}
        speedMultiplier={isButtonHovered ? 2 : 1}
        className="gradient-fade-bottom overflow-visible"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10 py-36 sm:py-44">
          <motion.div
            className="mb-16 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: browserOpts.simplifyFramerMotion ? 0.6 : 1.2,
              delay: browserOpts.simplifyFramerMotion ? 0 : 0.3,
              ease: browserOpts.useSimpleEasing ? "easeOut" : [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              willChange: browserOpts.forceHardwareAcceleration ? "transform, opacity" : "auto",
            }}
          >
            {/* Executive Typography Container */}
            <div 
              className="relative text-center"
              style={{
                fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.015em",
                fontVariantNumeric: "lining-nums",
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                paddingTop: "clamp(0.5rem, 1vw, 1rem)",
                paddingBottom: "clamp(0.25rem, 0.5vw, 0.5rem)",
              }}
            >
              {/* Subtle background glow for depth */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 120% 50% at 50% 40%, rgba(255,255,255,0.02) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              <motion.div
                className="relative block"
                initial={{ opacity: 0, y: browserOpts.simplifyFramerMotion ? 8 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: browserOpts.simplifyFramerMotion ? 0.5 : 0.8,
                  delay: browserOpts.simplifyFramerMotion ? 0.1 : 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ marginBottom: "clamp(0.5rem, 1.5vw, 1.2rem)" }}
              >
                <span 
                  className="block"
                  style={{
                    fontWeight: 275,
                    fontSize: "1em",
                    letterSpacing: "clamp(0.02em, 0.3vw, 0.08em)",
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.92) 25%, rgba(220, 220, 220, 0.88) 50%, rgba(200, 200, 200, 0.85) 75%, rgba(240, 240, 240, 0.9) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 2px 4px rgba(0,0,0,0.12), 0 0 30px rgba(255,255,255,0.04)",
                    filter: "contrast(1.03) brightness(1.02) drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  }}
                >
                  MUSIC THAT
                </span>
              </motion.div>
              
              <motion.div
                className="relative block"
                initial={{ opacity: 0, y: browserOpts.simplifyFramerMotion ? 8 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: browserOpts.simplifyFramerMotion ? 0.5 : 0.8,
                  delay: browserOpts.simplifyFramerMotion ? 0.15 : 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ 
                  marginBottom: "clamp(0.8rem, 2vw, 1.6rem)",
                }}
              >
                <span 
                  className="block"
                  style={{
                    fontWeight: 275,
                    fontSize: "1em",
                    letterSpacing: "clamp(0.02em, 0.3vw, 0.08em)",
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.92) 25%, rgba(220, 220, 220, 0.88) 50%, rgba(200, 200, 200, 0.85) 75%, rgba(240, 240, 240, 0.9) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 2px 4px rgba(0,0,0,0.12), 0 0 30px rgba(255,255,255,0.04)",
                    textTransform: "uppercase",
                    filter: "contrast(1.03) brightness(1.02) drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  }}
                >
                  TELLS
                </span>
              </motion.div>
              
              {browserOpts.isZenBrowser ? (
                <div 
                  className="relative block"
                >
                  <span 
                    className="block"
                    style={{
                      fontWeight: 275,
                      fontSize: "1em",
                      letterSpacing: "clamp(0.02em, 0.3vw, 0.08em)",
                      background: "linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(239, 68, 68, 0.88) 25%, rgba(200, 35, 35, 0.92) 50%, rgba(185, 28, 28, 0.9) 75%, rgba(230, 55, 55, 0.93) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 2px 6px rgba(220, 38, 38, 0.12), 0 0 30px rgba(220, 38, 38, 0.06)",
                      filter: "contrast(1.06) saturate(0.96) drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                    }}
                  >
                    YOUR STORY
                  </span>
                </div>
              ) : (
                <motion.div
                  className="relative block"
                  initial={{ 
                    opacity: 0, 
                    y: browserOpts.simplifyFramerMotion ? 8 : 12,
                    scale: 0.98,
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: browserOpts.simplifyFramerMotion ? 0.5 : 0.9,
                    delay: browserOpts.simplifyFramerMotion ? 0.2 : 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{}}
                >
                  <span 
                    className="block relative"
                    style={{
                      fontWeight: 275,
                      fontSize: "1em",
                      letterSpacing: "clamp(0.02em, 0.3vw, 0.08em)",
                      background: "linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(239, 68, 68, 0.88) 25%, rgba(200, 35, 35, 0.92) 50%, rgba(185, 28, 28, 0.9) 75%, rgba(230, 55, 55, 0.93) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 2px 6px rgba(220, 38, 38, 0.12), 0 0 30px rgba(220, 38, 38, 0.06)",
                      filter: "contrast(1.06) saturate(0.96) drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                    }}
                  >
                    YOUR STORY
                  </span>
                </motion.div>
              )}

              {/* Executive accent line */}
              <motion.div
                className="absolute -bottom-4 left-0"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "clamp(2rem, 8vw, 4rem)", opacity: 0.15 }}
                transition={{
                  duration: browserOpts.simplifyFramerMotion ? 0.6 : 1.2,
                  delay: browserOpts.simplifyFramerMotion ? 0.3 : 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>
          <motion.p
            className="text-body-large text-muted/60 mb-16 max-w-2xl mx-auto leading-relaxed font-normal tracking-wide"
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
            Helping{" "}
            <span 
              className="relative font-medium text-white/85"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(220, 220, 220, 0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              brands, films, and artists
            </span>{" "}
            discover and express their true voice through unforgettable,{" "}
            <span 
              className="relative font-bold"
              style={{
                background: "linear-gradient(135deg, rgba(220, 38, 38, 1) 0%, rgba(239, 68, 68, 1) 25%, rgba(255, 82, 82, 1) 50%, rgba(248, 113, 113, 1) 75%, rgba(220, 38, 38, 1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 8px rgba(220, 38, 38, 0.3), 0 0 30px rgba(220, 38, 38, 0.2)",
                filter: "contrast(1.15) saturate(1.1) drop-shadow(0 1px 2px rgba(220, 38, 38, 0.3))",
              }}
            >
              custom-crafted
            </span>{" "}
            music.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto sm:max-w-none">
            <div 
              className="relative group"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <a
                href="#work"
                className={`border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background text-small uppercase font-medium transition-all duration-300 inline-block relative z-10 text-center ${
                  browserOpts.disableBackdropFilter
                    ? "bg-background/80"
                    : "backdrop-blur-[20px]"
                }`}
                style={{ width: "180px", padding: "20px 12px", borderRadius: "6px" }}
              >
                View My Work
              </a>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius: "6px" }}>
                {browserOpts.reduceBlur ? (
                  <div
                    className="absolute inset-0 border-2 border-foreground"
                    style={{
                      boxShadow: "0 0 8px rgba(250, 250, 250, 0.5)",
                      borderRadius: "6px",
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 border-2 border-foreground" style={{ borderRadius: "6px" }} />
                    <div className="absolute inset-0 border-2 border-foreground blur-sm" style={{ borderRadius: "6px" }} />
                    <div className="absolute inset-0 border-2 border-foreground blur-md opacity-50" style={{ borderRadius: "6px" }} />
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
                className="text-foreground hover:text-white text-small uppercase font-medium transition-all duration-300 inline-block relative z-10 text-center"
                style={{ 
                  width: "180px", 
                  padding: "20px 12px", 
                  borderRadius: "6px",
                  border: "2px solid rgba(220, 38, 38, 0.3)",
                  background: browserOpts.disableBackdropFilter 
                    ? "rgba(220, 38, 38, 0.05)" 
                    : "rgba(220, 38, 38, 0.08)",
                  backdropFilter: browserOpts.disableBackdropFilter ? "none" : "blur(20px)",
                  WebkitBackdropFilter: browserOpts.disableBackdropFilter ? "none" : "blur(20px)",
                }}
              >
                Get In Touch
              </a>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius: "6px" }}>
                {browserOpts.reduceBlur ? (
                  <div
                    className="absolute inset-0 border-2"
                    style={{
                      borderColor: "rgba(220, 38, 38, 0.6)",
                      boxShadow: "0 0 8px rgba(220, 38, 38, 0.4)",
                      borderRadius: "6px",
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 border-2" style={{ borderColor: "rgba(220, 38, 38, 0.6)", borderRadius: "6px" }} />
                    <div className="absolute inset-0 border-2 blur-sm" style={{ borderColor: "rgba(220, 38, 38, 0.5)", borderRadius: "6px" }} />
                    <div className="absolute inset-0 border-2 blur-md opacity-50" style={{ borderColor: "rgba(220, 38, 38, 0.4)", borderRadius: "6px" }} />
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
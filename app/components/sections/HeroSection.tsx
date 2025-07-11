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
              className="relative"
              style={{
                fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                lineHeight: "0.92",
                letterSpacing: "-0.015em",
                fontVariantNumeric: "lining-nums",
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
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
                  marginLeft: "clamp(0.5rem, 2vw, 2rem)",
                }}
              >
                <span 
                  className="block"
                  style={{
                    fontWeight: 350,
                    fontSize: "0.88em",
                    letterSpacing: "clamp(0.12em, 0.4vw, 0.18em)",
                    background: "linear-gradient(180deg, rgba(250, 250, 250, 0.95) 0%, rgba(230, 230, 230, 0.88) 30%, rgba(190, 190, 190, 0.82) 60%, rgba(210, 210, 210, 0.86) 85%, rgba(235, 235, 235, 0.9) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 1px 3px rgba(0,0,0,0.08), 0 0 25px rgba(255,255,255,0.03)",
                    textTransform: "uppercase",
                    filter: "contrast(1.02) brightness(1.01) drop-shadow(0 1px 1px rgba(0,0,0,0.08))",
                  }}
                >
                  TELLS
                </span>
              </motion.div>
              
              {browserOpts.isZenBrowser ? (
                <div 
                  className="relative block"
                  style={{ 
                    marginLeft: "clamp(-0.5rem, -1vw, -1rem)",
                  }}
                >
                  <span 
                    className="block"
                    style={{
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
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
                  style={{ 
                    marginLeft: "clamp(-0.5rem, -1vw, -1rem)",
                  }}
                >
                  <span 
                    className="block relative"
                    style={{
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      background: "linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(239, 68, 68, 0.88) 25%, rgba(200, 35, 35, 0.92) 50%, rgba(185, 28, 28, 0.9) 75%, rgba(230, 55, 55, 0.93) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 2px 6px rgba(220, 38, 38, 0.12), 0 0 30px rgba(220, 38, 38, 0.06)",
                      filter: "contrast(1.06) saturate(0.96) drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                    }}
                  >
                    YOUR STORY
                    {/* Premium metallic highlight effect */}
                    <span
                      className="absolute inset-0 block"
                      style={{
                        background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.08) 65%, transparent 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        opacity: 0.7,
                        mixBlendMode: "overlay",
                      }}
                    >
                      YOUR STORY
                    </span>
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
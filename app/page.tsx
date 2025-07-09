"use client";

import React, { useEffect, useMemo } from "react";
import Navigation from "./components/Navigation";
import VideoCarousel from "./components/VideoCarousel";
import SchemaMarkup from "./components/SchemaMarkup";
import BrandMarquee from "./components/BrandMarquee";
import WaveformBackground from "./components/WaveformBackground";
import { motion } from "motion/react";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useBrowserOptimizations } from "./hooks/useBrowserOptimizations";
import {
  usePerformanceMonitor,
  usePerformanceWarnings,
} from "./hooks/usePerformanceMonitor";
import { generateProjectVideos } from "../lib/cloudinary";
import { GlareCard } from "./components/ui/glare-card";

// Optimized Waveform Component
const WaveformVisualization = React.memo(() => {
  const bars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        height: `${30 + ((i * 7) % 40)}%`,
        duration: 2 + ((i * 0.3) % 2),
        delay: i * 0.1,
      })),
    []
  );

  return (
    <div className="w-full h-full flex items-center justify-center gap-1">
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className="flex-1 bg-foreground/20 rounded-full"
          style={{
            willChange: "height",
            height: "20%",
          }}
          animate={{
            height: ["20%", bar.height, "20%"],
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            delay: bar.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

// Optimized Floating Particles Component
const OptimizedFloatingParticles = React.memo(() => {
  const particles = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: `${20 + i * 15}%`,
        top: `${30 + i * 10}%`,
        duration: 3 + i,
        delay: i * 0.5,
      })),
    []
  );

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-foreground/30 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
});

interface Video {
  id: string;
  videoFile?: string;
  videoUrl: string;
  thumbnail?: string;
}

interface Project {
  id: number;
  title: string;
  client: string;
  type: string;
  category: string;
  videos: Video[];
  description: string;
}

export default function Home() {
  useScrollAnimation();
  const browserOpts = useBrowserOptimizations();
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);

  // Performance monitoring for Firefox debugging (development only)
  if (process.env.NODE_ENV === "development") {
    usePerformanceMonitor();
    usePerformanceWarnings();
  }

  // Apply Zen Browser detection to body for CSS targeting - only after hydration
  useEffect(() => {
    if (browserOpts.isZenBrowser) {
      document.body.setAttribute("data-zen-browser", "true");
    }
    return () => {
      document.body.removeAttribute("data-zen-browser");
    };
  }, [browserOpts.isZenBrowser]);

  const brands = [
    { name: "Always", logo: "/Brands/Always Logo.png" },
    { name: "Clorox", logo: "/Brands/Clorox.png" },
    { name: "Evvoli", logo: "/Brands/Evvoli Logo.png", invertColor: true },
    { name: "Hyundai", logo: "/Brands/Hyundai Logo HD.png", invertColor: true },
    { name: "LG", logo: "/Brands/LG.svg" },
    { name: "McDonald's", logo: "/Brands/McDonalds Logo.png" },
    { name: "Oral-B", logo: "/Brands/Oral-B.png" },
    { name: "Nolte Küchen", logo: "/Brands/Nolte Kuchen Logo.png" },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Clorox Platinum Campaign",
      client: "Clorox",
      type: "commercial",
      category: "music composition",
      videos: generateProjectVideos(
        'Clorox - platinum campaign - "mhhmm..." - music composition - commercial'
      ),
      description:
        "I had the honor of collaborating with Clorox on their iconic MMHHMM... campaign. Working with this leading global manufacturer of cleaning products, I crafted a premium commercial soundtrack that embodies their commitment to health, wellness, and superior cleaning power through an uplifting, fresh sonic identity.",
    },
    {
      id: 2,
      title: "Evvoli Dishwasher",
      client: "Evvoli",
      type: "sound design",
      category: "sound design",
      videos: generateProjectVideos("Evvoli - sound design"),
      description:
        "Sophisticated sound design for Evvoli's premium home appliances. This Italian luxury brand blends human-centric technology with neo-modern designs, requiring audio that embodies innovation, elegance, and cutting-edge functionality.",
    },
    {
      id: 3,
      title: "Always Generic Pack",
      client: "Always",
      type: "hiphop",
      category: "music composition",
      videos: generateProjectVideos(
        "Always Generic pack - music composition - hiphop"
      ),
      description:
        "Always commissioned me to compose trap music for their new product's TikTok campaign. I created hard-hitting hip-hop beats with modern trap influences that connect with young women and resonate with digital audiences across social media platforms.",
    },
    {
      id: 4,
      title: "KEY0N - Resume",
      client: "KEY0N",
      type: "hiphop",
      category: "music composition",
      videos: generateProjectVideos(
        "Key0n Resume - Music Video - music composition - hiphop trap"
      ),
      description:
        "I created this track called 'Resume' as my musical portfolio piece, designed to showcase my production skills and artistic range to potential clients and collaborators. This innovative approach to self-promotion features trap-influenced hip-hop production, serving as both a creative calling card and a demonstration of my ability to blend modern trap elements with classic hip-hop foundations.",
    },
    {
      id: 5,
      title: "LG Dual Sense",
      client: "LG",
      type: "sound design",
      category: "sound design",
      videos: generateProjectVideos("LG Dual Sense - Sound Design"),
      description:
        "Innovative sound design for LG's advanced home appliance technology. Global technology leader LG required audio that represents their dual inverter innovations, smart AI features, and energy-efficient solutions.",
    },
    {
      id: 6,
      title: "Nolte Küchen Campaign",
      client: "Nolte Küchen",
      type: "commercial",
      category: "music composition + sound design",
      videos: generateProjectVideos(
        "Nolte Kuchen - Music composition + Sound design - commercial"
      ),
      description:
        "Premium audio branding for Germany's favorite kitchen manufacturer. Nolte Küchen's 65+ years of German precision and luxury design required sophisticated music composition that reflects their award-winning quality and craftsmanship.",
    },
    {
      id: 7,
      title: "Oral-B Overnight Toothpaste",
      client: "Oral-B",
      type: "commercial",
      category: "music composition",
      videos: generateProjectVideos(
        "Oral B - overnight toothpaste - music composition"
      ),
      description:
        "Gentle, reassuring musical composition for Oral-B's overnight toothpaste campaign. The world's leading oral care brand trusted by dentists worldwide, featuring soothing melodies that convey nighttime care and morning freshness.",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/key.0n/profilecard/?igsh=YnN5bmw3YndyOXA=",
      icon: "instagram",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kianhamed",
      icon: "linkedin",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SchemaMarkup />
      <Navigation />

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
                    /* Firefox optimized - single border with box-shadow */
                    <div
                      className="absolute inset-0 border-2 border-foreground rounded-sm"
                      style={{
                        boxShadow: "0 0 8px rgba(250, 250, 250, 0.5)",
                      }}
                    />
                  ) : (
                    /* Full effect for other browsers */
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
                    /* Firefox optimized - single border with box-shadow */
                    <div
                      className="absolute inset-0 border-2 border-foreground rounded-sm"
                      style={{
                        boxShadow: "0 0 8px rgba(250, 250, 250, 0.5)",
                      }}
                    />
                  ) : (
                    /* Full effect for other browsers */
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

      {/* Brand Showcase Section */}
      <BrandMarquee brands={brands} />

      <section
        id="about"
        className="py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      >
        {/* Background ambience */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-foreground/3 rounded-full blur-[120px] -translate-x-1/2" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-foreground/3 rounded-full blur-[120px] translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Floating sound wave visualization */}
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <svg viewBox="0 0 1200 100" className="w-full h-20">
              <motion.path
                d="M0,50 Q300,20 600,50 T1200,50"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left side - Main content */}
            <motion.div
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <motion.span
                  className="text-small uppercase tracking-[0.2em] text-muted/60 font-normal"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Since Age 13
                </motion.span>
                <motion.h2
                  className="text-5xl lg:text-6xl font-semibold mt-4 leading-[1.1]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="text-foreground/90">I'm </span>
                  <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Key0n
                  </span>
                </motion.h2>
              </div>

              <div className="space-y-6">
                <motion.p
                  className="text-xl lg:text-2xl leading-relaxed text-foreground/80 font-normal"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  I don't just make beats.
                  <br />I craft{" "}
                  <span className="text-foreground font-medium">
                    emotional experiences
                  </span>{" "}
                  that move people and make brands{" "}
                  <span className="text-foreground font-medium">
                    unforgettable
                  </span>
                  .
                </motion.p>

                <motion.p
                  className="text-lg text-muted/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  My passion? Helping brands discover their{" "}
                  <span className="italic">true voice</span> through
                  custom-made, cinematic sound identities that resonate.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="inline-flex items-center gap-4 pt-4">
                    <div className="h-px w-12 bg-foreground/30" />
                    <p className="text-lg font-medium italic text-foreground/90">
                      Your brand deserves to be heard,
                      <br />
                      not just seen.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Visual element */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                {/* Audio waveform visualization */}
                <div
                  className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gradient-to-br from-foreground/5 to-transparent"
                  suppressHydrationWarning
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <WaveformVisualization />
                  </div>

                  {/* Floating particles */}
                  <OptimizedFloatingParticles />
                </div>

                {/* Quote marks */}
                <div className="absolute -top-4 -left-4 text-6xl text-foreground/10 font-serif">
                  "
                </div>
                <div className="absolute -bottom-4 -right-4 text-6xl text-foreground/10 font-serif rotate-180">
                  "
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom section - Team mention */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-lg text-muted/70 max-w-3xl mx-auto leading-relaxed">
              Together with my team, we create distinctive sonic signatures for
              <span className="text-foreground/80"> artists</span>,
              <span className="text-foreground/80"> brands</span>,
              <span className="text-foreground/80"> films</span>, and
              <span className="text-foreground/80"> experiences</span> that
              connect on a deeper level.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="work" className="py-16 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-40 md:mb-52 lg:mb-64">
            <h2 className="text-title font-semibold mb-8 uppercase scroll-fade-in">
              Featured Work
            </h2>
            <p className="text-body-large text-muted max-w-2xl mx-auto leading-relaxed font-normal">
              Collaborations with leading brands and artists across multiple
              genres
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-start lg:items-center`}
                initial={{
                  opacity: 0,
                  y: browserOpts.simplifyFramerMotion ? 20 : 50,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: browserOpts.simplifyFramerMotion ? "-50px" : "-100px",
                }}
                transition={{
                  duration: browserOpts.simplifyFramerMotion ? 0.2 : 0.6,
                  ease: browserOpts.useSimpleEasing
                    ? "easeOut"
                    : [0.4, 0, 0.2, 1],
                }}
                style={{
                  willChange: browserOpts.forceHardwareAcceleration
                    ? "transform, opacity"
                    : "auto",
                }}
              >
                {/* Video Side */}
                <div className="w-full lg:w-3/5 max-w-full">
                  <VideoCarousel videos={project.videos} />
                </div>

                {/* Description Side */}
                <div className="w-full lg:w-2/5 space-y-4 md:space-y-6">
                  <div className="space-y-4">
                    {/* Genre Badge */}
                    <div className="inline-flex">
                      <span className="px-3 py-1 bg-foreground/10 border border-foreground/20 rounded-full text-xs uppercase tracking-wide font-medium">
                        {project.type}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-subtitle font-medium text-foreground uppercase leading-tight">
                      {project.title}
                    </h3>

                    {/* Client Info */}
                    <div className="flex items-center gap-2 text-small text-muted uppercase font-normal">
                      <span className="w-2 h-2 bg-foreground/60 rounded-full"></span>
                      <span>{project.client}</span>
                    </div>
                  </div>

                  {/* Simple divider */}
                  <div className="w-full h-px bg-border"></div>

                  <div>
                    <p className="text-body leading-relaxed text-muted">
                      {project.description}
                    </p>
                  </div>

                  {/* Video Navigation Hint */}
                  {project.videos.length > 1 && (
                    <div className="text-caption text-muted/60 uppercase tracking-wide font-normal">
                      Use arrow keys or click to navigate videos
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beats Section - What I Create */}
      <section
        id="beats"
        className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-background via-background/95 to-background"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground/80">What I Create </span>
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                for You
              </span>
            </h2>
            <p className="text-lg text-muted/70 max-w-2xl mx-auto">
              Transforming your vision into unforgettable sonic experiences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Custom Brand Music */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlareCard
                glareColor="red"
                backgroundColor="red"
                className="flex flex-col p-8 lg:p-10 h-full"
              >
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-5 text-white tracking-wide">
                    Custom Brand Music
                  </h3>
                  <p className="text-white/70 font-normal leading-relaxed text-large">
                    Complete commercial tracks with strategic variations—from
                    full compositions to professional cutdowns tailored for
                    every campaign need.
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="space-y-3">
                    <div className="text-xs text-white/50 uppercase tracking-wider font-medium mb-2">
                      What's included
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="text-sm text-white/60">
                        Full track + variations
                      </div>
                      <div className="text-sm text-white/60">
                        Professional cutdowns
                      </div>
                      <div className="text-sm text-white/60">
                        Campaign-ready deliverables
                      </div>
                    </div>
                  </div>
                </div>
              </GlareCard>
            </motion.div>

            {/* Sonic Logos */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlareCard className="flex flex-col p-8 lg:p-10 h-full">
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3 text-white tracking-wide">
                    Sonic Logos & Audio Branding
                  </h3>
                  <p className="text-white/70 font-normal leading-relaxed text-sm">
                    Memorable sonic identities that create instant brand
                    recognition across every platform and touchpoint.
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="space-y-3">
                    <div className="text-xs text-white/50 uppercase tracking-wider font-medium mb-2">
                      What's included
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="text-sm text-white/60">
                        3-5 second signatures
                      </div>
                      <div className="text-sm text-white/60">
                        Platform-optimized versions
                      </div>
                      <div className="text-sm text-white/60">
                        Instant brand recall
                      </div>
                    </div>
                  </div>
                </div>
              </GlareCard>
            </motion.div>

            {/* Ready-to-use Beats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlareCard
                glareColor="yellow"
                backgroundColor="yellow"
                className="flex flex-col p-8 lg:p-10 h-full"
              >
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3 text-white tracking-wide">
                    Ready-to-use Beats & Tracks
                  </h3>
                  <p className="text-white/70 font-normal leading-relaxed text-sm">
                    High-quality, pre-made tracks for brands seeking quick,
                    catchy, and budget-friendly music solutions.
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="space-y-3">
                    <div className="text-xs text-white/50 uppercase tracking-wider font-medium mb-2">
                      What's included
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="text-sm text-white/60">
                        Instant licensing
                      </div>
                      <div className="text-sm text-white/60">
                        Multiple genres available
                      </div>
                      <div className="text-sm text-white/60">
                        Budget-friendly options
                      </div>
                    </div>
                  </div>
                </div>
              </GlareCard>
            </motion.div>
          </div>

          {/* Call to action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-muted/60 mb-6">
              Ready to elevate your brand's sonic identity?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground/5 hover:bg-foreground/10 border border-foreground/20 hover:border-foreground/30 rounded-full transition-all duration-300 group"
            >
              <span className="text-foreground/90 font-medium">
                Let's create something amazing
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-title font-semibold mb-6 uppercase scroll-fade-in">
              Let&apos;s Create
              <br />
              Something Amazing
            </h2>
            <p className="text-body text-muted uppercase font-normal">
              Ready to elevate your project?
            </p>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-transparent border-b-2 border-border focus:outline-none transition-all duration-200 text-body peer"
                  required
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-200">
                  {browserOpts.reduceBlur ? (
                    <div
                      className="w-full h-full bg-foreground rounded-full"
                      style={{
                        boxShadow: "0 0 6px rgba(250, 250, 250, 0.6)",
                      }}
                    />
                  ) : (
                    <>
                      <div className="w-full h-full bg-foreground rounded-full" />
                      <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                      <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-transparent border-b-2 border-border focus:outline-none transition-all duration-200 text-body peer"
                  required
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-200">
                  {browserOpts.reduceBlur ? (
                    <div
                      className="w-full h-full bg-foreground rounded-full"
                      style={{
                        boxShadow: "0 0 6px rgba(250, 250, 250, 0.6)",
                      }}
                    />
                  ) : (
                    <>
                      <div className="w-full h-full bg-foreground rounded-full" />
                      <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                      <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="relative">
              <select
                className="w-full px-6 py-4 bg-transparent border-b-2 border-border focus:outline-none transition-all duration-200 text-foreground text-body peer"
                required
              >
                <option value="">Select Project Type</option>
                <option value="commercial">Commercial Production</option>
                <option value="artist">Artist Collaboration</option>
                <option value="beats">Custom Beats</option>
                <option value="film">Film Scoring</option>
                <option value="mixing">Mixing & Mastering</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-200">
                {browserOpts.reduceBlur ? (
                  <div
                    className="w-full h-full bg-foreground rounded-full"
                    style={{
                      boxShadow: "0 0 6px rgba(250, 250, 250, 0.6)",
                    }}
                  />
                ) : (
                  <>
                    <div className="w-full h-full bg-foreground rounded-full" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <textarea
                placeholder="Tell us about your project..."
                rows={8}
                className="w-full px-6 py-4 bg-transparent border-b-2 border-border focus:outline-none transition-all duration-200 resize-none text-body leading-relaxed peer"
                required
              />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-200 -translate-y-[6px]">
                {browserOpts.reduceBlur ? (
                  <div
                    className="w-full h-full bg-foreground rounded-full"
                    style={{
                      boxShadow: "0 0 6px rgba(250, 250, 250, 0.6)",
                    }}
                  />
                ) : (
                  <>
                    <div className="w-full h-full bg-foreground rounded-full" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                  </>
                )}
              </div>
            </div>
            <div className="relative group">
              <button
                type="submit"
                className="w-full border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background py-5 font-medium text-small uppercase rounded-sm transition-all duration-300 relative z-10"
              >
                Send Message
              </button>
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
          </form>
        </div>
      </section>

      <footer className="py-16 px-6 sm:px-8 lg:px-12 border-t-2 border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-small text-muted uppercase font-normal">
              © 2024 Music Producer. All rights reserved.
            </div>
            <div className="flex gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-all duration-200 transform hover:scale-110"
                  aria-label={link.name}
                >
                  {link.name === "Instagram" ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

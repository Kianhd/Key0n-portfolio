"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoMusicalNotes, IoPulse, IoClose, IoArrowForward, IoArrowBack } from "react-icons/io5";
import { PiFilmReel } from "react-icons/pi";
import { FiPlay, FiCheck, FiStar, FiTarget, FiZap, FiHeart } from "react-icons/fi";
import PresentationAudioPlayer from "./PresentationAudioPlayer";

interface Slide {
  id: string;
  type: 'intro' | 'process' | 'examples' | 'included' | 'cta';
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  background?: string;
}

interface SlideService {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  description: string;
  accentColor: string;
  icon?: React.ComponentType<any>;
  textIcon?: string;
  workflow: Array<{ 
    step: string; 
    detail: string; 
    description: string;
    icon: React.ComponentType<any>;
    benefits: string[];
  }>;
  included: string[];
  examples: Array<{
    id: string;
    title: string;
    duration: string;
    cloudinaryId: string;
  }>;
}

const slideServices: SlideService[] = [
  {
    id: 'custom-brand-music',
    title: "Custom Brand Music",
    subtitle: "Living Sound Identities",
    hook: "Your brand deserves its own anthem.",
    description: "Full-length original music that transforms campaigns into emotional experiences and makes your brand unforgettable. Perfect for brands launching major campaigns, rebrands, or wanting to establish a distinctive audio identity.",
    accentColor: "#ef4444",
    icon: IoMusicalNotes,
    workflow: [
      { 
        step: "Discovery", 
        detail: "Brand DNA deep-dive and musical strategy session",
        description: "We start with understanding your brand's core identity, values, and emotional goals through intensive discovery sessions. I analyze your brand voice, target audience psychology, and competitive landscape to establish the perfect musical direction.",
        icon: FiTarget,
        benefits: [
          "Comprehensive brand DNA analysis",
          "Target audience emotional mapping",
          "Competitive sonic landscape review",
          "Musical strategy and direction planning"
        ]
      },
      { 
        step: "Compose", 
        detail: "Original full-length tracks crafted for your identity",
        description: "Create original 2-4 minute anthems that capture your brand's essence and emotional core. Each composition is built from scratch with your brand's unique personality, ensuring authentic emotional connections with your audience.",
        icon: FiHeart,
        benefits: [
          "100% original full-length compositions (2-4 minutes)",
          "Brand-specific emotional storytelling",
          "Unique musical identity development",
          "Authentic audience connection creation"
        ]
      },
      { 
        step: "Refine", 
        detail: "Collaborative feedback and perfection process",
        description: "Through structured revision rounds, we refine every element until it perfectly aligns with your vision. This collaborative process ensures the final anthem exceeds expectations and delivers maximum emotional impact for campaigns.",
        icon: FiStar,
        benefits: [
          "Structured feedback and revision process",
          "Collaborative refinement sessions",
          "Campaign-specific optimization",
          "Maximum emotional impact assurance"
        ]
      },
      { 
        step: "Deliver", 
        detail: "Complete package with all formats and usage rights",
        description: "Receive your brand anthem in multiple formats and cutdowns, plus exclusive usage rights for all applications. From 60-second campaign versions to 5-second social stings, everything needed to deploy across all touchpoints.",
        icon: FiZap,
        benefits: [
          "Multiple cutdowns and variations (60s, 30s, 15s, 5s)",
          "All file formats (WAV, MP3, stems)",
          "Exclusive usage rights included",
          "Multi-platform deployment ready"
        ]
      }
    ],
    included: [
      "Original full tracks (2-4 minutes)",
      "Multiple cutdowns & variations (60s, 30s, 15s, 5s)",
      "Exclusive usage rights for all applications",
      "All file formats (WAV, MP3, stems)"
    ],
    examples: [
      { id: "brand-anthem", title: "Brand Anthem", duration: "3:24", cloudinaryId: "brand_anthem_demo" },
      { id: "campaign-signature", title: "Campaign Signature", duration: "2:45", cloudinaryId: "campaign_signature_demo" },
      { id: "emotional-journey", title: "Emotional Journey", duration: "2:58", cloudinaryId: "emotional_journey_demo" }
    ]
  },
  {
    id: 'sonic-logos',
    title: "Sonic Logos & Jingles",
    subtitle: "Audio Branding",
    hook: "Be heard. Be remembered. Instantly.",
    description: "A 3–5 second sonic signature that makes your brand instantly recognizable and impossible to forget. Perfect for brands needing a distinctive audio identity for ads, YouTube/TikTok, podcasts, apps, retail spaces, or product UX.",
    accentColor: "#3b82f6",
    icon: IoPulse,
    workflow: [
      { 
        step: "Essence", 
        detail: "Define the brand's personality in a short creative workshop",
        description: "We start with understanding your brand's core personality through a focused creative workshop. This deep-dive session captures your brand values, target audience emotions, and competitive positioning to establish the perfect sonic direction.",
        icon: FiTarget,
        benefits: [
          "Brand personality deep-dive workshop",
          "Core values and emotion mapping",
          "Competitive sonic landscape analysis",
          "Target audience resonance planning"
        ]
      },
      { 
        step: "Motif", 
        detail: "Present 2–3 motif sketches; choose one direction",
        description: "Based on the workshop insights, I create 2-3 distinct motif sketches that capture different aspects of your brand personality. Each sketch explores unique musical approaches, giving you clear options to choose your perfect sonic direction.",
        icon: FiHeart,
        benefits: [
          "2-3 unique motif concepts",
          "Different musical approach explorations",
          "Clear direction selection process",
          "Brand personality authenticity testing"
        ]
      },
      { 
        step: "Refine", 
        detail: "Polish, finalize, and adapt into variations",
        description: "Your chosen motif is refined into a polished sonic logo with multiple variations. From stings to loops to bumpers, each version maintains the core brand essence while adapting to different usage scenarios.",
        icon: FiStar,
        benefits: [
          "Professional polish and finalization",
          "Multiple variation creation (sting, loop, bumper)",
          "Usage scenario optimization",
          "Brand consistency across formats"
        ]
      },
      { 
        step: "Deliver", 
        detail: "All exports packaged with stems + brand sound notes",
        description: "Receive comprehensive platform-ready exports for TV, social, app UX, podcasts, retail, and more. Includes final stereo masters, stems, and a mini brand sound guide with usage tips and best practices.",
        icon: FiZap,
        benefits: [
          "Platform-ready exports (TV, social, app UX, podcasts, retail)",
          "Final stereo masters (WAV/MP3) + stems",
          "Mini brand sound guide with usage tips",
          "Do's and don'ts documentation"
        ]
      }
    ],
    included: [
      "3–5 sec custom sonic logo (main motif)",
      "Variations (sting, loop, bumper)",
      "Platform-ready exports (TV, social, app UX, podcasts, retail, etc.)",
      "Mini brand sound guide (usage tips, do/don't)",
      "Final stereo masters (WAV/MP3) + stems"
    ],
    examples: [
      { id: "tech-brand-sting", title: "Tech Brand Sting", duration: "0:04", cloudinaryId: "tech_brand_sting_demo" },
      { id: "luxury-identity", title: "Luxury Identity", duration: "0:05", cloudinaryId: "luxury_identity_demo" },
      { id: "playful-jingle", title: "Playful Jingle", duration: "0:03", cloudinaryId: "playful_jingle_demo" }
    ]
  },
  {
    id: 'beats-tracks',
    title: "Beats & Tracks",
    subtitle: "Ready-to-Use + Customizable",
    hook: "Quick, catchy, brand-ready.",
    description: "Pick from premium pre-made tracks — or customize them to fit your exact vibe. Perfect for brands needing fast but high-quality campaign music, social media teams, or artists looking for professional production at speed.",
    accentColor: "#f59e0b",
    textIcon: "BEATS",
    workflow: [
      { 
        step: "Browse", 
        detail: "Select from curated, high-quality beats",
        description: "Explore our curated library of premium beats across multiple genres, moods, and tempos. Each track is professionally produced with trendy, catchy elements that feel premium — not stock. Find your perfect match quickly with organized categories.",
        icon: FiTarget,
        benefits: [
          "Curated premium tracks (multiple genres, moods, tempos)",
          "High-quality, trendy, and catchy music that feels premium",
          "Organized by genre and mood for easy browsing",
          "Professional production quality guaranteed"
        ]
      },
      { 
        step: "Customize", 
        detail: "Adjust structure, instrumentation, vocals, or style",
        description: "Make any track uniquely yours with professional customization options. Adjust tempo, arrangement, sections, instrumentation, or add vocal hooks. Transform pre-made into perfectly tailored for your brand identity.",
        icon: FiStar,
        benefits: [
          "Tempo and arrangement adjustments",
          "Section restructuring and editing",
          "Instrumentation modifications",
          "Vocal hooks and topline additions"
        ]
      },
      { 
        step: "License & Deliver", 
        detail: "Receive masters (and stems for exclusives)",
        description: "Choose your licensing tier and receive professional masters immediately. From standard digital usage to exclusive full buyouts with stems included, get exactly what you need with clear usage documentation.",
        icon: FiZap,
        benefits: [
          "Multiple licensing tiers available",
          "Stereo masters (WAV/MP3) delivery",
          "Stems included for exclusive tier",
          "License + usage documentation provided"
        ]
      }
    ],
    included: [
      "Curated premium tracks (multiple genres, moods, tempos)",
      "Optional customization (tempo, arrangement, sections, instrumentation, vocal hooks)",
      "License + usage documentation",
      "Stereo masters (WAV/MP3); stems available for exclusive tier"
    ],
    examples: [
      { id: "urban-energy", title: "Urban Energy", duration: "3:15", cloudinaryId: "urban_energy_demo" },
      { id: "corporate-drive", title: "Corporate Drive", duration: "2:48", cloudinaryId: "corporate_drive_demo" },
      { id: "cinematic-build", title: "Cinematic Build", duration: "3:33", cloudinaryId: "cinematic_build_demo" }
    ]
  },
  {
    id: 'film-music',
    title: "Music for Film",
    subtitle: "Shorts, Ads, Trailers, Docs",
    hook: "Make your visuals unforgettable.",
    description: "Original cinematic scores and soundscapes that turn stories into emotions. Perfect for film directors, producers, agencies, and creatives working on short films, documentaries, branded films, or cinematic ads.",
    accentColor: "#9333ea",
    icon: PiFilmReel,
    workflow: [
      { 
        step: "Spotting Session", 
        detail: "Analyze story arcs, characters, and hit points",
        description: "We begin with a comprehensive spotting session to analyze your story arcs, character development, and key emotional hit points. This deep dive into your narrative structure creates the foundation for emotionally charged soundscapes that deepen storytelling.",
        icon: FiTarget,
        benefits: [
          "Story arc and character analysis",
          "Emotional hit points identification", 
          "Narrative structure mapping",
          "Cinematic pacing assessment"
        ]
      },
      { 
        step: "Themes", 
        detail: "Create motif sketches, set instrumentation palette",
        description: "Develop cohesive themes and motifs that carry narrative weight throughout your film. I create motif sketches and establish the instrumentation palette that will define your project's unique sonic character and emotional resonance.",
        icon: FiHeart,
        benefits: [
          "Cohesive theme and motif development",
          "Narrative weight integration",
          "Instrumentation palette selection",
          "Unique sonic character creation"
        ]
      },
      { 
        step: "Score", 
        detail: "Write and sync to picture, with revision points",
        description: "Compose and sync original score cues, themes, underscoring, and transitions with tailored pacing and dynamics that fit your exact picture lock. Every cue is crafted to enhance specific moments with broadcast- and festival-ready quality.",
        icon: FiStar,
        benefits: [
          "Original score cues and themes",
          "Precise picture sync and timing",
          "Tailored pacing and dynamics",
          "Broadcast and festival-ready quality"
        ]
      },
      { 
        step: "Deliver", 
        detail: "Masters, stems, cue sheet for post",
        description: "Receive comprehensive delivery including final stereo masters, stems for flexible mixing in post, atmospheres, textures, risers, stings, and detailed cue sheets. Everything needed for seamless post-production integration.",
        icon: FiZap,
        benefits: [
          "Final stereo masters (WAV) + cue splits",
          "Stems for flexible mixing in post",
          "Atmospheres, textures, risers, stings",
          "Detailed cue sheets for post-production"
        ]
      }
    ],
    included: [
      "Original score cues (themes, underscoring, transitions)",
      "Atmospheres, textures, risers, stings",
      "Final stereo masters (WAV) + cue splits",
      "Stems for flexible mixing in post"
    ],
    examples: [
      { id: "opening-theme", title: "Opening Theme", duration: "2:12", cloudinaryId: "opening_theme_demo" },
      { id: "emotional-score", title: "Emotional Score", duration: "4:45", cloudinaryId: "emotional_score_demo" },
      { id: "finale-crescendo", title: "Finale Crescendo", duration: "3:28", cloudinaryId: "finale_crescendo_demo" }
    ]
  }
];

interface SlidePresentationProps {
  serviceId: string;
  onClose: () => void;
}

const SlidePresentation: React.FC<SlidePresentationProps> = ({ serviceId, onClose }) => {
  const service = slideServices.find(s => s.id === serviceId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlideRef = React.useRef(0);
  
  if (!service) return null;

  // Generate slides for the service
  const slides: Slide[] = [
    // Intro slide
    {
      id: 'intro',
      type: 'intro',
      title: service.title,
      subtitle: service.subtitle,
      content: (
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            {service.icon ? (
              <service.icon 
                className="w-20 h-20 mx-auto mb-6" 
                style={{ color: service.accentColor }}
              />
            ) : (
              <div 
                className="text-5xl font-bold tracking-wider mb-6"
                style={{ 
                  fontFamily: "Subway Berlin OT, sans-serif",
                  color: service.accentColor 
                }}
              >
                {service.textIcon}
              </div>
            )}
          </div>
          <p className="text-2xl text-white/80 mb-8 leading-relaxed">{service.hook}</p>
          <p className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">{service.description}</p>
        </div>
      )
    },
    
    // Process slides - one for each workflow step
    ...service.workflow.map((step, index) => ({
      id: `process-${index}`,
      type: 'process' as const,
      title: `${index + 1}. ${step.step}`,
      subtitle: step.detail,
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: `${service.accentColor}20` }}
                >
                  <step.icon className="w-8 h-8" style={{ color: service.accentColor }} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">{step.step}</h3>
                  <p className="text-white/70 text-lg">{step.detail}</p>
                </div>
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-8">{step.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {step.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: service.accentColor }} />
                    <span className="text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* Visual representation of the process step */}
              <div 
                className="w-full h-64 rounded-2xl flex items-center justify-center text-6xl"
                style={{ 
                  background: `linear-gradient(135deg, ${service.accentColor}20 0%, ${service.accentColor}05 100%)`,
                  border: `2px solid ${service.accentColor}30`
                }}
              >
                <step.icon style={{ color: service.accentColor }} />
              </div>
              
              {/* Step number indicator */}
              <div 
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-xl"
                style={{ backgroundColor: service.accentColor }}
              >
                {index + 1}
              </div>
            </div>
          </div>
        </div>
      )
    })),
    
    // Audio examples slide
    {
      id: 'examples',
      type: 'examples',
      title: 'Listen to Examples',
      subtitle: 'Professional quality you can hear',
      content: (
        <div className="max-w-4xl mx-auto">
          <PresentationAudioPlayer
            examples={service.examples}
            accentColor={service.accentColor}
          />
        </div>
      )
    },
    
    // What's included slide
    {
      id: 'included',
      type: 'included',
      title: "What's Included",
      subtitle: 'Everything you need for success',
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.included.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                <FiCheck 
                  className="w-6 h-6 mt-1 flex-shrink-0"
                  style={{ color: service.accentColor }}
                />
                <span className="text-white/90 text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    
    // CTA slide
    {
      id: 'cta',
      type: 'cta',
      title: 'Ready to Get Started?',
      subtitle: 'Let\'s create something unforgettable',
      content: (
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Transform your brand with professional music that connects, engages, and converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: service.accentColor,
                color: 'black'
              }}
            >
              Request Custom Demo
            </button>
            <button className="px-10 py-4 border-2 border-white/20 rounded-full font-semibold text-lg hover:bg-white/5 transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      )
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        prevSlideRef.current = currentSlide;
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        prevSlideRef.current = currentSlide;
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slides.length, onClose]);

  const nextSlide = () => {
    prevSlideRef.current = currentSlide;
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };
  const prevSlide = () => {
    prevSlideRef.current = currentSlide;
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{service.title}</h1>
            <p className="text-white/60 text-sm">{service.subtitle}</p>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
              prevSlideRef.current = currentSlide;
              setCurrentSlide(index);
            }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'scale-125' 
                  : 'hover:scale-110'
              }`}
              style={{
                backgroundColor: index === currentSlide 
                  ? service.accentColor 
                  : 'rgba(255, 255, 255, 0.3)'
              }}
            />
          ))}
          <span className="ml-4 text-white/60 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: currentSlide > prevSlideRef.current ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentSlide > prevSlideRef.current ? -300 : 300 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-7xl mx-auto"
          >
            {/* Slide header */}
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h2>
              {slides[currentSlide].subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-xl text-white/70"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              )}
            </div>

            {/* Slide content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {slides[currentSlide].content}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Background decoration */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 70%, ${service.accentColor}20 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6 border-t border-white/10">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            currentSlide === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-white/10 hover:scale-105'
          }`}
        >
          <IoArrowBack className="w-5 h-5" />
          Previous
        </button>

        <div className="text-center text-white/60 text-sm">
          Use arrow keys to navigate • ESC to close
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            currentSlide === slides.length - 1
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-white/10 hover:scale-105'
          }`}
          style={{
            backgroundColor: currentSlide === slides.length - 1 
              ? undefined 
              : `${service.accentColor}20`,
            color: currentSlide === slides.length - 1 
              ? undefined 
              : service.accentColor
          }}
        >
          Next
          <IoArrowForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SlidePresentation;
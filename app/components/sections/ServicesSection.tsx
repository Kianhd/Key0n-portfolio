"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import ServiceCard from "../ServiceCard";
import ExpandableTimeline from "../ExpandableTimeline";
import ExpandableExplanation from "../ExpandableExplanation";
import ExpandableBeatsLicensing from "../ExpandableBeatsLicensing";
import { IoMusicalNotes, IoPulse, IoFilm } from "react-icons/io5";
import { PiFilmReel } from "react-icons/pi";
import { FiPhone, FiArrowRight } from "react-icons/fi";
import { serviceTimelines } from "@/app/types/timeline";

const ServicesSection: React.FC = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const timelineRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleExpandToggle = (serviceId: string) => {
    const isClosing = expandedService === serviceId;
    const isSwitching = expandedService && expandedService !== serviceId;
    
    const scrollToOptimalPosition = (serviceId: string) => {
      if (cardsGridRef.current && timelineContainerRef.current) {
        // Get the call-to-action button element
        const ctaButton = document.querySelector('[href="#contact"]');
        
        // Special handling for Film Music Packages
        if (serviceId === 'film-scoring') {
          // Wait a bit for the animation to start, then find the header
          setTimeout(() => {
            // Look for the Film Music Packages header text in the expanded content
            const headerElement = document.querySelector('h3[style*="color"]');
            
            if (headerElement && headerElement.textContent?.includes('Film Music Packages')) {
              const headerRect = headerElement.getBoundingClientRect();
              const headerTop = window.pageYOffset + headerRect.top;
              
              // Position header further up to show both title and subtitle
              window.scrollTo({
                top: headerTop - 80,
                behavior: 'smooth'
              });
            } else {
              // Enhanced fallback: look for any element containing "Film Music Packages"
              const filmMusicElements = Array.from(document.querySelectorAll('*')).filter(
                el => el.textContent?.includes('Film Music Packages') && el.offsetParent !== null
              );
              
              if (filmMusicElements.length > 0) {
                const element = filmMusicElements[0] as HTMLElement;
                const elementRect = element.getBoundingClientRect();
                const elementTop = window.pageYOffset + elementRect.top;
                
                window.scrollTo({
                  top: elementTop - 80,
                  behavior: 'smooth'
                });
              } else {
                // Final fallback: scroll to timeline container
                const timelineRect = timelineContainerRef.current.getBoundingClientRect();
                const timelineTop = window.pageYOffset + timelineRect.top;
                
                window.scrollTo({
                  top: timelineTop + 50, // Slightly into the content
                  behavior: 'smooth'
                });
              }
            }
          }, 200); // Increased delay for better element detection
        } else {
          // Timeline services (Custom Brand Music, Sonic Logos) - show timeline content at top
          setTimeout(() => {
            // Get the timeline container that should now be expanded
            const timelineRect = timelineContainerRef.current.getBoundingClientRect();
            const timelineTop = window.pageYOffset + timelineRect.top;
            
            // Scroll to show the timeline header at the top of viewport
            window.scrollTo({
              top: timelineTop - 200, // Position timeline content at top with small margin
              behavior: 'smooth'
            });
          }, 300); // Longer delay to ensure timeline is fully expanded
        }
      }
    };
    
    if (isSwitching) {
      // When switching, close current first, then open new one after a delay
      setExpandedService(null);
      
      setTimeout(() => {
        setExpandedService(serviceId);
        
        // Scroll to optimal position after timeline opens
        setTimeout(() => scrollToOptimalPosition(serviceId), 100);
      }, 300); // Wait for collapse animation
      
    } else if (isClosing) {
      // When closing, collapse and scroll back to cards
      setExpandedService(null);
      
      setTimeout(() => {
        if (cardsGridRef.current) {
          const cardsTop = cardsGridRef.current.getBoundingClientRect().top;
          const scrollTop = window.pageYOffset + cardsTop - 100;
          
          window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }, 100);
      
    } else {
      // When opening for the first time
      setExpandedService(serviceId);
      
      // Scroll to optimal position after timeline opens
      setTimeout(() => scrollToOptimalPosition(serviceId), 100);
    }
  };

  const services = [
    {
      id: 'custom-brand-music',
      title: "Custom Brand Music",
      description: "Your brand deserves a soundtrack as powerful as its story. I create full-length anthems that transform campaigns into emotional experiences and make your brand unforgettable.",
      features: [
        "Original full tracks",
        "Cutdowns + variations",
        "Exclusive usage rights"
      ],
      accentColor: "red" as const,
      icon: IoMusicalNotes,
      hasTimeline: true,
      hasTextExpansion: false,
      hasBeatsLicensing: false
    },
    {
      id: 'sonic-logos',
      title: "Sonic Logos and Jingles",
      description: "Be recognized in a heartbeat. Create your brand's signature sound that makes you instantly memorable across all platforms — <span class=\"font-semibold text-white/90\">think McDonald's \"I'm lovin' it\" or Netflix's \"ta-dum\", but uniquely yours</span>.",
      features: [
        "3–5 sec original sonic logo",
        "Platform-optimized cuts (TV, social, radio)",
        "Full ownership with no licensing fees",
        "Collaborative refinement process"
      ],
      accentColor: "blue" as const,
      icon: IoPulse,
      hasTimeline: true,
      hasTextExpansion: false,
      hasBeatsLicensing: false
    },
    {
      id: 'content-creators',
      title: "Ready-to-use Beats & Tracks",
      description: "Need it fast? Choose from premium, pre-made tracks designed to energize your brand and boost your content instantly — no compromise on quality. You can also customize any track to perfectly match your brand's unique vibe.",
      features: [
        "Immediate licensing",
        "Pre-mastered quality",
        "Multiple genres available",
        "Flexible usage rights"
      ],
      accentColor: "yellow" as const,
      textIcon: "BEATS",
      comingSoon: false,
      hasTimeline: false,
      hasTextExpansion: false,
      hasBeatsLicensing: true
    },
    {
      id: 'film-scoring',
      title: "Music for Film",
      description: "From essential themes to full scoring — choose the perfect soundtrack solution for your film project with flexible packages that scale with your needs.",
      features: [
        "3 tiered packages (Basic, Pro, Premium)",
        "Intro & ending themes included",
        "Optional full scoring & mixing",
        "Scale up as your project grows"
      ],
      accentColor: "purple" as const,
      icon: PiFilmReel,
      hasTimeline: false,
      hasTextExpansion: true,
      hasBeatsLicensing: false
    }
  ];

  const getAccentColorHex = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      red: '#ef4444',
      yellow: '#f59e0b',
      blue: '#3b82f6',
      green: '#22c55e',
      purple: '#9333ea',
      pink: '#ec4899',
      orange: '#f97316',
      white: '#ffffff',
      gray: '#9ca3af',
      default: '#ffffff'
    };
    return colorMap[color] || colorMap.default;
  };

  const getNeutralButtonStyles = (): string => {
    return `
      bg-gradient-to-r from-white/10 to-white/5
      hover:from-white/15 hover:to-white/10
      border border-white/20 hover:border-white/30
      shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30
    `;
  };

  const getExpandedButtonStyles = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    const color = service?.accentColor || 'default';
    
    const colorMap: { [key: string]: string } = {
      red: `
        bg-gradient-to-r from-red-600/90 to-red-700/90
        hover:from-red-500 hover:to-red-600
        border border-red-500/30 hover:border-red-400/50
        shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30
        ring-1 ring-red-400/40
      `,
      blue: `
        bg-gradient-to-r from-blue-600/90 to-blue-700/90
        hover:from-blue-500 hover:to-blue-600
        border border-blue-500/30 hover:border-blue-400/50
        shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30
        ring-1 ring-blue-400/40
      `,
      yellow: `
        bg-gradient-to-r from-yellow-600/90 to-yellow-700/90
        hover:from-yellow-500 hover:to-yellow-600
        border border-yellow-500/30 hover:border-yellow-400/50
        shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30
        ring-1 ring-yellow-400/40
      `,
      purple: `
        bg-gradient-to-r from-purple-600/90 to-purple-700/90
        hover:from-purple-500 hover:to-purple-600
        border border-purple-500/30 hover:border-purple-400/50
        shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30
        ring-1 ring-purple-400/40
      `,
      default: getNeutralButtonStyles()
    };
    
    return colorMap[color] || colorMap.default;
  };

  const getExpandedGlowStyles = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    const color = service?.accentColor || 'default';
    
    const glowMap: { [key: string]: string } = {
      red: 'from-red-400/20',
      blue: 'from-blue-400/20',
      yellow: 'from-yellow-400/20',
      purple: 'from-purple-400/20',
      default: 'from-white/10'
    };
    
    return glowMap[color] || glowMap.default;
  };

  const getExpandedGlowColor = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    const color = service?.accentColor || 'default';
    
    const colorMap: { [key: string]: string } = {
      red: 'rgba(248, 113, 113, 0.2)',
      blue: 'rgba(96, 165, 250, 0.2)',
      yellow: 'rgba(251, 191, 36, 0.2)',
      purple: 'rgba(196, 181, 253, 0.2)',
      default: 'rgba(255, 255, 255, 0.1)'
    };
    
    return colorMap[color] || colorMap.default;
  };

  const getExpandedButtonBackground = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    const color = service?.accentColor || 'default';
    
    const backgroundMap: { [key: string]: string } = {
      red: 'linear-gradient(to right, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))',
      blue: 'linear-gradient(to right, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9))',
      yellow: 'linear-gradient(to right, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.9))',
      purple: 'linear-gradient(to right, rgba(147, 51, 234, 0.9), rgba(126, 34, 206, 0.9))',
      default: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
    };
    
    return backgroundMap[color] || backgroundMap.default;
  };

  const getExpandedButtonBorder = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    const color = service?.accentColor || 'default';
    
    const borderMap: { [key: string]: string } = {
      red: '1px solid rgba(239, 68, 68, 0.3)',
      blue: '1px solid rgba(59, 130, 246, 0.3)',
      yellow: '1px solid rgba(245, 158, 11, 0.3)',
      purple: '1px solid rgba(147, 51, 234, 0.3)',
      default: '1px solid rgba(255, 255, 255, 0.2)'
    };
    
    return borderMap[color] || borderMap.default;
  };

  const getExpandedButtonShadow = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    const color = service?.accentColor || 'default';
    
    const shadowMap: { [key: string]: string } = {
      red: '0 8px 32px rgba(239, 68, 68, 0.2), 0 4px 16px rgba(239, 68, 68, 0.3), 0 0 0 1px rgba(239, 68, 68, 0.4)',
      blue: '0 8px 32px rgba(59, 130, 246, 0.2), 0 4px 16px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.4)',
      yellow: '0 8px 32px rgba(245, 158, 11, 0.2), 0 4px 16px rgba(245, 158, 11, 0.3), 0 0 0 1px rgba(245, 158, 11, 0.4)',
      purple: '0 8px 32px rgba(147, 51, 234, 0.2), 0 4px 16px rgba(147, 51, 234, 0.3), 0 0 0 1px rgba(147, 51, 234, 0.4)',
      default: '0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)'
    };
    
    return shadowMap[color] || shadowMap.default;
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-background via-background/95 to-background"
    >
      <div className="max-w-8xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl tracking-tight font-bold mb-6">
            <span className="text-foreground/80 tracking-tight">What I Create </span>
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              for You
            </span>
          </h2>
          <p className="text-lg text-muted/70 max-w-2xl mx-auto">
            Transforming your vision into unforgettable sonic experiences
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Service Cards Grid */}
          <div 
            ref={cardsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 max-w-none auto-rows-fr"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                features={service.features}
                delay={0.1 * (index + 1)}
                accentColor={service.accentColor}
                icon={service.icon}
                textIcon={service.textIcon}
                comingSoon={service.comingSoon}
                serviceId={service.id}
                onExpandToggle={(service.hasTimeline || service.hasTextExpansion || service.hasBeatsLicensing) ? () => handleExpandToggle(service.id) : undefined}
                isExpanded={expandedService === service.id}
              />
            ))}
          </div>

          {/* Timeline Container - Single container for all timelines and explanations */}
          <div ref={timelineContainerRef} className="relative">
            {/* Expandable Timelines */}
            {services.map((service) => (
              service.hasTimeline && serviceTimelines[service.id] && (
                <div 
                  key={`timeline-${service.id}`}
                  ref={(el) => { timelineRefs.current[service.id] = el; }}
                >
                  <ExpandableTimeline
                    steps={serviceTimelines[service.id]}
                    isOpen={expandedService === service.id}
                    accentColor={getAccentColorHex(service.accentColor)}
                    serviceTitle={service.title}
                  />
                </div>
              )
            ))}
            
            {/* Expandable Explanation for Film Scoring */}
            {services.map((service) => (
              service.hasTextExpansion && (
                <div 
                  key={`explanation-${service.id}`}
                  ref={(el) => { timelineRefs.current[service.id] = el; }}
                >
                  <ExpandableExplanation
                    isOpen={expandedService === service.id}
                    accentColor={getAccentColorHex(service.accentColor)}
                    serviceTitle={service.title}
                  />
                </div>
              )
            ))}
            
            {/* Expandable Beats Licensing */}
            {services.map((service) => (
              service.hasBeatsLicensing && (
                <div 
                  key={`beats-${service.id}`}
                  ref={(el) => { timelineRefs.current[service.id] = el; }}
                >
                  <ExpandableBeatsLicensing
                    isOpen={expandedService === service.id}
                    accentColor={getAccentColorHex(service.accentColor)}
                    serviceTitle={service.title}
                  />
                </div>
              )
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/80 mb-8 text-xl font-medium">
            Ready to bring your vision to life with professional audio?
          </p>
          
          <motion.div
            className="relative inline-block"
            animate={expandedService ? {
              scale: [1, 1.02, 1]
            } : {}}
            transition={{ 
              duration: 2, 
              repeat: expandedService ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-xl backdrop-blur-sm hover:scale-105 hover:-translate-y-1 overflow-hidden"
              style={{
                background: expandedService 
                  ? getExpandedButtonBackground(expandedService)
                  : 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                border: expandedService
                  ? getExpandedButtonBorder(expandedService)
                  : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: expandedService
                  ? getExpandedButtonShadow(expandedService)
                  : '0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              animate={expandedService ? {
                scale: [1, 1.005, 1]
              } : {}}
              transition={{ 
                duration: 3, 
                repeat: expandedService ? Infinity : 0,
                repeatType: "reverse"
              }}
            >
              {/* Background glow effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r to-transparent opacity-0 group-hover:opacity-100"
                style={{
                  backgroundImage: expandedService 
                    ? `linear-gradient(to right, ${getExpandedGlowColor(expandedService)}, transparent)`
                    : 'linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              
              {/* Phone icon with shake animation */}
              <motion.div
                animate={expandedService ? {
                  x: [-1, 1, -1, 1, 0],
                  rotate: [-2, 2, -2, 2, 0]
                } : {}}
                transition={{ 
                  duration: 0.5, 
                  repeat: expandedService ? Infinity : 0,
                  repeatDelay: 2
                }}
              >
                <FiPhone className="w-5 h-5 text-white/90 relative z-10" />
              </motion.div>
              
              <span className="text-white font-semibold text-lg relative z-10 group-hover:text-white">
                {expandedService === 'content-creators' ? (
                  <>
                    Order Custom <span style={{ fontFamily: "Subway Berlin OT, sans-serif" }}>BEATS</span>
                  </>
                ) : (
                  'Book Discovery Call'
                )}
              </span>
              
              <FiArrowRight className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 relative z-10" />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -top-4 -bottom-4 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </motion.a>
          </motion.div>
          
          <p className="text-white/70 mt-4 font-medium text-sm">
            Free 30-minute consultation • No commitment required
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
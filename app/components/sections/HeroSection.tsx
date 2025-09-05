"use client";

import React from "react";
import { motion } from "motion/react";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";
import PrismaticBurst from "@/components/PrismaticBurst";

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
      {/* PrismaticBurst Background */}
      <div style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 0 
      }}>
        <PrismaticBurst
          animationType="hover"
          intensity={2}
          speed={0.45}
          distort={4.6}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.56}
          rayCount={0}
          mixBlendMode="lighten"
          colors={['#3D0000', '#2E2600', '#000319']}
        />
      </div>

      {/* Subtle Vignette Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 80% at 50% 40%, 
              transparent 0%, 
              transparent 40%, 
              rgba(0, 0, 0, 0.1) 70%, 
              rgba(0, 0, 0, 0.3) 85%, 
              rgba(0, 0, 0, 0.6) 95%, 
              rgba(0, 0, 0, 0.9) 100%
            ),
            linear-gradient(
              180deg, 
              transparent 0%, 
              transparent 70%, 
              rgba(0, 0, 0, 0.1) 80%, 
              rgba(0, 0, 0, 0.4) 90%, 
              rgba(0, 0, 0, 0.8) 100%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 text-center relative z-10 py-32 sm:py-40 lg:py-48">
          
          {/* KEY0N Logo */}
          <div className="mb-12 flex justify-center">
            <div className="relative group">
              <img 
                src="/assets/Key0n Logo-White.png" 
                alt="KEY0N Logo" 
                className="h-30 w-auto transition-all duration-300 group-hover:scale-110"
              />
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
            </div>
          </div>

          {/* Main Heading */}
          <div 
            className="relative mb-8"
            style={{
              fontSize: "clamp(3.8rem, 9vw, 8.5rem)",
              lineHeight: "0.9",
              letterSpacing: "-0.03em",
              fontWeight: 400,
              fontFamily: "'Cador', Georgia, 'Times New Roman', serif",
            }}
          >
            <div className="block mb-3">
              <span 
                className="block"
                style={{
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(230, 230, 230, 0.9) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 1px 3px rgba(0,0,0,0.12)",
                }}
              >
                MUSIC THAT TELLS
              </span>
            </div>
            
            <div className="block">
              <span 
                className="block relative"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
                }}
              >
                YOUR STORY
              </span>
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="mb-16 max-w-4xl mx-auto">
            <p 
              className="leading-relaxed"
              style={{
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.90)",
                fontFamily: "League Spartan, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif",
                letterSpacing: "-0.015em",
                fontWeight: 300,
              }}
            >
              Helping{" "}
              <span 
                style={{
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 1)",
                }}
              >
                brands, films, and artists
              </span>{" "}
              discover their sonic identity through{" "}
              <span 
                style={{
                  fontWeight: 450,
                  background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                custom-crafted music
              </span>{" "}
              that resonates and inspires.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            {/* Primary CTA - Get In Touch (styled like nav) */}
            <div 
              className="relative group w-full sm:w-auto"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative overflow-hidden"
              >
                <div
                  className="relative text-sm font-medium uppercase tracking-[0.08em] transition-all duration-500 ease-out"
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '6px',
                    color: 'rgba(0, 0, 0, 0.9)',
                    fontWeight: 400,
                    boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(185, 28, 28, 0.95) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.6)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.color = 'rgba(0, 0, 0, 0.9)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }}
                >
                  Get In Touch
                  
                  {/* Subtle accent line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.4) 50%, transparent 100%)'
                    }}
                  />
                </div>
              </a>
            </div>

            {/* Secondary CTA - View My Work (Inverted Hover Effect) */}
            <div 
              className="relative group w-full sm:w-auto"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <a
                href="#work"
                className="relative overflow-hidden inline-flex items-center justify-center font-medium transition-all duration-300 ease-out w-full sm:w-auto"
                style={{
                  padding: "12px 24px",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "6px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(101, 51, 15, 0.1) 100%)";
                  e.currentTarget.style.borderColor = "rgba(139, 69, 19, 0.3)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View My Work
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
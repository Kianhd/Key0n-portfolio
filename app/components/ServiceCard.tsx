"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { IconType } from "react-icons";
import { FiChevronDown } from "react-icons/fi";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  delay?: number;
  accentColor?: "red" | "yellow" | "blue" | "green" | "purple" | "pink" | "orange" | "white" | "gray" | "default";
  icon?: IconType;
  textIcon?: string;
  comingSoon?: boolean;
  onExpandToggle?: () => void;
  isExpanded?: boolean;
  serviceId?: string;
}

export default function ServiceCard({
  title,
  description,
  features,
  delay = 0,
  accentColor = "default",
  icon: Icon,
  textIcon,
  comingSoon = false,
  onExpandToggle,
  isExpanded = false,
  serviceId,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use scroll-triggered animation on mobile, hover on desktop, or when expanded
  const isActive = isMobile ? isInView : (isHovered || isExpanded);

  // Subtle accent colors for Fortune 500 aesthetic
  const accentColors = {
    red: "rgba(239, 68, 68, 0.1)",
    yellow: "rgba(245, 158, 11, 0.1)", 
    blue: "rgba(59, 130, 246, 0.1)",
    green: "rgba(34, 197, 94, 0.1)",
    purple: "rgba(147, 51, 234, 0.1)",
    pink: "rgba(236, 72, 153, 0.1)",
    orange: "rgba(249, 115, 22, 0.1)",
    white: "rgba(255, 255, 255, 0.05)",
    gray: "rgba(156, 163, 175, 0.1)",
    default: "rgba(255, 255, 255, 0.03)"
  };

  const accentBorders = {
    red: "rgba(239, 68, 68, 0.2)",
    yellow: "rgba(245, 158, 11, 0.2)",
    blue: "rgba(59, 130, 246, 0.2)",
    green: "rgba(34, 197, 94, 0.2)",
    purple: "rgba(147, 51, 234, 0.2)",
    pink: "rgba(236, 72, 153, 0.2)",
    orange: "rgba(249, 115, 22, 0.2)",
    white: "rgba(255, 255, 255, 0.1)",
    gray: "rgba(156, 163, 175, 0.2)",
    default: "rgba(255, 255, 255, 0.08)"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-50px" : "-100px", amount: isMobile ? 0.3 : 0.1 }}
      transition={{ duration: 0.6, delay }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className="group h-full"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl 
          backdrop-blur-xl
          transition-all duration-500 ease-out
          transform hover:scale-[1.02] hover:-translate-y-2
          h-full w-full
          flex flex-col
          shadow-xl sm:shadow-2xl shadow-black/20
          hover:shadow-2xl sm:hover:shadow-3xl hover:shadow-black/30
          ${onExpandToggle && !comingSoon ? 'cursor-pointer' : ''}
        `}
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.02) 0%, 
            ${isActive ? accentColors[accentColor] : "rgba(255, 255, 255, 0.01)"} 50%, 
            rgba(0, 0, 0, 0.02) 100%
          )`,
          border: `1px solid ${isActive ? accentBorders[accentColor] : "rgba(255, 255, 255, 0.06)"}`,
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.02),
            0 20px 40px -10px rgba(0, 0, 0, 0.3),
            0 8px 32px -8px rgba(0, 0, 0, 0.2),
            ${isActive ? `0 0 40px -10px ${accentColors[accentColor]}` : ""}
          `
        }}
        onClick={onExpandToggle && !comingSoon ? onExpandToggle : undefined}
      >
        {/* Subtle top accent line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[1px] transition-all duration-500"
          style={{
            background: isActive 
              ? `linear-gradient(90deg, transparent 0%, ${accentBorders[accentColor]} 50%, transparent 100%)`
              : "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
          }}
        />

        {/* Coming Soon Tag */}
        {comingSoon && (
          <div className="absolute top-4 right-4 z-20">
            <span 
              className="inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-[0.1em] font-semibold transition-all duration-300 bg-[#FFC60B]/15 border border-[#FFC60B]/30 text-[#FFD23F]"
              style={{
                boxShadow: '0 0 12px rgba(255, 198, 11, 0.1)',
              }}
            >
              Coming Soon
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col h-full p-6 sm:p-8 lg:p-10 relative z-10">
          {/* Header */}
          <div className="flex-1 mb-8">
            {(Icon || textIcon) && (
              <div className="mb-6">
                {Icon ? (
                  <Icon 
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 transition-all duration-300 hover:scale-110"
                    style={{
                      color: isActive 
                        ? accentBorders[accentColor].replace('0.2)', '0.8)') // Much brighter on card hover
                        : "rgba(255, 255, 255, 0.7)",
                      filter: isActive ? 'brightness(1.3) saturate(1.2)' : 'none'
                    }}
                  />
                ) : (
                  <div 
                    className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wider transition-all duration-300 hover:scale-110 inline-block"
                    style={{
                      fontFamily: "Subway Berlin OT, sans-serif",
                      color: isActive 
                        ? accentBorders[accentColor].replace('0.2)', '0.8)') // Much brighter on card hover
                        : "rgba(255, 255, 255, 0.7)",
                      filter: isActive ? 'brightness(1.3) saturate(1.2)' : 'none'
                    }}
                  >
                    {textIcon}
                  </div>
                )}
              </div>
            )}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-white/95 tracking-wide leading-tight">
              {title}
            </h3>
            <p 
              className="text-white/70 font-normal leading-relaxed text-sm sm:text-base lg:text-lg"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Features */}
          <div className="flex-shrink-0">
            <div className="mb-4 sm:mb-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="space-y-3 sm:space-y-5">
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-medium">
                What's included
              </div>
              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                    <IoCheckmark 
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 transition-all duration-300 hover:scale-110"
                      style={{
                        color: isActive 
                          ? accentBorders[accentColor].replace('0.2)', '0.8)') // Much brighter on card hover
                          : "rgba(255, 255, 255, 0.6)",
                        filter: isActive ? 'brightness(1.3) saturate(1.2)' : 'none'
                      }}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expand Timeline Button */}
          {serviceId && onExpandToggle && !comingSoon && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation(); // Prevent double-clicking when card is also clickable
                onExpandToggle();
              }}
              className="absolute bottom-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: isExpanded 
                  ? accentBorders[accentColor].replace('0.2)', '0.15)')
                  : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isExpanded 
                  ? accentBorders[accentColor] 
                  : 'rgba(255, 255, 255, 0.1)'}`,
              }}
              whileHover={{ rotate: isExpanded ? 180 : 0 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronDown 
                className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                style={{
                  color: isExpanded 
                    ? accentBorders[accentColor].replace('0.2)', '0.8)')
                    : 'rgba(255, 255, 255, 0.6)',
                }}
              />
            </motion.button>
          )}
        </div>

        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`
          }}
        />
      </div>
    </motion.div>
  );
}
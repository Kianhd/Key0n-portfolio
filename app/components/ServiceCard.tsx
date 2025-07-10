"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  delay?: number;
  accentColor?: "red" | "yellow" | "blue" | "green" | "purple" | "pink" | "orange" | "white" | "gray" | "default";
}

export default function ServiceCard({
  title,
  description,
  features,
  delay = 0,
  accentColor = "default",
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl 
          backdrop-blur-xl
          transition-all duration-500 ease-out
          transform hover:scale-[1.02] hover:-translate-y-2
          min-h-[700px] w-full
          flex flex-col
          shadow-2xl shadow-black/20
          hover:shadow-3xl hover:shadow-black/30
        `}
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.02) 0%, 
            ${isHovered ? accentColors[accentColor] : "rgba(255, 255, 255, 0.01)"} 50%, 
            rgba(0, 0, 0, 0.02) 100%
          )`,
          border: `1px solid ${isHovered ? accentBorders[accentColor] : "rgba(255, 255, 255, 0.06)"}`,
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.02),
            0 20px 40px -10px rgba(0, 0, 0, 0.3),
            0 8px 32px -8px rgba(0, 0, 0, 0.2),
            ${isHovered ? `0 0 40px -10px ${accentColors[accentColor]}` : ""}
          `
        }}
      >
        {/* Subtle top accent line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[1px] transition-all duration-500"
          style={{
            background: isHovered 
              ? `linear-gradient(90deg, transparent 0%, ${accentBorders[accentColor]} 50%, transparent 100%)`
              : "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
          }}
        />

        {/* Content */}
        <div className="flex flex-col h-full p-8 lg:p-10 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-white/95 tracking-wide leading-tight">
              {title}
            </h3>
            <p className="text-white/70 font-normal leading-relaxed text-base lg:text-lg">
              {description}
            </p>
          </div>

          {/* Features */}
          <div className="mt-auto">
            <div className="mb-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="space-y-5">
              <div className="text-sm text-white/60 uppercase tracking-wider font-medium">
                What's included
              </div>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm lg:text-base text-white/80 leading-relaxed">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-colors duration-300"
                      style={{
                        backgroundColor: isHovered ? accentBorders[accentColor] : "rgba(255, 255, 255, 0.4)"
                      }}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
"use client";

import React from "react";
import { motion } from "motion/react";
import { IoConstruct, IoNotifications, IoArrowBack } from "react-icons/io5";

interface ComingSoonOverlayProps {
  isActive: boolean;
  title?: string;
  description?: string;
  estimatedDate?: string;
  notifyEmail?: string;
}

const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  isActive = true,
  title = "Coming Soon",
  description = "We're working hard to bring you something extraordinary. Stay tuned for the official launch.",
  estimatedDate = "2024",
  notifyEmail = "hello@key0n.com"
}) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(0, 0, 0, 0.95) 0%, 
            rgba(10, 10, 10, 0.97) 25%,
            rgba(5, 5, 5, 0.98) 50%,
            rgba(10, 10, 10, 0.97) 75%,
            rgba(0, 0, 0, 0.95) 100%
          ),
          radial-gradient(
            ellipse 80% 50% at 50% 20%,
            rgba(255, 255, 255, 0.02) 0%,
            transparent 50%
          )
        `,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Subtle animated background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
          `,
        }}
      />

      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Subtle Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mb-4 sm:mb-6 lg:mb-8"
        >
          <div 
            className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 4px 16px -4px rgba(0, 0, 0, 0.2)"
            }}
          >
            Coming Soon
          </div>
        </motion.div>
        {/* Premium glass card effect */}
        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 border border-white/[0.08]"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.03) 0%, 
                rgba(255, 255, 255, 0.01) 50%, 
                rgba(0, 0, 0, 0.02) 100%
              )
            `,
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.02),
              0 32px 64px -12px rgba(0, 0, 0, 0.4),
              0 16px 32px -8px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.03)
            `,
          }}
        >
          {/* Subtle top accent line */}
          <div 
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
            }}
          />

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mb-4 sm:mb-6 lg:mb-8"
          >
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto rounded-xl sm:rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 8px 32px -8px rgba(0, 0, 0, 0.3)"
              }}
            >
              <IoConstruct 
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 tracking-tight leading-tight"
          >
            {title.includes("BEATS") ? (
              <>
                <span
                  style={{
                    background: "linear-gradient(180deg, #fafafa 0%, #e0e0e0 50%, #b0b0b0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Premium{" "}
                </span>
                <span 
                  style={{ 
                    fontFamily: "Subway Berlin OT, sans-serif", 
                    fontWeight: "400",
                    color: "#FFC60B",
                    textShadow: "0 0 20px rgba(255, 198, 11, 0.4), 0 0 40px rgba(255, 198, 11, 0.2)",
                    filter: "drop-shadow(0 4px 8px rgba(255, 198, 11, 0.3))"
                  }}
                >
                  BEATS
                </span>
              </>
            ) : (
              <span
                style={{
                  background: "linear-gradient(180deg, #fafafa 0%, #e0e0e0 50%, #b0b0b0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {title}
              </span>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="text-sm sm:text-base lg:text-lg text-white/60 mb-4 sm:mb-6 lg:mb-8 leading-relaxed max-w-lg mx-auto px-2 sm:px-0"
          >
            {description}
          </motion.p>


          {/* Expected date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="mb-6 sm:mb-8 lg:mb-10"
          >
            <div 
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <IoNotifications className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/50" />
              <span className="text-xs sm:text-sm text-white/70 uppercase tracking-wide sm:tracking-wider font-medium">
                Expected {estimatedDate}
              </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="mt-6 sm:mt-8"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              {/* Go Back Home Button */}
              <div className="relative group">
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase font-medium tracking-wide transition-all duration-500 rounded-lg sm:rounded-xl relative z-10 w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px -8px rgba(0, 0, 0, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <IoArrowBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Go Back Home</span>
                </a>
              </div>

              {/* Order Button */}
              <div className="relative group">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase font-medium tracking-wide transition-all duration-500 rounded-lg sm:rounded-xl relative z-10 w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 198, 11, 0.12) 0%, rgba(255, 198, 11, 0.08) 100%)",
                    border: "1px solid rgba(255, 198, 11, 0.3)",
                    color: "#FFC60B",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 198, 11, 0.2) 0%, rgba(255, 198, 11, 0.15) 100%)";
                    e.currentTarget.style.borderColor = "rgba(255, 198, 11, 0.5)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px -8px rgba(255, 198, 11, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 198, 11, 0.12) 0%, rgba(255, 198, 11, 0.08) 100%)";
                    e.currentTarget.style.borderColor = "rgba(255, 198, 11, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span>Order</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Subtle decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
            className="mt-6 sm:mt-8 pt-4 sm:pt-6"
          >
            <div 
              className="h-[1px] max-w-xs mx-auto"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)"
              }}
            />
          </motion.div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </motion.div>
  );
};

export default ComingSoonOverlay;
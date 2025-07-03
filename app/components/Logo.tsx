"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
// import logoSvg from '@/app/assets/Key0n Logo.svg';

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
  glowIntensity?: "subtle" | "medium" | "dramatic";
  mouseReactive?: boolean;
}

const sizeMap = {
  small: { width: 40, height: 40 },
  medium: { width: 120, height: 120 },
  large: { width: 200, height: 200 },
};

export const Logo = ({
  className = "",
  size = "medium",
  glowIntensity = "dramatic",
  mouseReactive = false,
}: LogoProps) => {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { width, height } = sizeMap[size];

  // Mouse reactive transforms
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    setMounted(true);

    if (mouseReactive) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = document.body.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseReactive, mouseX, mouseY]);

  if (!mounted) return null;

  const glowStyles = {
    subtle: "",
    medium: "",
    dramatic: "",
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{
        width,
        height,
        rotateX: mouseReactive ? rotateX : 0,
        rotateY: mouseReactive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={size === "small" ? { scale: 1.1 } : {}}
    >
      {/* Smooth multi-layered glow effect */}
      {glowIntensity !== "subtle" && (
        <>
          {/* Outer soft glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
              filter: "blur(40px)",
              transform: "scale(2.5)",
            }}
          />
          {/* Middle glow layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 60%)",
              filter: "blur(20px)",
              transform: "scale(1.8)",
            }}
          />
          {/* Inner bright glow */}
          {glowIntensity === "dramatic" && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 50%)",
                filter: "blur(10px)",
                transform: "scale(1.3)",
              }}
            />
          )}
        </>
      )}

      {/* Subtle glow for navigation */}
      {glowIntensity === "subtle" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 50%)",
            filter: "blur(15px)",
            transform: "scale(1.5)",
          }}
        />
      )}

      {/* Main logo with soft shadow */}
      <img
        src="/assets/Key0n-Logo.svg"
        alt="Key0n Logo"
        width={width}
        height={height}
        className="relative z-10 w-full h-full object-contain"
        style={{
          filter: "invert(1) brightness(1) drop-shadow(0 0 8px rgba(255,255,255,0.2))",
        }}
      />
    </motion.div>
  );
};

export const LogoDivider = () => {
  return (
    <section className="py-20 flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Ultra smooth ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Base ambient glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-[400px] h-[400px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </motion.div>

          {/* Secondary glow layer */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div
              className="w-[250px] h-[250px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>
        </div>

        <Logo size="large" glowIntensity="dramatic" mouseReactive={true} />
      </motion.div>
    </section>
  );
};

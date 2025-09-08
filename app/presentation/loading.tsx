"use client";

import { motion } from "motion/react";

export default function PresentationLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="mb-8"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">K</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Preparing Your Presentation
        </motion.h2>

        {/* Loading Bars */}
        <div className="flex space-x-1 justify-center mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-white/40 rounded-full"
              animate={{
                height: [4, 24, 4],
                backgroundColor: ["rgba(255,255,255,0.4)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.4)"],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading Steps */}
        <motion.p
          className="text-white/60 text-sm"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading audio examples and interactive features...
        </motion.p>
      </div>
    </div>
  );
}
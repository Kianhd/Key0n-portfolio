"use client";

import React from "react";
import { motion } from "motion/react";
import { GlareCard } from "../ui/glare-card";

const ServicesSection: React.FC = () => {
  return (
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
  );
};

export default ServicesSection;

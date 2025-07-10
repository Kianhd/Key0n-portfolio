"use client";

import React from "react";
import { motion } from "motion/react";
import ServiceCard from "../ServiceCard";

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

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          <ServiceCard
            title="Custom Brand Music"
            description="Complete commercial tracks with strategic variations—from full compositions to professional cutdowns tailored for every campaign need."
            features={[
              "Full track + variations",
              "Professional cutdowns",
              "Campaign-ready deliverables"
            ]}
            delay={0.1}
            glareColor="red"
            backgroundColor="red"
          />

          <ServiceCard
            title="Sonic Logos & Audio Branding"
            description="Memorable sonic identities that create instant brand recognition across every platform and touchpoint."
            features={[
              "3-5 second signatures",
              "Platform-optimized versions",
              "Instant brand recall"
            ]}
            delay={0.2}
          />

          <ServiceCard
            title="Ready-to-use Beats & Tracks"
            description="High-quality, pre-made tracks for brands seeking quick, catchy, and budget-friendly music solutions."
            features={[
              "Instant licensing",
              "Multiple genres available",
              "Budget-friendly options"
            ]}
            delay={0.3}
            glareColor="yellow"
            backgroundColor="yellow"
          />

          <ServiceCard
            title="Film & Short Film Scoring"
            description="Cinematic soundtracks and atmospheric scores that enhance storytelling and create emotional depth for films and short films."
            features={[
              "Original film scores",
              "Atmospheric soundscapes",
              "Sync-ready compositions"
            ]}
            delay={0.4}
            glareColor="gray"
            backgroundColor="gray"
          />
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

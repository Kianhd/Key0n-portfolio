"use client";

import React from "react";
import { motion } from "motion/react";
import ServiceCard from "../ServiceCard";
import { IoMusicalNotes, IoPulse, IoFilm } from "react-icons/io5";

const ServicesSection: React.FC = () => {
  return (
    <section
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 max-w-none auto-rows-fr">
          <ServiceCard
            title="Custom Brand Music"
            description="Your brand deserves a soundtrack as powerful as its story. I create full-length anthems that transform campaigns into emotional experiences and make your brand unforgettable."
            features={[
              "Original full tracks",
              "Cutdowns + variations",
              "Exclusive usage rights"
            ]}
            delay={0.1}
            accentColor="red"
            icon={IoMusicalNotes}
          />

          <ServiceCard
            title="Sonic Logos and Jingles"
            description="Be recognized in a heartbeat. A custom sonic signature that makes your brand stand out instantly — and stay top-of-mind everywhere it plays."
            features={[
              "3–5 sec original jingle",
              "Optimized cuts for all platforms",
              "Full brand sound ownership"
            ]}
            delay={0.2}
            accentColor="blue"
            icon={IoPulse}
          />

          <ServiceCard
            title="Ready-to-use Beats & Tracks"
            description="Need it fast? Choose from premium, pre-made tracks designed to energize your brand and boost your content instantly — no compromise on quality. You can also customize any track to perfectly match your brand's unique vibe."
            features={[
              "Immediate licensing",
              "Multi-genre selections",
              "Optional customizations",
              "Flexible budget options"
            ]}
            delay={0.3}
            accentColor="yellow"
            textIcon="BEATS"
          />

          <ServiceCard
            title="Film & Short Film Scoring"
            description="Go beyond visuals. Original cinematic scores and ambient soundscapes that give your films emotional depth and make every scene unforgettable."
            features={[
              "Custom original film scores",
              "Atmospheric textures",
              "Sync-ready masters"
            ]}
            delay={0.4}
            accentColor="purple"
            icon={IoFilm}
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground/5 hover:bg-foreground/10 border border-foreground/20 hover:border-foreground/30 rounded-sm transition-all duration-300 group"
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

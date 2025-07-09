"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";

// Optimized Waveform Component
const WaveformVisualization = React.memo(() => {
  const bars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        height: `${30 + ((i * 7) % 40)}%`,
        duration: 2 + ((i * 0.3) % 2),
        delay: i * 0.1,
      })),
    []
  );

  return (
    <div className="w-full h-full flex items-center justify-center gap-1">
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className="flex-1 bg-foreground/20 rounded-full"
          style={{
            willChange: "height",
            height: "20%",
          }}
          animate={{
            height: ["20%", bar.height, "20%"],
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            delay: bar.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

// Optimized Floating Particles Component
const OptimizedFloatingParticles = React.memo(() => {
  const particles = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: `${20 + i * 15}%`,
        top: `${30 + i * 10}%`,
        duration: 3 + i,
        delay: i * 0.5,
      })),
    []
  );

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-foreground/30 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
});

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-foreground/3 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-foreground/3 rounded-full blur-[120px] translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Floating sound wave visualization */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <svg viewBox="0 0 1200 100" className="w-full h-20">
            <motion.path
              d="M0,50 Q300,20 600,50 T1200,50"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left side - Main content */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.span
                className="text-small uppercase tracking-[0.2em] text-muted/60 font-normal"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Since Age 13
              </motion.span>
              <motion.h2
                className="text-5xl lg:text-6xl font-semibold mt-4 leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-foreground/90">I'm </span>
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Key0n
                </span>
              </motion.h2>
            </div>

            <div className="space-y-6">
              <motion.p
                className="text-xl lg:text-2xl leading-relaxed text-foreground/80 font-normal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                I don't just make beats.
                <br />I craft{" "}
                <span className="text-foreground font-medium">
                  emotional experiences
                </span>{" "}
                that move people and make brands{" "}
                <span className="text-foreground font-medium">
                  unforgettable
                </span>
                .
              </motion.p>

              <motion.p
                className="text-lg text-muted/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                My passion? Helping brands discover their{" "}
                <span className="italic">true voice</span> through
                custom-made, cinematic sound identities that resonate.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="inline-flex items-center gap-4 pt-4">
                  <div className="h-px w-12 bg-foreground/30" />
                  <p className="text-lg font-medium italic text-foreground/90">
                    Your brand deserves to be heard,
                    <br />
                    not just seen.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Visual element */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative">
              {/* Audio waveform visualization */}
              <div
                className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gradient-to-br from-foreground/5 to-transparent"
                suppressHydrationWarning
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <WaveformVisualization />
                </div>

                {/* Floating particles */}
                <OptimizedFloatingParticles />
              </div>

              {/* Quote marks */}
              <div className="absolute -top-4 -left-4 text-6xl text-foreground/10 font-serif">
                "
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl text-foreground/10 font-serif rotate-180">
                "
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section - Team mention */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-lg text-muted/70 max-w-3xl mx-auto leading-relaxed">
            Together with my team, we create distinctive sonic signatures for
            <span className="text-foreground/80"> artists</span>,
            <span className="text-foreground/80"> brands</span>,
            <span className="text-foreground/80"> films</span>, and
            <span className="text-foreground/80"> experiences</span> that
            connect on a deeper level.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
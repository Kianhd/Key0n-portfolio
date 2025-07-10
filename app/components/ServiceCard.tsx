"use client";

import { motion } from "motion/react";
import { GlareCard } from "./ui/glare-card";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  delay?: number;
  glareColor?: "red" | "yellow" | "blue" | "green" | "purple" | "pink" | "orange" | "white" | "gray" | "black";
  backgroundColor?: "red" | "yellow" | "blue" | "green" | "purple" | "pink" | "orange" | "white" | "gray" | "black";
}

export default function ServiceCard({
  title,
  description,
  features,
  delay = 0,
  glareColor,
  backgroundColor,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <GlareCard
        glareColor={glareColor}
        backgroundColor={backgroundColor}
        className="flex flex-col p-6 lg:p-8 h-full border-2 border-border"
      >
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-white tracking-wide">
            {title}
          </h3>
          <p className="text-white/70 font-normal leading-relaxed text-sm">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="space-y-3">
            <div className="text-xs text-white/50 uppercase tracking-wider font-medium mb-2">
              What's included
            </div>
            <div className="grid grid-cols-1 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="text-sm text-white/60">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlareCard>
    </motion.div>
  );
}
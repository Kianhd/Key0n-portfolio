"use client";

import React from "react";
import { motion } from "motion/react";
import VideoCarousel from "../VideoCarousel";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";

interface Video {
  id: string;
  videoFile?: string;
  videoUrl: string;
  thumbnail?: string;
}

interface Project {
  id: number;
  title: string;
  client: string;
  type: string;
  category: string;
  videos: Video[];
  description: string;
}

interface WorkSectionProps {
  projects: Project[];
}

const WorkSection: React.FC<WorkSectionProps> = ({ projects }) => {
  const browserOpts = useBrowserOptimizations();

  return (
    <section id="work" className="py-16 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-40 md:mb-52 lg:mb-64">
          <h2 className="text-title font-semibold mb-8 uppercase scroll-fade-in">
            Featured Work
          </h2>
          <p className="text-body-large text-muted max-w-2xl mx-auto leading-relaxed font-normal">
            Collaborations with leading brands and artists across multiple
            genres
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-12 items-start lg:items-center`}
              initial={{
                opacity: 0,
                y: browserOpts.simplifyFramerMotion ? 20 : 50,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: browserOpts.simplifyFramerMotion ? "-50px" : "-100px",
              }}
              transition={{
                duration: browserOpts.simplifyFramerMotion ? 0.2 : 0.6,
                ease: browserOpts.useSimpleEasing
                  ? "easeOut"
                  : [0.4, 0, 0.2, 1],
              }}
              style={{
                willChange: browserOpts.forceHardwareAcceleration
                  ? "transform, opacity"
                  : "auto",
              }}
            >
              {/* Video Side */}
              <div className="w-full lg:w-3/5 max-w-full">
                <VideoCarousel videos={project.videos} />
              </div>

              {/* Description Side */}
              <div className="w-full lg:w-2/5 space-y-4 md:space-y-6">
                <div className="space-y-4">
                  {/* Genre Badge */}
                  <div className="inline-flex">
                    <span 
                      className={`
                        inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.1em] font-semibold
                        transition-all duration-300 backdrop-blur-sm relative overflow-hidden
                        ${project.type === 'commercial' 
                          ? 'bg-[#1442B5]/15 border border-[#1442B5]/30 text-[#6B9BFF] hover:bg-[#1442B5]/25 hover:border-[#1442B5]/50 hover:text-[#85ADFF]' 
                          : project.type === 'hiphop' 
                          ? 'bg-[#FFC60B]/15 border border-[#FFC60B]/30 text-[#FFD23F] hover:bg-[#FFC60B]/25 hover:border-[#FFC60B]/50 hover:text-[#FFDB66]'
                          : project.type === 'sound design'
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 hover:border-emerald-500/50 hover:text-emerald-300'
                          : 'bg-foreground/10 border border-foreground/20 text-foreground/70 hover:bg-foreground/15'
                        }
                      `}
                      style={{
                        boxShadow: project.type === 'commercial' 
                          ? '0 0 24px rgba(20, 66, 181, 0.1), inset 0 0 12px rgba(107, 155, 255, 0.1)' 
                          : project.type === 'hiphop'
                          ? '0 0 24px rgba(255, 198, 11, 0.1), inset 0 0 12px rgba(255, 210, 63, 0.1)'
                          : project.type === 'sound design'
                          ? '0 0 24px rgba(16, 185, 129, 0.1), inset 0 0 12px rgba(52, 211, 153, 0.1)'
                          : 'none'
                      }}
                    >
                      <span className="relative z-10">{project.type.replace(' design', ' Design')}</span>
                      {/* Subtle gradient overlay */}
                      <div className={`
                        absolute inset-0 opacity-30
                        ${project.type === 'commercial' 
                          ? 'bg-gradient-to-r from-[#1442B5]/0 via-[#1442B5]/20 to-[#1442B5]/0' 
                          : project.type === 'hiphop' 
                          ? 'bg-gradient-to-r from-[#FFC60B]/0 via-[#FFC60B]/20 to-[#FFC60B]/0'
                          : project.type === 'sound design'
                          ? 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0'
                          : ''
                        }
                      `} />
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-subtitle font-medium text-foreground uppercase leading-tight">
                    {project.title}
                  </h3>

                  {/* Client Info */}
                  <div className="flex items-center gap-2 text-small text-muted uppercase font-normal">
                    <span className="w-2 h-2 bg-foreground/60 rounded-full"></span>
                    <span>{project.client}</span>
                  </div>
                </div>

                {/* Simple divider */}
                <div className="w-full h-px bg-border"></div>

                <div>
                  <p className="text-body leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>

                {/* Video Navigation Hint */}
                {project.videos.length > 1 && (
                  <div className="text-caption text-muted/60 uppercase tracking-wide font-normal">
                    Use arrow keys or click to navigate videos
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
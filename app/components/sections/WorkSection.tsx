"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import VideoCarousel from "../VideoCarousel";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";

interface Video {
  id: string;
  videoFile: string;
  videoUrl: string;
  thumbnail: string;
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
  const [showAll, setShowAll] = useState(false);
  
  const initialProjects = projects.slice(0, 3);
  const additionalProjects = projects.slice(3);
  const displayedProjects = showAll ? projects : initialProjects;

  return (
    <section id="work" className="py-16 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl tracking-tight font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
          <p className="text-lg text-muted/70 max-w-2xl mx-auto">
            Collaborations with leading brands and artists across multiple genres
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {/* Initial projects (always visible) */}
          {initialProjects.map((project, index) => (
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
          
          {/* Additional projects (show/hide with animation) */}
          <AnimatePresence mode="wait">
            {showAll && (
              <motion.div
                key="additional-projects"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: browserOpts.simplifyFramerMotion ? 0.3 : 0.6,
                  ease: browserOpts.useSimpleEasing ? "easeOut" : [0.4, 0, 0.2, 1],
                }}
                className="space-y-24 md:space-y-32"
              >
                {additionalProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className={`flex flex-col ${
                      (index + 3) % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-8 lg:gap-12 items-start lg:items-center`}
                    initial={{
                      opacity: 0,
                      y: browserOpts.simplifyFramerMotion ? 20 : 50,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: browserOpts.simplifyFramerMotion ? 0.2 : 0.6,
                      ease: browserOpts.useSimpleEasing
                        ? "easeOut"
                        : [0.4, 0, 0.2, 1],
                      delay: index * 0.1,
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
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* More/Less Button */}
          {additionalProjects.length > 0 && (
            <motion.div
              className="flex justify-center mt-16 md:mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: browserOpts.simplifyFramerMotion ? 0.3 : 0.5,
                ease: browserOpts.useSimpleEasing ? "easeOut" : [0.4, 0, 0.2, 1],
              }}
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="group relative inline-flex items-center justify-center px-10 py-4 font-medium text-base uppercase tracking-[0.12em] transition-all duration-500 overflow-hidden"
                whileHover={{ 
                  scale: browserOpts.simplifyFramerMotion ? 1 : 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: browserOpts.simplifyFramerMotion ? 1 : 0.97,
                  transition: { duration: 0.15 }
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.06) 100%)',
                  backdropFilter: browserOpts.disableBackdropFilter ? 'none' : 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: `
                    0 2px 20px rgba(0, 0, 0, 0.1),
                    0 1px 3px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.08),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                  `,
                  willChange: browserOpts.forceHardwareAcceleration ? "transform" : "auto",
                }}
              >
                {/* Gradient shine effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                    animation: 'shimmerSlide 2s ease-out infinite'
                  }}
                />
                
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%)'
                  }}
                />
                
                <span className="relative z-10 flex items-center gap-3">
                  <span className="font-normal">{showAll ? 'View Less' : 'View More Projects'}</span>
                  <motion.div
                    animate={{ 
                      rotate: showAll ? 180 : 0,
                      y: showAll ? 0 : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-70"
                      strokeWidth="2"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </span>
                
                {/* Border glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '2px',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
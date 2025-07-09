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
                    <span className="px-3 py-1 bg-foreground/10 border border-foreground/20 rounded-full text-xs uppercase tracking-wide font-medium">
                      {project.type}
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
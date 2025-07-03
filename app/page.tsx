"use client";

import Navigation from "./components/Navigation";
import VideoModal from "./components/VideoModal";
import VideoCarousel from "./components/VideoCarousel";
import Waves from "./components/Waves";
import SchemaMarkup from "./components/SchemaMarkup";
import { useState } from "react";
import { motion } from "motion/react";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

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
  videos: Video[];
  description: string;
}

export default function Home() {
  const [expandedVideo, setExpandedVideo] = useState<Project | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);

  useScrollAnimation();

  // Replace with your actual Cloudinary cloud name from your dashboard
  const CLOUDINARY_CLOUD_NAME = "dwzp6d4lb"; // e.g., "dxxxxxxxxx" or "mycompany"

  // Helper function to generate Cloudinary URLs with transformations
  const getCloudinaryUrl = (
    publicId: string,
    options: {
      type: "video" | "image";
      transformations?: string;
    }
  ) => {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;
    const resourceType = options.type === "video" ? "video" : "image";
    const transform = options.transformations || "f_auto,q_auto";
    return `${baseUrl}/${resourceType}/upload/${transform}/${publicId}`;
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Summer Campaign Soundtrack",
      client: "Nike",
      type: "commercial",
      videos: [
        {
          id: "nike-summer-1",
          videoFile: getCloudinaryUrl("nike-summer", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("nike-summer", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
        {
          id: "nike-summer-2",
          videoFile: getCloudinaryUrl("nike-summer-alt", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("nike-summer-alt", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
        {
          id: "nike-summer-3",
          videoFile: getCloudinaryUrl("nike-summer-extended", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("nike-summer-extended", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
      ],
      description:
        "Created an energetic, motivational soundtrack for Nike's summer campaign. Blending electronic elements with orchestral arrangements to capture the spirit of athletic excellence.",
    },
    {
      id: 2,
      title: "Electric Dreams",
      client: "Artist Collaboration",
      type: "edm",
      videos: [
        {
          id: "electric-dreams-1",
          videoFile: getCloudinaryUrl("electric-dreams", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("electric-dreams", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
        {
          id: "electric-dreams-2",
          videoFile: getCloudinaryUrl("electric-dreams-remix", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("electric-dreams-remix", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
      ],
      description:
        "Atmospheric EDM production featuring synthesized textures and driving basslines. Collaborated with emerging artists to create a sonic journey through digital landscapes.",
    },
    {
      id: 3,
      title: "Urban Nights",
      client: "Independent Artist",
      type: "hiphop",
      videos: [
        {
          id: "urban-nights-1",
          videoFile: getCloudinaryUrl("urban-nights", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("urban-nights", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
      ],
      description:
        "Hard-hitting hip-hop beats with soulful samples and modern trap influences. Crafted to capture the raw energy and authenticity of street culture.",
    },
    {
      id: 4,
      title: "Pop Anthem",
      client: "Sony Music",
      type: "pop",
      videos: [
        {
          id: "pop-anthem-1",
          videoFile: getCloudinaryUrl("pop-anthem", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("pop-anthem", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
        {
          id: "pop-anthem-2",
          videoFile: getCloudinaryUrl("pop-anthem-acoustic", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("pop-anthem-acoustic", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
      ],
      description:
        "Catchy pop production with infectious hooks and radio-ready polish. Combined modern production techniques with timeless songwriting principles.",
    },
    {
      id: 5,
      title: "Tech Product Launch",
      client: "Apple",
      type: "commercial",
      videos: [
        {
          id: "apple-launch-1",
          videoFile: getCloudinaryUrl("apple-launch", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("apple-launch", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
      ],
      description:
        "Minimalist electronic score emphasizing innovation and elegance. Created a sonic identity that mirrors the product's cutting-edge design philosophy.",
    },
    {
      id: 6,
      title: "Festival Banger",
      client: "Ultra Music",
      type: "edm",
      videos: [
        {
          id: "festival-banger-1",
          videoFile: getCloudinaryUrl("festival-banger", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("festival-banger", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
        {
          id: "festival-banger-2",
          videoFile: getCloudinaryUrl("festival-banger-vip", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("festival-banger-vip", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
        {
          id: "festival-banger-3",
          videoFile: getCloudinaryUrl("festival-banger-extended", {
            type: "video",
            transformations: "f_auto,q_auto,vc_auto",
          }),
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: getCloudinaryUrl("festival-banger-extended", {
            type: "video",
            transformations: "f_auto,q_auto,so_0,w_800,c_fill",
          }),
        },
      ],
      description:
        "High-energy festival anthem designed for massive crowds. Features explosive drops, euphoric builds, and memorable vocal chops that ignite dance floors.",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/key.0n/profilecard/?igsh=YnN5bmw3YndyOXA=",
      icon: "instagram",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kianhamed",
      icon: "linkedin",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SchemaMarkup />
      <Navigation />

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 gradient-fade-bottom">
        {/* <Waves
          lineColor="#690707"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        /> */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10 py-32 sm:py-40">
          <motion.h1 
            className="text-hero mb-12 relative leading-[0.85] font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.span 
              className="relative inline-block text-foreground/90 font-medium tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              BEYOND
            </motion.span>
            <br />
            <motion.span 
              className="relative inline-block text-foreground/70 font-light tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              THE
            </motion.span>
            <br />
            <motion.span 
              className="relative inline-block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent font-bold tracking-tight"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
              BEAT
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-muted/60 mb-16 max-w-xl mx-auto leading-relaxed font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Crafting sonic experiences that resonate
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto sm:max-w-none">
            <div className="relative group">
              <a
                href="#work"
                className="border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background backdrop-blur-[20px] px-12 py-5 text-small uppercase font-semibold transition-all duration-300 inline-block rounded-sm relative z-10"
              >
                View Our Work
              </a>
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
              </div>
            </div>
            <div className="relative group">
              <a
                href="#contact"
                className="border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background px-12 py-5 text-small uppercase font-semibold transition-all duration-300 inline-block rounded-sm relative z-10"
              >
                Get In Touch
              </a>
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs text-muted/60 uppercase tracking-wider">Scroll</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-muted/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="py-16 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-title font-bold mb-4 uppercase scroll-fade-in">
              Featured Work
            </h2>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Collaborations with leading brands and artists across multiple
              genres
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-start lg:items-center`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Video Side */}
                <div className="w-full lg:w-3/5 max-w-full">
                  <VideoCarousel
                    videos={project.videos}
                    onVideoClick={(video) => {
                      const videoIndex = project.videos.findIndex(
                        (v) => v.id === video.id
                      );
                      setSelectedVideoIndex(videoIndex);
                      setExpandedVideo(project);
                    }}
                    autoSlide={true}
                  />
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
                    <h3 className="text-subtitle font-bold text-foreground uppercase leading-tight">
                      {project.title}
                    </h3>

                    {/* Client Info */}
                    <div className="flex items-center gap-2 text-small text-muted uppercase">
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
                    <div className="text-xs text-muted/60 uppercase tracking-wide">
                      Use arrow keys or click to navigate videos
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-24 px-6 sm:px-8 lg:px-12 gradient-fade-bottom"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-title font-bold mb-8 uppercase scroll-fade-in">
            Bringing Your Vision to Life
          </h2>
          <p className="text-body text-muted mb-16 leading-relaxed max-w-3xl mx-auto">
            With years of experience in music production and film scoring, KEY0N
            and his team create distinctive sonic signatures for artists,
            brands, short films, and feature movies that connect with audiences
            on a deeper level.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="p-6 card-minimal">
              <div className="text-stats font-bold mb-2">150+</div>
              <div className="text-small text-muted uppercase">Projects</div>
            </div>
            <div className="p-6 card-minimal">
              <div className="text-stats font-bold mb-2">50+</div>
              <div className="text-small text-muted uppercase">Brands</div>
            </div>
            <div className="p-6 card-minimal">
              <div className="text-stats font-bold mb-2">100M+</div>
              <div className="text-small text-muted uppercase">Streams</div>
            </div>
            <div className="p-6 card-minimal">
              <div className="text-stats font-bold mb-2">4</div>
              <div className="text-small text-muted uppercase">Genres</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-title font-bold mb-6 uppercase scroll-fade-in">
              Let&apos;s Create
              <br />
              Something Amazing
            </h2>
            <p className="text-body text-muted uppercase">
              Ready to elevate your project?
            </p>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-transparent border-b-2 border-border focus:outline-none transition-all duration-200 text-body peer"
                  required
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-200">
                  <div className="w-full h-full bg-foreground rounded-full" />
                  <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                  <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                </div>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-transparent border-b-2 border-border focus:outline-none transition-all duration-200 text-body peer"
                  required
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-200">
                  <div className="w-full h-full bg-foreground rounded-full" />
                  <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                  <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                </div>
              </div>
            </div>
            <div className="relative">
              <select
                className="w-full px-6 py-4 bg-transparent border-b-2 border-border focus:outline-none transition-all duration-200 text-foreground text-body peer"
                required
              >
                <option value="">Select Project Type</option>
                <option value="commercial">Commercial Production</option>
                <option value="artist">Artist Collaboration</option>
                <option value="beats">Custom Beats</option>
                <option value="film">Film Scoring</option>
                <option value="mixing">Mixing & Mastering</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-200">
                <div className="w-full h-full bg-foreground rounded-full" />
                <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
              </div>
            </div>
            <div className="relative">
              <textarea
                placeholder="Tell us about your project..."
                rows={8}
                className="w-full px-6 py-4 bg-transparent border-b-2 border-border focus:outline-none transition-all duration-200 resize-none text-body leading-relaxed peer"
                required
              />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-200 -translate-y-[6px]">
                <div className="w-full h-full bg-foreground rounded-full" />
                <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
              </div>
            </div>
            <div className="relative group">
              <button
                type="submit"
                className="w-full border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background py-5 font-semibold text-small uppercase rounded-sm transition-all duration-300 relative z-10"
              >
                Send Message
              </button>
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
              </div>
            </div>
          </form>
        </div>
      </section>

      <footer className="py-16 px-6 sm:px-8 lg:px-12 border-t-2 border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-small text-muted uppercase">
              © 2024 Music Producer. All rights reserved.
            </div>
            <div className="flex gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-all duration-200 transform hover:scale-110"
                  aria-label={link.name}
                >
                  {link.name === "Instagram" ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <VideoModal
        project={expandedVideo}
        initialVideoIndex={selectedVideoIndex}
        onClose={() => setExpandedVideo(null)}
      />
    </div>
  );
}

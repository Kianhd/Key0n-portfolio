"use client";

import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import SchemaMarkup from "./components/SchemaMarkup";
import BrandMarquee from "./components/BrandMarquee";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import WorkSection from "./components/sections/WorkSection";
import ServicesSection from "./components/sections/ServicesSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useBrowserOptimizations } from "./hooks/useBrowserOptimizations";
import {
  usePerformanceMonitor,
  usePerformanceWarnings,
} from "./hooks/usePerformanceMonitor";
import { generateProjectVideos } from "../lib/cloudinary";

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

interface Brand {
  name: string;
  logo: string;
  invertColor?: boolean;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export default function Home() {
  useScrollAnimation();
  const browserOpts = useBrowserOptimizations();
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);

  // Performance monitoring for Firefox debugging (development only)
  if (process.env.NODE_ENV === "development") {
    usePerformanceMonitor();
    usePerformanceWarnings();
  }

  // Apply Zen Browser detection to body for CSS targeting - only after hydration
  useEffect(() => {
    if (browserOpts.isZenBrowser) {
      document.body.setAttribute("data-zen-browser", "true");
    }
    return () => {
      document.body.removeAttribute("data-zen-browser");
    };
  }, [browserOpts.isZenBrowser]);

  const brands: Brand[] = [
    { name: "Always", logo: "/Brands/Always Logo.png" },
    { name: "Clorox", logo: "/Brands/Clorox.png" },
    { name: "Evvoli", logo: "/Brands/Evvoli Logo.png", invertColor: true },
    { name: "Hyundai", logo: "/Brands/Hyundai Logo HD.png", invertColor: true },
    { name: "LG", logo: "/Brands/LG.svg" },
    { name: "McDonald's", logo: "/Brands/McDonalds Logo.png" },
    { name: "Oral-B", logo: "/Brands/Oral-B.png" },
    { name: "Nolte Küchen", logo: "/Brands/Nolte Kuchen Logo.png" },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Clorox Platinum Campaign",
      client: "Clorox",
      type: "commercial",
      category: "music composition",
      videos: generateProjectVideos(
        'Clorox - platinum campaign - "mhhmm..." - music composition - commercial'
      ),
      description:
        "I had the honor of collaborating with Clorox on their iconic MMHHMM... campaign. Working with this leading global manufacturer of cleaning products, I crafted a premium commercial soundtrack that embodies their commitment to health, wellness, and superior cleaning power through an uplifting, fresh sonic identity.",
    },
    {
      id: 2,
      title: "Evvoli Dishwasher",
      client: "Evvoli",
      type: "sound design",
      category: "sound design",
      videos: generateProjectVideos("Evvoli - sound design"),
      description:
        "Sophisticated sound design for Evvoli's premium home appliances. This Italian luxury brand blends human-centric technology with neo-modern designs, requiring audio that embodies innovation, elegance, and cutting-edge functionality.",
    },
    {
      id: 3,
      title: "Always Generic Pack",
      client: "Always",
      type: "hiphop",
      category: "music composition",
      videos: generateProjectVideos(
        "Always Generic pack - music composition - hiphop"
      ),
      description:
        "Always commissioned me to compose trap music for their new product's TikTok campaign. I created hard-hitting hip-hop beats with modern trap influences that connect with young women and resonate with digital audiences across social media platforms.",
    },
    {
      id: 4,
      title: "KEY0N - Resume",
      client: "KEY0N",
      type: "hiphop",
      category: "music composition",
      videos: generateProjectVideos(
        "Key0n Resume - Music Video - music composition - hiphop trap"
      ),
      description:
        "I created this track called 'Resume' as my musical portfolio piece, designed to showcase my production skills and artistic range to potential clients and collaborators. This innovative approach to self-promotion features trap-influenced hip-hop production, serving as both a creative calling card and a demonstration of my ability to blend modern trap elements with classic hip-hop foundations.",
    },
    {
      id: 5,
      title: "LG Dual Sense",
      client: "LG",
      type: "sound design",
      category: "sound design",
      videos: generateProjectVideos("LG Dual Sense - Sound Design"),
      description:
        "Innovative sound design for LG's advanced home appliance technology. Global technology leader LG required audio that represents their dual inverter innovations, smart AI features, and energy-efficient solutions.",
    },
    {
      id: 6,
      title: "Nolte Küchen Campaign",
      client: "Nolte Küchen",
      type: "commercial",
      category: "music composition + sound design",
      videos: generateProjectVideos(
        "Nolte Kuchen - Music composition + Sound design - commercial"
      ),
      description:
        "Premium audio branding for Germany's favorite kitchen manufacturer. Nolte Küchen's 65+ years of German precision and luxury design required sophisticated music composition that reflects their award-winning quality and craftsmanship.",
    },
    {
      id: 7,
      title: "Oral-B Overnight Toothpaste",
      client: "Oral-B",
      type: "commercial",
      category: "music composition",
      videos: generateProjectVideos(
        "Oral B - overnight toothpaste - music composition"
      ),
      description:
        "Gentle, reassuring musical composition for Oral-B's overnight toothpaste campaign. The world's leading oral care brand trusted by dentists worldwide, featuring soothing melodies that convey nighttime care and morning freshness.",
    },
  ];

  const socialLinks: SocialLink[] = [
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

      <HeroSection
        isButtonHovered={isButtonHovered}
        setIsButtonHovered={setIsButtonHovered}
      />

      <BrandMarquee brands={brands} />

      <AboutSection />

      <WorkSection projects={projects} />

      <ServicesSection />

      <ContactSection />

      <Footer socialLinks={socialLinks} />
    </div>
  );
}

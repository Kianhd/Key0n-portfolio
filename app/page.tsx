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
      title: "LG Dual Sense",
      client: "LG",
      type: "sound design",
      category: "sound design",
      videos: generateProjectVideos("LG Dual Sense - Sound Design"),
      description:
        "I crafted an innovative sound design for LG's advanced home appliances, capturing the essence of their dual inverter innovations, smart AI features, and energy-efficient solutions — translating technology into an elegant sonic identity.",
    },
    {
      id: 2,
      title: "Oral-B Overnight Toothpaste",
      client: "Oral-B",
      type: "commercial",
      category: "music composition",
      videos: generateProjectVideos(
        "Oral B - overnight toothpaste - music composition"
      ),
      description:
        "I composed a gentle, reassuring soundtrack for Oral-B’s overnight toothpaste campaign. The soothing melodies convey nighttime care and morning freshness, perfectly aligning with the brand’s trusted promise of a healthy smile.",
    },
    {
      id: 3,
      title: "Clorox Platinum Campaign",
      client: "Clorox",
      type: "commercial",
      category: "music composition",
      videos: generateProjectVideos(
        'Clorox - platinum campaign - "mhhmm..." - music composition - commercial'
      ),
      description:
        "I had the honor of collaborating with Clorox on their iconic MMHHMM... campaign. I created a fresh, uplifting sonic identity that embodies their dedication to health, wellness, and powerful cleaning — turning their message into an unforgettable sound experience.",
    },
    {
      id: 4,
      title: "Evvoli Dishwasher",
      client: "Evvoli",
      type: "sound design",
      category: "sound design",
      videos: generateProjectVideos("Evvoli - sound design"),
      description:
        "I designed a sophisticated sound experience for Evvoli's premium home appliances. The audio embodies their innovative, elegant, and human-centric approach — making every interaction feel luxurious and forward-thinking.",
    },
    {
      id: 5,
      title: "Always Generic Pack",
      client: "Always",
      type: "hiphop",
      category: "music composition",
      videos: generateProjectVideos(
        "Always Generic pack - music composition - hiphop"
      ),
      description:
        "Always invited me to create a bold trap-inspired soundtrack for their TikTok campaign. I composed energetic, modern hip-hop beats that connect with young women and resonate strongly across social platforms.",
    },
    {
      id: 6,
      title: "KEY0N - Resume",
      client: "KEY0N",
      type: "hiphop",
      category: "music composition",
      videos: generateProjectVideos(
        "Key0n Resume - Music Video - music composition - hiphop trap"
      ),
      description:
        "I created 'Resume' as my personal musical portfolio — a bold statement showcasing my production skills and artistic range. It blends modern trap energy with classic hip-hop roots, serving as a living resume and a creative invitation to future collaborations.",
    },

    {
      id: 7,
      title: "Nolte Küchen Campaign",
      client: "Nolte Küchen",
      type: "commercial",
      category: "music composition + sound design",
      videos: generateProjectVideos(
        "Nolte Kuchen - Music composition + Sound design - commercial"
      ),
      description:
        "I composed premium audio branding for Nolte Küchen, Germany’s leading kitchen manufacturer. The music reflects over 65 years of German precision, luxury design, and award-winning craftsmanship — turning their brand story into a sophisticated sound.",
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

      <ServicesSection />

      <WorkSection projects={projects} />

      <ContactSection />

      <Footer socialLinks={socialLinks} />
    </div>
  );
}

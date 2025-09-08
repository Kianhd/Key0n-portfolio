"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoMusicalNotes, IoPulse, IoFilm, IoClose } from "react-icons/io5";
import { PiFilmReel } from "react-icons/pi";
import { FiPlay, FiPause, FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import LogoLoop from "@/components/ui/logo-loop";
import PresentationAudioPlayer from "../components/PresentationAudioPlayer";
import ServiceOnePager from "../components/ServiceOnePager";
import SlidePresentation from "../components/SlidePresentation";
import { useSearchParams } from "next/navigation";

// Service data optimized for client presentations
const presentationServices = [
  {
    id: 'custom-brand-music',
    title: "Custom Brand Music",
    subtitle: "Living Sound Identities",
    hook: "Transform campaigns into emotional experiences that make your brand unforgettable",
    description: "Your brand deserves a soundtrack as powerful as its story. I create full-length anthems that connect with audiences on a deeper level.",
    workflow: [
      { step: "Discover", detail: "Brand analysis & musical direction" },
      { step: "Compose", detail: "Original tracks crafted for your identity" },
      { step: "Refine", detail: "Collaborative feedback & perfection" },
      { step: "Deliver", detail: "All formats + usage rights included" }
    ],
    included: [
      "Original full tracks (2-4 minutes)",
      "Multiple cutdowns & variations",
      "Exclusive usage rights",
      "All file formats (WAV, MP3, stems)"
    ],
    accentColor: "#ef4444",
    icon: IoMusicalNotes,
    examples: [
      { id: "campaign-anthem", title: "Campaign Anthem", duration: "2:45", cloudinaryId: "campaign_anthem_demo" },
      { id: "brand-signature", title: "Brand Signature", duration: "3:12", cloudinaryId: "brand_signature_demo" },
      { id: "emotional-journey", title: "Emotional Journey", duration: "2:28", cloudinaryId: "emotional_journey_demo" }
    ]
  },
  {
    id: 'sonic-logos',
    title: "Sonic Logos & Jingles", 
    subtitle: "Instant Brand Recognition",
    hook: "Be recognized in a heartbeat — create your signature sound that sticks in memory",
    description: "Think McDonald's \"I'm lovin' it\" or Netflix's \"ta-dum\" — but uniquely yours. Short, catchy, unforgettable.",
    workflow: [
      { step: "Research", detail: "Brand voice & competitor analysis" },
      { step: "Ideate", detail: "Multiple musical concepts & variations" },
      { step: "Create", detail: "3-5 second sonic masterpiece" },
      { step: "Optimize", detail: "Platform cuts for TV, social, radio" }
    ],
    included: [
      "3-5 second original sonic logo",
      "Platform-optimized cuts",
      "Full ownership with no licensing fees",
      "Collaborative refinement process"
    ],
    accentColor: "#3b82f6",
    icon: IoPulse,
    examples: [
      { id: "tech-brand-sting", title: "Tech Brand Sting", duration: "0:04", cloudinaryId: "tech_brand_sting_demo" },
      { id: "luxury-identity", title: "Luxury Identity", duration: "0:05", cloudinaryId: "luxury_identity_demo" },
      { id: "playful-jingle", title: "Playful Jingle", duration: "0:03", cloudinaryId: "playful_jingle_demo" }
    ]
  },
  {
    id: 'beats-tracks',
    title: "Ready-to-use Beats & Tracks",
    subtitle: "Premium Sound, Instant Impact",
    hook: "Need it fast? Get premium, pre-made tracks + full customization options",
    description: "Zero compromise on quality. Choose from premium tracks designed to energize your brand, with full customization available.",
    workflow: [
      { step: "Browse", detail: "Curated premium beat library" },
      { step: "License", detail: "Instant rights & usage clarity" },
      { step: "Customize", detail: "Optional track modifications" },
      { step: "Deploy", detail: "Ready for immediate use" }
    ],
    included: [
      "Immediate licensing & usage rights",
      "Pre-mastered studio quality",
      "Multiple genres available",
      "Optional customization service"
    ],
    accentColor: "#f59e0b",
    textIcon: "BEATS",
    examples: [
      { id: "urban-energy", title: "Urban Energy", duration: "3:15", cloudinaryId: "urban_energy_demo" },
      { id: "corporate-drive", title: "Corporate Drive", duration: "2:48", cloudinaryId: "corporate_drive_demo" },
      { id: "cinematic-build", title: "Cinematic Build", duration: "3:33", cloudinaryId: "cinematic_build_demo" }
    ]
  },
  {
    id: 'film-music',
    title: "Music for Film",
    subtitle: "Cinematic Emotion & Storytelling",
    hook: "From essential themes to full scoring — sound that moves audiences",
    description: "Flexible packages that scale with your project. Every film deserves a soundtrack that amplifies its emotional impact.",
    workflow: [
      { step: "Analyze", detail: "Script study & emotional mapping" },
      { step: "Theme", detail: "Core musical concepts & motifs" },
      { step: "Score", detail: "Full composition & arrangement" },
      { step: "Mix", detail: "Professional mixing & mastering" }
    ],
    included: [
      "3 tiered packages (Basic, Pro, Premium)",
      "Intro & ending themes included",
      "Optional full scoring & mixing",
      "Scale up as your project grows"
    ],
    accentColor: "#9333ea",
    icon: PiFilmReel,
    examples: [
      { id: "opening-theme", title: "Opening Theme", duration: "2:12", cloudinaryId: "opening_theme_demo" },
      { id: "emotional-score", title: "Emotional Score", duration: "4:45", cloudinaryId: "emotional_score_demo" },
      { id: "finale-crescendo", title: "Finale Crescendo", duration: "3:28", cloudinaryId: "finale_crescendo_demo" }
    ]
  }
];

const brands = [
  { name: "Always", logo: "/Brands/Always Logo.png" },
  { name: "Clorox", logo: "/Brands/Clorox.png" },
  { name: "Evvoli", logo: "/Brands/Evvoli Logo.png", invertColor: true },
  { name: "Hyundai", logo: "/Brands/Hyundai Logo HD.png", invertColor: true },
  { name: "LG", logo: "/Brands/LG.svg" },
  { name: "Oral-B", logo: "/Brands/Oral-B.png" }
];

export default function PresentationPage() {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [playingExample, setPlayingExample] = useState<string | null>(null);
  const [showOnePager, setShowOnePager] = useState<boolean>(false);

  // Handle deep linking
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && presentationServices.find(s => s.id === serviceParam)) {
      setSelectedService(serviceParam);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <img
                src="/assets/Key0n Logo-White.png"
                alt="Key0n Music Production Logo"
                className="h-16 md:h-20 lg:h-24 w-auto mx-auto mb-6"
              />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Sound That Sells
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              I craft living sound identities for brands, films, and artists — making them unforgettable
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
              Let's Craft Your Sound
            </button>
            <button className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
              <FiPlay className="w-4 h-4" />
              Hear the Work
            </button>
          </motion.div>
        </div>
        
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Sound Solution</h2>
            <p className="text-white/60 text-lg">Click any service to explore the full presentation</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {presentationServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedService(service.id)}
                className="group relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 cursor-pointer hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 40px -10px rgba(0, 0, 0, 0.3)`
                }}
              >
                {/* Icon or Text */}
                <div className="mb-6">
                  {service.icon ? (
                    <service.icon 
                      className="w-10 h-10 mb-4" 
                      style={{ color: service.accentColor }}
                    />
                  ) : (
                    <div 
                      className="text-2xl font-bold tracking-wider mb-4 inline-block"
                      style={{ 
                        fontFamily: "Subway Berlin OT, sans-serif",
                        color: service.accentColor 
                      }}
                    >
                      {service.textIcon}
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-white/60 text-sm mb-4">{service.subtitle}</p>
                <p className="text-white/80 leading-relaxed mb-6">{service.hook}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">Click to explore</span>
                  <FiExternalLink className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                </div>

                {/* Hover Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${service.accentColor}08 0%, transparent 100%)`,
                    boxShadow: `0 0 40px -10px ${service.accentColor}20`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide Presentation */}
      <AnimatePresence>
        {selectedService && (
          <SlidePresentation
            serviceId={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>

      {/* One-Pager Overlay */}
      <AnimatePresence>
        {showOnePager && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 overflow-y-auto"
          >
            <div className="min-h-screen flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="max-w-6xl w-full bg-white rounded-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setShowOnePager(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                >
                  <IoClose className="w-6 h-6 text-black" />
                </button>

                {(() => {
                  const service = presentationServices.find(s => s.id === selectedService);
                  if (!service) return null;
                  
                  return (
                    <ServiceOnePager
                      service={service}
                      onDownloadPDF={() => {
                        // In real implementation, generate and download PDF
                        console.log('Download PDF for', service.title);
                      }}
                      onShare={() => {
                        // In real implementation, copy share link
                        navigator.clipboard.writeText(`${window.location.origin}/presentation?service=${service.id}`);
                        alert('Link copied to clipboard!');
                      }}
                    />
                  );
                })()}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Logos Carousel */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Trusted by Leading Brands</h3>
            <p className="text-white/60">Creating unforgettable sound experiences</p>
          </div>
          
          <LogoLoop
            logos={brands.map(brand => ({
              src: brand.logo,
              alt: `${brand.name} logo`,
              title: brand.name
            }))}
            speed={40}
            direction="left"
            logoHeight={48}
            gap={96}
            pauseOnHover={false}
            fadeOut={true}
            fadeOutColor="#000000"
            scaleOnHover={false}
            ariaLabel="Brand partners"
            className="opacity-80"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand with Sound?</h2>
          <p className="text-xl text-white/70 mb-8">Let's create something unforgettable together</p>
          <Link href="#contact" className="inline-block px-10 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
            Book Your Consultation
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
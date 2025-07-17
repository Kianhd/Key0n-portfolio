"use client";

import React from "react";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";
import { IoSend } from "react-icons/io5";
import { Logo } from "../Logo";

const ContactSection: React.FC = () => {
  const browserOpts = useBrowserOptimizations();

  return (
    <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Content Area */}
          <div className="lg:sticky lg:top-32">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight tracking-tight">
                  <span className="block text-foreground/90">Let&apos;s Create</span>
                  <span 
                    className="block"
                    style={{
                      background: "linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(239, 68, 68, 0.88) 25%, rgba(200, 35, 35, 0.92) 50%, rgba(185, 28, 28, 0.9) 75%, rgba(230, 55, 55, 0.93) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 2px 6px rgba(220, 38, 38, 0.12), 0 0 30px rgba(220, 38, 38, 0.06)",
                      filter: "contrast(1.06) saturate(0.96) drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                    }}
                  >
                    Something Amazing
                  </span>
                </h2>
                <p className="text-xl lg:text-2xl text-muted/70 mb-8 leading-relaxed font-light">
                  Ready to elevate your project with professional music production?
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground/90 mb-2">Quick Response</h3>
                    <p className="text-muted/60 leading-relaxed">We typically respond within 48 hours to discuss your project requirements and creative vision.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground/90 mb-2">Tailored Solutions</h3>
                    <p className="text-muted/60 leading-relaxed">Every project is unique. We create custom music solutions that perfectly match your brand and objectives.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground/90 mb-2">Professional Quality</h3>
                    <p className="text-muted/60 leading-relaxed">Industry-standard production with full commercial licensing and unlimited revisions included.</p>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="pt-8">
                <div className="h-px bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent"></div>
              </div>

              {/* Logo Section */}
              <div className="pt-12 flex justify-center">
                <div className="relative">
                  <img
                    src="/assets/Key0n-Logo.svg"
                    alt="Key0n Logo"
                    width={200}
                    height={200}
                    className="opacity-8 hover:opacity-15 transition-opacity duration-300 w-[200px] h-[200px] object-contain"
                    style={{
                      filter: "invert(1) brightness(1)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="relative">
            {/* Premium glass card effect */}
            <div
              className="relative overflow-hidden rounded-2xl p-8 lg:p-12 border"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.02) 0%, 
                  rgba(255, 255, 255, 0.01) 50%, 
                  rgba(0, 0, 0, 0.02) 100%
                )`,
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: `
                  0 0 0 1px rgba(255, 255, 255, 0.02),
                  0 24px 48px -12px rgba(0, 0, 0, 0.3),
                  0 12px 24px -8px rgba(0, 0, 0, 0.2)
                `,
                backdropFilter: browserOpts.disableBackdropFilter ? "none" : "blur(20px)",
                WebkitBackdropFilter: browserOpts.disableBackdropFilter ? "none" : "blur(20px)",
              }}
            >
              {/* Subtle top accent line */}
              <div 
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
                }}
              />

              <form className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <div className="relative group">
                    <label className="block text-sm font-medium text-muted/70 mb-3 tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-3 bg-transparent border-b border-border/50 focus:border-foreground/40 focus:outline-none transition-all duration-300 text-foreground text-lg placeholder:text-muted/40"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="relative group">
                    <label className="block text-sm font-medium text-muted/70 mb-3 tracking-wide">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-3 bg-transparent border-b border-border/50 focus:border-foreground/40 focus:outline-none transition-all duration-300 text-foreground text-lg placeholder:text-muted/40"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="relative group">
                    <label className="block text-sm font-medium text-muted/70 mb-3 tracking-wide">
                      Phone Number <span className="text-muted/50">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full px-0 py-3 bg-transparent border-b border-border/50 focus:border-foreground/40 focus:outline-none transition-all duration-300 text-foreground text-lg placeholder:text-muted/40"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <label className="block text-sm font-medium text-muted/70 mb-3 tracking-wide">
                    Project Type
                  </label>
                  <select
                    className="w-full px-0 py-3 bg-transparent border-b border-border/50 focus:border-foreground/40 focus:outline-none transition-all duration-300 text-foreground text-lg cursor-pointer"
                    required
                  >
                    <option value="" className="bg-background text-foreground">Select project type</option>
                    <option value="commercial" className="bg-background text-foreground">Commercial Production</option>
                    <option value="artist" className="bg-background text-foreground">Artist Collaboration</option>
                    <option value="beats" className="bg-background text-foreground">Custom Beats</option>
                    <option value="film" className="bg-background text-foreground">Film Scoring</option>
                    <option value="mixing" className="bg-background text-foreground">Mixing & Mastering</option>
                    <option value="other" className="bg-background text-foreground">Other</option>
                  </select>
                </div>
                <div className="relative group">
                  <label className="block text-sm font-medium text-muted/70 mb-3 tracking-wide">
                    Project Details
                  </label>
                  <textarea
                    placeholder="Tell us about your project vision, timeline, budget, and any specific requirements..."
                    rows={6}
                    className="w-full px-0 py-3 bg-transparent border-b border-border/50 focus:border-foreground/40 focus:outline-none transition-all duration-300 resize-none text-foreground text-lg leading-relaxed placeholder:text-muted/40"
                    required
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full group relative overflow-hidden py-4 px-8 font-medium text-lg transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "rgba(255, 255, 255, 0.9)",
                      boxShadow: "0 8px 32px -8px rgba(0, 0, 0, 0.3)",
                      borderRadius: "6px"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                      e.currentTarget.style.boxShadow = "0 12px 40px -8px rgba(0, 0, 0, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                      e.currentTarget.style.boxShadow = "0 8px 32px -8px rgba(0, 0, 0, 0.3)";
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span className="tracking-wide">Send Message</span>
                      <IoSend className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </form>
              
              {/* Alternative Contact Option */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <div className="text-center">
                  <p className="text-muted/60 text-sm mb-3">Prefer to call directly?</p>
                  <a
                    href="tel:+971585127979"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.85)",
                      boxShadow: "0 4px 16px -4px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(220, 38, 38, 0.04) 100%)";
                      e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.2)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.95)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-70"
                    >
                      <path
                        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="tracking-wide">+971 58 512 7979</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Premium Bottom Spotlight Effect */}
        <div className="relative mt-24 overflow-hidden">
          {/* Main spotlight effect - browser optimized */}
          {!browserOpts.isFirefoxBrowser ? (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(
                    ellipse 120% 50% at 50% 100%,
                    rgba(220, 38, 38, 0.12) 0%,
                    rgba(220, 38, 38, 0.08) 20%,
                    rgba(220, 38, 38, 0.04) 40%,
                    transparent 70%
                  ),
                  radial-gradient(
                    ellipse 80% 40% at 50% 100%,
                    rgba(255, 255, 255, 0.06) 0%,
                    rgba(255, 255, 255, 0.03) 30%,
                    transparent 60%
                  )
                `,
                mixBlendMode: 'screen',
                height: '200px',
              }}
            />
          ) : (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center bottom, rgba(220, 38, 38, 0.06) 0%, transparent 50%)',
                height: '200px',
              }}
            />
          )}
          
          {/* Subtle pattern overlay */}
          {!browserOpts.isFirefoxBrowser && (
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.8) 1px, transparent 0)`,
                backgroundSize: "30px 30px",
                height: '200px',
              }}
            />
          )}
          
          {/* Elegant glow bars */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="transition-all duration-1000 ease-out"
                style={{
                  width: '2px',
                  height: `${20 + i * 8}px`,
                  background: `linear-gradient(to top, 
                    rgba(220, 38, 38, ${0.4 - i * 0.05}) 0%, 
                    rgba(220, 38, 38, ${0.2 - i * 0.03}) 50%, 
                    transparent 100%
                  )`,
                  borderRadius: '1px',
                  filter: browserOpts.reduceBlur ? 'none' : 'blur(0.5px)',
                  animation: `pulseGlow ${2 + i * 0.3}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
          
          {/* Floating accent particles */}
          {!browserOpts.reduceMotionComplexity && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full opacity-30"
                  style={{
                    background: 'rgba(220, 38, 38, 0.6)',
                    left: `${30 + i * 20}%`,
                    bottom: `${10 + i * 15}px`,
                    animation: `floatParticle ${4 + i}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Executive accent line */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.4) 50%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
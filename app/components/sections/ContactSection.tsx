"use client";

import React from "react";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";

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
                  <span className="block bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
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
                    <p className="text-muted/60 leading-relaxed">We typically respond within 24 hours to discuss your project requirements and creative vision.</p>
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
                    className="w-full group relative overflow-hidden rounded-xl py-4 px-8 font-medium text-lg transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "rgba(255, 255, 255, 0.9)",
                      boxShadow: "0 8px 32px -8px rgba(0, 0, 0, 0.3)"
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
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
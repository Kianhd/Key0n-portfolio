"use client";

import React from "react";
import { useBrowserOptimizations } from "@/app/hooks/useBrowserOptimizations";

const ContactSection: React.FC = () => {
  const browserOpts = useBrowserOptimizations();

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-title font-semibold mb-6 uppercase scroll-fade-in">
            Let&apos;s Create
            <br />
            Something Amazing
          </h2>
          <p className="text-body text-muted uppercase font-normal">
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
                {browserOpts.reduceBlur ? (
                  <div
                    className="w-full h-full bg-foreground rounded-full"
                    style={{
                      boxShadow: "0 0 6px rgba(250, 250, 250, 0.6)",
                    }}
                  />
                ) : (
                  <>
                    <div className="w-full h-full bg-foreground rounded-full" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                  </>
                )}
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
                {browserOpts.reduceBlur ? (
                  <div
                    className="w-full h-full bg-foreground rounded-full"
                    style={{
                      boxShadow: "0 0 6px rgba(250, 250, 250, 0.6)",
                    }}
                  />
                ) : (
                  <>
                    <div className="w-full h-full bg-foreground rounded-full" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                  </>
                )}
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
              {browserOpts.reduceBlur ? (
                <div
                  className="w-full h-full bg-foreground rounded-full"
                  style={{
                    boxShadow: "0 0 6px rgba(250, 250, 250, 0.6)",
                  }}
                />
              ) : (
                <>
                  <div className="w-full h-full bg-foreground rounded-full" />
                  <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                  <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                </>
              )}
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
              {browserOpts.reduceBlur ? (
                <div
                  className="w-full h-full bg-foreground rounded-full"
                  style={{
                    boxShadow: "0 0 6px rgba(250, 250, 250, 0.6)",
                  }}
                />
              ) : (
                <>
                  <div className="w-full h-full bg-foreground rounded-full" />
                  <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                  <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                </>
              )}
            </div>
          </div>
          <div className="relative group">
            <button
              type="submit"
              className="w-full border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background py-5 font-medium text-small uppercase rounded-sm transition-all duration-300 relative z-10"
            >
              Send Message
            </button>
            <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {browserOpts.reduceBlur ? (
                <div
                  className="absolute inset-0 border-2 border-foreground rounded-sm"
                  style={{
                    boxShadow: "0 0 8px rgba(250, 250, 250, 0.5)",
                  }}
                />
              ) : (
                <>
                  <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                  <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                  <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
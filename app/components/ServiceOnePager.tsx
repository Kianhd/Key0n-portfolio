"use client";

import React from "react";
import { motion } from "motion/react";
import { FiDownload, FiShare2, FiExternalLink } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";

interface ServiceOnePagerProps {
  service: {
    id: string;
    title: string;
    subtitle: string;
    hook: string;
    description: string;
    workflow: Array<{ step: string; detail: string }>;
    included: string[];
    accentColor: string;
    icon?: React.ComponentType<any>;
    textIcon?: string;
  };
  onDownloadPDF?: () => void;
  onShare?: () => void;
}

const ServiceOnePager: React.FC<ServiceOnePagerProps> = ({
  service,
  onDownloadPDF,
  onShare
}) => {
  const brandLogos = ["LG", "Hyundai", "Clorox", "Always", "Oral-B"];

  return (
    <div className="max-w-4xl mx-auto bg-white text-black min-h-screen" id="onepager-content">
      {/* Header */}
      <div className="bg-black text-white p-8 text-center">
        <div className="mb-4">
          {service.icon ? (
            <service.icon 
              className="w-12 h-12 mx-auto mb-4" 
              style={{ color: service.accentColor }}
            />
          ) : (
            <div 
              className="text-3xl font-bold tracking-wider mb-4"
              style={{ 
                fontFamily: "Subway Berlin OT, sans-serif",
                color: service.accentColor 
              }}
            >
              {service.textIcon}
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
        <p className="text-xl text-white/70 mb-4">{service.subtitle}</p>
        <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">{service.hook}</p>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 px-8 py-4 border-b flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-800">Professional Service Overview</h2>
          <p className="text-sm text-gray-600">Key0n Music Production</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <FiShare2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={onDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            style={{ backgroundColor: service.accentColor }}
          >
            <FiDownload className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Service Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: service.accentColor }}>
            What You Get
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
        </section>

        {/* Process Workflow */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: service.accentColor }}>
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.workflow.map((step, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg"
                  style={{ backgroundColor: service.accentColor }}
                >
                  {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
                <p className="text-gray-600 text-sm">{step.detail}</p>
                
                {index < service.workflow.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full">
                    <div 
                      className="h-px w-full"
                      style={{ backgroundColor: `${service.accentColor}30` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: service.accentColor }}>
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.included.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <IoCheckmark 
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: service.accentColor }}
                />
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: service.accentColor }}>
            Trusted by Leading Brands
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {brandLogos.map((logo, index) => (
              <div key={index} className="text-xl font-bold text-gray-400">
                {logo}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            Creating unforgettable sound experiences for global brands
          </p>
        </section>

        {/* Why Choose Key0n */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: service.accentColor }}>
            Why Choose Key0n
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl"
                style={{ backgroundColor: `${service.accentColor}20` }}
              >
                <span style={{ color: service.accentColor }}>♪</span>
              </div>
              <h3 className="font-semibold mb-2">Music Since 13</h3>
              <p className="text-gray-600 text-sm">Deep musical foundation with years of expertise</p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl"
                style={{ backgroundColor: `${service.accentColor}20` }}
              >
                <span style={{ color: service.accentColor }}>⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600 text-sm">Professional quality delivered on time</p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl"
                style={{ backgroundColor: `${service.accentColor}20` }}
              >
                <span style={{ color: service.accentColor }}>✨</span>
              </div>
              <h3 className="font-semibold mb-2">Unique Sound</h3>
              <p className="text-gray-600 text-sm">Crafted specifically for your brand identity</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-6 text-lg">Let's create something unforgettable for your brand</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: service.accentColor, color: 'black' }}
            >
              Request Custom Demo
            </button>
            <button className="px-8 py-3 border border-white/30 rounded-full font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
              <FiExternalLink className="w-4 h-4" />
              View Full Portfolio
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/60 text-sm">
              Contact: hello@key0n.com • Portfolio: key0n.com
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm border-t pt-6">
          <p>© 2024 Key0n Music Production. Professional sound design and music composition services.</p>
          <p className="mt-2">This presentation was generated for client review purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceOnePager;
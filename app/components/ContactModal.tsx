'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  beatName?: string;
}

export default function ContactModal({ isOpen, onClose, beatName }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'customization',
    message: beatName ? `Hi, I'm interested in customizing the beat "${beatName}". ` : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground uppercase">
                  Customize Beat
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background rounded-sm flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border-b-2 border-border focus:outline-none focus:border-[#FFC60B] transition-all duration-200 text-body"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border-b-2 border-border focus:outline-none focus:border-[#FFC60B] transition-all duration-200 text-body"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-border focus:outline-none focus:border-[#FFC60B] transition-all duration-200 text-foreground text-body"
                    required
                  >
                    <option value="customization">Beat Customization</option>
                    <option value="variation">Beat Variation</option>
                    <option value="remix">Remix</option>
                    <option value="stems">Stems Package</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your customization needs..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-border focus:outline-none focus:border-[#FFC60B] transition-all duration-200 resize-none text-body leading-relaxed"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background py-3 transition-all duration-300 font-semibold text-small uppercase rounded-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background py-3 transition-all duration-300 font-semibold text-small uppercase rounded-sm"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
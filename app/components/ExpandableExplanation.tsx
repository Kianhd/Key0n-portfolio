'use client';

import { motion, AnimatePresence } from 'motion/react';
import { 
  FiMusic, 
  FiStar, 
  FiZap, 
  FiCheck,
  FiTrendingUp,
  FiFilm,
  FiHeadphones,
  FiLayers
} from 'react-icons/fi';
import { IoSparkles } from 'react-icons/io5';
import { cn } from '@/lib/utils';

interface ExpandableExplanationProps {
  isOpen: boolean;
  accentColor: string;
  serviceTitle: string;
}

export default function ExpandableExplanation({ 
  isOpen, 
  accentColor,
  serviceTitle 
}: ExpandableExplanationProps) {
  const packages = [
    {
      title: 'Basic',
      subtitle: 'Foundation',
      icon: FiMusic,
      description: 'Best for small projects & quick turnarounds',
      features: [
        'Original Intro Theme (sets the tone)',
        'Ending Theme (lasting impact)',
        'High-quality, cinema-ready audio files'
      ],
      highlight: 'Simple, powerful, cost-efficient.'
    },
    {
      title: 'Pro',
      subtitle: 'Story Enhancer',
      icon: FiHeadphones,
      popular: true,
      description: 'Perfect for both short films and full-length features',
      features: [
        'Everything in Basic',
        'Multiple Mood Tracks for different emotions/energies',
        'Key Scene Music tailored to pivotal moments',
        'Real orchestral music arrangements',
        'Priority delivery of audio files'
      ],
      highlight: 'Whether it\'s a short film or a feature, this package gives you a versatile music toolkit that amplifies storytelling without the cost of full scoring.'
    },
    {
      title: 'Premium',
      subtitle: 'Full Immersion',
      icon: IoSparkles,
      isPremium: true,
      description: 'Best for directors who want complete sound integration',
      features: [
        'Everything in Pro',
        'Full Film Scoring (frame-by-frame composition)',
        'Real orchestral music with live instruments',
        'Complete Soundtrack Mixing',
        'Additional Scene-Specific Music on request',
        'Direct collaboration on music placement'
      ],
      highlight: 'Total control over your film\'s sound identity.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="py-6 px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="text-center">
                <h3 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: accentColor }}>
                  Film Music Packages
                </h3>
                <p className="text-white/80 text-lg lg:text-xl leading-relaxed">
                  Choose the perfect soundtrack solution for your project
                </p>
              </div>

              {/* Packages Grid */}
              <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4 lg:gap-5 max-h-[70vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    className="relative"
                  >
                    {pkg.popular && (
                      <div 
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold z-10"
                        style={{ 
                          backgroundColor: accentColor,
                          color: '#000'
                        }}
                      >
                        MOST POPULAR
                      </div>
                    )}
                    
                    <div 
                      className={cn(
                        "h-full rounded-xl border transition-all duration-300 flex flex-col",
                        pkg.popular && "scale-[1.01] shadow-lg",
                        pkg.isPremium && "scale-[1.02] shadow-xl relative overflow-hidden",
                        "p-4 lg:p-5"
                      )}
                      style={{ 
                        borderColor: pkg.isPremium 
                          ? 'rgba(255, 215, 0, 0.3)' 
                          : pkg.popular 
                            ? `${accentColor}40` 
                            : `${accentColor}20`,
                        backgroundColor: pkg.isPremium 
                          ? 'rgba(255, 215, 0, 0.03)' 
                          : pkg.popular 
                            ? `${accentColor}08` 
                            : `${accentColor}03`,
                        background: pkg.isPremium 
                          ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.03) 0%, rgba(255, 215, 0, 0.01) 100%)'
                          : undefined
                      }}
                    >
                      {/* Premium shimmer effect */}
                      {pkg.isPremium && (
                        <div 
                          className="absolute inset-0 opacity-[0.03] pointer-events-none"
                          style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(255, 215, 0, 0.1) 50%, transparent 60%)',
                            animation: 'shimmer 3s infinite'
                          }}
                        />
                      )}

                      {/* Package Header */}
                      <div className={cn(
                        "flex items-start justify-between flex-shrink-0",
                        "mb-3 lg:mb-4"
                      )}>
                        <div>
                          <h4 className={cn(
                            "text-xl lg:text-2xl font-bold flex items-center gap-2 lg:gap-3",
                            pkg.isPremium && "bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                          )}>
                            {pkg.icon && (
                              <pkg.icon 
                                className={cn(
                                  "w-5 h-5 lg:w-6 lg:h-6",
                                  pkg.isPremium && "w-6 h-6 lg:w-7 lg:h-7"
                                )}
                                style={{ 
                                  color: pkg.isPremium ? '#FFD700' : accentColor 
                                }} 
                              />
                            )}
                            {pkg.title}
                          </h4>
                          <p className={cn(
                            "text-sm lg:text-base font-medium mt-1",
                            pkg.isPremium ? "text-yellow-600/80" : "text-white/60"
                          )}>
                            {pkg.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={cn(
                        "text-white/70 leading-relaxed flex-shrink-0",
                        "text-sm lg:text-base mb-3 lg:mb-4"
                      )}>
                        {pkg.description}
                      </p>

                      {/* Features */}
                      <ul className={cn(
                        "flex-grow",
                        "space-y-2 mb-4 lg:mb-5"
                      )}>
                        {pkg.features.map((feature, i) => (
                          <li key={i} className={cn(
                            "flex items-start gap-2 lg:gap-3",
                            "text-sm lg:text-base"
                          )}>
                            <FiCheck 
                              className="w-4 h-4 lg:w-5 lg:h-5 mt-0.5 flex-shrink-0" 
                              style={{ 
                                color: pkg.isPremium ? '#FFD700' : accentColor 
                              }}
                            />
                            <span className={cn(
                              "text-white/70 leading-relaxed",
                              feature.startsWith('Everything') && "font-semibold text-white/90",
                              pkg.isPremium && feature.includes('Direct collaboration') && "font-semibold text-yellow-600/90"
                            )}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Highlight */}
                      <div 
                        className={cn(
                          "border-t flex-shrink-0 mt-auto",
                          "pt-3 lg:pt-4"
                        )}
                        style={{ 
                          borderColor: pkg.isPremium ? 'rgba(255, 215, 0, 0.15)' : `${accentColor}15` 
                        }}
                      >
                        <p className={cn(
                          "text-xs lg:text-sm leading-relaxed",
                          pkg.isPremium && "font-semibold"
                        )} 
                        style={{ 
                          color: pkg.isPremium ? '#FFD700' : accentColor 
                        }}>
                          <FiTrendingUp className="inline w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                          {pkg.highlight}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why This Works Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-4 lg:p-6 rounded-xl border border-border/50 bg-background/50"
              >
                <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                  <FiZap className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: accentColor }} />
                  <h4 className="text-lg lg:text-xl font-bold">Why This Works</h4>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
                  <div className="flex gap-3">
                    <FiFilm className="w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0 opacity-60" />
                    <div>
                      <p className="font-semibold text-base lg:text-lg mb-1 lg:mb-2">Start smart</p>
                      <p className="text-sm lg:text-base text-white/70 leading-relaxed">
                        Intro, outro, and mood tracks deliver huge cinematic value fast.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <FiLayers className="w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0 opacity-60" />
                    <div>
                      <p className="font-semibold text-base lg:text-lg mb-1 lg:mb-2">Scale when ready</p>
                      <p className="text-sm lg:text-base text-white/70 leading-relaxed">
                        Upgrade to full scoring & mixing as your project grows.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <FiHeadphones className="w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0 opacity-60" />
                    <div>
                      <p className="font-semibold text-base lg:text-lg mb-1 lg:mb-2">Clear expectations</p>
                      <p className="text-sm lg:text-base text-white/70 leading-relaxed">
                        You know exactly what's included at every tier.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
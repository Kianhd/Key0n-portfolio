'use client';

import { motion, AnimatePresence } from 'motion/react';
import { TimelineStep } from '@/app/types/timeline';
import * as Icons from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface ExpandableTimelineProps {
  steps: TimelineStep[];
  isOpen: boolean;
  accentColor: string;
  serviceTitle: string;
}

export default function ExpandableTimeline({ 
  steps, 
  isOpen, 
  accentColor,
  serviceTitle 
}: ExpandableTimelineProps) {
  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons];
    return Icon ? <Icon /> : <Icons.FiCircle />;
  };

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
          <div className="py-12 px-6 md:px-8 lg:px-12">
            <div className="mb-8">
              <h3 className="text-3xl lg:text-4xl font-semibold mb-4" style={{ color: accentColor }}>
                How We Work Together
              </h3>
              <p className="text-white/80 text-lg lg:text-xl leading-relaxed">
                Your {serviceTitle.toLowerCase()} journey from start to finish
              </p>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden md:block relative">
              {/* Timeline Steps Container */}
              <div className={`relative flex justify-between items-start ${steps.length === 4 ? 'max-w-5xl mx-auto' : 'max-w-6xl mx-auto'}`}>
                {/* Timeline Line - positioned behind dots */}
                <div 
                  className="absolute top-[48px] left-[48px] right-[48px] h-0.5 -translate-y-1/2"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                    className="h-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>

                {/* Timeline Steps */}
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                    className="relative flex flex-col items-center text-center flex-1"
                    style={{ 
                      maxWidth: steps.length === 4 ? '280px' : '240px',
                      minWidth: '200px'
                    }}
                  >
                    {/* Milestone Dot */}
                    <div className="relative z-10 mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: 0.1 * index + 0.7,
                          type: 'spring',
                          stiffness: 200
                        }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-background"
                        style={{ backgroundColor: accentColor }}
                      >
                        <span className="text-lg">
                          {getIcon(step.icon)}
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: 0.1 * index + 0.8,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          duration: 2
                        }}
                        className="absolute inset-0 rounded-full opacity-20"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>

                    {/* Step Content */}
                    <div className="space-y-4 px-2">
                      <h4 className="font-semibold text-lg lg:text-xl">{step.title}</h4>
                      <p className="text-base lg:text-lg text-white/70 leading-relaxed">
                        {step.description}
                      </p>
                      <div 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm lg:text-base font-medium"
                        style={{ 
                          backgroundColor: `${accentColor}15`,
                          color: accentColor 
                        }}
                      >
                        <Icons.FiClock className="w-4 h-4" />
                        {step.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                  className="flex gap-4"
                >
                  {/* Timeline Line and Dot */}
                  <div className="relative flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.1 * index + 0.5,
                        type: 'spring'
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-background shrink-0"
                      style={{ backgroundColor: accentColor }}
                    >
                      <span className="text-sm">
                        {getIcon(step.icon)}
                      </span>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ 
                          delay: 0.1 * index + 0.7,
                          duration: 0.3
                        }}
                        className="w-0.5 flex-1 mt-2"
                        style={{ backgroundColor: `${accentColor}30` }}
                      />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-6">
                    <h4 className="font-semibold text-xl mb-2">{step.title}</h4>
                    <p className="text-lg text-white/70 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium"
                      style={{ 
                        backgroundColor: `${accentColor}15`,
                        color: accentColor 
                      }}
                    >
                      <Icons.FiClock className="w-4 h-4" />
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Timeline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 pt-8 border-t border-border/50 flex items-center justify-center gap-4"
            >
              <Icons.FiCalendar className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Total project timeline: 
                <span className="font-semibold ml-1" style={{ color: accentColor }}>
                  {serviceTitle.includes('Sonic') ? '10-14 days' : '2-3 weeks'}
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
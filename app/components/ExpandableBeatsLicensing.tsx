'use client';

import { motion, AnimatePresence } from 'motion/react';
import { IoCheckmark, IoClose } from 'react-icons/io5';

interface ExpandableBeatsLicensingProps {
  isOpen: boolean;
  accentColor: string;
  serviceTitle: string;
}

export default function ExpandableBeatsLicensing({ 
  isOpen, 
  accentColor,
  serviceTitle 
}: ExpandableBeatsLicensingProps) {

  const licenseData = [
    {
      feature: 'Audio Quality',
      basic: 'MP3 (High-Quality)',
      standard: 'WAV + MP3 (Studio Quality)',
      premium: 'WAV + MP3 + Full Stems',
      exclusive: 'WAV + MP3 + Stems (All Rights)',
      custom: 'Full Master Quality + Stems'
    },
    {
      feature: 'Use For',
      basic: 'Demo / Small Projects',
      standard: 'Streaming, Social, Live Shows',
      premium: 'Commercial Releases, Sync Projects',
      exclusive: 'Unlimited Commercial Use',
      custom: 'Tailored to Your Brand'
    },
    {
      feature: 'Customization',
      basic: 'No',
      standard: 'No',
      premium: 'Limited',
      exclusive: 'Limited',
      custom: 'Full Creative Control'
    },
    {
      feature: 'Revision Rounds',
      basic: 'No',
      standard: 'No',
      premium: 'No',
      exclusive: 'No',
      custom: 'Up to 3 Revisions'
    },
    {
      feature: 'Genre/Style',
      basic: 'Pre-made Selection',
      standard: 'Pre-made Selection',
      premium: 'Pre-made Selection',
      exclusive: 'Pre-made Selection',
      custom: 'Your Choice'
    },
    {
      feature: 'BPM & Key',
      basic: 'Fixed',
      standard: 'Fixed',
      premium: 'Fixed',
      exclusive: 'Fixed',
      custom: 'Your Specification'
    },
    {
      feature: 'Radio / TV Use',
      basic: 'No',
      standard: 'Limited',
      premium: 'Yes',
      exclusive: 'Unlimited',
      custom: 'Unlimited'
    },
    {
      feature: 'Ownership',
      basic: 'Non-Exclusive',
      standard: 'Non-Exclusive',
      premium: 'Non-Exclusive',
      exclusive: 'Exclusive (beat removed)',
      custom: 'Full Exclusive Rights'
    },
    {
      feature: 'Turnaround Time',
      basic: 'Instant Download',
      standard: 'Instant Download',
      premium: 'Instant Download',
      exclusive: 'Instant Download',
      custom: '5-7 Business Days'
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: 1, 
            height: 'auto',
            transition: {
              height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, delay: 0.1 }
            }
          }}
          exit={{ 
            opacity: 0, 
            height: 0,
            transition: {
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 }
            }
          }}
          className="overflow-hidden"
        >
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white/95">
                Beat Licensing & Custom Production
              </h3>
              <p className="text-white/60 text-sm">
                From ready-made beats to fully custom productions
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 text-sm font-medium text-white/70 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="text-center p-3 text-sm font-medium text-white/90">
                      <div>Basic Lease</div>
                      <div className="text-xs text-white/50 font-normal mt-1">(MP3)</div>
                    </th>
                    <th className="text-center p-3 text-sm font-medium text-white/90">
                      <div>Standard Lease</div>
                      <div className="text-xs text-white/50 font-normal mt-1">(WAV + MP3)</div>
                    </th>
                    <th className="text-center p-3 text-sm font-medium text-white/90 relative">
                      <div className="flex flex-col items-center">
                        <span 
                          className="text-xs px-2 py-1 rounded-full font-bold mb-1"
                          style={{ backgroundColor: accentColor, color: '#000' }}
                        >
                          Popular
                        </span>
                        <div>Premium Lease</div>
                        <div className="text-xs text-white/50 font-normal mt-1">(Stems + WAV/MP3)</div>
                      </div>
                    </th>
                    <th className="text-center p-3 text-sm font-medium text-white/90">
                      <div>Exclusive License</div>
                      <div className="text-xs text-white/50 font-normal mt-1">(Unlimited)</div>
                    </th>
                    <th className="text-center p-3 text-sm font-medium text-white/90 relative">
                      <div className="flex flex-col items-center">
                        <span 
                          className="text-xs px-2 py-1 rounded-full font-bold mb-1"
                          style={{ backgroundColor: '#f59e0b', color: '#000' }}
                        >
                          Custom
                        </span>
                        <div>Custom Beats</div>
                        <div className="text-xs text-white/50 font-normal mt-1">(Made-to-Order)</div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {licenseData.map((row, index) => {
                    const renderValue = (value: string, isCustom: boolean = false) => {
                      if (value === 'Yes') {
                        return <IoCheckmark className="w-4 h-4 text-green-400 mx-auto" />;
                      }
                      if (value === 'No' || value === 'N/A') {
                        return <span className="text-white/40 text-lg">−</span>;
                      }
                      if (value === 'Unlimited' || value === 'Lifetime') {
                        return <span className="text-green-400 font-medium">{value}</span>;
                      }
                      if (value.includes('Exclusive') || value.includes('Full Exclusive')) {
                        return <span className="text-purple-400">{value}</span>;
                      }
                      if (isCustom && (value.includes('Your') || value.includes('Full') || value.includes('Up to'))) {
                        return <span className="text-yellow-400 font-medium">{value}</span>;
                      }
                      return <span className="text-white/70">{value}</span>;
                    };

                    return (
                      <tr key={row.feature} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-200">
                        <td className="p-3 text-sm font-medium text-white/80">
                          {row.feature}
                        </td>
                        <td className="p-3 text-sm text-center">
                          {renderValue(row.basic)}
                        </td>
                        <td className="p-3 text-sm text-center">
                          {renderValue(row.standard)}
                        </td>
                        <td 
                          className="p-3 text-sm text-center"
                          style={{ backgroundColor: `${accentColor}08` }}
                        >
                          {renderValue(row.premium)}
                        </td>
                        <td className="p-3 text-sm text-center">
                          {renderValue(row.exclusive)}
                        </td>
                        <td 
                          className="p-3 text-sm text-center"
                          style={{ backgroundColor: '#f59e0b08' }}
                        >
                          {renderValue(row.custom, true)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Notes */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/60">
                <span className="flex items-center">
                  Ready-made: instant • Custom: 5-7 days
                </span>
                <span className="flex items-center">
                  Consultation included for custom
                </span>
                <span className="flex items-center">
                  All formats: BPM, Key, optimized files
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
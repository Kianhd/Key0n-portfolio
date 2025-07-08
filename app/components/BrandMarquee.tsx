"use client";

import { getBrowserOptimizations } from "@/lib/browser-detect";

interface Brand {
  name: string;
  logo: string; // URL or path to logo
  invertColor?: boolean; // Optional flag to invert colors
}

interface BrandMarqueeProps {
  brands: Brand[];
}

export default function BrandMarquee({ brands }: BrandMarqueeProps) {
  // Duplicate arrays for seamless loop
  const duplicatedBrands = [...brands, ...brands];
  const browserOpts = getBrowserOptimizations();

  return (
    <div className="w-full overflow-hidden py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h3 className="text-small uppercase tracking-wider text-muted/60 font-light">
            Trusted by Industry Leaders
          </h3>
        </div>
      </div>

      <div className="relative">
        {/* Gradient masks for fade effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee wrapper */}
        <div 
          className="flex animate-marquee"
          style={{
            // Hardware acceleration for smooth animation
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          {/* First set */}
          <div className="flex shrink-0">
            {brands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-6 md:px-10 lg:px-12"
              >
                <div className="relative group">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className={`h-9 md:h-12 lg:h-15 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300 ${
                      // Safari: Avoid filter stacking to prevent glitch
                      browserOpts.disableFilterStacking
                        ? (brand.invertColor ? 'filter brightness-0 invert' : 'drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)]')
                        : `drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)] ${brand.invertColor ? 'filter brightness-0 invert' : ''}`
                    }`}
                    style={{
                      // Hardware acceleration for Safari
                      transform: 'translateZ(0)',
                      willChange: browserOpts.avoidFilterAnimations ? 'opacity' : 'auto'
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Second set (duplicate) */}
          <div className="flex shrink-0" aria-hidden="true">
            {brands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}-duplicate`}
                className="flex-shrink-0 flex items-center justify-center px-6 md:px-10 lg:px-12"
              >
                <div className="relative group">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className={`h-9 md:h-12 lg:h-15 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300 ${
                      // Safari: Avoid filter stacking to prevent glitch
                      browserOpts.disableFilterStacking
                        ? (brand.invertColor ? 'filter brightness-0 invert' : 'drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)]')
                        : `drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)] ${brand.invertColor ? 'filter brightness-0 invert' : ''}`
                    }`}
                    style={{
                      // Hardware acceleration for Safari
                      transform: 'translateZ(0)',
                      willChange: browserOpts.avoidFilterAnimations ? 'opacity' : 'auto'
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
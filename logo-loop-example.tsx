// Example usage of LogoLoop component

import LogoLoop from '@/components/ui/logo-loop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiVercel } from 'react-icons/si';

// Example 1: Tech stack with React Icons
const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
];

export function TechStackLoop() {
  return (
    <div className="h-[120px] relative overflow-hidden">
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#0a0a0a"
        ariaLabel="Technology stack"
      />
    </div>
  );
}

// Example 2: Brand partners with images
const brandLogos = [
  { src: "/Brands/Always Logo.png", alt: "Always", href: "https://always.com" },
  { src: "/Brands/Clorox.png", alt: "Clorox", href: "https://clorox.com" },
  { src: "/Brands/LG.svg", alt: "LG", href: "https://lg.com" },
  { src: "/Brands/McDonalds Logo.png", alt: "McDonald's", href: "https://mcdonalds.com" },
  { src: "/Brands/Hyundai Logo HD.png", alt: "Hyundai", href: "https://hyundai.com" },
];

export function BrandPartnersLoop() {
  return (
    <div className="h-[80px] relative overflow-hidden">
      <LogoLoop
        logos={brandLogos}
        speed={80}
        direction="right"
        logoHeight={60}
        gap={60}
        pauseOnHover={false}
        scaleOnHover={false}
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Brand partners"
      />
    </div>
  );
}

// Example 3: Music production tools
const musicToolsLogos = [
  { node: <span className="text-2xl font-bold">Logic Pro</span>, title: "Logic Pro" },
  { node: <span className="text-2xl font-bold">Ableton</span>, title: "Ableton Live" },
  { node: <span className="text-2xl font-bold">Pro Tools</span>, title: "Pro Tools" },
  { node: <span className="text-2xl font-bold">Waves</span>, title: "Waves" },
  { node: <span className="text-2xl font-bold">FabFilter</span>, title: "FabFilter" },
];

export function MusicToolsLoop() {
  return (
    <div className="h-[100px] relative overflow-hidden">
      <LogoLoop
        logos={musicToolsLogos}
        speed={60}
        direction="left"
        logoHeight={32}
        gap={80}
        pauseOnHover
        scaleOnHover
        fadeOut={false}
        ariaLabel="Music production tools"
        className="text-foreground/70"
      />
    </div>
  );
}

// Example 4: Full configuration demo
export function FullConfigDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Tech Stack (with hover effects)</h3>
        <TechStackLoop />
      </div>
      
      <div>
        <h3 className="mb-4 text-lg font-semibold">Brand Partners (continuous scroll)</h3>
        <BrandPartnersLoop />
      </div>
      
      <div>
        <h3 className="mb-4 text-lg font-semibold">Music Tools (text logos)</h3>
        <MusicToolsLoop />
      </div>
    </div>
  );
}

// Example 5: Integration in a section
export function SectionWithLogoLoop() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground">
            Working with top brands and cutting-edge technologies
          </p>
        </div>
        
        <div className="space-y-8">
          <BrandPartnersLoop />
          <TechStackLoop />
        </div>
      </div>
    </section>
  );
}
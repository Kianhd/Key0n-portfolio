# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.4 portfolio website for a music producer built with TypeScript and styled using Tailwind CSS v4. The project uses Bun as the package manager and features a dark-themed, single-page application with smooth scrolling and animations.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server (with Turbopack)
bun dev

# Build for production
bun build

# Start production server
bun start

# Run linting
bun lint
```

## Architecture

The application follows Next.js App Router conventions with a section-based architecture:

- **Main Application**: Single-page portfolio in `app/page.tsx` that composes sections from `app/components/sections/`
- **Section Components**: Modular page sections in `app/components/sections/`
  - `HeroSection.tsx`: Main landing area with animated waveform background
  - `AboutSection.tsx`: Producer introduction with animated elements
  - `WorkSection.tsx`: Portfolio showcase with video carousels
  - `ServicesSection.tsx`: Service cards with hover effects
  - `ContactSection.tsx`: Contact form and social links
  - `Footer.tsx`: Site footer with social media links
- **Reusable Components**: UI components in `app/components/`
  - `Navigation.tsx`: Responsive navigation with mobile menu support
  - `VideoCarousel.tsx`: Swiper-based video player with custom controls
  - `ServiceCard.tsx`: Animated service cards with accent colors
  - `WaveformBackground.tsx`: Interactive audio waveform visualization
  - `BrandMarquee.tsx`: Animated brand logo carousel
- **UI Components**: Specialized components in `app/components/ui/`
  - `glare-card.tsx`: Glassmorphism cards with interactive glare effects
- **Utilities**: Helper functions in `lib/`
  - `utils.ts`: Contains `cn()` function for className merging
  - `cloudinary.ts`: Cloudinary integration for video management
  - `browser-detect.ts`: Browser optimization detection
- **Styling**: Tailwind CSS v4 with extensive custom CSS variables and animations in `app/globals.css`

## Key Technical Details

- **Animation Framework**: Motion (Framer Motion) v12.19.3 for smooth animations and transitions
- **Video Management**: Cloudinary integration with real project folders and video files
- **Styling System**: Tailwind CSS v4 with custom theme variables for consistent dark theme
- **Font System**: League Spartan as primary font with custom typography scales
- **Browser Optimizations**: Comprehensive browser detection and performance optimizations for Firefox, Safari, and Zen Browser
- **Performance**: Custom hooks for throttled animations, scroll detection, and performance monitoring
- **State Management**: Local React state with specialized hooks for browser optimizations and scroll animations

## Important Patterns

1. **Component Structure**: All components use TypeScript with proper type definitions and motion animations
2. **Styling**: Uses `cn()` utility from `lib/utils.ts` for conditional className merging with Tailwind
3. **Responsive Design**: Mobile-first approach with progressive enhancement and browser-specific optimizations
4. **Animation Strategy**: Compositor-friendly animations with fallbacks for different browsers
5. **Video Integration**: Cloudinary-based video management with structured folder mapping in `lib/cloudinary.ts`
6. **Browser Compatibility**: Extensive browser detection and optimization system for performance across different browsers
7. **Color System**: CSS custom properties with semantic color naming (background, foreground, accent, muted, etc.)
8. **Typography**: Custom typography scales with responsive clamp() functions for optimal readability

## Browser Optimization System

The codebase includes a sophisticated browser optimization system:

- Firefox/Zen Browser: Reduced animations, conservative will-change usage, simplified effects
- Safari: Backdrop filter replacements, reduced blur effects
- Performance monitoring: Custom hooks for tracking frame rates and memory usage
- Accessibility: Respects `prefers-reduced-motion` with comprehensive fallbacks

## Video Portfolio System

- **Project Structure**: Videos organized by client/project folders in Cloudinary
- **Dynamic Generation**: `generateProjectVideos()` function creates video objects from folder structure
- **Fallback System**: YouTube embeds as fallbacks for Cloudinary video failures
- **Brand Integration**: Comprehensive brand descriptions and client information

## Development Notes

- Uses Bun package manager with Turbopack for fast development builds
- Dark theme with carefully crafted color system using CSS custom properties
- Extensive custom animations optimized for performance across browsers
- SEO optimized with proper metadata, sitemap, and robots.txt generation
- Analytics integration with Vercel Analytics and Google Analytics setup

## Dev Personas

- **Frontend Expert**: Imagine you are an expert frontend and uiux developer working in fortune 500

## Design Philosophy

- Keep the styling minimal and sleek

## Personal AI Assistant Guidance

- Ask me questions before running my commands to produce the best results

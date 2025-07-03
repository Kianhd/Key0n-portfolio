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

The application follows Next.js App Router conventions with a component-based architecture:

- **Main Application**: Single-page portfolio in `app/page.tsx` with sections for Home, About, Portfolio, Services, and Contact
- **Components**: Reusable UI components in `app/components/`
  - `Navigation.tsx`: Responsive navigation with mobile menu support
  - `text-hover-effect.tsx`: Animated text effect using SVG filters and Motion (Framer Motion)
- **Utilities**: Helper functions in `lib/utils.ts` (primarily the `cn()` function for className merging)
- **Styling**: Tailwind CSS v4 with custom CSS variables defined in `app/globals.css`

## Key Technical Details

- **Animation**: Uses Motion (Framer Motion) v12.19.3 for smooth animations and transitions
- **Styling System**: Tailwind CSS v4 with custom theme variables for consistent dark theme
- **Font System**: Uses Geist and Geist Mono fonts via next/font for optimized loading
- **Portfolio Categories**: Commercial, Hip-Hop, Pop, and EDM music sections with filtering
- **State Management**: Local React state for navigation menu and portfolio filtering

## Important Patterns

1. **Component Structure**: All components use TypeScript with proper type definitions
2. **Styling**: Uses `cn()` utility from `lib/utils.ts` for conditional className merging
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Smooth Scrolling**: Implemented using CSS scroll-behavior and anchor links
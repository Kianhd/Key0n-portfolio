"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useActiveSection } from "../hooks/useActiveSection";
import { motion } from "motion/react";
import { useBrowserOptimizations } from "../hooks/useBrowserOptimizations";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const pathname = usePathname();
  const browserOpts = useBrowserOptimizations();

  const menuItems = [
    { label: "Home", href: "/", section: "home" },
    { label: "About", href: "/#about", section: "about" },
    { label: "Work", href: "/#work", section: "work" },
    { label: "Services", href: "/#services", section: "services" },
    { label: "Contact", href: "/#contact", section: "contact" },
    { label: "BEATS", href: "/beats", section: "beats", bold: true },
  ];

  const handleNavigation = useCallback((item: typeof menuItems[0], e: React.MouseEvent) => {
    e.preventDefault();
    
    console.log('Navigation clicked:', item.label, item.href, 'Current pathname:', pathname);
    
    // Special handling for BEATS button - use window.location directly
    if (item.href === '/beats') {
      console.log('BEATS button clicked - using window.location');
      window.location.href = '/beats';
      return;
    }
    
    // Handle different types of navigation
    if (item.href === '/') {
      // Home navigation
      if (pathname === '/') {
        // Already on home page, scroll to top
        console.log('Scrolling to top');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to home page
        console.log('Navigating to home page');
        window.location.href = '/';
      }
    } else if (item.href.startsWith('/#')) {
      // Hash navigation on home page
      if (pathname === '/') {
        // Already on home page, scroll to section
        console.log('Scrolling to section:', item.href);
        const targetId = item.href.replace('/#', '');
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page with hash
        console.log('Navigating to home with hash:', item.href);
        window.location.href = item.href;
      }
    } else {
      // Regular page navigation
      console.log('Regular page navigation to:', item.href);
      window.location.href = item.href;
    }
  }, [pathname]);

  const handleMobileNavigation = useCallback((item: typeof menuItems[0], e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    console.log('Mobile navigation clicked:', item.label, item.href);
    
    // Same logic as desktop but close mobile menu first
    setTimeout(() => {
      // Special handling for BEATS button - use window.location directly
      if (item.href === '/beats') {
        console.log('Mobile: BEATS button clicked - using window.location');
        window.location.href = '/beats';
        return;
      }
      
      if (item.href === '/') {
        // Home navigation
        if (pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.location.href = '/';
        }
      } else if (item.href.startsWith('/#')) {
        // Hash navigation on home page
        if (pathname === '/') {
          const targetId = item.href.replace('/#', '');
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.location.href = item.href;
        }
      } else {
        // Regular page navigation
        console.log('Mobile: Regular page navigation to:', item.href);
        window.location.href = item.href;
      }
    }, 100); // Small delay to allow menu to close
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-background/95 ${browserOpts.disableBackdropFilter || browserOpts.disableSafariBackdrop ? '' : 'backdrop-blur-md'} border-b border-border z-50 px-6 sm:px-8 lg:px-12`} style={{ transform: 'translateZ(0)', backgroundColor: browserOpts.disableBackdropFilter || browserOpts.disableSafariBackdrop ? 'rgba(0, 0, 0, 0.98)' : undefined }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Logo
              className="mt-2" // ← Add manual positioning
              size="small"
              glowIntensity="subtle"
            />
            <span className="text-foreground font-medium text-lg hidden sm:block uppercase tracking-[0.08em]">
              KEY0N
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative">
                <a
                  href={item.href}
                  onClick={(e) => handleNavigation(item, e)}
                  className={`transition-colors duration-200 uppercase text-small cursor-pointer tracking-[0.08em] font-medium ${
                    item.label === "BEATS"
                      ? "text-[#FFC60B] hover:text-[#FFC60B]/80 font-semibold"
                      : activeSection === item.section
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground font-normal"
                  } ${item.bold && item.label !== "BEATS" ? "font-medium" : ""}`}
                  style={
                    item.label === "BEATS"
                      ? { fontFamily: "Subway Berlin OT, sans-serif" }
                      : {}
                  }
                >
                  {item.label}
                </a>
                {activeSection === item.section && (
                  <motion.div
                    className="absolute -bottom-5 left-0 right-0 h-[2px]"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{
                      opacity: { duration: browserOpts.simplifyFramerMotion ? 0.15 : 0.2 },
                      scaleX: { 
                        duration: browserOpts.simplifyFramerMotion ? 0.2 : 0.3, 
                        ease: browserOpts.useSimpleEasing ? "easeOut" : "easeOut" 
                      }
                    }}
                  >
                    <div className="w-full h-full bg-foreground rounded-full" />
                    {browserOpts.reduceBlur ? (
                      /* Firefox optimized - single line with box-shadow */
                      <div className="absolute inset-0 bg-foreground rounded-full" style={{
                        boxShadow: '0 0 6px rgba(250, 250, 250, 0.6)',
                        transform: 'translateZ(0)'
                      }} />
                    ) : !browserOpts.limitGlowLayers ? (
                      <>
                        <div className="absolute inset-0 bg-foreground rounded-full blur-sm" style={{ transform: 'translateZ(0)' }} />
                        <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" style={{ transform: 'translateZ(0)' }} />
                      </>
                    ) : (
                      // Safari: Single reduced glow layer
                      <div className="absolute inset-0 bg-foreground rounded-full opacity-30" style={{ filter: 'blur(1px)', transform: 'translateZ(0)' }} />
                    )}
                  </motion.div>
                )}
              </div>
            ))}
            <div className="relative flex-shrink-0 ml-6">
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname === '/') {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="block relative overflow-hidden font-medium uppercase transition-all duration-500 cursor-pointer tracking-[0.08em] group"
                style={{
                  minWidth: 'fit-content',
                  transform: 'translateZ(0px) translateY(0px)',
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.9) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(10, 10, 10, 0.9)',
                  boxShadow: '0 4px 20px -4px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  backdropFilter: browserOpts.disableBackdropFilter ? 'none' : 'blur(12px)',
                  WebkitBackdropFilter: browserOpts.disableBackdropFilter ? 'none' : 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.9) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.4)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                  e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(220, 38, 38, 0.2)';
                  e.currentTarget.style.transform = 'translateZ(0) translateY(-2px) scale(1.02)';
                  e.currentTarget.style.backdropFilter = browserOpts.disableBackdropFilter ? 'none' : 'blur(20px)';
                  e.currentTarget.style.WebkitBackdropFilter = browserOpts.disableBackdropFilter ? 'none' : 'blur(20px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.9) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'rgba(10, 10, 10, 0.9)';
                  e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateZ(0) translateY(0) scale(1)';
                  e.currentTarget.style.backdropFilter = browserOpts.disableBackdropFilter ? 'none' : 'blur(12px)';
                  e.currentTarget.style.WebkitBackdropFilter = browserOpts.disableBackdropFilter ? 'none' : 'blur(12px)';
                }}
              >
                <span className="relative z-10 transition-all duration-300">
                  Get In Touch
                </span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.05) 100%)',
                    borderRadius: '6px',
                  }}
                />
              </a>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border">
            <div className="px-6 py-4 space-y-4">
              {menuItems.map((item) => (
                <div key={item.label} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleMobileNavigation(item, e)}
                    className={`block transition-colors duration-200 uppercase text-small pb-2 cursor-pointer tracking-[0.08em] font-medium ${
                      item.label === "BEATS"
                        ? "text-[#FFC60B] hover:text-[#FFC60B]/80 font-semibold"
                        : activeSection === item.section
                        ? "text-foreground font-medium"
                        : "text-muted hover:text-foreground font-normal"
                    } ${item.bold && item.label !== "BEATS" ? "font-medium" : ""}`}
                    style={
                      item.label === "BEATS"
                        ? { fontFamily: "Subway Berlin OT, sans-serif" }
                        : {}
                    }
                  >
                    {item.label}
                  </a>
                  {activeSection === item.section && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                      <div className="w-full h-full bg-foreground rounded-full" />
                      {browserOpts.reduceBlur ? (
                        /* Firefox optimized - box-shadow instead of blur */
                        <div className="absolute inset-0 bg-foreground rounded-full" style={{
                          boxShadow: '0 0 4px rgba(250, 250, 250, 0.4)',
                          transform: 'translateZ(0)'
                        }} />
                      ) : !browserOpts.limitGlowLayers && (
                        <div className="absolute inset-0 bg-foreground rounded-full blur-sm" style={{ transform: 'translateZ(0)' }} />
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="relative group">
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      if (pathname === '/') {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        window.location.href = '/#contact';
                      }
                    }, 100);
                  }}
                  className="block relative overflow-hidden rounded-md font-medium text-center uppercase text-small transition-all duration-300 cursor-pointer tracking-[0.08em]"
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(185, 28, 28, 0.95) 100%)',
                    border: '1px solid rgba(220, 38, 38, 0.6)',
                    color: 'rgba(255, 255, 255, 0.98)',
                    boxShadow: '0 4px 20px -4px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 38, 38, 1) 0%, rgba(185, 28, 28, 1) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.8)';
                    e.currentTarget.style.boxShadow = '0 6px 24px -4px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(185, 28, 28, 0.95) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.6)';
                    e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Order
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
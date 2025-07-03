"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useActiveSection } from "../hooks/useActiveSection";
import { motion } from "motion/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const menuItems = [
    { label: "Home", href: "/", section: "home" },
    { label: "Work", href: "/#work", section: "work" },
    { label: "BEATS", href: "/beats", section: "beats", bold: true },
    { label: "About", href: "/#about", section: "about" },
    { label: "Contact", href: "/#contact", section: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50" style={{ transform: 'translateZ(0)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Logo
              className="mt-2" // ← Add manual positioning
              size="small"
              glowIntensity="subtle"
            />
            <span className="text-foreground font-semibold text-lg hidden sm:block uppercase">
              KEY0N
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative">
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 uppercase text-small ${
                    item.label === "BEATS"
                      ? "text-[#FFC60B] hover:text-[#FFC60B]/80 font-bold"
                      : activeSection === item.section
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  } ${item.bold && item.label !== "BEATS" ? "font-bold" : ""}`}
                  style={
                    item.label === "BEATS"
                      ? { fontFamily: "Subway Berlin OT, sans-serif" }
                      : {}
                  }
                >
                  {item.label}
                </Link>
                {activeSection === item.section && (
                  <motion.div
                    className="absolute -bottom-5 left-0 right-0 h-[2px]"
                    layoutId={item.section === "home" ? undefined : "navGlow"}
                    initial={item.section === "home" ? { opacity: 0, scaleX: 0 } : false}
                    animate={item.section === "home" ? { opacity: 1, scaleX: 1 } : undefined}
                    exit={item.section === "home" ? { opacity: 0, scaleX: 0 } : undefined}
                    transition={
                      item.section === "home"
                        ? {
                            opacity: { duration: 0.2 },
                            scaleX: { duration: 0.3, ease: "easeOut" }
                          }
                        : {
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }
                    }
                  >
                    <div className="w-full h-full bg-foreground rounded-full" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                    <div className="absolute inset-0 bg-foreground rounded-full blur-md opacity-50" />
                  </motion.div>
                )}
              </div>
            ))}
            <div className="relative group">
              <Link
                href="/#contact"
                className="border-2 text-background border-zinc-800 bg-foreground hover:bg-transparent hover:text-foreground px-6 py-2 transition-all duration-300 font-medium uppercase text-small rounded-sm relative z-10"
              >
                Order
              </Link>
              <div className="absolute inset-0 rounded-sm group-hover:opacity-0 transition-opacity duration-300">
                <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
              </div>
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
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block transition-colors duration-200 uppercase text-small pb-2 ${
                      item.label === "BEATS"
                        ? "text-[#FFC60B] hover:text-[#FFC60B]/80 font-bold"
                        : activeSection === item.section
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    } ${item.bold && item.label !== "BEATS" ? "font-bold" : ""}`}
                    style={
                      item.label === "BEATS"
                        ? { fontFamily: "Subway Berlin OT, sans-serif" }
                        : {}
                    }
                  >
                    {item.label}
                  </Link>
                  {activeSection === item.section && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                      <div className="w-full h-full bg-foreground rounded-full" />
                      <div className="absolute inset-0 bg-foreground rounded-full blur-sm" />
                    </div>
                  )}
                </div>
              ))}
              <div className="relative group">
                <Link
                  href="/#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block border-2 border-zinc-800 text-foreground hover:bg-foreground hover:text-background px-6 py-2 transition-all duration-300 font-medium text-center uppercase text-small rounded-sm relative z-10"
                >
                  Order
                </Link>
                <div className="absolute inset-0 rounded-sm group-hover:opacity-0 transition-opacity duration-300">
                  <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                  <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                  <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

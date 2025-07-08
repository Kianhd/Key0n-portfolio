"use client";

import { useEffect, useState } from "react";
import { getBrowserOptimizations, isFirefox, isSafari } from "@/lib/browser-detect";

export default function BrowserTestPage() {
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  
  useEffect(() => {
    setBrowserInfo({
      isFirefox: isFirefox(),
      isSafari: isSafari(),
      optimizations: getBrowserOptimizations(),
      userAgent: navigator.userAgent
    });
  }, []);
  
  if (!browserInfo) return <div>Loading...</div>;
  
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-8">Browser Performance Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 border border-border rounded">
          <h2 className="text-xl font-semibold mb-2">Browser Detection</h2>
          <p>Is Firefox: <span className="font-mono">{String(browserInfo.isFirefox)}</span></p>
          <p>Is Safari: <span className="font-mono">{String(browserInfo.isSafari)}</span></p>
          <p className="text-sm text-muted mt-2">User Agent: {browserInfo.userAgent}</p>
        </div>
        
        <div className="p-4 border border-border rounded">
          <h2 className="text-xl font-semibold mb-2">Active Optimizations</h2>
          <ul className="space-y-1">
            {Object.entries(browserInfo.optimizations).map(([key, value]) => (
              <li key={key}>
                <span className="font-mono">{key}:</span> {String(value)}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border border-border rounded">
          <h2 className="text-xl font-semibold mb-4">Test Elements</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Blur Effect Test</h3>
              <div className="relative p-8 bg-card rounded">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50" 
                     style={{ filter: browserInfo.optimizations.reduceBlur ? 'blur(10px)' : 'blur(40px)' }}>
                </div>
                <p className="relative z-10">This element has {browserInfo.optimizations.reduceBlur ? 'reduced' : 'normal'} blur</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Backdrop Filter Test</h3>
              <div className={`p-4 bg-white/10 rounded ${browserInfo.optimizations.disableBackdropFilter ? '' : 'backdrop-blur-md'}`}>
                <p>Backdrop filter is {browserInfo.optimizations.disableBackdropFilter ? 'disabled' : 'enabled'}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Safari Filter Stacking Test</h3>
              <div className="space-y-2">
                <div 
                  className={`p-4 rounded ${
                    browserInfo.optimizations.disableFilterStacking 
                      ? 'filter brightness-0 invert bg-gray-500' 
                      : 'filter brightness-0 invert drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)] bg-gray-500'
                  }`}
                >
                  <p>Filter stacking is {browserInfo.optimizations.disableFilterStacking ? 'disabled (Safari)' : 'enabled'}</p>
                </div>
                <p className="text-sm text-muted">Safari users see simplified filters to prevent hover glitches</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Safari Glow Effects Test</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded">
                  <h4 className="text-sm font-medium mb-2">Logo Glow (Multiple Layers)</h4>
                  <div className="relative w-20 h-20 mx-auto">
                    {browserInfo.optimizations.limitGlowLayers ? (
                      // Safari: Single optimized glow
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
                          filter: "blur(8px)",
                          transform: "scale(2) translateZ(0)"
                        }}
                      />
                    ) : (
                      // Other browsers: Multiple glow layers
                      <>
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                            filter: "blur(40px)",
                            transform: "scale(2.5)"
                          }}
                        />
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)",
                            filter: "blur(20px)",
                            transform: "scale(1.8)"
                          }}
                        />
                      </>
                    )}
                    <div className="relative z-10 w-full h-full bg-white rounded-full flex items-center justify-center text-black font-bold">LOGO</div>
                  </div>
                  <p className="text-xs text-muted mt-2 text-center">
                    {browserInfo.optimizations.limitGlowLayers ? 'Single glow (Safari)' : 'Multiple glow layers'}
                  </p>
                </div>
                
                <div className="p-4 bg-card rounded">
                  <h4 className="text-sm font-medium mb-2">Backdrop Filter Test</h4>
                  <div className="relative h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded overflow-hidden">
                    <div className={`absolute inset-4 ${browserInfo.optimizations.disableSafariBackdrop ? 'bg-black/85' : 'bg-black/40 backdrop-blur-xl'} rounded flex items-center justify-center text-white`}>
                      Backdrop Effect
                    </div>
                  </div>
                  <p className="text-xs text-muted mt-2">
                    {browserInfo.optimizations.disableSafariBackdrop ? 'Solid background (Safari)' : 'Backdrop blur enabled'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
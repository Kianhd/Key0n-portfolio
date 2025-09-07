'use client';

import dynamic from 'next/dynamic';

const FluidGlass = dynamic(() => import('../components/FluidGlass'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center">
      <p className="text-muted-foreground">Loading 3D scene...</p>
    </div>
  ),
});

export default function FluidGlassDemo() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-center text-4xl font-bold">FluidGlass Component Demo</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Lens Mode</h2>
            <div className="relative h-[600px] overflow-hidden rounded-lg border border-border bg-black/50">
              <FluidGlass 
                mode="lens"
                lensProps={{
                  scale: 0.25,
                  ior: 1.15,
                  thickness: 5,
                  chromaticAberration: 0.1,
                  anisotropy: 0.01  
                }}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Bar Mode with Navigation</h2>
            <div className="relative h-[600px] overflow-hidden rounded-lg border border-border bg-black/50">
              <FluidGlass 
                mode="bar"
                barProps={{
                  navItems: [
                    { label: 'Home', link: '#home' },
                    { label: 'Work', link: '#work' },
                    { label: 'Services', link: '#services' },
                    { label: 'Contact', link: '#contact' }
                  ]
                }}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Cube Mode</h2>
            <div className="relative h-[600px] overflow-hidden rounded-lg border border-border bg-black/50">
              <FluidGlass 
                mode="cube"
                cubeProps={{
                  scale: 0.3,
                  ior: 1.2,
                  thickness: 8,
                  chromaticAberration: 0.15,
                  anisotropy: 0.02
                }}
              />
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-lg border border-border bg-muted/20 p-6">
          <h3 className="mb-2 text-lg font-semibold">Note: 3D Models Required</h3>
          <p className="text-muted-foreground">
            To see the full effect, you need to add the following 3D model files to <code className="rounded bg-muted px-1">public/assets/3d/</code>:
          </p>
          <ul className="mt-2 list-inside list-disc text-muted-foreground">
            <li>lens.glb</li>
            <li>bar.glb</li>
            <li>cube.glb</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            You can download example models from the React Bits repository or create your own using Blender or Spline.
          </p>
        </div>
      </div>
    </div>
  );
}
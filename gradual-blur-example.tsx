// Example usage of GradualBlur component
// Component added by Ansh - github.com/ansh-dhanani

import GradualBlur from '@/components/ui/gradual-blur';

// Example 1: Basic usage with bottom blur
export function ExampleBasic() {
  return (
    <section style={{ position: 'relative', height: 500, overflow: 'hidden' }}>
      <div style={{ height: '100%', overflowY: 'auto', padding: '6rem 2rem' }}>
        {/* Content Here - such as an image or text */}
        <h2>Your content goes here</h2>
        <p>This content will have a gradual blur at the bottom</p>
      </div>

      <GradualBlur
        target="parent"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </section>
  );
}

// Example 2: Subtle edge blur for video carousels
export function ExampleVideoCarousel() {
  return (
    <div className="relative w-full">
      {/* Your video carousel component */}
      <div className="aspect-video bg-gray-900">
        Video content here
      </div>
      
      {/* Left edge blur */}
      <GradualBlur
        target="parent"
        position="left"
        height="3rem"
        strength={1}
        divCount={3}
        curve="bezier"
        exponential={false}
        opacity={0.6}
      />
      
      {/* Right edge blur */}
      <GradualBlur
        target="parent"
        position="right"
        height="3rem"
        strength={1}
        divCount={3}
        curve="bezier"
        exponential={false}
        opacity={0.6}
      />
    </div>
  );
}

// Example 3: Top and bottom blur for sections
export function ExampleSection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Top blur */}
      <GradualBlur
        target="parent"
        position="top"
        height="4rem"
        strength={1.5}
        divCount={4}
        curve="ease-out"
        exponential={false}
        opacity={0.5}
      />
      
      {/* Your section content */}
      <div className="relative z-10">
        <h2>Section Title</h2>
        <p>Section content with gradual blur effects at top and bottom</p>
      </div>
      
      {/* Bottom blur */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="4rem"
        strength={1.5}
        divCount={4}
        curve="ease-out"
        exponential={false}
        opacity={0.5}
      />
    </section>
  );
}

// Example 4: Using presets
export function ExampleWithPresets() {
  return (
    <div className="relative">
      <div className="p-8">
        Content with subtle preset blur
      </div>
      
      {/* Using the 'subtle' preset */}
      <GradualBlur
        preset="subtle"
        target="parent"
        position="bottom"
      />
    </div>
  );
}
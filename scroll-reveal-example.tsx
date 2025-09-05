// Example usage of ScrollReveal component

import ScrollReveal from '@/components/ui/scroll-reveal';

// Example 1: Basic usage with default settings
export function ExampleBasic() {
  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={5}
      blurStrength={10}
    >
      When does a man die? When he is hit by a bullet? No! When he suffers a disease?
      No! When he ate a soup made out of a poisonous mushroom?
      No! A man dies when he is forgotten!
    </ScrollReveal>
  );
}

// Example 2: Subtle reveal for headings
export function ExampleHeading() {
  return (
    <ScrollReveal
      baseOpacity={0.2}
      enableBlur={true}
      baseRotation={2}
      blurStrength={5}
      textClassName="text-6xl font-bold"
    >
      Crafting Sound Identities
    </ScrollReveal>
  );
}

// Example 3: No blur, just fade and rotation
export function ExampleFadeOnly() {
  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={false}
      baseRotation={3}
      containerClassName="text-center"
      textClassName="text-4xl"
    >
      Premium Audio Production
    </ScrollReveal>
  );
}

// Example 4: Custom animation endpoints
export function ExampleCustomTiming() {
  return (
    <ScrollReveal
      baseOpacity={0.1}
      enableBlur={true}
      baseRotation={4}
      blurStrength={8}
      rotationEnd="center center" // Rotation completes when center of element reaches center of viewport
      wordAnimationEnd="top center" // Words fully reveal when top reaches center
    >
      Transforming brands through the power of sound
    </ScrollReveal>
  );
}

// Example 5: Integration in a section
export function ExampleInSection() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="mb-8"
        >
          Creating Unforgettable Audio Experiences
        </ScrollReveal>
        
        <ScrollReveal
          baseOpacity={0.2}
          enableBlur={true}
          baseRotation={3}
          blurStrength={6}
          textClassName="text-2xl text-muted"
        >
          From commercial soundtracks to hip-hop beats, I craft unique sonic identities
          that resonate with audiences and elevate brands.
        </ScrollReveal>
      </div>
    </section>
  );
}
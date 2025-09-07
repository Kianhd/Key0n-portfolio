/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useFBO, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { easing } from 'maath';

interface FluidGlassNavProps {
  scale?: number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  transmission?: number;
  roughness?: number;
}

export default function FluidGlassNav({
  scale = 0.2,
  ior = 1.5,
  thickness = 4,
  chromaticAberration = 0.28,
  anisotropy = 0.1,
  transmission = 0.1,
  roughness = 0.2,
}: FluidGlassNavProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 25 }} 
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.2} />
          <GlassBar
            scale={scale}
            ior={ior}
            thickness={thickness}
            chromaticAberration={chromaticAberration}
            anisotropy={anisotropy}
            transmission={transmission}
            roughness={roughness}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

const GlassBar = memo(function GlassBar({
  scale = 0.2,
  ior = 1.5,
  thickness = 4,
  chromaticAberration = 0.28,
  anisotropy = 0.1,
  transmission = 0.1,
  roughness = 0.2,
}: FluidGlassNavProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const buffer = useFBO();
  const { viewport } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { gl, camera, pointer } = state;
    
    // Subtle mouse following effect
    const destX = pointer.x * 0.1;
    const destY = pointer.y * 0.05;
    easing.damp3(ref.current.position, [destX, destY, 0], 0.25, delta);
    
    // Subtle rotation based on mouse position
    easing.damp3(
      ref.current.rotation, 
      [pointer.y * 0.02, pointer.x * 0.02, 0], 
      0.25, 
      delta
    );

    // Render to buffer
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {/* Background plane that captures the scene */}
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, -0.1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Glass bar mesh */}
      <mesh ref={ref} scale={[viewport.width * 1.2, scale, scale]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior}
          thickness={thickness}
          anisotropy={anisotropy}
          chromaticAberration={chromaticAberration}
          transmission={transmission}
          roughness={roughness}
          color="#000000"
          attenuationColor="#111111"
          attenuationDistance={0.2}
          distortion={0.05}
          distortionScale={0.05}
          temporalDistortion={0.02}
        />
      </mesh>
    </>
  );
});
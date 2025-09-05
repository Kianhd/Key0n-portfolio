"use client";

import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

type Offset = { x?: number | string; y?: number | string };
type AnimationType = 'rotate' | 'rotate3d' | 'hover';

export type PrismaticBurstProps = {
  intensity?: number;
  speed?: number;
  animationType?: AnimationType;
  colors?: string[];
  distort?: number;
  paused?: boolean;
  offset?: Offset;
  hoverDampness?: number;
  rayCount?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'] | 'none';
  quality?: 'low' | 'medium' | 'high' | 'ultra';
};

const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Optimized fragment shader with reduced iterations and simplified calculations
const createFragmentShader = (iterations: number = 20) => `#version 300 es
precision mediump float;
precision mediump int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

// Simplified hash function
float hash21(vec2 p){
    p = floor(p);
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Simplified noise - removed multiple octaves
float simpleNoise(vec2 fragPx){
    vec2 p = fragPx * 0.01 + vec2(uTime * 20.0, -uTime * 15.0);
    return hash21(p);
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

// Simplified edge fade
float edgeFade(vec2 frag, vec2 res){
    vec2 uv = frag / res;
    vec2 fade = smoothstep(0.0, 0.1, uv) * smoothstep(1.0, 0.9, uv);
    return fade.x * fade.y;
}

mat3 rotY(float a){ 
    float c = cos(a), s = sin(a); 
    return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); 
}
mat3 rotX(float a){ 
    float c = cos(a), s = sin(a); 
    return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); 
}

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

// Simplified bend calculation - removed multiple sin/cos calls
float simpleBend(vec3 q, float t){
    return sin(q.x * 0.5 + t * 0.5) * 0.8;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = simpleNoise(frag);
    
    // Simplified distortion
    float amp = clamp(uDistort * 0.1, 0.0, 2.0);
    
    // Pre-calculate rotation matrix once
    mat3 rotMat = mat3(1.0);
    if(uAnimType == 2){
        vec2 m = uMouse * 2.0 - 1.0;
        rotMat = rotY(m.x * 0.3) * rotX(m.y * 0.3);
    } else if(uAnimType == 1){
        rotMat = rotY(t * 0.2) * rotX(t * 0.15);
    }
    
    // Reduced iterations - dynamic based on quality
    for (int i = 0; i < ${iterations}; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        
        // Early termination
        if (rad > 5.0) break;
        
        vec3 Pl = P * (10.0 / max(rad, 0.1));
        
        // Apply rotation
        if(uAnimType > 0){
            Pl = rotMat * Pl;
        }
        
        // Simplified step calculation
        float stepLen = 0.15 + n * 0.05;
        
        // Simplified bending - only one calculation
        if (amp > 0.01) {
            float bend = amp * simpleBend(Pl, t);
            Pl.xy += vec2(bend);
        }
        
        // Simplified ray pattern
        float rayPattern = smoothstep(0.3, 0.8, 
            sin(Pl.x * 2.0 + t) * sin(Pl.z * 2.0)
        );
        
        // Apply ray count if specified
        if (uRayCount > 0) {
            float ang = atan(Pl.y, Pl.x);
            float rays = sin(float(uRayCount) * ang);
            rayPattern *= smoothstep(-0.1, 0.1, rays);
        }
        
        // Color sampling
        vec3 spectral;
        if (uColorCount > 0) {
            float gradT = fract(marchT * 0.3);
            spectral = sampleGradient(gradT) * 2.0;
        } else {
            spectral = vec3(1.0, 0.8, 0.6);
        }
        
        // Accumulate color with distance falloff
        float falloff = 0.08 / (0.5 + rad);
        col += spectral * rayPattern * falloff;
        
        marchT += stepLen;
    }
    
    // Apply edge fade and intensity
    col *= edgeFade(frag, uResolution);
    col *= uIntensity;
    
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const hexToRgb01 = (hex: string): [number, number, number] => {
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) {
    const r = h[0], g = h[1], b = h[2];
    h = r + r + g + g + b + b;
  }
  const intVal = parseInt(h, 16);
  if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];
  const r = ((intVal >> 16) & 255) / 255;
  const g = ((intVal >> 8) & 255) / 255;
  const b = (intVal & 255) / 255;
  return [r, g, b];
};

const toPx = (v: number | string | undefined): number => {
  if (v == null) return 0;
  if (typeof v === 'number') return v;
  const s = String(v).trim();
  const num = parseFloat(s.replace('px', ''));
  return isNaN(num) ? 0 : num;
};

const PrismaticBurstOptimized = ({
  intensity = 2,
  speed = 0.5,
  animationType = 'rotate3d',
  colors,
  distort = 0,
  paused = false,
  offset = { x: 0, y: 0 },
  hoverDampness = 0,
  rayCount,
  mixBlendMode = 'lighten',
  quality = 'medium'
}: PrismaticBurstProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<Program | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseTargetRef = useRef<[number, number]>([0.5, 0.5]);
  const mouseSmoothRef = useRef<[number, number]>([0.5, 0.5]);
  const pausedRef = useRef<boolean>(paused);
  const gradTexRef = useRef<Texture | null>(null);
  const hoverDampRef = useRef<number>(hoverDampness);
  const isVisibleRef = useRef<boolean>(true);
  const meshRef = useRef<Mesh | null>(null);
  const triRef = useRef<Triangle | null>(null);
  const frameSkipRef = useRef<number>(0);
  const lastMouseUpdateRef = useRef<number>(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  
  useEffect(() => {
    hoverDampRef.current = hoverDampness;
  }, [hoverDampness]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Quality-based settings
    const qualitySettings = {
      low: { dpr: 0.5, iterations: 12, skipFrames: 2 },
      medium: { dpr: 0.75, iterations: 20, skipFrames: 1 },
      high: { dpr: 1, iterations: 30, skipFrames: 0 },
      ultra: { dpr: Math.min(window.devicePixelRatio || 1, 2), iterations: 44, skipFrames: 0 }
    };

    const settings = qualitySettings[quality];
    
    // Adaptive DPR based on quality
    const dpr = settings.dpr;
    const renderer = new Renderer({ dpr, alpha: false, antialias: false });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.inset = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';
    gl.canvas.style.imageRendering = quality === 'low' ? 'pixelated' : 'auto';
    container.appendChild(gl.canvas);

    const white = new Uint8Array([255, 255, 255, 255]);
    const gradientTex = new Texture(gl, {
      image: white,
      width: 1,
      height: 1,
      generateMipmaps: false,
      flipY: false
    });

    gradientTex.minFilter = gl.LINEAR;
    gradientTex.magFilter = gl.LINEAR;
    gradientTex.wrapS = gl.CLAMP_TO_EDGE;
    gradientTex.wrapT = gl.CLAMP_TO_EDGE;
    gradTexRef.current = gradientTex;

    // Use optimized shader with quality-based iterations
    const fragmentShader = createFragmentShader(settings.iterations);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uResolution: { value: [1, 1] as [number, number] },
        uTime: { value: 0 },
        uIntensity: { value: 1 },
        uSpeed: { value: 1 },
        uAnimType: { value: 0 },
        uMouse: { value: [0.5, 0.5] as [number, number] },
        uColorCount: { value: 0 },
        uDistort: { value: 0 },
        uOffset: { value: [0, 0] as [number, number] },
        uGradient: { value: gradientTex },
        uNoiseAmount: { value: 0.8 },
        uRayCount: { value: 0 }
      }
    });

    programRef.current = program;

    const triangle = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry: triangle, program });
    triRef.current = triangle;
    meshRef.current = mesh;

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(resize);
      ro.observe(container);
    } else {
      (window as Window).addEventListener('resize', resize);
    }
    resize();

    // Throttled mouse handler - only update every 32ms (30fps) for hover
    const onPointer = (e: PointerEvent) => {
      if (animationType !== 'hover') return;
      
      const now = performance.now();
      if (now - lastMouseUpdateRef.current < 32) return;
      lastMouseUpdateRef.current = now;
      
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
      mouseTargetRef.current = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];
    };
    
    container.addEventListener('pointermove', onPointer, { passive: true });

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        entries => {
          if (entries[0]) isVisibleRef.current = entries[0].isIntersecting;
        },
        { root: null, threshold: 0.01 }
      );
      io.observe(container);
    }

    let raf = 0;
    let last = performance.now();
    let accumTime = 0;
    let frameCount = 0;

    const update = (now: number) => {
      const dt = Math.max(0, now - last) * 0.001;
      last = now;
      
      const visible = isVisibleRef.current && !document.hidden;
      if (!pausedRef.current) accumTime += dt;
      
      if (!visible) {
        raf = requestAnimationFrame(update);
        return;
      }

      // Frame skipping for low quality
      frameCount++;
      if (settings.skipFrames > 0 && frameCount % (settings.skipFrames + 1) !== 0) {
        raf = requestAnimationFrame(update);
        return;
      }

      // Smoother but less frequent mouse updates
      const tau = 0.08 + Math.max(0, Math.min(1, hoverDampRef.current)) * 0.5;
      const alpha = 1 - Math.exp(-dt / tau);
      const tgt = mouseTargetRef.current;
      const sm = mouseSmoothRef.current;
      
      // Only update mouse if it changed significantly
      const mouseDelta = Math.abs(tgt[0] - sm[0]) + Math.abs(tgt[1] - sm[1]);
      if (mouseDelta > 0.001) {
        sm[0] += (tgt[0] - sm[0]) * alpha;
        sm[1] += (tgt[1] - sm[1]) * alpha;
        program.uniforms.uMouse.value = sm as any;
      }
      
      program.uniforms.uTime.value = accumTime;
      renderer.render({ scene: meshRef.current! });
      raf = requestAnimationFrame(update);
    };
    
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointermove', onPointer);
      ro?.disconnect();
      if (!ro) window.removeEventListener('resize', resize);
      io?.disconnect();
      try {
        container.removeChild(gl.canvas);
      } catch (e) {
        void e;
      }
      meshRef.current = null;
      triRef.current = null;
      programRef.current = null;
      try {
        const glCtx = rendererRef.current?.gl;
        if (glCtx && gradTexRef.current?.texture) glCtx.deleteTexture(gradTexRef.current.texture);
      } catch (e) {
        void e;
      }
      rendererRef.current = null;
      gradTexRef.current = null;
    };
  }, [quality, animationType]);

  useEffect(() => {
    const canvas = rendererRef.current?.gl?.canvas as HTMLCanvasElement | undefined;
    if (canvas) {
      canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';
    }
  }, [mixBlendMode]);

  useEffect(() => {
    const program = programRef.current;
    const renderer = rendererRef.current;
    const gradTex = gradTexRef.current;
    if (!program || !renderer || !gradTex) return;

    program.uniforms.uIntensity.value = intensity ?? 1;
    program.uniforms.uSpeed.value = speed ?? 1;

    const animTypeMap: Record<AnimationType, number> = {
      rotate: 0,
      rotate3d: 1,
      hover: 2
    };
    program.uniforms.uAnimType.value = animTypeMap[animationType ?? 'rotate'];
    
    // Clamp distort value for better performance
    program.uniforms.uDistort.value = Math.min(typeof distort === 'number' ? distort : 0, 2.0);

    const ox = toPx(offset?.x);
    const oy = toPx(offset?.y);
    program.uniforms.uOffset.value = [ox, oy];
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));

    let count = 0;
    if (Array.isArray(colors) && colors.length > 0) {
      const gl = renderer.gl;
      const capped = colors.slice(0, 64);
      count = capped.length;
      const data = new Uint8Array(count * 4);
      for (let i = 0; i < count; i++) {
        const [r, g, b] = hexToRgb01(capped[i]);
        data[i * 4 + 0] = Math.round(r * 255);
        data[i * 4 + 1] = Math.round(g * 255);
        data[i * 4 + 2] = Math.round(b * 255);
        data[i * 4 + 3] = 255;
      }
      gradTex.image = data;
      gradTex.width = count;
      gradTex.height = 1;
      gradTex.minFilter = gl.LINEAR;
      gradTex.magFilter = gl.LINEAR;
      gradTex.wrapS = gl.CLAMP_TO_EDGE;
      gradTex.wrapT = gl.CLAMP_TO_EDGE;
      gradTex.flipY = false;
      gradTex.generateMipmaps = false;
      gradTex.format = gl.RGBA;
      gradTex.type = gl.UNSIGNED_BYTE;
      gradTex.needsUpdate = true;
    } else {
      count = 0;
    }
    program.uniforms.uColorCount.value = count;
  }, [intensity, speed, animationType, colors, distort, offset, rayCount]);

  return <div className="w-full h-full relative overflow-hidden" ref={containerRef} />;
};

export default PrismaticBurstOptimized;
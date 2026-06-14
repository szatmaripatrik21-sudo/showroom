/**
 * HeroAnimation — animated background component
 *
 * HOW TO USE YOUR CUSTOM ANIMATION:
 * 1. Replace the entire content of this file with your animation code.
 * 2. Make sure the component renders a full-screen element (position: absolute, inset: 0).
 * 3. The HeroSection will render your text content on top via z-index.
 *
 * The default below uses the WebGL shader from /components/ui/animated-shader-hero.tsx.
 * Swap it out for any canvas, Three.js, Lottie, or CSS animation you prefer.
 */

import { useRef, useEffect } from 'react'

// ─── PASTE YOUR ANIMATION CODE BELOW THIS LINE ───────────────────────────────

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}
float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  // Slight +0.6 offset nudges warmth right so the brightest point avoids left text column
  float bg=clouds(vec2(st.x+0.6+T*.4,-st.y));
  uv*=1.-.3*(sin(T*.15)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.4+.1*uv.x);
    vec2 p=uv;float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`

// ─── PASTE YOUR ANIMATION CODE ABOVE THIS LINE ───────────────────────────────

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2')
    if (!gl) return

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const vertSrc = `#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}`
    const vs = gl.createShader(gl.VERTEX_SHADER)!
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(vs, vertSrc)
    gl.compileShader(vs)
    gl.shaderSource(fs, defaultShaderSource)
    gl.compileShader(fs)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'resolution')
    const uTime = gl.getUniformLocation(program, 'time')

    // Draws a single frame at the given time (seconds).
    const renderFrame = (timeSeconds: number) => {
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, timeSeconds)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    // Respect prefers-reduced-motion at the JS level: pause the shader entirely.
    // We still paint ONE static frame so the hero keeps its atmospheric backdrop,
    // but the rAF loop never starts — no ongoing motion.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resizeAndMaybeRepaint = () => {
      resize()
      if (prefersReducedMotion) renderFrame(0) // keep the paused frame correct after resize
    }

    resizeAndMaybeRepaint()
    window.addEventListener('resize', resizeAndMaybeRepaint)

    if (prefersReducedMotion) {
      renderFrame(0) // paused: one frame, no loop
    } else {
      const loop = (now: number) => {
        renderFrame(now * 1e-3)
        rafRef.current = requestAnimationFrame(loop)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resizeAndMaybeRepaint)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  // Hero layer stack (bottom → top), enforced with explicit z-index:
  //   0  — this shader canvas              (z-0)
  //   10 — dark gradient overlays          (HeroSection)
  //   20 — content container (text, CTAs)  (HeroSection)  ← always above the shader
  //   50 — fixed Navbar (outside hero)
  // The text container (z-20) is strictly above this canvas (z-0) at all times.
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full touch-none"
      style={{ background: '#0a0908' }}
    />
  )
}

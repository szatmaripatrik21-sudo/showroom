import React, { useRef, useEffect } from 'react'

interface HeroProps {
  trustBadge?: { text: string; icons?: string[] }
  headline: { line1: string; line2: string }
  subtitle: string
  buttons?: {
    primary?: { text: string; onClick?: () => void }
    secondary?: { text: string; onClick?: () => void }
  }
  className?: string
}

const SHADER_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 move;
uniform vec2 touch;
uniform int pointerCount;
uniform vec2 pointers;
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
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`

const VERT_SOURCE = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

class ShaderRenderer {
  private canvas: HTMLCanvasElement
  private gl: WebGL2RenderingContext
  private program: WebGLProgram | null = null
  private vs: WebGLShader | null = null
  private fs: WebGLShader | null = null
  private buffer: WebGLBuffer | null = null
  private uRes: WebGLUniformLocation | null = null
  private uTime: WebGLUniformLocation | null = null
  private uMove: WebGLUniformLocation | null = null
  private uTouch: WebGLUniformLocation | null = null
  private uPointerCount: WebGLUniformLocation | null = null
  private uPointers: WebGLUniformLocation | null = null
  mouseMove = [0, 0]
  mouseCoords = [0, 0]
  pointerCoords = [0, 0]
  nbrOfPointers = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext
  }

  setup() {
    const gl = this.gl
    this.vs = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
    this.fs = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
    gl.shaderSource(this.vs, VERT_SOURCE); gl.compileShader(this.vs)
    gl.shaderSource(this.fs, SHADER_SOURCE); gl.compileShader(this.fs)
    this.program = gl.createProgram() as WebGLProgram
    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)
  }

  init() {
    const gl = this.gl
    const prog = this.program as WebGLProgram
    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    this.uRes = gl.getUniformLocation(prog, 'resolution')
    this.uTime = gl.getUniformLocation(prog, 'time')
    this.uMove = gl.getUniformLocation(prog, 'move')
    this.uTouch = gl.getUniformLocation(prog, 'touch')
    this.uPointerCount = gl.getUniformLocation(prog, 'pointerCount')
    this.uPointers = gl.getUniformLocation(prog, 'pointers')
  }

  resize(dpr: number) {
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  render(now: number) {
    const gl = this.gl
    gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(this.program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.uniform2f(this.uRes, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.uTime, now * 1e-3)
    gl.uniform2f(this.uMove, this.mouseMove[0], this.mouseMove[1])
    gl.uniform2f(this.uTouch, this.mouseCoords[0], this.mouseCoords[1])
    gl.uniform1i(this.uPointerCount, this.nbrOfPointers)
    gl.uniform2fv(this.uPointers, this.pointerCoords)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  destroy() {
    const gl = this.gl
    if (this.program) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs) }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs) }
      gl.deleteProgram(this.program)
    }
  }
}

class PointerTracker {
  private active = false
  private pointers = new Map<number, [number, number]>()
  private lastCoords: [number, number] = [0, 0]
  private scaleFn: () => number
  moves = [0, 0]

  constructor(element: HTMLCanvasElement, scaleFn: () => number) {
    this.scaleFn = scaleFn
    const map = (x: number, y: number): [number, number] =>
      [x * this.scaleFn(), element.height - y * this.scaleFn()]

    element.addEventListener('pointerdown', (e) => {
      this.active = true
      this.pointers.set(e.pointerId, map(e.clientX, e.clientY))
    })
    element.addEventListener('pointerup', (e) => {
      if (this.count === 1) this.lastCoords = this.first
      this.pointers.delete(e.pointerId)
      this.active = this.pointers.size > 0
    })
    element.addEventListener('pointerleave', (e) => {
      if (this.count === 1) this.lastCoords = this.first
      this.pointers.delete(e.pointerId)
      this.active = this.pointers.size > 0
    })
    element.addEventListener('pointermove', (e) => {
      if (!this.active) return
      this.lastCoords = [e.clientX, e.clientY]
      this.pointers.set(e.pointerId, map(e.clientX, e.clientY))
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY]
    })
  }

  get count() { return this.pointers.size }
  get coords(): number[] { return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0] }
  get first(): [number, number] { return this.pointers.values().next().value ?? this.lastCoords }
}

const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const rendererRef = useRef<ShaderRenderer | null>(null)
  const trackerRef = useRef<PointerTracker | null>(null)
  const dprRef = useRef<number>(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    dprRef.current = Math.max(1, 0.5 * window.devicePixelRatio)
    const renderer = new ShaderRenderer(canvas)
    const tracker = new PointerTracker(canvas, () => dprRef.current)
    rendererRef.current = renderer
    trackerRef.current = tracker

    renderer.setup()
    renderer.init()
    renderer.resize(dprRef.current)

    const resize = () => {
      dprRef.current = Math.max(1, 0.5 * window.devicePixelRatio)
      renderer.resize(dprRef.current)
    }

    const loop = (now: number) => {
      if (!rendererRef.current || !trackerRef.current) return
      renderer.mouseCoords = trackerRef.current.first
      renderer.nbrOfPointers = trackerRef.current.count
      renderer.pointerCoords = trackerRef.current.coords
      renderer.mouseMove = trackerRef.current.moves
      renderer.render(now)
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
      renderer.destroy()
    }
  }, [])

  return canvasRef
}

const Hero: React.FC<HeroProps> = ({ trustBadge, headline, subtitle, buttons, className = '' }) => {
  const canvasRef = useShaderBackground()
  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none" style={{ background: 'black' }} />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {trustBadge && (
          <div className="mb-8 animate-fade-in-down">
            <div className="flex items-center gap-2 px-6 py-3 bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm">
              {trustBadge.icons?.map((icon, i) => <span key={i}>{icon}</span>)}
              <span className="text-orange-100">{trustBadge.text}</span>
            </div>
          </div>
        )}
        <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">{headline.line1}</h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">{headline.line2}</h1>
          </div>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-orange-100/90 font-light leading-relaxed animate-fade-in-up animation-delay-600">{subtitle}</p>
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up animation-delay-800">
              {buttons.primary && <button onClick={buttons.primary.onClick} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105">{buttons.primary.text}</button>}
              {buttons.secondary && <button onClick={buttons.secondary.onClick} className="px-8 py-4 bg-orange-500/10 border border-orange-300/30 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">{buttons.secondary.text}</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero

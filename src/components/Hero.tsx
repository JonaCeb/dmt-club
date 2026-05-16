import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const COLORS = ['#39ff14', '#00f5ff', '#bf00ff', '#ffffff'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (x: number, y: number) => {
      const count = 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.8;
        particles.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: 1 + Math.random() * 2.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0.8,
          life: 0,
          maxLife: 120 + Math.random() * 80,
        });
      }
    };

    // ambient spawn
    const ambientInterval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = canvas.height * 0.4 + Math.random() * canvas.height * 0.6;
      spawnParticle(x, y);
    }, 60);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (Math.random() < 0.4) spawnParticle(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // mouse attraction effect — draw faint line to nearby particles
      particles.current = particles.current.filter(p => p.life < p.maxLife);

      for (const p of particles.current) {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx / dist * 0.03;
          p.vy += dy / dist * 0.03;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.004;
        p.life++;
        p.alpha = (1 - p.life / p.maxLife) * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      clearInterval(ambientInterval);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollDown = () => {
    document.querySelector('#experiencia')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg" />

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#000_90%)] z-0" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(57,255,20,1) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <p className="text-reveal delay-200 font-display text-[11px] tracking-[0.4em] uppercase neon-green mb-6">
          Guadalajara · Underground · Est. 2018
        </p>

        {/* Main title */}
        <h1 className="font-display leading-none mb-6">
          <span className="text-reveal delay-400 block text-[clamp(5rem,15vw,14rem)] text-white tracking-wider">
            DMT
          </span>
          <span className="text-reveal delay-600 block text-[clamp(2rem,7vw,6rem)] gradient-text-green-cyan tracking-[0.3em]">
            CLUB
          </span>
        </h1>

        {/* Glitch subtitle */}
        <div className="text-reveal delay-800 mb-8">
          <span
            className="glitch-text font-display text-[clamp(1rem,3vw,2rem)] text-gray-300 tracking-[0.25em] uppercase"
            data-text="Donde el Sonido Se Convierte en Visión"
          >
            Donde el Sonido Se Convierte en Visión
          </span>
        </div>

        {/* Descriptor */}
        <p className="text-reveal delay-1000 text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-[1.8] tracking-wide mb-12">
          Techno. Psytrance. Progressive. Experiencias sensoriales que disuelven las fronteras
          entre el cuerpo, la mente y el dancefloor.
        </p>

        {/* CTA row */}
        <div className="text-reveal delay-1200 flex flex-wrap items-center justify-center gap-4">
          <button
            data-hover="true"
            onClick={() => document.querySelector('#rituales')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-[11px] px-10 py-4 rounded-sm"
          >
            Ver Próximos Rituales
          </button>
          <button
            data-hover="true"
            onClick={() => document.querySelector('#experiencia')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-[11px] px-10 py-4 rounded-sm"
          >
            Descubrir Más
          </button>
        </div>

        {/* Waveform decoration */}
        <div className="text-reveal delay-1200 mt-16 flex items-end justify-center gap-[3px] h-8">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="wave-bar w-[3px] rounded-full bg-[#39ff14] opacity-60"
              style={{
                height: `${20 + Math.sin(i * 0.6) * 12}px`,
                animationDuration: `${0.6 + (i % 5) * 0.15}s`,
                animationDelay: `${i * 0.04}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        data-hover="true"
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500 hover:text-[#39ff14] transition-colors duration-300 group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Descender</span>
        <ChevronDown size={18} className="animate-bounce group-hover:[filter:drop-shadow(0_0_8px_#39ff14)]" />
      </button>
    </section>
  );
}

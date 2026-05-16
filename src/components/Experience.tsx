import { useEffect, useRef } from 'react';
import { Zap, Eye, Volume2, Waves } from 'lucide-react';

const pillars = [
  {
    icon: Volume2,
    title: 'Sonido Inmersivo',
    desc: 'Sistemas de audio diseñados para envolver tu cuerpo. Cada frecuencia calculada para trascender la experiencia auditiva convencional.',
    color: '#39ff14',
  },
  {
    icon: Eye,
    title: 'Visuales Psicodélicos',
    desc: 'Mapping de proyección en tiempo real y arte generativo que responde al BPM. Una sinfonía de luz que desdobla la percepción.',
    color: '#00f5ff',
  },
  {
    icon: Zap,
    title: 'Energía Colectiva',
    desc: 'El dancefloor como organismo vivo. Cientos de almas conectadas en un ritual compartido de liberación y éxtasis.',
    color: '#bf00ff',
  },
  {
    icon: Waves,
    title: 'Frecuencias Sagradas',
    desc: 'Techno oscuro, Psytrance expansivo, Progressive hipnótico. Géneros seleccionados para inducir estados alterados de conciencia.',
    color: '#39ff14',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)';
  };

  return (
    <section id="experiencia" ref={sectionRef} className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39ff14] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent opacity-20" />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, #39ff14 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <p className="scroll-reveal font-display text-[11px] tracking-[0.4em] uppercase neon-green mb-4">
            — La Experiencia
          </p>
          <h2 className="scroll-reveal font-display text-[clamp(2.5rem,6vw,6rem)] text-white leading-none mb-6" style={{ transitionDelay: '0.1s' }}>
            MÁS QUE UN<br />
            <span className="gradient-text-green-cyan">EVENTO.</span>
          </h2>
          <p className="scroll-reveal text-gray-400 text-base md:text-lg max-w-2xl leading-[1.8]" style={{ transitionDelay: '0.2s' }}>
            DMT Club es una promotora de experiencias sensoriales extremas. Operamos en el margen
            de lo convencional para crear noches que dejan cicatrices luminosas en la memoria.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="scroll-reveal"
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div
                  ref={el => { cardsRef.current[i] = el; }}
                  data-hover="true"
                  onMouseMove={e => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className="ticket-card rounded-sm p-8 h-full"
                  style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center mb-6"
                    style={{ background: `${pillar.color}15`, border: `1px solid ${pillar.color}40` }}
                  >
                    <Icon size={18} style={{ color: pillar.color }} />
                  </div>
                  <h3 className="font-display text-xl text-white mb-3 tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-[1.8]">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="scroll-reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 border border-[rgba(57,255,20,0.1)] rounded-sm overflow-hidden" style={{ transitionDelay: '0.4s' }}>
          {[
            { num: '06+', label: 'Años de Rituales' },
            { num: '150+', label: 'Eventos Producidos' },
            { num: '80K+', label: 'Almas Impactadas' },
            { num: '3', label: 'Géneros Sagrados' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-8 text-center border-r border-[rgba(57,255,20,0.08)] last:border-r-0 hover:bg-[rgba(57,255,20,0.03)] transition-colors duration-300"
            >
              <p className="font-display text-4xl md:text-5xl gradient-text-green-cyan mb-2">{stat.num}</p>
              <p className="text-gray-500 text-[11px] uppercase tracking-[0.25em] font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

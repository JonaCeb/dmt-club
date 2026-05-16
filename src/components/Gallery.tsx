import { useEffect, useRef } from 'react';

const items = [
  {
    src: 'https://images.pexels.com/photos/1540319/pexels-photo-1540319.jpeg?auto=compress&cs=tinysrgb&w=800',
    label: 'OSCURIDAD RITUAL — JUN 2025',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'DIMENSIÓN — AGO 2024',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'DMT FESTIVAL III — OCT 2024',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/1916816/pexels-photo-1916816.jpeg?auto=compress&cs=tinysrgb&w=800',
    label: 'FRACTAL DREAMS — JUL 2024',
    span: 'col-span-2 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'PSYFOREST — MAY 2024',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'NOCHE SUBTERRÁNEA — MAR 2024',
    span: 'col-span-1 row-span-1',
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="galeria" ref={sectionRef} className="relative py-32 bg-[#030303] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#bf00ff] to-transparent opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="scroll-reveal font-display text-[11px] tracking-[0.4em] uppercase mb-4" style={{ color: '#bf00ff', textShadow: '0 0 10px #bf00ff' }}>
              — Galería Inmersiva
            </p>
            <h2 className="scroll-reveal font-display text-[clamp(2.5rem,6vw,6rem)] text-white leading-none" style={{ transitionDelay: '0.1s' }}>
              MEMORIAS<br />
              <span className="gradient-text-purple-cyan">FRAGMENTADAS</span>
            </h2>
          </div>
          <p className="scroll-reveal text-gray-500 text-sm max-w-sm leading-[1.8]" style={{ transitionDelay: '0.2s' }}>
            Fragmentos capturados de las noches que no se pueden describir con palabras.
            Solo se viven. Solo se recuerdan.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          className="scroll-reveal grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3"
          style={{ transitionDelay: '0.2s' }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              data-hover="true"
              className={`gallery-item rounded-sm overflow-hidden relative group ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(30%) brightness(0.7)' }}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                <p className="font-display text-xs tracking-[0.2em] uppercase text-[#39ff14] [text-shadow:0_0_10px_#39ff14]">
                  {item.label}
                </p>
              </div>
              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[rgba(57,255,20,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[rgba(0,245,255,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="scroll-reveal mt-12 flex justify-center" style={{ transitionDelay: '0.3s' }}>
          <button
            data-hover="true"
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-[11px] px-10 py-4 rounded-sm"
          >
            Ver Archivo Completo
          </button>
        </div>
      </div>
    </section>
  );
}

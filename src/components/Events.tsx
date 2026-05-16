import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Music, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const events = [
  {
    id: 1,
    date: '28 JUN',
    year: '2025',
    day: 'Sábado',
    title: 'Mushroom Experience',
    subtitle: 'Techno / Dark Ambient',
    venue: 'Ex-Convento del Carmen',
    city: 'Guadalajara, Jalisco',
    tags: ['Techno', 'Industrial', 'Dark'],
    capacity: '800 almas',
    time: '22:00 — 08:00',
    color: '#39ff14',
    image: 'https://images.pexels.com/photos/1540319/pexels-photo-1540319.jpeg?auto=compress&cs=tinysrgb&w=800',
    lineup: ['SVLBRD', 'REBEKAH', 'SURGEON', 'DMT RESIDENTS'],
  },
  {
    id: 2,
    date: '12 JUL',
    year: '2025',
    day: 'Sábado',
    title: 'Don DMT Fest',
    subtitle: 'Psytrance / Progressive',
    venue: 'Bosque Los Colomos',
    city: 'Guadalajara, Jalisco',
    tags: ['Psytrance', 'Forest', 'Rave'],
    capacity: '2,000 almas',
    time: '18:00 — 10:00',
    color: '#00f5ff',
    image: 'https://images.pexels.com/photos/1916816/pexels-photo-1916816.jpeg?auto=compress&cs=tinysrgb&w=800',
    lineup: ['ASTRIX', 'VINI VICI', 'CAPTAIN HOOK', 'BIZZARE CONTACT'],
  },
  {
    id: 3,
    date: '09 AGO',
    year: '2025',
    day: 'Sábado',
    title: '190 BPM',
    subtitle: 'Progressive / Deep Techno',
    venue: 'Teatro Diana',
    city: 'Guadalajara, Jalisco',
    tags: ['Progressive', 'Deep', 'Minimal'],
    capacity: '1,200 almas',
    time: '21:00 — 07:00',
    color: '#bf00ff',
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
    lineup: ['SASHA', 'JOHN DIGWEED', 'HERNAN CATTANEO', 'NICOLAS JAAR'],
  },
  {
    id: 4,
    date: '04 OCT',
    year: '2025',
    day: 'Sábado',
    title: 'DMT EQUINOXIO 2026',
    subtitle: 'Multi-Stage · All-Night',
    venue: 'Terrenos El Arenal',
    city: 'Guadalajara, Jalisco',
    tags: ['Festival', 'Multi-Stage', 'All Night'],
    capacity: '5,000 almas',
    time: '16:00 — 12:00',
    color: '#39ff14',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    lineup: ['AMELIE LENS', 'CHARLOTTE DE WITTE', 'KOBOSIL', '+20 ARTISTAS'],
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navigate = (dir: 1 | -1) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(prev => (prev + dir + events.length) % events.length);
      setTransitioning(false);
    }, 300);
  };

  const event = events[active];

  return (
    <section id="rituales" ref={sectionRef} className="relative py-32 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent opacity-20" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,245,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="scroll-reveal font-display text-[11px] tracking-[0.4em] uppercase neon-cyan mb-4">
              — Próximos Rituales
            </p>
            <h2 className="scroll-reveal font-display text-[clamp(2.5rem,6vw,6rem)] text-white leading-none" style={{ transitionDelay: '0.1s' }}>
              AGENDA<br />
              <span className="gradient-text-purple-cyan">2025</span>
            </h2>
          </div>
          <div className="scroll-reveal flex items-center gap-2" style={{ transitionDelay: '0.2s' }}>
            <div className="w-2 h-2 rounded-full bg-[#39ff14] pulse-dot" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-bold">
              {events.length} eventos confirmados
            </span>
          </div>
        </div>

        {/* Featured event */}
        <div className="scroll-reveal mb-8" style={{ transitionDelay: '0.2s' }}>
          <div
            className={`relative rounded-sm overflow-hidden border border-[rgba(255,255,255,0.06)] transition-all duration-500 ${transitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}
          >
            {/* BG image */}
            <div className="absolute inset-0">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[360px]">
              {/* Left */}
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border"
                      style={{ borderColor: `${event.color}40`, color: event.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="font-display text-[clamp(1rem,2vw,1.2rem)] mb-2" style={{ color: event.color }}>
                  {event.date} · {event.year} · {event.day}
                </div>
                <h3 className="font-display text-[clamp(2rem,5vw,4.5rem)] text-white leading-none mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-bold mb-6">
                  {event.subtitle}
                </p>

                <div className="flex flex-col gap-2 mb-8">
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <MapPin size={14} style={{ color: event.color }} />
                    {event.venue} — {event.city}
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Calendar size={14} style={{ color: event.color }} />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Music size={14} style={{ color: event.color }} />
                    {event.capacity}
                  </div>
                </div>

                <button
                  data-hover="true"
                  onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary text-[11px] px-8 py-3 rounded-sm flex items-center gap-2"
                  style={{ borderColor: event.color, color: event.color }}
                >
                  Conseguir Acceso <ExternalLink size={13} />
                </button>
              </div>

              {/* Right: lineup */}
              <div className="hidden md:block">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600 mb-5">Lineup</p>
                <div className="flex flex-col gap-3">
                  {event.lineup.map((artist, i) => (
                    <div
                      key={artist}
                      className="flex items-center gap-4 py-3 border-b border-[rgba(255,255,255,0.05)]"
                    >
                      <span className="text-[10px] font-bold" style={{ color: event.color }}>
                        0{i + 1}
                      </span>
                      <span className="font-display text-xl text-gray-200 tracking-wide">{artist}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation + dots */}
        <div className="scroll-reveal flex items-center justify-between" style={{ transitionDelay: '0.3s' }}>
          <div className="flex items-center gap-3">
            {events.map((_, i) => (
              <button
                key={i}
                data-hover="true"
                onClick={() => { if (!transitioning) { setTransitioning(true); setTimeout(() => { setActive(i); setTransitioning(false); }, 300); } }}
                className="transition-all duration-300"
              >
                <div
                  className={`h-[2px] rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#39ff14]' : 'w-3 bg-gray-700 hover:bg-gray-500'}`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              data-hover="true"
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-gray-400 hover:border-[#39ff14] hover:text-[#39ff14] hover:[box-shadow:0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              data-hover="true"
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-gray-400 hover:border-[#39ff14] hover:text-[#39ff14] hover:[box-shadow:0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Mini cards grid */}
        <div className="scroll-reveal grid grid-cols-2 md:grid-cols-4 gap-3 mt-6" style={{ transitionDelay: '0.35s' }}>
          {events.map((ev, i) => (
            <button
              key={ev.id}
              data-hover="true"
              onClick={() => { if (!transitioning) { setTransitioning(true); setTimeout(() => { setActive(i); setTransitioning(false); }, 300); } }}
              className={`text-left p-4 rounded-sm border transition-all duration-300 ${i === active ? 'border-[#39ff14] bg-[rgba(57,255,20,0.05)]' : 'border-[rgba(255,255,255,0.05)] hover:border-[rgba(57,255,20,0.3)]'}`}
            >
              <p className="font-display text-[11px] tracking-[0.2em] mb-1" style={{ color: ev.color }}>
                {ev.date}
              </p>
              <p className="font-display text-sm text-white">{ev.title}</p>
              <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">{ev.venue}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

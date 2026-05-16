import { Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(57,255,20,0.08)] bg-black py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full border border-[#39ff14]" style={{ boxShadow: '0 0 10px #39ff14' }} />
                <div className="absolute inset-1 rounded-full bg-[#39ff14] opacity-15" />
                <span className="absolute inset-0 flex items-center justify-center font-display text-[10px] neon-green">DMT</span>
              </div>
              <span className="font-display text-xl tracking-widest text-white">DMT CLUB</span>
            </div>
            <p className="text-gray-600 text-sm leading-[1.8] max-w-xs">
              Club underground y promotora de experiencias electrónicas desde 2018.
              Guadalajara, Jalisco — México.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600 mb-5">Navegación</p>
              <ul className="flex flex-col gap-3">
                {[
                  ['La Experiencia', '#experiencia'],
                  ['Próximos Rituales', '#rituales'],
                  ['Galería', '#galeria'],
                  ['Contacto', '#contacto'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <button
                      data-hover="true"
                      onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-sm text-gray-500 hover:text-[#39ff14] hover:[text-shadow:0_0_8px_#39ff14] transition-all duration-300 uppercase tracking-wider text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600 mb-5">Géneros</p>
              <ul className="flex flex-col gap-3">
                {['Techno', 'Psytrance', 'Progressive', 'Dark Ambient', 'Industrial'].map(g => (
                  <li key={g} className="text-sm text-gray-600 uppercase tracking-wider">{g}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600 mb-5">Redes Sociales</p>
            <div className="flex gap-4 mb-8">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Youtube, label: 'YouTube' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  data-hover="true"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-gray-500 hover:border-[#39ff14] hover:text-[#39ff14] hover:[box-shadow:0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-600 tracking-wide leading-relaxed">
              @dmtclub.gdl<br />
              booking@dmtclub.mx
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.04)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-700 uppercase tracking-[0.25em]">
            © 2025 DMT Club — Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#39ff14] pulse-dot" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-700 font-bold">
              Señal activa — Guadalajara
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

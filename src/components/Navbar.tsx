import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'La Experiencia', href: '#experiencia' },
  { label: 'Rituales', href: '#rituales' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-blur' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          data-hover="true"
          className="flex items-center gap-3 group"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-[#39ff14] group-hover:shadow-[0_0_20px_#39ff14] transition-all duration-300" />
            <div className="absolute inset-1 rounded-full bg-[#39ff14] opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <span className="absolute inset-0 flex items-center justify-center font-display text-[10px] neon-green">DMT</span>
          </div>
          <span className="font-display text-xl tracking-widest text-white group-hover:neon-green transition-all duration-300">
            DMT CLUB
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link.href}>
              <button
                data-hover="true"
                onClick={() => handleLink(link.href)}
                className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white hover:[text-shadow:0_0_10px_#39ff14] transition-all duration-300"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          data-hover="true"
          onClick={() => handleLink('#rituales')}
          className="hidden md:block btn-primary text-[11px] px-6 py-2 rounded-sm"
        >
          Entrar al Ritual
        </button>

        {/* Mobile toggle */}
        <button
          data-hover="true"
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#39ff14] hover:[filter:drop-shadow(0_0_8px_#39ff14)] transition-all duration-200"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden navbar-blur border-t border-[rgba(57,255,20,0.1)] px-6 py-6 flex flex-col gap-5">
          {links.map(link => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              className="text-left text-xs font-bold tracking-[0.2em] uppercase text-gray-300 hover:neon-green transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLink('#contacto')}
            className="btn-primary text-[11px] px-6 py-3 rounded-sm mt-2"
          >
            Entrar al Ritual
          </button>
        </div>
      )}
    </nav>
  );
}

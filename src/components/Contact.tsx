import { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

const eventTypes = [
  'Booking de Artista',
  'Producción de Festival',
  'Residencia de DJ',
  'Patrocinio / Colaboración',
  'Prensa / Medios',
  'Consulta General',
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.event_type || !form.message) return;

    setStatus('loading');
    try {
      const { error } = await supabase.from('booking_requests').insert([form]);
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', phone: '', event_type: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `neon-input w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-sm px-5 py-4 text-white text-sm placeholder-gray-600 transition-all duration-300 focus:bg-[rgba(255,255,255,0.05)]`;

  return (
    <section id="contacto" ref={sectionRef} className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39ff14] to-transparent opacity-20" />

      {/* BG glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(57,255,20,0.03)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div>
            <p className="scroll-reveal font-display text-[11px] tracking-[0.4em] uppercase neon-green mb-4">
              — Booking &amp; Contacto
            </p>
            <h2 className="scroll-reveal font-display text-[clamp(2.5rem,6vw,6rem)] text-white leading-none mb-8" style={{ transitionDelay: '0.1s' }}>
              ENTRA AL<br />
              <span className="gradient-text-green-cyan">CÍRCULO</span>
            </h2>
            <p className="scroll-reveal text-gray-400 text-base leading-[1.9] mb-10" style={{ transitionDelay: '0.2s' }}>
              ¿Quieres llevar la experiencia DMT a tu ciudad? ¿Eres un artista que vibra en las
              mismas frecuencias? ¿Buscas una colaboración que rompa paradigmas? Habla con nosotros.
            </p>

            {/* Contact details */}
            <div className="scroll-reveal flex flex-col gap-6" style={{ transitionDelay: '0.3s' }}>
              {[
                { label: 'Email de Booking', value: 'booking@dmtclub.mx' },
                { label: 'Prensa & Medios', value: 'prensa@dmtclub.mx' },
                { label: 'Ubicación', value: 'Guadalajara, Jalisco — México' },
                { label: 'Redes Sociales', value: '@dmtclub.gdl' },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-1 border-b border-[rgba(255,255,255,0.05)] pb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600">{item.label}</span>
                  <span className="text-sm text-gray-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.2s' }}>
            {status === 'success' ? (
              <div className="ticket-card neon-border-pulse rounded-sm p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[400px]">
                <CheckCircle size={40} className="neon-green" />
                <div>
                  <h3 className="font-display text-2xl text-white mb-2">Mensaje Recibido</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tu señal ha penetrado las capas del subsuelo. El equipo DMT Club
                    contactará contigo en menos de 48 horas.
                  </p>
                </div>
                <button
                  data-hover="true"
                  onClick={() => setStatus('idle')}
                  className="btn-secondary text-[11px] px-8 py-3 rounded-sm mt-4"
                >
                  Enviar Otro Mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ticket-card rounded-sm p-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500">Nombre *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500">Teléfono</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+52 33 ..."
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500">Tipo de Consulta *</label>
                    <select
                      name="event_type"
                      value={form.event_type}
                      onChange={handleChange}
                      required
                      className={`${inputClass} cursor-pointer appearance-none`}
                    >
                      <option value="" disabled>Seleccionar...</option>
                      {eventTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500">Mensaje *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Cuéntanos tu visión..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    Ocurrió un error. Inténtalo de nuevo.
                  </div>
                )}

                <button
                  data-hover="true"
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full py-4 rounded-sm flex items-center justify-center gap-3 mt-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-3">
                      <span className="w-4 h-4 border border-[#39ff14] border-t-transparent rounded-full animate-spin" />
                      Transmitiendo...
                    </span>
                  ) : (
                    <>
                      Transmitir Mensaje <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

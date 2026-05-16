import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Noise texture */}
      <div className="noise-overlay" />

      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <Experience />
        <Events />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

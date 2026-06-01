import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Features from '../components/Features';
import Courses from '../components/Courses';
import Faculty from '../components/Faculty';
import AdmissionProcess from '../components/AdmissionProcess';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import Cta from '../components/Cta';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-gray-50 selection:bg-accent selection:text-white">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <div className="pt-0">
            <Hero />
            <Stats />
            <About />
            <Features />
            <Courses />
            <Faculty />
            <AdmissionProcess />
            <Testimonials />
            <Gallery />
            <Cta />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

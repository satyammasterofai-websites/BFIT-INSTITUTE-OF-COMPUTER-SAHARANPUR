import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Server, Database, MonitorPlay, ChevronRight } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop"
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentImage((prev) => (prev + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
      <AnimatePresence mode="popLayout">
        <motion.img key={currentImage} src={images[currentImage]} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.4, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/80 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white md:text-sm font-medium mb-6">
            🎓 Registrations Free • Offline Courses
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            BFIT<sup className="text-2xl md:text-4xl font-semibold">®</sup> Institute of <br className="hidden md:block"/>
            <span className="text-accent">Computer Science</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Empowering Students With Practical Computer Skills And Career-Focused Training.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto bg-accent hover:bg-accent-light text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,138,0,0.4)] hover:shadow-[0_0_30px_rgba(255,138,0,0.6)] transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Apply For Admission <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#courses" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 text-center">
              Explore Courses
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-10 text-white/20 z-10 hidden lg:block"><Code size={60} /></motion.div>
      <motion.div animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-1/4 right-10 text-white/20 z-10 hidden lg:block"><Server size={60} /></motion.div>
      <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-1/3 right-1/4 text-white/20 z-10 hidden lg:block"><Database size={40} /></motion.div>
      <motion.div animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-1/3 left-1/4 text-white/20 z-10 hidden lg:block"><MonitorPlay size={45} /></motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-20" />
    </section>
  );
}

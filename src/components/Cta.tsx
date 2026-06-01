import { motion } from 'motion/react';

export default function Cta() {
  return (
    <section className="relative py-24 overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary/80 mix-blend-multiply" />
      
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
          className="absolute rounded-full bg-white blur-[2px]"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 6 + 2}px`, height: `${Math.random() * 6 + 2}px` }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Start Your Professional Computer Education Journey Today</h2>
          <p className="text-xl text-blue-100 mb-10">Join BFIT and build your future with practical computer education.</p>
          <a href="#contact" className="inline-block bg-accent hover:bg-white hover:text-primary text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,138,0,0.5)] transform hover:-translate-y-1">
            Apply Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

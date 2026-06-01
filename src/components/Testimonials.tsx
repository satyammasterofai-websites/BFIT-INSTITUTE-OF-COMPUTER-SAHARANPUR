import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testimonials'));
        if (!querySnapshot.empty) {
          setTestimonials(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setDefaults();
        }
      } catch (error) {
        console.warn("Testimonials fetch error:", error);
        setDefaults();
      }
    };
    
    const setDefaults = () => {
      setTestimonials([
        { name: "Amit Chaudhary", text: "The practical approach at BFIT helped me secure a job right after completing my Tally course. Highly recommended!", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" },
        { name: "Priya Sharma", text: "Best computer institute in Saharanpur. The faculties are very supportive and clear all doubts with patience.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
        { name: "Rohit Kumar", text: "Completed my Python joining here. The labs are equipped with modern systems and environment is very studious.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
        { name: "Sneha Gupta", text: "Graphic design course here is completely practical. I built my portfolio during the course itself.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" }
      ]);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-accent font-bold tracking-wider uppercase mb-2">Testimonials</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-16">What Our Students Say</h3>

        <div className="relative h-64 md:h-56">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <Quote className="w-12 h-12 text-primary/20 mb-6" />
              <p className="text-xl md:text-2xl text-gray-700 italic mb-8 max-w-3xl">"{testimonials[current]?.text}"</p>
              <div className="flex items-center gap-4">
                <img src={testimonials[current]?.img} alt={testimonials[current]?.name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md" />
                <div className="text-left">
                  <h5 className="font-bold text-gray-900">{testimonials[current]?.name}</h5>
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-gray-300'}`} aria-label={`Go to slide ${i+1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

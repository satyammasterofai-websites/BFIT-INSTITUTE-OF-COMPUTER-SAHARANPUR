import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

export default function About() {
  const [aboutImg, setAboutImg] = useState("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop");

  useEffect(() => {
    const fetchAboutImg = async () => {
      try {
        const q = query(collection(db, 'gallery'), where('category', '==', 'About Section'), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setAboutImg(querySnapshot.docs[0].data().url);
        }
      } catch (error) {
        console.warn("About fetch error:", error);
      }
    };
    fetchAboutImg();
  }, []);

  const features = [
    "Experienced Faculty", "Practical Training", "Industry Relevant Courses",
    "Career Guidance", "Affordable Education", "Registration Free"
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={aboutImg} alt="Students" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">4.9</div>
                <div>
                  <div className="text-yellow-400 text-xl font-bold">★★★★★</div>
                  <div className="text-gray-600 font-medium">Top Rated Institute</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-accent font-bold tracking-wider uppercase mb-2">About BFIT</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Knowledge is the best asset. <br/><span className="text-primary">Join our offline courses today!</span>
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              BFIT® Institute of Computer Science is one of the leading computer training institutes in Saharanpur, dedicated to providing practical, career-oriented education through professional offline training programs.
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We focus on skill development, hands-on learning, industry-relevant curriculum, and student success.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent w-6 h-6 shrink-0" />
                  <span className="font-semibold text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="inline-block mt-10 bg-primary hover:bg-secondary text-white px-8 py-3.5 rounded-md font-bold transition-colors">
              Know More About Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

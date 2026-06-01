import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Faculty() {
  const [faculties, setFaculties] = useState<any[]>([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'faculty'));
        if (!querySnapshot.empty) {
          setFaculties(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setDefaults();
        }
      } catch (error) {
        console.warn("Faculty fetch error:", error);
        setDefaults();
      }
    };
    
    const setDefaults = () => {
      setFaculties([
        { name: "Suresh Sharma", role: "Director", exp: "15+ Years", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" },
        { name: "Rahul Verma", role: "Programming Trainer", exp: "8+ Years", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" },
        { name: "Neha Singh", role: "Graphic Design Trainer", exp: "6+ Years", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
        { name: "Amit Gupta", role: "Accounting Trainer", exp: "10+ Years", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" }
      ]);
    };

    fetchFaculty();
  }, []);

  return (
    <section id="faculty" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-accent font-bold tracking-wider uppercase mb-2">Our Team</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900">Meet Our Expert Faculty</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculties.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group overflow-hidden rounded-2xl bg-gray-50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-72">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"><Facebook size={18} /></a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"><Twitter size={18} /></a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"><Linkedin size={18} /></a>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center border-t-4 border-transparent group-hover:border-accent transition-colors">
                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-secondary font-medium mb-2">{member.role}</p>
                <span className="inline-block px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-full">Experience: {member.exp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

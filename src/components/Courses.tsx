import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Terminal, PenTool, Calculator, Keyboard, FileSpreadsheet, Code2, Coffee, Sparkles, BookOpen } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        if (!querySnapshot.empty) {
          setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setDefaults();
        }
      } catch (error) {
        console.warn("Courses fetch error:", error);
        setDefaults();
      }
    };
    
    const setDefaults = () => {
      setCourses([
        { title: "IT Essential / CCC", desc: "Fundamental computer concepts and internet knowledge.", duration: "3 Months", price: "₹2500" },
        { title: "Graphic Designer", desc: "Master Photoshop, Illustrator, CorelDraw and more.", duration: "6 Months", price: "₹8000" },
        { title: "Smart Accountant", desc: "Complete practical accounting and digital taxation.", duration: "6 Months", price: "₹7500" },
        { title: "Hindi & English Typing", desc: "Improve typing speed with high accuracy.", duration: "2 Months", price: "₹1500" },
        { title: "Tally ERP9 & Prime", desc: "Comprehensive Tally training with GST compliance.", duration: "3 Months", price: "₹4000" },
        { title: "C & C++ Language", desc: "Learn logic building and core programming concepts.", duration: "4 Months", price: "₹5000" },
        { title: "Core Java", desc: "Object-oriented programming using robust Java framework.", duration: "3 Months", price: "₹4500" },
        { title: "Python Programming", desc: "Modern Python programming for general and data applications.", duration: "3 Months", price: "₹5000" }
      ]);
    };

    fetchCourses();
  }, []);

  return (
    <section id="courses" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase mb-2">Programs We Offer</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Trending Courses</h3>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            return (
              <motion.div
                key={course.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-transparent hover:border-accent shadow-sm hover:shadow-[0_10px_30px_rgba(255,138,0,0.15)] transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full"
              >
                {course.images && course.images.length > 0 ? (
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img src={course.images[0]} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {course.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded">
                        +{course.images.length - 1} photos
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 pb-0">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-0 group-hover:bg-accent transition-colors duration-300">
                      <BookOpen className="w-8 h-8 text-secondary group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                )}
                
                <div className="p-8 flex-grow flex flex-col pt-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h4>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    {course.duration && (
                      <span className="inline-flex items-center text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                        🕒 {course.duration}
                      </span>
                    )}
                    {course.price && (
                      <span className="inline-flex items-center text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-md">
                        💳 {course.price}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6 flex-grow">{course.desc}</p>
                  <a href="#contact" className="mt-auto flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group/btn">
                    Learn More <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

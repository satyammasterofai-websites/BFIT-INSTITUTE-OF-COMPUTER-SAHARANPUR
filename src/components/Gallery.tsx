import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        let dbImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        
        // Filter out 'About Section' images if we want to display them only in the About section.
        // But Since this is Gallery, let's show all or filter.
        // We will show all except "About Section"
        dbImages = dbImages.filter(img => img.category !== 'About Section');

        if (dbImages.length > 0) {
          setImages(dbImages);
        } else {
          setDefaults();
        }
      } catch (error) {
        console.warn("Gallery fetch error:", error);
        setDefaults();
      }
    };
    
    const setDefaults = () => {
      setImages([
        { url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop", category: "Computer Lab" },
        { url: "https://images.unsplash.com/photo-1515162816999-a0c47dc190f7?q=80&w=1200&auto=format&fit=crop", category: "Students Learning" },
        { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop", category: "Practical Sessions" },
        { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop", category: "Classroom" },
        { url: "https://images.unsplash.com/photo-1588196749597-9ff0464b83cb?q=80&w=1200&auto=format&fit=crop", category: "Students" },
        { url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop", category: "Discussion" }
      ]);
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-accent font-bold tracking-wider uppercase mb-2">Campus Life</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900">Institute Gallery</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-xl aspect-[4/3] cursor-pointer"
              onClick={() => setSelectedImg(img.url)}
            >
              <img src={img.url} alt={img.category} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <ZoomIn className="text-white w-10 h-10 mb-2 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                <span className="text-white font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-accent transition-colors"><X size={40} /></button>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} src={selectedImg} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

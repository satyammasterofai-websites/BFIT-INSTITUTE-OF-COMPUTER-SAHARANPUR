import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <GraduationCap className="w-20 h-20 text-accent mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">BFIT<sup className="text-xl text-accent">®</sup></h1>
        <p className="text-gray-300 text-sm tracking-widest uppercase">Institute of Computer Science</p>
        
        <div className="w-48 h-1 bg-white/20 mt-8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

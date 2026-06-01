import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

function Counter({ end, suffix = "", duration = 2, isFloat = false }: { end: number, suffix?: string, duration?: number, isFloat?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const totalFrames = Math.round(duration * 60);
      const increment = end / totalFrames;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(isFloat ? Number(start.toFixed(1)) : Math.ceil(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration, isFloat]);

  return <span ref={ref}>{isFloat ? count.toFixed(1) : count}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { label: "Students Trained", value: 1000, suffix: "+" },
    { label: "Batches Completed", value: 50, suffix: "+" },
    { label: "Professional Courses", value: 7, suffix: "+" },
    { label: "Student Rating", value: 4.9, suffix: "", isFloat: true }
  ];

  return (
    <section className="py-12 bg-white relative z-30 -mt-10 mx-4 md:mx-8 lg:mx-auto max-w-6xl rounded-2xl shadow-xl border border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 flex items-center justify-center">
              <Counter end={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
              {stat.isFloat && <span className="text-accent ml-1 text-3xl">★</span>}
            </div>
            <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mt-2 px-2">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { PhoneCall, BookOpen, ClipboardCheck, Rocket } from 'lucide-react';

export default function AdmissionProcess() {
  const steps = [
    { title: "Contact Institute", desc: "Call or visit our campus", icon: PhoneCall },
    { title: "Choose Course", desc: "Select program matching interest", icon: BookOpen },
    { title: "Free Registration", desc: "Fill admission form free of cost", icon: ClipboardCheck },
    { title: "Start Learning", desc: "Attend classes and grow", icon: Rocket }
  ];

  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-accent rounded-full blur-[100px] opacity-20" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary rounded-full blur-[100px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-accent font-bold tracking-wider uppercase mb-2">Easy Steps</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold mb-4">Admission Process</h3>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white text-primary flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-4 border-primary relative z-10 group hover:border-accent transition-colors">
                    <Icon size={36} className="group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full text-white font-bold flex items-center justify-center border-4 border-primary">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-gray-300 max-w-[200px]">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

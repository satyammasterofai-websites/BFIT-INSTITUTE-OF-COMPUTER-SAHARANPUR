import { motion } from 'motion/react';
import { Monitor, Cpu, Users, GraduationCap, Briefcase, HeartHandshake, IndianRupee, LibraryBig } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Monitor, title: "Professional Computer Lab", desc: "State-of-the-art systems with latest software." },
    { icon: Cpu, title: "Practical Learning", desc: "100% hands-on project-based training." },
    { icon: Users, title: "Experienced Trainers", desc: "Learn from industry experts with years of experience." },
    { icon: GraduationCap, title: "Offline Classroom", desc: "Interactive physical classes for better focus." },
    { icon: Briefcase, title: "Career-Oriented", desc: "Courses tailored to meet industry demands." },
    { icon: HeartHandshake, title: "Personal Attention", desc: "Small batch size for individualized mentoring." },
    { icon: IndianRupee, title: "Affordable Fees", desc: "Quality education that fits your budget." },
    { icon: LibraryBig, title: "Modern Curriculum", desc: "Updated syllabus matching current trends." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-accent font-bold tracking-wider uppercase mb-2">Why Choose Us</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900">Why Choose BFIT</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:scale-110 transition-all">
                  <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 line-clamp-3">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { GraduationCap, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-300 pt-16 pb-8 border-t-[10px] border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-10 h-10 text-accent" />
              <div>
                <span className="text-2xl font-bold block leading-none text-white">BFIT<sup className="text-sm">®</sup></span>
                <span className="text-[0.6rem] font-medium tracking-wider uppercase text-gray-400">Institute</span>
              </div>
            </a>
            <p className="text-sm leading-relaxed">Knowledge is the best asset. Join our offline course and make your dreams come true! We provide pure practical training.</p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-accent text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-accent text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-accent text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">Quick Links<span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent rounded-full"></span></h4>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-accent transition-colors block">Home</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors block">About Us</a></li>
              <li><a href="#faculty" className="hover:text-accent transition-colors block">Our Faculty</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors block">Gallery</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors block">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">Top Courses<span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent rounded-full"></span></h4>
            <ul className="space-y-3">
              <li><a href="#courses" className="hover:text-accent transition-colors block">IT Essential / CCC</a></li>
              <li><a href="#courses" className="hover:text-accent transition-colors block">Tally ERP9 & Prime</a></li>
              <li><a href="#courses" className="hover:text-accent transition-colors block">Graphic Designer</a></li>
              <li><a href="#courses" className="hover:text-accent transition-colors block">Python Programming</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">Registration<span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent rounded-full"></span></h4>
            <p className="text-sm mb-4">Get free registration for any course. Start your professional training today in Saharanpur.</p>
            <a href="#contact" className="inline-block border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 py-2 rounded-full font-bold transition-all">Apply For Admission</a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© 2025 BFIT® Institute of Computer Science. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, GraduationCap, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
        const qS = await getDocs(q);
        if (!qS.empty) {
          setAnnouncement(qS.docs[0].data().title + ': ' + qS.docs[0].data().content);
        } else {
          setAnnouncement("New Batch Started! Apply Today.");
        }
      } catch (error) {
        console.warn("Announcements fetch error:", error);
        setAnnouncement("New Batch Started! Apply Today.");
      }
    };
    fetchAnnouncement();
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Courses', href: '/#courses' },
    { name: 'Faculty', href: '/#faculty' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {announcement && (
        <div className="bg-accent text-white text-sm py-2 px-4 shadow-md sticky top-0 z-[60]">
          <div className="max-w-7xl mx-auto flex items-center justify-center text-center overflow-hidden">
            <span className="font-medium whitespace-nowrap">📢 {announcement}</span>
          </div>
        </div>
      )}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled || announcement ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'} ${announcement && !scrolled ? 'top-9 bg-white' : announcement ? 'top-9' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="/#home" className="flex items-center gap-2 z-50">
              <GraduationCap className={`w-8 h-8 ${scrolled || announcement ? 'text-primary' : 'text-accent'}`} />
              <div>
                <span className={`text-2xl font-bold block leading-none ${scrolled || announcement ? 'text-primary' : 'text-white'}`}>
                  BFIT<sup className="text-sm">®</sup>
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className={`text-sm font-medium hover:text-accent transition-colors py-2 ${scrolled || announcement ? 'text-gray-700' : 'text-white'}`}>
                    {link.name}
                  </a>
                ))}
              </div>
              <a href="#contact" className="bg-accent hover:bg-accent-light text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(255,138,0,0.3)] hover:shadow-[0_0_25px_rgba(255,138,0,0.5)] transform hover:-translate-y-0.5 inline-block">
                Apply Now
              </a>
              <Link to="/login" className={`flex items-center gap-2 font-bold hover:text-accent transition-colors ${scrolled || announcement ? 'text-primary' : 'text-white'}`}>
                <LogIn size={20} /> Login
              </Link>
            </div>

            <div className="md:hidden z-50 flex items-center gap-4">
              <Link to="/login" className={scrolled || announcement || mobileMenuOpen ? 'text-primary' : 'text-white'}><LogIn size={24} /></Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={scrolled || announcement || mobileMenuOpen ? 'text-primary' : 'text-white'}>
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-0 left-0 right-0 bg-white shadow-xl pt-20 pb-6 px-4 md:hidden flex flex-col gap-4 border-b border-gray-100">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50">
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-primary text-white text-center px-6 py-3 rounded-md font-semibold mt-4">
                Apply Now
              </a>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="border-2 border-primary text-primary text-center px-6 py-3 rounded-md font-semibold">
                Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await addDoc(collection(db, 'inquiries'), {
        name, phone, email, course, message, createdAt: new Date()
      });
      setSuccess(true);
      setName(''); setPhone(''); setEmail(''); setCourse(''); setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.warn(error);
      setErrorMsg("Failed to submit inquiry. Please ensure Firestore permissions are granted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-accent font-bold tracking-wider uppercase mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900">Admission Inquiry</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-2xl font-bold text-primary mb-6">Contact Information</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0"><Phone className="text-secondary" /></div>
                  <div><h5 className="font-bold text-gray-900">Phone</h5><p className="text-gray-600">+91 97606 50025</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0"><MapPin className="text-secondary" /></div>
                  <div>
                    <h5 className="font-bold text-gray-900">Address</h5>
                    <p className="text-gray-600 leading-relaxed">R.K Puram Colony, Sardar Patel Marg,<br/>Dara Shivpuri, Saharanpur,<br/>Uttar Pradesh 247001</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0"><Clock className="text-secondary" /></div>
                  <div><h5 className="font-bold text-gray-900">Working Hours</h5><p className="text-gray-600">Mon-Sat: 9:00 AM – 8:00 PM</p><p className="text-gray-400 text-sm">Sunday: Closed</p></div>
                </div>
              </div>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.5134764831613!2d77.545!3d29.965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e95!2sSaharanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" className="w-full h-full border-0" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h4 className="text-2xl font-bold text-primary mb-6">Request Admission</h4>
            {success ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
                Admission requested successfully! We will contact you soon.
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-sm">
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="Enter your name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="+91" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email (Optional)</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Course Interested In</label>
                  <select value={course} onChange={(e) => setCourse(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-gray-700">
                    <option value="">Select a course</option>
                    <option value="IT Essential / CCC">IT Essential / CCC</option>
                    <option value="Graphic Designer">Graphic Designer</option>
                    <option value="Smart Accountant">Smart Accountant</option>
                    <option value="Hindi & English Typing">Hindi & English Typing</option>
                    <option value="Tally ERP9 & Prime">Tally ERP9 & Prime</option>
                    <option value="C & C++ Language">C & C++ Language</option>
                    <option value="Core Java">Core Java</option>
                    <option value="Python Programming">Python Programming</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none" placeholder="Any queries?"></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                  {loading ? 'Submitting...' : 'Request Admission'} <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

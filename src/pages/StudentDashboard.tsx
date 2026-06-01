import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Book, LayoutDashboard, LogOut } from 'lucide-react';

export default function StudentDashboard() {
  const { user, isAdmin, logOut } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, 'courses'), (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn("fetch courses error:", error));
  }, []);

  if (!user) return <Navigate to="/login" />;
  if (isAdmin) return <Navigate to="/admin" />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col pt-8">
        <div className="px-6 pb-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Student Portal</h2>
          <p className="text-sm text-gray-400 mt-1">{user.email}</p>
        </div>
        <nav className="flex-1 py-6">
          <button className="w-full flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors bg-accent/20 border-r-4 border-accent text-white">
            <LayoutDashboard size={18} />
            <span className="font-medium">My Courses</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logOut} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-sm font-medium">
            <LogOut size={16} /> Logout
          </button>
          <Link to="/" className="w-full flex items-center justify-center gap-2 py-2 px-4 mt-2 text-sm font-medium text-gray-300 hover:text-white">
            Back to Website
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                <div className="w-12 h-12 bg-blue-50 text-secondary rounded-full flex items-center justify-center mb-4">
                  <Book size={20} />
                </div>
                <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                <p className="text-sm text-gray-600 mb-6 flex-1">{course.desc}</p>
                <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary font-medium">
                  Enroll Now
                </button>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="text-gray-500">No courses available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Book, Users, Image as ImageIcon, MessageSquare, LayoutDashboard, LogOut, Loader2, Bell } from 'lucide-react';

const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function AdminDashboard() {
  const { user, isAdmin, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState('students');

  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/student" />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col pt-8">
        <div className="px-6 pb-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-400 mt-1">{user.email}</p>
        </div>
        <nav className="flex-1 py-6">
          <NavItem id="students" label="Students" icon={Users} active={activeTab} onClick={setActiveTab} />
          <NavItem id="courses" label="Courses" icon={Book} active={activeTab} onClick={setActiveTab} />
          <NavItem id="gallery" label="Gallery & About" icon={ImageIcon} active={activeTab} onClick={setActiveTab} />
          <NavItem id="faculty" label="Faculty" icon={Users} active={activeTab} onClick={setActiveTab} />
          <NavItem id="testimonials" label="Testimonials" icon={MessageSquare} active={activeTab} onClick={setActiveTab} />
          <NavItem id="announcements" label="Announcements" icon={Bell} active={activeTab} onClick={setActiveTab} />
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
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'courses' && <CoursesTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'faculty' && <FacultyTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'announcements' && <AnnouncementsTab />}
        </div>
      </div>
    </div>
  );
}

function NavItem({ id, label, icon: Icon, active, onClick }: { id: string, label: string, icon: any, active: string, onClick: (id: string) => void }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${active === id ? 'bg-accent/20 border-r-4 border-accent text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );
}

// STUBS for now
function StudentsTab() {
  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => {
    return onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.warn("fetch inquiries error:", error);
    });
  }, []);
  const handleDelete = async (id: string) => { await deleteDoc(doc(db, 'inquiries', id)); };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Enrolled Students / Inquiries</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Email</th>
              <th className="p-4 font-semibold text-gray-600">Phone</th>
              <th className="p-4 font-semibold text-gray-600">Course</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4">{s.name}</td>
                <td className="p-4">{s.email}</td>
                <td className="p-4">{s.phone}</td>
                <td className="p-4">{s.course}</td>
                <td className="p-4"><button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button></td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No records found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CoursesTab() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(collection(db, 'courses'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn("fetch courses error:", error));
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true);
      try {
        const filesArray = Array.from(e.target.files) as File[];
        const convertedImages = await Promise.all(filesArray.map((f: File) => resizeImage(f)));
        setImages(prev => [...prev, ...convertedImages]);
      } catch (err) {
        console.error(err);
        alert("Failed to process images.");
      } finally {
        setLoading(false);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'courses'), { title, desc, duration, price, images, createdAt: new Date() });
      setTitle(''); setDesc(''); setDuration(''); setPrice(''); setImages([]);
    } catch (err) {
      console.error(err);
      alert("Failed to add course.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => { await deleteDoc(doc(db, 'courses', id)); };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-lg mb-4">Add New Course</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title (e.g. IT Essential / CCC)" className="w-full px-4 py-2 border rounded-md" required />
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description of Course" className="w-full px-4 py-2 border rounded-md" required rows={3} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (e.g. 6 Months)" className="w-full px-4 py-2 border rounded-md bg-gray-50" />
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (e.g. 5000 INR)" className="w-full px-4 py-2 border rounded-md bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Course Photo Gallery (Optional)</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-md bg-gray-50 text-sm" />
            {images.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 flex-shrink-0">
                    <img src={img} alt="preview" className="w-full h-full object-cover rounded-md border shadow-sm" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600 transition-colors">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary disabled:opacity-50 transition-colors flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Adding...' : 'Add Course'}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-xl border shadow-sm flex flex-col justify-between items-start relative group">
            <div className="w-full">
              <div className="flex justify-between items-start gap-4">
                <h4 className="font-bold text-gray-900 border-b pb-2 w-full">{item.title}</h4>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 px-2 py-1 rounded">Delete</button>
              </div>
              <div className="mt-2 text-xs flex gap-3 text-primary font-semibold">
                {item.duration && <span>🕒 {item.duration}</span>}
                {item.price && <span>💳 {item.price}</span>}
              </div>
              <p className="text-sm text-gray-700 mt-3 line-clamp-3 leading-relaxed">{item.desc}</p>
              {item.images && item.images.length > 0 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {item.images.map((img: string, i: number) => (
                    <img key={i} src={img} className="w-12 h-12 object-cover rounded-md shadow-sm border" alt="gallery"/>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnnouncementsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(collection(db, 'announcements'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a: any, b: any) => b.createdAt - a.createdAt));
    }, (error) => console.warn("fetch announcements error:", error));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    await addDoc(collection(db, 'announcements'), { title, content, createdAt: new Date().getTime() });
    setTitle(''); setContent(''); setLoading(false);
  };

  const handleDelete = async (id: string) => { await deleteDoc(doc(db, 'announcements', id)); };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Announcements</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-lg mb-4">Post Announcement</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement Title" className="w-full px-4 py-2 border rounded-md" required />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Announcement Content" className="w-full px-4 py-2 border rounded-md" required />
          <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary disabled:opacity-50">
            {loading ? 'Posting...' : 'Post Announcement'}
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold">{item.title}</h4>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 text-sm font-medium hover:underline">Delete</button>
            </div>
            <p className="text-gray-700">{item.content}</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryTab() {
  const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState('About Section');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(collection(db, 'gallery'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn("fetch gallery error:", error));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const url = await resizeImage(file);
      await addDoc(collection(db, 'gallery'), { url, category, createdAt: new Date() });
      setFile(null); 
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => { await deleteDoc(doc(db, 'gallery', id)); };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gallery & About Images</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleAdd} className="space-y-4">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-md">
            <option value="About Section">About Section</option>
            <option value="Computer Lab">Computer Lab</option>
            <option value="Students Learning">Students Learning</option>
            <option value="Practical Sessions">Practical Sessions</option>
            <option value="Classroom">Classroom</option>
          </select>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" required />
          <button type="submit" disabled={loading || !file} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary disabled:opacity-50">
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="relative group overflow-hidden rounded-lg aspect-square">
            <img src={item.url} alt={item.category} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="text-center">
                <p className="text-white text-xs mb-2">{item.category}</p>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacultyTab() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [exp, setExp] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(collection(db, 'faculty'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn("fetch faculty error:", error));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;
    setLoading(true);
    try {
      const url = await resizeImage(file);
      await addDoc(collection(db, 'faculty'), { name, role, exp, img: url, createdAt: new Date() });
      setName(''); setRole(''); setExp(''); setFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => { await deleteDoc(doc(db, 'faculty', id)); };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Faculty</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleAdd} className="space-y-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-2 border rounded-md" required />
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (e.g. Director)" className="w-full px-4 py-2 border rounded-md" required />
          <input type="text" value={exp} onChange={(e) => setExp(e.target.value)} placeholder="Experience (e.g. 15+ Years)" className="w-full px-4 py-2 border rounded-md" required />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" required />
          <button type="submit" disabled={loading || !file} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Faculty'}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <img src={item.img} alt={item.name} className="w-24 h-24 rounded-full mx-auto object-cover mb-3" />
            <h4 className="font-bold">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.role}</p>
            <p className="text-xs text-gray-400 mb-3">{item.exp}</p>
            <button onClick={() => handleDelete(item.id)} className="text-red-500 text-sm hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn("fetch testimonials error:", error));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;
    setLoading(true);
    try {
      const url = await resizeImage(file);
      await addDoc(collection(db, 'testimonials'), { name, text, img: url, createdAt: new Date() });
      setName(''); setText(''); setFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => { await deleteDoc(doc(db, 'testimonials', id)); };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleAdd} className="space-y-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" className="w-full px-4 py-2 border rounded-md" required />
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Testimonial Quote" className="w-full px-4 py-2 border rounded-md" required />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" required />
          <button type="submit" disabled={loading || !file} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Testimonial'}
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl border shadow-sm flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{item.text}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-red-500 text-sm hover:underline shrink-0">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

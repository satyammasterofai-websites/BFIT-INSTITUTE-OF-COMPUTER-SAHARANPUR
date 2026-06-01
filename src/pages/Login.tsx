import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const { user, isAdmin, signIn } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState('');

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async () => {
    setErrorMsg('');
    try {
      await signIn();
    } catch (err: any) {
      if (err.message?.includes('unauthorized-domain')) {
        setErrorMsg('Login failed: AI Studio domain is not authorized in your Firebase console. Please add the domains ais-dev... and ais-pre... to Authentication -> Settings -> Authorized domains.');
      } else {
        setErrorMsg('Failed to sign in. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-primary">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or <Link to="/" className="font-medium text-accent hover:text-accent-light">return to homepage</Link>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-sm">
              {errorMsg}
            </div>
          )}
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-100" aria-hidden="true" />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

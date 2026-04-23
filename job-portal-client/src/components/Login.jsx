import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import app from '../firebase/firebase.config';

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return unsubscribe;
  }, [auth]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Please enter email and password.' });
      return;
    }
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userName = result.user.displayName || result.user.email.split('@')[0];
      navigate('/', { replace: true });
      Swal.fire({ icon: 'success', title: `Welcome, ${userName}!`, text: 'You have been successfully logged in.' });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Login Failed', text: error.message });
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userName = result.user.displayName || result.user.email.split('@')[0];
      navigate('/', { replace: true });
      Swal.fire({ icon: 'success', title: `Welcome, ${userName}!`, text: 'Logged in with Google.' });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Google Login Failed', text: error.message });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/', { replace: true });
    Swal.fire({ icon: 'info', title: 'Logged Out', text: 'You have been logged out.' });
  };

  if (user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-blue flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {(user.displayName || user.email)[0].toUpperCase()}
          </div>
          <p className="text-xl font-semibold text-gray-800 mb-1">{user.displayName || user.email.split('@')[0]}</p>
          <p className="text-sm text-gray-500 mb-6">{user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your JobJunction account</p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition mb-4"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">or sign in with email</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
              required
            />
          </div>
          <div className="flex justify-end">
            <span className="text-xs text-blue cursor-pointer hover:underline">Forgot password?</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue text-white font-semibold py-2.5 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-blue font-medium hover:underline">Sign up free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

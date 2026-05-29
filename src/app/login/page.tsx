'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { signInWithEmail } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sacred-cream p-4 text-[#283618]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-card w-full max-w-md rounded-[32px] p-8"
      >
        <h1 className="text-center text-3xl font-bold text-[#606c38] mb-3">Enter the Sanctuary</h1>
        <p className="text-center text-[#606c38]/80 mb-8">Sign in to continue your spiritual journey with Living Scrolls.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="label block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="premium-input w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="label block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="premium-input w-full"
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading} className="primary-button w-full text-xs sm:text-sm">
            {loading ? 'Entering...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-[#606c38]/80">
          Forgot your password?{' '}
          <Link href="/forgot" className="text-[#bc6c25] hover:underline">Reset here</Link>
        </p>
        <p className="mt-4 text-center text-sm text-[#606c38]/80">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#bc6c25] hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}

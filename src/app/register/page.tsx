'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerWithEmailAndProfile } from '@/services/authService';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await registerWithEmailAndProfile(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Unable to create account.');
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
        className="glass-card w-full max-w-md rounded-2xl p-8"
      >
        <h1 className="text-center text-3xl font-bold text-[#606c38] mb-3">Begin Your Journey</h1>
        <p className="text-center text-[#606c38]/80 mb-8">Register with your email and password to save your progress and access your profile.</p>

        <form onSubmit={handleRegister} className="space-y-6">
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

          <div>
            <label htmlFor="confirmPassword" className="label block mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="premium-input w-full"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="primary-button w-full text-xs sm:text-sm">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#606c38]/80">
          Already registered?{' '}
          <Link href="/login" className="text-[#bc6c25] hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

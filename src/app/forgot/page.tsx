'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { resetPassword } from '@/services/authService';

export default function ForgotPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await resetPassword(email);
      setMessage('If your email is registered, you will receive a reset link shortly.');
    } catch (err: any) {
      setError(err.message || 'Unable to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sacred-cream p-4 text-[#283618]">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="glass-card w-full max-w-3xl rounded-[32px] border border-[#bc6c25]/15 bg-[#f7eed5] p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.28em] text-[#606c38]">Reset password</p>
        <h1 className="mt-4 text-3xl font-semibold text-[#283618]">Restore your connection.</h1>
        <p className="mt-3 text-[#283618]/80">Enter your email and we will send guidance to continue your spiritual study journey.</p>
        <div className="mt-10 rounded-[28px] border border-[#bc6c25]/15 bg-[#fff9e4]/90 p-6">
          {message ? <p className="rounded-3xl bg-[#eae1c1] p-3 text-sm text-[#283618]">{message}</p> : null}
          {error ? <p className="rounded-3xl bg-[#f9d2c9] p-3 text-sm text-[#283618]">{error}</p> : null}
          <label className="label block mb-2">Email address</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-3 w-full rounded-3xl border border-[#bc6c25]/15 bg-[#f8eed3] px-4 py-3 text-[#283618] outline-none focus:border-[#bc6c25]/40"
            placeholder="your@email.com"
            type="email"
          />
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="mt-8 w-full rounded-full bg-[#dda15e] px-5 py-3 text-sm font-semibold text-[#283618] transition hover:bg-[#bc6c25] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send reset link
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-[#606c38]/80">
          Remembered your path? <Link href="/login" className="text-[#bc6c25] hover:underline">Return to sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

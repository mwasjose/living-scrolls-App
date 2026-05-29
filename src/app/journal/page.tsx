'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function JournalPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="py-24 text-center text-slate-300">Preparing your journal space...</div>;
  }

  return (
    <div className="space-y-8 py-6">
      <section className="rounded-[32px] border border-white/10 bg-parchment/5 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Prayer Journal</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">A quiet place for reflection and scripture response.</h1>
        <p className="mt-4 max-w-2xl text-slate-200/90">
          Record your prayers, daily insights, and scripture reflections so your spiritual growth is preserved and guided.
        </p>
      </section>

      {user ? (
        <div className="rounded-[32px] border border-white/10 bg-[#0b1422]/80 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Welcome back</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Continue your reflection, {user.displayName ?? user.email?.split('@')[0] ?? 'friend'}.</h2>
          <p className="mt-4 text-slate-300/90">Start a new entry, revisit your thoughts, and stay consistent with daily spiritual discipline.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link href="/profile" className="rounded-full border border-gold/20 bg-[#dda15e]/10 px-6 py-3 text-center text-sm font-semibold text-gold transition hover:bg-[#dda15e]/15">
              Open profile notes
            </Link>
            <button className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[#283618] transition hover:bg-[#bc6c25]">
              Start a new entry
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-[32px] border border-white/10 bg-[#0b1422]/80 p-8 shadow-soft">
          <p className="text-base leading-7 text-slate-200/90">
            Sign in to save your reflections and keep your journal entries secure. Your ongoing spiritual growth is easier when your journey is linked to your account.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="inline-flex w-full justify-center rounded-full bg-[#dda15e] px-6 py-3 text-sm font-bold text-[#283618] transition hover:bg-[#bc6c25] sm:w-auto">
              Sign in
            </Link>
            <Link href="/register" className="inline-flex w-full justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-gold/60 sm:w-auto">
              Create account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

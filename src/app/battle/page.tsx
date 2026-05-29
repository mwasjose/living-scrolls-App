'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function BattlePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="py-24 text-center text-slate-300">Preparing the arena...</div>;
  }

  return (
    <div className="space-y-8 py-6">
      <section className="rounded-[32px] border border-white/10 bg-parchment/5 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-gold">Scripture Battle Arena</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Challenge yourself and others in sacred Scripture contests.</h1>
            <p className="mt-4 max-w-2xl text-slate-200/90">
              Test your knowledge against friends, climb global leaderboards, and earn badges through competitive Scripture mastery.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-white/10 bg-midnight/80 p-6 shadow-glow"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Quick Battle</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">Five-Minute Duel</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200/90">Face off against a random opponent in a fast-paced Scripture trivia challenge. Answer correctly to advance and secure victory.</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold">⚡</span>
              <span>5 questions • 60 seconds per question</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold">🏆</span>
              <span>Earn +50 XP per victory</span>
            </div>
          </div>
          {user ? (
            <button className="mt-8 w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#b58f45]">
              Start Quick Battle
            </button>
          ) : (
            <Link href="/login" className="mt-8 inline-block w-full rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-[#b58f45]">
              Sign in to Battle
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[32px] border border-white/10 bg-midnight/80 p-6 shadow-glow"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Champion Series</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">Weekly Tournament</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200/90">Compete in a structured tournament format against challengers worldwide. Track your rating and climb the global rankings.</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold">🎯</span>
              <span>10 questions • Strategic gameplay</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold">👑</span>
              <span>Earn +100 XP • Season rewards</span>
            </div>
          </div>
          {user ? (
            <button className="mt-8 w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#b58f45]">
              Join Tournament
            </button>
          ) : (
            <Link href="/login" className="mt-8 inline-block w-full rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-[#b58f45]">
              Sign in to Compete
            </Link>
          )}
        </motion.div>
      </div>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-[32px] border border-white/10 bg-[#0c1727]/85 p-6 shadow-soft"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Your Battle Stats</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-midnight/60 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Total Battles</p>
              <p className="mt-3 text-2xl font-semibold text-white">0</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-midnight/60 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Victories</p>
              <p className="mt-3 text-2xl font-semibold text-emerald-400">0</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-midnight/60 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Win Rate</p>
              <p className="mt-3 text-2xl font-semibold text-white">-</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-midnight/60 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Rating</p>
              <p className="mt-3 text-2xl font-semibold text-gold">1200</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

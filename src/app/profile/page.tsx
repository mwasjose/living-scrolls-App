'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { updateProfile } from 'firebase/auth';
import { updateUserProfile } from '@/services/userService';
import { signOutUser } from '@/services/authService';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.uid ?? null);
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    document.title = 'Profile · Living Scrolls';
  }, []);

  useEffect(() => {
    if (profile?.displayName) {
      setDisplayName(profile.displayName);
    }
  }, [profile]);

  if (loading || profileLoading) {
    return <div className="py-24 text-center text-slate-300">Loading your growth details...</div>;
  }

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveMessage('');

    try {
      const trimmedName = displayName.trim() || user.email?.split('@')[0] || 'Beloved';
      await updateProfile(user, { displayName: trimmedName });
      await updateUserProfile(user.uid, { displayName: trimmedName });
      setSaveMessage('Profile updated successfully.');
    } catch (err: any) {
      setSaveMessage(err?.message || 'Unable to save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-parchment/5 p-10 shadow-soft backdrop-blur-xl text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Profile</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Sign in to view your spiritual progress.</h1>
        <p className="mt-4 text-slate-200/90">Your Wisdom XP, badges, and Torah consistency are waiting.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/login" className="inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#b58f45]">
            Sign in
          </Link>
          <Link href="/register" className="inline-flex rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-gold/60">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <section className="rounded-2xl border border-white/10 bg-parchment/5 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-gold">Profile</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">{profile?.displayName ?? user.email}</h1>
            <p className="mt-4 max-w-2xl text-slate-200/90">Your spiritual identity, progress, and the fruits of your study journey.</p>
          </div>
          <button
            type="button"
            onClick={() => signOutUser()}
            className="inline-flex rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Sign out
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-midnight/80 p-8 shadow-soft">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-gold">Profile settings</p>
            <p className="mt-2 text-slate-200/90">Edit your display name and keep your Living Scrolls identity fresh.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#b58f45] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <label className="label block mb-2">Display name</label>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="mt-3 w-full rounded-xl border border-white/10 bg-[#09121f] px-4 py-3 text-white outline-none focus:border-gold/60"
              placeholder="Your spiritual name"
              type="text"
            />
          </div>
          <div>
            <label className="label block mb-2">Email</label>
            <input
              value={user.email ?? ''}
              readOnly
              className="mt-3 w-full rounded-xl border border-white/10 bg-[#09121f]/70 px-4 py-3 text-slate-300 outline-none"
            />
          </div>
        </div>
        {saveMessage ? <p className="mt-4 text-sm text-slate-200/90">{saveMessage}</p> : null}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-2xl border border-white/10 bg-midnight/80 p-6 shadow-glow">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Level</p>
          <p className="mt-4 text-4xl font-semibold text-white">{profile?.level ?? 1}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-2xl border border-white/10 bg-midnight/80 p-6 shadow-glow">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Wisdom XP</p>
          <p className="mt-4 text-4xl font-semibold text-white">{profile?.wisdomXP ?? 0}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="rounded-2xl border border-white/10 bg-midnight/80 p-6 shadow-glow">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Consistency</p>
          <p className="mt-4 text-4xl font-semibold text-white">{profile?.streakDays ?? 0}d</p>
        </motion.div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-midnight/80 p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Badges earned</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {profile?.badges?.map((badge) => (
            <span key={badge} className="rounded-full bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

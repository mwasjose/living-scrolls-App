'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserProfile } from '@/hooks/useUserProfile';
import { updateUserProfile } from '@/services/userService';

interface PrayerTrackerCardProps {
  userId: string;
}

export function PrayerTrackerCard({ userId }: PrayerTrackerCardProps) {
  const { profile, loading: profileLoading } = useUserProfile(userId);
  const [prayedToday, setPrayedToday] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (profile?.prayerConsistency) {
      setPrayedToday(profile.prayerConsistency[today] || false);
    }
  }, [profile, today]);

  const handleTogglePrayer = async () => {
    if (!profile) return;
    const newConsistency = { ...profile.prayerConsistency, [today]: !prayedToday };
    await updateUserProfile(userId, { prayerConsistency: newConsistency });
    setPrayedToday(!prayedToday);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-[32px] border border-border bg-card p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">Prayer Consistency</p>
      <h3 className="mt-4 text-xl font-semibold text-foreground">Have you prayed today?</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">A consistent heart of prayer draws you closer to Adonai.</p>
      <button onClick={handleTogglePrayer} disabled={profileLoading} className={`mt-6 w-full ${prayedToday ? 'btn-secondary' : 'btn-primary'}`}>
        {prayedToday ? 'Prayer Recorded!' : 'Mark as Prayed'}
      </button>
    </motion.div>
  );
}
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { DisciplineTrackerCard } from '@/services/DisciplineTrackerCard';
import { PrayerTrackerCard } from '@/components/cards/prayer-tracker-card';
import { MemorizationProgressCard } from '@/components/cards/memorization-progress-card';

export default function GrowthPage() {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.uid ?? null);

  const fruitsOfSpirit = useMemo(() => [
    { name: 'Love', description: 'Growing deeper devotion to Adonai and His people' },
    { name: 'Joy', description: 'Rooted in His presence and kingdom hope' },
    { name: 'Peace', description: 'Steady and sacred within your heart' },
    { name: 'Patience', description: 'Enduring through trials with faith' },
    { name: 'Kindness', description: 'Compassion mirroring Yahshuah\'s heart' },
    { name: 'Goodness', description: 'Righteousness in thought, word, and deed' },
  ], []);

  const dailyDisciplines = useMemo(() => {
    if (!profile?.disciplineTracker) {
      return [
        { name: 'Morning Prayer', completed: false },
        { name: 'Scripture Study', completed: false },
        { name: 'Hebrew Learning', completed: false },
        { name: 'Reflection Journal', completed: false },
        { name: 'Evening Meditation', completed: false },
      ];
    }

    const today = new Date().toISOString().slice(0, 10);
    const todayDisciplines = profile.disciplineTracker[today] ?? {};
    
    return [
      { name: 'Morning Prayer', completed: todayDisciplines['morning_prayer'] || false },
      { name: 'Scripture Study', completed: todayDisciplines['scripture_study'] || false },
      { name: 'Hebrew Learning', completed: todayDisciplines['hebrew_learning'] || false },
      { name: 'Reflection Journal', completed: todayDisciplines['reflection_journal'] || false },
      { name: 'Evening Meditation', completed: todayDisciplines['evening_meditation'] || false },
    ];
  }, [profile?.disciplineTracker]);

  const streakDays = profile?.streakDays ?? 0;
  const wisdomXP = profile?.wisdomXP ?? 0;

  if (loading || profileLoading) {
    return <div className="py-24 text-center text-slate-300">Loading your growth journey...</div>;
  }

  return (
    <div className="space-y-8 py-6">
      <section className="rounded-[32px] border border-border bg-secondary p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-accent">Spiritual Growth</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Track your disciplines and fruit of the Ruach.</h1>
        <p className="mt-4 max-w-2xl text-slate-200/90">A calm space for prayer journaling, reflection, study consistency, and memorization progress.</p>
        
        {user && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-border bg-surface-soft p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current Streak</p>
              <p className="mt-3 text-2xl font-semibold text-accent">{streakDays} days</p>
            </div>
            <div className="rounded-[24px] border border-border bg-surface-soft p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Total XP</p>
              <p className="mt-3 text-2xl font-semibold text-white">{wisdomXP}</p>
            </div>
            <div className="rounded-[24px] border border-border bg-surface-soft p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Disciplines Tracked</p>
              <p className="mt-3 text-2xl font-semibold text-emerald-400">5</p>
            </div>
          </div>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-[32px] border border-border bg-surface-soft p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-accent">Fruits of the Spirit</p>
          <p className="mt-2 text-sm leading-7 text-slate-200/90">Growing these spiritual qualities through Adonai&apos;s grace:</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {fruitsOfSpirit.map((fruit) => (
              <div key={fruit.name} className="rounded-[24px] border border-border bg-[#0b1422]/80 p-4">
                <p className="font-semibold text-white">{fruit.name}</p>
                <p className="mt-2 text-xs leading-6 text-slate-300">{fruit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-[32px] border border-border bg-surface-soft p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-accent">Daily Disciplines</p>
          <p className="mt-2 text-sm leading-7 text-slate-200/90">Practice these sacred rhythms each day:</p>
          <div className="mt-5 space-y-3">
            {dailyDisciplines.map((discipline) => (
              <div key={discipline.name} className="flex items-center gap-3 rounded-[24px] border border-border bg-[#0b1422]/80 p-4">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full ${discipline.completed ? 'bg-emerald-500' : 'border border-slate-500'}`}>
                  {discipline.completed && <span className="text-white text-sm">✓</span>}
                </div>
                <span className={discipline.completed ? 'text-slate-300 line-through' : 'text-slate-200'}>{discipline.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {user && (
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <PrayerTrackerCard userId={user.uid} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <MemorizationProgressCard userId={user.uid} />
          </motion.div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import Link from 'next/link';
import { ReadingPlanType, SpiritualJournalEntry } from '@/lib/models';
import { ReadingPlanSelector } from '@/components/reading-plans/ReadingPlanSelector';
import { SpiritualJourneyVisualizer } from '@/components/reading-plans/SpiritualJourneyVisualizer';
import { DailyReadingExperience } from '@/components/reading-plans/DailyReadingExperience';
import { PersonalSpiritualJournal } from '@/components/reading-plans/PersonalSpiritualJournal';
import { SACRED_READING_PLANS, getMilestones } from '@/services/readingPlanService';

type PageView = 'browse' | 'active' | 'history';

export default function ReadingPlansPage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.uid ?? null);

  const [view, setView] = useState<PageView>('browse');
  const [selectedPlan, setSelectedPlan] = useState<ReadingPlanType | null>(null);
  const [startingPlan, setStartingPlan] = useState(false);

  const activePlan = (profile?.activeReadingPlan as ReadingPlanType | undefined) || selectedPlan || null;
  const activePlanData = activePlan ? SACRED_READING_PLANS[activePlan] : null;

  const activeProgress = useMemo(() => {
    const defaultProgress = activePlan
      ? {
          userId: user?.uid ?? '',
          planId: activePlan,
          planType: activePlan,
          startDate: new Date().toISOString().split('T')[0],
          currentDay: 0,
          completedDays: 0,
          totalDays: activePlanData?.totalDays ?? 30,
          percentComplete: 0,
          streakDays: profile?.streakDays ?? 0,
          lastReadingDate: undefined,
          missedDays: 0,
          journalEntries: profile?.journalEntries?.length ?? 0,
          status: 'active' as const,
          milestones: getMilestones(activePlan, activePlanData?.totalDays ?? 30),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : undefined;

    return activePlan && profile?.readingPlans?.[activePlan] ? profile.readingPlans[activePlan] : defaultProgress;
  }, [activePlan, profile?.readingPlans, user?.uid, profile?.streakDays, profile?.journalEntries?.length, activePlanData?.totalDays]);

  const journalEntries = profile?.journalEntries ?? [];

  const dailyReading = useMemo(() => {
    if (!activePlan) return null;

    return {
      id: `${activePlan}-day-1`,
      planId: activePlan,
      dayNumber: (activeProgress?.currentDay ?? 0) + 1,
      date: new Date().toISOString().split('T')[0],
      scriptureReference: 'Genesis 1:1-5',
      scriptureText:
        'In the beginning Elohim created the heavens and the earth. The earth was formless and empty, darkness covered the deep waters, and the Spirit of Elohim was hovering over the surface of the waters.',
      theme: activePlanData?.title || 'Sacred Reading',
      devotionalCommentary:
        'Today we enter the first breath of Scripture. In this passage, Elohim speaks creation into being, inviting us to trust His word and rest in His purpose.',
      hebraicContext:
        'The Hebrew phrase "בְּרֵאשִׁית" (Bereishit) carries the sense of beginnings and origins, pointing to Adonai as the source of all life.',
      messianicConnection:
        'This opening scene whispers of Yahshuah Messiah, the living Word through whom all things were made.',
      wordStudy: {
        word: 'Bereshit',
        hebrew: 'בְּרֵאשִׁית',
        transliteration: 'Bereishit',
        meaning: 'In the beginning',
        spiritualSignificance:
          'This word anchors our journey in the first declaration of Elohim\'s creative authority and covenant faithfulness.',
      },
      reflectionPrompt: 'How does this passage shape your understanding of Elohim\'s creative presence in your life?',
      lifeApplication:
        'Remember that every day begins with Elohim\'s careful work. Invite Him into your personal seasons of new beginnings.',
      prayerSuggestion:
        'Adonai, open my eyes to see Your creation with wonder. Help me trust Your creative Word in every season.',
      userReflection: '',
      userNotes: '',
      bookmarked: false,
      highlighted: [],
      completed: false,
      createdAt: new Date(),
    };
  }, [activePlan, activeProgress, activePlanData]);

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-white">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mb-4 h-14 w-14 rounded-full border-2 border-gold border-t-transparent"
          />
          <p className="text-slate-300">Preparing your devotional journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-gold/20 bg-gradient-to-br from-gold/10 to-midnight/40 p-12 text-center shadow-soft"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Sacred Scripture Journey</p>
          <h1 className="mt-4 text-5xl font-semibold text-white">A Sacred Journal Awaits</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
            Sign in to enter a devotional reading platform designed like a living Torah manuscript, complete with reflections, Hebraic insight, prayer, and progression.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex rounded-full bg-gold px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold/90"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex rounded-full border-2 border-gold/40 bg-gold/5 px-8 py-3 text-sm font-semibold text-gold transition hover:border-gold/60 hover:bg-gold/10"
            >
              Create Account
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {(['torah-cycle', 'gospel-journey', '30-day-psalms', 'one-year-bible', 'proverbs-wisdom', 'hebrew-word-journey'] as ReadingPlanType[]).map((planType) => {
            const planData = SACRED_READING_PLANS[planType];
            return (
              <motion.div
                key={planType}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className="rounded-[24px] border border-white/10 bg-midnight/40 p-8 shadow-soft"
              >
                <div className="text-4xl">{planData.icon}</div>
                <h2 className="mt-4 text-2xl font-semibold text-white">{planData.title}</h2>
                <p className="mt-3 text-slate-300">{planData.description}</p>
                <p className="mt-4 text-xs text-slate-500">{planData.duration}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="rounded-[32px] border border-white/10 bg-parchment/5 p-8 shadow-soft backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Devotional Reading Platform</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Your Spiritual Journal & Scripture Journey</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Transform your reading plans into a living sacred journal, with daily Scripture reflections, Hebraic insight, personal prayer, and a warm Messianic companion.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-widest text-slate-400">Spiritual Level</p>
            <p className="mt-2 text-3xl font-semibold text-white">{profile?.level ?? 1}</p>
            <p className="mt-1 text-sm text-slate-400">{profile?.wisdomTitle ?? 'Torah Seeker'}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-widest text-slate-400">Current Streak</p>
            <p className="mt-2 text-3xl font-semibold text-gold">{profile?.streakDays ?? 0}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-midnight/40 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-widest text-slate-400">Journal Notes</p>
            <p className="mt-2 text-3xl font-semibold text-white">{journalEntries.length}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="flex-1">
          <div className="rounded-[32px] border border-white/10 bg-midnight/40 p-8 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-gold">Reading Experience</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Choose your sacred journey</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setView('browse')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    view === 'browse' ? 'bg-gold text-slate-950' : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  Browse
                </button>
                <button
                  onClick={() => setView('active')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    view === 'active' ? 'bg-gold text-slate-950' : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  My Journey
                </button>
                <button
                  onClick={() => setView('history')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    view === 'history' ? 'bg-gold text-slate-950' : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  History
                </button>
              </div>
            </div>
          </div>

          {view === 'browse' && (
            <div className="space-y-8 pt-6">
              <ReadingPlanSelector
                currentPlan={selectedPlan ?? undefined}
                onSelectPlan={setSelectedPlan}
                loading={startingPlan}
              />

              {selectedPlan && (
                <div className="rounded-[24px] border border-gold/20 bg-gradient-to-br from-gold/10 to-midnight/40 p-8 shadow-soft">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-gold">Ready to begin</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{activePlanData?.title}</h3>
                      <p className="mt-2 text-slate-300">{activePlanData?.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        setStartingPlan(true);
                        setTimeout(() => {
                          setView('active');
                          setStartingPlan(false);
                        }, 400);
                      }}
                      disabled={startingPlan}
                      className="rounded-full bg-gold px-6 py-3 font-semibold text-slate-950 transition hover:bg-gold/90 disabled:opacity-60"
                    >
                      {startingPlan ? 'Starting journey...' : `Begin ${activePlanData?.title}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {view === 'active' && (
            <div className="space-y-8 pt-6">
              {activePlan ? (
                <>
                  <SpiritualJourneyVisualizer
                    progress={activeProgress as any}
                    planTitle={activePlanData?.title || 'Sacred Journey'}
                  />

                  {dailyReading && (
                    <div className="rounded-[32px] border border-white/10 bg-parchment/5 p-8 shadow-soft">
                      <DailyReadingExperience
                        reading={dailyReading as any}
                        onSaveReflection={async (reflection) => {
                          // placeholder for saving the daily reflection
                          console.log('Save reflection', reflection);
                        }}
                        onBookmark={() => {
                          // placeholder for bookmark action
                        }}
                        onHighlight={(verseRange) => {
                          // placeholder for highlighting
                        }}
                      />
                    </div>
                  )}

                  <div className="rounded-[32px] border border-white/10 bg-parchment/5 p-8 shadow-soft">
                    <h3 className="text-sm uppercase tracking-[0.28em] text-gold">Plan Focus</h3>
                    <p className="mt-4 text-xl font-semibold text-white">{activePlanData?.spiritualFocus}</p>
                    <p className="mt-3 text-slate-300">{activePlanData?.readingPace}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[20px] border border-white/10 bg-midnight/40 p-5">
                        <p className="text-xs uppercase tracking-widest text-slate-500">Duration</p>
                        <p className="mt-2 text-lg font-semibold text-white">{activePlanData?.duration}</p>
                      </div>
                      <div className="rounded-[20px] border border-white/10 bg-midnight/40 p-5">
                        <p className="text-xs uppercase tracking-widest text-slate-500">Difficulty</p>
                        <p className="mt-2 text-lg font-semibold text-white">{activePlanData?.difficulty}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-[24px] border-2 border-dashed border-white/20 p-12 text-center">
                  <p className="text-slate-400">There is no active plan yet.</p>
                  <p className="mt-2 text-sm text-slate-500">Choose a sacred journey from the Browse tab to begin.</p>
                </div>
              )}
            </div>
          )}

          {view === 'history' && (
            <div className="space-y-6 pt-6">
              <div className="rounded-[24px] border border-white/10 bg-midnight/40 p-8 shadow-soft">
                <p className="text-sm uppercase tracking-[0.28em] text-gold">Spiritual Memories</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Completed Journeys</h3>
                <p className="mt-2 text-slate-400">Your completed Scripture journeys will appear here as sacred milestones and reflections.</p>
              </div>
            </div>
          )}
        </div>

        <aside className="w-full xl:w-[420px] rounded-[32px] border border-white/10 bg-midnight/40 p-8 shadow-soft">
          <div className="space-y-6">
            <div className="rounded-[24px] border border-white/10 bg-parchment/5 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">Daily encouragement</p>
              <p className="mt-3 text-lg text-slate-900">Your Scripture journey waits today. Continue faithfully through the scrolls.</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-parchment/5 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">Spiritual journal</p>
              <p className="mt-3 text-slate-900">Reflect on your daily reading, capture prayers, and save the insights Elohim reveals to your heart.</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-parchment/5 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">Messianic insight</p>
              <p className="mt-3 text-slate-900">Daily commentary connects Torah themes to Yahshuah Messiah and reveals deeper meaning in your study.</p>
            </div>
          </div>
        </aside>
      </div>

      {view === 'active' && (
        <div className="rounded-[32px] border border-white/10 bg-parchment/5 p-8 shadow-soft">
          <PersonalSpiritualJournal
            entries={journalEntries as SpiritualJournalEntry[]}
            onAddEntry={async () => {
              // placeholder for journal entry save logic
              return Promise.resolve();
            }}
            loading={false}
          />
        </div>
      )}
    </div>
  );
}

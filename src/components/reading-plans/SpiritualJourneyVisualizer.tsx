'use client';

import { motion } from 'framer-motion';
import { ReadingPlanProgress } from '@/lib/models';
import { calculateProgressMetrics, getEncouragementMessage } from '@/services/readingPlanService';

interface SpiritualJourneyVisualizerProps {
  progress: ReadingPlanProgress;
  planTitle: string;
}

export function SpiritualJourneyVisualizer({ progress, planTitle }: SpiritualJourneyVisualizerProps) {
  const metrics = calculateProgressMetrics(progress);
  const encouragement = getEncouragementMessage(progress);

  return (
    <div className="space-y-8">
      {/* Header - Journey Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[24px] border border-border bg-card-soft p-8 shadow-soft"
      >
        <h2 className="text-3xl font-semibold text-foreground">{planTitle}</h2>
        <p className="mt-2 text-lg italic text-[var(--text-secondary)]">{encouragement}</p>
      </motion.div>

      {/* Streak & Consistency Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Current Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-[24px] border border-border bg-surface-soft p-6 shadow-soft"
        >
          <p className="text-xs uppercase tracking-widest text-slate-400">Current Streak</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-accent">{progress.streakDays}</span>
            <span className="text-sm text-slate-400">days</span>
          </div>
          <p className="mt-3 text-sm text-slate-300">{metrics.streakStatus}</p>
        </motion.div>

        {/* Consistency Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-[24px] border border-border bg-surface-soft p-6 shadow-soft"
        >
          <p className="text-xs uppercase tracking-widest text-slate-400">Consistency</p>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-emerald-400">{metrics.consistencyScore}%</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-card-soft">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.consistencyScore}%` }}
                transition={{ delay: 0.3, duration: 1 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-[24px] border border-border bg-surface-soft p-6 shadow-soft"
        >
          <p className="text-xs uppercase tracking-widest text-slate-400">Journey Progress</p>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-accent">{metrics.completionPercentage}%</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              {progress.completedDays} of {progress.totalDays} days
            </p>
            {/* Progress bar */}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-card-soft">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.completionPercentage}%` }}
                transition={{ delay: 0.3, duration: 1 }}
                className="h-full bg-gradient-to-r from-accent to-accent-soft"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sacred Journey Timeline - Milestones */}
      <div className="space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-accent">Sacred Milestones</h3>

        <div className="space-y-3">
          {progress.milestones.map((milestone, index) => {
            const isAchieved = milestone.achieved;
            const isReached = progress.completedDays >= milestone.dayNumber;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative flex items-start gap-4 rounded-[16px] border-2 p-4 transition-all ${
                  isAchieved
                    ? 'border-accent bg-accent-soft'
                    : isReached
                    ? 'border-accent bg-accent-soft'
                    : 'border-border bg-surface-soft'
                }`}
              >
                {/* Timeline marker */}
                <div className="flex-shrink-0">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                      isAchieved
                        ? 'border-accent bg-accent-soft'
                        : isReached
                        ? 'border-accent bg-accent-soft'
                        : 'border-border bg-card-soft'
                    }`}
                  >
                    {isAchieved ? (
                      <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`text-sm font-bold ${isReached ? 'text-accent' : 'text-slate-500'}`}>
                        {Math.floor(milestone.dayNumber / 10)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Milestone content */}
                <div className="flex-grow">
                  <h4 className={`text-lg font-semibold ${
                    isAchieved ? 'text-accent' : 'text-white'
                  }`}>
                    {milestone.title}
                  </h4>
                  <p className="mt-1 text-sm text-slate-400">{milestone.spiritualSignificance}</p>
                  <p className="mt-1 text-xs text-slate-500">Day {milestone.dayNumber}</p>
                </div>

                {/* Achievement badge */}
                {isAchieved && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                      Achieved
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Spiritual Growth Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[24px] border border-border bg-surface-soft p-6 shadow-soft"
      >
        <h3 className="text-sm uppercase tracking-widest text-accent">Journey Statistics</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs text-slate-400">Total Journal Entries</p>
            <p className="mt-1 text-3xl font-bold text-white">{progress.journalEntries}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Days Remaining</p>
            <p className="mt-1 text-3xl font-bold text-slate-300">{metrics.daysRemaining}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Missed Days (with grace)</p>
            <p className="mt-1 text-3xl font-bold text-slate-300">{progress.missedDays}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Longest Streak</p>
            <p className="mt-1 text-3xl font-bold text-accent">
              {progress.milestones.length > 0 ? Math.max(...progress.milestones.map(m => m.dayNumber)) : 0} days
            </p>
          </div>
        </div>
      </motion.div>

      {/* Encouragement message */}
      {metrics.daysRemaining > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-[24px] border-2 border-accent bg-gradient-to-r from-accent-soft to-transparent p-6 shadow-soft"
        >
          <p className="text-center text-lg italic text-slate-100">
            Be strong and courageous. The journey continues, and every step draws you closer to Elohim.
          </p>
        </motion.div>
      )}

      {metrics.completionPercentage === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[24px] border-2 border-accent bg-gradient-to-r from-accent-soft to-accent-soft p-8 text-center shadow-soft"
        >
          <p className="text-3xl">🎉</p>
          <h3 className="mt-4 text-2xl font-semibold text-accent">Journey Complete!</h3>
          <p className="mt-2 text-slate-100">
            You have completed this sacred reading journey. May the Scripture you have studied dwell richly in your heart and transform your life.
          </p>
        </motion.div>
      )}
    </div>
  );
}

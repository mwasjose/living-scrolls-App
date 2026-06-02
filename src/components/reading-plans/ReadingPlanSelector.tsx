'use client';

import { motion } from 'framer-motion';
import { ReadingPlanType } from '@/lib/models';
import { SACRED_READING_PLANS } from '@/services/readingPlanService';

interface ReadingPlanSelectorProps {
  onSelectPlan: (planType: ReadingPlanType) => void;
  currentPlan?: ReadingPlanType;
  loading?: boolean;
}

export function ReadingPlanSelector({ onSelectPlan, currentPlan, loading }: ReadingPlanSelectorProps) {
  const plans: ReadingPlanType[] = [
    'torah-cycle',
    'one-year-bible',
    '30-day-psalms',
    'gospel-journey',
    'proverbs-wisdom',
    'messianic-prophecies',
    'shabbat-preparation',
    'feasts-of-adonai',
    'hebrew-word-journey',
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-border bg-secondary p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-accent">Sacred Journeys</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Choose Your Reading Path</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          Select a sacred reading journey that speaks to your heart. Each path offers unique Scripture experiences and spiritual growth.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {plans.map((planType) => {
          const planData = SACRED_READING_PLANS[planType];
          const isSelected = currentPlan === planType;

          return (
            <motion.button
              key={planType}
              onClick={() => onSelectPlan(planType)}
              disabled={loading}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative overflow-hidden rounded-[24px] border-2 p-6 text-left transition-all duration-300 ${
                isSelected
                  ? 'border-accent bg-gradient-to-br from-accent-soft to-accent-soft shadow-soft'
                  : 'border-border bg-surface-soft hover:border-accent hover:bg-surface-soft'
              }`}
          >
              {/* Background glow effect */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-soft via-transparent to-transparent" />
              </div>

              <div className="relative z-10 space-y-3">
                {/* Icon */}
                <div className="text-4xl">{planData.icon}</div>

                {/* Title */}
                <div>
                  <h3 className={`text-lg font-semibold transition-colors ${
                    isSelected ? 'text-accent' : 'text-white group-hover:text-accent'
                  }`}>
                    {planData.title}
                  </h3>
                  {planData.hebrewTitle && (
                    <p className="mt-1 text-xs text-slate-400">
                      {planData.hebrewTitle} • {planData.transliteration}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 line-clamp-2">{planData.description}</p>

                {/* Metadata */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full bg-card-soft px-3 py-1 text-xs text-[var(--text-secondary)]">
                    {planData.duration}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    planData.difficulty === 'Gentle'
                      ? 'bg-emerald-500/10 text-emerald-300'
                      : planData.difficulty === 'Moderate'
                      ? 'bg-amber-500/10 text-amber-300'
                      : 'bg-rose-500/10 text-rose-300'
                  }`}>
                    {planData.difficulty}
                  </span>
                </div>

                {/* Spiritual focus */}
                <p className="pt-2 text-xs text-slate-400 italic">{planData.spiritualFocus}</p>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 rounded-full bg-accent-soft p-1">
                    <svg className="h-4 w-4 text-slate-950" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

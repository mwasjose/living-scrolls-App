'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ReflectionSubmission } from '@/services/aiLessonGenerationService';
import { Heart, Send, CheckCircle } from 'lucide-react';

interface ReflectionSubmissionProps {
  lessonId: string;
  lessonTitle: string;
  onSubmit?: (reflection: ReflectionSubmission) => Promise<void>;
  userId?: string;
  reflectionQuestions?: string[];
}

type SpiritualMood = 'strengthened' | 'challenged' | 'inspired' | 'grateful' | 'seeking' | 'peaceful';

export function ReflectionSubmissionCard({
  lessonId,
  lessonTitle,
  onSubmit,
  userId,
  reflectionQuestions = [
    'What is God revealing to you through this teaching?',
    'How will you apply this wisdom to your life?',
    'What transformation is the Holy Spirit inviting?',
  ],
}: ReflectionSubmissionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reflection, setReflection] = useState('');
  const [selectedMood, setSelectedMood] = useState<SpiritualMood>('grateful');
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moodOptions: { value: SpiritualMood; label: string; emoji: string }[] = [
    { value: 'strengthened', label: 'Strengthened', emoji: '💪' },
    { value: 'challenged', label: 'Challenged', emoji: '⛰️' },
    { value: 'inspired', label: 'Inspired', emoji: '✨' },
    { value: 'grateful', label: 'Grateful', emoji: '🙏' },
    { value: 'seeking', label: 'Seeking', emoji: '🔍' },
    { value: 'peaceful', label: 'Peaceful', emoji: '☮️' },
  ];

  const handleSubmit = async () => {
    if (!reflection.trim()) return;

    setIsSubmitting(true);

    try {
      const reflectionData: ReflectionSubmission = {
        id: `reflection-${Date.now()}`,
        userId: userId || 'anonymous',
        lessonId,
        reflection,
        answeredQuestions: Object.entries(submittedQuestions).map(([qIdx, answer]) => ({
          questionId: `q${qIdx}`,
          answer,
        })),
        mood: selectedMood,
        submittedAt: new Date(),
      };

      if (onSubmit) {
        await onSubmit(reflectionData);
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setReflection('');
        setSubmittedQuestions({});
        setSelectedMood('grateful');
        setIsOpen(false);
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting reflection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[24px] border border-green-500/30 bg-green-500/10 p-6 text-center space-y-3"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
        </motion.div>
        <h3 className="font-semibold text-white">Reflection Saved</h3>
        <p className="text-sm text-slate-300">Your reflection has been saved to your spiritual journey.</p>
      </motion.div>
    );
  }

  if (!isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full rounded-[24px] border-2 border-dashed border-accent bg-accent-soft px-6 py-4 transition hover:border-accent hover:bg-accent-soft"
      >
        <div className="flex items-center justify-center gap-2 text-white">
          <Heart className="h-5 w-5 text-accent" />
          <span className="font-semibold">Share Your Spiritual Reflection</span>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-border bg-card p-8 space-y-6"
    >
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.16em] text-accent">Personal Reflection</p>
        <h2 className="text-2xl font-bold text-white">Share Your Spiritual Journey</h2>
        <p className="text-slate-400">Write how this teaching touched your heart and faith</p>
      </div>

      {/* Spiritual mood selector */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-300">How are you feeling spiritually?</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {moodOptions.map((mood) => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex flex-col items-center gap-1 rounded-[12px] px-3 py-2 transition ${
                selectedMood === mood.value
                  ? 'bg-accent-soft border border-accent'
                    : 'bg-surface-soft border border-border hover:bg-surface'
              }`}
            >
              <span className="text-xl">{mood.emoji}</span>
              <span className="text-xs font-medium text-white hidden sm:inline">{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reflection textarea */}
      <div className="space-y-3">
        <label htmlFor="reflection" className="text-sm font-semibold text-slate-300">
          Your Reflection
        </label>
        <textarea
          id="reflection"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={`Consider:\n\n${reflectionQuestions[0]}\n${reflectionQuestions[1]}\n${reflectionQuestions[2]}`}
          className="w-full rounded-[16px] border border-border bg-card-soft p-4 text-white placeholder-slate-500 outline-none transition focus:border-accent focus:bg-surface-soft resize-none"
          rows={6}
        />
        <p className="text-xs text-slate-500">{reflection.length} characters</p>
      </div>

      {/* Reflection prompts */}
      <div className="rounded-[16px] bg-card-soft border border-border p-4 space-y-2">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Reflection Prompts</p>
        <div className="space-y-2">
          {reflectionQuestions.map((question, idx) => (
            <motion.button
              key={idx}
              whileHover={{ x: 4 }}
              onClick={() =>
                setSubmittedQuestions({
                  ...submittedQuestions,
                  [idx]: question,
                })
              }
              className="flex items-start gap-2 text-left p-2 rounded hover:bg-surface-soft transition text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <span className="text-accent font-semibold mt-1">{idx + 1}.</span>
              <span>{question}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(false)}
          className="flex-1 rounded-full border border-border bg-card-soft px-6 py-3 font-semibold text-white transition hover:bg-surface-soft hover:border-border"
        >
          Cancel
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!reflection.trim() || isSubmitting}
          className="flex-1 rounded-full bg-accent px-6 py-3 font-semibold text-slate-950 transition hover:bg-accent-soft disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Reflection'}
        </motion.button>
      </div>
    </motion.div>
  );
}

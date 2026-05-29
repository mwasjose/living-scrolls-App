'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { TriviaQuestion } from '@/lib/models';

interface TriviaQuestionCardProps {
  question?: TriviaQuestion;
  questionNumber?: number;
  totalQuestions?: number;
  selectedAnswer: string;
  showResult: boolean;
  onSubmit: (value: string) => void;
  onNext: () => void;
  loading: boolean;
  loadingNext?: boolean;
  sessionComplete: boolean;
}

export function TriviaQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showResult,
  onSubmit,
  onNext,
  loading,
  loadingNext = false,
  sessionComplete,
}: TriviaQuestionCardProps) {
  const [draftAnswer, setDraftAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  const isCorrect = useMemo(
    () => Boolean(question && showResult && selectedAnswer === question.answer),
    [question, selectedAnswer, showResult]
  );

  if (loading) {
    return (
      <div className="rounded-[28px] bg-surface p-8 text-center text-primary">
        <p className="font-semibold">Loading sacred questions…</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="rounded-[28px] bg-surface p-8 text-center text-primary">
        <p className="font-semibold">Choose a mode and category to begin your training.</p>
      </div>
    );
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[28px] bg-surface p-6"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-surface-soft px-3 py-1 text-xs uppercase tracking-[0.28em] text-secondary">{question.category}</span>
          <span className="rounded-full bg-surface-soft px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">{question.difficulty}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-primary">{question.question}</h2>
          {questionNumber ? (
            <span className="rounded-full bg-surface-soft px-3 py-1 text-xs uppercase tracking-[0.24em] text-secondary">
              {totalQuestions ? `Question ${questionNumber} of ${totalQuestions}` : `Question ${questionNumber}`}
            </span>
          ) : null}
        </div>
        {question.hebrewContext ? <p className="text-sm text-secondary">{question.hebrewContext}</p> : null}
      </div>

      <div className="mt-6 space-y-4">
        {question.type === 'fill_blank' ? (
          <div className="space-y-3">
            <input
              value={draftAnswer}
              onChange={(event) => setDraftAnswer(event.target.value)}
              placeholder="Write your answer here"
              className="w-full rounded-3xl border border-soft bg-surface px-4 py-3 text-primary outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(252,163,17,0.2)]"
            />
            <button
              type="button"
              disabled={showResult || sessionComplete}
              onClick={() => onSubmit(draftAnswer)}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-primary transition hover:bg-[rgba(252,163,17,0.9)]"
            >
              Submit answer
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const isSelected = option === selectedAnswer;
              const isRight = showResult && option === question.answer;
              const isWrong = showResult && isSelected && option !== question.answer;
              return (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => onSubmit(option)}
                  disabled={showResult || sessionComplete}
                  animate={isWrong ? { x: [0, -4, 4, -2, 2, 0] } : undefined}
                  transition={{ duration: 0.3 }}
                  className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${
                    isRight
                      ? 'border-[var(--accent)] bg-[rgba(252,163,17,0.12)] text-primary'
                      : isWrong
                      ? 'border-[rgba(235,77,75,0.8)] bg-[rgba(235,77,75,0.12)] text-secondary'
                      : isSelected
                      ? 'border-[var(--accent)] bg-[rgba(252,163,17,0.12)] text-primary'
                      : 'border-soft bg-surface text-primary hover:border-[var(--accent)]'
                  }`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        )}

        {question.hint ? (
          <div className="rounded-3xl bg-surface-soft p-4 text-sm text-secondary">
            <button
              type="button"
              onClick={() => setShowHint((value) => !value)}
              className="font-semibold text-primary underline-offset-4 transition hover:text-[var(--accent)]"
            >
              {showHint ? 'Hide glyph hint' : 'Reveal glyph hint'}
            </button>
            {showHint ? <p className="mt-3 text-secondary">{question.hint}</p> : null}
          </div>
        ) : null}
      </div>

      {showResult ? (
        <div className={`mt-6 rounded-[28px] border p-5 ${isCorrect ? 'border-[rgba(252,163,17,0.2)] bg-[rgba(252,163,17,0.12)] text-primary' : 'border-[rgba(235,77,75,0.2)] bg-[rgba(235,77,75,0.12)] text-secondary'}`}>
          <p className="font-semibold">{isCorrect ? 'Correct — your mind is rooted in truth.' : 'That answer was not right, but the lesson remains holy.'}</p>
          <p className="mt-3 text-sm text-secondary">{question.explanation}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-secondary">
            <div className="rounded-3xl bg-surface-soft p-4">
              <p className="font-semibold text-secondary">Scripture</p>
              <p className="mt-2 text-secondary">{question.scriptureReference}</p>
            </div>
            <div className="rounded-3xl bg-surface-soft p-4">
              <p className="font-semibold text-secondary">Torah insight</p>
              <p className="mt-2 text-secondary">{question.torahConnection}</p>
            </div>
          </div>
          <div className="mt-4 rounded-3xl bg-surface-soft p-4 text-sm text-secondary">
            <p className="font-semibold text-secondary">Messianic teaching</p>
            <p className="mt-2 text-secondary">{question.messianicInsight}</p>
          </div>
          <button
            type="button"
            onClick={onNext}
            disabled={loadingNext}
            className="mt-6 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-primary transition hover:bg-[rgba(252,163,17,0.9)]"
          >
            {loadingNext ? 'Preparing next question...' : 'Continue the journey'}
          </button>
        </div>
      ) : null}
    </motion.div>
  );
}


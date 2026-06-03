'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { TriviaQuestion } from '@/lib/models';
import { CheckCircle2, XCircle, Volume2, Vibrate } from 'lucide-react';
import { replaceNames } from '@/lib/textReplace';

interface TriviaSliderProps {
  questions: TriviaQuestion[];
  currentIndex: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  loading: boolean;
  loadingNext?: boolean;
  sessionComplete: boolean;
  enableSound?: boolean;
  enableVibration?: boolean;
}

export function TriviaSlider({
  questions,
  currentIndex,
  onAnswer,
  onNext,
  loading,
  loadingNext = false,
  sessionComplete,
  enableSound = true,
  enableVibration = true,
}: TriviaSliderProps) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);

  const question = questions[currentIndex];
  const isCorrect = question && selectedAnswer === question.answer;
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer('');
    setShowResult(false);
    setIsRetrying(false);
    setShowHint(false);
    setAnswered(false);
    setDisableButtons(false);
  }, [currentIndex]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-primary font-semibold">Loading sacred questions…</p>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-primary font-semibold">Choose a mode and category to begin your training.</p>
        </div>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    if (disableButtons || answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);
    setDisableButtons(true);
    
    const correct = answer === question.answer;

    // Haptic feedback
    if (enableVibration && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(correct ? [50, 30, 50] : [100, 50, 100]);
    }

    // Sound feedback
    if (enableSound) {
      playFeedbackSound(correct);
    }

    if (correct) {
      setShowResult(true);
      onAnswer(answer);
    } else {
      // Wrong answer: show toast-like feedback, allow retry
      setIsRetrying(true);
      setTimeout(() => {
        setIsRetrying(false);
        setDisableButtons(false);
        setAnswered(false);
      }, 1500);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer('');
    setShowResult(false);
    setIsRetrying(false);
    setAnswered(false);
    setDisableButtons(false);
  };

  const playFeedbackSound = (correct: boolean) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      
      if (correct) {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.setValueAtTime(0, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } else {
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain.gain.setValueAtTime(0, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    } catch {
      // Audio context not available, silently fail
    }
  };

  return (
    <div className="w-full">
      {/* Progress Indicators */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-xs uppercase tracking-[0.24em] text-secondary">{progressPercent}%</span>
        </div>
        <div className="h-2 bg-surface-soft rounded-full overflow-hidden border border-soft">
          <motion.div
            className="h-full bg-[var(--accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        {/* Dot Indicators */}
        <div className="flex justify-center gap-1.5 flex-wrap">
          {questions.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-6 bg-[var(--accent)]'
                  : idx < currentIndex
                  ? 'w-2 bg-surface-soft'
                  : 'w-2 bg-surface'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`question-${currentIndex}`}
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -400 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="rounded-[28px] bg-[var(--surface)] p-8 shadow-sm"
        >
          {/* Category and Difficulty Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="rounded-full bg-surface-soft px-3 py-1 text-xs uppercase tracking-[0.28em] text-secondary font-semibold">
              {question.category}
            </span>
            <span className="rounded-full bg-surface-soft px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary font-semibold">
              {question.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-3xl font-semibold text-primary mb-4 leading-tight">{replaceNames(question.question)}</h2>

          {/* Hebrew Context */}
          {question.hebrewContext && (
            <p className="text-sm text-secondary mb-6 italic">{replaceNames(question.hebrewContext)}</p>
          )}

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {question.type === 'fill_blank' ? (
              <div className="space-y-3">
                <input
                  value={selectedAnswer}
                  onChange={(e) => !answered && setSelectedAnswer(e.target.value)}
                  placeholder="Write your answer here"
                  disabled={answered}
                  className="w-full rounded-lg border border-soft bg-surface px-3 py-2 text-primary outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(252,163,17,0.2)] disabled:opacity-60"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={answered || !selectedAnswer}
                    onClick={() => handleAnswer(selectedAnswer)}
                    className="inline-flex primary-button text-sm py-2 px-4"
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {question.options.map((option) => {
                  const isSelected = option === selectedAnswer;
                  const isRight = showResult && option === question.answer;
                  const isWrong = showResult && isSelected && option !== question.answer;

                  return (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(option)}
                      disabled={answered}
                      whileHover={!answered ? { scale: 1.02 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      animate={
                        isWrong
                          ? { x: [0, -6, 6, -3, 3, 0] }
                          : isRight
                          ? { scale: [1, 1.05, 1] }
                          : {}
                      }
                      transition={
                        isWrong
                          ? { duration: 0.4, ease: 'easeInOut' }
                          : isRight
                          ? { duration: 0.5 }
                          : {}
                      }
                      className={`inline-flex items-center relative overflow-hidden rounded-lg border-2 px-3 py-2 text-left text-sm font-medium transition-all disabled:cursor-not-allowed ${
                        isRight
                          ? 'border-[rgba(75,192,192,0.7)] bg-[rgba(75,192,192,0.12)] text-primary shadow-lg'
                          : isWrong
                          ? 'border-[rgba(235,77,75,0.8)] bg-[rgba(235,77,75,0.12)] text-secondary shadow-lg'
                          : isSelected && !showResult
                          ? 'border-[var(--accent)] bg-[rgba(252,163,17,0.12)] text-primary shadow-md'
                          : 'border-soft bg-surface text-primary hover:border-accent hover:bg-surface-soft'
                      }`}
                    >
                      {isRight && <span className="absolute right-3 top-1/2 -translate-y-1/2"><CheckCircle2 size={20} /></span>}
                      {isWrong && <span className="absolute right-3 top-1/2 -translate-y-1/2"><XCircle size={20} /></span>}
                      <span className="pr-6">{replaceNames(option)}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Hint Button */}
          {question.hint && (
            <div className="rounded-2xl bg-surface-soft p-4 mb-6 border border-soft">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-sm font-semibold text-primary hover:text-accent-primary transition underline-offset-2"
              >
                {showHint ? 'Hide glyph hint' : 'Reveal glyph hint'}
              </button>
              {showHint && <p className="mt-3 text-sm text-secondary">{replaceNames(question.hint)}</p>}
            </div>
          )}

          {/* Feedback Section */}
          <AnimatePresence>
            {isRetrying && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl bg-[rgba(235,77,75,0.12)] border-2 border-[rgba(235,77,75,0.24)] p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <XCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-semibold text-rose-700">Not quite right, but the lesson remains holy.</p>
                    <p className="text-sm text-rose-600 mt-1">Try again with a fresh perspective.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Section */}
          <AnimatePresence>
            {showResult && isCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl bg-surface-soft border-2 border-[rgba(40,167,69,0.2)] p-6 space-y-6"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle2 className="text-[var(--accent)]" size={28} />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-primary text-lg">Correct! Your mind is rooted in truth.</p>
                    <p className="text-sm text-secondary mt-1">Tap continue when you are ready for the next question.</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-surface p-4 border border-soft">
                    <p className="text-xs uppercase tracking-[0.24em] text-secondary font-semibold mb-2">Scripture</p>
                    <p className="text-sm text-primary">{replaceNames(question.scriptureReference)}</p>
                  </div>
                  <div className="rounded-xl bg-surface p-4 border border-soft">
                    <p className="text-xs uppercase tracking-[0.24em] text-secondary font-semibold mb-2">Torah Insight</p>
                    <p className="text-sm text-primary">{replaceNames(question.torahConnection)}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-surface p-4 border border-soft">
                  <p className="text-xs uppercase tracking-[0.24em] text-secondary font-semibold mb-2">Messianic Teaching</p>
                    <p className="text-sm text-primary">{replaceNames(question.messianicInsight)}</p>
                </div>

                <button
                  type="button"
                  onClick={onNext}
                  disabled={loadingNext || sessionComplete}
                  className="w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-primary transition hover:bg-[rgba(252,163,17,0.9)] disabled:cursor-not-allowed disabled:bg-[rgba(252,163,17,0.5)]"
                >
                  {loadingNext ? 'Preparing next question…' : 'Continue the journey'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Retry Button */}
          {isRetrying && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleRetry}
              className="w-full secondary-button text-sm py-2 mt-6"
            >
              Try Again
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Sound/Vibration Toggle */}
      <div className="flex gap-3 justify-center mt-6 text-xs">
        <button
          onClick={() => {}}
          className="text-secondary hover:text-primary transition flex items-center gap-1"
          title="Sound effects"
        >
          <Volume2 size={16} /> Sound
        </button>
        <button
          onClick={() => {}}
          className="text-secondary hover:text-primary transition flex items-center gap-1"
          title="Haptic feedback"
        >
          <Vibrate size={16} /> Haptics
        </button>
      </div>
    </div>
  );
}

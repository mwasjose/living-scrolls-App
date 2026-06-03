'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { TriviaQuestion } from '@/lib/models';
import { saveTriviaProgress } from '@/services/trivia/triviaService';
import { availableLevels, availableModes, TriviaLevel, TriviaMode } from '@/services/trivia/questionEngine';

const QUESTION_BATCH_SIZE = 14;
const PREFETCH_REMAINING_THRESHOLD = 3;

function formatGoalLabel(mode: TriviaMode) {
  switch (mode) {
    case 'Quick Trivia':
      return 'Sharpen scripture recall with fast questions.';
    case 'Torah Challenge':
      return 'Focus deeply on Torah portions and aliyot rhythm.';
    case 'Messianic Insight':
      return 'Weave prophecy, gospel, and covenant connection.';
    case 'Wisdom Marathon':
      return 'Build endurance through progressive Scripture mastery.';
    case 'Daily Sacred Challenge':
      return 'Complete today’s curated challenge for lasting streaks.';
    case 'Hebrew Intelligence Mode':
      return 'Learn roots, meanings, and sacred glyph wisdom.';
    default:
      return 'Practice sacred Scripture knowledge with purpose.';
  }
}

function getBaseTime(level: TriviaLevel) {
  switch (level) {
    case 'Easy':
      return 45;
    case 'Medium':
      return 30;
    case 'Hard':
      return 20;
    default:
      return 30;
  }
}

function formatChallengeDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function useTriviaGame(userId?: string) {
  const [mode, setMode] = useState<TriviaMode>('Quick Trivia');
  const [difficulty, setDifficulty] = useState<TriviaLevel>('Easy');
  const [category, setCategory] = useState<string>('General Bible Knowledge');
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [sessionMessage, setSessionMessage] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timer, setTimer] = useState(45);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingNextQuestion, setLoadingNextQuestion] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);
  const [challengeDate, setChallengeDate] = useState('');
  const timerRef = useRef<any>(null);
  const lastSavedAttemptRef = useRef(0);
  const lastSavedXPRef = useRef(0);
  const prefetchingRef = useRef(false);

  const currentQuestion = questions[currentIndex];
  const attemptedQuestions = currentIndex + (showResult ? 1 : 0);
  const progress = questions.length ? ((currentIndex % 10) + 1) * 10 : 0;
  const accuracy = attemptedQuestions ? Math.round((correctAnswers / attemptedQuestions) * 100) : 0;
  const earnedXP = questions.reduce((sum, question, index) => {
    if (index < currentIndex) {
      return sum + (question.xp ?? 25);
    }
    return sum;
  }, 0) + (showResult && selectedAnswer === currentQuestion?.answer ? (currentQuestion?.xp ?? 25) : 0);

  const modeSummary = formatGoalLabel(mode);

  const loadQuestions = async () => {
    setLoadingQuestions(true);
    setSessionMessage('');
    setSessionComplete(false);
    setSelectedAnswer('');
    setShowResult(false);
    setCorrectAnswers(0);
    setCurrentIndex(0);
    setProgressSaved(false);
    setTimer(getBaseTime(difficulty));

    try {
      // Generate questions locally using the question engine (no server API required)
      // For daily challenge use the deterministic generator
      if (mode === 'Daily Sacred Challenge') {
        const incoming = (await import('@/services/trivia/questionEngine')).getDailyChallenge(new Date().toISOString().slice(0, 10));
        setQuestions(incoming as TriviaQuestion[]);
        setSessionMessage('Daily Sacred Challenge loaded.');
      } else {
        const engine = await import('@/services/trivia/questionEngine');
        const askedIds = questions.map((q) => q.id);
        const incoming = engine.generateTriviaQuestions({ mode, difficulty, category, count: QUESTION_BATCH_SIZE, askedIds });
        setQuestions(incoming as TriviaQuestion[]);
        setSessionMessage(incoming.length ? 'Question set ready.' : 'No questions available for this selection.');
      }
    } catch (error) {
      setSessionMessage('Unable to load the Sacred Intelligence questions.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const loadMoreQuestions = async ({ background = false }: { background?: boolean } = {}) => {
    if (prefetchingRef.current) {
      return false;
    }

    prefetchingRef.current = true;
    if (!background) {
      setLoadingNextQuestion(true);
    }

    try {
      const engine = await import('@/services/trivia/questionEngine');
      const askedIds = questions.map((q) => q.id);
      const freshQuestions = engine.generateTriviaQuestions({ mode, difficulty, category, count: QUESTION_BATCH_SIZE, askedIds }) as TriviaQuestion[];

      if (freshQuestions.length) {
        setQuestions((items) => [...items, ...freshQuestions]);
        return true;
      }

      setSessionMessage('I could not prepare a fresh question yet. Try reset or change filters.');
      return false;
    } catch {
      setSessionMessage('Unable to generate the next question right now.');
      return false;
    } finally {
      prefetchingRef.current = false;
      if (!background) {
        setLoadingNextQuestion(false);
      }
    }
  };

  useEffect(() => {
    setChallengeDate(new Date().toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    setTimer(getBaseTime(difficulty));
  }, [difficulty]);

  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, difficulty, category, userId, challengeDate]);

  useEffect(() => {
    if (!questions.length || showResult || sessionComplete) {
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimer((value) => {
        if (value <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setShowResult(true);
          setSessionMessage('Time ended for this question. Review the insight and continue.');
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questions, currentIndex, showResult, sessionComplete]);

  useEffect(() => {
    if (!sessionComplete || !userId || progressSaved) return;

    saveTriviaProgress(userId, earnedXP, accuracy, maxStreak)
      .then(() => setProgressSaved(true))
      .catch(() => {});
  }, [sessionComplete, userId, earnedXP, accuracy, maxStreak, progressSaved]);

  useEffect(() => {
    // Added prefetchingRef.current check to prevent infinite re-fetches if one fails
    if (
      !questions.length || 
      loadingQuestions || 
      loadingNextQuestion || 
      prefetchingRef.current
    ) return;

    const remainingQuestions = questions.length - currentIndex - 1;
    if (remainingQuestions <= PREFETCH_REMAINING_THRESHOLD) {
      loadMoreQuestions({ background: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions.length, loadingQuestions, loadingNextQuestion]);

  useEffect(() => {
    if (!showResult || !userId || attemptedQuestions === 0 || attemptedQuestions % 5 !== 0) return;
    if (lastSavedAttemptRef.current === attemptedQuestions) return;

    const xpSinceLastSave = earnedXP - lastSavedXPRef.current;
    if (xpSinceLastSave <= 0) return;

    lastSavedAttemptRef.current = attemptedQuestions;
    saveTriviaProgress(userId, xpSinceLastSave, accuracy, maxStreak)
      .then(() => {
        lastSavedXPRef.current = earnedXP;
      })
      .catch(() => {});
  }, [showResult, userId, attemptedQuestions, earnedXP, accuracy, maxStreak]);

  const submitAnswer = (answer: string) => {
    if (!currentQuestion || showResult || sessionComplete) return;

    const isCorrect = answer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();
    setSelectedAnswer(answer);
    setShowResult(true);

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setMaxStreak(Math.max(maxStreak, nextStreak));
      setCorrectAnswers((count) => count + 1);
      setSessionMessage('Wisdom flows — your answer is correct. Continue the sacred rhythm.');
    } else {
      setStreak(0);
      setSessionMessage(`A learning moment: the right answer is ${currentQuestion.answer}.`);
    }
  };

  const moveToNextQuestion = async () => {
    if (!currentQuestion) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      const loaded = await loadMoreQuestions();
      if (loaded) {
        setCurrentIndex(nextIndex);
        setSelectedAnswer('');
        setShowResult(false);
        setTimer(getBaseTime(difficulty));
        setSessionMessage('A fresh AI-generated question is ready.');
      }
      return;
    }

    setCurrentIndex(nextIndex);
    setSelectedAnswer('');
    setShowResult(false);
    setTimer(getBaseTime(difficulty));
    setSessionMessage('Move with intention into the next question.');
  };

  const resetSession = () => {
    setMode('Quick Trivia');
    setDifficulty('Easy'); // Reset to initial default difficulty
    setCategory('General Bible Knowledge'); // Reset to initial default category
    setSessionComplete(false);
    setSelectedAnswer('');
    setShowResult(false);
    setCorrectAnswers(0);
    setCurrentIndex(0);
    setProgressSaved(false);
    lastSavedAttemptRef.current = 0;
    lastSavedXPRef.current = 0;
    setTimer(getBaseTime('Easy')); // Use a valid TriviaLevel for getBaseTime
    setSessionMessage('Choose a sacred path and begin again.');
  };

  const challengeDateLabel = useMemo(() => {
    return challengeDate ? formatChallengeDate(challengeDate) : '...';
  }, [challengeDate]);

  return {
    availableModes,
    availableLevels,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    category,
    setCategory,
    questions,
    currentQuestion,
    currentIndex,
    progress,
    selectedAnswer,
    showResult,
    submitAnswer,
    moveToNextQuestion,
    resetSession,
    loadingQuestions,
    loadingNextQuestion,
    sessionMessage,
    sessionComplete,
    correctAnswers,
    streak,
    maxStreak,
    accuracy,
    timer,
    earnedXP,
    modeSummary,
    challengeDateLabel,
    attemptedQuestions,
  };
}

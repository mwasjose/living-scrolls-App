'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { QuizQuestion, QuizResponse, LessonQuiz } from '@/services/aiLessonGenerationService';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, Flag } from 'lucide-react';

interface LessonQuizProps {
  quiz: LessonQuiz;
  onSubmit?: (response: QuizResponse) => Promise<void>;
  lessonId: string;
  userId?: string;
}

export function LessonQuiz({ quiz, onSubmit, lessonId, userId }: LessonQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizScore, setQuizScore] = useState<{ score: number; percentScore: number } | null>(null);
  const [startTime] = useState(Date.now());

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const allAnswered = Object.keys(responses).length === quiz.questions.length;

  const handleAnswer = (answer: string | number) => {
    setResponses({
      ...responses,
      [currentQuestion.id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    let totalPoints = 0;

    quiz.questions.forEach((question) => {
      const userAnswer = responses[question.id];
      totalPoints += question.points;

      // Skip reflection and preference questions for scoring
      if (!question.isReflection && !question.isPreference) {
        if (userAnswer === question.correctAnswer) {
          score += question.points;
        }
      } else if (question.isReflection || question.isPreference) {
        // Award points for answering reflection/preference questions
        if (userAnswer !== undefined && userAnswer !== null && userAnswer !== '') {
          score += question.points;
        }
      }
    });

    return { score, percentScore: (score / totalPoints) * 100 };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { score, percentScore } = calculateScore();
      setQuizScore({ score, percentScore });

      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const quizResponse: QuizResponse = {
        id: `response-${Date.now()}`,
        userId: userId || 'anonymous',
        quizId: quiz.id,
        lessonId,
        responses: Object.entries(responses).map(([questionId, answer]) => ({
          questionId,
          answer: String(answer),
        })),
        score,
        percentScore,
        passed: percentScore >= quiz.passingScore,
        timeSpent,
        submittedAt: new Date(),
      };

      if (onSubmit) {
        await onSubmit(quizResponse);
      }

      setQuizComplete(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (quizComplete && quizScore) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[28px] border border-white/10 bg-gradient-to-br from-midnight/40 to-slate-900/30 p-8 space-y-6"
      >
        {/* Result header */}
        <div className="text-center space-y-4">
          {quizScore.percentScore >= quiz.passingScore ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white">Excellent Work!</h2>
              <p className="text-slate-300">You&apos;ve demonstrated strong understanding of this teaching.</p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <Flag className="mx-auto h-16 w-16 text-amber-400" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white">Keep Learning</h2>
              <p className="text-slate-300">Review the material and consider re-taking this quiz.</p>
            </>
          )}
        </div>

        {/* Score display */}
        <div className="rounded-[20px] bg-white/5 border border-white/10 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Your Score</span>
            <span className="text-4xl font-bold text-gold">{quizScore.percentScore.toFixed(0)}%</span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${quizScore.percentScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${
                quizScore.percentScore >= quiz.passingScore
                  ? 'bg-gradient-to-r from-green-500 to-green-400'
                  : 'bg-gradient-to-r from-amber-500 to-amber-400'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Points Earned</p>
              <p className="text-lg font-semibold text-white">{quizScore.score} / 100</p>
            </div>
            <div>
              <p className="text-slate-500">Passing Score</p>
              <p className="text-lg font-semibold text-white">{quiz.passingScore}</p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="rounded-[20px] bg-blue-500/10 border border-blue-500/20 p-5 space-y-3">
          <h3 className="font-semibold text-white">What to Do Next</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="text-blue-400">→</span>
              <span>Continue reflecting on the key takeaways from this lesson</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">→</span>
              <span>Write down personal insights in your spiritual journal</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">→</span>
              <span>Practice applying this teaching in your daily life</span>
            </li>
          </ul>
        </div>

        {/* Action button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.reload()}
          className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-slate-950 transition hover:bg-gold/90"
        >
          Return to Lesson
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-white/10 bg-gradient-to-br from-midnight/40 to-slate-900/30 p-8 space-y-8"
    >
      {/* Quiz header */}
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.16em] text-gold">Learning Check</p>
        <h2 className="text-2xl font-bold text-white">{quiz.title}</h2>
        <p className="text-slate-400">{quiz.description}</p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <span className="text-gold font-semibold">
            {Object.keys(responses).length} / {quiz.questions.length} answered
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-gold to-amber-400"
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Question text */}
          <div>
            <p className="text-lg font-semibold text-white">{currentQuestion.question}</p>
            {currentQuestion.isReflection && (
              <p className="mt-2 text-sm text-slate-400 italic">Share your personal reflection - no single correct answer.</p>
            )}
            {currentQuestion.isPreference && (
              <p className="mt-2 text-sm text-slate-400 italic">Choose the option that resonates most with you.</p>
            )}
          </div>

          {/* Answers */}
          {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full rounded-[16px] border-2 p-4 text-left transition ${
                    responses[currentQuestion.id] === idx
                      ? 'border-gold bg-gold/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        responses[currentQuestion.id] === idx
                          ? 'border-gold bg-gold'
                          : 'border-white/30'
                      }`}
                    >
                      {responses[currentQuestion.id] === idx && (
                        <div className="h-2 w-2 rounded-full bg-slate-950" />
                      )}
                    </div>
                    <span className="text-white">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {(currentQuestion.type === 'fill_blank' || currentQuestion.isReflection) && (
            <textarea
              value={(responses[currentQuestion.id] as string) || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full rounded-[16px] border border-white/10 bg-white/5 p-4 text-white placeholder-slate-500 outline-none transition focus:border-gold/50 focus:bg-white/10 resize-none"
              rows={4}
            />
          )}

          {/* Explanation (shown after answer selected) */}
          {responses[currentQuestion.id] !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[16px] bg-blue-500/10 border border-blue-500/20 p-4"
            >
              <p className="text-sm font-semibold text-blue-300 mb-2">Explanation</p>
              <p className="text-sm text-slate-300">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </motion.button>

        {isLastQuestion ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!allAnswered || isSubmitting}
            className="flex-1 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={responses[currentQuestion.id] === undefined}
            className="flex-1 rounded-full bg-gold px-6 py-3 font-semibold text-slate-950 transition hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

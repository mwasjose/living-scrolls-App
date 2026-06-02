'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AILesson } from '@/lib/models';
import { lessonService } from '@/services/lessonService';
import { getSimilarLessons } from '@/services/recommendationService';
import { ArrowLeft, Bookmark, BookmarkCheck, Share2, Copy, Check } from 'lucide-react';
import { LessonGrid } from '@/components/ai-lessons/LessonGrid';

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();

  const [lesson, setLesson] = useState<AILesson | null>(null);
  const [similarLessons, setSimilarLessons] = useState<AILesson[]>([]);
  const [allLessons, setAllLessons] = useState<AILesson[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load lesson
  useEffect(() => {
    const loadLesson = async () => {
      const lessonId = params.id as string;
      const [lessonData, allLessonsData] = await Promise.all([
        lessonService.getLessonById(lessonId),
        lessonService.getAllLessons(),
      ]);

      if (lessonData) {
        setLesson(lessonData);
        setAllLessons(allLessonsData);

        // Get similar lessons
        const similar = await getSimilarLessons(lessonData, allLessonsData, 4);
        setSimilarLessons(similar);

        // Increment view count
        await lessonService.incrementViewCount(lessonId);
      }
    };

    loadLesson();
  }, [params.id]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (!lesson) return;

    const shareText = `Check out this teaching: "${lesson.title}" - Living Scrolls`;
    const shareUrl = `${window.location.origin}/ai-lessons/${lesson.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: lesson.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (lesson) {
      setIsSaved(!isSaved);
      lessonService.incrementSaveCount(lesson.id);
    }
  };

  if (!lesson) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-pulse text-accent">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-6">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-amber-400 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: '0%' }}
      />

      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="rounded-full border border-border bg-card-soft p-3 text-white transition hover:bg-surface-soft hover:border-border"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Article</p>
          <h1 className="text-xl font-semibold text-white">{lesson.title}</h1>
        </div>
      </div>

      {/* Hero image */}
      {lesson.heroImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[32px] h-96 lg:h-[500px] relative"
        >
          <Image src={lesson.heroImage} alt={lesson.title} fill className="object-cover" />
        </motion.div>
      )}

      {/* Article content wrapper */}
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-12 lg:col-span-2"
        >
          {/* Title section */}
          <div className="space-y-4">
            <div className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {lesson.category}
            </div>

            <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
              {lesson.title}
            </h2>

            {lesson.subtitle && (
              <p className="text-xl font-light text-slate-300">{lesson.subtitle}</p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-border text-sm text-slate-400">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">Reading time</p>
                <p className="mt-1 text-white font-semibold">{lesson.readTime} minutes</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">Difficulty</p>
                <p className="mt-1 text-white font-semibold">{lesson.difficulty}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">Engagement</p>
                <p className="mt-1 text-white font-semibold">{(lesson.views ?? 0).toLocaleString()} views</p>
              </div>
            </div>
          </div>

          {/* Hero Scripture */}
          {lesson.heroScripture && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[24px] border-l-4 border-accent bg-accent-soft p-6"
            >
              <p className="font-semibold text-accent mb-2">{lesson.heroScripture}</p>
              {lesson.heroScriptureText && (
                <p className="text-lg italic text-slate-200">{lesson.heroScriptureText}</p>
              )}
            </motion.div>
          )}

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none space-y-8"
          >
            {lesson.introduction && (
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Introduction</h3>
                <p className="leading-relaxed text-slate-300">{lesson.introduction}</p>
              </section>
            )}

            {lesson.coreTeaching && (
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Core Teaching</h3>
                <p className="leading-relaxed text-slate-300">{lesson.coreTeaching}</p>
              </section>
            )}

            {lesson.scriptureInsight && (
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Scripture Insight</h3>
                <p className="leading-relaxed text-slate-300">{lesson.scriptureInsight}</p>
              </section>
            )}

            {lesson.lifeApplication && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[24px] bg-green-500/10 border border-green-500/20 p-6 space-y-4"
              >
                <h3 className="text-2xl font-bold text-white">Life Application</h3>
                <p className="leading-relaxed text-slate-300">{lesson.lifeApplication}</p>
              </motion.section>
            )}

            {lesson.prayerMeditation && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[24px] bg-purple-500/10 border border-purple-500/20 p-6 space-y-4"
              >
                <h3 className="text-2xl font-bold text-white">Prayer & Meditation</h3>
                <p className="leading-relaxed text-slate-300 italic">{lesson.prayerMeditation}</p>
              </motion.section>
            )}

            {lesson.spiritualEncouragement && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[24px] bg-amber-500/10 border border-amber-500/20 p-6 space-y-4"
              >
                <h3 className="text-2xl font-bold text-white">Spiritual Encouragement</h3>
                <p className="leading-relaxed text-slate-300">{lesson.spiritualEncouragement}</p>
              </motion.section>
            )}

            {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Key Takeaways</h3>
                <ul className="space-y-2">
                  {lesson.keyTakeaways.map((takeaway, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-3 text-slate-300"
                    >
                      <span className="mt-1 text-accent">✦</span>
                      <span>{takeaway}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            {lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Reflection Questions</h3>
                <ul className="space-y-3">
                  {lesson.reflectionQuestions.map((question, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="rounded-lg bg-card-soft p-4 text-slate-300 border border-border"
                    >
                      {idx + 1}. {question}
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}
          </motion.div>

          {/* Scripture references */}
          {lesson.scriptureReferences.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-border bg-card-soft p-6 space-y-4"
            >
              <h3 className="text-xl font-bold text-white">Scripture References</h3>
              <div className="space-y-2">
                {lesson.scriptureReferences.map((ref, idx) => (
                  <p key={idx} className="text-accent font-semibold">
                    {ref}
                  </p>
                ))}
              </div>
            </motion.section>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6 sticky top-6 h-fit"
        >
          {/* Actions */}
          <div className="rounded-[24px] border border-border bg-card-soft p-6 space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-slate-950 transition hover:bg-accent-soft"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-5 w-5" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-5 w-5" />
                  Save Article
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 rounded-full border border-border bg-card-soft px-6 py-3 font-semibold text-white transition hover:bg-surface-soft hover:border-border"
            >
              {copied ? <Check className="h-5 w-5 text-green-400" /> : <Share2 className="h-5 w-5" />}
              {copied ? 'Copied!' : 'Share'}
            </motion.button>
          </div>

          {/* Info card */}
          <div className="rounded-[24px] border border-border bg-card-soft p-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Category</p>
              <p className="mt-2 font-semibold text-white">{lesson.category}</p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">Engagement</p>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Views</span>
                  <span className="font-semibold text-white">{(lesson.views ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Saved</span>
                  <span className="font-semibold text-white">{(lesson.saves ?? 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {lesson.tags.length > 0 && (
              <div className="border-t border-border pt-4">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {lesson.tags.slice(0, 5).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300 border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.aside>
      </div>

      {/* Similar lessons */}
      {similarLessons.length > 0 && (
        <LessonGrid
          lessons={similarLessons}
          title="Related Teachings"
          subtitle="Continue your spiritual journey with similar wisdom"
          onSelectLesson={(lesson) => {
            lessonService.incrementViewCount(lesson.id);
            router.push(`/ai-lessons/${lesson.id}`);
          }}
          savedArticles={[]}
        />
      )}
    </div>
  );
}

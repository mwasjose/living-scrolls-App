'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Heart, Zap, MessageCircle } from 'lucide-react';
import { getCachedReflection, saveReflection } from '@/lib/torahReflectionService';
import { aiApiUrl } from '@/lib/aiConfig';

interface WordStudy {
  word: string;
  hebrew: string;
  transliteration: string;
  meaning: string;
  insight: string;
}

interface HebraicInsight {
  title: string;
  text: string;
  hebrew?: string;
  transliteration?: string;
}

interface AIReflection {
  summary: string;
  hebraicInsight: HebraicInsight;
  messianicConnection: string;
  lifeReflection: string;
  wordStudy: WordStudy[];
  prayer: string;
  reflectionQuestions: string[];
  crossReferences: string[];
}

interface AITorahReflectionProps {
  portionTitle: string;
  reference: string;
  scriptureText: string;
  aliyahLabel?: string;
  portionId?: string;
  aliyahId?: string;
}

export function AITorahReflection({
  portionTitle,
  reference,
  scriptureText,
  aliyahLabel,
  portionId,
  aliyahId,
}: AITorahReflectionProps) {
  const [reflection, setReflection] = useState<AIReflection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateReflection = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get cached reflection first
        if (portionId) {
          const cached = await getCachedReflection(portionId, aliyahId);
          if (cached) {
            setReflection(cached);
            setLoading(false);
            return;
          }
        }

        // Generate new reflection using a secure server endpoint.
        const response = await fetch(aiApiUrl('/api/torah/generate-reflection'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            portionTitle,
            reference,
            scriptureText,
            aliyahLabel,
            portionId,
            aliyahId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate reflection');
        }

        const data = await response.json();
        setReflection(data);

        if (portionId) {
          await saveReflection(portionId, data, aliyahId);
        }
      } catch (err) {
        setError((err as Error).message);
        console.error('Reflection generation error:', err);
      } finally {
        setLoading(false);
      }
    };

    generateReflection();
  }, [portionTitle, reference, scriptureText, aliyahLabel, portionId, aliyahId]);

  if (loading) {
    return (
      <div className="space-y-4 rounded-[28px] border border-bronze/15 bg-cream/95 p-6 shadow-soft">
        <div className="h-6 w-1/2 animate-pulse rounded-full bg-olive/10" />
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-olive/10" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-olive/10" />
        </div>
      </div>
    );
  }

  if (error || !reflection) {
    return (
      <div className="rounded-[28px] border border-bronze/15 bg-cream/95 p-6 text-deep shadow-soft">
        <p className="text-sm">Unable to generate reflection at this time.</p>
      </div>
    );
  }

  return (
    <article className="space-y-8 rounded-[32px] border border-gold/30 bg-gradient-to-br from-cream via-cream/90 to-olive/5 p-8 shadow-soft">
      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-olive">
          <BookOpen size={16} />
          Sacred Essence
        </p>
        <p className="text-lg leading-8 text-deep italic">&ldquo;{reflection.summary}&rdquo;</p>
      </motion.div>

      {/* Hebraic Insight */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[24px] border border-bronze/20 bg-cream/95 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb size={18} className="text-gold" />
            <h3 className="text-sm uppercase tracking-[0.28em] text-olive">Hebraic Insight</h3>
          </div>
          <div className="space-y-3">
            <h4 className="text-xl font-semibold text-deep">{reflection.hebraicInsight.title}</h4>
            {reflection.hebraicInsight.hebrew && (
              <p className="text-2xl font-serif text-bronze">{reflection.hebraicInsight.hebrew}</p>
            )}
            {reflection.hebraicInsight.transliteration && (
              <p className="text-sm font-medium text-olive/80 italic">{reflection.hebraicInsight.transliteration}</p>
            )}
            <p className="leading-7 text-deep/85">{reflection.hebraicInsight.text}</p>
          </div>
        </div>
      </motion.div>

      {/* Messianic Connection */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3 rounded-[24px] border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-6">
        <div className="flex items-center gap-2">
          <Heart size={18} className="text-gold" />
          <h3 className="text-sm uppercase tracking-[0.28em] text-deep">Messianic Connection</h3>
        </div>
        <p className="leading-8 text-deep/85">{reflection.messianicConnection}</p>
      </motion.div>

      {/* Life Reflection */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3">
        <h3 className="text-sm uppercase tracking-[0.28em] text-olive">For Your Life Today</h3>
        <div className="rounded-[24px] bg-cream/95 p-6">
          <p className="leading-8 text-deep/85">{reflection.lifeReflection}</p>
        </div>
      </motion.div>

      {/* Word Study */}
      {reflection.wordStudy.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-gold" />
            <h3 className="text-sm uppercase tracking-[0.28em] text-olive">Hebrew Word Study</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {reflection.wordStudy.map((word, idx) => (
              <div key={idx} className="rounded-[20px] border border-bronze/15 bg-cream/95 p-5">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-deep">{word.word}</p>
                  <p className="text-xl font-serif text-bronze">{word.hebrew}</p>
                  <p className="text-xs italic text-olive/75">{word.transliteration}</p>
                  <div className="space-y-2 border-t border-bronze/10 pt-3">
                    <p className="text-sm text-deep">
                      <span className="font-semibold">Meaning:</span> {word.meaning}
                    </p>
                    <p className="text-sm leading-6 text-deep/80">{word.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Prayer */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-[24px] bg-cream/95 p-6 italic">
        <p className="leading-8 text-deep/85">&ldquo;{reflection.prayer}&rdquo;</p>
      </motion.div>

      {/* Reflection Questions */}
      {reflection.reflectionQuestions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle size={18} className="text-gold" />
            <h3 className="text-sm uppercase tracking-[0.28em] text-olive">Reflection Questions</h3>
          </div>
          <div className="space-y-3">
            {reflection.reflectionQuestions.map((question, idx) => (
              <div key={idx} className="rounded-[20px] border border-bronze/12 bg-cream/95 p-4">
                <p className="text-sm leading-6 text-deep/85">
                  <span className="font-semibold text-olive">•</span> {question}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Cross References */}
      {reflection.crossReferences.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="space-y-3 rounded-[24px] border border-bronze/15 bg-cream/95 p-6">
          <h3 className="text-sm uppercase tracking-[0.28em] text-olive">Related Passages</h3>
          <ul className="space-y-2">
            {reflection.crossReferences.map((ref, idx) => (
              <li key={idx} className="text-sm text-deep/80">
                <span className="font-semibold text-bronze">{ref}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </article>
  );
}

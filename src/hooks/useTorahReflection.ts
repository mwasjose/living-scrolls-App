import { useState, useEffect } from 'react';
import { getCachedReflection, saveReflection } from '@/lib/torahReflectionService';
import { aiApiUrl } from '@/lib/aiConfig';

export interface TorahReflection {
  summary: string;
  hebraicInsight: {
    title: string;
    text: string;
    hebrew?: string;
    transliteration?: string;
  };
  messianicConnection: string;
  lifeReflection: string;
  wordStudy: Array<{
    word: string;
    hebrew: string;
    transliteration: string;
    meaning: string;
    insight: string;
  }>;
  prayer: string;
  reflectionQuestions: string[];
  crossReferences: string[];
}

interface UseTorahReflectionProps {
  portionTitle: string;
  reference: string;
  scriptureText: string;
  aliyahLabel?: string;
  portionId?: string;
  aliyahId?: string;
}

export function useTorahReflection({
  portionTitle,
  reference,
  scriptureText,
  aliyahLabel,
  portionId,
  aliyahId,
}: UseTorahReflectionProps) {
  const [reflection, setReflection] = useState<TorahReflection | null>(null);
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
          throw new Error('Unable to generate reflection.');
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

  return { reflection, loading, error };
}

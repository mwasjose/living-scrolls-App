import { useEffect, useState, useRef } from 'react';
import type { ScripturePassage, ScriptureVerse } from '@/lib/models';
import { emptyPassage, normalizeScriptureReference } from '@/lib/scripture';

// Basic in-memory cache for session-based performance
const scriptureCache = new Map<string, ScripturePassage>();

function buildFallbackPassage(reference: string, translation: string): ScripturePassage {
  const normalizedReference = normalizeScriptureReference(reference);
  const fallbackVerses: ScriptureVerse[] = [
    { bookName: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning Elohim created the heavens and the earth.' },
    { bookName: 'Genesis', chapter: 1, verse: 2, text: 'The earth was without form and void, and darkness was over the face of the deep.' },
    { bookName: 'Genesis', chapter: 1, verse: 3, text: 'And Elohim said, Let there be light, and there was light.' },
    { bookName: 'Genesis', chapter: 1, verse: 4, text: 'And Elohim saw that the light was good, and he separated the light from the darkness.' },
    { bookName: 'Genesis', chapter: 1, verse: 5, text: 'And Elohim called the light Day, and the darkness he called Night.' },
  ];

  const verses = normalizedReference.startsWith('Genesis 1')
    ? fallbackVerses
    : [
        { bookName: normalizedReference.split(' ')[0] || 'Scripture', chapter: 1, verse: 1, text: `The selected passage for ${normalizedReference} is currently unavailable from the live scripture source. This local reading preview lets you continue using the Bible reader and audio tools.` },
      ];

  return {
    reference: normalizedReference,
    translation,
    text: verses.map((verse) => `${verse.verse}. ${verse.text}`).join(' '),
    verses,
  };
}

export function useScripturePassage(reference: string, translation = 'kjv', enabled = true) {
  const [passage, setPassage] = useState<ScripturePassage>(() => {
    const cacheKey = `${reference}-${translation}`;
    return scriptureCache.get(cacheKey) || emptyPassage(reference, translation);
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!enabled || !reference) return;
    
    const cacheKey = `${reference}-${translation}`;
    if (scriptureCache.has(cacheKey)) {
      setPassage(scriptureCache.get(cacheKey)!);
      return;
    }

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ translation });
    const url = `https://bible-api.com/${encodeURIComponent(reference)}?${params.toString()}`;
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load Scripture text.');
        return response.json();
      })
      .then((data: ScripturePassage) => {
        scriptureCache.set(cacheKey, data);
        setPassage(data);
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        setError(err?.message || 'Unable to load Scripture text.');
        const fallbackPassage = buildFallbackPassage(reference, translation);
        scriptureCache.set(cacheKey, fallbackPassage);
        setPassage(fallbackPassage);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [enabled, reference, translation]);

  return { passage, loading, error };
}

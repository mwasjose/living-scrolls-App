'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronDown } from 'lucide-react';
import type { TorahAliyah } from '@/lib/models';
import { useScripturePassage } from '@/hooks/useScripturePassage';
import { ScriptureTextViewer } from '@/components/scripture/ScriptureTextViewer';
import { parseScriptureReferences, messianicNormalize } from '@/lib/scriptureParser';

interface ExpandableReadingCardProps {
  reading: TorahAliyah;
  active: boolean;
  translation?: string;
  completed?: boolean;
  onOpen: (id: string) => void;
  onToggleCompletion?: (id: string) => void;
}

const tabs = ['Scripture', 'Commentary', 'Transliteration', 'Study Notes', 'Background', 'Cross References'] as const;

export function ExpandableReadingCard({
  reading,
  active,
  translation = 'kjv',
  completed,
  onOpen,
  onToggleCompletion,
}: ExpandableReadingCardProps) {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Scripture');
  const { passage, loading } = useScripturePassage(reading.reference, translation, active);

  const notes = useMemo(
    () =>
      reading.studyNotes?.length
        ? reading.studyNotes
        : [
            'Read the passage aloud slowly and note repeated words, covenant actions, and turning points.',
            'Mark one verse for prayer and one verse for obedience before moving to the next reading.',
          ],
    [reading.studyNotes]
  );

  return (
    <article className="overflow-hidden rounded-[28px] border border-sacred bg-sacred-cream shadow-soft">
      <button
        type="button"
        onClick={() => onOpen(reading.id)}
        className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-olive/10 sm:flex-row sm:items-center sm:justify-between"
        aria-expanded={active}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-[0.24em] text-secondary">{reading.label}</span>
            {completed ? <CheckCircle2 className="text-secondary" size={16} /> : null}
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-sacred-primary">{messianicNormalize(reading.title || reading.reference)}</h3>
          <p className="mt-1 text-sm text-muted">{reading.reference}</p>
          {reading.hebrewName ? (
            <p className="mt-2 font-serif text-lg text-secondary">
              {reading.hebrewName} {reading.transliteration ? `- ${messianicNormalize(reading.transliteration)}` : ''}
            </p>
          ) : null}
        </div>
        <ChevronDown className={`shrink-0 text-secondary transition ${active ? 'rotate-180' : ''}`} size={22} />
      </button>

      <AnimatePresence initial={false}>
        {active ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="border-t border-sacred p-5">
              <p className="max-w-3xl text-sm leading-7 text-muted">{parseScriptureReferences(messianicNormalize(reading.summary))}</p>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
                {tabs.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setTab(item)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                      tab === item
                        ? 'border-bronze bg-gold text-deep'
                        : 'border-sacred bg-sacred-cream text-sacred-primary hover:bg-olive/10'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                {tab === 'Scripture' ? (
                  <ScriptureTextViewer passage={passage} loading={loading} storageKey={`reading:${reading.id}:${translation}`} />
                ) : null}
                {tab === 'Commentary' ? (
                  <div className="rounded-3xl border border-sacred bg-sacred-cream p-5 text-sm leading-7 text-sacred-primary">
                    {parseScriptureReferences(messianicNormalize(reading.commentary ||
                      'Observe how the passage advances covenant, holiness, worship, justice, or restoration. Let the plain reading lead before comparing interpretive traditions.'))}
                  </div>
                ) : null}
                {tab === 'Transliteration' ? (
                  <div className="rounded-3xl border border-sacred bg-sacred-cream p-5 text-sm leading-7 text-sacred-primary">
                    {reading.transliteration
                      ? `${reading.hebrewName || reading.label}: ${messianicNormalize(reading.transliteration)}`
                      : 'Hebrew transliteration is available when supplied by the reading source. Keep the reference open while studying key Hebrew terms below.'}
                  </div>
                ) : null}
                {tab === 'Study Notes' ? (
                  <div className="space-y-3 rounded-3xl border border-sacred bg-sacred-cream p-5">
                    {notes.map((note) => (
                      <p key={note} className="text-sm leading-7 text-sacred-primary">
                        {parseScriptureReferences(messianicNormalize(note))}
                      </p>
                    ))}
                  </div>
                ) : null}
                {tab === 'Background' ? (
                  <div className="rounded-3xl border border-sacred bg-sacred-cream p-5 text-sm leading-7 text-sacred-primary">
                    {parseScriptureReferences(messianicNormalize(reading.historicalBackground ||
                      'This reading belongs to the synagogue cycle of Torah reading, where each aliyah marks a public ascent into the text and a focused unit for communal listening.'))}
                  </div>
                ) : null}
                {tab === 'Cross References' ? (
                  <div className="flex flex-wrap gap-2 rounded-3xl border border-sacred bg-sacred-cream p-5">
                    {(reading.crossReferences?.length ? reading.crossReferences : ['Psalm 119:105', 'Luke 24:27', 'Romans 15:4']).map((ref) => (
                      <span key={ref} className="rounded-full bg-olive/10 px-3 py-1 text-sm text-sacred-primary">
                        {parseScriptureReferences(ref)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {onToggleCompletion ? (
                <button
                  type="button"
                  onClick={() => onToggleCompletion?.(reading.id)}
                  className="primary-button mt-5 gap-2 text-xs sm:text-sm"
                >
                  <BookOpen size={16} /> {completed ? 'Mark as incomplete' : 'Mark as complete'}
                </button>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Sparkles, Heart, Crosshair, HelpCircle, Flame, ExternalLink, Scroll, LucideIcon } from 'lucide-react'; // Use Scroll icon
import { parseScriptureReferences, messianicNormalize } from '@/lib/scriptureParser';
import { ScriptureTextViewer } from '@/components/scripture/ScriptureTextViewer'; // Import ScriptureTextViewer
import type { ScripturePassage } from '@/lib/models'; // Import ScripturePassage type

interface AliyahCommentaryProps {
  aliyahNumber: number;
  title: string;
  scripturePassage: ScripturePassage; // New prop
  scriptureLoading: boolean; // New prop
  data: {
    summary: string;
    hebraicInsight: { title: string; text: string; hebrew?: string; transliteration?: string };
    messianicConnection: string;
    lifeReflection: string;
    wordStudy: { word: string; hebrew: string; transliteration: string; meaning: string; insight: string }[];
    prayer: string;
    crossReferences: string[];
  };
}

export function AliyahCommentary({ aliyahNumber, title, data, scripturePassage, scriptureLoading }: AliyahCommentaryProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('scripture'); // Default to scripture

  const sections: {
    id: string;
    label: string;
    icon: LucideIcon;
    content: string;
    isScripture?: boolean;
    isWordStudy?: boolean;
    isRefs?: boolean;
    extra?: any;
  }[] = [
    { id: 'scripture', label: 'Scripture', icon: Scroll, content: '', isScripture: true },
    { id: 'summary', label: 'Summary', icon: BookOpen, content: data?.summary || '' },
    { id: 'insight', label: 'Hebraic Insight', icon: Flame, content: data?.hebraicInsight?.text || '', extra: data?.hebraicInsight },
    { id: 'messianic', label: 'Messianic Connection', icon: Sparkles, content: data?.messianicConnection || '' },
    { id: 'reflection', label: 'Life Reflection', icon: Heart, content: data?.lifeReflection || '' },
    { id: 'wordStudy', label: 'Hebrew Word Study', icon: HelpCircle, content: '', isWordStudy: true },
    { id: 'prayer', label: 'Prayer & Meditation', icon: Crosshair, content: data?.prayer || '' },
    { id: 'refs', label: 'Cross References', icon: ExternalLink, content: '', isRefs: true },
  ];

  const toggle = (id: string) => setExpandedSection(expandedSection === id ? null : id);

  return (
    <div className="my-8 rounded-2xl border border-sacred/10 bg-sacred-cream/30 backdrop-blur-md overflow-hidden shadow-soft">
      <div className="bg-gradient-to-r from-bronze/10 to-transparent p-6 border-b border-sacred/5">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze text-white text-xs font-bold">
            {aliyahNumber}
          </span>
          <h3 className="text-xl font-serif font-bold text-sacred-primary">{title}</h3>
        </div>
      </div>

      <div className="divide-y divide-sacred/5">
        {sections.map((section) => (
          <div key={section.id} className="group">
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-olive/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <section.icon size={18} className="text-bronze opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="font-serif font-semibold text-secondary uppercase tracking-wider text-xs">
                  {section.label}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence mode="wait">
              {expandedSection === section.id && (
                <motion.div
                  key={section.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-sacred-primary/90 leading-relaxed font-serif">
                    {section.isScripture ? ( // Render ScriptureTextViewer for the new section
                      <ScriptureTextViewer passage={scripturePassage} loading={scriptureLoading} storageKey={`aliyah-scripture-${aliyahNumber}`} />
                    ) : section.isWordStudy ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {(data.wordStudy || []).map((ws, i) => (
                          <div key={i} className="p-4 rounded-xl bg-olive/5 border border-olive/10">
                            <div className="flex justify-between items-baseline mb-2">
                              <span className="text-2xl font-hebrew">{ws.hebrew}</span>
                              <span className="text-xs font-bold text-bronze uppercase">{ws.transliteration}</span>
                            </div>
                            <p className="text-sm italic text-secondary mb-1">&ldquo;{ws.meaning}&rdquo;</p>
                            <p className="text-xs opacity-80">{parseScriptureReferences(messianicNormalize(ws.insight))}</p>
                          </div>
                        ))}
                      </div>
                    ) : section.isRefs ? (
                      <div className="flex flex-wrap gap-2">
                        {(data.crossReferences || []).map((ref, i) => (
                          <div key={i} className="px-3 py-1 rounded-full bg-sacred-cream border border-sacred/10 text-sm">
                            {parseScriptureReferences(ref)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {section.extra?.hebrew && (
                          <div className="text-center p-4 bg-olive/5 rounded-lg mb-4">
                            <div className="text-3xl font-hebrew mb-1">{section.extra.hebrew}</div>
                            <div className="text-xs text-bronze italic">{section.extra.transliteration}</div>
                          </div>
                        )}
                        <p className="first-letter:text-3xl first-letter:font-serif first-letter:mr-1 first-letter:float-left">
                          {parseScriptureReferences(messianicNormalize(section.content))}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
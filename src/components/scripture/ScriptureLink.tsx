'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScripturePassage } from '@/hooks/useScripturePassage';
import { X, Copy, ExternalLink, Share2, Loader2 } from 'lucide-react';

interface ScriptureLinkProps {
  reference: string;
  translation?: string;
}

export function ScriptureLink({ reference, translation = 'kjv' }: ScriptureLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { passage, loading, error } = useScripturePassage(reference, translation, isOpen);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!passage) return;
    const text = passage.verses.map(v => `${v.verse} ${v.text}`).join(' ');
    navigator.clipboard.writeText(`${text} (${reference} ${translation.toUpperCase()})`);
  };

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => !isOpen && setIsOpen(true)}
        className="inline font-bold text-bronze hover:text-gold transition-colors underline decoration-dotted underline-offset-4"
      >
        {reference}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay for mobile tap-away */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-deep/20 backdrop-blur-[2px] md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onMouseLeave={() => setIsOpen(false)}
              className="fixed inset-x-4 bottom-4 z-50 overflow-hidden rounded-2xl border border-sacred/20 bg-sacred-cream/95 shadow-2xl backdrop-blur-xl md:absolute md:inset-auto md:bottom-full md:left-1/2 md:-translate-x-1/2 md:mb-2 md:w-[400px]"
            >
              <div className="flex items-center justify-between border-b border-sacred/10 bg-sacred/5 p-3">
                <span className="font-serif text-sm font-bold text-sacred-primary">
                  {reference} <span className="text-[10px] uppercase opacity-60">({translation})</span>
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={handleCopy} className="p-1.5 hover:bg-olive/10 rounded-md transition-colors" title="Copy">
                    <Copy size={14} className="text-secondary" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-olive/10 rounded-md transition-colors">
                    <X size={14} className="text-secondary" />
                  </button>
                </div>
              </div>

              <div className="max-h-[300px] overflow-y-auto p-4 scrollbar-hide">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8 opacity-40">
                    <Loader2 className="animate-spin mb-2" size={20} />
                    <p className="text-xs italic">Unrolling the scrolls...</p>
                  </div>
                ) : error ? (
                  <p className="py-4 text-center text-xs text-red-500 italic">{error}</p>
                ) : (
                  <div className="space-y-3 font-serif">
                    {passage?.verses.map((verse) => (
                      <p key={verse.verse} className="text-sm leading-relaxed text-sacred-primary/90">
                        <sup className="mr-1 text-[10px] font-bold text-bronze">{verse.verse}</sup>
                        {verse.text}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 border-t border-sacred/10 bg-sacred/5 p-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-olive/10 py-1.5 text-[10px] font-bold uppercase tracking-wider text-olive hover:bg-olive/20 transition-colors">
                  <ExternalLink size={12} /> Full Chapter
                </button>
                <button className="flex items-center justify-center rounded-lg bg-olive/10 p-1.5 text-olive hover:bg-olive/20 transition-colors">
                  <Share2 size={12} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
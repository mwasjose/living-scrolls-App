'use client';

import { ExternalLink } from 'lucide-react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { TorahCommentaryItem, TorahPortionDetail, TorahAliyah } from '@/lib/models';

const AITorahReflection = dynamic(() => import('./AITorahReflection').then((m) => m.AITorahReflection), {
  loading: () => (
    <div className="space-y-4 rounded-[24px] border border-soft bg-surface p-6">
      <div className="h-6 w-1/2 animate-pulse rounded-full bg-surface-soft" />
      <div className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded-full bg-surface-soft" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-surface-soft" />
      </div>
    </div>
  ),
});

interface CommentarySectionProps {
  commentary: TorahCommentaryItem[];
  messianicConnections: string[];
  ntConnections: string[];
  portion?: TorahPortionDetail;
  activeAliyah?: TorahAliyah;
}

export function CommentarySection({ 
  commentary, 
  messianicConnections, 
  ntConnections,
  portion,
  activeAliyah,
}: CommentarySectionProps) {
  const isTorahOrgSource = (source: string) => source.includes('Torah.org');

  // Extract scripture text from the active aliyah or portion
  const getScriptureText = () => {
    if (activeAliyah?.data?.summary) {
      return activeAliyah.data.summary;
    }
    if (portion?.summary) {
      return portion.summary;
    }
    return '';
  };

  const scriptureText = getScriptureText();
  const shouldShowAI = portion && scriptureText;

  return (
    <section id="commentary" className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Commentary & reflection</p>
        <h2 className="section-title mt-3 text-3xl text-primary">AI-powered sacred study & article-style insights.</h2>
      </div>

      {/* AI Generated Reflection */}
      {shouldShowAI && (
        <div>
          <Suspense>
            <AITorahReflection
              portionTitle={portion.title}
              reference={portion.references}
              scriptureText={scriptureText}
              aliyahLabel={activeAliyah?.label}
              portionId={portion.id}
              aliyahId={activeAliyah?.id}
            />
          </Suspense>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          {commentary.map((item) => (
            <article key={item.id} className="space-y-4 border-t border-[var(--border-muted)] pt-6">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">{item.source}</p>
              <h3 className="mt-3 text-2xl font-semibold text-primary">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-secondary">{item.excerpt}</p>
              <div className="mt-5 rounded-3xl bg-[var(--surface)]/50 p-4 text-sm leading-7 text-secondary">
                {item.reflection}
              </div>
              {isTorahOrgSource(item.source) && (
                <a
                  href="https://www.torah.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg accent-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition hover:opacity-90"
                >
                  Read on Torah.org <ExternalLink size={14} />
                </a>
              )}
            </article>
          ))}
        </div>

        <aside className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">Brit Hadashah themes</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-secondary">
              {ntConnections.map((ref) => (
                <li key={ref} className="rounded-3xl bg-surface px-4 py-3">
                  <span className="font-semibold text-primary">{ref}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">Prophetic fulfillment</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-secondary">
              {messianicConnections.map((item) => (
                <li key={item} className="rounded-3xl bg-surface px-4 py-3">{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

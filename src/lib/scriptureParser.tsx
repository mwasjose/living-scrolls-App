import React from 'react';
import { ScriptureLink } from '@/components/scripture/ScriptureLink';

/**
 * Matches common Bible references:
 * - John 3:16
 * - Genesis 1:1-5
 * - 1 Corinthians 13:4
 * - Isaiah 53
 */
const SCRIPTURE_REGEX = /\b(?:(?:\d\s)?[A-Z][a-z]+)\s\d+(?::\d+(?:-\d+)?)?\b/g;

/**
 * Replaces plain text scripture references with Interactive ScriptureLink components.
 */
export function parseScriptureReferences(text: string) {
  if (!text) return null;

  const parts = text.split(SCRIPTURE_REGEX);
  const matches = text.match(SCRIPTURE_REGEX);

  if (!matches) return <span>{text}</span>;

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={`part-${i}`}>
          {part}
          {matches[i] && (
            <ScriptureLink reference={matches[i]} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Normalizes naming to Messianic standards
 */
export function messianicNormalize(text: string): string {
  return text
    .replace(/Jesus Christ/g, 'Yahshuah Messiah')
    .replace(/Jesus/g, 'Yahshuah')
    .replace(/Christ/g, 'Messiah')
    .replace(/Old Testament/g, 'Tanakh')
    .replace(/New Testament/g, 'Brit Chadashah')
    .replace(/God/g, 'Elohim')
    .replace(/Lord/g, 'Hashem')
    .replace(/Holy Spirit/g, 'Ruach HaKodesh');
}
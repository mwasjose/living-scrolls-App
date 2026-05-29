import type { ScripturePassage } from '@/lib/models';

export const BIBLE_BOOKS = [
  { name: 'Genesis', chapters: 50 },
  { name: 'Exodus', chapters: 40 },
  { name: 'Leviticus', chapters: 27 },
  { name: 'Numbers', chapters: 36 },
  { name: 'Deuteronomy', chapters: 34 },
  { name: 'Joshua', chapters: 24 },
  { name: 'Judges', chapters: 21 },
  { name: 'Ruth', chapters: 4 },
  { name: '1 Samuel', chapters: 31 },
  { name: '2 Samuel', chapters: 24 },
  { name: '1 Kings', chapters: 22 },
  { name: '2 Kings', chapters: 25 },
  { name: '1 Chronicles', chapters: 29 },
  { name: '2 Chronicles', chapters: 36 },
  { name: 'Ezra', chapters: 10 },
  { name: 'Nehemiah', chapters: 13 },
  { name: 'Esther', chapters: 10 },
  { name: 'Job', chapters: 42 },
  { name: 'Psalms', chapters: 150 },
  { name: 'Proverbs', chapters: 31 },
  { name: 'Ecclesiastes', chapters: 12 },
  { name: 'Song of Solomon', chapters: 8 },
  { name: 'Isaiah', chapters: 66 },
  { name: 'Jeremiah', chapters: 52 },
  { name: 'Lamentations', chapters: 5 },
  { name: 'Ezekiel', chapters: 48 },
  { name: 'Daniel', chapters: 12 },
  { name: 'Hosea', chapters: 14 },
  { name: 'Joel', chapters: 3 },
  { name: 'Amos', chapters: 9 },
  { name: 'Obadiah', chapters: 1 },
  { name: 'Jonah', chapters: 4 },
  { name: 'Micah', chapters: 7 },
  { name: 'Nahum', chapters: 3 },
  { name: 'Habakkuk', chapters: 3 },
  { name: 'Zephaniah', chapters: 3 },
  { name: 'Haggai', chapters: 2 },
  { name: 'Zechariah', chapters: 14 },
  { name: 'Malachi', chapters: 4 },
  { name: 'Matthew', chapters: 28 },
  { name: 'Mark', chapters: 16 },
  { name: 'Luke', chapters: 24 },
  { name: 'John', chapters: 21 },
  { name: 'Acts', chapters: 28 },
  { name: 'Romans', chapters: 16 },
  { name: '1 Corinthians', chapters: 16 },
  { name: '2 Corinthians', chapters: 13 },
  { name: 'Galatians', chapters: 6 },
  { name: 'Ephesians', chapters: 6 },
  { name: 'Philippians', chapters: 4 },
  { name: 'Colossians', chapters: 4 },
  { name: '1 Thessalonians', chapters: 5 },
  { name: '2 Thessalonians', chapters: 3 },
  { name: '1 Timothy', chapters: 6 },
  { name: '2 Timothy', chapters: 4 },
  { name: 'Titus', chapters: 3 },
  { name: 'Philemon', chapters: 1 },
  { name: 'Hebrews', chapters: 13 },
  { name: 'James', chapters: 5 },
  { name: '1 Peter', chapters: 5 },
  { name: '2 Peter', chapters: 3 },
  { name: '1 John', chapters: 5 },
  { name: '2 John', chapters: 1 },
  { name: '3 John', chapters: 1 },
  { name: 'Jude', chapters: 1 },
  { name: 'Revelation', chapters: 22 },
];

const BOOK_ALIASES: Record<string, string> = {
  Gen: 'Genesis',
  Exod: 'Exodus',
  Exo: 'Exodus',
  Lev: 'Leviticus',
  Num: 'Numbers',
  Deut: 'Deuteronomy',
  Josh: 'Joshua',
  Judg: 'Judges',
  '1Sam': '1 Samuel',
  '2Sam': '2 Samuel',
  '1Kgs': '1 Kings',
  '2Kgs': '2 Kings',
  Isa: 'Isaiah',
  Jer: 'Jeremiah',
  Ezek: 'Ezekiel',
  Hos: 'Hosea',
  Zech: 'Zechariah',
  Mal: 'Malachi',
  Matt: 'Matthew',
  Rom: 'Romans',
  Heb: 'Hebrews',
};

const EXTRA_BOOK_ALIASES: Record<string, string> = {
  '1Chr': '1 Chronicles',
  '2Chr': '2 Chronicles',
  Neh: 'Nehemiah',
  Esth: 'Esther',
  Ps: 'Psalms',
  Psa: 'Psalms',
  Prov: 'Proverbs',
  Eccl: 'Ecclesiastes',
  Song: 'Song of Solomon',
  Lam: 'Lamentations',
  Obad: 'Obadiah',
  Mic: 'Micah',
  Nah: 'Nahum',
  Hab: 'Habakkuk',
  Zeph: 'Zephaniah',
  Hag: 'Haggai',
  Mk: 'Mark',
  Lk: 'Luke',
  Jn: 'John',
  '1Cor': '1 Corinthians',
  '2Cor': '2 Corinthians',
  Gal: 'Galatians',
  Eph: 'Ephesians',
  Phil: 'Philippians',
  Col: 'Colossians',
  '1Thess': '1 Thessalonians',
  '2Thess': '2 Thessalonians',
  '1Tim': '1 Timothy',
  '2Tim': '2 Timothy',
  Phlm: 'Philemon',
  Jas: 'James',
  '1Pet': '1 Peter',
  '2Pet': '2 Peter',
  '1John': '1 John',
  '2John': '2 John',
  '3John': '3 John',
  Rev: 'Revelation',
};

export function normalizeBibleReference(reference: string) {
  let normalized = reference.replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
  normalized = normalized.replace(/\b([1-3]?\s?[A-Za-z]+)\.\s+/g, (_, book: string) => {
    const key = book.replace(/\s+/g, '');
    return `${BOOK_ALIASES[key] || BOOK_ALIASES[book] || book} `;
  });
  return normalized;
}

export function buildChapterReference(book: string, chapter: number) {
  return `${book} ${chapter}`;
}

export function normalizeScriptureReference(reference: string) {
  const aliases = { ...BOOK_ALIASES, ...EXTRA_BOOK_ALIASES };
  let normalized = reference
    .replace(/[\u2012\u2013\u2014\u2015]/g, '-')
    .replace(/[.;]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  normalized = normalized.replace(/\b([1-3]?\s?[A-Za-z]+)\.\s*/g, (_, book: string) => {
    const key = book.replace(/\s+/g, '');
    return `${aliases[key] || aliases[book] || book} `;
  });

  normalized = normalized.replace(/^([1-3])\s+([A-Za-z]+)/, (_, number: string, book: string) => {
    const key = `${number}${book}`;
    return aliases[key] || `${number} ${book}`;
  });

  return normalized;
}

export function emptyPassage(reference: string, translation: string): ScripturePassage {
  return {
    reference,
    translation,
    text: '',
    verses: [],
  };
}

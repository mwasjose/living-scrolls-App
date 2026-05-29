const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\HP\\Documents\\Website\\Living Scrolls';

// Fix page-avast.tsx
const avastPath = path.join(baseDir, 'src/app/page-avast.tsx');
console.log('Reading:', avastPath);
let content = fs.readFileSync(avastPath, 'utf8');

// Replace unescaped quotes on line 93
content = content.replace(
  /"Your word is a lamp to my feet and a light to my path\."/g,
  '&quot;Your word is a lamp to my feet and a light to my path.&quot;'
);

// Replace unescaped apostrophe on line 97
content = content.replace(/day's/g, "day&apos;s");

fs.writeFileSync(avastPath, content, 'utf8');
console.log('Fixed page-avast.tsx');

// Fix verse-card.tsx
const versePath = path.join(baseDir, 'src/components/cards/verse-card.tsx');
console.log('Reading:', versePath);
let verseContent = fs.readFileSync(versePath, 'utf8');
verseContent = verseContent.replace(/"{text}"/g, '&quot;{text}&quot;');
fs.writeFileSync(versePath, verseContent, 'utf8');
console.log('Fixed verse-card.tsx');

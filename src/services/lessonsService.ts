import type { AILesson } from '@/lib/models';

// Local expanded lesson database
const localLessons: AILesson[] = [
  {
    id: 'faith-motion',
    title: 'Faith in Motion',
    category: 'Faith',
    excerpt: 'Reflect on intimate trust and the call to walk in obedience.',
    content: 'Faith is not a static state but a living, dynamic relationship with the Divine. When we speak of faith in motion, we mean the active trust that propels us forward in obedience, even when the path is unclear. This lesson explores how Abraham left his homeland, how Miriam sang at the Red Sea, and how Yahshuah calls us to follow Him in radical surrender.',
    source: 'Living Scrolls',
    tags: ['faith', 'trust', 'obedience', 'journey'],
    difficulty: 'Intermediate',
    readTime: 8,
    scriptureReferences: ['Genesis 12:1-4', 'Exodus 14:31', 'Luke 5:1-11'],
    messianicInsight: 'Yahshuah embodies perfect faith in the Father, leading us to trust in His redemptive plan.',
    recommendedFor: ['seekers', 'daily-reader'],
  },
  {
    id: 'torah-wisdom',
    title: 'Torah Wisdom',
    category: 'Wisdom',
    excerpt: 'Receive insight from ancient instruction for your daily life.',
    content: 'The Torah is not merely historical narrative—it is living instruction (Torah means "teaching" or "law"). Each portion contains profound wisdom applicable to our modern lives. From the creation account to the wilderness wanderings, we find patterns of relationship, covenant, and redemption that speak directly to our contemporary struggles and triumphs.',
    source: 'Living Scrolls',
    tags: ['torah', 'wisdom', 'instruction', 'covenant'],
    difficulty: 'Beginner',
    readTime: 10,
    scriptureReferences: ['Psalm 119:105', 'Proverbs 22:12', 'Deuteronomy 6:4-9'],
    messianicInsight: 'Yahshuah affirmed that all Scripture points to Him and His redemptive work.',
    recommendedFor: ['daily-reader', 'scholar'],
  },
  {
    id: 'prayer-awakens',
    title: 'Prayer that Awakens',
    category: 'Prayer',
    excerpt: 'Explore prayer patterns shaped by the Messianic heart.',
    content: 'Prayer is not a monologue but an intimate conversation with the Creator. Throughout Scripture, we see diverse prayer forms: petition, lament, intercession, thanksgiving, and silence. This lesson examines how prayer awakens our spiritual senses and aligns our hearts with Adonai\'s purposes, transforming us from within.',
    source: 'Living Scrolls',
    tags: ['prayer', 'meditation', 'intercession', 'transformation'],
    difficulty: 'Intermediate',
    readTime: 12,
    scriptureReferences: ['Psalm 42:1-2', 'Matthew 6:9-13', '1 Thessalonians 5:17'],
    messianicInsight: 'Yahshuah\'s prayers reveal His intimate communion with the Father and model intercession for believers.',
    recommendedFor: ['daily-reader', 'prayer-warrior'],
  },
  {
    id: 'hebrew-roots',
    title: 'Hebrew Roots of Faith',
    category: 'Hebrew',
    excerpt: 'Discover the spiritual depth hidden in Hebrew letters and words.',
    content: 'Hebrew is not merely a language—it is a key that unlocks deeper spiritual meaning in Scripture. The letters themselves carry significance; the root system of Hebrew words reveals layers of meaning. When we study words like "Shalom" (peace, wholeness), "Teshuvah" (repentance, return), and "Chesed" (covenant love), we encounter dimensions of truth that English translations alone cannot fully convey.',
    source: 'Living Scrolls',
    tags: ['hebrew', 'language', 'meaning', 'scripture'],
    difficulty: 'Advanced',
    readTime: 15,
    scriptureReferences: ['Psalm 119:89-96', 'Isaiah 40:8', 'Proverbs 8:1-11'],
    messianicInsight: 'The Word (Dabar) in Hebrew encompasses both the spoken word and the active fulfillment of God\'s purpose.',
    recommendedFor: ['scholar', 'hebrew-student'],
  },
  {
    id: 'covenant-journey',
    title: 'Living Covenant',
    category: 'Covenant',
    excerpt: 'Understand the structure and beauty of God\'s covenants with His people.',
    content: 'God\'s relationship with humanity is founded on covenants—binding agreements that reveal His character and our calling. From Adam to Noah, from Abraham to Sinai, from David to the Messiah, each covenant deepens our understanding of God\'s steadfast love and our place in His eternal story. This lesson traces the covenantal arc from Genesis to Revelation.',
    source: 'Living Scrolls',
    tags: ['covenant', 'relationship', 'redemption', 'promise'],
    difficulty: 'Intermediate',
    readTime: 14,
    scriptureReferences: ['Genesis 15:18-21', 'Exodus 19:3-8', 'Jeremiah 31:31-34', 'Hebrews 8:1-13'],
    messianicInsight: 'Yahshuah embodies and fulfills the New Covenant, writing God\'s law on our hearts.',
    recommendedFor: ['daily-reader', 'scholar', 'spiritual-growth'],
  },
  {
    id: 'messianic-prophecy',
    title: 'Messianic Prophecy Fulfilled',
    category: 'Messianic',
    excerpt: 'Trace the unfolding promises that culminate in Yahshuah Messiah.',
    content: 'From the seed of the woman in Genesis to the suffering servant of Isaiah, from the royal promises to David to the priestly order of Melchizedek, Scripture weaves a singular story pointing to Yahshuah. This lesson explores how Old Testament prophecies find their fulfillment in the life, death, and resurrection of the Messiah, and what this means for believers today.',
    source: 'Living Scrolls',
    tags: ['prophecy', 'messiah', 'fulfillment', 'redemption'],
    difficulty: 'Advanced',
    readTime: 16,
    scriptureReferences: ['Genesis 3:15', 'Isaiah 53:1-12', 'Psalm 22:1-31', 'Luke 24:25-27'],
    messianicInsight: 'Every Scripture is woven into the tapestry of Messianic redemption.',
    recommendedFor: ['scholar', 'spiritual-growth'],
  },
  {
    id: 'spiritual-disciplines',
    title: 'Sacred Rhythms and Disciplines',
    category: 'Spiritual Growth',
    excerpt: 'Build spiritual practices that nurture your soul and deepen communion with God.',
    content: 'Spiritual formation happens through intentional practices and disciplines. Sabbath rest, fasting, generosity, solitude, and study are not burdensome obligations but invitations to deeper intimacy with the Divine. This lesson examines how classical spiritual disciplines align with Torah patterns and transform us into the likeness of Messiah.',
    source: 'Living Scrolls',
    tags: ['discipline', 'practice', 'transformation', 'sabbath'],
    difficulty: 'Beginner',
    readTime: 11,
    scriptureReferences: ['Exodus 20:8-11', 'Isaiah 58:6-12', '1 Timothy 4:7-8', 'Colossians 3:12-17'],
    messianicInsight: 'Yahshuah embodied all spiritual disciplines, demonstrating their transformative power.',
    recommendedFor: ['daily-reader', 'spiritual-growth', 'beginner'],
  },
];

// Fetch lessons from Torah.org (using web scraping pattern with fallback to curated links)
async function fetchTorahOrgLessons(): Promise<AILesson[]> {
  // Torah.org doesn't have a public API, so we create curated lessons that link to their content
  const torahOrgLessons: AILesson[] = [
    {
      id: 'torah-org-parsha',
      title: 'Weekly Parsha Insights from Torah.org',
      category: 'Wisdom',
      excerpt: 'Deep Torah commentary from Ohr Somayach and other Torah.org educators.',
      content: 'Torah.org hosts comprehensive weekly parsha (Torah portion) commentary from leading Jewish educators. Each week features multiple perspectives on the Torah reading, including mystical insights, ethical teachings, and practical applications for modern life.',
      source: 'Torah.org',
      sourceUrl: 'https://www.torah.org/parsha/',
      tags: ['parsha', 'weekly', 'commentary', 'torah'],
      difficulty: 'Intermediate',
      readTime: 20,
      scriptureReferences: ['All Torah portions'],
      recommendedFor: ['daily-reader', 'scholar'],
    },
    {
      id: 'torah-org-basics',
      title: 'Judaism Basics from Torah.org',
      category: 'Faith',
      excerpt: 'Foundational teachings on Jewish faith and practice.',
      content: 'Torah.org\'s "Judaism Basics" section provides clear, accessible introductions to core concepts of Jewish faith: God\'s existence, revelation, the mitzvot (commandments), and the Jewish life cycle. Perfect for those new to Torah study or seeking foundational understanding.',
      source: 'Torah.org',
      sourceUrl: 'https://www.torah.org/basics/',
      tags: ['basics', 'faith', 'jewish-practice'],
      difficulty: 'Beginner',
      readTime: 15,
      scriptureReferences: ['Deuteronomy 6:4', 'Exodus 20:1-17'],
      recommendedFor: ['beginner', 'seeker'],
    },
  ];
  return torahOrgLessons;
}

// Fetch lessons from Cogmers (Messianic community focus)
async function fetchCogersMersLessons(): Promise<AILesson[]> {
  // Cogmers.church focuses on Messianic teachings and Hebrew Christianity
  const cogersMersLessons: AILesson[] = [
    {
      id: 'cogmers-messianic',
      title: 'Messianic Foundations from Cogmers',
      category: 'Messianic',
      excerpt: 'Understanding Yahshuah in the context of Torah and Jewish tradition.',
      content: 'Cogmers Church emphasizes the Messianic understanding of Scripture, showing how Yahshuah fulfills Torah patterns and promises. Their teaching integrates Hebrew Christian perspective with passionate faith in the Messiah.',
      source: 'Cogmers',
      sourceUrl: 'https://cogmers.church',
      tags: ['messianic', 'yahshuah', 'hebrew', 'faith'],
      difficulty: 'Intermediate',
      readTime: 18,
      scriptureReferences: ['Isaiah 53', 'Luke 24:44-47', 'Romans 10:4'],
      messianicInsight: 'Cogmers teaches that understanding Yahshuah requires understanding His Jewish context and fulfillment of Torah.',
      recommendedFor: ['spiritual-growth', 'messianic-seeker'],
    },
    {
      id: 'cogmers-hebrew-thought',
      title: 'Hebrew Thinking and Worldview',
      category: 'Hebrew',
      excerpt: 'Shift from Greek philosophical categories to Hebrew ways of thinking.',
      content: 'Western Christianity often filters Scripture through Greek philosophical lenses. Cogmers teaches how to recover Hebrew thought patterns—concrete, relational, kingdom-focused—that reveal Scripture\'s deeper meanings and transform how we read God\'s Word.',
      source: 'Cogmers',
      sourceUrl: 'https://cogmers.church',
      tags: ['hebrew', 'worldview', 'thinking', 'culture'],
      difficulty: 'Advanced',
      readTime: 20,
      scriptureReferences: ['Proverbs 23:7', 'Colossians 2:6-8', '1 Corinthians 1:20-31'],
      messianicInsight: 'Yahshuah taught and thought in Hebrew categories; recovering them transforms our discipleship.',
      recommendedFor: ['scholar', 'hebrew-student', 'spiritual-growth'],
    },
  ];
  return cogersMersLessons;
}

// Combined lesson fetching
export async function getAllLessons(): Promise<AILesson[]> {
  try {
    const torahOrgLessons = await fetchTorahOrgLessons();
    const cogersMersLessons = await fetchCogersMersLessons();
    return [...localLessons, ...torahOrgLessons, ...cogersMersLessons];
  } catch (error) {
    console.warn('Error fetching external lessons, returning local lessons only', error);
    return localLessons;
  }
}

// Search lessons
export function searchLessons(query: string, lessons: AILesson[]): AILesson[] {
  if (!query.trim()) return lessons;
  
  const lowerQuery = query.toLowerCase();
  return lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(lowerQuery) ||
    lesson.excerpt.toLowerCase().includes(lowerQuery) ||
    lesson.category.toLowerCase().includes(lowerQuery) ||
    lesson.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
    lesson.content.toLowerCase().includes(lowerQuery)
  );
}

// Filter lessons by category
export function filterByCategory(category: string, lessons: AILesson[]): AILesson[] {
  if (!category) return lessons;
  return lessons.filter((lesson) => lesson.category === category);
}

// Filter lessons by difficulty
export function filterByDifficulty(difficulty: string, lessons: AILesson[]): AILesson[] {
  if (!difficulty) return lessons;
  return lessons.filter((lesson) => lesson.difficulty === difficulty);
}

// Get recommended lessons based on user interests
export function getRecommendedLessons(userInterests: string[], lessons: AILesson[], limit: number = 3): AILesson[] {
  const scored = lessons.map((lesson) => {
    let score = 0;
    if (userInterests.some((interest) => lesson.recommendedFor?.includes(interest))) {
      score += 2;
    }
    if (userInterests.some((interest) => lesson.tags.includes(interest))) {
      score += 1;
    }
    return { lesson, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.lesson);
}

// Get lesson by ID
export function getLessonById(id: string, lessons: AILesson[]): AILesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

// Get related lessons
export function getRelatedLessons(lessonId: string, lessons: AILesson[], limit: number = 3): AILesson[] {
  const currentLesson = getLessonById(lessonId, lessons);
  if (!currentLesson) return [];

  const related = lessons
    .filter((lesson) => lesson.id !== lessonId)
    .map((lesson) => {
      let score = 0;
      if (lesson.category === currentLesson.category) score += 2;
      if (lesson.tags.some((tag) => currentLesson.tags.includes(tag))) score += 1;
      if (lesson.difficulty === currentLesson.difficulty) score += 1;
      return { lesson, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.lesson);

  return related;
}

// Get random lesson (for daily recommendation)
export function getRandomLesson(lessons: AILesson[]): AILesson | undefined {
  return lessons[Math.floor(Math.random() * lessons.length)];
}

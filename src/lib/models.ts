export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  wisdomXP: number; // Total XP earned
  streakDays: number; // Consecutive days of engagement
  level: number; // Spiritual level
  wisdomTitle?: string; // Achieved spiritual title
  badges: string[];
  readingProgress: Record<string, number>;
  activeReadingPlan?: ReadingPlanType;
  readingPlans?: Record<string, ReadingPlanProgress>;
  journalEntries?: SpiritualJournalEntry[];
  notifications?: SpiritualNotification[];
  prayerConsistency?: Record<string, boolean>; // Date string -> true/false
  torahReadingProgress?: Record<string, number>; // Torah portion ID -> progress %
  memorizationProgress?: Record<string, number>; // Verse ID -> mastery %
  disciplineTracker?: Record<string, Record<string, boolean>>; // Discipline -> Date string -> true/false
  lastReflectionDate?: number; // Timestamp of last journal entry
  dailyMissionsCompleted?: string[]; // IDs of completed daily missions
  
  // Lessons and Articles
  savedArticles?: string[]; // Article IDs
  completedLessons?: string[]; // Lesson IDs
  favoriteLessonCategories?: LessonCategory[];
  lessonReadingHistory?: string[]; // Article IDs in order of reading
  lessonEngagement?: Record<string, LessonEngagement>; // Article ID -> engagement data
  lessonStreakDays?: number;
  lastLessonReadDate?: string;
}



export interface TriviaQuestion {
  id: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Simple' | 'Scholar';
  type?: 'multiple_choice' | 'fill_blank' | 'root_match' | 'ordering';
  level?: 'Easy' | 'Medium' | 'Hard' | 'Beginner' | 'Disciple' | 'Scribe' | 'Watchman' | 'Scroll Guardian';
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  hebrewContext?: string;
  scriptureReference?: string;
  hint?: string;
  teaching?: string;
  torahConnection?: string;
  messianicInsight?: string;
  xp?: number;
}

export interface TorahAliyah {
  id: string;
  label: string;
  title?: string;
  reference: string;
  verses: string;
  summary: string;
  hebrewName?: string;
  transliteration?: string;
  commentary?: string;
  data?: {
    summary: string;
    hebraicInsight: { title: string; text: string; hebrew?: string; transliteration?: string };
    messianicConnection: string;
    lifeReflection: string;
    wordStudy: { word: string; hebrew: string; transliteration: string; meaning: string; insight: string }[];
    prayer: string;
    crossReferences: string[];
  };
  studyNotes?: string[];
  historicalBackground?: string;
  crossReferences?: string[];
  completed?: boolean;
}

export interface ScriptureVerse {
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface ScripturePassage {
  reference: string;
  translation: string;
  text: string;
  verses: ScriptureVerse[];
}

export interface TorahCommentaryItem {
  id: string;
  source: string;
  title: string;
  excerpt: string;
  reflection: string;
}

export interface TorahHebrewKeyword {
  id: string;
  letter: string;
  word: string;
  transliteration: string;
  meaning: string;
  root: string;
  morphology: string;
}

export interface TorahPortionDetail {
  id: string;
  title: string;
  hebrewTitle: string;
  transliteration: string;
  references: string;
  cycleProgress: string;
  summary: string;
  themes: string[];
  haftarah: string;
  maftir: string;
  aliyot: TorahAliyah[];
  commentary: TorahCommentaryItem[];
  keywords: TorahHebrewKeyword[];
  ntConnections: string[];
  messianicConnections: string[];
  readingProgress: number;
}

export interface TorahPortion {
  id: string;
  name: string;
  week: string;
  reading: string;
  haftarah: string;
  messianicConnection: string;
}

export interface LearningCard {
  id: string;
  title: string;
  description: string;
  progress: number;
}

export interface HebrewWord {
  id: string;
  hebrew: string;
  transliteration: string;
  meaning: string;
  category: string;
}

export interface JournalEntry {
  id?: string;
  userId: string;
  date: string; // YYYY-MM-DD
  reflection: string;
  gratitude: string;
  prayer: string;
  scripture: string;
  mood: 'joyful' | 'peaceful' | 'grateful' | 'reflective' | 'challenged' | 'other';
  createdAt: any; // Firestore Timestamp
}

export interface MemorizationVerse {
  id: string;
  category: 'Torah' | 'Psalms' | 'Wisdom' | 'Prophecy' | 'Teachings of Yahshuah';
  verse: string;
  text: string;
  reference: string;
  hebrewText?: string;
  masteryLevel?: number; // 0-100
  lastReviewed?: any; // Firestore Timestamp
}

export type LessonCategory = 
  | 'Faith & Growth'
  | 'Prayer & Devotion'
  | 'Relationships'
  | 'Youth Teachings'
  | 'Spiritual Warfare'
  | 'Wisdom & Discipline'
  | 'Leadership'
  | 'Purpose & Calling'
  | 'Healing & Encouragement'
  | 'Worship'
  | 'Identity in Elohim'
  | 'Mental Strength'
  | 'Daily Inspiration'
  | 'Character Development'
  | 'Biblical Lifestyle'
  | 'Spiritual Maturity'
  | 'Torah & Wisdom'
  | 'End Times & Prophecy'
  | 'Family & Marriage'
  | 'Calling & Ministry'
  | 'Overcoming Temptation'
  | 'Discipleship'
  | 'Biblical Leadership'
  | 'Messianic Teachings';

export interface AILesson {
  id: string;
  title: string;
  subtitle?: string;
  category: LessonCategory;
  excerpt: string;
  heroScripture: string;
  heroScriptureText?: string;
  content: string;
  htmlContent?: string; // Rich HTML content for reading page
  source: 'Torah.org' | 'Cogmers' | 'Living Scrolls' | 'Sefaria' | 'AI-Generated';
  sourceUrl?: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: number; // in minutes
  scriptureReferences: string[];
  messianicInsight?: string;
  recommendedFor?: string[]; // user interests/paths
  
  // Hero and Media
  heroImage?: string;
  heroImageAlt?: string;
  
  // Detailed Content Structure
  introduction?: string;
  coreTeaching?: string;
  scriptureInsight?: string;
  lifeApplication?: string;
  reflectionQuestions?: string[];
  prayerMeditation?: string;
  keyTakeaways?: string[];
  spiritualEncouragement?: string;
  suggestedNextStudy?: string;
  relatedArticles?: string[]; // Article IDs
  
  // Series and Progression
  seriesId?: string;
  seriesTitle?: string;
  lessonNumber?: number;
  isPartOfSeries?: boolean;
  nextLessonId?: string;
  previousLessonId?: string;
  
  // Engagement
  views: number;
  saves: number;
  shares: number;
  averageRating?: number;
  userRating?: number; // 1-5
  
  // AI and Personalization
  generatedBy?: 'user-request' | 'ai-automated' | 'human-curated';
  isAIGenerated: boolean;
  aiPrompt?: string; // The prompt used to generate
  personalizedFor?: string[]; // User IDs
  
  // Metadata
  isFeature?: boolean;
  isPinned?: boolean;
  isTrending?: boolean;
  createdAt?: any; // Firestore Timestamp
  updatedAt?: any; // Firestore Timestamp
  publishedAt?: any;
}

export interface LessonSeries {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  lessons: string[]; // AILesson IDs in order
  totalLessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon?: string;
  coverImage?: string;
  spiritualTheme: string;
  estimatedCompletionTime: string; // "4 weeks", "8 hours", etc.
  createdAt?: any;
  updatedAt?: any;
}

export interface SavedArticle {
  id: string;
  userId: string;
  articleId: string;
  article: AILesson;
  savedAt: any;
  notes?: string;
  highlighted?: string[];
  readingProgress?: number; // percentage
  isRead: boolean;
  readAt?: any;
}

export interface LessonEngagement {
  id: string;
  userId: string;
  articleId: string;
  views: number;
  timeSpent: number; // seconds
  completed: boolean;
  completedAt?: any;
  highlighted: string[];
  notes: string[];
  quizAnswers?: Record<string, string>; // question ID -> answer
  quizScore?: number;
  reflectionSubmitted: boolean;
  reflectionText?: string;
  createdAt: any;
  updatedAt: any;
}

export interface LessonCategoryObject {
  id: string;
  name: LessonCategory;
  description: string;
  icon?: string;
  color?: string;
  articleCount: number;
  spiritualFocus?: string;
}

// ============ SACRED READING PLANS SYSTEM ============

export type ReadingPlanType =
  | 'torah-cycle'
  | 'one-year-bible'
  | '30-day-psalms'
  | 'gospel-journey'
  | 'proverbs-wisdom'
  | 'messianic-prophecies'
  | 'shabbat-preparation'
  | 'feasts-of-adonai'
  | 'hebrew-word-journey';

export interface ReadingPlan {
  id: string;
  type: ReadingPlanType;
  title: string;
  hebrewTitle?: string;
  transliteration?: string;
  description: string;
  spiritualFocus: string;
  duration: string; // "8 weeks", "52 weeks", etc.
  readingPace: string; // "1 portion per week", "1 chapter per day"
  difficulty: 'Gentle' | 'Moderate' | 'Intensive';
  icon: string; // emoji or icon identifier
  artwork?: string; // image URL
  color: string; // accent color
  totalDays: number;
  readings: ReadingDay[];
  createdAt?: any;
}

export interface ReadingDay {
  id: string;
  dayNumber: number;
  date?: string; // YYYY-MM-DD
  title: string;
  scriptureReference: string;
  scripturePassage: ScripturePassage;
  theme?: string;
  hebrewInsight?: {
    word: string;
    hebrew: string;
    transliteration: string;
    meaning: string;
    spiritualInsight: string;
  };
  messianicConnection?: string;
  reflectionPrompt: string;
  completed: boolean;
  completedAt?: any;
}

export interface DailyReading {
  id: string;
  planId: string;
  dayNumber: number;
  date: string; // YYYY-MM-DD
  scriptureReference: string;
  scriptureText: string;
  theme: string;
  
  // AI-Generated Content
  devotionalCommentary: string;
  hebraicContext: string;
  messianicConnection: string;
  wordStudy: {
    word: string;
    hebrew: string;
    transliteration: string;
    meaning: string;
    spiritualSignificance: string;
  };
  
  // Reflection Framework
  reflectionPrompt: string;
  lifeApplication: string;
  prayerSuggestion: string;
  
  // User Engagement
  userReflection?: string;
  userNotes?: string;
  bookmarked?: boolean;
  highlighted?: string[]; // verse ranges
  completed: boolean;
  completedAt?: any;
  
  createdAt: any;
}

export interface SpiritualJournalEntry {
  id: string;
  userId: string;
  planId: string;
  readingDayId: string;
  date: string; // YYYY-MM-DD
  
  reflection: string;
  insights: string[];
  prayerNotes: string;
  highlightedVerses: string[];
  bookmarkedInsights: string[];
  
  spiritualMood: 'strengthened' | 'challenged' | 'inspired' | 'grateful' | 'seeking' | 'peaceful';
  growthAreas: string[];
  gratitudeItems: string[];
  
  createdAt: any;
  updatedAt: any;
}

export interface ReadingPlanProgress {
  userId: string;
  planId: string;
  planType: ReadingPlanType;
  startDate: string;
  currentDay: number;
  completedDays: number;
  totalDays: number;
  percentComplete: number;
  streakDays: number;
  lastReadingDate?: string;
  missedDays: number;
  journalEntries: number;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  milestones: MilestoneMarker[];
  createdAt: any;
  updatedAt: any;
}

export interface MilestoneMarker {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  achieved: boolean;
  achievedAt?: any;
  spiritualSignificance: string; // e.g., "Completed Bereishit"
}

export interface SpiritualJourneyTimeline {
  userId: string;
  planId: string;
  entries: TimelineEntry[];
  totalEntries: number;
  streakInfo: {
    currentStreak: number;
    longestStreak: number;
    totalStreakDays: number;
  };
  spiritualGrowth: {
    areasOfGrowth: string[];
    keyInsights: string[];
    transformationMoments: string[];
  };
}

export interface TimelineEntry {
  id: string;
  date: string;
  type: 'reading' | 'reflection' | 'milestone' | 'prayer' | 'insight';
  title: string;
  content: string;
  icon: string;
  spiritualSignificance?: string;
}

export interface SpiritualNotification {
  id: string;
  userId: string;
  type: 'daily-reminder' | 'encouragement' | 'milestone' | 'streak-alert';
  title: string;
  message: string;
  planId?: string;
  spiritualTone: 'warm' | 'encouraging' | 'devotional' | 'reflective';
  scheduled?: string; // Time like "06:30"
  sent: boolean;
  sentAt?: any;
  createdAt: any;
}


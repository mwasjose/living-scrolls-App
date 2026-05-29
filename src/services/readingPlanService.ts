import { 
  ReadingPlan, 
  ReadingPlanType, 
  ReadingDay, 
  DailyReading, 
  SpiritualJournalEntry,
  ReadingPlanProgress,
  SpiritualNotification 
} from '@/lib/models';

// Sacred reading plans metadata
export const SACRED_READING_PLANS: Record<ReadingPlanType, Partial<ReadingPlan>> = {
  'torah-cycle': {
    title: 'Torah Cycle',
    hebrewTitle: 'חומש',
    transliteration: 'Chumash',
    description: 'Walk through the Five Books of Moshe, one sacred portion per week, discovering the eternal wisdom of Bereishit through Devarim.',
    spiritualFocus: 'Foundation in the Torah, understanding Elohim\'s covenant and law',
    duration: '52 weeks',
    readingPace: '1 parashah per week',
    difficulty: 'Moderate',
    icon: '📜',
    color: '#92D51F',
    totalDays: 365,
  },
  'one-year-bible': {
    title: 'One-Year Bible',
    description: 'A balanced journey through the entire Scripture in one year—Old Testament, Psalms, Wisdom, and Gospel teachings.',
    spiritualFocus: 'Complete Scripture immersion and balanced spiritual understanding',
    duration: '52 weeks',
    readingPace: '3-4 chapters per day',
    difficulty: 'Moderate',
    icon: '📖',
    color: '#D98B0F',
    totalDays: 365,
  },
  '30-day-psalms': {
    title: '30-Day Psalms Journey',
    hebrewTitle: 'תהילים',
    transliteration: 'Tehilim',
    description: 'Experience the emotional and spiritual depth of the Psalms—one psalm per day for a month of devotional peace.',
    spiritualFocus: 'Emotional healing, worship, and communion with Elohim',
    duration: '30 days',
    readingPace: '1 psalm per day',
    difficulty: 'Gentle',
    icon: '🎵',
    color: '#FEFAE0',
    totalDays: 30,
  },
  'gospel-journey': {
    title: 'Gospel Journey: Teachings of Yahshuah',
    hebrewTitle: 'בשורה',
    transliteration: 'B\'shurah',
    description: 'Follow the teachings and life of Yahshuah Messiah through the Gospel accounts—experiencing discipleship and redemptive love.',
    spiritualFocus: 'Understanding Messiah, discipleship, and the Gospel message',
    duration: '42 days',
    readingPace: '1 Gospel passage per day',
    difficulty: 'Gentle',
    icon: '✨',
    color: '#92D51F',
    totalDays: 42,
  },
  'proverbs-wisdom': {
    title: 'Proverbs Wisdom Plan',
    hebrewTitle: 'משלים',
    transliteration: 'Mishlei',
    description: 'Daily wisdom from Proverbs—practical insights for living a righteous, joyful life aligned with Elohim\'s design.',
    spiritualFocus: 'Practical wisdom for daily living and righteous character',
    duration: '31 days',
    readingPace: '1 chapter of Proverbs per day',
    difficulty: 'Gentle',
    icon: '💎',
    color: '#92D51F',
    totalDays: 31,
  },
  'messianic-prophecies': {
    title: 'Messianic Prophecies',
    description: 'Discover how Yahshuah Messiah is woven throughout Scripture—fulfilling prophecy and revealing redemption\'s plan.',
    spiritualFocus: 'Understanding Messiah\'s role, prophecy fulfillment, and redemptive history',
    duration: '40 days',
    readingPace: '1 prophecy with connection per day',
    difficulty: 'Intensive',
    icon: '🌟',
    color: '#D98B0F',
    totalDays: 40,
  },
  'shabbat-preparation': {
    title: 'Shabbat Preparation',
    hebrewTitle: 'שבת',
    transliteration: 'Shabbat',
    description: 'Prepare your heart for holy rest—reflective readings, worship focus, and peaceful meditation for the Sabbath season.',
    spiritualFocus: 'Preparing for Shabbat, peace, worship, and spiritual rest',
    duration: '5 days (weekly)',
    readingPace: 'Monday-Friday reflections',
    difficulty: 'Gentle',
    icon: '🕯️',
    color: '#FEFAE0',
    totalDays: 5,
  },
  'feasts-of-adonai': {
    title: 'Feasts of Adonai',
    hebrewTitle: 'מועדים',
    transliteration: 'Moa\'dim',
    description: 'Journey through the biblical feasts—understanding their prophetic significance and spiritual meaning in Messiah.',
    spiritualFocus: 'Prophetic meaning, Messiah\'s fulfillment, and sacred seasons',
    duration: '7-10 weeks',
    readingPace: 'Based on feast cycle',
    difficulty: 'Moderate',
    icon: '🎉',
    color: '#D98B0F',
    totalDays: 70,
  },
  'hebrew-word-journey': {
    title: 'Hebrew Word Journey',
    hebrewTitle: 'לימודי עברית',
    transliteration: 'Limudei Ivrit',
    description: 'Study sacred Hebrew words from Scripture—discover their roots, meanings, and spiritual depth in Elohim\'s language.',
    spiritualFocus: 'Hebrew language, scriptural vocabulary, and spiritual meaning',
    duration: '60 days',
    readingPace: '1 Hebrew word per day',
    difficulty: 'Intensive',
    icon: '🔤',
    color: '#92D51F',
    totalDays: 60,
  },
};

// Default spiritual notifications
export const DEFAULT_SPIRITUAL_NOTIFICATIONS: Omit<SpiritualNotification, 'id' | 'userId' | 'createdAt'>[] = [
  {
    type: 'daily-reminder',
    title: 'Your Scripture Journey Awaits',
    message: 'Your sacred reading waits today. Come walk through the scrolls with Elohim.',
    spiritualTone: 'warm',
    scheduled: '06:30',
    sent: false,
  },
  {
    type: 'daily-reminder',
    title: 'Continue Your Devotional Path',
    message: 'Be strong and courageous in the Word today. Let Scripture guide your steps.',
    spiritualTone: 'encouraging',
    scheduled: '18:00',
    sent: false,
  },
  {
    type: 'encouragement',
    title: 'Faithful in the Word',
    message: 'Your commitment to daily Scripture reading is strengthening your soul. Continue faithfully.',
    spiritualTone: 'devotional',
    sent: false,
  },
];

// Warm, reverent spiritual reminders for missed days
export const GENTLE_ENCOURAGEMENT_MESSAGES = [
  'Your Scripture journey is always here when you are ready. No judgment, only grace.',
  'The scrolls await your return. Each day is a new opportunity to draw closer to Elohim.',
  'Missing a day does not diminish your commitment. Return with renewed heart and continue faithfully.',
  'The Word never loses its power. Today is a perfect day to reconnect with your sacred reading.',
];

/**
 * Generate AI-enhanced devotional commentary
 * This would integrate with your AI service
 */
export async function generateDevotionalCommentary(
  scriptureReference: string,
  scriptureText: string,
  planType: ReadingPlanType
): Promise<{
  devotionalCommentary: string;
  hebraicContext: string;
  messianicConnection: string;
  reflectionPrompt: string;
  lifeApplication: string;
  prayerSuggestion: string;
}> {
  // This would call your Claude API
  // For now, return structured placeholder
  return {
    devotionalCommentary: `Devotional reflection on ${scriptureReference}`,
    hebraicContext: 'Understanding the Hebrew roots and cultural context',
    messianicConnection: 'How this connects to Yahshuah Messiah',
    reflectionPrompt: 'What does this passage reveal about Elohim\'s character?',
    lifeApplication: 'How can you live out this truth today?',
    prayerSuggestion: 'A prayer inspired by this Scripture',
  };
}

/**
 * Generate Hebrew word study for daily reading
 */
export async function generateHebrewWordStudy(word: string, hebrew: string) {
  return {
    word,
    hebrew,
    transliteration: '',
    meaning: '',
    spiritualSignificance: 'The deep spiritual meaning of this word in Scripture',
  };
}

/**
 * Calculate spiritual progress and streaks
 */
export function calculateProgressMetrics(
  progress: ReadingPlanProgress
): {
  completionPercentage: number;
  daysRemaining: number;
  consistencyScore: number;
  streakStatus: string;
} {
  const completionPercentage = (progress.completedDays / progress.totalDays) * 100;
  const daysRemaining = progress.totalDays - progress.completedDays;
  const consistencyScore = Math.min(100, (progress.streakDays / 30) * 100);
  
  let streakStatus = 'Just Beginning';
  if (progress.streakDays >= 1 && progress.streakDays < 7) streakStatus = 'Finding Your Rhythm';
  if (progress.streakDays >= 7 && progress.streakDays < 30) streakStatus = 'Building Consistency';
  if (progress.streakDays >= 30 && progress.streakDays < 100) streakStatus = 'Faithful Commitment';
  if (progress.streakDays >= 100) streakStatus = 'Devoted Soul';
  
  return {
    completionPercentage: Math.round(completionPercentage),
    daysRemaining,
    consistencyScore: Math.round(consistencyScore),
    streakStatus,
  };
}

/**
 * Get a warm, encouraging message based on progress
 */
export function getEncouragementMessage(progress: ReadingPlanProgress): string {
  const metrics = calculateProgressMetrics(progress);
  
  if (progress.streakDays === 0) {
    return 'Begin your sacred journey today. Every step with Elohim matters.';
  }
  
  if (progress.streakDays === 1) {
    return 'Your first step is taken. Welcome to this spiritual journey.';
  }
  
  if (metrics.streakStatus === 'Finding Your Rhythm') {
    return `You're building a beautiful habit. ${progress.streakDays} days strong!`;
  }
  
  if (metrics.streakStatus === 'Building Consistency') {
    return `Your faithfulness is transforming your soul. ${progress.streakDays} consecutive days!`;
  }
  
  if (metrics.streakStatus === 'Faithful Commitment') {
    return `Remarkable devotion! Over ${Math.floor(progress.streakDays / 30)} months of daily connection with Elohim.`;
  }
  
  if (metrics.streakStatus === 'Devoted Soul') {
    return `Your dedication is inspiring. Over a year of faithful study and reflection.`;
  }
  
  return 'Keep going. Your consistency is building spiritual strength.';
}

/**
 * Get milestone information for a reading plan
 */
export function getMilestones(planType: ReadingPlanType, totalDays: number): ReadingPlanProgress['milestones'] {
  const baseMilestones = [
    { dayNumber: 1, title: 'First Step', spiritualSignificance: 'Beginning your sacred journey' },
    { dayNumber: 7, title: 'One Week Strong', spiritualSignificance: 'First week of commitment' },
    { dayNumber: 30, title: 'One Month', spiritualSignificance: 'A month of daily devotion' },
  ];
  
  const milestones: ReadingPlanProgress['milestones'] = baseMilestones.map((m, i) => ({
    id: `milestone-${i}`,
    ...m,
    description: m.spiritualSignificance,
    achieved: false,
  }));
  
  // Add plan-specific milestones
  if (planType === 'torah-cycle') {
    milestones.push(
      { id: 'torah-1', dayNumber: 13, title: 'Bereishit Complete', achieved: false, description: 'Completed Genesis', spiritualSignificance: 'Completed Genesis' },
      { id: 'torah-2', dayNumber: 26, title: 'Shemot Complete', achieved: false, description: 'Completed Exodus', spiritualSignificance: 'Completed Exodus' },
      { id: 'torah-3', dayNumber: 52, title: 'Full Chumash', achieved: false, description: 'Completed all Five Books', spiritualSignificance: 'Completed all Five Books' }
    );
  }

  if (planType === 'one-year-bible') {
    milestones.push(
      { id: 'bible-1', dayNumber: 90, title: 'Quarterway', achieved: false, description: 'One quarter of Scripture explored', spiritualSignificance: 'One quarter of Scripture explored' },
      { id: 'bible-2', dayNumber: 180, title: 'Halfway', achieved: false, description: 'Half of Scripture studied', spiritualSignificance: 'Half of Scripture studied' },
      { id: 'bible-3', dayNumber: 365, title: 'Complete Journey', achieved: false, description: 'Full year of Scripture', spiritualSignificance: 'Full year of Scripture' }
    );
  }
  
  return milestones;
}

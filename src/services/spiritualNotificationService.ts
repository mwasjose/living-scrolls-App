import { SpiritualNotification } from '@/lib/models';

/**
 * Warm, reverent spiritual notification templates
 * Used throughout the reading plans system
 */

export const SPIRITUAL_NOTIFICATIONS = {
  // Daily encouragement
  dailyReminders: [
    {
      title: 'Your Scripture Awaits',
      message: 'Begin your sacred journey today. Come walk through the scrolls with Elohim.',
      tone: 'warm',
    },
    {
      title: 'Continue Your Devotion',
      message: 'Be strong and courageous in the Word today. Let Scripture guide your steps.',
      tone: 'encouraging',
    },
    {
      title: 'Connect with the Divine',
      message: 'Your daily reading awaits. Open yourself to what Elohim wants to teach you today.',
      tone: 'devotional',
    },
    {
      title: 'Sacred Time',
      message: 'Create space for your reading today. Let the Scripture nourish your soul.',
      tone: 'warm',
    },
    {
      title: 'Faithful Journey',
      message: 'Another day to draw closer to Elohim through His Word. You are not alone.',
      tone: 'encouraging',
    },
  ],

  // Milestone achievements
  milestoneMessages: {
    oneWeek: {
      title: '🌟 One Week Strong!',
      message: 'You\'ve committed to seven days of Scripture study. Your faithfulness is building spiritual strength.',
      tone: 'encouraging',
    },
    oneMonth: {
      title: '🏆 Thirty Days of Dedication',
      message: 'A full month of daily devotion! Your soul is growing deeper in Elohim\'s Word.',
      tone: 'devotional',
    },
    threeTimes: {
      title: '✨ Milestone Reached',
      message: 'You\'ve passed another significant threshold. Your commitment to Scripture is transforming your life.',
      tone: 'warm',
    },
    planComplete: {
      title: '🎉 Journey Complete!',
      message: 'You have finished this sacred reading plan. May the Scripture dwell richly in your heart.',
      tone: 'devotional',
    },
  },

  // Gentle encouragement for missed days
  gentleEncouragement: [
    {
      title: 'Welcome Back',
      message: 'You missed a day, but there\'s no judgment here—only grace. Return to your journey whenever you\'re ready.',
      tone: 'warm',
    },
    {
      title: 'Restart Your Journey',
      message: 'Every new day is an opportunity to reconnect with Scripture. Begin again with a fresh heart.',
      tone: 'encouraging',
    },
    {
      title: 'Grace Over Perfection',
      message: 'Missing days doesn\'t erase your progress. What matters is your commitment to return to Elohim\'s Word.',
      tone: 'devotional',
    },
    {
      title: 'The Scrolls Await',
      message: 'The Word never loses its power. When you\'re ready, your sacred journey continues.',
      tone: 'warm',
    },
  ],

  // Streak warnings
  streakWarnings: {
    oneDay: {
      title: 'Your Streak is at 1 Day',
      message: 'A strong beginning! Keep this momentum going. One day builds into a lifetime of devotion.',
      tone: 'warm',
    },
    aboutToLose: {
      title: 'Your Streak Continues',
      message: 'You\'re on a wonderful journey. Don\'t miss today—continue your commitment to Scripture.',
      tone: 'encouraging',
    },
  },

  // Reflection prompts
  reflectionPrompts: [
    'What did today\'s Scripture reveal about Elohim\'s character?',
    'How can you apply this passage to your life today?',
    'What does the Hebraic context add to your understanding?',
    'How does this connect to Yahshuah Messiah\'s redemptive plan?',
    'What spiritual transformation is Elohim calling you to?',
    'How does this passage comfort or challenge you?',
  ],

  // Plan-specific encouragement
  planEncouragement: {
    'torah-cycle': {
      title: 'Walking the Torah Path',
      message: 'Each week brings new depths of the Five Books. You are building a solid foundation in Elohim\'s law and covenant.',
      tone: 'devotional',
    },
    'gospel-journey': {
      title: 'Following Yahshuah',
      message: 'Walking with Messiah through His teachings. Let His love and truth transform your heart.',
      tone: 'warm',
    },
    '30-day-psalms': {
      title: 'Songs of the Soul',
      message: 'The Psalms speak to every human emotion. Find comfort, strength, and joy in these sacred songs.',
      tone: 'warm',
    },
    'one-year-bible': {
      title: 'The Complete Journey',
      message: 'You\'re on a yearlong pilgrimage through Scripture. Every page brings you closer to wholeness.',
      tone: 'encouraging',
    },
    'hebrew-word-journey': {
      title: 'Elohim\'s Language',
      message: 'Discovering the depth of Hebrew words connects you to the original power of Scripture.',
      tone: 'devotional',
    },
  },
};

/**
 * Get a random daily reminder
 */
export function getRandomDailyReminder(): Omit<SpiritualNotification, 'id' | 'userId' | 'createdAt'> {
  const reminder = SPIRITUAL_NOTIFICATIONS.dailyReminders[
    Math.floor(Math.random() * SPIRITUAL_NOTIFICATIONS.dailyReminders.length)
  ];

  return {
    type: 'daily-reminder',
    title: reminder.title,
    message: reminder.message,
    spiritualTone: reminder.tone as any,
    sent: false,
  };
}

/**
 * Get milestone notification for streak
 */
export function getMilestoneNotification(streakDays: number): SpiritualNotification['title'] | null {
  if (streakDays === 7) return SPIRITUAL_NOTIFICATIONS.milestoneMessages.oneWeek.title;
  if (streakDays === 30) return SPIRITUAL_NOTIFICATIONS.milestoneMessages.oneMonth.title;
  if (streakDays % 50 === 0) return SPIRITUAL_NOTIFICATIONS.milestoneMessages.threeTimes.title;
  return null;
}

/**
 * Get gentle encouragement for missed days
 */
export function getGentleEncouragement(): Omit<SpiritualNotification, 'id' | 'userId' | 'createdAt'> {
  const message = SPIRITUAL_NOTIFICATIONS.gentleEncouragement[
    Math.floor(Math.random() * SPIRITUAL_NOTIFICATIONS.gentleEncouragement.length)
  ];

  return {
    type: 'encouragement',
    title: message.title,
    message: message.message,
    spiritualTone: message.tone as any,
    sent: false,
  };
}

/**
 * Get random reflection prompt
 */
export function getRandomReflectionPrompt(): string {
  const prompts = SPIRITUAL_NOTIFICATIONS.reflectionPrompts;
  return prompts[Math.floor(Math.random() * prompts.length)];
}

/**
 * Schedule notification for a specific time
 */
export function scheduleNotification(
  title: string,
  message: string,
  time: string // "HH:MM" format
): Omit<SpiritualNotification, 'id' | 'userId' | 'createdAt'> {
  return {
    type: 'daily-reminder',
    title,
    message,
    spiritualTone: 'warm',
    scheduled: time,
    sent: false,
  };
}

/**
 * Check if user should receive a gentle encouragement
 * Call this when user misses a reading
 */
export function shouldSendGentleReminder(lastReadingDate: string | undefined, today: string): boolean {
  if (!lastReadingDate) return false;

  const lastDate = new Date(lastReadingDate);
  const currentDate = new Date(today);
  const daysDiff = Math.floor(
    (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysDiff === 1; // Send reminder after missing exactly one day
}

/**
 * Generate personalized encouragement based on progress
 */
export function getPersonalizedEncouragement(
  streakDays: number,
  completionPercentage: number,
  planTitle: string
): string {
  if (streakDays === 0) {
    return `Begin your journey with "${planTitle}" today. Every great spiritual adventure begins with a single step.`;
  }

  if (streakDays < 7) {
    return `You're ${streakDays} days into "${planTitle}"! Building consistency will transform your walk with Elohim.`;
  }

  if (streakDays < 30) {
    return `${streakDays} days of devotion! Your commitment to "${planTitle}" is building spiritual strength.`;
  }

  if (completionPercentage < 50) {
    return `You're ${Math.round(completionPercentage)}% through "${planTitle}"! Keep pressing forward in faith.`;
  }

  if (completionPercentage < 100) {
    return `The finish line is near! ${Math.round(100 - completionPercentage)}% of "${planTitle}" remains. Don't stop now!`;
  }

  return `You've completed "${planTitle}"! Celebrate this milestone and consider your next sacred journey.`;
}

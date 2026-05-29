import { AILesson, LessonSeries, LessonCategory } from '@/lib/models';

// Sample lesson data - in production, this would come from Firestore
const SAMPLE_LESSONS: AILesson[] = [
  {
    id: 'lesson-1',
    title: 'The Foundation of Faith: Trusting in Adonai\'s Plan',
    subtitle: 'Exploring how trust shapes our spiritual journey',
    category: 'Faith & Growth',
    excerpt:
      'In a world of uncertainty, faith stands as our anchor. Discover how to build an unshakeable foundation of trust in Adonai\'s perfect plan for your life.',
    heroScripture: 'Proverbs 3:5-6',
    heroScriptureText:
      'Trust in Adonai with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    content: 'Full content here...',
    source: 'Living Scrolls',
    tags: ['faith', 'trust', 'prayer', 'spiritual-growth'],
    difficulty: 'Beginner',
    readTime: 8,
    scriptureReferences: ['Proverbs 3:5-6', 'Romans 10:17', 'Hebrews 11:1'],
    views: 1243,
    saves: 156,
    shares: 45,
    isFeature: true,
    isAIGenerated: false,
    isTrending: true,
    createdAt: new Date(),
  },
  {
    id: 'lesson-2',
    title: 'Prayer as a Daily Practice: Intimacy with the Divine',
    subtitle: 'Transform your prayer life through devotional discipline',
    category: 'Prayer & Devotion',
    excerpt:
      'Prayer is not just a request; it\'s a conversation with the Almighty. Learn how to deepen your prayer life and experience true intimacy with Adonai.',
    heroScripture: '1 Thessalonians 5:17',
    heroScriptureText: 'Pray without ceasing.',
    content: 'Full content here...',
    source: 'Living Scrolls',
    tags: ['prayer', 'devotion', 'spiritual-practice', 'connection'],
    difficulty: 'Intermediate',
    readTime: 12,
    scriptureReferences: ['1 Thessalonians 5:17', 'Matthew 6:6', 'Philippians 4:6'],
    views: 892,
    saves: 201,
    shares: 67,
    isFeature: false,
    isAIGenerated: true,
    isTrending: true,
    createdAt: new Date(),
  },
  {
    id: 'lesson-3',
    title: 'Biblical Wisdom for Modern Challenges',
    subtitle: 'Ancient truths for contemporary struggles',
    category: 'Wisdom & Discipline',
    excerpt:
      'The wisdom of Scripture transcends time. Explore how biblical principles provide solutions to today\'s most pressing challenges.',
    heroScripture: 'Proverbs 1:7',
    heroScriptureText:
      'The fear of Adonai is the beginning of knowledge, but fools despise wisdom and instruction.',
    content: 'Full content here...',
    source: 'Torah.org',
    tags: ['wisdom', 'leadership', 'discipline', 'guidance'],
    difficulty: 'Advanced',
    readTime: 15,
    scriptureReferences: ['Proverbs 1:7', 'Proverbs 2:1-11', 'Psalm 111:10'],
    views: 654,
    saves: 123,
    shares: 32,
    isFeature: false,
    isAIGenerated: false,
    isTrending: false,
    createdAt: new Date(),
  },
  {
    id: 'lesson-4',
    title: 'Identity in Messiah: Who You Are in Yahshuah',
    subtitle: 'Discovering your true identity in the Messiah',
    category: 'Identity in Elohim',
    excerpt:
      'Your identity is not defined by your circumstances. Explore the liberating truth of who you really are in Yahshuah Messiah.',
    heroScripture: '2 Corinthians 5:17',
    heroScriptureText:
      'Therefore, if anyone is in Messiah, he is a new creation; the old has gone, the new is here!',
    content: 'Full content here...',
    source: 'Living Scrolls',
    tags: ['identity', 'messiah', 'transformation', 'freedom'],
    difficulty: 'Intermediate',
    readTime: 11,
    scriptureReferences: ['2 Corinthians 5:17', 'Ephesians 2:10', 'Colossians 3:3'],
    views: 1121,
    saves: 267,
    shares: 89,
    isFeature: true,
    isAIGenerated: true,
    isTrending: true,
    createdAt: new Date(),
  },
  {
    id: 'lesson-5',
    title: 'Overcoming Fear Through Faith',
    subtitle: 'Building courage in times of uncertainty',
    category: 'Healing & Encouragement',
    excerpt:
      'Fear is a natural response, but it doesn\'t have to control you. Discover how faith provides the strength to overcome any fear.',
    heroScripture: '2 Timothy 1:7',
    heroScriptureText:
      'For the Spirit Adonai gave us does not make us timid, but gives us power, love and self-discipline.',
    content: 'Full content here...',
    source: 'Living Scrolls',
    tags: ['courage', 'fear', 'faith', 'encouragement'],
    difficulty: 'Beginner',
    readTime: 9,
    scriptureReferences: ['2 Timothy 1:7', 'Psalm 27:1', 'Isaiah 41:10'],
    views: 2034,
    saves: 412,
    shares: 156,
    isFeature: true,
    isAIGenerated: false,
    isTrending: true,
    createdAt: new Date(),
  },
];

const SAMPLE_CATEGORIES: Record<LessonCategory, { count: number; description: string }> = {
  'Faith & Growth': { count: 24, description: 'Build unshakeable faith and spiritual growth' },
  'Prayer & Devotion': { count: 18, description: 'Deepen your prayer practice and devotional life' },
  'Relationships': { count: 15, description: 'Biblical wisdom for all relationships' },
  'Youth Teachings': { count: 12, description: 'Guidance for young believers' },
  'Spiritual Warfare': { count: 9, description: 'Understanding spiritual battles' },
  'Wisdom & Discipline': { count: 21, description: 'Ancient wisdom for modern life' },
  'Leadership': { count: 16, description: 'Biblical principles of leadership' },
  'Purpose & Calling': { count: 14, description: 'Discover your divine purpose' },
  'Healing & Encouragement': { count: 19, description: 'Find healing and hope in Scripture' },
  'Worship': { count: 11, description: 'Experience true worship' },
  'Identity in Elohim': { count: 13, description: 'Know who you are in Elohim' },
  'Mental Strength': { count: 10, description: 'Spiritual practices for mental wellness' },
  'Daily Inspiration': { count: 8, description: 'Daily encouragement and insight' },
  'Character Development': { count: 17, description: 'Grow in godly character' },
  'Biblical Lifestyle': { count: 12, description: 'Living according to Scripture' },
  'Spiritual Maturity': { count: 14, description: 'Progress toward spiritual maturity' },
  'Torah & Wisdom': { count: 20, description: 'Deep Torah study and insight' },
  'End Times & Prophecy': { count: 8, description: 'Understanding prophecy and end times' },
  'Family & Marriage': { count: 13, description: 'Biblical family and marriage principles' },
  'Calling & Ministry': { count: 11, description: 'Serving in ministry and calling' },
  'Overcoming Temptation': { count: 9, description: 'Victory over temptation' },
  'Discipleship': { count: 15, description: 'Making and being a disciple' },
  'Biblical Leadership': { count: 10, description: 'Leadership from a biblical perspective' },
  'Messianic Teachings': { count: 16, description: 'Understanding Messianic truth' },
};

const SAMPLE_SERIES: LessonSeries[] = [
  {
    id: 'series-1',
    title: 'Faith Foundations',
    description: 'A comprehensive series on building unshakeable faith',
    category: 'Faith & Growth',
    lessons: ['lesson-1', 'lesson-3'],
    totalLessons: 5,
    difficulty: 'Beginner',
    spiritualTheme: 'Trust, obedience, and spiritual growth',
    estimatedCompletionTime: '4 weeks',
    createdAt: new Date(),
  },
  {
    id: 'series-2',
    title: 'Prayer Mastery',
    description: 'From basic prayer to intimate communion with Adonai',
    category: 'Prayer & Devotion',
    lessons: ['lesson-2'],
    totalLessons: 8,
    difficulty: 'Intermediate',
    spiritualTheme: 'Deepening prayer life and spiritual intimacy',
    estimatedCompletionTime: '8 weeks',
    createdAt: new Date(),
  },
];

export const lessonService = {
  /**
   * Get all lessons
   */
  getAllLessons: async (): Promise<AILesson[]> => {
    // In production, fetch from Firestore
    return SAMPLE_LESSONS;
  },

  /**
   * Get lesson by ID
   */
  getLessonById: async (id: string): Promise<AILesson | null> => {
    return SAMPLE_LESSONS.find((l) => l.id === id) || null;
  },

  /**
   * Get lessons by category
   */
  getLessonsByCategory: async (category: LessonCategory): Promise<AILesson[]> => {
    return SAMPLE_LESSONS.filter((l) => l.category === category);
  },

  /**
   * Get featured lessons
   */
  getFeaturedLessons: async (): Promise<AILesson[]> => {
    return SAMPLE_LESSONS.filter((l) => l.isFeature);
  },

  /**
   * Get trending lessons
   */
  getTrendingLessons: async (): Promise<AILesson[]> => {
    return SAMPLE_LESSONS.filter((l) => l.isTrending).sort((a, b) => b.views - a.views);
  },

  /**
   * Get popular lessons (by saves)
   */
  getPopularLessons: async (): Promise<AILesson[]> => {
    return [...SAMPLE_LESSONS].sort((a, b) => b.saves - a.saves);
  },

  /**
   * Get recently added lessons
   */
  getRecentlyAddedLessons: async (limit = 6): Promise<AILesson[]> => {
    return [...SAMPLE_LESSONS]
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, limit);
  },

  /**
   * Get all categories
   */
  getCategories: async (): Promise<Array<{ name: LessonCategory; count: number; description: string }>> => {
    return Object.entries(SAMPLE_CATEGORIES).map(([name, data]) => ({
      name: name as LessonCategory,
      ...data,
    }));
  },

  /**
   * Get lesson series
   */
  getLessonSeries: async (): Promise<LessonSeries[]> => {
    return SAMPLE_SERIES;
  },

  /**
   * Get series by ID
   */
  getSeriesById: async (id: string): Promise<LessonSeries | null> => {
    return SAMPLE_SERIES.find((s) => s.id === id) || null;
  },

  /**
   * Get lessons in a series
   */
  getLessonsInSeries: async (seriesId: string): Promise<AILesson[]> => {
    const series = SAMPLE_SERIES.find((s) => s.id === seriesId);
    if (!series) return [];
    return SAMPLE_LESSONS.filter((l) => series.lessons.includes(l.id));
  },

  /**
   * Increment view count
   */
  incrementViewCount: async (lessonId: string): Promise<void> => {
    const lesson = SAMPLE_LESSONS.find((l) => l.id === lessonId);
    if (lesson) {
      lesson.views += 1;
    }
  },

  /**
   * Increment save count
   */
  incrementSaveCount: async (lessonId: string): Promise<void> => {
    const lesson = SAMPLE_LESSONS.find((l) => l.id === lessonId);
    if (lesson) {
      lesson.saves += 1;
    }
  },
};

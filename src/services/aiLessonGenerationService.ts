import { AILesson, LessonCategory } from '@/lib/models';

/**
 * Service for generating lessons with AI
 * This uses Claude or another LLM to generate spiritually warm, Messianic-focused content
 */

export interface GenerateLessonRequest {
  title: string;
  category: LessonCategory;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scriptureReferences?: string[];
  includeHebraic?: boolean;
  includeMessianic?: boolean;
  customPrompt?: string;
}

export const aiLessonGenerationService = {
  /**
   * Generate a full lesson using AI
   * This would integrate with Claude API or similar
   */
  generateLesson: async (request: GenerateLessonRequest): Promise<AILesson> => {
    const {
      title,
      category,
      topic,
      difficulty,
      scriptureReferences = [],
      includeHebraic = true,
      includeMessianic = true,
      customPrompt,
    } = request;

    // Construct the prompt for the AI
    const systemPrompt = `You are a spiritual teacher and biblical scholar creating devotional lessons with warmth, wisdom, and deep faith. 
Your tone should be:
- Warm and personal, like a trusted spiritual mentor
- Devotional and reflective
- Spiritually immersive and inspiring
- Scholarly but accessible
- Reverential toward Elohim and Scripture

Use Hebraic names where appropriate:
- Elohim (God)
- Adonai (Lord)
- Yahshuah Messiah (Jesus Christ)
- Ruach HaKodesh (Holy Spirit)

Always incorporate:
- Deep Scripture connection
- Spiritual wisdom and insight
- Personal application
- Prayer prompts
- Reflection questions`;

    const userPrompt = customPrompt || `
Generate a comprehensive spiritual lesson with the following details:

Title: "${title}"
Category: ${category}
Topic: ${topic}
Difficulty Level: ${difficulty}
Scripture References: ${scriptureReferences.join(', ') || 'Choose appropriate references'}

${includeHebraic ? 'Include Hebraic context and word studies where relevant.' : ''}
${includeMessianic ? 'Include Messianic connections and how this topic relates to Yahshuah.' : ''}

The lesson should include:
1. A compelling subtitle
2. A hero scripture (main verse for the lesson)
3. Introduction (3-4 sentences setting context)
4. Core Teaching (main substance, 2-3 paragraphs)
5. Scripture Insight (deeper biblical analysis)
6. Life Application (how to apply this truth)
7. Prayer & Meditation prompt
8. 3-5 Key Takeaways (as bullet points)
9. 3 Reflection Questions for personal study
10. Spiritual Encouragement closing

Format the response as JSON with these fields:
{
  "subtitle": "string",
  "heroScripture": "string (reference like 'John 3:16')",
  "heroScriptureText": "string (the actual verse text)",
  "introduction": "string",
  "coreTeaching": "string",
  "scriptureInsight": "string",
  "lifeApplication": "string",
  "prayerMeditation": "string",
  "keyTakeaways": ["string", "string", ...],
  "reflectionQuestions": ["string", "string", "string"],
  "spiritualEncouragement": "string",
  "hebraicContext": "string (optional - Hebrew word study if relevant)",
  "messianicConnection": "string (optional - how this relates to Messiah)"
}`;

    try {
      // In production, call your AI API here
      // For now, return a structured template that can be filled in
      const generatedContent = {
        subtitle: '[Generated lesson subtitle - provide via your AI API]',
        heroScripture: scriptureReferences[0] || 'Psalm 119:105',
        heroScriptureText: 'Your word is a lamp to my feet and a light to my path.',
        introduction: '[Generated introduction - provide via your AI API]',
        coreTeaching: '[Generated core teaching - provide via your AI API]',
        scriptureInsight: '[Generated scripture insight - provide via your AI API]',
        lifeApplication: '[Generated life application - provide via your AI API]',
        prayerMeditation: '[Generated prayer prompt - provide via your AI API]',
        keyTakeaways: [
          '[Key takeaway 1 - provide via your AI API]',
          '[Key takeaway 2 - provide via your AI API]',
          '[Key takeaway 3 - provide via your AI API]',
        ],
        reflectionQuestions: [
          '[Reflection question 1 - provide via your AI API]',
          '[Reflection question 2 - provide via your AI API]',
          '[Reflection question 3 - provide via your AI API]',
        ],
        spiritualEncouragement: '[Generated encouragement - provide via your AI API]',
        hebraicContext: includeHebraic
          ? '[Generated Hebraic context - provide via your AI API]'
          : undefined,
        messianicConnection: includeMessianic
          ? '[Generated Messianic connection - provide via your AI API]'
          : undefined,
      };

      // Create the lesson object
      const lesson: AILesson = {
        id: `ai-gen-${Date.now()}`,
        title,
        subtitle: generatedContent.subtitle,
        category,
        excerpt: `${generatedContent.introduction?.substring(0, 100)}...` || title,
        heroScripture: generatedContent.heroScripture,
        heroScriptureText: generatedContent.heroScriptureText,
        content: generatedContent.coreTeaching,
        source: 'AI-Generated',
        tags: [topic.toLowerCase(), category.toLowerCase(), ...scriptureReferences],
        difficulty,
        readTime: calculateReadTime(generatedContent.coreTeaching),
        scriptureReferences: scriptureReferences.length > 0 ? scriptureReferences : ['Study Scripture'],
        messianicInsight: generatedContent.messianicConnection,
        introduction: generatedContent.introduction,
        coreTeaching: generatedContent.coreTeaching,
        scriptureInsight: generatedContent.scriptureInsight,
        lifeApplication: generatedContent.lifeApplication,
        prayerMeditation: generatedContent.prayerMeditation,
        keyTakeaways: generatedContent.keyTakeaways,
        reflectionQuestions: generatedContent.reflectionQuestions,
        spiritualEncouragement: generatedContent.spiritualEncouragement,
        views: 0,
        saves: 0,
        shares: 0,
        isAIGenerated: true,
        generatedBy: 'ai-automated',
        createdAt: new Date(),
        publishedAt: new Date(),
      };

      return lesson;
    } catch (error) {
      console.error('Error generating lesson:', error);
      throw new Error('Failed to generate lesson with AI');
    }
  },

  /**
   * Generate a quiz for a lesson
   */
  generateQuiz: async (lesson: AILesson): Promise<LessonQuiz> => {
    // In production, use AI to generate questions based on lesson content
    const quiz: LessonQuiz = {
      id: `quiz-${lesson.id}`,
      lessonId: lesson.id,
      title: `${lesson.title} - Reflection & Learning Check`,
      description: 'Test your understanding and reflect on what you\'ve learned',
      questions: generateSampleQuizQuestions(lesson),
      totalPoints: 100,
      passingScore: 70,
      createdAt: new Date(),
    };

    return quiz;
  },

  /**
   * Estimate reading time based on content
   */
  estimateReadTime: (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  },
};

// Helper function to calculate read time
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(3, Math.ceil(wordCount / wordsPerMinute));
}

// Helper function to generate sample quiz questions
function generateSampleQuizQuestions(lesson: AILesson): QuizQuestion[] {
  return [
    {
      id: `q1-${lesson.id}`,
      type: 'multiple_choice',
      question: `What is the main theme of "${lesson.title}"?`,
      options: [
        lesson.coreTeaching?.substring(0, 50) || lesson.title,
        'A common misconception',
        'An alternative perspective',
        'None of the above',
      ],
      correctAnswer: 0,
      explanation: 'The main theme is emphasized throughout the core teaching.',
      points: 25,
    },
    {
      id: `q2-${lesson.id}`,
      type: 'multiple_choice',
      question: `Which Scripture reference is highlighted in this lesson?`,
      options: [
        lesson.heroScripture || 'John 3:16',
        'Psalm 23:1',
        'Proverbs 3:5',
        'Matthew 6:33',
      ],
      correctAnswer: 0,
      explanation: `The hero scripture for this lesson is ${lesson.heroScripture}.`,
      points: 25,
    },
    {
      id: `q3-${lesson.id}`,
      type: 'fill_blank',
      question: `Based on this lesson, how would you apply this teaching to your daily life?`,
      correctAnswer: '',
      explanation: 'This is your personal reflection. There is no single correct answer.',
      isReflection: true,
      points: 25,
    },
    {
      id: `q4-${lesson.id}`,
      type: 'multiple_choice',
      question: 'Which key takeaway resonated most with you?',
      options: lesson.keyTakeaways?.slice(0, 4) || [
        'First key point',
        'Second key point',
        'Third key point',
        'Fourth key point',
      ],
      correctAnswer: -1, // No single correct answer for preference questions
      explanation:
        'Different takeaways resonate with different believers based on their spiritual journey.',
      isPreference: true,
      points: 25,
    },
  ];
}

// Quiz-related types
export interface LessonQuiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  totalPoints: number;
  passingScore: number;
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'true_false' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer?: number | string;
  explanation: string;
  points: number;
  isReflection?: boolean;
  isPreference?: boolean;
}

export interface QuizResponse {
  id: string;
  userId: string;
  quizId: string;
  lessonId: string;
  responses: { questionId: string; answer: string | number }[];
  score: number;
  percentScore: number;
  passed: boolean;
  timeSpent: number; // seconds
  submittedAt: Date;
}

export interface ReflectionSubmission {
  id: string;
  userId: string;
  lessonId: string;
  reflection: string;
  answeredQuestions: { questionId: string; answer: string }[];
  mood?: 'strengthened' | 'challenged' | 'inspired' | 'grateful' | 'seeking' | 'peaceful';
  growthAreas?: string[];
  submittedAt: Date;
}

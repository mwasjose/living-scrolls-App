'use client';

import { useState, useEffect, useMemo } from 'react';
import { TorahHero } from '@/components/torah/TorahHero';
import { TorahSidebar } from '@/components/torah/TorahSidebar';
import { AliyahCommentary } from '@/components/torah/AliyahCommentary';
import { CommentarySection } from '@/components/torah/CommentarySection';
import { HebrewExplorer } from '@/components/torah/HebrewExplorer';
import { useScripturePassage } from '@/hooks/useScripturePassage';
import type { TorahAliyah, TorahPortionDetail } from '@/lib/models';

// Mock data for demonstration purposes
const mockTorahPortionDetail: TorahPortionDetail = {
  id: 'bereishit',
  title: 'Bereishit',
  hebrewTitle: 'בְּרֵאשִׁית',
  transliteration: 'Bereishit',
  references: 'Genesis 1:1-6:8',
  cycleProgress: '1/54',
  summary: 'Bereishit, meaning "In the beginning," recounts the creation of the world, the fall of humanity, the early generations, and the flood. It establishes the foundational narratives of the Torah, introducing key themes of creation, covenant, sin, and redemption.',
  themes: ['Creation', 'Covenant', 'Fall', 'Flood'],
  haftarah: 'Isaiah 42:5-43:10',
  maftir: 'Genesis 1:1-2:3',
  commentary: [
    {
      id: 'bereishit-main-1',
      source: 'Torah Companion',
      title: 'Creation and Covenant',
      excerpt: 'The opening section of Bereishit sets the tone for a covenantal relationship between Elohim and creation, where order and rest find their origin in the Divine will.',
      reflection: 'The first days of creation invite us to remember that God is the source of every good thing and that Sabbath is a gift for our restoration.'
    }
  ],
  readingProgress: 0,
  aliyot: [
    {
      id: 'bereishit-aliyah-1',
      label: 'Aliyah 1',
      reference: 'Genesis 1:1-2:3',
      verses: 'Genesis 1:1-2:3',
      title: 'The Creation of the World',
      hebrewName: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים',
      transliteration: 'Bereishit Bara Elohim',
      summary: 'The first aliyah describes the six days of creation, culminating in the Sabbath.',
      commentary: 'This section details the orderly creation of the cosmos by Elohim, emphasizing divine intentionality and the establishment of Shabbat as a day of rest and holiness. It sets the stage for understanding the Creator\'s relationship with His creation.',
      historicalBackground: 'The creation narrative is foundational to Jewish thought, providing a framework for understanding the world\'s origin and humanity\'s place within it. It contrasts with ancient Near Eastern creation myths by presenting a singular, transcendent Creator.',
      
      studyNotes: ['Note the repetition of "And Elohim said" and "it was good." What does this signify?', 'Consider the significance of light being created before the sun.'],
      data: { // This is the data structure for AliyahCommentary
        summary: 'The first aliyah describes the six days of creation, culminating in the Sabbath.',
        hebraicInsight: {
          title: 'Elohim: The Plurality of Majesty',
          text: 'The Hebrew name for God used here is Elohim (אֱלֹהִים), a plural noun used with singular verbs, hinting at the majestic plurality within the singular Creator. This foreshadows the complex nature of the Divine.',
          hebrew: 'אֱלֹהִים',
          transliteration: 'Elohim'
        },
        messianicConnection: 'Yahshuah Messiah is identified as the agent of creation (John 1:3, Colossians 1:16). He is the Word (דָּבָר, Davar) through whom all things came into being, bringing light into darkness.',
        lifeReflection: 'Reflect on the order and beauty of creation. How does recognizing Elohim as the Creator impact your sense of purpose and worship? How can you honor the Sabbath as a reflection of His rest?',
        wordStudy: [
          { word: 'בְּרֵאשִׁית', hebrew: 'בְּרֵאשִׁית', transliteration: 'Bereishit', meaning: 'In the beginning', insight: 'The very first word of Torah, "Bereishit," implies a beginning point, but also "with wisdom" or "by means of a head/chief." This hints at the pre-existent wisdom of Elohim, later personified as Messiah (Proverbs 8:22-31).' },
          { word: 'בָּרָא', hebrew: 'בָּרָא', transliteration: 'Bara', meaning: 'created', insight: 'The verb "bara" (בָּרָא) is used exclusively for divine creation, bringing something into existence from nothing (ex nihilo). It signifies a unique, sovereign act of Elohim.' }
        ],
        prayer: 'Baruch Atah Adonai Eloheinu Melech HaOlam, Asher Kidshanu B’mitzvotav V’tzivanu al divrei Torah. Blessed are You, Hashem our Elohim, King of the Universe, who has sanctified us with His commandments and commanded us concerning the words of Torah. May we ever seek Your wisdom in creation.',
        crossReferences: ['Psalm 19:1-6', 'John 1:1-5', 'Colossians 1:16-17', 'Hebrews 1:1-3']
      }
    },
    {
      id: 'bereishit-aliyah-2',
      label: 'Aliyah 2',
      reference: 'Genesis 2:4-3:24',
      verses: 'Genesis 2:4-3:24',
      title: 'The Garden of Eden and the Fall',
      hebrewName: 'אֵלֶּה תּוֹלְדֹות הַשָּׁמַיִם וְהָאָרֶץ',
      transliteration: 'Eleh Toldot HaShamayim VeHaAretz',
      summary: 'This aliyah describes the creation of Adam and Chava, their life in Gan Eden, the temptation by the serpent, and their expulsion from the Garden.',
      commentary: 'The narrative shifts focus to humanity, detailing the intimate relationship between Elohim and Adam, the establishment of marriage, and the introduction of free will. The tragic fall highlights the consequences of disobedience and the introduction of sin into the world, yet also hints at future redemption.',
      historicalBackground: 'The story of Gan Eden (Garden of Eden) and the fall is central to understanding human nature, the origin of sin, and the need for atonement in both Jewish and Messianic theology. It introduces the concept of a broken relationship with the Creator.',
      
      studyNotes: ['Analyze the dialogue between Chava and the serpent. What does it reveal about temptation?', 'How does Elohim\'s response to Adam and Chava demonstrate both justice and mercy?'],
      data: {
        summary: 'This aliyah describes the creation of Adam and Chava, their life in Gan Eden, the temptation by the serpent, and their expulsion from the Garden.',
        hebraicInsight: {
          title: 'Toldot: Generations and Outcomes',
          text: 'The phrase "Eleh Toldot" (אֵלֶּה תּוֹלְדֹות) introduces a new section, often translated as "these are the generations" or "this is the account of." It signifies a transition and focuses on the outcomes and descendants of what came before, linking creation to subsequent human history.',
          hebrew: 'תּוֹלְדֹות',
          transliteration: 'Toldot'
        },
        messianicConnection: 'The "seed of the woman" (Genesis 3:15) is a foundational Messianic prophecy, pointing to Yahshuah Messiah who would crush the head of the serpent (Satan) through His sacrifice, reversing the curse of the fall (Galatians 4:4, Hebrews 2:14).',
        lifeReflection: 'Consider the impact of choices and the nature of temptation in your own life. How does the promise of the "seed of the woman" offer hope and guide your walk with Yahshuah?',
        wordStudy: [
          { word: 'חַיִּים', hebrew: 'חַיִּים', transliteration: 'Chayim', meaning: 'life', insight: 'The "Tree of Life" (עֵץ הַחַיִּים, Etz HaChayim) represents eternal life and communion with Elohim. Yahshuah Messiah declares Himself to be the "Bread of Life" and the "Way, the Truth, and the Life" (John 6:35, John 14:6).' },
          { word: 'נָחָשׁ', hebrew: 'נָחָשׁ', transliteration: 'Nachash', meaning: 'serpent', insight: 'The "Nachash" (נָחָשׁ) is more than just a snake; it represents cunning, deception, and the adversary. This figure is later identified with Satan (Revelation 12:9).' }
        ],
        prayer: 'Avinu Malkeinu, our Father, our King, we confess our own tendencies to stray from Your path. Thank You for the promise of the Seed, Yahshuah Messiah, who restores us to life. Guide us away from temptation and into Your perfect will.',
        crossReferences: ['Romans 5:12-19', '1 Corinthians 15:21-22', 'Revelation 22:1-3', 'Galatians 4:4', 'Hebrews 2:14']
      }
    },
    // Add more aliyot as needed for a full portion
  ],
  keywords: [
    { id: 'elohim', letter: 'א', word: 'Elohim', transliteration: 'אֱלֹהִים', meaning: 'God, Creator', root: 'אל', morphology: 'Plural of majesty' },
    { id: 'bara', letter: 'ב', word: 'Bara', transliteration: 'בָּרָא', meaning: 'Created (ex nihilo)', root: 'ברא', morphology: 'Qal perfect 3ms' },
  ],
  messianicConnections: [
    'Yahshuah Messiah as the Word of Creation (John 1:1-3)',
    'The Seed of the Woman (Genesis 3:15) fulfilled in Yahshuah',
    'Yahshuah as the second Adam (Romans 5:12-19)'
  ],
  ntConnections: [
    'John 1:1-5 - Yahshuah as the Word',
    'Colossians 1:15-17 - Yahshuah as Creator',
    'Romans 5:12-19 - Adam and Messiah'
  ]
};

// Define a default empty data object that matches the AliyahCommentaryProps['data'] interface
const defaultAliyahData = {
  summary: '',
  hebraicInsight: { title: '', text: '' },
  messianicConnection: '',
  lifeReflection: '',
  wordStudy: [],
  prayer: '',
  crossReferences: [],
};

interface TorahPortionPageProps {
  params: { portionId: string };
  searchParams: { aliyah?: string };
}

export default function TorahPortionPage({ params, searchParams }: TorahPortionPageProps) {
  const { portionId } = params;
  const portionData = mockTorahPortionDetail; // In a real app, fetch this based on portionId

  const initialAliyahId = searchParams.aliyah || portionData.aliyot[0]?.id;
  const [activeAliyahId, setActiveAliyahId] = useState<string>(initialAliyahId);
  const [completedAliyotIds, setCompletedAliyotIds] = useState<string[]>([]); // User-specific progress

  // Load/Save active aliyah and completed aliyot from/to localStorage
  useEffect(() => {
    const storedActiveAliyah = localStorage.getItem(`torah-${portionId}-active-aliyah`);
    if (storedActiveAliyah) setActiveAliyahId(storedActiveAliyah);

    const storedCompleted = localStorage.getItem(`torah-${portionId}-completed-aliyot`);
    if (storedCompleted) setCompletedAliyotIds(JSON.parse(storedCompleted));
  }, [portionId]);

  useEffect(() => {
    localStorage.setItem(`torah-${portionId}-active-aliyah`, activeAliyahId);
  }, [activeAliyahId, portionId]);

  useEffect(() => {
    localStorage.setItem(`torah-${portionId}-completed-aliyot`, JSON.stringify(completedAliyotIds));
  }, [completedAliyotIds, portionId]);

  const handleToggleCompletion = (aliyahId: string) => {
    setCompletedAliyotIds(prev =>
      prev.includes(aliyahId) ? prev.filter(id => id !== aliyahId) : [...prev, aliyahId]
    );
  };

  const activeAliyah = useMemo(() => portionData.aliyot.find(a => a.id === activeAliyahId), [activeAliyahId, portionData.aliyot]);
  const { passage, loading: scriptureLoading } = useScripturePassage(activeAliyah?.reference || '', 'kjv', !!activeAliyah);

  const progress = portionData.aliyot.length > 0 
    ? (completedAliyotIds.length / portionData.aliyot.length) * 100 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 lg:flex lg:gap-8">
      {/* Left Sidebar for Desktop/Tablet - Aliyot Timeline Navigation */}
      <aside className="lg:w-1/4">
        <TorahSidebar
          portion={portionData}
          progress={progress}
          completedCount={completedAliyotIds.length}
          totalCount={portionData.aliyot.length}
          activeAliyahId={activeAliyahId}
          completedAliyotIds={completedAliyotIds}
          onSelectAliyah={setActiveAliyahId}
        />
      </aside>

      {/* Main Content Area */}
      <main className="lg:w-3/4 mt-8 lg:mt-0">
        <TorahHero portion={portionData} progress={progress} />

        {activeAliyah && (
          <div id="active-aliyah-content" className="mt-8">
            <AliyahCommentary
              aliyahNumber={portionData.aliyot.indexOf(activeAliyah!) + 1}
              title={activeAliyah.title || activeAliyah.reference || ''}
              data={{
                ...defaultAliyahData,
                ...(activeAliyah as any).data,
                // Fallback to top-level fields on the Aliyah object if the nested data object is incomplete
                summary: (activeAliyah as any).data?.summary || activeAliyah.summary || defaultAliyahData.summary,
                crossReferences: (activeAliyah as any).data?.crossReferences || activeAliyah.crossReferences || defaultAliyahData.crossReferences,
              }}
              scripturePassage={passage}
              scriptureLoading={scriptureLoading}
            />
          </div>
        )}

        {/* General Commentary Section (if needed, separate from Aliyah-specific) */}
        <div className="mt-8">
          <CommentarySection
            commentary={[]} // Populate with general commentary data
            messianicConnections={portionData.messianicConnections}
            ntConnections={portionData.ntConnections}
          />
        </div>

        {/* Hebrew Explorer Section */}
        <div className="mt-8">
          <HebrewExplorer keywords={portionData.keywords} />
        </div>
      </main>
    </div>
  );
}





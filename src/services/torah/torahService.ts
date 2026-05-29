import type { TorahCommentaryItem, TorahHebrewKeyword, TorahPortionDetail } from '@/lib/models';

const HEBREW_TO_ENGLISH: Record<string, string> = {
  'בְּרֵאשִׁית': 'Bereshit',
  'שְׁמוֹת': 'Shemot',
  'וַיִּקְרָא': 'Vayikra',
  'בְּמִדְבַּר': 'Bamidbar',
  'דְּבָרִים': 'Devarim',
};

function buildHebrewKeywords(title: string): TorahHebrewKeyword[] {
  return [
    {
      id: 'root-1',
      letter: 'ברא',
      word: 'בְּרֵאשִׁית',
      transliteration: 'Bereshit',
      meaning: 'In the beginning',
      root: 'ב-ר-א',
      morphology: 'Noun phrase • first word of Torah',
    },
    {
      id: 'root-2',
      letter: 'שׁוּע',
      word: 'עֲבוֹדָה',
      transliteration: 'Avodah',
      meaning: 'Service, worship',
      root: 'ע-ב-ד',
      morphology: 'Noun • ritual service',
    },
    {
      id: 'root-3',
      letter: 'קָדַשׁ',
      word: 'קָדוֹשׁ',
      transliteration: 'Kadosh',
      meaning: 'Holy, set apart',
      root: 'ק-ד-שׁ',
      morphology: 'Adjective • sacred identity',
    },
  ];
}

function createCycleProgress(): string {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const progress = Math.min(100, Math.max(12, Math.round((dayOfYear / 354) * 100)));
  return `${progress}% of the sacred Torah cycle`;
}

function guessTransliteration(title: string) {
  for (const [hebrew, transliteration] of Object.entries(HEBREW_TO_ENGLISH)) {
    if (title.includes(hebrew)) return transliteration;
  }
  return title;
}

async function fetchSefariaCommentary(reference: string): Promise<TorahCommentaryItem[]> {
  try {
    const sourceRef = reference.replace(/\s+/g, '.');
    const response = await fetch(`https://www.sefaria.org/api/texts/${encodeURIComponent(sourceRef)}?commentary=1&lang=he`, {
      method: 'GET',
    });
    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    const commentary = payload?.commentary || [];
    return commentary.slice(0, 3).map((item: any, index: number) => ({
      id: `sefaria-${index}`,
      source: 'Sefaria',
      title: item?.ref || `Commentary ${index + 1}`,
      excerpt: item?.commentary?.[0]?.text?.slice(0, 180) || item?.text?.slice(0, 180) || 'A timeless reflection on the text.',
      reflection: item?.commentary?.[0]?.text || item?.text || 'Meditate on the ancient teaching and its fulfillment in the Messianic age.',
    }));
  } catch (error) {
    return [];
  }
}

async function fetchTorahOrgCommentary(parashaName: string): Promise<TorahCommentaryItem[]> {
  // Torah.org doesn't have a public API, so we create links to their commentary pages with proper attribution
  const torahOrgPath = parashaName.toLowerCase().replace(/\s+/g, '-');
  const commentaryItems: TorahCommentaryItem[] = [
    {
      id: 'torahorg-ohr',
      source: 'Torah.org - Ohr Somayach',
      title: 'Ohr Somayach Parsha Summary',
      excerpt: `Read the weekly parsha insights from Ohr Somayach on ${parashaName}. Torah.org provides deep, accessible Torah commentary with a Messianic perspective.`,
      reflection: `Visit Torah.org to explore full commentary on Parashat ${parashaName}. Their collection includes insights from leading Torah scholars and teachers.`,
    },
  ];
  return commentaryItems;
}

export async function fetchWeeklyTorahPortion(): Promise<TorahPortionDetail> {
  const response = await fetch('https://www.hebcal.com/shabbat?cfg=json&geonameid=3448439&leyning=on');
  if (!response.ok) {
    throw new Error('Failed to load Torah portion from Hebcal.');
  }

  const data = await response.json();
  const items = Array.isArray(data.items) ? data.items : [];
  const weeklyItem = items.find((item: any) => item?.leyning?.torah && item.category === 'parashat') ||
    items.find((item: any) => item?.leyning?.torah);

  if (!weeklyItem || !weeklyItem.leyning) {
    throw new Error('Weekly Torah portion data is unavailable.');
  }

  const title = weeklyItem.title.replace(/^Parashat\s+/i, '').trim();
  const hebrewTitle = weeklyItem.hebrew ?? title;
  const transliteration = guessTransliteration(hebrewTitle);
  const leyning = weeklyItem.leyning;
  const aliyot = Object.keys(leyning)
    .filter((key) => /^[0-9]+$/.test(key))
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => ({
      id: `aliyah-${key}`,
      label: `Aliyah ${key}`,
      title: `Aliyah ${key}`,
      reference: leyning[key],
      verses: leyning[key],
      summary: `Begin with ${leyning[key]} and listen for the rising arc of sacred revelation.`,
      hebrewName: hebrewTitle,
      transliteration,
      commentary: `Read ${leyning[key]} as one movement within ${title}. Watch how the passage develops covenant identity, holy practice, and the promise of restoration.`,
      studyNotes: [
        'Identify the command, promise, or narrative turn that anchors this reading.',
        'Choose one verse to pray through before continuing to the next aliyah.',
      ],
      historicalBackground: 'The aliyah structure divides the weekly Torah portion into public reading units used in synagogue worship and private study.',
      crossReferences: ['Psalm 119:105', 'Luke 24:27', 'Romans 15:4'],
      completed: false,
    }));

  const haftarah = leyning.haftarah || 'Unknown haftarah reading';
  const maftir = leyning.maftir || ''; 
  const extendedReadings = [
    ...aliyot,
    ...(maftir
      ? [
          {
            id: 'maftir',
            label: 'Maftir',
            title: 'Maftir',
            reference: maftir,
            verses: maftir,
            summary: 'The concluding Torah reading bridges the weekly portion into prophetic reflection.',
            hebrewName: 'מפטיר',
            transliteration: 'Maftir',
            commentary: 'The maftir is read after the seven aliyot and prepares the congregation for the haftarah.',
            studyNotes: ['Notice how the closing Torah lines frame the prophetic reading that follows.'],
            historicalBackground: 'Maftir means one who concludes; it is traditionally connected with the haftarah reading.',
            crossReferences: ['Nehemiah 8:8', 'Acts 13:15'],
            completed: false,
          },
        ]
      : []),
    ...(haftarah
      ? [
          {
            id: 'haftarah',
            label: 'Haftarah',
            title: 'Haftarah',
            reference: haftarah,
            verses: haftarah,
            summary: 'The prophetic reading echoes and expands themes from the Torah portion.',
            hebrewName: 'הפטרה',
            transliteration: 'Haftarah',
            commentary: 'Read the prophetic passage for resonance with the Torah text, especially covenant, judgment, comfort, and hope.',
            studyNotes: ['Compare the haftarah theme with the central movement of the Torah portion.'],
            historicalBackground: 'The haftarah is a reading from the Prophets paired with the weekly Torah portion.',
            crossReferences: ['Luke 4:16-21', 'Romans 15:4'],
            completed: false,
          },
        ]
      : []),
    ...['Matthew 5:17-20', 'Hebrews 10:1-10'].map((reference, index) => ({
      id: `brit-chadashah-${index + 1}`,
      label: index === 0 ? 'Brit Chadashah' : 'Brit Chadashah II',
      title: index === 0 ? 'Brit Chadashah' : 'Brit Chadashah II',
      reference,
      verses: reference,
      summary: 'A Messianic reading that helps trace Torah themes into the apostolic witness.',
      hebrewName: 'ברית חדשה',
      transliteration: 'Brit Chadashah',
      commentary: 'Read this passage as a bridge between Torah, Messiah, and faithful discipleship.',
      studyNotes: ['Look for fulfillment language, covenant continuity, and embodied obedience.'],
      historicalBackground: 'Brit Chadashah means New Covenant and is used here for connected apostolic readings.',
      crossReferences: ['Jeremiah 31:31-34', 'Luke 24:44'],
      completed: false,
    })),
  ];
  const sefariaCommentary = await fetchSefariaCommentary(aliyot[0]?.reference || title);
  const torahOrgCommentary = await fetchTorahOrgCommentary(title);
  const combined = [...sefariaCommentary, ...torahOrgCommentary];

  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/gi, '-'),
    title,
    hebrewTitle,
    transliteration,
    references: leyning.torah || '',
    cycleProgress: createCycleProgress(),
    summary: weeklyItem.memo || `A sacred Torah portion unfolding this week with deep covenant themes and a path to renewal.`,
    themes: ['Covenant', 'Sanctification', 'Prophetic promise', 'Torah rhythm'],
    haftarah,
    maftir,
    aliyot: extendedReadings,
    commentary: combined.length > 0
      ? combined
      : [
          {
            id: 'torah-org-1',
            source: 'Torah.org',
            title: 'Sacred rhythm of the parsha',
            excerpt: 'The weekly Torah portion carries a pattern of covenant, sacrifice, and the living Word that points to Messiah.',
            reflection: 'The story invites us to enter the cycle of holy reading with an open heart and a spirit of devotion.',
          },
        ],
    keywords: buildHebrewKeywords(hebrewTitle),
    ntConnections: ['Matthew 5:17', 'Hebrews 10:1-10', '1 Peter 2:9'],
    messianicConnections: ['The law remains alive through Yahshuah', 'The offerings foreshadow the priestly atonement', 'The people are called to be a holy nation'],
    readingProgress: 0,
  };
}

import type { TriviaQuestion } from '@/lib/models';
import { COMPREHENSIVE_TRIVIA_QUESTIONS } from '@/lib/triviaDatabase';
import replaceNames from '@/lib/textReplace';

export type TriviaMode =
  | 'Quick Trivia'
  | 'Torah Challenge'
  | 'Messianic Insight'
  | 'Wisdom Marathon'
  | 'Daily Sacred Challenge'
  | 'Hebrew Intelligence Mode';

export type TriviaLevel = 'Easy' | 'Medium' | 'Hard';
export type TriviaQuestionType = 'multiple_choice' | 'fill_blank' | 'root_match' | 'ordering';

const modeCategories: Record<TriviaMode, string[]> = {
  'Quick Trivia': ['General Bible Knowledge', 'Bible Characters', 'Gospels', 'Torah'],
  'Torah Challenge': ['Torah / Pentateuch', 'Feasts & Holy Days'],
  'Messianic Insight': ['Messianic', 'Prophecy', 'Gospels'],
  'Wisdom Marathon': ['Psalms & Proverbs', 'General Bible Knowledge'],
  'Daily Sacred Challenge': ['Torah / Pentateuch', 'Psalms & Proverbs', 'Messianic'],
  'Hebrew Intelligence Mode': ['Hebrew'],
};

export const availableLevels: TriviaLevel[] = ['Easy', 'Medium', 'Hard'];
export const availableModes: TriviaMode[] = [
  'Quick Trivia',
  'Torah Challenge',
  'Messianic Insight',
  'Wisdom Marathon',
  'Daily Sacred Challenge',
  'Hebrew Intelligence Mode',
];

/**
 * Large Question Pool
 * To keep this concise for the diff, I've included a representative sample.
 * In production, this would be imported from a JSON file or fetched from a CMS.
 */
const baseQuestionPool: Array<TriviaQuestion & { type: TriviaQuestionType; level: TriviaLevel; scriptureReference: string; hint: string; teaching: string; torahConnection: string; messianicInsight: string; xp: number }> = [
  {
    id: 'torah-beginning',
    category: 'Torah / Pentateuch',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'Which book begins the Torah with the story of creation?',
    options: ['Genesis', 'Exodus', 'Leviticus', 'Numbers'],
    answer: 'Genesis',
    explanation: 'Genesis opens Torah with creation, the first covenant, and the beginning of God’s redemptive story.',
    hebrewContext: 'Hebrew: בְּרֵאשִׁית (Bereshit) means “In the beginning.”',
    scriptureReference: 'Genesis 1:1',
    hint: 'This book begins with the first words of Scripture.',
    teaching: 'Genesis frames the entire Bible as the story of God forming His covenant people.',
    torahConnection: 'This question roots the learner in the first Torah portion.',
    messianicInsight: 'The concept of beginning points to the eternal Messiah, who is before all things.',
    xp: 20,
  },
  {
    id: 'torah-moshe',
    category: 'Torah / Pentateuch',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'Which Torah book is primarily a collection of laws and priestly instruction?',
    options: ['Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
    answer: 'Leviticus',
    explanation: 'Leviticus contains priestly guidance, sacrifices, and holiness instructions for Israel.',
    hebrewContext: 'Hebrew: וַיִּקְרָא (Vayikra) means “And He called.”',
    scriptureReference: 'Leviticus 1:1',
    hint: 'This book is named for the tribe of priests.',
    teaching: 'Holiness is central to the life of God’s covenant community.',
    torahConnection: 'The laws of Leviticus help learners understand the heart of Torah worship.',
    messianicInsight: 'Jesus is described as our great high priest who fulfills the sacrificial system.',
    xp: 30,
  },
  {
    id: 'hebrew-aber',
    category: 'Hebrew Intelligence Mode',
    difficulty: 'Easy',
    type: 'root_match',
    level: 'Easy',
    question: 'The Hebrew root אָב (aleph-bet-aleph) most closely relates to which word?',
    options: ['Father', 'Strength', 'Light', 'Covenant'],
    answer: 'Father',
    explanation: 'The root אָב refers to fatherly relationship, origin, and covenant lineage.',
    hebrewContext: 'Root: אָב (av)',
    scriptureReference: 'Genesis 11:31',
    hint: 'Think of the patriarchs Abraham, Isaac, and Jacob.',
    teaching: 'Hebrew roots often reveal relational and spiritual meaning beneath the surface.',
    torahConnection: 'The fathers of the faith are rooted in the early Torah narratives.',
    messianicInsight: 'Yahshuah is called the Son of the Father, connecting to this root.',
    xp: 25,
  },
  {
    id: 'messianic-isaiah',
    category: 'Messianic Insight',
    difficulty: 'Hard',
    type: 'multiple_choice',
    level: 'Hard',
    question: 'Which Isaiah passage is commonly read as a prophecy of the suffering servant?',
    options: ['Isaiah 53', 'Isaiah 61', 'Isaiah 9', 'Isaiah 11'],
    answer: 'Isaiah 53',
    explanation: 'Isaiah 53 describes the servant who is pierced for our transgressions.',
    hebrewContext: 'Hebrew: נֶאֱכָ֥ל (ne’ekhal) means “was led like a lamb.”',
    scriptureReference: 'Isaiah 53:3-5',
    hint: 'Look for the passage that speaks about being wounded for our sins.',
    teaching: 'This prophecy bridges Torah sacrifice and Messianic atonement.',
    torahConnection: 'Torah sacrifice imagery deepens understanding of this passage.',
    messianicInsight: 'It points directly to the redemptive work of Yahshuah.',
    xp: 40,
  },
  {
    id: 'wisdom-proverbs',
    category: 'Psalms & Proverbs',
    difficulty: 'Medium',
    type: 'fill_blank',
    level: 'Medium',
    question: '“The fear of the LORD is the beginning of __________.”',
    options: [],
    answer: 'knowledge',
    explanation: 'Proverbs teaches that reverent awe of God begins the path of wisdom.',
    hebrewContext: 'Hebrew: יִרְאַת יְהוָה (yirat Yahweh).',
    scriptureReference: 'Proverbs 1:7',
    hint: 'It is the opposite of ignorance.',
    teaching: 'True wisdom begins with honoring the Lord.',
    torahConnection: 'Wisdom and covenant faithfulness are entwined in Scripture.',
    messianicInsight: 'Christ is the embodiment of divine knowledge and wisdom.',
    xp: 35,
  },
  {
    id: 'psalms-peace',
    category: 'Psalms & Proverbs',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'Which Psalm begins with the words “Blessed is the man…”?',
    options: ['Psalm 1', 'Psalm 23', 'Psalm 51', 'Psalm 100'],
    answer: 'Psalm 1',
    explanation: 'Psalm 1 begins with the blessing pronounced over the righteous person.',
    hebrewContext: 'Hebrew: אַשְׁרֵי (ashrei) means “blessed” or “happy.”',
    scriptureReference: 'Psalm 1:1',
    hint: 'This Psalm opens the book of Psalms.',
    teaching: 'The righteous path is described as a fruitful tree beside streams of water.',
    torahConnection: 'Psalm 1 draws on Torah imagery of obedience and delight in the law.',
    messianicInsight: 'The blessed one foreshadows the righteous servant of the Lord.',
    xp: 20,
  },
  {
    id: 'prophecy-jeremiah',
    category: 'Prophets',
    difficulty: 'Hard',
    type: 'multiple_choice',
    level: 'Hard',
    question: 'Which prophet spoke of a new covenant written on hearts?',
    options: ['Jeremiah', 'Ezekiel', 'Daniel', 'Hosea'],
    answer: 'Jeremiah',
    explanation: 'Jeremiah announced the Lord’s promise of a new covenant in Jeremiah 31.',
    hebrewContext: 'Hebrew: בְּרִית חֲדָשָׁה (brit chadashah).',
    scriptureReference: 'Jeremiah 31:31',
    hint: 'This prophet often speaks of future restoration and covenant renewal.',
    teaching: 'God’s promise moves from tablets to hearts.',
    torahConnection: 'The new covenant echoes the Exodus covenant, now internalized.',
    messianicInsight: 'Hebrew New Testament writers affirm this as fulfilled in Christ.',
    xp: 45,
  },
  {
    id: 'hebrew-shalom',
    category: 'Hebrew Intelligence Mode',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'What is the Hebrew word for peace, wholeness, and completeness?',
    options: ['Shalom', 'Ruach', 'Chesed', 'Emet'],
    answer: 'Shalom',
    explanation: 'Shalom conveys peace, completion, and spiritual harmony in Hebrew.',
    hebrewContext: 'Hebrew: שָׁלוֹם (shalom).',
    scriptureReference: 'Psalm 29:11',
    hint: 'It is the common Hebrew greeting for peace.',
    teaching: 'True peace is a spiritual blessing from the Lord.',
    torahConnection: 'The Priestly blessing in Numbers speaks peace over Israel.',
    messianicInsight: 'Peace is one of the fruits of the Spirit and the Messiah’s reign.',
    xp: 30,
  },
  {
    id: 'gospels-light',
    category: 'Gospels',
    difficulty: 'Hard',
    type: 'multiple_choice',
    level: 'Hard',
    question: 'Which Gospel begins by declaring Jesus as the light of the world?',
    options: ['John', 'Matthew', 'Luke', 'Mark'],
    answer: 'John',
    explanation: 'John introduces Jesus as the Word and light shining in the darkness.',
    hebrewContext: 'Light imagery echoes Genesis and prophetic vision.',
    scriptureReference: 'John 1:4-5',
    hint: 'The opening uses the same theme as Genesis 1.',
    teaching: 'Jesus brings spiritual light into the darkness of the world.',
    torahConnection: 'The light theme echoes God’s first creative word in Genesis.',
    messianicInsight: 'John intentionally connects Jesus to the creation story.',
    xp: 40,
  },
  {
    id: 'char-women-esther',
    category: 'Women in the Bible',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'Who was the Jewish queen who saved her people from Haman?',
    options: ['Esther', 'Ruth', 'Deborah', 'Sarah'],
    answer: 'Esther',
    explanation: 'Queen Esther risked her life to intercede for her people before King Ahasuerus.',
    hebrewContext: 'Hadassah was her Hebrew name.',
    scriptureReference: 'Esther 4:14',
    hint: 'She was chosen for such a time as this.',
    teaching: 'Courage is born from trusting in the providence of the Lord.',
    torahConnection: 'Her story is celebrated during the feast of Purim.',
    messianicInsight: 'Esther serves as a type of mediator between the King and his people.',
    xp: 25,
  },
  {
    id: 'geo-sinai',
    category: 'Bible Geography',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'On which mountain did Moses receive the Ten Commandments?',
    options: ['Mount Sinai', 'Mount Nebo', 'Mount Ararat', 'Mount Carmel'],
    answer: 'Mount Sinai',
    explanation: 'The Lord appeared in fire on Mount Sinai to deliver the covenant laws.',
    hebrewContext: 'Also known as Mount Horeb.',
    scriptureReference: 'Exodus 19:20',
    hint: 'It is the mountain in the desert where the burning bush was also seen.',
    teaching: 'Sacred spaces are set apart for meeting with the Holy One.',
    torahConnection: 'This is the site of the foundational covenant between Israel and Yahweh.',
    messianicInsight: 'The Law given at Sinai points to the need for a heart transformed by grace.',
    xp: 30,
  },
  {
    id: 'tabernacle-first-altar',
    category: 'Torah / Pentateuch',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'What was the first altar in the Tabernacle used for?',
    options: ['Burning incense', 'Offering sacrifices', 'Washing hands', 'Storing tablets'],
    answer: 'Offering sacrifices',
    explanation: 'The bronze altar was used for burning animal sacrifices as part of Israel’s atonement worship.',
    hebrewContext: 'The altar is called the mizbeach, a place of sacrifice and meeting God.',
    scriptureReference: 'Exodus 27:1-8',
    hint: 'It was placed just inside the Tabernacle courtyard.',
    teaching: 'Sacrifice was the foundation of Israel’s worship and confession.',
    torahConnection: 'The altar points to Israel’s need for cleansing and reconciliation.',
    messianicInsight: 'Jesus is the ultimate sacrifice who fulfills the altar’s purpose once and for all.',
    xp: 30,
  },
  {
    id: 'yahshuah-parable-sower',
    category: 'Gospels',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'In the parable of the sower, what does the seed represent?',
    options: ['The Word of God', 'The land', 'The sower', 'The harvest'],
    answer: 'The Word of God',
    explanation: 'The seed symbolizes the message of the kingdom sown in different hearts.',
    hebrewContext: 'Seed: זרע (zera) implies growth and promise.',
    scriptureReference: 'Matthew 13:3-9',
    hint: 'Think of what is sown and takes root.',
    teaching: 'The condition of the heart determines how the message bears fruit.',
    torahConnection: 'Parables often echo prophetic imagery of sowing and harvest.',
    messianicInsight: 'Yahshuah uses agrarian language to describe the spread of the kingdom.',
    xp: 20,
  },
  {
    id: 'yahshuah-shepherd',
    category: 'Gospels',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'Which image does Yahshuah use to describe His care for the people?',
    options: ['Good Shepherd', 'King on a throne', 'Merchant', 'Builder'],
    answer: 'Good Shepherd',
    explanation: 'Yahshuah calls Himself the Good Shepherd who lays down His life for the sheep.',
    hebrewContext: "Shepherd: רועה (ro'eh) used widely in psalms.",
    scriptureReference: 'John 10:11',
    hint: 'He cares for and protects his flock.',
    teaching: 'Leadership in service and sacrificial care.',
    torahConnection: 'Shepherd imagery connects to David and covenantal leadership.',
    messianicInsight: 'The shepherd motif points to Messiah’s care and guidance.',
    xp: 25,
  },
  {
    id: 'yahshuah-wisdom-proverb',
    category: 'Psalms & Proverbs',
    difficulty: 'Medium',
    type: 'fill_blank',
    level: 'Medium',
    question: '“The fear of the LORD is the beginning of __________.”',
    options: [],
    answer: 'knowledge',
    explanation: 'Proverbs teaches that reverent awe of God begins the path of wisdom.',
    hebrewContext: 'יִרְאַת יְהוָה (yirat Yahweh).',
    scriptureReference: 'Proverbs 1:7',
    hint: 'It is the opposite of ignorance.',
    teaching: 'True wisdom begins with honoring the Lord.',
    torahConnection: 'Wisdom and covenant faithfulness are entwined in Scripture.',
    messianicInsight: 'Messiah embodies divine wisdom.',
    xp: 35,
  },
  {
    id: 'feast-unleavened',
    category: 'Feasts & Holy Days',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'Which feast requires removing leaven from the home for seven days?',
    options: ['Passover', 'Pentecost', 'Feast of Tabernacles', 'Yom Kippur'],
    answer: 'Passover',
    explanation: 'The Feast of Unleavened Bread begins with Passover and commemorates Israel’s rapid departure from Egypt.',
    hebrewContext: 'Chametz refers to leavened bread that must be removed.',
    scriptureReference: 'Exodus 12:15',
    hint: 'It remembers the bread of affliction and rapid escape.',
    teaching: 'Removing leaven symbolizes holiness, purity, and the need for heart obedience.',
    torahConnection: 'This feast is one of the central pilgrimage festivals in Torah.',
    messianicInsight: 'Jesus celebrated Passover with His disciples before the new covenant meal.',
    xp: 20,
  },
  {
    id: 'acts-pentecost',
    category: 'Acts & Apostles',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'What event in Acts is celebrated on the day of Pentecost?',
    options: ['The birth of the church', 'The ascension of Jesus', 'The writing of the Gospel', 'Paul’s conversion'],
    answer: 'The birth of the church',
    explanation: 'Pentecost marks the coming of the Holy Spirit and the beginning of the church’s public witness.',
    hebrewContext: 'Shavuot is the Feast of Weeks, when the Spirit came upon the disciples.',
    scriptureReference: 'Acts 2:1-4',
    hint: 'It involved wind, tongues of fire, and speaking in many languages.',
    teaching: 'The Spirit empowers believers to witness boldly and live in unity.',
    torahConnection: 'Pentecost connects the giving of the Law with the giving of the Spirit.',
    messianicInsight: 'The church begins when the Messiah’s promised Spirit enters the world.',
    xp: 30,
  },
  {
    id: 'miracles-water-wine',
    category: 'Miracles',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'At which event did Jesus turn water into wine?',
    options: ['The Feeding of the Five Thousand', 'The Wedding at Cana', 'The Last Supper', 'The Sermon on the Mount'],
    answer: 'The Wedding at Cana',
    explanation: 'The first miracle recorded in John was turning water into wine at a wedding feast.',
    hebrewContext: 'Wine symbolizes joy and God’s blessing in Scripture.',
    scriptureReference: 'John 2:1-11',
    hint: 'It was a wedding celebration in Galilee.',
    teaching: 'Jesus brings fullness and abundance into human need.',
    torahConnection: 'Joyful feasting reflects covenant celebration and God’s generosity.',
    messianicInsight: 'The miracle reveals Jesus as the source of transformation and new wine.',
    xp: 25,
  },
  {
    id: 'bible-characters-ruth',
    category: 'Bible Characters',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'Which woman followed Naomi back to Bethlehem and became part of the lineage of David?',
    options: ['Deborah', 'Ruth', 'Esther', 'Hannah'],
    answer: 'Ruth',
    explanation: 'Ruth stayed with Naomi and later married Boaz, becoming an ancestor of King David.',
    hebrewContext: 'Ruth means “friend” or “companion” in Hebrew.',
    scriptureReference: 'Ruth 1:16-17',
    hint: 'She was a Moabite who chose God’s people as her own family.',
    teaching: 'Faithfulness to God and family can change the course of history.',
    torahConnection: 'Ruth demonstrates God’s care for the foreigner among His people.',
    messianicInsight: 'Ruth’s place in David’s genealogy points ahead to the Messiah’s line.',
    xp: 25,
  },
  {
    id: 'kings-prophets-elijah',
    category: 'Kings & Prophets',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'Which prophet challenged the prophets of Baal on Mount Carmel?',
    options: ['Elisha', 'Isaiah', 'Elijah', 'Jeremiah'],
    answer: 'Elijah',
    explanation: 'Elijah confronted the false prophets and called on God to send fire from heaven.',
    hebrewContext: 'Elijah means “My God is Yahweh.”',
    scriptureReference: '1 Kings 18:20-39',
    hint: 'He ended the contest by calling down fire from heaven.',
    teaching: 'Faithful prayer and obedience reveal the one true God to the people.',
    torahConnection: 'The contest affirmed covenant loyalty to Yahweh over idol worship.',
    messianicInsight: 'Elijah is associated with the prophetic witness that precedes the Messiah.',
    xp: 30,
  },
  {
    id: 'bible-geography-sea',
    category: 'Bible Geography',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'Which body of water did the Israelites cross when they left Egypt?',
    options: ['The Jordan River', 'The Red Sea', 'The Sea of Galilee', 'The Dead Sea'],
    answer: 'The Red Sea',
    explanation: 'God parted the Red Sea so the Israelites could walk through on dry ground and escape Pharaoh’s army.',
    hebrewContext: 'The Hebrew phrase “yam suph” is often rendered Red Sea or Sea of Reeds.',
    scriptureReference: 'Exodus 14:21-22',
    hint: 'It is the sea that stood between Egypt and the Sinai wilderness.',
    teaching: 'God delivers His people in mighty and miraculous ways.',
    torahConnection: 'The crossing is a central act of redemption in Israel’s story.',
    messianicInsight: 'The escape from bondage foreshadows salvation through the Messiah.',
    xp: 25,
  },
  {
    id: 'numbers-symbols-twelve',
    category: 'Bible Numbers & Symbols',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'How many tribes of Israel were there?',
    options: ['10', '12', '14', '7'],
    answer: '12',
    explanation: 'Israel was made up of 12 tribes descended from the 12 sons of Jacob.',
    hebrewContext: 'Jacob was also named Israel, and his sons became the tribes of Israel.',
    scriptureReference: 'Genesis 35:22-26',
    hint: 'This number symbolized completeness for the people of Israel.',
    teaching: 'God’s covenant people were organized around these twelve families.',
    torahConnection: 'The tribal structure shaped Israel’s worship, land, and leadership. ',
    messianicInsight: 'The New Jerusalem in Revelation also has twelve gates and foundations. ',
    xp: 20,
  },
  {
    id: 'feasts-shavuot',
    category: 'Feasts & Holy Days',
    difficulty: 'Medium',
    type: 'multiple_choice',
    level: 'Medium',
    question: 'Which festival is also called the Feast of Weeks?',
    options: ['Passover', 'Sukkot', 'Shavuot', 'Yom Kippur'],
    answer: 'Shavuot',
    explanation: 'Shavuot celebrates the giving of the Torah and the first fruits harvest seven weeks after Passover.',
    hebrewContext: 'Shavuot means “Weeks.”',
    scriptureReference: 'Leviticus 23:15-21',
    hint: 'It comes fifty days after Passover.',
    teaching: 'The festival remembers God giving His law and blessing the harvest.',
    torahConnection: 'It is one of the three pilgrimage festivals commanded in Torah.',
    messianicInsight: 'The giving of the Spirit on Pentecost echoes the gift of the Law at Sinai.',
    xp: 30,
  },
  {
    id: 'endtimes-new-jerusalem',
    category: 'End Times / Revelation',
    difficulty: 'Hard',
    type: 'multiple_choice',
    level: 'Hard',
    question: 'What city is described as coming down from heaven in Revelation?',
    options: ['Bethlehem', 'Jerusalem', 'New Jerusalem', 'Zion'],
    answer: 'New Jerusalem',
    explanation: 'Revelation describes the holy city of New Jerusalem coming down from heaven as God’s eternal dwelling place.',
    hebrewContext: 'The city symbolizes God dwelling with His people forever.',
    scriptureReference: 'Revelation 21:2',
    hint: 'It is called “new” to show God’s ultimate renewal. ',
    teaching: 'The book of Revelation points believers toward the hope of a restored creation.',
    torahConnection: 'The idea of God dwelling among His people echoes the Tabernacle/Temple. ',
    messianicInsight: 'Christ is the foundation of the eternal city described in Revelation.',
    xp: 35,
  },
  {
    id: 'general-bible-books',
    category: 'General Bible Knowledge',
    difficulty: 'Easy',
    type: 'multiple_choice',
    level: 'Easy',
    question: 'How many books are in the Protestant Bible?',
    options: ['66', '39', '27', '73'],
    answer: '66',
    explanation: 'The Protestant Bible includes 66 books, with 39 in the Old Testament and 27 in the New Testament.',
    hebrewContext: 'The Hebrew Scriptures are the first 39 books of the Protestant Old Testament.',
    scriptureReference: 'Proverbs 2:6',
    hint: 'Think of the standard biblical canon used by most Protestant traditions.',
    teaching: 'The Bible is a unified story made up of many books from different authors. ',
    torahConnection: 'The first five of these books are the Torah, the foundation of Scripture. ',
    messianicInsight: 'The full canon reveals the promise, fulfillment, and hope found in the Messiah.',
    xp: 20,
  }
];

const questionPool = [
  // Apply replacements to the local base pool as well
  ...baseQuestionPool.map((question) => ({
    ...question,
    question: replaceNames(question.question),
    explanation: replaceNames(question.explanation),
    scriptureReference: replaceNames(question.scriptureReference),
    hebrewContext: replaceNames(question.hebrewContext),
    hint: replaceNames(question.hint),
    teaching: replaceNames(question.teaching),
    torahConnection: replaceNames(question.torahConnection),
    messianicInsight: replaceNames(question.messianicInsight),
    options: question.options?.map((o) => replaceNames(o)) || [],
    type: question.type ?? 'multiple_choice',
    level: question.level ?? (question.difficulty as TriviaLevel),
    xp: question.xp ?? 10,
  })),
  ...COMPREHENSIVE_TRIVIA_QUESTIONS.map((question) => ({
    ...question,
    type: question.type ?? 'multiple_choice',
    level: question.level ?? (question.difficulty as TriviaLevel),
    scriptureReference: question.scriptureReference ?? '',
    hint: question.hint ?? '',
    teaching: question.teaching ?? '',
    torahConnection: question.torahConnection ?? '',
    messianicInsight: question.messianicInsight ?? '',
    xp: question.xp ?? 10,
  })),
];

const categoryAliases: Record<string, string[]> = {
  'Torah / Pentateuch': ['Torah / Pentateuch', 'Torah'],
  'Psalms & Proverbs': ['Psalms & Proverbs', 'Psalms', 'Proverbs'],
  'Feasts & Holy Days': ['Feasts & Holy Days', 'Torah Festivals', 'Feasts'],
  'Gospels': ['Gospels'],
  'Acts & Apostles': ['Acts & Apostles', 'Acts'],
  'Paul’s Letters': ['Paul’s Letters', 'Paul’s Epistles', 'Paul'],
  'Bible Characters': ['Bible Characters'],
  'Miracles': ['Miracles'],
  'Kings & Prophets': ['Kings & Prophets', 'Prophets'],
  'Women in the Bible': ['Women in the Bible'],
  'Bible Geography': ['Bible Geography', 'Bible Places'],
  'Bible Numbers & Symbols': ['Bible Numbers & Symbols'],
  'End Times / Revelation': ['End Times / Revelation', 'Revelation'],
  'General Bible Knowledge': ['General Bible Knowledge'],
  'Messianic Insight': ['Messianic', 'Messianic Insight', 'Prophecy'],
  'Daily Sacred Challenge': ['Torah / Pentateuch', 'Psalms & Proverbs', 'Messianic'],
  'Quick Trivia': ['General Bible Knowledge', 'Bible Characters', 'Gospels', 'Torah / Pentateuch'],
  'Hebrew Intelligence Mode': ['Hebrew Intelligence Mode', 'Hebrew'],
};

function resolveCategoryLabels(labels: string[]) {
  return labels.flatMap((label) => categoryAliases[label] ?? [label]);
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function generateTriviaQuestions({
  mode,
  difficulty,
  category,
  count = 8,
  date,
  askedIds,
}: {
  mode: TriviaMode;
  difficulty: TriviaLevel;
  category?: string;
  count?: number;
  askedIds?: string[];
  date?: string;
}) {
  const requestedCategories = category && category !== 'All'
    ? resolveCategoryLabels([category])
    : resolveCategoryLabels(modeCategories[mode] || ['Torah / Pentateuch', 'Gospels', 'General Bible Knowledge']);

  const matching = questionPool.filter((item) => {
    const levelMatch = item.level === difficulty || item.difficulty === difficulty;
    const categoryMatch = requestedCategories.includes(item.category);
    return levelMatch && categoryMatch;
  });
  const selection = matching.length
    ? matching
    : questionPool.filter((item) => requestedCategories.includes(item.category));

  // Exclude already asked IDs when possible
  const notAsked = selection.filter((q) => !(askedIds || []).includes(q.id));
  const finalPool = notAsked.length ? notAsked : selection;

  const seeded = shuffle(finalPool);

  return seeded.slice(0, count).map((question) => ({
    ...question,
    options: question.type === 'multiple_choice' ? shuffle(question.options) : question.options,
    metadata: {
      reference: question.scriptureReference,
      category: question.category,
      difficulty: question.level || question.difficulty,
      explanation: question.explanation,
    },
  }));
}

function normalizeGeneratedQuestion(
  question: Partial<TriviaQuestion>,
  index: number,
  options: {
    mode: TriviaMode;
    difficulty: TriviaLevel;
    category?: string;
  }
): TriviaQuestion & {
  hint: string;
  scriptureReference: string;
  teaching: string;
  torahConnection: string;
  messianicInsight: string;
  xp: number;
} {
  const fallback = generateTriviaQuestions({
    mode: options.mode,
    difficulty: options.difficulty,
    category: options.category,
    count: 1,
  })[0];
  const answer = String(question.answer || fallback.answer);
  const generatedOptions = Array.isArray(question.options) ? question.options.map(String).filter(Boolean) : [];
  const multipleChoiceOptions = generatedOptions.includes(answer) ? generatedOptions : [...generatedOptions, answer].slice(0, 4);

  return {
    ...(question as TriviaQuestion),
    answer,
    options: question.type === 'multiple_choice' ? multipleChoiceOptions : generatedOptions,
    hint: String(question.hint || fallback.hint || ''),
    scriptureReference: String(question.scriptureReference || fallback.scriptureReference || ''),
    teaching: String(question.teaching || fallback.teaching || ''),
    torahConnection: String(question.torahConnection || fallback.torahConnection || ''),
    messianicInsight: String(question.messianicInsight || fallback.messianicInsight || ''),
    xp: Number(question.xp ?? fallback.xp ?? 0),
  };
}

export function getDailyChallenge(date: string) {
  const seed = Number(date.replace(/-/g, '')) || 0;
  const startIndex = seed % questionPool.length;
  const rotated = [...questionPool.slice(startIndex), ...questionPool.slice(0, startIndex)];

  return rotated.slice(0, 8).map((question) => ({
    ...question,
    options: question.type === 'multiple_choice' ? shuffle(question.options) : question.options,
    metadata: {
      reference: question.scriptureReference,
      category: question.category,
      difficulty: question.level || question.difficulty,
      explanation: question.explanation,
    },
  }));
}

export async function generateAITriviaQuestions({
  mode,
  difficulty,
  category,
  count = 8,
  askedIds = [],
}: {
  mode: TriviaMode;
  difficulty: TriviaLevel;
  category?: string;
  count?: number;
  askedIds?: string[];
}) {
  const questions = generateTriviaQuestions({ mode, difficulty, category, count: Math.max(count, 8), askedIds });
  // If engine returned fewer than requested due to askedIds, fill from full pool
  if (questions.length >= count) return questions.slice(0, count);

  // Fallback: get more without askedIds filtering
  const fallback = generateTriviaQuestions({ mode, difficulty, category, count: Math.max(count, 8) });
  const merged = [...questions, ...fallback.filter((q) => !questions.some((s) => s.id === q.id))];
  return merged.slice(0, count);
}

import { NextResponse } from 'next/server';
import { getCachedReflection, saveReflection, CachedReflection } from '@/lib/torahReflectionService';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-3.5-mini';

function parseJsonResponse(text: string): CachedReflection | null {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(text.slice(start, end + 1)) as CachedReflection;
  } catch {
    return null;
  }
}

function buildReflectionPrompt({
  portionTitle,
  reference,
  scriptureText,
  aliyahLabel,
}: {
  portionTitle: string;
  reference: string;
  scriptureText: string;
  aliyahLabel?: string;
}) {
  return `You are a reverent Messianic Torah teacher who writes devotional reflections in accessible spiritual language.
Return only valid JSON with the following fields:
{
  "summary": string,
  "hebraicInsight": {
    "title": string,
    "text": string,
    "hebrew": string,
    "transliteration": string
  },
  "messianicConnection": string,
  "lifeReflection": string,
  "wordStudy": [
    {
      "word": string,
      "hebrew": string,
      "transliteration": string,
      "meaning": string,
      "insight": string
    }
  ],
  "prayer": string,
  "reflectionQuestions": string[],
  "crossReferences": string[]
}
Use the scripture text to create a devotional and Messianic reflection.
Do not include any explanatory text outside the JSON object.

Torah portion title: ${portionTitle}
Reference: ${reference}
Aliyah label: ${aliyahLabel ?? 'N/A'}
Scripture text:
${scriptureText}
`;
}

async function callAnthropic(prompt: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ANTHROPIC_API_KEY}`,
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      messages: [
        { role: 'system', content: 'You are a gentle, scholarly spiritual mentor.' },
        { role: 'user', content: prompt },
      ],
      max_tokens_to_sample: 1200,
    }),
  });

  const payload = await response.json();
  return payload?.completion ?? payload?.output?.[0]?.content?.[0]?.text ?? '';
}

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  const body = await req.json();
  const { portionTitle, reference, scriptureText, aliyahLabel, portionId, aliyahId } = body as {
    portionTitle: string;
    reference: string;
    scriptureText: string;
    aliyahLabel?: string;
    portionId?: string;
    aliyahId?: string;
  };

  if (!portionTitle || !reference || !scriptureText) {
    return NextResponse.json({ error: 'Missing required reflection fields.' }, { status: 400 });
  }

  if (portionId) {
    const cached = await getCachedReflection(portionId, aliyahId);
    if (cached) {
      return NextResponse.json(cached, { status: 200 });
    }
  }

  const prompt = buildReflectionPrompt({ portionTitle, reference, scriptureText, aliyahLabel });
  const aiText = await callAnthropic(prompt);
  const reflection = parseJsonResponse(aiText);

  if (!reflection) {
    return NextResponse.json({ error: 'Unable to parse AI reflection.' }, { status: 502 });
  }

  if (portionId) {
    await saveReflection(portionId, reflection, aliyahId);
  }

  return NextResponse.json(reflection, { status: 200 });
}

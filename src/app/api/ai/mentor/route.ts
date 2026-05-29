import { NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-3.5-mini';

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
        { role: 'system', content: 'You are a compassionate spiritual mentor answering questions with scripture, grace, and wisdom.' },
        { role: 'user', content: prompt },
      ],
      max_tokens_to_sample: 800,
    }),
  });

  const payload = await response.json();
  return payload?.completion ?? payload?.output?.[0]?.content?.[0]?.text ?? '';
}

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ text: 'Mentor AI key is not configured.' }, { status: 500 });
  }

  const body = await req.json();
  const { prompt, tone } = body as { prompt: string; tone?: string };

  if (!prompt) {
    return NextResponse.json({ text: 'No mentor prompt provided.' }, { status: 400 });
  }

  const guidance = `Respond as a spiritual mentor with a ${tone || 'gentle'} tone. Keep answers scripture-centered, encouraging, and practical.`;
  const aiResponse = await callAnthropic(`${guidance}\nUser question: ${prompt}`);

  return NextResponse.json({ text: aiResponse || 'Mentor guidance is temporarily unavailable.' });
}

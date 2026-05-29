import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt, tone } = await req.json();
  const responseText = 'Mentor guidance is temporarily unavailable. Please try again later.';
  return NextResponse.json({ text: responseText });
}

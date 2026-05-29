import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';

export type MentorTone = 'Encouraging' | 'Scholarly' | 'Prophetic';

export interface MentorMessage {
  role: 'user' | 'mentor';
  content: string;
  timestamp: any;
  tone?: MentorTone;
}

export async function sendMessageToMentor(userId: string, content: string, tone: MentorTone) {
  const chatRef = collection(db, `users/${userId}/mentor_chat`);
  
  // Persist User Message
  await addDoc(chatRef, {
    role: 'user',
    content,
    tone,
    timestamp: serverTimestamp(),
  });

  // Call the secure API route
  const apiUrl = process.env.NEXT_PUBLIC_AI_BASE_URL
    ? `${process.env.NEXT_PUBLIC_AI_BASE_URL.replace(/\/$/, '')}/api/ai/mentor`
    : '/api/ai/mentor';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, prompt: content, tone }),
  });

  if (!response.ok) {
    throw new Error('Mentor connection failed');
  }

  const data = await response.json();
  return data.text;
}

export async function getMentorHistory(userId: string) {
  const chatRef = collection(db, `users/${userId}/mentor_chat`);
  const q = query(chatRef, orderBy('timestamp', 'desc'), limit(50));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as MentorMessage);
}
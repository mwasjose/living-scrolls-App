# Living Scrolls

A Messianic spiritual growth platform built with Next.js, TypeScript, Tailwind CSS, Firebase, and Framer Motion.

## Project Structure

- `src/app` — App Router pages and layouts
- `src/components` — Reusable UI components and design primitives
- `src/lib` — Firebase initialization and shared constants
- `src/firebase` — Firebase configuration, storage/firestore security rules, and functions scaffold
- `src/services` — Firebase service logic for auth, trivia, reading plans, and more
- `src/hooks` — React hooks for auth and realtime listeners

## Key Features

- Authentication: Login, register, forgot password
- Dashboard: Daily verse, Wisdom XP, streaks, missions, upcoming challenges
- Bible Reader: Scroll-inspired scripture reading UI
- Reading Plans: Daily / weekly / monthly plans
- Trivia: Sacred quiz categories and game-focused UX
- Live Battles: Multiplayer architecture scaffold with Battle rooms
- Torah Portions: Weekly readings and Hebrew word study
- AI Lessons: Daily wisdom and reflection content
- Hebrew Learning: Word cards, flashcards, and pronunciation
- Profile & Community: Growth analytics and Torah circles

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add Firebase environment variables to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. Run the development server:

```bash
npm run dev
```

## Notes

- Firebase config is scaffolded in `src/firebase/config.ts`
- Firestore rules are available in `src/firebase/rules.firestore.rules`
- Storage rules are available in `src/firebase/rules.storage.rules`
- A Firebase Functions starter endpoint is available in `src/firebase/functions/index.ts`

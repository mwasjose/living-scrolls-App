import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { AppShell } from '@/components/layout/AppShell';

const fira = localFont({
  variable: '--font-ui',
  src: [
    { path: '../../public/fonts/FiraSans-300.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/FiraSans-400.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/FiraSans-500.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/FiraSans-600.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/FiraSans-700.ttf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
});

const notoHebrew = localFont({
  variable: '--font-hebrew',
  src: [
    { path: '../../public/fonts/NotoSerifHebrew-400.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/NotoSerifHebrew-700.ttf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Living Scrolls',
  description:
    'A Messianic spiritual growth platform with Torah study, Bible trivia, Hebrew learning, and guided reflection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fira.variable} ${notoHebrew.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-[var(--text-on-accent)] overflow-x-hidden antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

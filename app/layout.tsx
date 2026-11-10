import type { Metadata } from 'next';
import '@/app/globals.css';
import { AppShell } from '@/components/app-shell';

export const metadata: Metadata = {
  title: 'IGNIS — Understanding Fire Beyond Gravity',
  description: 'A portable scientific intelligence platform for microgravity combustion research and spacecraft fire-safety context.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppShell>{children}</AppShell></body></html>;
}

import type { Metadata } from 'next';
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';
import '@/app/globals.css';
import { AppShell } from '@/components/app-shell';
import { SpaceBackground } from '@/components/space-background';
import { CustomCursor } from '@/components/custom-cursor';
import { SmoothScroll } from '@/components/smooth-scroll';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'IGNIS — Understanding Fire Beyond Gravity',
  description:
    'Intelligent Guidance & NASA Insights System: a premier scientific mission-control instrument for microgravity combustion research and spacecraft fire-safety intelligence.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} dark`}
    >
      <body className="bg-void text-cream antialiased font-sans min-h-screen">
        <SmoothScroll>
          <CustomCursor />
          <SpaceBackground />
          <AppShell>{children}</AppShell>
        </SmoothScroll>
      </body>
    </html>
  );
}

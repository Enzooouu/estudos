import type { Metadata, Viewport } from 'next';
import { Onest, Unbounded } from 'next/font/google';
import { IconSprite } from '@/components/Icon';
import { MotionProvider } from '@/components/MotionProvider';
import { SmoothScroll } from '@/components/SmoothScroll';
import { site } from '@/content/site';
import 'lenis/dist/lenis.css';
import './globals.css';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-unbounded',
  display: 'swap',
});
const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-onest',
  display: 'swap',
});

const title = 'JEL Box · Vidraçaria e serralheria sob medida';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: 'summary_large_image', title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#262729',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${unbounded.variable} ${onest.variable}`}>
      <body>
        {/* Sem JavaScript, nada fica escondido esperando animação */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}[data-reveal-media]{clip-path:none!important}'}</style>
        </noscript>
        <IconSprite />
        <a
          href="#conteudo"
          className="absolute left-[var(--m)] -top-16 z-50 rounded-[var(--r-sm)] bg-bronze px-4 py-2.5 text-deep focus:top-3"
        >
          Pular para o conteúdo
        </a>
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

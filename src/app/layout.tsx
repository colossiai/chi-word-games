import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '識字樂園 — 香港小學中文遊戲',
  description:
    '為香港小學 4/5 年級而設的繁體中文識字遊戲：漢字學習、填空、閱讀理解、修辭手法。',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}

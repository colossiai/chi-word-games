import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '識字樂園 — 香港小學中文遊戲',
  description:
    '取材自《香港小學學習字詞表》、分階段的繁體中文識字遊戲：漢字精讀、拼音猜詞、詞語填字、部首歸類、成語、閱讀理解、修辭與作文練習。',
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

import ModeCard from '@/components/ModeCard';

const MODES = [
  {
    href: '/characters',
    emoji: '📖',
    title: '漢字學習',
    description: '每次隨機認識一組漢字，看拼音、部首、筆畫和例詞，邊玩邊記字。',
    gradient: 'from-amber-300 to-orange-400',
  },
  {
    href: '/fill-blank',
    emoji: '✏️',
    title: '句子填空',
    description: '從句子的上下文，選出最合適的字或詞填入空格。',
    gradient: 'from-sky-300 to-blue-400',
  },
  {
    href: '/reading',
    emoji: '📚',
    title: '閱讀理解',
    description: '讀一段短文，再回答問題，訓練理解與思考能力。',
    gradient: 'from-emerald-300 to-green-500',
  },
  {
    href: '/rhetoric',
    emoji: '🎭',
    title: '修辭手法',
    description: '學習擬人、誇張、比喻等修辭，辨認句子用了哪種手法。',
    gradient: 'from-pink-300 to-rose-400',
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-extrabold text-brand-700 sm:text-5xl">
          識字樂園 🌈
        </h1>
        <p className="text-lg text-slate-600">香港小學中文 · 繁體字識字遊戲</p>
        <p className="mt-1 text-sm text-slate-400">選一個遊戲開始吧！</p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {MODES.map((m) => (
          <ModeCard key={m.href} {...m} />
        ))}
      </div>

      <footer className="mt-12 text-center text-sm text-slate-400">
        <p>適合 4/5 年級 · 繁體中文 · 附漢語拼音</p>
      </footer>
    </main>
  );
}

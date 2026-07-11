import ModeCard from '@/components/ModeCard';
import StagePicker from '@/components/StagePicker';

// 分階段字詞學習：跟隨頂部選擇的學習階段抽題。
const STAGED_MODES = [
  {
    href: '/characters',
    emoji: '📖',
    title: '漢字精讀',
    description: '翻卡認識常用字：拼音、部首、筆畫、字義和例詞。',
    gradient: 'from-amber-300 to-orange-400',
  },
  {
    href: '/pinyin',
    emoji: '🔤',
    title: '拼音猜詞',
    description: '看普通話拼音，選出正確的詞語，練聽辨與認讀。',
    gradient: 'from-sky-300 to-blue-400',
  },
  {
    href: '/word-fill',
    emoji: '🧩',
    title: '詞語填字',
    description: '詞語缺了一個字，從相似的字中選對，攻克錯別字。',
    gradient: 'from-violet-300 to-purple-400',
  },
  {
    href: '/radical',
    emoji: '🧭',
    title: '部首歸類',
    description: '判斷漢字的部首，建立部首概念，學會查字典。',
    gradient: 'from-teal-300 to-cyan-500',
  },
  {
    href: '/idioms',
    emoji: '🎴',
    title: '成語樂園',
    description: '四字成語填字，附白話解釋，積累成語詞彙。',
    gradient: 'from-lime-300 to-green-500',
  },
];

// 詞語運用與閱讀。組詞為分階段自動生成（高頻常用字），其餘為通用題庫。
const READING_MODES = [
  {
    href: '/compose',
    emoji: '🔗',
    title: '組詞遊戲',
    description: '常用字可以和哪個字組成詞語？高頻常用字自動出題，例子近乎無限。',
    gradient: 'from-fuchsia-300 to-pink-400',
  },
  {
    href: '/fill-blank',
    emoji: '✏️',
    title: '句子填空',
    description: '從句子的上下文，選出最合適的字或詞填入空格。',
    gradient: 'from-blue-300 to-indigo-400',
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

const WRITING_MODE = {
  href: '/writing',
  emoji: '🖋️',
  title: '作文練習',
  description: '跨文體作文題：審題提示、段落大綱、好詞佳句、自我評估與參考範文，一步步學會寫作。',
  gradient: 'from-rose-300 to-red-400',
};

function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-4 mt-8 flex items-baseline gap-2">
      <h2 className="text-xl font-bold text-slate-700">{children}</h2>
      {hint && <span className="text-sm text-slate-400">{hint}</span>}
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6 text-center">
        <h1 className="mb-3 text-4xl font-extrabold text-brand-700 sm:text-5xl">
          識字樂園 🌈
        </h1>
        <p className="text-lg text-slate-600">香港小學中文 · 繁體字識字遊戲</p>
        <p className="mt-1 text-sm text-slate-400">
          取材自教育局《香港小學學習字詞表》· 分階段循序學習
        </p>
      </header>

      <div className="flex flex-col items-center gap-2 rounded-3xl bg-white/60 p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">先選擇學習階段：</p>
        <StagePicker />
        <p className="text-xs text-slate-400">
          第一階段＝小一至小三 · 第二階段＝小四至小六（字詞學習會跟着這裏的選擇出題）
        </p>
      </div>

      <SectionTitle hint="高頻常用字 · 跟隨上方階段">📚 字詞學習</SectionTitle>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {STAGED_MODES.map((m) => (
          <ModeCard key={m.href} {...m} />
        ))}
      </div>

      <SectionTitle hint="詞語運用與閱讀">🧠 閱讀與語文</SectionTitle>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {READING_MODES.map((m) => (
          <ModeCard key={m.href} {...m} />
        ))}
      </div>

      <SectionTitle hint="分階段題目">🖋️ 寫作</SectionTitle>
      <div className="grid grid-cols-1 gap-5">
        <ModeCard {...WRITING_MODE} />
      </div>

      <footer className="mt-12 text-center text-sm text-slate-400">
        <p>適合小學 · 繁體中文 · 附普通話拼音</p>
      </footer>
    </main>
  );
}

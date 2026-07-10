import Link from 'next/link';

interface ModeCardProps {
  href: string;
  emoji: string;
  title: string;
  description: string;
  /** 卡片主色調（Tailwind 漸層 class） */
  gradient: string;
}

/** 首頁的遊戲模式入口卡 */
export default function ModeCard({ href, emoji, title, description, gradient }: ModeCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-[0.99]"
    >
      <div
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-3xl shadow-md`}
      >
        {emoji}
      </div>
      <h2 className="mb-1 text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
      <span className="mt-3 inline-block font-semibold text-brand-600 group-hover:translate-x-1">
        開始 →
      </span>
    </Link>
  );
}

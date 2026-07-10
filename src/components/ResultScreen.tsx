import Link from 'next/link';

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

function praise(ratio: number): { emoji: string; text: string } {
  if (ratio >= 1) return { emoji: '🏆', text: '滿分！你是識字小達人！' };
  if (ratio >= 0.8) return { emoji: '🌟', text: '非常好！繼續保持！' };
  if (ratio >= 0.6) return { emoji: '👍', text: '不錯喔，再接再厲！' };
  return { emoji: '💪', text: '多練習就會進步，加油！' };
}

/** 結算畫面：顯示分數、鼓勵語、重玩與返回首頁 */
export default function ResultScreen({ score, total, onRestart }: ResultScreenProps) {
  const ratio = total > 0 ? score / total : 0;
  const { emoji, text } = praise(ratio);

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white/80 p-8 text-center shadow-xl backdrop-blur">
      <div className="mb-2 text-6xl">{emoji}</div>
      <h2 className="mb-1 text-2xl font-bold text-slate-800">完成！</h2>
      <p className="mb-4 text-slate-600">{text}</p>
      <div className="mb-6 text-5xl font-extrabold text-brand-600">
        {score}
        <span className="text-2xl font-bold text-slate-400"> / {total}</span>
      </div>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-2xl bg-brand-500 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:bg-brand-600 active:scale-[0.98]"
        >
          再玩一次 🔄
        </button>
        <Link
          href="/"
          className="rounded-2xl bg-white px-6 py-3 text-lg font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          返回首頁 🏠
        </Link>
      </div>
    </div>
  );
}

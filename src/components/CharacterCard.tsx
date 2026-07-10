import type { Character } from '@/lib/types';

interface CharacterCardProps {
  character: Character;
  /** 是否已翻開（顯示詳情） */
  revealed: boolean;
  onReveal: () => void;
}

/**
 * 漢字翻卡：
 * - 未翻開：只顯示大大的漢字，鼓勵孩子先猜
 * - 翻開後：顯示拼音、字義、部首、筆畫、例詞
 */
export default function CharacterCard({ character, revealed, onReveal }: CharacterCardProps) {
  return (
    <div className="rounded-3xl bg-white/85 p-8 shadow-xl backdrop-blur">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex h-40 w-40 items-center justify-center rounded-3xl bg-brand-50 text-8xl font-bold text-brand-700 shadow-inner">
          {character.char}
        </div>

        {!revealed ? (
          <button
            type="button"
            onClick={onReveal}
            className="mt-2 rounded-2xl bg-brand-500 px-8 py-3 text-lg font-bold text-white shadow-md transition hover:bg-brand-600 active:scale-[0.98]"
          >
            看解釋 👀
          </button>
        ) : (
          <div className="w-full animate-[fadeIn_0.3s_ease] text-center">
            <p className="mb-2 text-2xl font-semibold text-brand-600">{character.pinyin}</p>
            <p className="mb-4 text-lg text-slate-700">{character.meaning}</p>
            <div className="mb-4 flex justify-center gap-3 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                部首：{character.radical}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                {character.strokes} 畫
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {character.examples.map((ex) => (
                <span
                  key={ex}
                  className="rounded-xl bg-amber-50 px-3 py-1.5 text-base text-amber-800"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

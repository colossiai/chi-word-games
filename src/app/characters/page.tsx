'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import CharacterCard from '@/components/CharacterCard';
import ProgressBar from '@/components/ProgressBar';
import ResultScreen from '@/components/ResultScreen';
import StagePicker from '@/components/StagePicker';
import { charactersByStage } from '@/data/meanings';
import { sample } from '@/lib/shuffle';
import { useStage } from '@/lib/stage';
import type { Character, Stage } from '@/lib/types';

const PER_GAME = 20;

/** 依 stage 抽卡的內層；由外層以 key={stage} 重新掛載即可換階段重抽。 */
function Deck({ stage }: { stage: Stage }) {
  const draw = useCallback(() => sample(charactersByStage(stage), PER_GAME), [stage]);

  const [deck, setDeck] = useState<Character[]>(draw);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState(0);
  const [finished, setFinished] = useState(false);

  const restart = useCallback(() => {
    setDeck(draw());
    setIndex(0);
    setRevealed(false);
    setKnown(0);
    setFinished(false);
  }, [draw]);

  const advance = useCallback(
    (isKnown: boolean) => {
      if (isKnown) setKnown((k) => k + 1);
      if (index + 1 >= deck.length) {
        setFinished(true);
        return;
      }
      setIndex((i) => i + 1);
      setRevealed(false);
    },
    [index, deck.length]
  );

  if (finished) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-8">
        <ResultScreen score={known} total={deck.length} onRestart={restart} />
        <p className="mt-4 text-center text-sm text-slate-500">
          「認識」了 {known} 個字，記得多複習不熟的字喔！
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <header className="mb-5 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white"
        >
          ← 首頁
        </Link>
        <div className="text-right">
          <h1 className="text-lg font-bold text-slate-800">漢字精讀</h1>
          <p className="text-xs text-slate-500">先猜猜看，再翻卡對答案</p>
        </div>
      </header>

      <div className="mb-4 flex justify-center">
        <StagePicker />
      </div>

      <div className="mb-5">
        <ProgressBar current={index} total={deck.length} />
      </div>

      <CharacterCard
        character={deck[index]}
        revealed={revealed}
        onReveal={() => setRevealed(true)}
      />

      {revealed && (
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => advance(false)}
            className="flex-1 rounded-2xl bg-white px-6 py-3 text-lg font-bold text-amber-700 shadow-sm ring-2 ring-amber-200 transition hover:bg-amber-50 active:scale-[0.98]"
          >
            再看看 🔁
          </button>
          <button
            type="button"
            onClick={() => advance(true)}
            className="flex-1 rounded-2xl bg-green-500 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:bg-green-600 active:scale-[0.98]"
          >
            我認識！✓
          </button>
        </div>
      )}
    </main>
  );
}

export default function CharactersPage() {
  const [stage] = useStage();
  return <Deck key={stage} stage={stage} />;
}

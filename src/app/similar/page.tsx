'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import OptionButton from '@/components/OptionButton';
import ResultScreen from '@/components/ResultScreen';
import { buildSimilarRounds, type SimilarRound } from '@/lib/generators';

export default function SimilarPage() {
  const build = useCallback(() => buildSimilarRounds(), []);
  const [deck, setDeck] = useState<SimilarRound[]>(build);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = deck[index];
  const answerIndex = round ? round.options.indexOf(round.answer) : -1;

  const answer = useCallback(
    (i: number) => {
      if (answered) return;
      setSelected(i);
      setAnswered(true);
      if (round.options[i] === round.answer) setScore((s) => s + 1);
    },
    [answered, round]
  );

  const next = useCallback(() => {
    if (index + 1 >= deck.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  }, [index, deck.length]);

  const restart = useCallback(() => {
    setDeck(build());
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }, [build]);

  if (finished) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-8">
        <ResultScreen score={score} total={deck.length} onRestart={restart} />
      </main>
    );
  }

  const selectedChar = selected !== null ? round.options[selected] : null;

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
          <h1 className="text-lg font-bold text-slate-800">相似字比較</h1>
          <p className="text-xs text-slate-500">先比較這組形近字，再選答案</p>
        </div>
      </header>

      <div className="mb-5">
        <ProgressBar current={index} total={deck.length} />
      </div>

      {/* 常駐比較卡：整組形近字 + 拼音 + 例詞 + 辨字提示 */}
      <section className="mb-5 rounded-3xl bg-white/80 p-4 shadow-lg backdrop-blur">
        <p className="mb-3 text-center text-sm font-semibold text-slate-500">
          🔍 這組字長得很像，看清楚它們的分別
        </p>
        <div
          className={`grid gap-3 ${
            round.chars.length >= 4
              ? 'grid-cols-2 sm:grid-cols-4'
              : round.chars.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-2'
          }`}
        >
          {round.chars.map((c) => {
            const isAnswer = c.char === round.answer;
            const isWrongPick = answered && selectedChar === c.char && !isAnswer;
            const ring = answered
              ? isAnswer
                ? 'ring-2 ring-green-500 bg-green-50'
                : isWrongPick
                ? 'ring-2 ring-rose-400 bg-rose-50'
                : 'bg-white'
              : 'bg-white';
            return (
              <div
                key={c.char}
                className={`flex flex-col items-center rounded-2xl p-3 shadow-sm transition ${ring}`}
              >
                <span className="text-5xl font-bold text-brand-700">{c.char}</span>
                <span className="mt-1 text-base font-semibold text-brand-500">{c.py}</span>
                <span className="mt-2 rounded-lg bg-amber-50 px-2 py-0.5 text-sm text-amber-800">
                  {c.word}
                </span>
                <span className="mt-1.5 text-center text-xs leading-snug text-slate-500">
                  {c.hint}
                </span>
                {answered && isAnswer && <span className="mt-1 text-green-600">✓</span>}
              </div>
            );
          })}
        </div>
      </section>

      {/* 題目 */}
      <section className="rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur">
        <p className="mb-1 text-center text-sm text-slate-400">
          讀音：<span className="font-mono font-semibold text-slate-600">{round.answerPy}</span>
        </p>
        <p className="mb-5 text-center text-3xl font-bold tracking-wider text-slate-800">
          {round.blanked}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {round.options.map((opt, i) => (
            <OptionButton
              key={opt}
              label={opt}
              index={i}
              selected={selected}
              answerIndex={answerIndex}
              answered={answered}
              onClick={answer}
            />
          ))}
        </div>

        {answered && (
          <div className="mt-5 space-y-4">
            <p
              className={`rounded-2xl px-4 py-3 text-center font-bold ${
                selectedChar === round.answer
                  ? 'bg-green-100 text-green-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {selectedChar === round.answer
                ? '答對了！👍'
                : `正確答案是「${round.answer}」`}
            </p>
            <button
              type="button"
              onClick={next}
              className="w-full rounded-2xl bg-brand-500 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:bg-brand-600 active:scale-[0.98]"
            >
              {index + 1 >= deck.length ? '看成績 🎉' : '下一題 →'}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

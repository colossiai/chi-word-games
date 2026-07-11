'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { commonPinyinWords, pinyinSentences, type PyItem } from '@/data/pinyin-typing';
import { sample } from '@/lib/shuffle';

type Mode = 'words' | 'sentences';
const COUNT: Record<Mode, number> = { words: 12, sentences: 6 };

function grade(acc: number): { label: string; stars: string } {
  if (acc >= 98) return { label: '優秀', stars: '⭐⭐⭐' };
  if (acc >= 90) return { label: '良好', stars: '⭐⭐' };
  if (acc >= 75) return { label: '合格', stars: '⭐' };
  return { label: '再接再厲', stars: '💪' };
}

export default function PinyinTypingPage() {
  const [mode, setMode] = useState<Mode>('words');
  const [seed, setSeed] = useState(0); // 改變即重抽

  const deck = useMemo<PyItem[]>(() => {
    const pool = mode === 'words' ? commonPinyinWords : pinyinSentences;
    return sample(pool, COUNT[mode]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, seed]);

  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shake, setShake] = useState(false);

  const restart = useCallback((nextMode?: Mode) => {
    if (nextMode) setMode(nextMode);
    setSeed((s) => s + 1);
    setIdx(0);
    setPos(0);
    setCorrect(0);
    setErrors(0);
    setStartedAt(null);
    setNow(0);
    setFinished(false);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (finished) return;
      if (e.key === 'Backspace' || e.key === 'Tab' || e.key === ' ') e.preventDefault();
      if (e.key.length !== 1) return;
      e.preventDefault();
      const target = deck[idx].py;
      if (startedAt === null) setStartedAt(Date.now());
      setNow(Date.now());
      if (e.key === target[pos]) {
        setCorrect((c) => c + 1);
        const np = pos + 1;
        if (np >= target.length) {
          if (idx + 1 >= deck.length) setFinished(true);
          else {
            setIdx((i) => i + 1);
            setPos(0);
          }
        } else {
          setPos(np);
        }
      } else {
        setErrors((x) => x + 1);
        setShake(true);
        window.setTimeout(() => setShake(false), 150);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [deck, idx, pos, finished, startedAt]);

  const item = deck[idx];
  const total = correct + errors;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
  const minutes = startedAt ? (now - startedAt) / 60000 : 0;
  const cpm = minutes > 0.02 ? Math.round(correct / minutes) : 0;
  const g = grade(accuracy);

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white"
        >
          ← 首頁
        </Link>
        <div className="text-right">
          <h1 className="text-lg font-bold text-slate-800">拼音打字練習</h1>
          <p className="text-xs text-slate-500">看中文，打出普通話拼音</p>
        </div>
      </header>

      {/* 模式切換 */}
      <div className="mb-4 flex justify-center gap-2">
        {(['words', 'sentences'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => restart(m)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              m === mode ? 'bg-brand-500 text-white shadow' : 'bg-white/70 text-slate-500 hover:bg-white'
            }`}
          >
            {m === 'words' ? '常用詞語' : '常用句子'}
          </button>
        ))}
      </div>

      {finished ? (
        <section className="rounded-3xl bg-white/85 p-8 text-center shadow-xl">
          <p className="mb-1 text-4xl">{g.stars}</p>
          <p className="mb-4 text-2xl font-extrabold text-brand-600">評分：{g.label}</p>
          <div className="my-4 flex justify-center gap-6 text-slate-700">
            <Stat label="正確率" value={`${accuracy}%`} />
            <Stat label="速度" value={`${cpm}`} unit="字母/分" />
            <Stat label="錯誤" value={`${errors}`} unit="次" />
          </div>
          <button
            type="button"
            onClick={() => restart()}
            className="rounded-2xl bg-brand-500 px-6 py-3 font-bold text-white shadow-md transition hover:bg-brand-600"
          >
            換一批再來 🔁
          </button>
        </section>
      ) : (
        <>
          <div className="mb-3 flex justify-between rounded-2xl bg-white/70 px-4 py-2 text-sm text-slate-600">
            <span>第 {idx + 1} / {deck.length}</span>
            <span>正確率 <b className="text-brand-600">{accuracy}%</b></span>
            <span>速度 <b className="text-brand-600">{cpm}</b> 字母/分</span>
          </div>

          <section
            className={`rounded-3xl bg-white/85 p-6 shadow-xl transition ${
              shake ? 'ring-2 ring-rose-300' : ''
            }`}
          >
            {/* 中文題目 */}
            <p className="mb-1 text-center text-sm text-slate-400">請打出下面的拼音</p>
            <p className="mb-5 text-center text-4xl font-bold tracking-widest text-slate-800">
              {item.zh}
            </p>

            {/* 拼音目標（逐字上色） */}
            <p className="text-center font-mono text-2xl tracking-wider sm:text-3xl">
              {[...item.py].map((c, i) => {
                const state = i < pos ? 'done' : i === pos ? 'cur' : 'todo';
                return (
                  <span
                    key={i}
                    className={
                      state === 'done'
                        ? 'text-emerald-500'
                        : state === 'cur'
                        ? 'rounded bg-brand-200 text-brand-800'
                        : 'text-slate-300'
                    }
                  >
                    {c === ' ' ? '␣' : c}
                  </span>
                );
              })}
            </p>
          </section>

          <p className="mt-4 text-center text-xs text-slate-400">
            ⌨️ 請用電腦鍵盤打出拼音（不用打聲調）；音節之間的空格也要按空白鍵。
          </p>
        </>
      )}
    </main>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <p className="text-3xl font-extrabold text-brand-600">{value}</p>
      <p className="text-xs text-slate-500">
        {label}
        {unit ? `（${unit}）` : ''}
      </p>
    </div>
  );
}

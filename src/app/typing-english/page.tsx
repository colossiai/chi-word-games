'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FINGERS,
  KEY_FINGER,
  KEY_ROWS,
  HOME_KEYS,
  BUMP_KEYS,
  targetForChar,
  type Finger,
} from '@/lib/keyboard';
import { typingLessons } from '@/data/typing';

const FINGER_ORDER: Finger[] = ['L5', 'L4', 'L3', 'L2', 'R2', 'R3', 'R4', 'R5', 'THUMB'];

export default function TypingPage() {
  const [lessonId, setLessonId] = useState(typingLessons[0].id);
  const lesson = typingLessons.find((l) => l.id === lessonId) ?? typingLessons[0];

  const [lineIdx, setLineIdx] = useState(0);
  const [pos, setPos] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shake, setShake] = useState(false);

  const reset = useCallback(() => {
    setLineIdx(0);
    setPos(0);
    setCorrect(0);
    setErrors(0);
    setStartedAt(null);
    setNow(0);
    setFinished(false);
  }, []);

  const pick = useCallback(
    (id: string) => {
      setLessonId(id);
      reset();
    },
    [reset]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (finished) return;
      if (e.key === 'Backspace' || e.key === 'Tab' || e.key === ' ') e.preventDefault();
      if (e.key.length !== 1) return; // 忽略 Shift、方向鍵等
      e.preventDefault();
      const line = lesson.lines[lineIdx];
      if (startedAt === null) setStartedAt(Date.now());
      setNow(Date.now());
      if (e.key === line[pos]) {
        setCorrect((c) => c + 1);
        const np = pos + 1;
        if (np >= line.length) {
          if (lineIdx + 1 >= lesson.lines.length) setFinished(true);
          else {
            setLineIdx((i) => i + 1);
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
  }, [lesson, lineIdx, pos, finished, startedAt]);

  const line = lesson.lines[lineIdx];
  const expected = finished ? '' : line[pos];
  const target = finished ? null : targetForChar(expected);

  const total = correct + errors;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
  const minutes = startedAt ? (now - startedAt) / 60000 : 0;
  const cpm = minutes > 0.02 ? Math.round(correct / minutes) : 0;
  const lessonIndex = typingLessons.findIndex((l) => l.id === lessonId);
  const nextLesson = typingLessons[lessonIndex + 1];

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white"
        >
          ← 首頁
        </Link>
        <div className="text-right">
          <h1 className="text-lg font-bold text-slate-800">英文打字練習</h1>
          <p className="text-xs text-slate-500">學正確指法，循序漸進練盲打</p>
        </div>
      </header>

      {/* 課程選擇 */}
      <div className="mb-4 flex flex-wrap gap-2">
        {typingLessons.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => pick(l.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              l.id === lessonId
                ? 'bg-brand-500 text-white shadow'
                : 'bg-white/70 text-slate-500 hover:bg-white'
            }`}
          >
            {l.title}
          </button>
        ))}
      </div>

      <p className="mb-4 rounded-2xl bg-amber-50 px-4 py-2 text-sm text-amber-800">
        💡 {lesson.focus}
      </p>

      {finished ? (
        <section className="rounded-3xl bg-white/85 p-8 text-center shadow-xl">
          <p className="mb-2 text-3xl font-extrabold text-brand-600">完成！🎉</p>
          <div className="my-5 flex justify-center gap-6 text-slate-700">
            <Stat label="正確率" value={`${accuracy}%`} />
            <Stat label="速度" value={`${cpm}`} unit="字元/分" />
            <Stat label="錯誤" value={`${errors}`} unit="次" />
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-2xl bg-white px-6 py-3 font-bold text-brand-700 shadow-sm ring-2 ring-brand-200 transition hover:bg-brand-50"
            >
              再練一次 🔁
            </button>
            {nextLesson && (
              <button
                type="button"
                onClick={() => pick(nextLesson.id)}
                className="rounded-2xl bg-brand-500 px-6 py-3 font-bold text-white shadow-md transition hover:bg-brand-600"
              >
                下一課 →
              </button>
            )}
          </div>
        </section>
      ) : (
        <>
          {/* 統計 */}
          <div className="mb-3 flex justify-between rounded-2xl bg-white/70 px-4 py-2 text-sm text-slate-600">
            <span>第 {lineIdx + 1} / {lesson.lines.length} 行</span>
            <span>正確率 <b className="text-brand-600">{accuracy}%</b></span>
            <span>速度 <b className="text-brand-600">{cpm}</b> 字元/分</span>
          </div>

          {/* 目標文字 */}
          <section
            className={`mb-4 rounded-3xl bg-white/85 p-6 shadow-xl transition ${
              shake ? 'ring-2 ring-rose-300' : ''
            }`}
          >
            <p className="text-center font-mono text-3xl tracking-wider sm:text-4xl">
              {[...line].map((c, i) => {
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

          {/* 手指提示 */}
          {target && (
            <p className="mb-3 text-center text-sm text-slate-600">
              請按{' '}
              <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono font-bold text-white">
                {expected === ' ' ? '空白鍵' : expected}
              </span>{' '}
              — 用 <b>{FINGERS[target.finger].name}</b>
              {target.needsShift && target.shiftFinger && (
                <>
                  ，同時用 <b>{FINGERS[target.shiftFinger].name}</b> 按住 <b>Shift ⇧</b>
                </>
              )}
            </p>
          )}

          <Keyboard targetBase={target?.base} needsShift={target?.needsShift ?? false} />
          <Legend />
        </>
      )}

      <p className="mt-4 text-center text-xs text-slate-400">
        ⌨️ 請用電腦的實體鍵盤練習；把手指放回基準鍵，盡量不要看鍵盤。
      </p>
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

function Keyboard({ targetBase, needsShift }: { targetBase?: string; needsShift: boolean }) {
  const indent = ['', 'pl-4', 'pl-6', 'pl-10']; // 模擬鍵盤錯位
  return (
    <div className="rounded-3xl bg-white/70 p-3 shadow-inner">
      {KEY_ROWS.map((row, r) => (
        <div key={r} className={`flex justify-center gap-1 sm:gap-1.5 ${indent[r]} mb-1`}>
          {row.map((key) => {
            const info = FINGERS[KEY_FINGER[key]];
            const active = key === targetBase;
            return (
              <div
                key={key}
                className={`flex h-9 w-8 items-center justify-center rounded-lg font-mono text-sm font-semibold text-slate-700 sm:h-11 sm:w-10 ${
                  info.bg
                } ${HOME_KEYS.has(key) ? 'border-2 border-slate-400' : ''} ${
                  active ? `scale-110 ring-4 ${info.ring} shadow-lg` : ''
                }`}
              >
                {key}
                {BUMP_KEYS.has(key) && <span className="ml-0.5 text-[8px]">▬</span>}
              </div>
            );
          })}
        </div>
      ))}
      {/* 空白鍵 */}
      <div className="mt-1 flex justify-center">
        <div
          className={`flex h-9 w-64 items-center justify-center rounded-lg text-xs font-semibold text-slate-600 sm:h-11 ${
            FINGERS.THUMB.bg
          } ${targetBase === ' ' ? `scale-105 ring-4 ${FINGERS.THUMB.ring} shadow-lg` : ''}`}
        >
          空白鍵（拇指）
        </div>
      </div>
      {needsShift && (
        <p className="mt-2 text-center text-xs font-semibold text-rose-600">
          ⇧ 這個字要按住 Shift（用另一隻手的尾指）
        </p>
      )}
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1.5 rounded-2xl bg-white/60 p-3 text-xs text-slate-600">
      {FINGER_ORDER.map((f) => (
        <span key={f} className="inline-flex items-center gap-1">
          <span className={`inline-block h-3 w-3 rounded ${FINGERS[f].bg}`} />
          {FINGERS[f].name}
        </span>
      ))}
    </div>
  );
}

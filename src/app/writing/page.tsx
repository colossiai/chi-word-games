'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import StagePicker from '@/components/StagePicker';
import { writingByStage, type WritingPrompt } from '@/data/writing';
import { useStage } from '@/lib/stage';

/** 計算中文字數（不計空白與換行）。 */
function countChars(text: string): number {
  return [...text.replace(/\s/g, '')].length;
}

// ── 作文詳情：鷹架 + 寫作區（localStorage 自動儲存） ──
function Detail({ prompt, onBack }: { prompt: WritingPrompt; onBack: () => void }) {
  const storageKey = `sziyuen.writing.${prompt.id}`;
  const [text, setText] = useState('');
  const [checked, setChecked] = useState<boolean[]>(() =>
    prompt.checklist.map(() => false)
  );
  const [showModel, setShowModel] = useState(false);

  // 掛載後讀回草稿（避免 SSR 不一致）。
  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setText(saved);
  }, [storageKey]);

  const onChange = (v: string) => {
    setText(v);
    window.localStorage.setItem(storageKey, v);
  };

  const toggle = (i: number) =>
    setChecked((cur) => cur.map((c, idx) => (idx === i ? !c : c)));

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <header className="mb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white"
        >
          ← 選其他題目
        </button>
        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">
          {prompt.genre}
        </span>
      </header>

      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">《{prompt.title}》</h1>
      <p className="mb-5 text-sm text-slate-400">建議年級：{prompt.gradeHint}</p>

      <Section title="✍️ 審題提示">
        <p className="leading-8 text-slate-700">{prompt.brief}</p>
      </Section>

      <Section title="🧱 段落大綱">
        <ol className="space-y-2">
          {prompt.outline.map((o) => (
            <li key={o.heading} className="rounded-2xl bg-slate-50 p-3">
              <span className="mr-2 rounded-full bg-brand-100 px-2.5 py-0.5 text-sm font-bold text-brand-700">
                {o.heading}
              </span>
              <span className="text-slate-700">{o.hint}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="💡 好詞好句">
        <div className="mb-3 flex flex-wrap gap-2">
          {prompt.wordBank.map((w) => (
            <span
              key={w}
              className="rounded-xl bg-amber-50 px-3 py-1.5 text-base text-amber-800"
            >
              {w}
            </span>
          ))}
        </div>
        <ul className="space-y-1.5">
          {prompt.goodSentences.map((s) => (
            <li key={s} className="leading-7 text-slate-600">
              「{s}」
            </li>
          ))}
        </ul>
      </Section>

      <Section title="📝 我來寫作">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          rows={12}
          placeholder="在這裏寫下你的作文⋯⋯（會自動儲存在這部裝置上）"
          className="w-full resize-y rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg leading-9 text-slate-800 shadow-inner focus:border-brand-400 focus:outline-none"
        />
        <p className="mt-2 text-right text-sm text-slate-500">
          字數：<span className="font-bold text-brand-600">{countChars(text)}</span>　·　草稿自動儲存
        </p>
      </Section>

      <Section title="✅ 自我評估">
        <ul className="space-y-2">
          {prompt.checklist.map((item, i) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-3">
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => toggle(i)}
                  className="mt-1 h-5 w-5 accent-brand-500"
                />
                <span
                  className={`leading-7 ${
                    checked[i] ? 'text-slate-400 line-through' : 'text-slate-700'
                  }`}
                >
                  {item}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowModel((s) => !s)}
          className="w-full rounded-2xl bg-brand-500 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:bg-brand-600 active:scale-[0.98]"
        >
          {showModel ? '收起參考範文 ▲' : '看參考範文 ▼'}
        </button>
        {showModel && (
          <div className="mt-4 rounded-2xl bg-white/80 p-5 shadow-inner">
            <p className="mb-3 text-sm text-slate-400">
              先自己動筆，再看範文比較，進步更快！
            </p>
            <p className="whitespace-pre-line leading-9 text-slate-700">{prompt.model}</p>
          </div>
        )}
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 rounded-3xl bg-white/80 p-5 shadow-lg backdrop-blur">
      <h2 className="mb-3 text-lg font-bold text-slate-800">{title}</h2>
      {children}
    </section>
  );
}

// ── 作文題目一覽 ──
function List({
  prompts,
  onSelect,
}: {
  prompts: WritingPrompt[];
  onSelect: (id: string) => void;
}) {
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
          <h1 className="text-lg font-bold text-slate-800">作文練習</h1>
          <p className="text-xs text-slate-500">選一個題目，跟着大綱一步步寫</p>
        </div>
      </header>

      <div className="mb-5 flex justify-center">
        <StagePicker />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {prompts.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className="group rounded-3xl bg-white/80 p-5 text-left shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.99]"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-600">
                {p.genre}
              </span>
              <span className="text-xs text-slate-400">{p.gradeHint}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800">《{p.title}》</h2>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
              {p.brief}
            </p>
            <span className="mt-2 inline-block font-semibold text-brand-600 group-hover:translate-x-1">
              開始寫作 →
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}

export default function WritingPage() {
  const [stage] = useStage();
  const prompts = useMemo(() => writingByStage(stage), [stage]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = prompts.find((p) => p.id === selectedId) ?? null;

  // 切換階段後，若目前選中的題目不在新階段，退回一覽。
  useEffect(() => {
    if (selectedId && !prompts.some((p) => p.id === selectedId)) {
      setSelectedId(null);
    }
  }, [prompts, selectedId]);

  if (selected) {
    return <Detail key={selected.id} prompt={selected} onBack={() => setSelectedId(null)} />;
  }
  return <List prompts={prompts} onSelect={setSelectedId} />;
}

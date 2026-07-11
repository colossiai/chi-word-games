'use client';

import Link from 'next/link';
import type { useQuiz } from '@/lib/useQuiz';
import ProgressBar from './ProgressBar';
import OptionButton from './OptionButton';
import ExplanationBox from './ExplanationBox';
import ResultScreen from './ResultScreen';

interface QuizShellProps {
  /** 模式標題 */
  title: string;
  /** 模式副標／說明 */
  subtitle?: string;
  /** useQuiz() 的回傳值（由各頁自行以 builder 建立） */
  quiz: ReturnType<typeof useQuiz>;
  /** 進度條上方的額外內容（例如學習階段切換） */
  topBar?: React.ReactNode;
}

/**
 * 通用單選測驗畫面，供填空、閱讀理解、修辭三種模式共用。
 * 負責題目呈現、作答回饋、解釋、進度與結算。
 */
export default function QuizShell({ title, subtitle, quiz, topBar }: QuizShellProps) {
  if (quiz.finished) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-8">
        <ResultScreen score={quiz.score} total={quiz.questions.length} onRestart={quiz.restart} />
      </main>
    );
  }

  const q = quiz.questions[quiz.current];

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
          <h1 className="text-lg font-bold text-slate-800">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </header>

      {topBar && <div className="mb-4 flex justify-center">{topBar}</div>}

      <div className="mb-5">
        <ProgressBar current={quiz.current} total={quiz.questions.length} />
      </div>

      <section className="rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur">
        {q.context && (
          <div className="mb-4 rounded-2xl bg-slate-50 p-4">
            {q.contextTitle && (
              <p className="mb-2 text-center font-bold text-slate-700">
                《{q.contextTitle}》
              </p>
            )}
            <p className="whitespace-pre-line leading-8 text-slate-700">{q.context}</p>
          </div>
        )}

        <p className="mb-5 text-xl font-semibold leading-relaxed text-slate-800">
          {q.prompt}
        </p>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => (
            <OptionButton
              key={i}
              label={opt}
              index={i}
              selected={quiz.selected}
              answerIndex={q.answerIndex}
              answered={quiz.answered}
              onClick={quiz.answer}
            />
          ))}
        </div>

        {quiz.answered && (
          <div className="mt-5 space-y-4">
            <ExplanationBox
              correct={quiz.selected === q.answerIndex}
              explanation={q.explanation}
            />
            <button
              type="button"
              onClick={quiz.next}
              className="w-full rounded-2xl bg-brand-500 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:bg-brand-600 active:scale-[0.98]"
            >
              {quiz.current + 1 >= quiz.questions.length ? '看成績 🎉' : '下一題 →'}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

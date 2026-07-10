'use client';

import { useCallback, useMemo, useState } from 'react';
import type { QuizQuestion } from './types';
import { shuffleOptions } from './shuffle';

export interface QuizState {
  /** 本局題目（選項已洗牌） */
  questions: QuizQuestion[];
  /** 目前題號（0-based） */
  current: number;
  /** 已答對題數 */
  score: number;
  /** 玩家在目前題選擇的選項索引；未作答為 null */
  selected: number | null;
  /** 是否已作答（顯示對錯與解釋） */
  answered: boolean;
  /** 是否已完成整局 */
  finished: boolean;
}

/**
 * 通用測驗狀態管理 hook。
 *
 * 傳入一個 builder：每次開局／重玩時呼叫，回傳本局題目（順序由 builder 決定，
 * 讓不同模式自行控制抽樣與分組，例如閱讀理解要把同篇短文的題目排在一起）。
 * hook 只負責把每題選項洗牌，並管理作答流程。
 */
export function useQuiz(builder: () => QuizQuestion[]) {
  const build = useCallback(() => {
    return builder().map((q) => {
      const { options, answerIndex } = shuffleOptions(q.options, q.answerIndex);
      return { ...q, options, answerIndex };
    });
  }, [builder]);

  const [questions, setQuestions] = useState<QuizQuestion[]>(build);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const answer = useCallback(
    (index: number) => {
      if (answered) return;
      setSelected(index);
      setAnswered(true);
      if (index === questions[current].answerIndex) {
        setScore((s) => s + 1);
      }
    },
    [answered, questions, current]
  );

  const next = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
  }, [current, questions.length]);

  const restart = useCallback(() => {
    setQuestions(build());
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
  }, [build]);

  const state: QuizState = useMemo(
    () => ({ questions, current, score, selected, answered, finished }),
    [questions, current, score, selected, answered, finished]
  );

  return { ...state, answer, next, restart };
}

'use client';

import { useCallback } from 'react';
import QuizShell from '@/components/QuizShell';
import { readingPassages } from '@/data/reading';
import { readingToQuiz } from '@/lib/adapters';
import { sample } from '@/lib/shuffle';
import { useQuiz } from '@/lib/useQuiz';

// 每局隨機抽 3 篇短文；同一篇的題目會排在一起（見 readingToQuiz）。
const PASSAGES_PER_GAME = 4;

export default function ReadingPage() {
  const builder = useCallback(
    () => readingToQuiz(sample(readingPassages, PASSAGES_PER_GAME)),
    []
  );
  const quiz = useQuiz(builder);
  return (
    <QuizShell
      title="閱讀理解"
      subtitle="讀短文，答問題"
      quiz={quiz}
    />
  );
}

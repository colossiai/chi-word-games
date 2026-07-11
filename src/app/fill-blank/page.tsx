'use client';

import { useCallback } from 'react';
import QuizShell from '@/components/QuizShell';
import { fillBlankQuestions } from '@/data/fill-blank';
import { fillBlankToQuiz } from '@/lib/adapters';
import { sample } from '@/lib/shuffle';
import { useQuiz } from '@/lib/useQuiz';

const PER_GAME = 20;

export default function FillBlankPage() {
  const builder = useCallback(
    () => sample(fillBlankQuestions, PER_GAME).map(fillBlankToQuiz),
    []
  );
  const quiz = useQuiz(builder);
  return (
    <QuizShell
      title="句子填空"
      subtitle="從上下文選出正確的字"
      quiz={quiz}
    />
  );
}

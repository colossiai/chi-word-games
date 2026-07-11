'use client';

import { useCallback } from 'react';
import QuizShell from '@/components/QuizShell';
import { rhetoricQuestions } from '@/data/rhetoric';
import { rhetoricToQuiz } from '@/lib/adapters';
import { sample } from '@/lib/shuffle';
import { useQuiz } from '@/lib/useQuiz';

const PER_GAME = 15;

export default function RhetoricPage() {
  const builder = useCallback(
    () => sample(rhetoricQuestions, PER_GAME).map(rhetoricToQuiz),
    []
  );
  const quiz = useQuiz(builder);
  return (
    <QuizShell
      title="修辭手法"
      subtitle="辨認句子用了哪種修辭"
      quiz={quiz}
    />
  );
}

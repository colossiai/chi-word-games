'use client';

import { useCallback } from 'react';
import QuizShell from '@/components/QuizShell';
import { buildSimilar } from '@/lib/generators';
import { useQuiz } from '@/lib/useQuiz';

export default function SimilarPage() {
  const builder = useCallback(() => buildSimilar(), []);
  const quiz = useQuiz(builder);
  return (
    <QuizShell
      title="相似字比較"
      subtitle="分辨長得很像的繁體字"
      quiz={quiz}
    />
  );
}

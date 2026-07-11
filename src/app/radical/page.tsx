'use client';

import StagedQuiz from '@/components/StagedQuiz';
import { buildRadical } from '@/lib/generators';

export default function RadicalPage() {
  return (
    <StagedQuiz
      title="部首歸類"
      subtitle="判斷這個字的部首，學會查字典"
      build={buildRadical}
    />
  );
}

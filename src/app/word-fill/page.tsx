'use client';

import StagedQuiz from '@/components/StagedQuiz';
import { buildWordFill } from '@/lib/generators';

export default function WordFillPage() {
  return (
    <StagedQuiz
      title="詞語填字"
      subtitle="詞語缺了一個字，選出正確的字填回去"
      build={buildWordFill}
    />
  );
}

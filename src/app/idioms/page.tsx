'use client';

import StagedQuiz from '@/components/StagedQuiz';
import { buildIdioms } from '@/lib/generators';

export default function IdiomsPage() {
  return (
    <StagedQuiz
      title="成語樂園"
      subtitle="四字成語缺了一個字，選出正確的字"
      build={buildIdioms}
    />
  );
}

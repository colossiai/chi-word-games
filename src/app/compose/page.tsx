'use client';

import StagedQuiz from '@/components/StagedQuiz';
import { buildCompose } from '@/lib/generators';

export default function ComposePage() {
  return (
    <StagedQuiz
      title="組詞遊戲"
      subtitle="這個常用字可以和哪個字組成詞語？"
      build={buildCompose}
    />
  );
}

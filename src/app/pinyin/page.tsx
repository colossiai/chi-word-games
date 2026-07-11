'use client';

import StagedQuiz from '@/components/StagedQuiz';
import { buildPinyin } from '@/lib/generators';

export default function PinyinPage() {
  return (
    <StagedQuiz
      title="拼音猜詞"
      subtitle="看普通話拼音，選出正確的詞語"
      build={buildPinyin}
    />
  );
}

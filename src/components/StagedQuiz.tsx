'use client';

import { useCallback } from 'react';
import QuizShell from './QuizShell';
import StagePicker from './StagePicker';
import { useQuiz } from '@/lib/useQuiz';
import { useStage } from '@/lib/stage';
import type { QuizQuestion, Stage } from '@/lib/types';

interface StagedQuizProps {
  title: string;
  subtitle?: string;
  /** 依學習階段產生本局題目 */
  build: (stage: Stage) => QuizQuestion[];
}

/** 依 stage 產生題目的內層；以 key={stage} 重新掛載即可換階段重抽。 */
function Inner({ title, subtitle, build, stage }: StagedQuizProps & { stage: Stage }) {
  const builder = useCallback(() => build(stage), [build, stage]);
  const quiz = useQuiz(builder);
  return (
    <QuizShell title={title} subtitle={subtitle} quiz={quiz} topBar={<StagePicker />} />
  );
}

/**
 * 分階段測驗殼：讀取全站學習階段，套用 useQuiz + QuizShell，
 * 並在頂部放 StagePicker。切換階段時整局重抽（透過 key 重新掛載）。
 */
export default function StagedQuiz(props: StagedQuizProps) {
  const [stage] = useStage();
  return <Inner key={stage} {...props} stage={stage} />;
}

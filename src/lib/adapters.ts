// 把各模式的原生題型攤平成 QuizShell 使用的通用 QuizQuestion。

import type {
  FillBlankQuestion,
  QuizQuestion,
  ReadingPassage,
  RhetoricQuestion,
} from './types';

/** 填空題 → 通用題（題幹即含空格的句子） */
export function fillBlankToQuiz(q: FillBlankQuestion): QuizQuestion {
  return {
    id: q.id,
    prompt: q.sentence,
    options: q.options,
    answerIndex: q.answerIndex,
    explanation: q.explanation,
  };
}

/** 修辭題 → 通用題（題幹為句子，前綴提示要判斷手法） */
export function rhetoricToQuiz(q: RhetoricQuestion): QuizQuestion {
  return {
    id: q.id,
    prompt: `「${q.sentence}」\n這句用了哪一種修辭手法？`,
    options: q.options,
    answerIndex: q.answerIndex,
    explanation: q.explanation,
  };
}

/**
 * 閱讀理解 → 通用題陣列。
 * 每篇短文的每條小題都攤平成一題，並把短文放入 context，
 * 讓同一篇的題目都顯示上方短文。
 */
export function readingToQuiz(passages: ReadingPassage[]): QuizQuestion[] {
  const out: QuizQuestion[] = [];
  for (const p of passages) {
    p.questions.forEach((sub, i) => {
      out.push({
        id: `${p.id}-q${i}`,
        prompt: sub.question,
        options: sub.options,
        answerIndex: sub.answerIndex,
        explanation: sub.explanation,
        context: p.passage,
        contextTitle: p.title,
      });
    });
  }
  return out;
}

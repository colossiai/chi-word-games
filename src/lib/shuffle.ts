// 隨機工具：洗牌與抽樣，讓每次開始遊戲都得到不同的題目組合。

/** Fisher–Yates 洗牌，回傳新陣列（不改動原陣列） */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 隨機抽取 n 個元素（若 n 大於陣列長度則回傳全部洗牌後結果） */
export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, Math.max(0, n));
}

/**
 * 將單選題的選項打亂，並回傳新的正確答案索引。
 * 用於避免正確答案永遠在固定位置。
 */
export function shuffleOptions(
  options: string[],
  answerIndex: number
): { options: string[]; answerIndex: number } {
  const correct = options[answerIndex];
  const shuffled = shuffle(options);
  return { options: shuffled, answerIndex: shuffled.indexOf(correct) };
}

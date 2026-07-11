// 由《香港小學學習字詞表》產生的 JSON 造出各遊戲的通用測驗題 (QuizQuestion)。
// 全部依學習階段 (stage) 過濾，並「只用高頻常用字」：以每字的詞數 (n，該字能組成
// 多少詞語) 作為常用程度的代理，詞數越高越常用。附合理的干擾項邏輯。

import wordsData from '@/data/generated/words.json';
import charsData from '@/data/generated/chars.json';
import type { QuizQuestion, Stage } from './types';
import { shuffle, sample } from './shuffle';
import { idiomsByStage } from '@/data/idiom-meanings';
import { similarGroups } from '@/data/similar-chars';

interface WordRow {
  w: string;
  py: string;
  s: number;
  h: string;
}
interface CharRow {
  c: string;
  py: string;
  r: string;
  k: number;
  s: number;
  /** 詞數：該字的相關詞語數（常用／能產程度代理） */
  n: number;
}

const WORDS = wordsData as WordRow[];
const CHARS = charsData as CharRow[];

const CHAR_BY = new Map(CHARS.map((c) => [c.c, c]));
const ALL_RADICALS = [...new Set(CHARS.map((c) => c.r))];

/** 每局題數 */
const PER_GAME = 20;

/** 「高頻常用字」門檻：能組成 5 個或以上詞語的字。 */
const COMMON_N = 5;
const COMMON_CHARS = CHARS.filter((c) => c.n >= COMMON_N);
const isCommonChar = (c: string): boolean => (CHAR_BY.get(c)?.n ?? 0) >= COMMON_N;

/** 只保留由常見漢字組成、無括號／英數的乾淨詞語（適合出題）。 */
function isCleanWord(w: string): boolean {
  return /^[一-鿿]+$/.test(w);
}

const CLEAN_WORDS = WORDS.filter((w) => isCleanWord(w.w));

/** 常用字（依階段）。 */
function commonCharsByStage(stage: Stage): CharRow[] {
  return COMMON_CHARS.filter((c) => c.s === stage);
}

/** 常用詞語（依階段）：2-3 字、且每個字都是高頻常用字。 */
function commonWordsByStage(stage: Stage): WordRow[] {
  return CLEAN_WORDS.filter((w) => {
    const chars = [...w.w];
    return (
      w.s === stage &&
      chars.length >= 2 &&
      chars.length <= 3 &&
      chars.every(isCommonChar)
    );
  });
}

// ── 拼音猜詞：看普通話拼音選詞（只用常用詞） ───────────
export function buildPinyin(stage: Stage): QuizQuestion[] {
  const pool = commonWordsByStage(stage);
  const targets = sample(pool, PER_GAME);
  return targets.map((t, i) => {
    const len = [...t.w].length;
    const sameLen = pool.filter(
      (w) => w.w !== t.w && w.py !== t.py && [...w.w].length === len
    );
    const fallback = pool.filter((w) => w.w !== t.w && w.py !== t.py);
    const distractors = sample(sameLen.length >= 3 ? sameLen : fallback, 3);
    return {
      id: `py-${i}-${t.w}`,
      prompt: `哪一個詞語的普通話拼音是「${t.py}」？`,
      options: [t.w, ...distractors.map((d) => d.w)],
      answerIndex: 0,
      explanation: `「${t.w}」的普通話拼音是 ${t.py}。`,
    };
  });
}

/**
 * 為「填字」類題目挑選干擾字：優先取同音的常用字（造成錯別字混淆），
 * 不足再由同階段常用字補足。回傳最多 3 個，皆不等於正解。
 */
function charDistractors(correct: string, stage: Stage): string[] {
  const chosen: string[] = [];
  const meta = CHAR_BY.get(correct);
  if (meta) {
    const homophones = COMMON_CHARS.filter((c) => c.py === meta.py && c.c !== correct);
    for (const c of shuffle(homophones)) {
      if (chosen.length >= 3) break;
      chosen.push(c.c);
    }
  }
  if (chosen.length < 3) {
    const rest = COMMON_CHARS.filter(
      (c) => c.s === stage && c.c !== correct && !chosen.includes(c.c)
    );
    for (const c of shuffle(rest)) {
      if (chosen.length >= 3) break;
      chosen.push(c.c);
    }
  }
  return chosen;
}

/** 挖去詞語中的一個字，回傳顯示字串與正解字。 */
function blankOne(word: string): { display: string; answer: string } {
  const chars = [...word];
  const idx = Math.floor(Math.random() * chars.length);
  const answer = chars[idx];
  const display = chars.map((c, i) => (i === idx ? '（　）' : c)).join('');
  return { display, answer };
}

// ── 詞語填字：常用詞挖一字，選出正確的字 ───────────────
export function buildWordFill(stage: Stage): QuizQuestion[] {
  const pool = commonWordsByStage(stage);
  const targets = sample(pool, PER_GAME);
  return targets.map((t, i) => {
    const { display, answer } = blankOne(t.w);
    const options = [answer, ...charDistractors(answer, stage)];
    return {
      id: `wf-${i}-${t.w}`,
      prompt: `${display}\n（普通話拼音：${t.py}）\n\n括號中應填哪一個字？`,
      options,
      answerIndex: 0,
      explanation: `正確詞語是「${t.w}」。`,
    };
  });
}

// ── 組詞：常用字可以和哪個字組成詞語（純資料生成、字例近乎無限） ──
// 由乾淨的兩字常用詞建立「夥伴」索引：某字能與哪些字相鄰組詞。
const TWO_CHAR_WORDS = CLEAN_WORDS.filter(
  (w) => [...w.w].length === 2 && [...w.w].every(isCommonChar)
);
const partners = new Map<string, Map<string, string>>(); // 字 → (夥伴字 → 詞語)
for (const w of TWO_CHAR_WORDS) {
  const [a, b] = [...w.w];
  if (!partners.has(a)) partners.set(a, new Map());
  if (!partners.has(b)) partners.set(b, new Map());
  partners.get(a)!.set(b, w.w);
  partners.get(b)!.set(a, w.w);
}

export function buildCompose(stage: Stage): QuizQuestion[] {
  // 可出題的目標字：同階段常用字，且至少能與一個字組成兩字常用詞。
  const targets = commonCharsByStage(stage).filter((c) => partners.has(c.c));
  const picked = sample(targets, PER_GAME);
  return picked.map((t, i) => {
    const partnerMap = partners.get(t.c)!;
    const [partner, word] = sample([...partnerMap.entries()], 1)[0];
    // 干擾字：同階段常用字，且與目標字組不成（我們字表內的）詞語。
    const distractors = sample(
      commonCharsByStage(stage)
        .map((c) => c.c)
        .filter((c) => c !== t.c && c !== partner && !partnerMap.has(c)),
      3
    );
    return {
      id: `cp-${i}-${t.c}`,
      prompt: `「${t.c}」可以和下面哪一個字組成常用詞語？`,
      options: [partner, ...distractors],
      answerIndex: 0,
      explanation: `「${word}」是常用詞語。`,
    };
  });
}

// ── 部首歸類：判斷某常用字的部首 ───────────────────────
export function buildRadical(stage: Stage): QuizQuestion[] {
  const pool = commonCharsByStage(stage);
  const targets = sample(pool, PER_GAME);
  return targets.map((t, i) => {
    const distractors = sample(
      ALL_RADICALS.filter((r) => r !== t.r),
      3
    );
    return {
      id: `rad-${i}-${t.c}`,
      prompt: `「${t.c}」字的部首是甚麼？`,
      options: [t.r, ...distractors],
      answerIndex: 0,
      explanation: `「${t.c}」的部首是「${t.r}」，共 ${t.k} 畫。`,
    };
  });
}

// ── 相似字比較：分辨長得很像的形近字（同組互為選項） ──
// 拼音取自官方 chars.json;個別不在字表的字（如「巳」）以下方 fallback 補上。
const PY_FALLBACK: Record<string, string> = { 巳: 'sì' };
const pyOf = (c: string): string => CHAR_BY.get(c)?.py ?? PY_FALLBACK[c] ?? '';

export function buildSimilar(): QuizQuestion[] {
  const groups = sample(similarGroups, Math.min(PER_GAME, similarGroups.length));
  return groups.map((g, i) => {
    const it = sample(g.items, 1)[0];
    const blanked = it.word.replace(it.char, '（　）');
    const options = [...g.chars];
    return {
      id: `sim-${i}-${it.char}`,
      prompt: `選出正確的字填入括號：\n「${blanked}」\n（讀音 ${pyOf(it.char)}；${it.hint}）`,
      options,
      answerIndex: options.indexOf(it.char),
      explanation:
        '形近字比較 —— ' +
        g.items
          .map((x) => `「${x.char}」${pyOf(x.char)}，${x.word}（${x.hint}）`)
          .join('；'),
    };
  });
}

// ── 成語樂園：四字成語挖一字，選出正確的字 ─────────────
export function buildIdioms(stage: Stage): QuizQuestion[] {
  const pool = idiomsByStage(stage);
  const targets = sample(pool, Math.min(PER_GAME, pool.length));
  return targets.map((t, i) => {
    const { display, answer } = blankOne(t.w);
    const options = [answer, ...charDistractors(answer, stage)];
    return {
      id: `id-${i}-${t.w}`,
      prompt: `${display}\n\n這個成語括號中應填哪一個字？`,
      options,
      answerIndex: 0,
      explanation: `「${t.w}」：${t.meaning}`,
    };
  });
}

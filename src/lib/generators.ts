// 由《香港小學學習字詞表》產生的 JSON 造出各遊戲的通用測驗題 (QuizQuestion)。
// 全部依學習階段 (stage) 過濾，並附合理的干擾項邏輯。

import wordsData from '@/data/generated/words.json';
import charsData from '@/data/generated/chars.json';
import type { QuizQuestion, Stage } from './types';
import { shuffle, sample } from './shuffle';
import { idiomsByStage } from '@/data/idiom-meanings';

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
}

const WORDS = wordsData as WordRow[];
const CHARS = charsData as CharRow[];

const CHAR_BY = new Map(CHARS.map((c) => [c.c, c]));
const ALL_RADICALS = [...new Set(CHARS.map((c) => c.r))];

/** 每局題數 */
const PER_GAME = 12;

/** 只保留由常見漢字組成、無括號／英數的乾淨詞語（適合出題）。 */
function isCleanWord(w: string): boolean {
  return /^[一-鿿]+$/.test(w);
}

const CLEAN_WORDS = WORDS.filter((w) => isCleanWord(w.w));

// ── 拼音猜詞：看普通話拼音選詞 ─────────────────────────
export function buildPinyin(stage: Stage): QuizQuestion[] {
  const pool = CLEAN_WORDS.filter((w) => w.s === stage && [...w.w].length >= 2);
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
 * 為「填字」類題目挑選干擾字：優先取同音字（造成錯別字混淆），
 * 不足再由同階段隨機補足。回傳最多 3 個，皆不等於正解。
 */
function charDistractors(correct: string, stage: Stage): string[] {
  const chosen: string[] = [];
  const meta = CHAR_BY.get(correct);
  if (meta) {
    const homophones = CHARS.filter((c) => c.py === meta.py && c.c !== correct);
    for (const c of shuffle(homophones)) {
      if (chosen.length >= 3) break;
      chosen.push(c.c);
    }
  }
  if (chosen.length < 3) {
    const rest = CHARS.filter(
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

// ── 詞語填字：詞語挖一字，選出正確的字 ─────────────────
export function buildWordFill(stage: Stage): QuizQuestion[] {
  const pool = CLEAN_WORDS.filter((w) => {
    const len = [...w.w].length;
    return w.s === stage && len >= 2 && len <= 4;
  });
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

// ── 部首歸類：判斷某字的部首 ───────────────────────────
export function buildRadical(stage: Stage): QuizQuestion[] {
  const pool = CHARS.filter((c) => c.s === stage);
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

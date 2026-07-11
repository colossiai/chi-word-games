// 由《香港小學學習字詞表》的 Markdown（primary-words/）產生遊戲用的 JSON。
//
//   node scripts/build-words.mjs
//
// 產物（提交進 repo，供 Next 直接 import）：
//   src/data/generated/words.json  — 詞語 { w, py, s, h }（依詞去重）
//   src/data/generated/chars.json  — 單字 { c, py, r, k, s }
//   src/data/generated/idioms.json — 四字詞 { w, py, s }
//
// s = 學習階段（1 = 第一、2 = 第二）。py 一律取普通話拼音的第一個讀音。

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const WORDS_DIR = join(ROOT, 'primary-words', 'words');
const CHARS_MD = join(ROOT, 'primary-words', 'characters.md');
const OUT_DIR = join(ROOT, 'src', 'data', 'generated');

/** 「第一」→1、「第二」→2；其他→null */
function stageNum(s) {
  if (s.includes('第一')) return 1;
  if (s.includes('第二')) return 2;
  return null;
}

/** 取拼音的第一個讀音（多音以「；」分隔），去掉隔音點與空白 */
function firstPinyin(raw) {
  return raw.split('；')[0].replace(/[•·\s]/g, '').trim();
}

/** 解析一列 Markdown 表格 → 去頭尾管線後的欄位陣列 */
function cells(line) {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim());
}

// ── 解析 words/stroke-*.md ──────────────────────────────
// 每列：| 字 | 相關詞語 | 普通話拼音 | 粵拼 | 學習階段 |
const wordMap = new Map(); // 詞語 → { w, py, s, h }（同詞取最小 stage）
const idiomMap = new Map();

const files = readdirSync(WORDS_DIR)
  .filter((f) => /^stroke-\d+\.md$/.test(f))
  .sort();

for (const file of files) {
  const text = readFileSync(join(WORDS_DIR, file), 'utf8');
  for (const line of text.split('\n')) {
    if (!line.startsWith('| ')) continue;
    const c = cells(line);
    if (c.length < 5) continue;
    const [head, word, py, , stageRaw] = c;
    // 表頭與分隔列的「學習階段」欄不是第一/第二，會被下面的 stageNum 過濾掉。
    const s = stageNum(stageRaw);
    if (!s || !word || word === '—') continue;
    const pinyin = firstPinyin(py);

    const prev = wordMap.get(word);
    if (!prev || s < prev.s) {
      wordMap.set(word, { w: word, py: pinyin, s, h: head });
    }
    if ([...word].length === 4) {
      const prevI = idiomMap.get(word);
      if (!prevI || s < prevI.s) idiomMap.set(word, { w: word, py: pinyin, s });
    }
  }
}

// ── 解析 characters.md ─────────────────────────────────
// 分節標題「## N 畫」給筆畫；表列：| 字 | id | 部首 | 普通話拼音 | 粵拼 | 學習階段 | 詞數 | 相關詞語 |
const charList = [];
{
  const text = readFileSync(CHARS_MD, 'utf8');
  let strokes = 0;
  for (const line of text.split('\n')) {
    const m = line.match(/^##\s+(\d+)\s*畫/);
    if (m) {
      strokes = Number(m[1]);
      continue;
    }
    if (!line.startsWith('| ')) continue;
    const c = cells(line);
    if (c.length < 6) continue;
    const [char, , radical, py, , stageRaw, countRaw] = c;
    // 表頭「學習階段」與分隔列的階段欄不是第一/第二，由 stageNum 過濾。
    const s = stageNum(stageRaw);
    if (!s || !char) continue;
    // 詞數（該字的相關詞語數）作為「常用／能產」程度的代理，越大越常用。
    const n = Number.parseInt(countRaw, 10) || 0;
    charList.push({ c: char, py: firstPinyin(py), r: radical, k: strokes, s, n });
  }
}

// ── 輸出 ───────────────────────────────────────────────
mkdirSync(OUT_DIR, { recursive: true });

const words = [...wordMap.values()];
const chars = charList;
const idioms = [...idiomMap.values()];

const write = (name, data) =>
  writeFileSync(join(OUT_DIR, name), JSON.stringify(data), 'utf8');

write('words.json', words);
write('chars.json', chars);
write('idioms.json', idioms);

const byStage = (arr) => `第一 ${arr.filter((x) => x.s === 1).length} / 第二 ${arr.filter((x) => x.s === 2).length}`;
console.log(`words.json : ${words.length} 條（${byStage(words)}）`);
console.log(`chars.json : ${chars.length} 字（${byStage(chars)}）`);
console.log(`idioms.json: ${idioms.length} 條（${byStage(idioms)}）`);

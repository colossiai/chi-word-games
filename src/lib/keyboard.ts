// 盲打（觸控打字）指法對照：每個鍵位對應哪一根手指，用於鍵盤打字練習。

export type Finger = 'L5' | 'L4' | 'L3' | 'L2' | 'R2' | 'R3' | 'R4' | 'R5' | 'THUMB';

export interface FingerInfo {
  /** 中文名稱 */
  name: string;
  /** 鍵帽底色（Tailwind class） */
  bg: string;
  /** 高亮外框（Tailwind ring class） */
  ring: string;
}

export const FINGERS: Record<Finger, FingerInfo> = {
  L5: { name: '左手尾指', bg: 'bg-rose-200', ring: 'ring-rose-500' },
  L4: { name: '左手無名指', bg: 'bg-orange-200', ring: 'ring-orange-500' },
  L3: { name: '左手中指', bg: 'bg-amber-200', ring: 'ring-amber-500' },
  L2: { name: '左手食指', bg: 'bg-lime-200', ring: 'ring-lime-600' },
  R2: { name: '右手食指', bg: 'bg-emerald-200', ring: 'ring-emerald-600' },
  R3: { name: '右手中指', bg: 'bg-sky-200', ring: 'ring-sky-500' },
  R4: { name: '右手無名指', bg: 'bg-indigo-200', ring: 'ring-indigo-500' },
  R5: { name: '右手尾指', bg: 'bg-purple-200', ring: 'ring-purple-500' },
  THUMB: { name: '拇指', bg: 'bg-slate-200', ring: 'ring-slate-500' },
};

/** 每個鍵位（小寫）由哪根手指負責。 */
export const KEY_FINGER: Record<string, Finger> = {
  '`': 'L5', '1': 'L5', q: 'L5', a: 'L5', z: 'L5',
  '2': 'L4', w: 'L4', s: 'L4', x: 'L4',
  '3': 'L3', e: 'L3', d: 'L3', c: 'L3',
  '4': 'L2', '5': 'L2', r: 'L2', t: 'L2', f: 'L2', g: 'L2', v: 'L2', b: 'L2',
  '6': 'R2', '7': 'R2', y: 'R2', u: 'R2', h: 'R2', j: 'R2', n: 'R2', m: 'R2',
  '8': 'R3', i: 'R3', k: 'R3', ',': 'R3',
  '9': 'R4', o: 'R4', l: 'R4', '.': 'R4',
  '0': 'R5', p: 'R5', ';': 'R5', '/': 'R5', '-': 'R5', '=': 'R5', "'": 'R5', '[': 'R5', ']': 'R5',
  ' ': 'THUMB',
};

/** 鍵盤顯示用的四排字母／數字排列。 */
export const KEY_ROWS: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];

/** 基準鍵（雙手休息位置）。 */
export const HOME_KEYS = new Set(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);
/** 有定位凸點的鍵（食指基準鍵）。 */
export const BUMP_KEYS = new Set(['f', 'j']);

/** 需要 Shift 的符號 → 其未按 Shift 時的基本鍵。 */
const SHIFT_TO_BASE: Record<string, string> = {
  '!': '1', '@': '2', '#': '3', $: '4', '%': '5', '^': '6', '&': '7',
  '*': '8', '(': '9', ')': '0', _: '-', '+': '=', '{': '[', '}': ']',
  ':': ';', '"': "'", '<': ',', '>': '.', '?': '/', '~': '`',
};

export interface KeyTarget {
  /** 要按的基本鍵（小寫） */
  base: string;
  /** 是否需要同時按 Shift */
  needsShift: boolean;
  /** 按基本鍵的手指 */
  finger: Finger;
  /** 按 Shift 的手指（用另一隻手的尾指） */
  shiftFinger?: Finger;
}

/** 由目標字元推算要按哪個鍵、用哪根手指。無法對應時回傳 null。 */
export function targetForChar(ch: string): KeyTarget | null {
  if (ch === ' ') return { base: ' ', needsShift: false, finger: 'THUMB' };
  let base = ch;
  let needsShift = false;
  if (ch >= 'A' && ch <= 'Z') {
    base = ch.toLowerCase();
    needsShift = true;
  } else if (SHIFT_TO_BASE[ch]) {
    base = SHIFT_TO_BASE[ch];
    needsShift = true;
  }
  const finger = KEY_FINGER[base];
  if (!finger) return null;
  const shiftFinger: Finger | undefined = needsShift
    ? finger.startsWith('L')
      ? 'R5'
      : 'L5'
    : undefined;
  return { base, needsShift, finger, shiftFinger };
}

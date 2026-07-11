// 把《字詞表》的普通話拼音（帶聲調符號、含 Latin ɑ、隔音點）
// 轉成鍵盤打得出的「無調拼音」：只剩 a–z 與空格。

// 組合用聲調／附加符號區段 U+0300–U+036F
const COMBINING = /[̀-ͯ]/g;

export function toTypeable(py: string): string {
  return py
    .normalize('NFD') // 把「ǜ、à」等拆成基本字母 + 組合聲調符號
    .replace(COMBINING, '') // 去掉所有聲調／附加符號（含 ü 的兩點 → u）
    .replace(/ɑ/g, 'a') // Latin small alpha → a
    .replace(/[•·]/g, '') // 隔音點
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

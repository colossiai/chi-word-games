// 遊戲共用的資料型別定義。所有題庫 (src/data) 皆依此結構撰寫。

/** 漢字學習卡 */
export interface Character {
  /** 漢字（繁體） */
  char: string;
  /** 漢語拼音（含聲調符號） */
  pinyin: string;
  /** 字義解釋（簡短） */
  meaning: string;
  /** 部首 */
  radical: string;
  /** 總筆畫數 */
  strokes: number;
  /** 例詞／例句（1-3 個） */
  examples: string[];
}

/** 單選題共用結構 */
export interface MultipleChoice {
  /** 選項文字 */
  options: string[];
  /** 正確選項的索引（對應原始 options 順序） */
  answerIndex: number;
  /** 作答後顯示的解釋 */
  explanation: string;
}

/** 填空題（帶上下文） */
export interface FillBlankQuestion extends MultipleChoice {
  id: string;
  /** 含空格的句子，空格以「____」表示 */
  sentence: string;
}

/** 閱讀理解的單一小題 */
export interface ReadingSubQuestion extends MultipleChoice {
  /** 問題文字 */
  question: string;
}

/** 閱讀理解短文（含多條小題） */
export interface ReadingPassage {
  id: string;
  /** 短文標題 */
  title: string;
  /** 短文內容 */
  passage: string;
  /** 針對本文的小題 */
  questions: ReadingSubQuestion[];
}

/** 修辭手法辨識題 */
export interface RhetoricQuestion extends MultipleChoice {
  id: string;
  /** 待辨識修辭手法的句子 */
  sentence: string;
}

/** 通用測驗題：漢字模式以外三種模式都可攤平成此格式 */
export interface QuizQuestion extends MultipleChoice {
  id: string;
  /** 題幹（填空句／閱讀小題／修辭句） */
  prompt: string;
  /** 選填的上方情境（例如閱讀理解的短文） */
  context?: string;
  /** 選填的情境標題 */
  contextTitle?: string;
}

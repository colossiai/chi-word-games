// 英文打字練習課程（由淺入深）。每課數行,學生一行一行練習,重在正確指法與盲打。

export interface TypingLesson {
  id: string;
  title: string;
  /** 指法重點提示 */
  focus: string;
  /** 練習行 */
  lines: string[];
}

export const typingLessons: TypingLesson[] = [
  {
    id: 'home',
    title: '第一課：基準鍵位',
    focus: '左手放 a s d f、右手放 j k l ;,眼睛看螢幕不看鍵盤。',
    lines: ['asdf jkl;', 'fj fj dk dk sl sl a; a;', 'jf kd ls ;a jf kd ls ;a', 'asdf ;lkj asdf ;lkj'],
  },
  {
    id: 'home-words',
    title: '第二課：中排詞語',
    focus: '只用中排的手指打字,打完手指回到基準鍵。',
    lines: ['dad sad lad add', 'ask fall glad hall', 'a lad; a gas; all fall', 'flask salad; a glad dad'],
  },
  {
    id: 'top',
    title: '第三課：上排字母',
    focus: '手指由中排往上伸去按,按完立即回到基準鍵。',
    lines: ['qwer tyui op', 'the tree power type', 'you wrote true poetry', 'we require quiet hours'],
  },
  {
    id: 'bottom',
    title: '第四課：下排字母',
    focus: '食指、中指、無名指、尾指往下伸去按。',
    lines: ['zxcv bnm ,.', 'box van cab man', 'zoom mix nice club', 'a brave cub can jump'],
  },
  {
    id: 'sentences',
    title: '第五課：綜合句子',
    focus: '保持正確指法,盡量不看鍵盤,先求準確,再求快。',
    lines: ['the quick brown fox', 'jumps over the lazy dog', 'pack my box with five', 'dozen liquor jugs'],
  },
  {
    id: 'shift',
    title: '第六課：大寫與標點',
    focus: '用另一隻手的尾指按住 Shift,再按字母,就能打出大寫。',
    lines: ['Hello, World!', 'Hong Kong is nice.', 'I like to read books.', 'Are you ready? Yes!'],
  },
];

import wordsData from './generated/words.json';
import charsData from './generated/chars.json';
import { toTypeable } from '@/lib/pinyin';

// 拼音打字練習的題材：常用詞（由字詞表自動取）＋常用句子（手寫）。
// py 一律為「無調拼音」（只有 a–z 與空格），供鍵盤直接打出。

export interface PyItem {
  /** 中文（要打出其拼音） */
  zh: string;
  /** 無調拼音（打字目標） */
  py: string;
}

interface WordRow {
  w: string;
  py: string;
  s: number;
  h: string;
}
interface CharRow {
  c: string;
  n: number;
}

const CHAR_N = new Map((charsData as CharRow[]).map((c) => [c.c, c.n]));
const isCommon = (c: string) => (CHAR_N.get(c) ?? 0) >= 5;

// 常用詞：2–3 字、每字都是高頻常用字、拼音可打（純字母）。
export const commonPinyinWords: PyItem[] = (wordsData as WordRow[])
  .filter((w) => {
    const cs = [...w.w];
    return /^[一-鿿]+$/.test(w.w) && cs.length >= 2 && cs.length <= 3 && cs.every(isCommon);
  })
  .map((w) => ({ zh: w.w, py: toTypeable(w.py) }))
  .filter((it) => /^[a-z ]+$/.test(it.py));

// 常用句子（香港小學生日常用語;拼音為無調、音節之間以空格分隔）。
export const pinyinSentences: PyItem[] = [
  { zh: '我愛香港', py: 'wo ai xiang gang' },
  { zh: '今天天氣很好', py: 'jin tian tian qi hen hao' },
  { zh: '我們是好朋友', py: 'wo men shi hao peng you' },
  { zh: '老師教我們讀書', py: 'lao shi jiao wo men du shu' },
  { zh: '弟弟喜歡吃蘋果', py: 'di di xi huan chi ping guo' },
  { zh: '姐姐在公園跑步', py: 'jie jie zai gong yuan pao bu' },
  { zh: '媽媽買了很多生果', py: 'ma ma mai le hen duo sheng guo' },
  { zh: '小貓在睡覺', py: 'xiao mao zai shui jiao' },
  { zh: '太陽從東方升起', py: 'tai yang cong dong fang sheng qi' },
  { zh: '我每天準時上學', py: 'wo mei tian zhun shi shang xue' },
  { zh: '圖書館裏很安靜', py: 'tu shu guan li hen an jing' },
  { zh: '小鳥在樹上唱歌', py: 'xiao niao zai shu shang chang ge' },
  { zh: '哥哥喜歡踢足球', py: 'ge ge xi huan ti zu qiu' },
  { zh: '我會幫忙做家務', py: 'wo hui bang mang zuo jia wu' },
  { zh: '秋天到了天氣涼快', py: 'qiu tian dao le tian qi liang kuai' },
  { zh: '同學們一起玩遊戲', py: 'tong xue men yi qi wan you xi' },
  { zh: '我們要保護環境', py: 'wo men yao bao hu huan jing' },
  { zh: '爺爺在花園種花', py: 'ye ye zai hua yuan zhong hua' },
  { zh: '過馬路要小心', py: 'guo ma lu yao xiao xin' },
  { zh: '我喜歡看圖畫書', py: 'wo xi huan kan tu hua shu' },
  { zh: '妹妹學會了游泳', py: 'mei mei xue hui le you yong' },
  { zh: '下雨了記得帶傘', py: 'xia yu le ji de dai san' },
  { zh: '香港是我的家', py: 'xiang gang shi wo de jia' },
  { zh: '努力讀書天天進步', py: 'nu li du shu tian tian jin bu' },
];

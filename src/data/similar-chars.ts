// 繁體「形近字」比較練習題庫（小學教育專家手寫）。
// 每組是一批長得很像、容易寫錯的字;同組的字互為選項,正好是最易混淆的干擾。
// 每個字附一個常用例詞與辨字提示（多為部首／關鍵部件的分別）。

export interface SimilarItem {
  /** 正確字 */
  char: string;
  /** 含該字的常用詞語（出題時把該字挖空） */
  word: string;
  /** 辨字提示（字義或部首分別） */
  hint: string;
}

export interface SimilarGroup {
  id: string;
  /** 形近字組（即選項） */
  chars: string[];
  items: SimilarItem[];
}

export const similarGroups: SimilarGroup[] = [
  {
    id: 'sim-jiyisi',
    chars: ['己', '已', '巳'],
    items: [
      { char: '己', word: '自己', hint: '自己、本身;開口最大' },
      { char: '已', word: '已經', hint: '已經、完成了;開口一半' },
      { char: '巳', word: '巳時', hint: '地支之一;完全封口' },
    ],
  },
  {
    id: 'sim-weimo',
    chars: ['未', '末'],
    items: [
      { char: '未', word: '未來', hint: '還沒有;上橫較短' },
      { char: '末', word: '週末', hint: '末端、最後;上橫較長' },
    ],
  },
  {
    id: 'sim-tushi',
    chars: ['土', '士'],
    items: [
      { char: '土', word: '泥土', hint: '泥土、地;下橫較長' },
      { char: '士', word: '士兵', hint: '士兵、讀書人;上橫較長' },
    ],
  },
  {
    id: 'sim-houhou',
    chars: ['侯', '候'],
    items: [
      { char: '侯', word: '王侯', hint: '古代爵位;沒有中間一豎' },
      { char: '候', word: '時候', hint: '等候、時候;中間多一豎' },
    ],
  },
  {
    id: 'sim-qing4',
    chars: ['晴', '睛', '清', '情'],
    items: [
      { char: '晴', word: '晴天', hint: '天氣好;日字旁' },
      { char: '睛', word: '眼睛', hint: '眼珠;目字旁' },
      { char: '清', word: '清水', hint: '乾淨;水（氵）字旁' },
      { char: '情', word: '心情', hint: '感情;心（忄）字旁' },
    ],
  },
  {
    id: 'sim-bian',
    chars: ['辨', '辯', '辮', '瓣'],
    items: [
      { char: '辨', word: '分辨', hint: '分別、辨認;中間是點、撇' },
      { char: '辯', word: '辯論', hint: '爭論、講道理;中間是「言」' },
      { char: '辮', word: '辮子', hint: '編起的頭髮;中間是「糸」' },
      { char: '瓣', word: '花瓣', hint: '花瓣、一瓣;中間是「瓜」' },
    ],
  },
  {
    id: 'sim-mianmian',
    chars: ['綿', '棉'],
    items: [
      { char: '綿', word: '連綿', hint: '連續不斷;糸字旁' },
      { char: '棉', word: '棉花', hint: '棉花、植物;木字旁' },
    ],
  },
  {
    id: 'sim-tumian',
    chars: ['兔', '免'],
    items: [
      { char: '兔', word: '兔子', hint: '兔子;右下有一點' },
      { char: '免', word: '免費', hint: '免去、不用;沒有那一點' },
    ],
  },
  {
    id: 'sim-maimai',
    chars: ['買', '賣'],
    items: [
      { char: '買', word: '買東西', hint: '用錢換物' },
      { char: '賣', word: '賣東西', hint: '把物換錢;上面多一個「士」' },
    ],
  },
  {
    id: 'sim-zhechai',
    chars: ['折', '拆'],
    items: [
      { char: '折', word: '折斷', hint: '弄斷、對摺' },
      { char: '拆', word: '拆開', hint: '分開、拆掉;右邊多一點' },
    ],
  },
  {
    id: 'sim-shidai',
    chars: ['侍', '待'],
    items: [
      { char: '侍', word: '侍候', hint: '服侍;單人旁' },
      { char: '待', word: '等待', hint: '等候;雙人旁（彳）' },
    ],
  },
  {
    id: 'sim-banbanban',
    chars: ['拌', '伴', '絆'],
    items: [
      { char: '拌', word: '攪拌', hint: '攪動混合;手（扌）旁' },
      { char: '伴', word: '同伴', hint: '陪伴的人;人（亻）旁' },
      { char: '絆', word: '絆倒', hint: '被纏住跌倒;糸字旁' },
    ],
  },
  {
    id: 'sim-zao',
    chars: ['燥', '躁', '澡', '操'],
    items: [
      { char: '燥', word: '乾燥', hint: '缺水、乾;火字旁' },
      { char: '躁', word: '暴躁', hint: '性急、不冷靜;足字旁' },
      { char: '澡', word: '洗澡', hint: '洗身;水（氵）旁' },
      { char: '操', word: '操場', hint: '拿、鍛練;手（扌）旁' },
    ],
  },
  {
    id: 'sim-manman',
    chars: ['慢', '漫'],
    items: [
      { char: '慢', word: '緩慢', hint: '不快;心（忄）旁' },
      { char: '漫', word: '浪漫', hint: '水滿、隨意;水（氵）旁' },
    ],
  },
  {
    id: 'sim-mimi',
    chars: ['密', '蜜'],
    items: [
      { char: '密', word: '秘密', hint: '緊、不公開;下面是「山」' },
      { char: '蜜', word: '蜂蜜', hint: '蜜糖;下面是「虫」' },
    ],
  },
  {
    id: 'sim-bibi',
    chars: ['幣', '弊'],
    items: [
      { char: '幣', word: '貨幣', hint: '錢幣;下面是「巾」' },
      { char: '弊', word: '弊病', hint: '害處、毛病;下面是「廾」' },
    ],
  },
  {
    id: 'sim-bin',
    chars: ['賓', '濱', '繽'],
    items: [
      { char: '賓', word: '賓客', hint: '客人' },
      { char: '濱', word: '海濱', hint: '水邊;水（氵）旁' },
      { char: '繽', word: '繽紛', hint: '繁多而美麗;糸字旁' },
    ],
  },
  {
    id: 'sim-jian',
    chars: ['檢', '撿', '儉', '驗'],
    items: [
      { char: '檢', word: '檢查', hint: '查看;木字旁' },
      { char: '撿', word: '撿拾', hint: '拾起;手（扌）旁' },
      { char: '儉', word: '節儉', hint: '節省;人（亻）旁' },
      { char: '驗', word: '實驗', hint: '查證;馬字旁' },
    ],
  },
  {
    id: 'sim-guanguan',
    chars: ['慣', '貫'],
    items: [
      { char: '慣', word: '習慣', hint: '常做而熟;心（忄）旁' },
      { char: '貫', word: '貫通', hint: '穿通、連貫;沒有心字旁' },
    ],
  },
  {
    id: 'sim-zhai',
    chars: ['摘', '滴', '適', '敵'],
    items: [
      { char: '摘', word: '摘花', hint: '用手取下;手（扌）旁' },
      { char: '滴', word: '水滴', hint: '一點點水;水（氵）旁' },
      { char: '適', word: '適合', hint: '合宜;走（辶）旁' },
      { char: '敵', word: '敵人', hint: '對頭;右邊是「攵」' },
    ],
  },
  {
    id: 'sim-zhang',
    chars: ['帳', '脹', '漲'],
    items: [
      { char: '帳', word: '帳篷', hint: '布造的遮蔽物;巾字旁' },
      { char: '脹', word: '膨脹', hint: '身體或物體變大;肉（月）旁' },
      { char: '漲', word: '漲潮', hint: '水位升高;水（氵）旁' },
    ],
  },
  {
    id: 'sim-fu',
    chars: ['幅', '副', '福'],
    items: [
      { char: '幅', word: '一幅畫', hint: '布或畫的量詞;巾字旁' },
      { char: '副', word: '副本', hint: '附帶的、第二;右邊是「刂」' },
      { char: '福', word: '幸福', hint: '福氣、好運;示（礻）旁' },
    ],
  },
  {
    id: 'sim-jieji',
    chars: ['藉', '籍'],
    items: [
      { char: '藉', word: '憑藉', hint: '依靠、借助;草（艸）頭' },
      { char: '籍', word: '書籍', hint: '書本、戶籍;竹字頭' },
    ],
  },
  {
    id: 'sim-mu',
    chars: ['慕', '幕', '暮', '墓'],
    items: [
      { char: '慕', word: '羨慕', hint: '敬佩嚮往;下面是「心」' },
      { char: '幕', word: '開幕', hint: '布簾、場次;下面是「巾」' },
      { char: '暮', word: '日暮', hint: '傍晚;下面是「日」' },
      { char: '墓', word: '墳墓', hint: '埋葬的地方;下面是「土」' },
    ],
  },
  {
    id: 'sim-lianlian',
    chars: ['練', '煉'],
    items: [
      { char: '練', word: '練習', hint: '反覆學習;糸字旁' },
      { char: '煉', word: '鍛煉', hint: '用火燒製、磨練;火字旁' },
    ],
  },
  {
    id: 'sim-banban',
    chars: ['板', '版'],
    items: [
      { char: '板', word: '木板', hint: '片狀硬物;木字旁' },
      { char: '版', word: '出版', hint: '印刷、版本;片字旁' },
    ],
  },
  {
    id: 'sim-chesa',
    chars: ['撤', '撒'],
    items: [
      { char: '撤', word: '撤退', hint: '退回、除去' },
      { char: '撒', word: '撒種', hint: '散播、灑開;右上多一橫（「散」）' },
    ],
  },
  {
    id: 'sim-xian',
    chars: ['陷', '餡', '焰'],
    items: [
      { char: '陷', word: '陷阱', hint: '掉進、坑;左耳（阝）旁' },
      { char: '餡', word: '餡料', hint: '包在食物裏的東西;食字旁' },
      { char: '焰', word: '火焰', hint: '火苗;火字旁' },
    ],
  },
  {
    id: 'sim-gai',
    chars: ['概', '慨', '溉'],
    items: [
      { char: '概', word: '大概', hint: '大略、氣概;木字旁' },
      { char: '慨', word: '感慨', hint: '情緒激動;心（忄）旁' },
      { char: '溉', word: '灌溉', hint: '澆水;水（氵）旁' },
    ],
  },
  {
    id: 'sim-huang',
    chars: ['惶', '煌', '皇'],
    items: [
      { char: '惶', word: '惶恐', hint: '害怕不安;心（忄）旁' },
      { char: '煌', word: '輝煌', hint: '光亮;火字旁' },
      { char: '皇', word: '皇帝', hint: '君主;沒有偏旁' },
    ],
  },
  {
    id: 'sim-shang',
    chars: ['賞', '償', '嘗'],
    items: [
      { char: '賞', word: '欣賞', hint: '觀看喜愛、獎賞;下面是「貝」' },
      { char: '償', word: '賠償', hint: '歸還、抵補;人（亻）旁' },
      { char: '嘗', word: '品嘗', hint: '用口試味道;下面是「旨」' },
    ],
  },
  {
    id: 'sim-xiangxiang',
    chars: ['象', '像'],
    items: [
      { char: '象', word: '大象', hint: '動物、樣子' },
      { char: '像', word: '好像', hint: '相似、圖像;人（亻）旁' },
    ],
  },
  {
    id: 'sim-quanjuan',
    chars: ['券', '卷'],
    items: [
      { char: '券', word: '禮券', hint: '票據;下面是「刀」' },
      { char: '卷', word: '試卷', hint: '書卷、捲曲;下面是「㔾」' },
    ],
  },
  {
    id: 'sim-pei',
    chars: ['賠', '陪', '培'],
    items: [
      { char: '賠', word: '賠償', hint: '補償損失;貝字旁' },
      { char: '陪', word: '陪伴', hint: '作伴;左耳（阝）旁' },
      { char: '培', word: '培養', hint: '栽種、教育;土字旁' },
    ],
  },
  {
    id: 'sim-la',
    chars: ['蠟', '臘', '獵'],
    items: [
      { char: '蠟', word: '蠟燭', hint: '蜜蠟;虫字旁' },
      { char: '臘', word: '臘月', hint: '農曆十二月、臘肉;肉（月）旁' },
      { char: '獵', word: '打獵', hint: '捕捉禽獸;犬（犭）旁' },
    ],
  },
  {
    id: 'sim-yao',
    chars: ['燒', '曉', '繞', '澆'],
    items: [
      { char: '燒', word: '燃燒', hint: '用火;火字旁' },
      { char: '曉', word: '知曉', hint: '天亮、明白;日字旁' },
      { char: '繞', word: '圍繞', hint: '纏、轉圈;糸字旁' },
      { char: '澆', word: '澆水', hint: '灑水;水（氵）旁' },
    ],
  },
  {
    id: 'sim-jiji',
    chars: ['即', '既'],
    items: [
      { char: '即', word: '立即', hint: '就、馬上' },
      { char: '既', word: '既然', hint: '已經;左邊多一部分' },
    ],
  },
];

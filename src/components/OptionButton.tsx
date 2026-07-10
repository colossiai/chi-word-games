interface OptionButtonProps {
  label: string;
  index: number;
  /** 玩家所選索引 */
  selected: number | null;
  /** 正確答案索引 */
  answerIndex: number;
  /** 是否已作答 */
  answered: boolean;
  onClick: (index: number) => void;
}

const LETTERS = ['甲', '乙', '丙', '丁', '戊', '己'];

/**
 * 選項按鈕：
 * - 未作答：可點擊，hover 高亮
 * - 已作答：正確者標綠、玩家選錯者標紅，其餘淡化
 */
export default function OptionButton({
  label,
  index,
  selected,
  answerIndex,
  answered,
  onClick,
}: OptionButtonProps) {
  const isCorrect = index === answerIndex;
  const isChosen = index === selected;

  let stateClass =
    'border-slate-200 bg-white hover:border-brand-400 hover:bg-brand-50 active:scale-[0.99]';
  if (answered) {
    if (isCorrect) {
      stateClass = 'border-green-500 bg-green-50 text-green-800';
    } else if (isChosen) {
      stateClass = 'border-red-400 bg-red-50 text-red-700';
    } else {
      stateClass = 'border-slate-200 bg-white/60 text-slate-400';
    }
  }

  return (
    <button
      type="button"
      disabled={answered}
      onClick={() => onClick(index)}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left text-lg font-medium shadow-sm transition-all disabled:cursor-default ${stateClass}`}
    >
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-600">
        {LETTERS[index] ?? index + 1}
      </span>
      <span className="flex-1">{label}</span>
      {answered && isCorrect && <span className="text-2xl">✓</span>}
      {answered && isChosen && !isCorrect && <span className="text-2xl">✗</span>}
    </button>
  );
}

interface ProgressBarProps {
  current: number;
  total: number;
}

/** 頂部進度條：顯示目前題數 / 總題數 */
export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-sm font-semibold text-slate-500">
        <span>
          第 {Math.min(current + 1, total)} / {total} 題
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/70 shadow-inner">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

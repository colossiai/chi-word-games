'use client';

import { useStage, STAGE_HINT } from '@/lib/stage';
import type { Stage } from '@/lib/types';

const STAGES: Stage[] = [1, 2];
const NAME: Record<Stage, string> = { 1: '第一階段', 2: '第二階段' };

/**
 * 學習階段切換膠囊。放在首頁與各遊戲頂部；切換後全站題庫即時跟隨。
 */
export default function StagePicker({ className = '' }: { className?: string }) {
  const [stage, setStage] = useStage();
  return (
    <div className={`inline-flex rounded-full bg-white/70 p-1 shadow-sm ${className}`}>
      {STAGES.map((s) => {
        const active = s === stage;
        return (
          <button
            key={s}
            type="button"
            onClick={() => setStage(s)}
            aria-pressed={active}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              active
                ? 'bg-brand-500 text-white shadow'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {NAME[s]}
            <span
              className={`ml-1.5 hidden text-xs font-normal sm:inline ${
                active ? 'text-white/80' : 'text-slate-400'
              }`}
            >
              {STAGE_HINT[s]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

'use client';

// 全站共用的「學習階段」選擇：以 localStorage 記住，跨元件即時同步。
// 用 useSyncExternalStore 確保伺服器／首個 client render 都回傳 1（預設第一階段），
// 避免 hydration 不一致；掛載後才從 localStorage 讀出真正選擇並重繪。

import { useCallback, useSyncExternalStore } from 'react';
import type { Stage } from './types';

const KEY = 'sziyuen.stage';

let current: Stage = 1;
let loaded = false;
const listeners = new Set<() => void>();

function readStored(): Stage {
  if (typeof window === 'undefined') return 1;
  return window.localStorage.getItem(KEY) === '2' ? 2 : 1;
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(cb: () => void): () => void {
  // 首次於 client 訂閱時才讀 localStorage；若與初值不同，通知重繪。
  if (!loaded) {
    loaded = true;
    const stored = readStored();
    if (stored !== current) {
      current = stored;
      cb();
    }
  }
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      current = readStored();
      emit();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

const getSnapshot = (): Stage => current;
const getServerSnapshot = (): Stage => 1;

/** 讀取／設定目前學習階段。setStage 會寫入 localStorage 並同步所有使用者。 */
export function useStage(): [Stage, (s: Stage) => void] {
  const stage = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setStage = useCallback((s: Stage) => {
    current = s;
    if (typeof window !== 'undefined') window.localStorage.setItem(KEY, String(s));
    emit();
  }, []);
  return [stage, setStage];
}

/** 階段的顯示文字。 */
export const STAGE_LABEL: Record<Stage, string> = {
  1: '第一學習階段',
  2: '第二學習階段',
};

export const STAGE_HINT: Record<Stage, string> = {
  1: '小一至小三',
  2: '小四至小六',
};

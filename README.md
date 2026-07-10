# 識字樂園 🌈 — 香港小學中文識字遊戲

為香港小學 **4/5 年級**而設的**繁體中文**識字網頁遊戲。純靜態、離線可玩，可直接發布到 GitHub Pages。

**🎮 遊玩網址：** https://colossiai.github.io/chi-word-games/

## 遊戲模式

| 模式 | 說明 |
| --- | --- |
| 📖 **漢字學習** | 每次隨機抽一組常用漢字，翻卡看拼音、字義、部首、筆畫與例詞，自我評估是否認識。 |
| ✏️ **句子填空** | 從句子的上下文，四選一填入正確的字／詞。 |
| 📚 **閱讀理解** | 讀一段短文再答題，訓練字面理解與推論。 |
| 🎭 **修辭手法** | 辨認句子用了擬人、誇張、比喻、排比等哪一種修辭。 |

- 全部**繁體中文**，附**漢語拼音**。
- 每次開始都會**隨機抽題**、選項亦會洗牌，重玩不重複。

## 技術棧

- [Next.js](https://nextjs.org/)（App Router）+ TypeScript
- Tailwind CSS
- 靜態匯出（`output: 'export'`）→ GitHub Pages

## 本機開發

需要 [pnpm](https://pnpm.io/)。

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

其他指令：

```bash
pnpm build      # 靜態匯出到 out/
pnpm lint       # ESLint
pnpm typecheck  # TypeScript 型別檢查
```

## 部署到 GitHub Pages

本專案已設定好 GitHub Actions 自動部署（`.github/workflows/deploy.yml`）。首次部署步驟：

1. **推送程式碼到 GitHub**（repo：`colossiai/chi-word-games`，分支 `main`）：

   ```bash
   git add -A
   git commit -m "Initial commit: 識字樂園"
   git push -u origin main
   ```

   > 若 repo 名稱或帳號不同，請一併修改 `next.config.mjs` 中的 `repoName`，
   > 以及本 README 的遊玩網址（網址格式為 `https://<帳號>.github.io/<repo 名稱>/`）。

2. **啟用 GitHub Pages**：到 GitHub repo → **Settings → Pages**，
   把 **Build and deployment → Source** 設為 **GitHub Actions**。

3. **等待部署**：推送後到 repo 的 **Actions** 分頁查看「Deploy to GitHub Pages」workflow。
   它會自動 `pnpm install` → `pnpm build`（靜態匯出到 `out/`）→ 部署。
   綠色勾號代表成功（約 1-2 分鐘）。

4. **開啟遊戲**：部署完成後即可透過以下網址遊玩：

   **👉 https://colossiai.github.io/chi-word-games/**

之後每次推送到 `main` 分支都會自動重新部署，無需手動操作。
（也可在 **Actions** 分頁手動觸發 `workflow_dispatch`。）

## 擴充題庫

所有內容都是靜態資料，位於 `src/data/`：

- `characters.ts` — 漢字
- `fill-blank.ts` — 填空題
- `reading.ts` — 閱讀短文與題目
- `rhetoric.ts` — 修辭題

依照 `src/lib/types.ts` 的型別新增項目即可，遊戲會自動納入隨機題庫。

# 識字樂園 🌈 — 香港小學中文識字遊戲

為香港小學而設的**繁體中文**識字網頁遊戲，取材自教育局《香港小學學習字詞表》，**分階段**循序學習。純靜態、離線可玩，可直接發布到 GitHub Pages。

**🎮 遊玩網址：** https://colossiai.github.io/chi-word-games/

## 學習階段

字詞內容按教育局的**兩個學習階段**分級，於首頁或各遊戲頂部切換（選擇會記在瀏覽器中）：

- **第一學習階段**：小一至小三
- **第二學習階段**：小四至小六

## 遊戲模式

**字詞學習（跟隨所選階段）**

| 模式 | 說明 |
| --- | --- |
| 📖 **漢字精讀** | 翻卡認識常用字：普通話拼音、部首、筆畫、字義與例詞，自我評估是否認識。 |
| 🔤 **拼音猜詞** | 看普通話拼音，四選一選出正確詞語。 |
| 🧩 **詞語填字** | 詞語缺一字，從同音／相似字中選對，攻克錯別字。 |
| 🧭 **部首歸類** | 判斷漢字的部首，建立部首概念、學會查字典。 |
| 🎴 **成語樂園** | 四字成語填字，附白話解釋。 |

**閱讀與語文（通用題庫）**

| 模式 | 說明 |
| --- | --- |
| 🔍 **相似字比較** | 分辨形近的繁體字（如「己已巳」「辨辯辮瓣」），同組互為選項，附辨字提示。 |
| ✏️ **句子填空** | 從句子的上下文，四選一填入正確的字／詞。 |
| 📚 **閱讀理解** | 讀一段短文再答題，訓練字面理解與推論。 |
| 🎭 **修辭手法** | 辨認句子用了擬人、誇張、比喻、排比等哪一種修辭。 |

**寫作**

| 模式 | 說明 |
| --- | --- |
| 🖋️ **作文練習** | 跨文體（記敘／描寫／說明／議論／看圖／應用文）作文題，提供審題提示、段落大綱、好詞佳句、自我評估清單與參考範文；附寫作區（字數統計、草稿自動儲存）。 |

- 全部**繁體中文**，附**普通話拼音**。
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

## 字詞資料來源與管線

字詞學習遊戲的題庫由《香港小學學習字詞表》產生（原始 Markdown 在 [`primary-words/`](primary-words/)）：

```bash
pnpm build:words   # 解析 primary-words/ → src/data/generated/*.json
```

- [`scripts/build-words.mjs`](scripts/build-words.mjs) 解析後輸出（已提交進 repo）：
  - `src/data/generated/words.json` — 詞語（普通話拼音、學習階段、所屬字），約 8,300 條
  - `src/data/generated/chars.json` — 3,129 字（拼音、部首、筆畫、學習階段）
  - `src/data/generated/idioms.json` — 四字詞

更新 `primary-words/` 後重跑 `pnpm build:words` 即可。

## 擴充題庫

手寫內容位於 `src/data/`，依 `src/lib/types.ts` 的型別新增項目即可：

- `meanings.ts` — 「漢字精讀」的字義與例詞（拼音／部首／筆畫／階段自動取自 `chars.json`）
- `idiom-meanings.ts` — 成語的白話解釋（「成語樂園」的題庫）
- `writing.ts` — 作文題（審題、大綱、好詞、自評、範文）
- `fill-blank.ts` / `reading.ts` / `rhetoric.ts` — 填空、閱讀、修辭題

拼音猜詞、詞語填字、部首歸類的題目則由 `src/lib/generators.ts` 依所選階段從上述 JSON **自動生成**。

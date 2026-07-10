/**
 * GitHub Pages 為純靜態託管，故使用 Next.js 靜態匯出 (output: 'export')。
 * 專案頁 (project page) 的網址會在 /<repo-name> 子路徑下，
 * 因此 basePath / assetPrefix 需指向 repo 名稱。
 *
 * 本機開發時 (next dev) 不套用 basePath，方便直接 http://localhost:3000 存取。
 */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'chi-word-games';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  trailingSlash: true,
};

export default nextConfig;

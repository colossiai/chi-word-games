import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // lib 內含鍵盤指法的顏色 class（bg-*/ring-*），必須掃描,否則會被清除。
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // 系統繁體字體 fallback 鏈，確保各平台皆有清晰的中文顯示
        hei: [
          '"PingFang TC"',
          '"Microsoft JhengHei"',
          '"Noto Sans TC"',
          '"Heiti TC"',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
      },
    },
  },
  plugins: [],
};

export default config;

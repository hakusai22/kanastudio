KanaStudio – 日语假名学习网页（Web Version）

一个轻量、直观、适合初学者的 日语五十音学习网页。
以「极简设计 + 互动体验」为目标，3 小时黑客松即可完成 MVP。

🚀 项目简介（Overview）

KanaStudio 是一个提供 平假名、片假名学习 的网页小应用，包含发音、字表、测验、AI 例句生成等基础学习功能。
适合日语初学者快速入门，也适合想要一个干净无广告学习环境的用户。

✨ 核心特点（Features）
1. 五十音假名字表

平假名表（あ〜ん）

片假名表（ア〜ン）

点击每个假名可播放标准发音

支持浊音、半浊音、拗音显示

2. 假名发音练习

点击即可听

支持连续播放模式

用户可逐行跟读

3. 假名测验模式（Quiz）

随机显示假名 → 选择正确读音

或显示罗马音 → 选择正确假名

自动评分，展示本次成绩

4. AI 例句生成（可选亮点功能）

输入任意假名或单词

自动生成：

🔤 日语例句

🎧 假名・发音

📝 中文翻译

5. 轻量前端网页

使用 HTML + CSS（Tailwind 可选）+ JavaScript

完全不依赖框架也能实现

开箱即用，部署简单

🧱 技术栈（Tech Stack）

Frontend：Next.js / TailwindCSS / Ant Design / TypeScript

Audio：浏览器内建 SpeechSynthesis 或 AI TTS

AI Example（可选）：OpenAI API

Deploy：Vercel / Netlify / GitHub Pages

📂 项目结构（Project Structure）
KanaStudio/


先完成五十音展示 + 点击发音（最低可展示）

之后加上 测验模式（提升互动效果）

若有时间，再加 AI 例句生成（亮点功能）

🧪 快速启动（How to Run）

方式一：Next.js + TailwindCSS + Ant Design

1. 初始化项目

`npx create-next-app@latest . --ts`

2. 安装与配置 TailwindCSS

`npm install -D tailwindcss postcss autoprefixer`

`npx tailwindcss init -p`

将 `tailwind.config.js` 的 `content` 配置为：

`content: ["./app/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"]`

在 `app/globals.css` 加入：

`@tailwind base;\n@tailwind components;\n@tailwind utilities;`

3. 安装 Ant Design

`npm install antd @ant-design/icons`

在 `app/layout.tsx` 顶部引入：

`import 'antd/dist/reset.css'`

4. 运行开发服务器

`npm run dev`

方式二：纯前端静态版本

无需任何后端，直接打开 `index.html` 即可开始本地使用。部署到 GitHub Pages、Netlify 或 Vercel 均可。

🗺️ 未来可扩展功能（Roadmap）

手写假名练习（Canvas）

假名书写动画

用户学习进度记录（localStorage）

假名 → 单词 → 句子的渐进式学习系统

📜 许可证（License）

MIT License – 可自由使用与修改。

如果你需要，我还可以继续帮你：

✅ 生成一个 Logo 设计风格
✅ 写 index.html + app.js 的最简模板
✅ 帮你做一个简约的 UI 布局
✅ 帮你整合五十音数据（JSON / JS）

你要我继续帮你写前端代码吗？
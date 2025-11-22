# KanaStudio · 暗黑风格的日语五十音学习站

KanaStudio 是一个基于 Next.js 构建的现代网页应用，旨在帮助用户系统地学习日语五十音（平假名 & 片假名），并通过 DeepSeek AI 自动生成单词、例句、解释提升学习效率。支持暗黑主题、卡片式网格、自动朗读与逐笔书写动画。

访问入口：
- 首页：`/`
- 落地页：`/landing`
- GitHub：`https://github.com/hakusai22`

## 项目介绍

- 核心目标：提供「好看、直观、轻量」的五十音学习体验
- 交互特性：点击卡片自动朗读，弹窗展示书写动画；AI 自动生成例句后自动朗读
- 设计语言：深色优先、渐变点缀、轻微动效（标题渐变、面板漂浮、星点闪烁）

## 技术架构

- 框架：`Next.js 16`（App Router）
- 语言：`TypeScript` + `React 19`
- UI 组件：`Ant Design 6`
- 样式体系：`Tailwind CSS v4` + 全局 `globals.css`
- 主题：暗黑模式（`html.dark` + `color-scheme: dark` + AntD `darkAlgorithm`）
- 服务接口：`/api/deepseek` 路由封装 AI 生成能力（无密钥则返回本地 mock）

## 技术组件

- UI 与主题
  - `ConfigProvider` 自定义 `token` 与组件主题（Tabs、Segmented、Modal 等）
  - 全局暗色变量与 CSS 动效：标题渐变流动、面板轻浮、星点闪烁
- 动画与交互
  - 假名卡片：悬浮阴影、点击朗读、下方展示罗马音
  - 书写动画：`stroke-dasharray/offset` 按笔画顺序逐段显现；对形态要求高的字符使用字形轮廓描边模式
- 数据与 API
  - `/api/deepseek` 返回结构：`word`、`wordReading`、`wordRomaji`、`pos`、`definition`、`sentence`、`reading`、`translation`
  - 生成成功后在弹窗中自动朗读例句

## 语音播放技术

- 使用浏览器内置 `Web Speech API` 的 `SpeechSynthesis` 实现本地 TTS，无需联网
- 通过 `SpeechSynthesisUtterance` 设置语言为 `ja-JP`，调用 `speechSynthesis.speak(utter)` 播放
- 发音资源来自操作系统/浏览器内置的日语语音包，质量取决于本机环境
- 可选参数：`rate`（语速）、`pitch`（音高）、`volume`（音量）；可通过 `speechSynthesis.getVoices()` 指定具体日语 `voice`
- 点击假名立即朗读：`src/app/page.tsx`；弹窗内可再次朗读：`src/components/KanaModal.tsx`

## 功能列表

- 五十音网格（平假名/片假名）
  - 卡片显示假名与罗马音
  - 点击卡片自动朗读并打开弹窗
- 书写演示弹窗
  - 逐笔书写动画 + 朗读控制
  - AI 例句生成与自动朗读
  - 展示单词的罗马音、词性与解释
- 落地页 `/landing`
  - 暗黑 Hero、品牌 Logo、功能亮点卡片
- 顶部快捷入口
  - 右上角固定按钮：`落地页`、`GitHub`

## 未来 TODO

- 全量补齐高精度笔顺数据（覆盖全部假名与拗音）
- 朗读控制增强（语速/音量/男声女声切换）
- 主题切换（系统浅色/深色、手动切换）
- 学习进度与练习模式（测验、错题本、间隔复习）
- 本地化与多语言（中文/英文 UI）
- 移动端细节适配（更大点击区、触控反馈）

## 快速开始

```bash
npm install
npm run dev
# 打开 http://localhost:3000/
```

可选：配置 AI 密钥（若不配置使用本地 mock 数据）

```env
# 例如在部署环境中注入：DEEPSEEK_API_KEY=xxxxx
```

## 目录结构（关键）

```
src/app/
  layout.tsx          # 全局布局与暗色主题、右上角入口
  globals.css         # 全局样式、暗色变量与动效
  page.tsx            # 首页：五十音网格与弹窗
  landing/page.tsx    # 落地页：暗黑风格介绍页
  api/deepseek/route.ts # AI 例句生成接口（无密钥返回 mock）
src/components/
  KanaCard.tsx        # 单个假名卡片（罗马音、点击朗读）
  KanaModal.tsx       # 书写演示弹窗 + AI 结果
  KanaWriter.tsx      # 逐笔书写动画（路径/字形描边）
  AnimatedBackground.tsx # 背景渐变与星点动效
  Logo.tsx            # 站点 Logo（暗色渐变）
src/lib/
  kanaRows.ts         # 五十音数据行
  kanaStrokes.ts      # 笔画路径数据（示例/待补齐）
  romaji.ts           # 罗马音映射
```

## 版权与致谢

- 技术栈与图标源于开源生态，感谢 Next.js、Ant Design、Tailwind 等优秀组件库
- 个人主页：`https://github.com/hakusai22`
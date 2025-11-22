"use client";
import { Layout, Typography, Button, Card } from "antd";
import { BookOutlined, RobotOutlined, EditOutlined } from "@ant-design/icons";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Landing() {
  return (
    <Layout className="min-h-screen bg-transparent relative">
      <Layout.Content className="mx-auto w-full max-w-6xl px-6 py-14 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-3"><Logo size={40} /></div>
          <Typography.Title>
            <span className="bg-linear-to-r from-fuchsia-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,212,253,0.35)] title-shimmer">
              KanaStudio
            </span>
          </Typography.Title>
          <Typography.Paragraph className="mt-2.5! text-gray-300!">
            KanaStudio 是一个基于 Next.js 构建的现代网页应用，旨在帮助用户系统地学习 日语五十音（平假名 & 片假名），并通过 DeepSeek AI 自动生成单词、例句、解释提升学习效率。
          </Typography.Paragraph>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/">
              <Button type="primary" size="large">开始学习</Button>
            </Link>
            <Link href="/">
              <Button size="large" className="border border-cyan-400/30 bg-black/30">了解更多</Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl border border-[#1b1e2a] bg-[#111318]" hoverable>
            <div className="flex items-center gap-2">
              <BookOutlined className="text-cyan-400" />
              <Typography.Title level={4} className="m-0! text-[#e6e9ff]!"><span>五十音系统学习</span></Typography.Title>
            </div>
            <Typography.Paragraph className="mt-2! text-gray-400!">平假名与片假名分组展示，点击卡片即可播放发音。</Typography.Paragraph>
          </Card>
          <Card className="rounded-2xl border border-[#1b1e2a] bg-[#111318]" hoverable>
            <div className="flex items-center gap-2">
              <RobotOutlined className="text-cyan-400" />
              <Typography.Title level={4} className="m-0! text-[#e6e9ff]!"><span>AI 例句生成</span></Typography.Title>
            </div>
            <Typography.Paragraph className="mt-2! text-gray-400!">基于 DeepSeek 自动生成相关单词、例句、读音与解释。</Typography.Paragraph>
          </Card>
          <Card className="rounded-2xl border border-[#1b1e2a] bg-[#111318]" hoverable>
            <div className="flex items-center gap-2">
              <EditOutlined className="text-cyan-400" />
              <Typography.Title level={4} className="m-0! text-[#e6e9ff]!"><span>书写动画与朗读</span></Typography.Title>
            </div>
            <Typography.Paragraph className="mt-2! text-gray-400!">弹窗内显示逐笔书写动画，并支持例句自动朗读。</Typography.Paragraph>
          </Card>
        </div>
      </Layout.Content>
    </Layout>
  );
}
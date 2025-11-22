"use client";
import { Tabs, Typography, Layout, Segmented } from "antd";
import KanaCard from "@/components/KanaCard";
import {
  hiraganaSeionRows as HSeionRows,
  hiraganaDakutenRows as HDakutenRows,
  hiraganaYouonRows as HYouonRows,
  katakanaSeionRows as KSeionRows,
  katakanaDakutenRows as KDakutenRows,
  katakanaYouonRows as KYouonRows,
} from "@/lib/kanaRows";
import KanaModal from "@/components/KanaModal";
import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";

 

function GridRows({ rows, onSelect }: { rows: string[][]; onSelect: (k: string) => void }) {
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-5 gap-4">
          {row.map((k, j) => (
            k ? (
              <KanaCard key={k} value={k} onClick={onSelect} />
            ) : (
              <KanaCard key={`empty-${i}-${j}`} value={""} onClick={() => {}} disabled />
            )
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [script, setScript] = useState<"hira" | "kata">("hira");
  const handleSelect = (k: string) => {
    setSelected(k);
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(k);
    u.lang = "ja-JP";
    speechSynthesis.speak(u);
  };
  
  return (
    <Layout className="min-h-screen bg-transparent relative">
      <Layout.Content className="mx-auto w-full max-w-6xl px-6 py-10 relative z-10">
        <div className="mb-8">
          {/* 标题 */}
          <Typography.Title className="mt-3! mb-2!">
            <span className="bg-linear-to-r from-fuchsia-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,212,253,0.3)] title-shimmer">
              KanaStudio
            </span>
          </Typography.Title>
          
          {/* 切换按钮 */}
          <div className="mt-3">
            <Segmented
              options={[
                { label: "平假名", value: "hira" },
                { label: "片假名", value: "kata" },
              ]}
              value={script}
              onChange={(v) => setScript(v as any)}
              size="large"
              block
              className="bg-black/40! backdrop-blur! w-full whitespace-nowrap"
            />
          </div>
          
          {/* 描述文字 */}
          <Typography.Paragraph className="mt-2.5! text-gray-300!">
            KanaStudio 是一个基于 Next.js 构建的现代网页应用，旨在帮助用户系统地学习 日语五十音（平假名 & 片假名），并通过 DeepSeek AI 自动生成单词、例句、解释提升学习效率。
          </Typography.Paragraph>
        </div>
        
        {/* 主内容卡片 */}
        <div className="rounded-2xl bg-black/60 p-6 backdrop-blur-lg border border-[#1b1e2a] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] panel-float">
          <Tabs
            items={
              script === "hira"
                ? [
                    { key: "seion", label: "清音", children: <GridRows rows={HSeionRows} onSelect={handleSelect} /> },
                    { key: "dakuten", label: "浊音", children: <GridRows rows={HDakutenRows} onSelect={handleSelect} /> },
                    { key: "youon", label: "拗音", children: <GridRows rows={HYouonRows} onSelect={handleSelect} /> },
                  ]
                : [
                    { key: "seion", label: "清音", children: <GridRows rows={KSeionRows} onSelect={handleSelect} /> },
                    { key: "dakuten", label: "浊音", children: <GridRows rows={KDakutenRows} onSelect={handleSelect} /> },
                    { key: "youon", label: "拗音", children: <GridRows rows={KYouonRows} onSelect={handleSelect} /> },
                  ]
            }
          />
        </div>
      </Layout.Content>
      <KanaModal kana={selected} open={!!selected} onClose={() => setSelected(null)} />
    </Layout>
  );
}

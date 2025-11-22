"use client";
import { Modal, Typography, Button, Spin } from "antd";
import { useState } from "react";
import KanaWriter from "@/components/KanaWriter";
import { toRomaji } from "@/lib/romaji";

export default function KanaModal({ 
  kana, 
  open, 
  onClose 
}: { 
  kana: string | null; 
  open: boolean; 
  onClose: () => void 
}) {
  if (!kana) return null;
  const romaji = toRomaji(kana);
  const [ai, setAi] = useState<{
    word: string;
    wordReading?: string;
    wordRomaji?: string;
    pos?: string;
    definition?: string;
    sentence: string;
    reading: string;
    translation: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const speakSentence = () => {
    if (!ai?.sentence) return;
    const u = new SpeechSynthesisUtterance(ai.sentence);
    u.lang = "ja-JP";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };
  const generate = async () => {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("/api/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kana }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error("生成失败");
      setAi(data);
      if (data?.sentence) {
        const u = new SpeechSynthesisUtterance(data.sentence);
        u.lang = "ja-JP";
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      }
    } catch (e) {
      setErr("生成失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal 
      open={open} 
      onCancel={onClose} 
      footer={null} 
      title={null} 
      centered
      className="geek-modal"
    >
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="flex w-full items-center justify-between">
          <button 
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium"
            onClick={onClose}
          >
            ← 切换假名
          </button>
          <span className="geek-header">AUTO WRITE + TTS</span>
        </div>
        
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="svg-panel">
              <KanaWriter kana={kana} />
            </div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <Typography.Text className="text-[24px]! font-medium romaji-chip">
                {romaji}
              </Typography.Text>
              <button
                aria-label="播放"
                className="btn-icon-geek"
                onClick={() => {
                  const u = new SpeechSynthesisUtterance(kana);
                  u.lang = "ja-JP";
                  speechSynthesis.cancel();
                  speechSynthesis.speak(u);
                }}
              >
                🔊
              </button>
              <Button type="primary" size="large" onClick={generate} disabled={loading} className="btn-geek-primary">
                {loading ? <Spin size="small" /> : "AI生成例句"}
              </Button>
            </div>
            {err && <div className="mt-2 text-red-400 text-xs">{err}</div>}
          </div>
          <div className={`w-full md:w-auto ai-panel ${ai ? '' : 'md:hidden'}`}>
            {ai && (
              <div className="rounded-xl border border-cyan-400/30 bg-black/25 p-6">
                <div className="flex items-center gap-2">
                  <Typography.Text className="text-cyan-300! text-base!">相关单词：</Typography.Text>
                  <Typography.Text className="text-[#e6e9ff] text-base!">{ai.word}</Typography.Text>
                </div>
                <div className="mt-1 text-gray-300 text-xs!">
                  {ai.pos ? `词性：${ai.pos}` : null}
                </div>
                {ai.definition && (
                  <div className="mt-1 text-gray-300 text-xs!">解释：{ai.definition}</div>
                )}
                {(ai.wordRomaji || ai.wordReading) && (
                  <div className="mt-1 text-gray-400 text-xs!">罗马音：{ai.wordRomaji ?? ai.wordReading}</div>
                )}
                <div className="mt-2">
                  <div className="flex items-center gap-3">
                    <Typography.Text className="text-cyan-300! text-base!">例句</Typography.Text>
                    <Button size="middle" onClick={speakSentence} className="border border-cyan-400/30 bg-black/20 hover:bg-cyan-400/10">🔊 朗读</Button>
                  </div>
                  <div className="mt-1 text-[#e6e9ff] text-[20px]!">{ai.sentence}</div>
                  <div className="mt-1 text-cyan-400/80 text-[16px]!">{ai.reading}</div>
                  <div className="mt-1 text-gray-300 text-[14px]!">{ai.translation}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";
import { kanaStrokes } from "@/lib/kanaStrokes";

export default function KanaWriter({ kana }: { kana: string }) {
  const [replayKey, setReplayKey] = useState(0);
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);

  // 将假名拆分为多个字符，支持拗音与带浊音/半浊音
  const chars = Array.from(kana);
  const isSmall = (ch: string) => "ゃゅょャュョぁぃぅぇぉァィゥェォ".includes(ch);
  const isHiraDakuten = (ch: string) => "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ".includes(ch);
  const isKataDakuten = (ch: string) => "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ".includes(ch);
  const outlinePreferred = new Set<string>(["あ"]);
  const hiraDakutenMap: Record<string, { base: string; mark: "゛" | "゜" }> = {
    が: { base: "か", mark: "゛" }, ぎ: { base: "き", mark: "゛" }, ぐ: { base: "く", mark: "゛" }, げ: { base: "け", mark: "゛" }, ご: { base: "こ", mark: "゛" },
    ざ: { base: "さ", mark: "゛" }, じ: { base: "し", mark: "゛" }, ず: { base: "す", mark: "゛" }, ぜ: { base: "せ", mark: "゛" }, ぞ: { base: "そ", mark: "゛" },
    だ: { base: "た", mark: "゛" }, ぢ: { base: "ち", mark: "゛" }, づ: { base: "つ", mark: "゛" }, で: { base: "て", mark: "゛" }, ど: { base: "と", mark: "゛" },
    ば: { base: "は", mark: "゛" }, び: { base: "ひ", mark: "゛" }, ぶ: { base: "ふ", mark: "゛" }, べ: { base: "へ", mark: "゛" }, ぼ: { base: "ほ", mark: "゛" },
    ぱ: { base: "は", mark: "゜" }, ぴ: { base: "ひ", mark: "゜" }, ぷ: { base: "ふ", mark: "゜" }, ぺ: { base: "へ", mark: "゜" }, ぽ: { base: "ほ", mark: "゜" },
  };
  const kataDakutenMap: Record<string, { base: string; mark: "゛" | "゜" }> = {
    ガ: { base: "カ", mark: "゛" }, ギ: { base: "キ", mark: "゛" }, グ: { base: "ク", mark: "゛" }, ゲ: { base: "ケ", mark: "゛" }, ゴ: { base: "コ", mark: "゛" },
    ザ: { base: "サ", mark: "゛" }, ジ: { base: "シ", mark: "゛" }, ズ: { base: "ス", mark: "゛" }, ゼ: { base: "セ", mark: "゛" }, ゾ: { base: "ソ", mark: "゛" },
    ダ: { base: "タ", mark: "゛" }, ヂ: { base: "チ", mark: "゛" }, ヅ: { base: "ツ", mark: "゛" }, デ: { base: "テ", mark: "゛" }, ド: { base: "ト", mark: "゛" },
    バ: { base: "ハ", mark: "゛" }, ビ: { base: "ヒ", mark: "゛" }, ブ: { base: "フ", mark: "゛" }, ベ: { base: "ヘ", mark: "゛" }, ボ: { base: "ホ", mark: "゛" },
    パ: { base: "ハ", mark: "゜" }, ピ: { base: "ヒ", mark: "゜" }, プ: { base: "フ", mark: "゜" }, ペ: { base: "ヘ", mark: "゜" }, ポ: { base: "ホ", mark: "゜" },
  };


  // 针对每个 SVG，按路径长度执行动画
  useEffect(() => {
    svgRefs.current.forEach((svg) => {
      if (!svg) return;
      const elements = Array.from(svg.querySelectorAll<SVGGeometryElement | SVGTextElement>("path, text"));
      let delay = 0;
      const baseDuration = 500;
      elements.forEach((el) => {
        const isText = el.tagName.toLowerCase() === "text";
        const length = isText
          ? (el as unknown as SVGTextElement).getComputedTextLength?.() || 240
          : (el as SVGPathElement).getTotalLength();
        el.setAttribute("stroke-dasharray", `${length}`);
        el.setAttribute("stroke-dashoffset", `${length}`);
        el.setAttribute(
          "style",
          `transition: stroke-dashoffset ${Math.max(400, Math.min(900, baseDuration + length * 0.35))}ms ease ${delay}ms`
        );
        requestAnimationFrame(() => {
          el.setAttribute("stroke-dashoffset", "0");
        });
        delay += 220;
      });
    });
  }, [kana, replayKey]);

  // 渲染单个字符的笔画（含叠加浊音/半浊音）
  const renderCharSvg = (ch: string, idx: number) => {
    let baseChar = ch;
    let mark: "゛" | "゜" | null = null;
    if (isHiraDakuten(ch)) {
      baseChar = hiraDakutenMap[ch].base;
      mark = hiraDakutenMap[ch].mark;
    } else if (isKataDakuten(ch)) {
      baseChar = kataDakutenMap[ch].base;
      mark = kataDakutenMap[ch].mark;
    }
    const baseStrokes = kanaStrokes[baseChar];
    const isSm = isSmall(ch);
    const scale = isSm ? 0.85 : 1;
    const translateX = isSm ? 30 : 0;
    const translateY = isSm ? 25 : 0;

    return (
      <div key={`cell-${idx}`} className="rounded-xl border border-[#2a2d3a] bg-[#0f1117] p-3 shadow-sm">
        <svg
          ref={(el) => {
            svgRefs.current[idx] = el;
          }}
          viewBox="0 0 300 300"
          width={300}
          height={300}
        >
          {/* 深色网格 */}
          <rect x={10} y={10} width={280} height={280} fill="#0f1117" stroke="#1f2430" />
          <line x1={150} y1={10} x2={150} y2={290} stroke="#1f2430" />
          <line x1={10} y1={150} x2={290} y2={150} stroke="#1f2430" />
          <line x1={10} y1={10} x2={290} y2={290} stroke="#1f2430" />
          <line x1={290} y1={10} x2={10} y2={290} stroke="#1f2430" />

          <g transform={`translate(${translateX}, ${translateY}) scale(${scale})`}>
            {baseStrokes && !outlinePreferred.has(baseChar) ? (
              baseStrokes.map((s, i) => (
                <path key={i} d={s.d} stroke="#e6e9ff" strokeWidth={10} fill="none" strokeLinecap="round" />
              ))
            ) : (
              // 文本描边回退（统一风格）
              <text x={150} y={190} textAnchor="middle" fontSize={180} fill="none" stroke="#e6e9ff" strokeWidth={8} style={{ fontFamily: "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', sans-serif" }}>
                {baseChar}
              </text>
            )}
          </g>

          {/* 浊音/半浊音标记：叠加到右上角 */}
          {mark && (
            <g>
              {mark === "゛" ? (
                <>
                  <circle cx={220} cy={70} r={6} fill="#e6e9ff" />
                  <circle cx={245} cy={55} r={6} fill="#e6e9ff" />
                </>
              ) : (
                <circle cx={238} cy={62} r={8} fill="#e6e9ff" />
              )}
            </g>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row gap-3">
        {chars.map((ch, idx) => renderCharSvg(ch, idx))}
      </div>
      <div className="flex items-center gap-4">
        <button
          className="rounded-full bg-cyan-500 px-4 py-2 text-gray-900 font-medium shadow-lg hover:bg-cyan-400 transition-colors"
          onClick={() => {
            speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(kana);
            utter.lang = "ja-JP";
            speechSynthesis.speak(utter);
            setReplayKey((k) => k + 1);
          }}
        >
          再看一遍
        </button>
      </div>
    </div>
  );
}
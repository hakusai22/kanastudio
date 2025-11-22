"use client";
import { Card, Typography } from "antd";
import { toRomaji } from "@/lib/romaji";

export default function KanaCard({ 
  value, 
  onClick, 
  disabled 
}: { 
  value: string; 
  onClick: (v: string) => void; 
  disabled?: boolean 
}) {
  const isEmpty = !value || disabled;
  const romaji = !isEmpty ? toRomaji(value) : "";
  
  return (
    <Card
      hoverable={!isEmpty}
      className={`
        transition-all duration-300 ease-out rounded-xl border border-[#2a2d3a] bg-[#111318] 
        ${isEmpty 
          ? "opacity-0 pointer-events-none" 
          : "hover:shadow-[0_8px_30px_rgb(34,212,253,0.25)] hover:-translate-y-1 hover:border-cyan-400/40"
        }
      `}
      onClick={isEmpty ? undefined : () => onClick(value)}
      styles={{ body: { padding: 16 } }}
    >
      {!isEmpty && (
        <>
          <Typography.Title 
            level={2} 
            className="m-0! text-center! text-[#e6e9ff]!"
          >
            {value}
          </Typography.Title>
          <Typography.Paragraph 
            className="mt-1! mb-0! text-center! text-gray-400! text-xs!"
          >
            {romaji}
          </Typography.Paragraph>
        </>
      )}
    </Card>
  );
}
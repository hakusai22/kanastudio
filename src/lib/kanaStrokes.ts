// Simple stroke path data for a subset of kana, for demonstration.
// Coordinates are in a 300x300 viewBox.
export type Stroke = { d: string };
export const kanaStrokes: Record<string, Stroke[]> = {
  // Hiragana あ (approximate)
  "あ": [
    { d: "M120 120 C140 110 150 120 160 140" },
    { d: "M185 70 C190 120 190 180 180 240" },
    { d: "M120 180 C100 230 150 260 210 240 C245 228 248 190 220 170 C198 155 160 150 130 165" },
  ],
  // Hiragana い (approximate)
  "い": [
    { d: "M160 60 C150 110 150 180 160 220" },
    { d: "M200 80 C210 140 210 200 200 240" },
  ],
  // Hiragana う (approximate)
  "う": [
    { d: "M200 60 C180 110 180 160 200 200" },
    { d: "M120 180 C160 220 220 220 240 200" },
  ],
  // Hiragana え (approximate)
  "え": [
    { d: "M110 120 C160 110 210 110 240 120" },
    { d: "M140 150 C180 180 220 190 240 170" },
    { d: "M150 70 C140 100 130 140 130 210" },
  ],
  // Hiragana お (approximate)
  "お": [
    { d: "M170 40 C150 80 150 120 170 160" },
    { d: "M130 170 C130 220 180 240 220 220 C250 205 250 170 220 160 C190 150 160 155 130 170" },
  ],
  // Katakana ア (approximate)
  "ア": [
    { d: "M120 80 L240 80" },
    { d: "M170 80 L130 240" },
    { d: "M170 140 L240 220" },
  ],
  // Katakana イ (approximate)
  "イ": [
    { d: "M130 90 L220 70" },
    { d: "M160 120 L130 240" },
  ],
  // Katakana ウ (approximate)
  "ウ": [
    { d: "M110 90 L240 90" },
    { d: "M170 90 L130 240" },
    { d: "M170 150 L240 210" },
  ],
  // Katakana エ (approximate)
  "エ": [
    { d: "M120 90 L240 90" },
    { d: "M120 150 L220 150" },
    { d: "M120 90 L120 240" },
  ],
  // Katakana オ (approximate)
  "オ": [
    { d: "M120 90 L240 90" },
    { d: "M170 90 L170 240" },
    { d: "M120 160 L240 220" },
  ],
};
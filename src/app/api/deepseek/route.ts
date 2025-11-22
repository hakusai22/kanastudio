import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { kana } = await req.json();
    if (!kana || typeof kana !== "string") {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }
    const apiKey = "aaa";
    if (!apiKey) {
      return NextResponse.json({
        word: "学生",
        wordReading: "がくせい",
        wordRomaji: "gakusei",
        pos: "名词",
        definition: "学生；受教育的人",
        sentence: "あの学生はまじめです。",
        reading: "あの がくせい は まじめ です",
        translation: "那位学生很认真。",
        model: "mock",
      });
    }
    const prompt = `你是一名精通日语与中文的语言助手。给定一个假名：${kana}。请生成：
1) 一个相关单词（尽量初级常用），
2) 该单词的假名读法（平假名）、罗马音、词性与简要解释，
3) 一句日语例句，
4) 例句的假名读法（全用平假名），
5) 中文翻译。
严格返回如下 JSON：{"word":"...","wordReading":"...","wordRomaji":"...","pos":"...","definition":"...","sentence":"...","reading":"...","translation":"..."}`;
    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "仅返回严格 JSON，不要解释。" },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content ?? "";
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({ error: "bad_output" }, { status: 502 });
    }
    const json = JSON.parse(match[0]);
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";

export async function POST(req) {
  const { messages } = await req.json();
  const openaiKey = process.env.OPENAI_API_KEY;
  const elevenKey = process.env.ELEVENLABS_API_KEY;

  const ENABLE_TTS = false; // Ganti jadi true kalau mau aktifkan ElevenLabs

  if (!openaiKey || (ENABLE_TTS && !elevenKey)) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 });
  }

  // 1. Get AI response from OpenAI
  const chatRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  if (!chatRes.ok) {
    return NextResponse.json({ error: "Failed to fetch from OpenAI" }, { status: 500 });
  }

  const chatData = await chatRes.json();
  const text = chatData.choices?.[0]?.message?.content || "Maaf, AI tidak bisa membalas saat ini.";

  // 2. OPTIONAL: Get audio from ElevenLabs
  if (ENABLE_TTS) {
    try {
      const voiceId = "EXAVITQu4vr4xnSDxMaL";
      const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": elevenKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: { stability: 0.5, similarity_boost: 0.5 },
        }),
      });

      if (!ttsRes.ok) {
        return NextResponse.json({ error: "Failed to fetch from ElevenLabs" }, { status: 500 });
      }

      const audioBuffer = await ttsRes.arrayBuffer();
      const audioUrl = `data:audio/mpeg;base64,${Buffer.from(audioBuffer).toString("base64")}`;

      return NextResponse.json({ text, audioUrl });
    } catch (err) {
      return NextResponse.json({ error: "Error in ElevenLabs request", details: err.message }, { status: 500 });
    }
  }

  // Jika TTS dinonaktifkan, hanya kirim teks
  return NextResponse.json({ text, audioUrl: null });
}

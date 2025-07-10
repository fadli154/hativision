export async function POST(req) {
  const { message } = await req.json();

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY;

  try {
    const gRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: message }] }],
        generationConfig: { maxOutputTokens: 512, temperature: 0.8 },
      }),
    });

    const data = await gRes.json();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Maaf, AI tidak memberikan jawaban.";

    return Response.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

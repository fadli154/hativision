"use client";
import { useEffect, useRef, useState } from "react";

export default function VoiceAI() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current && !widgetRef.current.hasChildNodes()) {
      // Tambahkan elemen custom ElevenLabs
      const convai = document.createElement("elevenlabs-convai");
      convai.setAttribute("agent-id", "agent_01jzjwwt4zehwrf830n41xrs9v");
      widgetRef.current.appendChild(convai);
      // Tambahkan script
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      widgetRef.current.appendChild(script);
    }
  }, []);

  const handleSynthesize = async () => {
    setLoading(true);
    setAudioUrl(null);
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Gagal menghubungi API");
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert("Gagal menghasilkan suara: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 rounded-xl border bg-white dark:bg-zinc-900 shadow-md max-w-md mx-auto flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">Voice AI (Text to Speech)</h2>
      <textarea className="border rounded p-2 w-full min-h-[80px]" placeholder="Tulis teks untuk diubah menjadi suara..." value={text} onChange={(e) => setText(e.target.value)} />
      <button className="bg-purple-600 text-white rounded p-2 font-semibold hover:bg-purple-700 disabled:opacity-50" onClick={handleSynthesize} disabled={!text || loading}>
        {loading ? "Memproses..." : "Putar Suara"}
      </button>
      {audioUrl && <audio controls src={audioUrl} className="w-full mt-2" />}
      <div ref={widgetRef} className="flex justify-center mt-6" />
    </div>
  );
}

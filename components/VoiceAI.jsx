"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslations } from "next-intl";

export default function VoiceAI() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const widgetRef = useRef(null);
  const tVoice = useTranslations("VoiceAI");

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });

    // if (widgetRef.current && !widgetRef.current.hasChildNodes()) {
    //   const convai = document.createElement("elevenlabs-convai");
    //   convai.setAttribute("agent-id", "agent_01jzjwwt4zehwrf830n41xrs9v");
    //   widgetRef.current.appendChild(convai);

    //   const script = document.createElement("script");
    //   script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    //   script.async = true;
    //   script.type = "text/javascript";
    //   widgetRef.current.appendChild(script);
    // }
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
    <div className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 sm:p-8 space-y-6 border border-zinc-200 dark:border-zinc-700 transition-all duration-300">
        {/* Judul */}
        <h2 className="text-lg sm:text-3xl font-extrabold text-zinc-800 dark:text-white text-center flex items-center justify-center gap-2" data-aos="fade-up" data-aos-delay="200">
          <Mic className="text-purple-500 animate-pulse" />
          {tVoice("title1")} <span className="text-purple-500">{tVoice("title2")}</span>
        </h2>

        {/* Textarea */}
        <textarea
          className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm sm:text-base transition"
          placeholder={tVoice("textArea")}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          data-aos="fade-up"
          data-aos-delay="300"
        />

        {/* Tombol */}
        <button
          onClick={handleSynthesize}
          disabled={!text || loading}
          className="group w-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-semibold py-3 rounded-xl 
    hover:scale-[1.01] hover:shadow-lg 
    transition-all duration-300 ease-out
    disabled:opacity-50 flex items-center justify-center gap-2"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin size-5" />
              {tVoice("button2")}
            </>
          ) : (
            <>
              <Mic className="size-5 animate-pulse" />
              {tVoice("button1")}
            </>
          )}
        </button>

        {audioUrl && (
          <div className="mt-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">Hasil audio:</p>
            <audio controls src={audioUrl} className="w-full" />
          </div>
        )}

        {/* ElevenLabs Widget */}
        <div ref={widgetRef} className="flex justify-center mt-6" />
      </div>
    </div>
  );
}

"use client";
import { useState, useRef } from "react";

export default function VoiceConversation() {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  // Mulai rekam suara dan transkrip dengan Web Speech API
  const startRecording = () => {
    setError("");
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setError("Browser tidak mendukung Speech Recognition");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setMessages((msgs) => [...msgs, { role: "user", content: transcript }]);
      setRecording(false);
      setLoading(true);
      try {
        const res = await fetch("/api/chat-voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content: transcript }],
          }),
        });
        if (!res.ok) throw new Error("Gagal menghubungi AI");
        const data = await res.json();
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: data.text, audio: data.audioUrl },
        ]);
        if (audioRef.current) {
          audioRef.current.src = data.audioUrl;
          audioRef.current.play();
        }
      } catch (e) {
        setError("Gagal membalas: " + e.message);
      }
      setLoading(false);
    };
    recognition.onerror = (event) => {
      setError("Gagal merekam suara: " + event.error);
      setRecording(false);
    };
    recognitionRef.current = recognition;
    setRecording(true);
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  return null;
}

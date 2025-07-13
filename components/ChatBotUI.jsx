"use client";

import { useState, useRef } from "react";
import { Bot, BotOff, Mic, Send, X, Phone, PhoneOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useChatbot } from "@/context/chatbotcontext";

export default function ChatbotUI() {
  const { isOpen, setIsOpen } = useChatbot();
  const [isVoiceAgent, setIsVoiceAgent] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hai! Ada yang bisa aku bantu,seputar agama?" },
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Voice Agent Mode
  const startVoiceAgent = () => {
    setIsVoiceAgent(true);
    startListening();
  };
  const stopVoiceAgent = () => {
    setIsVoiceAgent(false);
    stopListening();
  };

  // Speech-to-text
  const startListening = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Browser tidak mendukung Speech Recognition");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.interimResults = false;
    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setMessages((msgs) => [...msgs, { role: "user", text }]);
      setIsListening(false);
      // Kirim ke AI dan balas dengan suara
      await handleVoiceAgentAI(text);
    };
    recognition.onend = () => {
      if (isVoiceAgent)
        startListening(); // auto listen lagi jika masih mode voice agent
      else setIsListening(false);
    };
    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };
  const stopListening = () => {
    recognitionRef.current && recognitionRef.current.stop();
    setIsListening(false);
  };

  // Voice Agent: kirim ke AI dan balas dengan suara
  const handleVoiceAgentAI = async (userMessage) => {
    setLoading(true);
    try {
      const GEMINI_API_KEY = "AIzaSyDlIUFcVYOmxQKvQG_wmHZbiVlQlRqWHrQ"; // WIP(TODO): store in env var instead.

      const url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

      const body = {
        contents: [
          {
            role: "model",
            parts: [
              {
                text: "You are an ustaz. Respond in Indonesian language. Respom dalam bentuk teks, bukan markdown.",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      // 🧠 Extract the response text
      const responseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", text: responseText },
      ]);
      // TTS balasan AI
      if ("speechSynthesis" in window) {
        const utter = new window.SpeechSynthesisUtterance(responseText);
        utter.lang = "id-ID";
        window.speechSynthesis.speak(utter);
      }
    } catch (e) {
      console.error(e);
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", text: "(Terjadi error, coba lagi nanti)" },
      ]);
    }
    setLoading(false);
  };

  // Chat text biasa
  const handleInput = (e) => setInput(e.target.value);
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const GEMINI_API_KEY = "AIzaSyDlIUFcVYOmxQKvQG_wmHZbiVlQlRqWHrQ"; // WIP(TODO): store in env var instead.

      const url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

      const body = {
        contents: [
          {
            role: "model",
            parts: [
              {
                text: "You are an ustaz. Respond in Indonesian language.",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: userMsg.text,
              },
            ],
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      // 🧠 Extract the response text
      const responseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          text: responseText,
        },
      ]);
    } catch (e) {
      console.error("Error fetching AI response:", e);
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", text: "(Terjadi error, coba lagi nanti)" },
      ]);
    }
    setLoading(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-white dark:from-violet-500 dark:to-purple-600 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700"
      >
        {isOpen ? (
          <BotOff className="w-6 h-6 animate-pulse" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
      </button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed bottom-28 right-6 z-50 w-[92vw] max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-violet-500 to-indigo-500 text-white">
              <h2 className="font-semibold text-lg">AI Assistant</h2>
              <button
                onClick={toggleChat}
                className="hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full"
              >
                <motion.div whileTap={{ rotate: 90 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              </button>
            </div>

            {/* Voice Agent Mode */}
            {isVoiceAgent ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-900 text-white">
                <div className="mb-4 flex flex-col items-center relative">
                  {/* Avatar dengan animasi mulut */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <img
                      src="/img/avatar-hijab.png"
                      alt="AI Avatar"
                      className="w-32 h-32 rounded-full border-4 border-violet-400 shadow-lg object-cover bg-white"
                    />
                    {/* Mulut animasi: bergerak saat loading (AI bicara) */}
                    <svg
                      className="absolute bottom-7 left-1/2 -translate-x-1/2"
                      width="32"
                      height="16"
                    >
                      <ellipse
                        cx="16"
                        cy="8"
                        rx={loading ? 10 : 7}
                        ry={loading ? 5 : 2}
                        fill="#a855f7"
                        style={{ transition: "all 0.3s", opacity: 0.8 }}
                      />
                    </svg>
                  </div>
                  <div className="font-bold text-lg mt-2">
                    AI Voice Agent Aktif
                  </div>
                  <div className="text-sm text-zinc-300">
                    {isListening
                      ? "Mendengarkan..."
                      : loading
                      ? "AI sedang berbicara..."
                      : "Menunggu..."}
                  </div>
                </div>
                <div className="w-full max-h-48 overflow-y-auto space-y-2 mb-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={
                        msg.role === "assistant"
                          ? "self-start bg-zinc-100 text-zinc-900 p-2 rounded-lg w-fit max-w-[75%] text-sm shadow"
                          : "self-end bg-indigo-500 text-white p-2 rounded-lg w-fit max-w-[75%] text-sm shadow"
                      }
                    >
                      {msg.text}
                    </div>
                  ))}
                  {loading && (
                    <div className="self-start bg-zinc-100 text-zinc-900 p-2 rounded-lg w-fit max-w-[75%] text-sm shadow opacity-70">
                      Mengetik...
                    </div>
                  )}
                </div>
                <button
                  onClick={stopVoiceAgent}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <PhoneOff className="w-4 h-4" /> Akhiri Voice Agent
                </button>
              </div>
            ) : (
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[400px] sm:max-h-[480px]">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={
                        msg.role === "assistant"
                          ? "self-start bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg w-fit max-w-[75%] text-sm shadow"
                          : "self-end bg-indigo-500 text-white p-3 rounded-lg w-fit max-w-[75%] text-sm shadow"
                      }
                    >
                      {msg.text}
                    </div>
                  ))}
                  {loading && (
                    <div className="self-start bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg w-fit max-w-[75%] text-sm shadow opacity-70">
                      Mengetik...
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="flex items-center gap-2 p-4 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ketik pesan..."
                    className="flex-1 p-2 px-4 text-sm rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                  />

                  {/* Send Button */}
                  <motion.button
                    whileTap={{ scale: 0.9, rotate: -10 }}
                    className="p-2 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>

                  {/* Mic Button: Voice Agent Mode */}
                  <motion.button
                    onClick={startVoiceAgent}
                    animate={{ scale: isVoiceAgent ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`p-2 rounded-full border ${
                      isVoiceAgent
                        ? "bg-green-100 text-green-500 border-green-300"
                        : "text-zinc-500 border-zinc-300 dark:border-zinc-600"
                    } hover:text-violet-500 transition focus:outline-none focus:ring-2 focus:ring-violet-500`}
                    aria-label="Aktifkan Voice Agent"
                  >
                    <Mic
                      className={isVoiceAgent ? "animate-pulse" : "w-4 h-4"}
                    />
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

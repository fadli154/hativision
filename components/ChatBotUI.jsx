"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, BotOff, Mic, Send, X } from "lucide-react";
import { useChatbot } from "@/context/chatbotcontext";
import { useEffect } from "react";

export default function ChatbotUI() {
  const { isOpen, setIsOpen } = useChatbot();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: "Hai! Ada yang bisa aku bantu?" }]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("chatbot-messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatbot-messages", JSON.stringify(messages));
  }, [messages]);

  const setupRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser kamu tidak mendukung Speech Recognition. Coba di Chrome/Edge.");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    return recognition;
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
    } else {
      const recognition = setupRecognition();
      if (!recognition) return;

      recognitionRef.current = recognition;
      setIsListening(true);

      recognition.start();

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        const userMessage = { from: "user", text: transcript };
        setMessages((prev) => [...prev, userMessage]);

        const reply = await generateReply(input); // atau transcript
        setMessages((prev) => [...prev, { from: "bot", text: "" }]);
        await typeText(reply);
        await speak(reply); // menunggu speak selesai
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  // Native speech synthesis
  const speak = (text) => {
    return new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "id-ID";
      utter.pitch = 1;
      utter.rate = 1;

      setIsSpeaking(true);
      utter.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      window.speechSynthesis.speak(utter);
    });
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const reply = await generateReply(input);
    const botMessage = { from: "bot", text: reply };
    setMessages((prev) => [...prev, botMessage]);
    speak(reply);
  };

  const generateReply = async (userText) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      if (data.error?.code === 429 || data.error?.message?.includes("limit")) {
        return "Maaf, batas penggunaan AI sudah habis. Coba lagi nanti.";
      }

      return data.reply;
    } catch (err) {
      console.error("Gemini error:", err);
      return "Maaf, terjadi kesalahan.";
    } finally {
      setIsLoading(false);
    }
  };

  const typeText = async (text, delay = 25) => {
    setIsTyping(true);
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.from === "bot") {
            updated[updated.length - 1].text += text[i];
          }
          return updated;
        });
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
          resolve();
        }
      }, delay);
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-white"
      >
        {isOpen ? <BotOff className="w-6 h-6 animate-pulse" /> : <Bot className="w-6 h-6" />}
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
            className="fixed bottom-24 right-4 lg:right-10 z-50 w-[92vw] max-w-md h-[calc(100vh-8rem)] max-h-[75vh] min-h-[300px] sm:min-h-[350px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-violet-500 to-indigo-500 text-white">
              <h2 className="font-semibold text-lg">AI Assistant</h2>
              <button onClick={toggleChat} className="hover:scale-110 transition-transform focus:outline-none rounded-full">
                <motion.div whileTap={{ rotate: 90 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto space-y-3 px-4 py-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-3 rounded-lg w-fit max-w-[75%] text-sm shadow transition-all duration-300 ${
                      msg.from === "user" ? "bg-indigo-500 text-white self-end" : "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="self-start text-sm text-zinc-500 flex items-center gap-2 animate-pulse mt-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-400 animate-bounce" />
                  <div className="w-3 h-3 rounded-full bg-zinc-400 animate-bounce delay-100" />
                  <div className="w-3 h-3 rounded-full bg-zinc-400 animate-bounce delay-200" />
                  <span>AI sedang mengetik...</span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2 p-4 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <input
                type="text"
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-2 px-4 text-sm rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <motion.button
                onClick={handleSend}
                whileTap={{ scale: 0.9, rotate: -10 }}
                disabled={isLoading || isSpeaking || isTyping}
                className="p-2 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={toggleMic}
                animate={{ scale: isListening ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                disabled={isLoading || isSpeaking || isTyping}
                className={`p-2 rounded-full border ${
                  isListening ? "bg-red-100 text-red-500 border-red-300 animate-pulse" : "text-zinc-500 border-zinc-300 dark:border-zinc-600"
                } hover:text-violet-500 transition focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50`}
              >
                <Mic className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

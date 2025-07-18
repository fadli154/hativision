"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, BotOff, Mic, Send, X, Volume2, VolumeX } from "lucide-react";
import { useChatbot } from "@/context/chatbotcontext";

export default function ChatbotUI() {
  const { isOpen, setIsOpen } = useChatbot();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: "Hai! Ada yang bisa aku bantu?" }]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const speechQueueRef = useRef(null);
  const currentWordsRef = useRef([]);
  const currentWordIndexRef = useRef(0);

  const utteranceRef = useRef(null);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);
  const modalRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const isMutedRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const saved = localStorage.getItem("chatbot-messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatbot-messages", JSON.stringify(messages));
  }, [messages]);

  const handleMouseDown = (e) => {
    const tag = e.target.tagName;
    if (["INPUT", "TEXTAREA", "BUTTON"].includes(tag)) return;
    e.preventDefault();
    setDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging || !modalRef.current) return;
    setHasMoved(true);
    const modalRect = modalRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(e.clientX - offsetRef.current.x, window.innerWidth - modalRect.width));
    const newY = Math.max(0, Math.min(e.clientY - offsetRef.current.y, window.innerHeight - modalRect.height));
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const toggleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser tidak mendukung Speech Recognition");

    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = "id-ID";
      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setMessages((prev) => [...prev, { from: "user", text: transcript }]);
        const reply = await generateReply(transcript);
        setMessages((prev) => [...prev, { from: "bot", text: "" }]);
        await typeText(reply);
        await speak(reply);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  };

  const speak = (text) => {
    if (isMutedRef.current) {
      speechQueueRef.current = { words: text.split(" "), index: 0 };
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "id-ID";
      utter.onend = () => {
        setIsSpeaking(false);
        speechQueueRef.current = null;
        resolve();
      };
      setIsSpeaking(true);
      utteranceRef.current = utter;
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
    setMessages((prev) => [...prev, { from: "bot", text: "" }]);
    await typeText(reply);
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
      return data.reply || "Maaf, terjadi kesalahan.";
    } catch {
      return "Maaf, tidak bisa terhubung.";
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

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      isMutedRef.current = next;
      if (next) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        resumeSpeechQueue();
      }
      return next;
    });
  };

  const resumeSpeechQueue = () => {
    const queue = speechQueueRef.current;
    if (!queue) return;
    const { words, index } = queue;
    currentWordsRef.current = words;
    currentWordIndexRef.current = index;

    const speakNextWord = () => {
      if (currentWordIndexRef.current >= words.length) {
        setIsSpeaking(false);
        speechQueueRef.current = null;
        return;
      }

      const word = words[currentWordIndexRef.current];
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = "id-ID";
      utter.onend = () => {
        currentWordIndexRef.current += 1;
        if (!isMutedRef.current) {
          speakNextWord();
        } else {
          speechQueueRef.current = {
            words,
            index: currentWordIndexRef.current,
          };
          setIsSpeaking(false);
        }
      };
      setIsSpeaking(true);
      utteranceRef.current = utter;
      window.speechSynthesis.speak(utter);
    };

    speakNextWord();
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-3 sm:right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {isOpen ? <BotOff className="w-6 h-6 animate-pulse" /> : <Bot className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && isClient && (
          <motion.div
            key="chatbot"
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              position: "fixed",
              ...(hasMoved ? { left: `${position.x}px`, top: `${position.y}px` } : { right: "18px", bottom: `${56 + 16 + 24}px` }),
              zIndex: 1000,
              width: "92vw",
              maxWidth: "400px",
              maxHeight: "65vh",
              display: "flex",
              flexDirection: "column",
            }}
            className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl overflow-hidden"
          >
            <div
              className="chat-header relative flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-violet-500 to-indigo-500 text-white select-none cursor-move"
              onMouseDown={handleMouseDown}
            >
              <h2 className="font-semibold text-lg">AI Assistant</h2>
              <div className="flex items-center gap-2">
                <motion.button onClick={toggleMute} whileTap={{ scale: 0.9 }} className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.button>
                <button
                  onClick={toggleChat}
                  className=" w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-transparent text-white shadow-sm hover:bg-red-500 hover:text-white hover:scale-110 hover:rotate-12 focus:scale-110 active:scale-95 transition-all duration-300 ease-in-out  dark:hover:bg-red-600 outline-none"
                  aria-label="Tutup modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

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
                <div className="text-sm text-zinc-500 flex items-center gap-2 animate-pulse mt-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-400 animate-bounce" />
                  <div className="w-3 h-3 rounded-full bg-zinc-400 animate-bounce delay-100" />
                  <div className="w-3 h-3 rounded-full bg-zinc-400 animate-bounce delay-200" />
                  <span>AI sedang mengetik...</span>
                </div>
              )}
            </div>

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
                whileTap={{ scale: 0.9 }}
                disabled={isLoading || isSpeaking || isTyping}
                className="p-2 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 group flex align-middle self-center items-center justify-center"
              >
                <Send className="w-4 h-4 group-focus:rotate-45 transform origin-center transition-transform duration-300 ease-in-out" />
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

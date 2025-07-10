"use client";

import { useState } from "react";
import { Bot, BotOff, Mic, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useChatbot } from "@/context/chatbotcontext";

export default function ChatbotUI() {
  const { isOpen, setIsOpen } = useChatbot();
  const [isListening, setIsListening] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMic = () => setIsListening(!isListening);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-white dark:from-violet-500 dark:to-purple-600 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700"
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
            className="fixed bottom-28 right-6 z-50 w-[92vw] max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-violet-500 to-indigo-500 text-white">
              <h2 className="font-semibold text-lg">AI Assistant</h2>
              <button onClick={toggleChat} className="hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full">
                <motion.div whileTap={{ rotate: 90 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[400px] sm:max-h-[480px]">
              <div className="self-start bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg w-fit max-w-[75%] text-sm shadow">Hai! Ada yang bisa aku bantu?</div>
              <div className="self-end bg-indigo-500 text-white p-3 rounded-lg w-fit max-w-[75%] text-sm shadow">Apa rekomendasi skincare untuk kulit berminyak?</div>
              {/* You can map more messages here */}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2 p-4 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <input type="text" placeholder="Ketik pesan..." className="flex-1 p-2 px-4 text-sm rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500" />

              {/* Send Button */}
              <motion.button whileTap={{ scale: 0.9, rotate: -10 }} className="p-2 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                <Send className="w-4 h-4" />
              </motion.button>

              {/* Mic Button */}
              <motion.button
                onClick={toggleMic}
                animate={{ scale: isListening ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-2 rounded-full border ${
                  isListening ? "bg-red-100 text-red-500 border-red-300" : "text-zinc-500 border-zinc-300 dark:border-zinc-600"
                } hover:text-violet-500 transition focus:outline-none focus:ring-2 focus:ring-violet-500`}
              >
                <Mic className={isListening ? "animate-ping-once" : "w-4 h-4"} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

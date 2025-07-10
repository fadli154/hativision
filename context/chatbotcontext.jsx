// context/ChatbotContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext({
  isOpen: false,
  setIsOpen: (open) => {},
});

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <ChatbotContext.Provider value={{ isOpen, setIsOpen }}>{children}</ChatbotContext.Provider>;
};

export const useChatbot = () => useContext(ChatbotContext);

import React, { createContext, useContext, useState } from "react";

export interface Message {
  id: number;
  date: string;
  subject: string;
  content: string;
  isRead: boolean;
  fromStaff: boolean;
}

interface MessagesContextType {
  messages: Message[];
  markAsRead: (id: number) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      date: "2024-02-25",
      subject: "Welcome to SecureBank",
      content: "Dear customer, welcome to SecureBank! We're here to help you with all your banking needs.",
      isRead: false,
      fromStaff: true
    },
    {
      id: 2,
      date: "2024-02-24",
      subject: "Account Security Update",
      content: "We've updated our security protocols. Please review the new security guidelines in your profile settings.",
      isRead: true,
      fromStaff: true
    }
  ]);

  const markAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  return (
    <MessagesContext.Provider value={{ messages, markAsRead }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
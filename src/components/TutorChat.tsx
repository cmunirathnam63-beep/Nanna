import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, HelpCircle, Loader, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

interface TutorChatProps {
  currentChapterId?: string;
  activeToolId?: string;
  studentName?: string;
  selectedGrade?: 1 | 6 | 9;
  onTutorAction?: (points: number) => void;
}

export default function TutorChat({ currentChapterId, activeToolId, studentName = "Student", selectedGrade = 6, onTutorAction }: TutorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: `Namaste ${studentName}! 🌟 I am **Ganit Mitra**, your Grade ${selectedGrade} study buddy! Ask me any question. For example, try typing 'fraction helper' or 'math puzzle'!`,
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: `Namaste **${studentName}**! 🌟 I am **Ganit Mitra**, your Grade ${selectedGrade} study buddy! Ask me any question. For example, try typing 'fraction helper' or 'math puzzle'!`,
        timestamp: new Date()
      }
    ]);
  }, [studentName, selectedGrade]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionPills = [
    { label: "🍕 Equivalent Fractions", query: "Can you explain how equivalent fractions work with an example?" },
    { label: "🔍 What is a variable?", query: "What is a variable in Algebra? Give me a matchstick example." },
    { label: "🔢 LCM vs HCF trick", query: "What is the easiest way to find LCM and HCF of 12 and 18?" },
    { label: "📏 Perimeter of field", query: "How do I calculate the perimeter of a rectangle schoolyard?" }
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    if (onTutorAction) onTutorAction(5); // Award points for questioning

    try {
      // Package chat history for the AI tutor (limited to last 10 messages for speed)
      const formattedHistory = messages.slice(-10).map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/math-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: formattedHistory,
          chapterContext: currentChapterId,
          mathToolContext: activeToolId
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        text: data.response || "I had a tiny calculation error! Could you repeat that?",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (onTutorAction) onTutorAction(10); // Extra points for completion
    } catch (err) {
      console.error("Tutor request error:", err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        text: "Oh! My chalk slipped. 🖍️ Let's try that again. In CBSE Grade 6, did you know that dividing any number by zero is not defined? Let's talk about something else, or re-type your query!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Minimal safe custom markdown parser for Grade 6 math styling (bold, header, bullets, highlights)
  const formatMessageText = (txt: string) => {
    // Process line breaks
    const lines = txt.split("\n");
    return lines.map((line, idx) => {
      let content = line;
      
      // Check for markdown headers
      if (line.startsWith("### ")) {
        return <h4 key={idx} className="text-sm font-black text-natural-dark mt-3 mb-1">{content.replace("### ", "")}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={idx} className="text-base font-black text-natural-dark mt-4 mb-1.5 border-b border-natural-beige-dark pb-0.5">{content.replace("## ", "")}</h3>;
      }
      if (line.startsWith("# ")) {
        return <h2 key={idx} className="text-lg font-black text-natural-dark mt-4 mb-2">{content.replace("# ", "")}</h2>;
      }

      // Check for bullet list
      const isBullet = line.startsWith("* ") || line.startsWith("- ");
      if (isBullet) {
        content = content.replace(/^(\*\s|-\s)/, "");
      }

      // Format bold blocks: **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        // Add text before bold
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        // Add bold text
        parts.push(<strong key={match.index} className="text-natural-dark font-extrabold bg-natural-cream px-1 rounded">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      const renderedLine = parts.length > 0 ? parts : content;

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-natural-dark leading-relaxed my-1">
            {renderedLine}
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs text-natural-dark leading-relaxed my-1.5">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-natural-beige-dark overflow-hidden" id="ai_tutor_companion">
      {/* Tutor Header */}
      <div className="bg-gradient-to-r from-natural-dark to-[#494933] p-4 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative">
            <span className="text-xl">🎓</span>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-natural-dark animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide">Ganit Mitra (AI Tutor)</h3>
            <span className="text-[10px] text-natural-beige-light font-medium">CBSE Math Specialist • Grade 6</span>
          </div>
        </div>
        <button
          onClick={() => {
            setMessages([
              {
                id: "welcome",
                role: "assistant",
                text: "Namaste! 🌟 Let's start fresh. Tell me, which chapter of math are we tackling together now?",
                timestamp: new Date()
              }
            ]);
            if (onTutorAction) onTutorAction(2);
          }}
          className="p-1.5 hover:bg-white/10 rounded-lg text-natural-beige-light hover:text-white cursor-pointer transition"
          title="Reset conversation"
          id="btn_reset_chat"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Messages Display Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-natural-beige-light/30">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              {/* Avatar Icon */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                isUser ? "bg-natural-primary text-white" : "bg-white border border-natural-beige-dark/50 text-natural-terracotta"
              }`}>
                {isUser ? <User size={13} /> : <Sparkles size={13} className="text-natural-terracotta animate-pulse" />}
              </div>

              {/* Message Bubble */}
              <div className={`rounded-2xl p-3 shadow-xs ${
                isUser 
                  ? "bg-natural-primary text-white rounded-tr-none" 
                  : "bg-white border border-natural-beige-dark/50 rounded-tl-none text-natural-dark"
              }`}>
                {isUser ? (
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                ) : (
                  <div className="space-y-1">{formatMessageText(msg.text)}</div>
                )}
                <span className={`text-[9px] block mt-1.5 text-right ${isUser ? "text-natural-beige-light/95" : "text-natural-sage"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex gap-2.5 max-w-[80%] mr-auto items-center text-natural-sage text-xs">
            <div className="w-7 h-7 rounded-full bg-natural-cream flex items-center justify-center shrink-0">
              <Loader className="animate-spin text-natural-sage" size={13} />
            </div>
            <div className="bg-white border border-natural-beige-dark/50 rounded-2xl rounded-tl-none p-3 shadow-xs flex items-center gap-2">
              <span className="font-medium text-natural-sage">Ganit Mitra is writing steps...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested CBSE prompts for shortcut query */}
      <div className="px-4 py-2 bg-natural-beige-light/40 border-t border-natural-beige-dark overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
        {suggestionPills.map((pill, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(pill.query)}
            disabled={isLoading}
            className="px-2.5 py-1 text-[11px] font-semibold text-natural-terracotta bg-natural-cream hover:bg-natural-cream/80 border border-natural-terracotta/20 hover:border-natural-terracotta/40 rounded-full cursor-pointer transition whitespace-nowrap disabled:opacity-50"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="p-3 bg-white border-t border-natural-beige-dark flex gap-2 items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={currentChapterId ? `Ask about Chapter: ${currentChapterId}...` : "Ask a CBSE Grade 6 math question..."}
          className="flex-1 bg-natural-beige-light/50 border border-natural-beige-dark/60 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-natural-primary focus:bg-white text-natural-dark"
          disabled={isLoading}
          id="input_chat_box"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="p-2 bg-natural-primary hover:bg-natural-primary/90 disabled:bg-natural-beige-light disabled:text-natural-sage text-white rounded-xl shadow-sm cursor-pointer transition duration-150 flex items-center justify-center shrink-0"
          id="btn_send_chat"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}

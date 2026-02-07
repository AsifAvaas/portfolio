import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Asif's AI Assistant. Ask me about his **projects**, **skills**, or **experience**!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-[rgb(10,35,56)] text-white border border-blue-500/30 rounded-full shadow-[0_0_15px_rgba(10,35,56,0.5)] hover:bg-blue-900 transition-all z-50 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <FaRobot size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[550px] bg-[rgb(4,8,26)] text-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-[rgb(10,35,56)] font-sans"
          >
            {/* Header */}
            <div className="bg-[rgb(10,35,56)] p-4 border-b border-white/10 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                  <FaRobot size={20} className="text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Asif's Assistant
                  </h3>
                  <span className="text-xs text-blue-200 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors text-gray-300 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[rgb(10,35,56)] scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none" // User stays Blue for contrast
                        : "bg-[rgb(10,35,56)] text-gray-100 border border-white/5 rounded-bl-none" // Bot uses Secondary Color
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 mb-2 space-y-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4 mb-2 space-y-1">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => <li>{children}</li>,
                        strong: ({ children }) => (
                          <span className="font-bold text-blue-300">
                            {children}
                          </span>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline hover:text-blue-300"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[rgb(10,35,56)] border border-white/5 p-4 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={sendMessage}
              className="p-3 bg-[rgb(4,8,26)] border-t border-[rgb(10,35,56)] flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects..."
                className="flex-1 p-3 bg-[rgb(10,35,56)] text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-gray-400 text-sm transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md transform active:scale-95"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

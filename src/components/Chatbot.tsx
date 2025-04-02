import { useState, useEffect, useRef } from "react";
import { Loader2, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbotStore } from "../stores/chatStore";

const Chatbot = () => {
  const { chatbotHandler } = useChatbotStore();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      await chatbotHandler(input);

      const answer = useChatbotStore.getState().answer;
      const botMessage = { sender: "bot", text: answer || "No response." };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError("Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-lg rounded-xl w-80 md:w-96 border border-gray-300"
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <X
              className="cursor-pointer text-gray-500 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="p-4 h-72 overflow-y-auto">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 text-black"
                  } max-w-[75%]`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="flex justify-center items-center my-3">
                <Loader2 className="animate-spin" />
                <span className="ml-2">Typing...</span>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm my-2">⚠️ {error}</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center border-t p-3">
            <input
              type="text"
              className="flex-grow border rounded-l-lg p-2 outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition"
          onClick={() => setIsOpen(true)}
        >
          💬
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;

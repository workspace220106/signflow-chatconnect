import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedPage from "@/components/AnimatedPage";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm your ASL learning assistant. Ask me anything about sign language! 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const msg = input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      // Demo fallback
      const responses = [
        "ASL uses hand shapes, movements, and facial expressions to communicate!",
        "The ASL alphabet has 26 signs, one for each letter.",
        "Practice fingerspelling daily to improve your ASL skills!",
        "ASL is the 3rd most used language in the United States.",
        "Facial expressions are grammar in ASL — they change meaning!",
      ];
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: responses[Math.floor(Math.random() * responses.length)] },
        ]);
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold mb-3">Chat Assistant</h1>
          <p className="text-muted-foreground">Ask questions about ASL and get instant answers.</p>
        </div>

        <div className="glass-card p-0 overflow-hidden flex flex-col" style={{ height: "500px" }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      m.role === "bot" ? "bg-primary/10" : "bg-accent/10"
                    }`}
                  >
                    {m.role === "bot" ? (
                      <Bot className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-accent" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                      m.role === "bot"
                        ? "bg-muted text-foreground rounded-bl-md"
                        : "bg-primary text-primary-foreground rounded-br-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <motion.div className="flex gap-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                    <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                  </motion.div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl"
            />
            <Button onClick={send} disabled={loading || !input.trim()} size="icon" className="rounded-xl shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Chat;

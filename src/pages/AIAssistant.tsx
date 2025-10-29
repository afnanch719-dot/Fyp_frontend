import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, BookOpen, Info, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI reading assistant. I can help you understand difficult terms, provide context about characters and events, summarize chapters, or answer any questions about your books. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "This is a simulated response. In the actual implementation, this would be connected to your AI backend to provide real-time, context-aware answers about your books.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Reading Assistant</h1>
            <p className="text-muted-foreground">
              Get instant answers and insights about your books
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Conversation</CardTitle>
            <Badge variant="secondary" className="gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed">
                      {message.content}
                    </p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-pulse delay-75" />
                      <div className="w-2 h-2 rounded-full bg-foreground/40 animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask anything about your book..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 h-12 text-base"
                aria-label="Message input"
              />
              <Button
                onClick={handleSend}
                className="btn-accessible"
                size="lg"
                disabled={!input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send or click the button
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Context Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Reading Context</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Current Book</p>
              <p className="font-semibold">The Great Gatsby</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Chapter</p>
              <p className="font-semibold">Chapter 3</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Page</p>
              <p className="font-semibold">45 of 180</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Language</p>
              <p className="font-semibold">English</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;

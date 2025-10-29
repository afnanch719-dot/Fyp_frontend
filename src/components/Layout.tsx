import { Mic, Moon, Sun, Menu, Home, Library, BookOpen, MessageSquare, ClipboardList, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isDark, setIsDark] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/library", label: "Library", icon: Library },
    { href: "/reader", label: "Reader", icon: BookOpen },
    { href: "/ai-assistant", label: "AI Assistant", icon: MessageSquare },
    { href: "/quiz", label: "Quiz", icon: ClipboardList },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Header - Logo and Controls */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ZEHNOVA
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {/* Voice Control Indicator */}
            <Button
              variant="outline"
              size="icon"
              className={`btn-accessible ${voiceActive ? "voice-active border-primary" : ""}`}
              onClick={() => setVoiceActive(!voiceActive)}
              aria-label="Toggle voice control"
            >
              <Mic className={voiceActive ? "fill-primary" : ""} />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="btn-accessible"
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun /> : <Moon />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Voice Command Indicator */}
      {voiceActive && (
        <div className="fixed bottom-24 right-4 glass-effect p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;

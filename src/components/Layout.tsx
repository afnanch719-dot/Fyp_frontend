import { Mic, Moon, Sun, Menu } from "lucide-react";
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
    { href: "/", label: "Dashboard" },
    { href: "/library", label: "Library" },
    { href: "/reader", label: "Reader" },
    { href: "/ai-assistant", label: "AI Assistant" },
    { href: "/quiz", label: "Quiz" },
    { href: "/settings", label: "Settings" },
  ];

  const NavigationLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
            location.pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ZEHNOVA
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <NavigationLinks />
            </nav>
          </div>

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

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="btn-accessible">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col gap-4 mt-8">
                  <NavigationLinks />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Voice Command Indicator */}
      {voiceActive && (
        <div className="fixed bottom-4 right-4 glass-effect p-4 rounded-lg shadow-lg z-50">
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

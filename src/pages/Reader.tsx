import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Bookmark,
  MessageSquare,
  Hand,
  Eye,
  Moon,
  Sun,
  Type,
  Minus,
  Plus,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const Reader = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [wordSpacing, setWordSpacing] = useState(0.25);
  const [readingProgress, setReadingProgress] = useState(35);
  const [volume, setVolume] = useState([70]);
  const [gestureMode, setGestureMode] = useState(false);

  const bookContent = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    chapter: "Chapter 3",
    currentPage: 45,
    totalPages: 180,
    text: `In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing anyone," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.`,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{bookContent.title}</h1>
          <p className="text-muted-foreground">{bookContent.author}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/ai-assistant")}
            aria-label="AI Assistant"
            title="Ask AI Assistant"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/quiz")}
            aria-label="Take Quiz"
            title="Take Quiz"
          >
            <ClipboardList className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="btn-accessible">
            <Bookmark className="mr-2 h-5 w-5" />
            Bookmark
          </Button>
        </div>
      </div>

      {/* Reading Controls */}
      <Card className="glass-effect">
        <CardContent className="p-4 space-y-4">
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              aria-label="Previous chapter"
            >
              <SkipBack />
            </Button>
            <Button
              size="icon"
              className="h-16 w-16"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              aria-label="Next chapter"
            >
              <SkipForward />
            </Button>
          </div>

          <Separator />

          {/* Reading Settings */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Volume */}
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
                aria-label="Volume control"
              />
              <span className="text-sm font-medium w-12 text-right">{volume}%</span>
            </div>

            {/* Font Size */}
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-muted-foreground" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                aria-label="Decrease font size"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-12 text-center">{fontSize}px</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                aria-label="Increase font size"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Word Spacing */}
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setWordSpacing(Math.max(0, wordSpacing - 0.1))}
                aria-label="Decrease word spacing"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-16 text-center">{wordSpacing.toFixed(2)}em</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setWordSpacing(Math.min(1, wordSpacing + 0.1))}
                aria-label="Increase word spacing"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Reading settings">
                    <Settings />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Reading Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Reading Speed</span>
                        <Badge>Normal</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Voice Type</span>
                        <Badge>Female</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Language</span>
                        <Badge>English</Badge>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant={gestureMode ? "default" : "outline"}
                size="icon"
                onClick={() => setGestureMode(!gestureMode)}
                aria-label="Toggle gesture control"
              >
                <Hand />
              </Button>

              <Button variant="outline" size="icon" aria-label="AI Assistant">
                <MessageSquare />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Content */}
      <Card className="min-h-[500px]">
        <CardContent className="p-8 md:p-12">
          <div className="space-y-6">
            {/* Chapter Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{bookContent.chapter}</span>
              <span>
                Page {bookContent.currentPage} of {bookContent.totalPages}
              </span>
            </div>

            {/* Text Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              style={{ 
                fontSize: `${fontSize}px`,
                wordSpacing: `${wordSpacing}em`,
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif'
              }}
            >
              {bookContent.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 pt-6">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Chapter Progress</span>
                <span>{readingProgress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="progress-bar"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gesture Mode Indicator */}
      {gestureMode && (
        <Card className="glass-effect border-primary">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Hand className="h-5 w-5 text-primary animate-pulse" />
              <div className="flex-1">
                <h4 className="font-semibold">Gesture Control Active</h4>
                <p className="text-sm text-muted-foreground">
                  Swipe left/right for pages, up/down for volume
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reader;

import { useState } from "react";
import {
  Globe,
  Volume2,
  Eye,
  Accessibility,
  Bell,
  Shield,
  User,
  Smartphone,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize your reading experience and preferences
          </p>
        </div>
        <Button 
          variant="outline"
          className="btn-accessible"
          onClick={() => setShowProfileEdit(!showProfileEdit)}
        >
          <Edit className="mr-2 h-5 w-5" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Settings */}
      {showProfileEdit && (
        <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" defaultValue="john@example.com" />
          </div>
          <Button className="btn-accessible">Save Changes</Button>
        </CardContent>
      </Card>
      )}

      {/* Accessibility Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Features
          </CardTitle>
          <CardDescription>
            Customize features for better accessibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="voice-nav">Voice Navigation</Label>
              <p className="text-sm text-muted-foreground">
                Control the app using voice commands
              </p>
            </div>
            <Switch id="voice-nav" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="gesture-control">Gesture Control</Label>
              <p className="text-sm text-muted-foreground">
                Use hand gestures for navigation
              </p>
            </div>
            <Switch id="gesture-control" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enhance visibility with higher contrast
              </p>
            </div>
            <Switch id="high-contrast" />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
              <p className="text-sm text-muted-foreground">
                Optimize interface for screen readers
              </p>
            </div>
            <Switch id="screen-reader" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Reading Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Reading Preferences
          </CardTitle>
          <CardDescription>Customize your reading experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Font Size</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Small</span>
              <Slider defaultValue={[18]} max={32} min={12} step={2} className="flex-1" />
              <span className="text-sm">Large</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="reading-speed">Reading Speed</Label>
            <Select defaultValue="normal">
              <SelectTrigger id="reading-speed">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
                <SelectItem value="very-fast">Very Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="line-height">Line Spacing</Label>
            <Select defaultValue="normal">
              <SelectTrigger id="line-height">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="relaxed">Relaxed</SelectItem>
                <SelectItem value="loose">Loose</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Audio & Voice Settings
          </CardTitle>
          <CardDescription>Configure text-to-speech and audio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="voice-type">Voice Type</Label>
            <Select defaultValue="female1">
              <SelectTrigger id="voice-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female1">Female Voice 1</SelectItem>
                <SelectItem value="female2">Female Voice 2</SelectItem>
                <SelectItem value="male1">Male Voice 1</SelectItem>
                <SelectItem value="male2">Male Voice 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label>Speech Volume</Label>
            <div className="flex items-center gap-4">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
              <span className="text-sm font-medium w-12 text-right">70%</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sentiment-adaptive">Sentiment-Adaptive Narration</Label>
              <p className="text-sm text-muted-foreground">
                Adjust narration based on your mood and engagement
              </p>
            </div>
            <Switch id="sentiment-adaptive" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Translation
          </CardTitle>
          <CardDescription>Configure language preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="app-language">App Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="app-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="reading-language">Default Reading Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="reading-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-translate">Auto-Translate Unknown Words</Label>
              <p className="text-sm text-muted-foreground">
                Automatically translate difficult terms
              </p>
            </div>
            <Switch id="auto-translate" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reading-reminders">Reading Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get daily reminders to continue reading
              </p>
            </div>
            <Switch id="reading-reminders" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="achievement-notifications">Achievement Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Celebrate your reading milestones
              </p>
            </div>
            <Switch id="achievement-notifications" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="quiz-notifications">Quiz Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about new quizzes
              </p>
            </div>
            <Switch id="quiz-notifications" />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Manage your privacy and data settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics">Usage Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help improve the app by sharing usage data
              </p>
            </div>
            <Switch id="analytics" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="camera-access">Camera Access</Label>
              <p className="text-sm text-muted-foreground">
                For gesture control and sentiment detection
              </p>
            </div>
            <Switch id="camera-access" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Button variant="destructive" className="btn-accessible">
              Clear All Data
            </Button>
            <p className="text-xs text-muted-foreground">
              This will remove all your reading progress, bookmarks, and settings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

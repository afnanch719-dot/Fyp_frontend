import { BookOpen, Brain, Trophy, Clock, TrendingUp, Mic, Hand, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Dashboard = () => {
  const stats = [
    {
      icon: BookOpen,
      title: "Books Read",
      value: "24",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
      title: "Reading Time",
      value: "48h 32m",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Trophy,
      title: "Quizzes Completed",
      value: "18",
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const weeklyReadingData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 4.1 },
    { day: "Fri", hours: 2.9 },
    { day: "Sat", hours: 5.3 },
    { day: "Sun", hours: 4.7 },
  ];

  const recentBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      progress: 75,
      coverColor: "from-blue-500 to-purple-600",
    },
    {
      title: "1984",
      author: "George Orwell",
      progress: 45,
      coverColor: "from-red-500 to-orange-600",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      progress: 90,
      coverColor: "from-green-500 to-teal-600",
    },
  ];

  const features = [
    {
      icon: Mic,
      title: "Voice Control",
      description: "Navigate hands-free with voice commands",
      status: "Active",
    },
    {
      icon: Hand,
      title: "Gesture Control",
      description: "Control reading with simple gestures",
      status: "Available",
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Ask questions and get instant answers",
      status: "Ready",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Welcome back!</h1>
        <p className="text-xl text-muted-foreground">
          Continue your reading journey with AI-powered assistance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-hover border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-xl ${stat.bgColor} border-2 border-border/50`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} strokeWidth={2.5} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">{stat.title}</p>
                <div className="text-4xl font-bold">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reading Activity Chart */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 border-2 border-border/50">
                  <BarChart3 className="h-7 w-7 text-primary" strokeWidth={2.5} />
                </div>
                Weekly Reading Activity
              </CardTitle>
              <CardDescription className="mt-2">Hours spent reading this week</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyReadingData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="day" 
                className="text-sm"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-sm"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '2px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  fontWeight: 600
                }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="hours" 
                fill="hsl(var(--primary))" 
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Continue Reading */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 border-2 border-border/50">
              <BookOpen className="h-7 w-7 text-primary" strokeWidth={2.5} />
            </div>
            Continue Reading
          </CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recentBooks.map((book) => (
              <Link
                key={book.title}
                to="/reader"
                className="group cursor-pointer"
              >
                <Card className="card-hover glass-effect">
                  <div className={`h-40 bg-gradient-to-br ${book.coverColor} rounded-t-lg`} />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 border-2 border-border/50">
              <Brain className="h-7 w-7 text-primary" strokeWidth={2.5} />
            </div>
            Accessibility Features
          </CardTitle>
          <CardDescription>Your personalized reading experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-5 rounded-xl border-2 bg-card hover:bg-muted/50 transition-all hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-primary/10 border-2 border-border/50">
                  <feature.icon className="h-7 w-7 text-primary" strokeWidth={2.5} />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-bold text-lg">{feature.title}</h4>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-success/10 text-success border border-success/20">
                    {feature.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link to="/library">
          <Card className="card-hover cursor-pointer border-2 group">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-4 text-xl">
                <div className="p-3 rounded-xl bg-primary/10 border-2 border-border/50 group-hover:border-primary transition-colors">
                  <BookOpen className="h-7 w-7 text-primary" strokeWidth={2.5} />
                </div>
                Browse Library
              </CardTitle>
              <CardDescription className="mt-2">Explore your collection of books</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/ai-assistant">
          <Card className="card-hover cursor-pointer border-2 group">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-4 text-xl">
                <div className="p-3 rounded-xl bg-primary/10 border-2 border-border/50 group-hover:border-primary transition-colors">
                  <Brain className="h-7 w-7 text-primary" strokeWidth={2.5} />
                </div>
                Ask AI Assistant
              </CardTitle>
              <CardDescription className="mt-2">Get help with your reading</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

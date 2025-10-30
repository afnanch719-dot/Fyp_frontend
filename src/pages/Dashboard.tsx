import { BookOpen, Brain, Trophy, Clock, TrendingUp, Mic, Hand } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      icon: BookOpen,
      title: "Books Read",
      value: "24",
      change: "+3 this month",
      color: "text-primary",
    },
    {
      icon: Clock,
      title: "Reading Time",
      value: "48h 32m",
      change: "+5h this week",
      color: "text-accent",
    },
    {
      icon: Trophy,
      title: "Quizzes Completed",
      value: "18",
      change: "92% accuracy",
      color: "text-destructive",
    },
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Reading */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Continue Reading</CardTitle>
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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Accessibility Features</CardTitle>
          <CardDescription>Your personalized reading experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold">{feature.title}</h4>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    {feature.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/library">
          <Card className="card-hover cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Browse Library
              </CardTitle>
              <CardDescription>Explore your collection of books</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/ai-assistant">
          <Card className="card-hover cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Ask AI Assistant
              </CardTitle>
              <CardDescription>Get help with your reading</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

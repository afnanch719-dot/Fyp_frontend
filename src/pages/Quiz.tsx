import { useState } from "react";
import { Trophy, Brain, CheckCircle2, XCircle, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the name of Nick Carraway's neighbor in The Great Gatsby?",
      options: ["Tom Buchanan", "Jay Gatsby", "George Wilson", "Jordan Baker"],
      correctAnswer: 1,
      explanation: "Jay Gatsby lives next door to Nick Carraway in West Egg, throwing lavish parties every weekend.",
    },
    {
      id: 2,
      question: "What color is the light at the end of Daisy's dock?",
      options: ["Red", "Green", "Yellow", "Blue"],
      correctAnswer: 1,
      explanation: "The green light at the end of Daisy's dock symbolizes Gatsby's hopes and dreams for the future.",
    },
    {
      id: 3,
      question: "Where does Tom Buchanan take Nick on their first outing together?",
      options: ["A speakeasy", "West Egg", "The Valley of Ashes", "Long Island"],
      correctAnswer: 2,
      explanation: "Tom takes Nick to the Valley of Ashes, where they stop at George Wilson's garage.",
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Trophy className="h-16 w-16 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            <CardDescription className="text-lg">
              Great job on completing the quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-muted-foreground">
                {percentage}% Correct
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </CardContent>
              </Card>
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                  <div className="text-2xl font-bold">{questions.length - score}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 btn-accessible" size="lg" onClick={handleRestart}>
                <RotateCcw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              <Button
                variant="outline"
                className="flex-1 btn-accessible"
                size="lg"
                onClick={() => window.location.href = '/dashboard'}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interactive Quiz</h1>
          <p className="text-muted-foreground">Test your understanding of the book</p>
        </div>
        <Badge variant="secondary" className="text-lg py-2 px-4">
          <Brain className="mr-2 h-5 w-5" />
          Score: {score}
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl leading-relaxed">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    showResult
                      ? index === questions[currentQuestion].correctAnswer
                        ? "border-success bg-success/10"
                        : selectedAnswer === index
                        ? "border-destructive bg-destructive/10"
                        : "border-border"
                      : selectedAnswer === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${!showResult ? "cursor-pointer" : ""}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    disabled={showResult}
                    className="min-w-[20px]"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 text-base cursor-pointer"
                  >
                    {option}
                  </Label>
                  {showResult && index === questions[currentQuestion].correctAnswer && (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  )}
                  {showResult && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                    <XCircle className="h-6 w-6 text-destructive" />
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>

          {showResult && (
            <Card className="glass-effect border-primary/50">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Explanation</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            {!showResult ? (
              <Button
                className="flex-1 btn-accessible"
                size="lg"
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                className="flex-1 btn-accessible"
                size="lg"
                onClick={handleNext}
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;

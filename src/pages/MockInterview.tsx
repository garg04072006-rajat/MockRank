import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Volume2, 
  Clock,
  Brain,
  BarChart3,
  MessageSquare,
  Pause,
  Play,
  Square
} from "lucide-react";

type InterviewPhase = 'type-selection' | 'active' | 'completed';
type InterviewType = 'placement' | 'government' | 'technical' | 'behavioral';

const MockInterview = () => {
  const [phase, setPhase] = useState<InterviewPhase>('type-selection');
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState<InterviewType>('placement');
  const [isRecording, setIsRecording] = useState(false);

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(72);
  const [currentQuestion, setCurrentQuestion] = useState(1);


  
  const interviewTypes = {
    'placement': {
      title: 'Placement Interview',
      subtitle: 'Job & Internship Preparation',
      description: 'Practice for corporate job interviews, technical rounds, and HR discussions',
      icon: '💼',
      color: 'bg-blue-500',
      questions: ['Tell me about yourself', 'Why should we hire you?', 'What are your strengths?']
    },
    'government': {
      title: 'Government Jobs',
      subtitle: 'IAS, IPS, SSC & Bank Exams',
      description: 'Prepare for government sector interviews, ethics, and current affairs',
      icon: '🏛️',
      color: 'bg-green-500',
      questions: ['Discuss current economic policies', 'What is your view on governance?', 'Handle ethical dilemmas']
    },
    'technical': {
      title: 'Technical Interview',
      subtitle: 'Coding & Problem Solving',
      description: 'Focus on programming, algorithms, system design, and technical concepts',
      icon: '💻',
      color: 'bg-purple-500',
      questions: ['Explain data structures', 'Solve coding problems', 'Design systems']
    },
    'behavioral': {
      title: 'Behavioral Interview',
      subtitle: 'Personality & Soft Skills',
      description: 'Work on communication, leadership, teamwork, and situational responses',
      icon: '🤝',
      color: 'bg-orange-500',
      questions: ['Describe teamwork experience', 'Handle difficult situations', 'Leadership examples']
    }
    ,
    'hr': {
      title: 'HR Interview',
      subtitle: 'Culture & Fit',
      description: 'Questions about fit, policies, career goals, and communication skills',
      icon: '🧑‍💼',
      color: 'bg-indigo-500',
      questions: ['Tell me about a time you resolved conflict', 'Why do you want to join this company?', 'Describe your ideal manager']
    }
  };

  const questions = [
    // Basic Interview Questions (1-4)
    "Tell me about yourself and your background.",
    "What are your greatest strengths and weaknesses?",
    "Why are you interested in this field/position?",
    "Where do you see yourself in the next 5 years?",
    
    // Study/Academic Related Questions (5-7)
    "Describe your academic projects and their real-world applications.",
    "How do you stay updated with the latest developments in your field?",
    "What was the most challenging subject you studied and how did you overcome it?",
    
    // Placement/Technical Questions (8-10)
    "Describe a problem you solved using your technical skills.",
    "How do you handle pressure and tight deadlines in work situations?",
    "Why should we hire you over other candidates?",
    
    // Professional/Advanced Questions (11-12)
    "Describe a time when you had to work with a difficult team member.",
    "How do you prioritize multiple tasks and manage your time effectively?"
  ];

  useEffect(() => {
    // If navigated here with state from StartInterview, start active phase immediately
    const navState = (location && (location as any).state) || null;
    if (navState && navState.selectedType) {
      // map selectedType to interviewTypes key
      if (navState.selectedType in interviewTypes) {
        setSelectedType(navState.selectedType as InterviewType);
      }
      // set defaults from nav state if provided
      if (navState.duration) {
        // optionally handle duration
      }
      setPhase('active');
      setIsRecording(true);
      return;
    }
    let interval: NodeJS.Timeout;
    if (phase === 'active' && isRecording) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        // Simulate confidence fluctuation
        setConfidenceLevel(prev => {
          const change = (Math.random() - 0.5) * 10;
          return Math.max(40, Math.min(95, prev + change));
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startInterview = () => {
    setPhase('active');
    setIsRecording(true);
  };

  const endInterview = () => {
    setPhase('completed');
    setIsRecording(false);
  };

  if (phase === 'type-selection') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="relative text-center space-y-4">
              {/* Back Button for Setup Page */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1 z-10"
                onClick={() => navigate(-1)}
                aria-label="Back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </Button>
              
              {/* MockRank Logo */}
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold text-foreground">MockRank</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Choose Interview Type</h1>
              <p className="text-muted-foreground">Select the type of interview you want to practice</p>
            </div>

            {/* Interview Type Selection */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Select Interview Type</span>
                </CardTitle>
                <CardDescription>
                  Choose the type of interview practice you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(interviewTypes).map(([key, type]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-smooth ${
                        selectedType === key 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-medium'
                      }`}
                      onClick={() => setSelectedType(key as InterviewType)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 flex items-center justify-center text-2xl bg-muted rounded-lg">
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{type.title}</h3>
                            <p className="text-sm text-muted-foreground">{type.subtitle}</p>
                          </div>
                          {selectedType === key && (
                            <Badge className="gradient-primary text-white border-0">Selected</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                        <div className="text-xs text-muted-foreground">
                          <strong>Sample Questions:</strong>
                          <ul className="mt-1 space-y-1">
                            {type.questions.map((question, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span>•</span>
                                <span>{question}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Instructions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Interview Instructions</CardTitle>
                <CardDescription>Important guidelines for your practice session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">During the Interview:</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>Speak clearly and at a moderate pace</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>Take your time to think before answering</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>Use the STAR method for behavioral questions</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>Ask clarifying questions if needed</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Best Practices:</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">💡</span>
                          <span>Maintain good posture and eye contact</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">💡</span>
                          <span>Prepare examples from your experience</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">💡</span>
                          <span>Stay calm and confident</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">💡</span>
                          <span>End with thoughtful questions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={startInterview}
                className="gradient-primary text-white border-0 hover:shadow-glow transition-smooth"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Mock Interview
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                The interview will last approximately 30-45 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'active') {
    const selectedTypeData = interviewTypes[selectedType];
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header with Controls - sticky on top to prevent mobile layout shift */}
        <div className="bg-card border-b border-border p-4 sticky top-0 z-20">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* MockRank Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 gradient-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-lg font-bold text-foreground">MockRank</span>
              </div>
              
              <Badge className="gradient-primary text-white border-0">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeElapsed)}
              </Badge>
              <Badge variant="secondary">
                Question {currentQuestion} of {questions.length}
              </Badge>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="destructive" onClick={endInterview}>
                <Square className="w-4 h-4 mr-2" />
                End Interview
              </Button>
            </div>
          </div>
        </div>

        {/* Main content - add bottom padding so fixed mobile button doesn't cover content */}
  <div className="container mx-auto p-4 pb-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Interview Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Interview Type Header */}
              <Card className="shadow-soft">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{selectedTypeData.icon}</div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedTypeData.title}</h2>
                      <p className="text-white/80">{selectedTypeData.subtitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Question */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Current Question</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed">{questions[currentQuestion - 1]}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      disabled={currentQuestion === 1}
                      onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
                    >
                      Previous
                    </Button>
                    <Button 
                      disabled={currentQuestion === questions.length}
                      onClick={() => setCurrentQuestion(prev => Math.min(questions.length, prev + 1))}
                    >
                      Next Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Real-time Analytics */}
            <div className="space-y-6">


              {/* Real-time Confidence Meter */}
              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <BarChart3 className="h-5 w-5" />
                    <span>Confidence Meter</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                      {Math.round(confidenceLevel)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Current Level</p>
                  </div>
                  
                  <Progress value={confidenceLevel} className="h-3" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Voice Tone</span>
                      <span className="text-muted-foreground">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Speech Pace</span>
                      <span className="text-muted-foreground">Optimal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eye Contact</span>
                      <span className="text-muted-foreground">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live Tips */}
              <Card className="shadow-soft border-accent/20 bg-accent/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-accent">Live Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-accent">💡 Try to maintain eye contact with the camera</p>
                    <p className="text-muted-foreground">• Speak clearly and at a moderate pace</p>
                    <p className="text-muted-foreground">• Use specific examples in your answers</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Mobile-only in-page End Interview button (scrolls with content) */}
        <div className="md:hidden text-center mt-6">
          <button onClick={endInterview} className="px-6 py-3 bg-destructive text-white rounded shadow-lg">
            End Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-strong">
        <CardHeader className="text-center">
          {/* MockRank Logo */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold text-foreground">MockRank</span>
          </div>
          
          <CardTitle className="text-2xl">Interview Completed!</CardTitle>
          <CardDescription>Great job! Here's your performance summary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">78%</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-accent">85%</div>
              <p className="text-sm text-muted-foreground">Confidence</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary">{formatTime(timeElapsed)}</div>
              <p className="text-sm text-muted-foreground">Duration</p>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <Button 
              size="lg" 
              className="gradient-primary text-white border-0"
              onClick={() => window.location.href = '/dashboard'}
            >
              View Detailed Report
            </Button>
            <Button variant="outline" onClick={() => setPhase('type-selection')}>
              Take Another Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockInterview;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  Settings,
  Clock,
  Brain,
  BarChart3,
  MessageSquare,
  Pause,
  Play,
  Square,
  Focus
} from "lucide-react";

type InterviewPhase = 'setup' | 'active' | 'completed';
type InterviewerPersona = 'hr-manager' | 'tech-lead' | 'startup-founder' | 'ias-officer';

const MockInterview = () => {
  const [phase, setPhase] = useState<InterviewPhase>('setup');
  const [selectedPersona, setSelectedPersona] = useState<InterviewerPersona>('hr-manager');
  const [isRecording, setIsRecording] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true); // Camera is compulsory - always on
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(72);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [movementDetected, setMovementDetected] = useState(false);
  const [interviewFailed, setInterviewFailed] = useState(false);
  const [cameraFocus, setCameraFocus] = useState(50); // Focus level 0-100
  
  const personas = {
    'hr-manager': {
      name: 'Sarah Johnson',
      title: 'HR Manager at TechCorp',
      avatar: '/placeholder-avatar.jpg',
      description: 'Experienced in behavioral and cultural fit assessments'
    },
    'tech-lead': {
      name: 'Elon Musk',
      title: 'American Buisnessmen',
      avatar: '/placeholder-avatar.jpg',
      description: 'Focuses on technical skills and problem-solving'
    },
    'startup-founder': {
      name: 'Sunder Pichai',
      title: 'Google CEO',
      avatar: '/placeholder-avatar.jpg',
      description: 'Entrepreneur mindset with diverse questioning style'
    },
    'ias-officer': {
      name: 'Dr. Rajesh Kumar',
      title: 'Retired IAS Officer',
      avatar: '/placeholder-avatar.jpg',
      description: 'Expert in ethics, current affairs, and personality assessment'
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
    let interval: NodeJS.Timeout;
    if (phase === 'active' && isRecording && !interviewFailed) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        // Simulate confidence fluctuation
        setConfidenceLevel(prev => {
          const change = (Math.random() - 0.5) * 10;
          return Math.max(40, Math.min(95, prev + change));
        });
        
        // Simulate movement detection (20% chance every 5 seconds)
        if (timeElapsed > 0 && timeElapsed % 5 === 0 && Math.random() > 0.8) {
          setMovementDetected(true);
          setTimeout(() => {
            setInterviewFailed(true);
            setIsRecording(false);
          }, 2000);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, isRecording, interviewFailed, timeElapsed]);

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

  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold">Mock Interview Setup</h1>
              <p className="text-muted-foreground">Select your interviewer and get ready to practice</p>
            </div>

            {/* Persona Selection */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Choose Your Interviewer</span>
                </CardTitle>
                <CardDescription>
                  Different personas will ask different types of questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(personas).map(([key, persona]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-smooth ${
                        selectedPersona === key 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-medium'
                      }`}
                      onClick={() => setSelectedPersona(key as InterviewerPersona)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={persona.avatar} />
                            <AvatarFallback>{persona.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold">{persona.name}</h3>
                            <p className="text-sm text-muted-foreground">{persona.title}</p>
                          </div>
                          {selectedPersona === key && (
                            <Badge className="gradient-primary text-white border-0">Selected</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{persona.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Setup */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Camera & Microphone Check</CardTitle>
                <CardDescription>Make sure your devices are working properly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      {isVideoOn ? (
                        <div className="text-center">
                          <Video className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Camera Preview</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <VideoOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Camera Off</p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Button
                        variant="default"
                        size="icon"
                        disabled
                        className="opacity-50"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={isMicOn ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setIsMicOn(!isMicOn)}
                      >
                        {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Camera must remain on during interview
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Microphone Level</span>
                        <span className="text-sm text-muted-foreground">Good</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Internet Speed</span>
                        <span className="text-sm text-muted-foreground">Excellent</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <Focus className="w-4 h-4" />
                          Camera Focus
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {cameraFocus > 70 ? 'Sharp' : cameraFocus > 40 ? 'Good' : 'Needs Adjustment'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={cameraFocus} className="h-2 flex-1" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCameraFocus(Math.min(100, cameraFocus + 10))}
                        >
                          Focus
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-sm font-medium text-accent">All systems ready</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your setup looks good for the interview
                      </p>
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
    const selectedPersonaData = personas[selectedPersona];
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header with Controls */}
        <div className="bg-card border-b border-border p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className="gradient-primary text-white border-0">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeElapsed)}
              </Badge>
              <Badge variant="secondary">
                Question {currentQuestion} of {questions.length}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => setIsMicOn(!isMicOn)}>
                {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" disabled className="opacity-50">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="destructive" onClick={endInterview}>
                <Square className="w-4 h-4 mr-2" />
                End Interview
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Interview Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Interviewer Video */}
              <Card className="shadow-soft">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center relative overflow-hidden">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={selectedPersonaData.avatar} />
                      <AvatarFallback className="text-2xl">
                        {selectedPersonaData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedPersonaData.name}
                      </div>
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
              {/* Candidate Video */}
              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                    <div className="text-center">
                      <Video className="h-8 w-8 text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Your Camera (Always On)</p>
                    </div>
                    {movementDetected && (
                      <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
                        <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm font-medium">
                          Movement Detected!
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-strong">
        <CardHeader className="text-center">
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
            <Button variant="outline" onClick={() => setPhase('setup')}>
              Take Another Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockInterview;

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SettingsDialog from "@/components/SettingsDialog";
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Users, 
  Calendar,
  Star,
  Play,
  FileText,
  Settings,
  LogOut,
  Mic,
  BarChart3
} from "lucide-react";

const Dashboard = () => {
  const [selectedGoal, setSelectedGoal] = useState<'placement' | 'ias'>('placement');
  const { user } = useAuth();
  const [firstName, setFirstName] = useState<string>("");
  const fetched = useRef(false);

  useEffect(() => {
    if (user && !fetched.current) {
      fetched.current = true;
      supabase
        .from('profiles')
        .select('first_name')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.first_name) setFirstName(data.first_name);
        });
    }
  }, [user]);
  
  const stats = {
    totalInterviews: 12,
    averageScore: 78,
    confidenceLevel: 85,
    streak: 5,
    rank: 142,
    totalUsers: 10000
  };

  const recentInterviews = [
    { id: 1, type: 'Technical', score: 82, date: '2024-01-15', duration: '45 min' },
    { id: 2, type: 'HR Round', score: 75, date: '2024-01-12', duration: '30 min' },
    { id: 3, type: 'Behavioral', score: 88, date: '2024-01-10', duration: '35 min' }
  ];

  const achievements = [
    { id: 1, title: 'First Interview', description: 'Completed your first mock interview', earned: true },
    { id: 2, title: 'Confident Speaker', description: 'Achieved 80%+ confidence in 3 interviews', earned: true },
    { id: 3, title: 'Serious Candidate', description: 'Completed 10+ interviews', earned: true },
    { id: 4, title: 'Perfect Score', description: 'Score 95%+ in any interview', earned: false }
  ];

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-4 z-10"
                onClick={() => navigate("/")}
                aria-label="Back to Home"
              >
                {/* Simple left arrow icon using SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </Button>
              <div className="flex items-center space-x-2 ml-12">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold">MockRank</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SettingsDialog>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </SettingsDialog>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Welcome{firstName ? `, ${firstName}!` : "!"}</h1>
                  <p className="text-muted-foreground">Ready for your next mock interview?</p>
                </div>
                <Badge className="gradient-secondary text-white border-0">
                  🔥 {stats.streak} Day Streak
                </Badge>
              </div>
              
              {/* Goal Selection */}
              <div className="flex space-x-4">
                <Button
                  variant={selectedGoal === 'placement' ? 'default' : 'outline'}
                  onClick={() => setSelectedGoal('placement')}
                  className="flex items-center space-x-2"
                >
                  <Target className="h-4 w-4" />
                  <span>Placement</span>
                </Button>
                <Button
                  variant={selectedGoal === 'ias' ? 'default' : 'outline'}
                  onClick={() => setSelectedGoal('ias')}
                  className="flex items-center space-x-2"
                >
                  <Trophy className="h-4 w-4" />
                  <span>IAS Prep</span>
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-card text-card-foreground border-0 shadow-soft hover:shadow-medium transition-smooth cursor-pointer" onClick={() => window.location.href = '/interview'}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <CardTitle>Start Mock Interview</CardTitle>
                    <CardDescription>Begin a new AI-powered interview session</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="bg-card text-card-foreground border-0 shadow-soft hover:shadow-medium transition-smooth cursor-pointer">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div className="ml-4">
                    <CardTitle>Upload Resume</CardTitle>
                    <CardDescription>Update your profile for better questions</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Performance Overview */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Performance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-primary">{stats.averageScore}%</div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <Progress value={stats.averageScore} className="h-2" />
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-accent">{stats.confidenceLevel}%</div>
                    <p className="text-sm text-muted-foreground">Confidence Level</p>
                    <Progress value={stats.confidenceLevel} className="h-2" />
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-secondary">{stats.totalInterviews}</div>
                    <p className="text-sm text-muted-foreground">Completed Interviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Interviews */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Interviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Mic className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{interview.type}</p>
                          <p className="text-sm text-muted-foreground">{interview.date} • {interview.duration}</p>
                        </div>
                      </div>
                      <Badge variant={interview.score >= 80 ? 'default' : 'secondary'}>
                        {interview.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rank Card */}
            <Card className="gradient-primary text-white border-0 shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Your Rank</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">#{stats.rank}</div>
                  <p className="text-white/80">out of {stats.totalUsers.toLocaleString()} users</p>
                  <div className="flex items-center justify-center space-x-1 mt-4">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+12 this week</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.earned ? 'bg-accent/10 border border-accent/20' : 'bg-muted/30'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-accent text-white' : 'bg-muted'
                    }`}>
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Technical Interview</p>
                      <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Resume Review</p>
                      <p className="text-xs text-muted-foreground">4:00 PM - 4:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
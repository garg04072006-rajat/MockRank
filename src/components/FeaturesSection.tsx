import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Brain, 
  BarChart3, 
  Users, 
  FileText, 
  Shield, 
  Zap, 
  Award,
  MessageSquare,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Real-time Voice Analysis",
    description: "Advanced AI analyzes your speech patterns, tone, and confidence level during interviews.",
    badge: "AI-Powered"
  },
  {
    icon: Brain,
    title: "Smart Interview Personas",
    description: "Practice with different interviewer types - HR managers, tech leads, IAS officers, and more.",
    badge: "Personalized"
  },
  {
    icon: BarChart3,
    title: "Detailed Performance Analytics",
    description: "Get comprehensive reports on confidence, communication skills, and knowledge depth.",
    badge: "Insights"
  },
  {
    icon: Users,
    title: "Goal-Based Training",
    description: "Specialized preparation tracks for placement interviews and IAS examinations.",
    badge: "Targeted"
  },
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Upload your resume for AI-powered skill extraction and interview question prediction.",
    badge: "Smart"
  },
  {
    icon: Shield,
    title: "Document Verification",
    description: "Optional verification system to build trust and credibility in your profile.",
    badge: "Secure"
  },
  {
    icon: Award,
    title: "Gamification & Leaderboards",
    description: "Compete with peers, earn badges, and track your improvement streak.",
    badge: "Engaging"
  },
  {
    icon: MessageSquare,
    title: "Instant Feedback",
    description: "Receive actionable suggestions and improvement tips after each session.",
    badge: "Immediate"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge className="gradient-secondary text-white border-0">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            Everything You Need to{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered tools designed to transform your interview preparation 
            and boost your confidence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card text-card-foreground border-0 shadow-soft hover:shadow-medium transition-smooth group cursor-pointer"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center group-hover:shadow-glow transition-smooth">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
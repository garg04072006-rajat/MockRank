import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UserPlus, 
  Upload, 
  Target, 
  Users, 
  Mic, 
  BarChart3, 
  Trophy,
  Bell,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Verify",
    description: "Create your account with email or Google. Verify with OTP for security.",
    color: "text-blue-600"
  },
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your resume for AI-powered skill extraction and personalized questions.",
    color: "text-purple-600"
  },
  {
    icon: Target,
    title: "Select Your Goal",
    description: "Choose between Placement interviews or IAS examination preparation.",
    color: "text-green-600"
  },
  {
    icon: Users,
    title: "Pick Interview Persona",
    description: "Select from HR managers, tech leads, startup founders, or IAS officers.",
    color: "text-orange-600"
  },
  {
    icon: Mic,
    title: "Start Mock Interview",
    description: "Begin your AI-powered interview with real-time confidence tracking.",
    color: "text-red-600"
  },
  {
    icon: BarChart3,
    title: "Get Detailed Feedback",
    description: "Receive comprehensive analysis of confidence, communication, and knowledge.",
    color: "text-indigo-600"
  },
  {
    icon: Trophy,
    title: "Gamification Rewards",
    description: "Earn badges, climb leaderboards, and maintain your improvement streak.",
    color: "text-pink-600"
  },
  {
    icon: Bell,
    title: "Progress Notifications",
    description: "Get personalized suggestions and notifications for continued improvement.",
    color: "text-teal-600"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge className="gradient-secondary text-white border-0">
            <ArrowRight className="w-4 h-4 mr-2" />
            Simple Process
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            How{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              MockRank
            </span>{" "}
            Works
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From registration to mastery - follow our streamlined 8-step process 
            to transform your interview skills.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="relative bg-card text-card-foreground border-0 shadow-soft hover:shadow-medium transition-smooth group"
            >
              <div className="absolute -top-3 -right-3 w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-medium">
                {index + 1}
              </div>
              
              <CardHeader className="space-y-4">
                <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-medium transition-smooth`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
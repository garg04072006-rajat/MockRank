import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, Target, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-interview.jpg";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="gradient-secondary text-white border-0">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Interview Coaching
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Master Your{" "}
                <span className="gradient-hero bg-clip-text text-transparent">
                  Interview Skills
                </span>{" "}
                with AI
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get personalized mock interviews for placements and IAS exams. 
                Receive real-time feedback on confidence, communication, and knowledge 
                to ace your next interview.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary text-white border-0 hover:shadow-glow transition-smooth" onClick={() => window.location.href = '/login'}>
                <Play className="w-5 h-5 mr-2" />
                Start Mock Interview
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-smooth">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Placement Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">IAS Preparation</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 gradient-hero rounded-3xl blur-3xl opacity-20"></div>
            <img 
              src={heroImage} 
              alt="AI-powered mock interview session showing confidence analysis and real-time feedback"
              className="relative w-full h-auto rounded-3xl shadow-strong"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 gradient-hero rounded-3xl"></div>
          <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-8 py-20 px-8">
            <Badge className="bg-white/20 text-white border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your Journey Today
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Ready to Ace Your Next Interview?
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of successful candidates who have transformed their careers 
              with AI-powered interview preparation. Your dream job is just one interview away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 border-0 shadow-strong hover:shadow-glow transition-smooth"
                onClick={() => window.location.href = '/login'}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 transition-smooth"
              >
                Schedule Demo
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
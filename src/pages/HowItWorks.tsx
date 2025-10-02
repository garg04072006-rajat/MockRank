import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HowItWorksSection from "@/components/HowItWorksSection";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="mr-2"
                onClick={() => navigate("/")}
                aria-label="Back to Home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold text-foreground">MockRank</span>
              </div>
            </div>
            
            {/* Right side intentionally empty - no login buttons */}
            <div></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HowItWorksSection />
      </main>
    </div>
  );
};

export default HowItWorks;
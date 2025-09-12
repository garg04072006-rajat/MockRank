import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect to get started",
      features: [
        "3 mock interviews per month",
        "Resume upload & analysis",
        "Basic feedback reports",
        "College leaderboard access",
        "Email support"
      ],
      icon: <Star className="w-5 h-5" />,
      popular: false,
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: "₹99",
      period: "per month",
      description: "For serious job seekers (or ₹999/year)",
      features: [
        "Unlimited mock interviews",
        "Advanced AI feedback",
        "All interviewer personas",
        "Detailed analytics dashboard",
        "Priority support",
        "Resume optimization tips"
      ],
      icon: <Zap className="w-5 h-5" />,
      popular: true,
      buttonText: "Start Pro Trial",
      buttonVariant: "gradient" as const
    },
    {
      name: "Premium",
      price: "₹199",
      period: "per month",
      description: "Maximum preparation power",
      features: [
        "Everything in Pro",
        "1-on-1 expert mentorship",
        "Custom interview scenarios",
        "Company-specific prep",
        "Interview scheduling assistance",
        "Career guidance sessions",
        "Career roadmap planning"
      ],
      icon: <Crown className="w-5 h-5" />,
      popular: false,
      buttonText: "Go Premium",
      buttonVariant: "gradient-secondary" as const
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your interview preparation journey. All plans include core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary shadow-glow bg-card/80' 
                  : 'border-border hover:border-primary/50 bg-card/50'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-foreground">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full"
                  onClick={() => window.location.href = '/login'}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include 7-day free trial • No setup fees • Cancel anytime
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-primary" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
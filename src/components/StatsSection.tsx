import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "10,000+",
    label: "Active Users",
    description: "Students trust our platform"
  },
  {
    icon: Award,
    number: "95%",
    label: "Success Rate",
    description: "Interview pass rate improvement"
  },
  {
    icon: Clock,
    number: "50,000+",
    label: "Mock Interviews",
    description: "Conducted successfully"
  },
  {
    icon: TrendingUp,
    number: "85%",
    label: "Confidence Boost",
    description: "Average improvement in confidence"
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge className="gradient-secondary text-white border-0">
            <TrendingUp className="w-4 h-4 mr-2" />
            Our Impact
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            Trusted by{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the growing community of successful candidates who have transformed 
            their interview skills with TalentTrac AI.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground text-center space-y-4 group p-8"
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-medium group-hover:shadow-glow transition-smooth">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
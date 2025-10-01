import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-foreground">MockRank</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Transforming interview preparation with AI-powered coaching for 
              placements and IAS examinations.
            </p>
            
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Product Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Product</h3>
            <div className="space-y-3">
              {[
                "Mock Interviews",
                "Resume Analysis",
                "Performance Analytics",
                "Interview Personas",
                "Leaderboards"
              ].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="block text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          {/* Preparation Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Preparation</h3>
            <div className="space-y-3">
              {[
                "Placement Interviews",
                "IAS Preparation",
                "Technical Interviews",
                "HR Interviews",
                "Confidence Building"
              ].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="block text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          {/* Support Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <div className="space-y-3">
              <a 
                href="#" 
                className="block text-muted-foreground hover:text-foreground transition-smooth"
              >
                Help & FAQ
              </a>
              <a 
                href="#" 
                className="block text-muted-foreground hover:text-foreground transition-smooth"
              >
                About
              </a>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">hello@mockrank.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2024 MockRank. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Privacy Policy
            </a>
            <span className="text-border">•</span>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
              Terms of Service
            </a>
            <span className="text-border">•</span>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import HelpFAQ from "@/components/HelpFAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
        <HelpFAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
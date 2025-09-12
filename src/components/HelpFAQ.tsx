import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";

const HelpFAQ = () => {
  const faqs = [
    {
      question: "How does the mock interview work?",
      answer: "Our AI-powered mock interview works like real interview conditions. You'll be asked questions by different interviewer personas, and your responses are analyzed in real-time for confidence, speech patterns, and content quality."
    },
    {
      question: "Can I practice unlimited interviews?",
      answer: "Free users get 3 mock interviews per month. Pro subscribers enjoy unlimited interviews with advanced analytics and feedback. Premium users get everything plus 1-on-1 mentorship."
    },
    {
      question: "What types of questions are asked?",
      answer: "Questions progress from basic (tell me about yourself) to academic (projects, studies) to professional (technical skills, leadership). We cover HR, technical, and behavioral interview types."
    },
    {
      question: "Is my camera required to be on?",
      answer: "Yes, the camera must remain on during interviews to simulate real conditions. Our system detects movement and maintains interview integrity. This helps build confidence for actual video interviews."
    },
    {
      question: "How is my performance scored?",
      answer: "We analyze multiple factors including confidence level, speech clarity, response relevance, eye contact, and overall presentation. You receive detailed feedback and improvement suggestions."
    },
    {
      question: "Can I upload my resume?",
      answer: "Yes! Upload your resume for personalized questions tailored to your background and career goals. This feature is available for all users including free plan."
    },
    {
      question: "What interview personas are available?",
      answer: "Choose from HR Manager (behavioral focus), Tech Lead (technical skills), Startup Founder (innovation mindset), or IAS Officer (ethics and current affairs) based on your career path."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime from your account settings. Your access continues until the current billing period ends. No cancellation fees or hidden charges."
    }
  ];

  return (
    <section id="help-faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Help & <span className="gradient-text">FAQ</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-6 w-6" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>
                  Everything you need to know about MockRank
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Still Need Help?</span>
                </CardTitle>
                <CardDescription>
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  support@mockrank.com
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 9876543210
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat Support
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft gradient-primary text-white">
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-white/90">
                <p className="text-sm">💡 Practice in a quiet, well-lit room</p>
                <p className="text-sm">🎯 Focus on the camera, not the screen</p>
                <p className="text-sm">🗣️ Speak clearly and at moderate pace</p>
                <p className="text-sm">💪 Use specific examples in answers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpFAQ;

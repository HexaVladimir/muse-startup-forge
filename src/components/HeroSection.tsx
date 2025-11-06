import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedCircles from "./AnimatedCircles";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-bg flex items-center justify-center overflow-hidden">
      <AnimatedCircles />
      
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your Next Big{" "}
            <span className="text-primary">Startup Idea</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto">
            AI-powered startup idea generator that turns your passions into real opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-transparent border-foreground/20 text-foreground hover:bg-foreground/10"
            >
              Try Demo User
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

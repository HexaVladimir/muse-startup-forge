import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Sparkles, Save, LogOut, Heart } from "lucide-react";
import AnimatedCircles from "@/components/AnimatedCircles";

const Dashboard = () => {
  const [startupName, setStartupName] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [generatedIdea, setGeneratedIdea] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Placeholder: Simulate AI generation
    setTimeout(() => {
      setGeneratedIdea({
        name: startupName || "EcoConnect",
        description: "A platform connecting eco-conscious consumers with sustainable local businesses, featuring carbon footprint tracking and green rewards programs.",
        targetAudience: "Environmentally conscious millennials and Gen Z consumers aged 25-40 who prioritize sustainability in their purchasing decisions.",
        monetization: "Commission-based model (15% from businesses) + Premium subscription tier ($9.99/month) offering exclusive deals and advanced analytics."
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handleSave = () => {
    // Placeholder for save functionality
    console.log("Saving idea:", generatedIdea);
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <AnimatedCircles />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Startup Idea Generator</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="/saved" className="text-foreground/80 hover:text-foreground transition-colors">
                Saved Ideas
              </a>
              <button className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Generate Your Next Big Idea <span className="inline-block animate-float">💡</span>
            </h1>
            <p className="text-lg text-foreground/80">
              Enter your interests and let AI create a unique startup concept for you
            </p>
          </div>

          {/* Input Card */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="startupName" className="block text-sm font-medium mb-2">
                  Startup Name (Optional)
                </label>
                <Input
                  id="startupName"
                  placeholder="Leave blank for AI to generate"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div>
                <label htmlFor="areaOfInterest" className="block text-sm font-medium mb-2">
                  Area of Interest <span className="text-primary">*</span>
                </label>
                <Input
                  id="areaOfInterest"
                  placeholder="e.g., Technology, Healthcare, Education, Finance..."
                  value={areaOfInterest}
                  onChange={(e) => setAreaOfInterest(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleGenerate}
                disabled={!areaOfInterest || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles />
                    Generate Idea
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results Card */}
          {generatedIdea ? (
            <div className="glass-card p-8 rounded-2xl animate-fade-in space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-primary">{generatedIdea.name}</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground/90">Description</h3>
                  <p className="text-foreground/80 leading-relaxed">{generatedIdea.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground/90">Target Audience</h3>
                  <p className="text-foreground/80 leading-relaxed">{generatedIdea.targetAudience}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground/90">Monetization Model</h3>
                  <p className="text-foreground/80 leading-relaxed">{generatedIdea.monetization}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full bg-transparent border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50"
                onClick={handleSave}
              >
                <Save className="mr-2" />
                Save Idea
              </Button>
            </div>
          ) : (
            <div className="glass-card p-12 rounded-2xl text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to Start?</h3>
              <p className="text-foreground/60">
                Enter your area of interest above to generate your first startup idea
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 relative z-10">
        <div className="container mx-auto">
          <div className="text-center text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Lovable by{" "}
              <span className="font-semibold text-foreground">HEXA</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

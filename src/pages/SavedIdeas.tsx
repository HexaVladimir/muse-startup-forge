import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lightbulb, LogOut, Heart } from "lucide-react";
import AnimatedCircles from "@/components/AnimatedCircles";
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";

interface IdeaData {
  name: string;
  description: string;
  targetAudience: string;
  monetization: string;
}

interface SavedIdea {
  id: string;
  startup_name: string;
  area_of_interest: string;
  idea_data: IdeaData;
  created_at: string;
}

const SavedIdeas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchSavedIdeas(session.user.id);
      }
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchSavedIdeas(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSavedIdeas = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_ideas')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSavedIdeas((data || []) as unknown as SavedIdea[]);
    } catch (error) {
      console.error('Error fetching saved ideas:', error);
      toast({
        title: "Error",
        description: "Failed to load saved ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    
    const metadata = user.user_metadata;
    const firstName = metadata?.first_name || "";
    const lastName = metadata?.last_name || "";
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    
    if (user.email) {
      const emailParts = user.email.split('@')[0].split('.');
      if (emailParts.length >= 2) {
        return `${emailParts[0].charAt(0)}${emailParts[1].charAt(0)}`.toUpperCase();
      }
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return "U";
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <AnimatedCircles />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Startup Idea Generator</span>
            </button>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate("/app")}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                Idea Generation
              </button>
              <button 
                onClick={handleLogout}
                className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
              <Avatar className="w-8 h-8 rounded-lg bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground rounded-lg font-semibold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
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
              Generated Ideas
            </h1>
            <p className="text-lg text-foreground/80">
              All your saved startup ideas in one place
            </p>
          </div>

          {/* Saved Ideas List */}
          {isLoading ? (
            <div className="glass-card p-12 rounded-2xl text-center">
              <p className="text-foreground/60">Loading your saved ideas...</p>
            </div>
          ) : savedIdeas.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Saved Ideas Yet</h3>
              <p className="text-foreground/60 mb-6">
                Start generating and saving ideas to see them here
              </p>
              <button
                onClick={() => navigate("/app")}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Generate Your First Idea →
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {savedIdeas.map((idea) => (
                <div key={idea.id} className="glass-card p-8 rounded-2xl animate-fade-in space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-primary mb-2">{idea.startup_name}</h2>
                      <p className="text-sm text-muted-foreground">
                        Area of Interest: <span className="text-foreground/80">{idea.area_of_interest}</span>
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(idea.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground/90">Description</h3>
                      <p className="text-foreground/80 leading-relaxed">{idea.idea_data.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground/90">Target Audience</h3>
                      <p className="text-foreground/80 leading-relaxed">{idea.idea_data.targetAudience}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground/90">Monetization Model</h3>
                      <p className="text-foreground/80 leading-relaxed">{idea.idea_data.monetization}</p>
                    </div>
                  </div>
                </div>
              ))}
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

export default SavedIdeas;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedCircles from "@/components/AnimatedCircles";
import Footer from "@/components/Footer";
import { Lightbulb, Upload } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - no backend logic yet
    console.log(isLogin ? "Login" : "Sign up", { email, password, firstName, lastName });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <AnimatedCircles />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/50 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">Startup Idea Generator</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="glass-card rounded-3xl p-8 shadow-2xl animate-fade-in">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? "Welcome Back" : "Get Started"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Sign in to continue generating ideas" 
                  : "Create your account to start"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  {/* Profile Picture Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="profile-picture">Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {profilePicture ? (
                          <img 
                            src={URL.createObjectURL(profilePicture)} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          id="profile-picture"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="text-sm text-primary hover:text-primary/80 transition-colors">
                          Choose file
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              {/* Forgot Password - Login Only */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                className="w-full mt-6 h-12 text-base font-semibold hover:scale-105 transition-transform"
              >
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </form>

            {/* Toggle Between Login/Signup */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Auth;

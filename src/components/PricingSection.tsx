import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleProTrial = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId: 'price_1RTkNaHcwwXEs0fuJUHz6uUV' }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "3 AI-generated ideas",
        "Basic idea details",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$10",
      period: "per month",
      features: [
        "Unlimited AI-generated ideas",
        "Advanced business models",
        "Save & organize ideas",
        "Priority support",
        "Export to PDF",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 gradient-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Start for free, upgrade when you're ready
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-2xl relative hover:scale-105 transition-all duration-300 animate-fade-in ${
                plan.popular ? "border-2 border-primary shadow-xl shadow-primary/20" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/ {plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                size="lg"
                onClick={plan.popular ? handleProTrial : () => navigate('/auth')}
                disabled={isLoading && plan.popular}
              >
                {isLoading && plan.popular ? "Loading..." : plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

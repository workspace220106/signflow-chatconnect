import { Camera, MessageCircle, Brain, Zap, Shield, Globe, Smartphone, BarChart3 } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import { StaggerContainer, FadeUpItem } from "@/components/AnimatedSection";

const features = [
  { icon: Camera, title: "Image Recognition", desc: "Upload hand sign photos for instant AI classification of ASL letters and gestures." },
  { icon: MessageCircle, title: "AI Chatbot", desc: "Interactive chatbot that answers your questions about sign language and helps you learn." },
  { icon: Brain, title: "Deep Learning", desc: "Built on convolutional neural networks trained on thousands of labeled ASL images." },
  { icon: Zap, title: "Real-time Speed", desc: "Get predictions in milliseconds — fast enough for real-time conversation support." },
  { icon: Shield, title: "Privacy First", desc: "Your images are processed securely and never stored without your permission." },
  { icon: Globe, title: "Accessible Design", desc: "Designed with accessibility in mind, usable by everyone regardless of ability." },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Fully responsive — use SignSpeak on your phone, tablet, or desktop." },
  { icon: BarChart3, title: "Confidence Scores", desc: "See detailed confidence breakdowns for each prediction to understand accuracy." },
];

const Features = () => {
  return (
    <AnimatedPage className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Features</h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Everything you need to recognize, learn, and communicate through American Sign Language.
          </p>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((f) => (
            <FadeUpItem key={f.title}>
              <div className="glass-card p-6 h-full group">
                <div className="rounded-xl bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <f.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </FadeUpItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedPage>
  );
};

export default Features;

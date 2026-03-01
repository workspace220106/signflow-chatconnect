import { Hand, Heart, Users, Target } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import { StaggerContainer, FadeUpItem } from "@/components/AnimatedSection";

const values = [
  { icon: Heart, title: "Inclusivity", desc: "We believe communication is a right, not a privilege." },
  { icon: Users, title: "Community", desc: "Built with the deaf and hard-of-hearing community in mind." },
  { icon: Target, title: "Accuracy", desc: "Constantly improving our AI models for better recognition." },
];

const About = () => {
  return (
    <AnimatedPage className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
            <Hand className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">About SignSpeak</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're building AI-powered tools to bridge the communication gap between sign language users and the hearing world.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-display font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            SignSpeak started as a college project with a simple question: what if AI could understand sign language as naturally as it understands speech? Today, we're turning that vision into reality.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Using deep learning and computer vision, our platform can recognize ASL letters and gestures from images, making it easier for people to learn, practice, and communicate through sign language.
          </p>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <FadeUpItem key={v.title}>
              <div className="glass-card p-6 text-center">
                <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </FadeUpItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedPage>
  );
};

export default About;

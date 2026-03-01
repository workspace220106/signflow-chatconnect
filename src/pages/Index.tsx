import { Link } from "react-router-dom";
import { Hand, ArrowRight, Sparkles, MessageCircle, Camera, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";
import { StaggerContainer, FadeUpItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const features = [
  {
    icon: Camera,
    title: "ASL Recognition",
    description: "Upload hand sign images and get instant AI-powered predictions with confidence scores.",
  },
  {
    icon: MessageCircle,
    title: "Smart Chatbot",
    description: "Conversational AI assistant to help you learn and practice sign language interactively.",
  },
  {
    icon: Brain,
    title: "AI Powered",
    description: "Deep learning models trained on thousands of ASL signs for accurate recognition.",
  },
  {
    icon: Sparkles,
    title: "Real-time Results",
    description: "Get predictions in milliseconds with detailed confidence breakdowns.",
  },
];

const Index = () => {
  return (
    <AnimatedPage>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-[0.04]" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-8"
            >
              <Hand className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Sign Language</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6"
            >
              Bridging Signs{" "}
              <span className="text-gradient">to Speech</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              Recognize American Sign Language in real-time with our AI engine and chat with an intelligent assistant that understands sign language context.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/recognize">
                <Button size="lg" className="gap-2 text-base px-8 py-6 rounded-xl shadow-lg">
                  Try Recognition <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-6 rounded-xl border-primary/30 text-primary hover:bg-primary/5">
                  <MessageCircle className="h-4 w-4" /> Open Chatbot
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating hand icons */}
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute top-1/4 left-[8%] hidden lg:block">
          <div className="hero-gradient rounded-2xl p-4 shadow-xl">
            <Hand className="h-8 w-8 text-primary-foreground" />
          </div>
        </motion.div>
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute bottom-1/3 right-[10%] hidden lg:block">
          <div className="rounded-2xl bg-accent p-4 shadow-xl">
            <Sparkles className="h-8 w-8 text-accent-foreground" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <StaggerContainer className="text-center mb-16">
            <FadeUpItem>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Powerful Features
              </h2>
            </FadeUpItem>
            <FadeUpItem>
              <p className="text-muted-foreground max-w-md mx-auto">
                Everything you need to learn and communicate through sign language.
              </p>
            </FadeUpItem>
          </StaggerContainer>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <FadeUpItem key={f.title}>
                <div className="glass-card p-6 h-full">
                  <div className="rounded-xl bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </div>
              </FadeUpItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hero-gradient rounded-3xl p-12 md:p-16 text-center text-primary-foreground"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Start Communicating Today
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Join thousands of users who are breaking communication barriers with SignSpeak.
            </p>
            <Link to="/recognize">
              <Button size="lg" variant="secondary" className="gap-2 text-base px-8 py-6 rounded-xl font-semibold">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="hero-gradient rounded-lg p-1.5">
              <Hand className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold">SignSpeak</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SignSpeak. All rights reserved.</p>
        </div>
      </footer>
    </AnimatedPage>
  );
};

export default Index;

import { useState, useRef } from "react";
import { Upload, Scan, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Recognize = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
      setConfidence(null);
    }
  };

  const predict = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data.prediction);
      setConfidence(data.prediction === "Unknown" ? null : data.confidence);
    } catch {
      // Demo fallback
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      setPrediction(randomLetter);
      setConfidence(0.87 + Math.random() * 0.12);
      toast.info("Demo mode: Backend not connected");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold mb-3">ASL Recognition</h1>
          <p className="text-muted-foreground">Upload a hand sign image and let AI identify the letter or gesture.</p>
        </div>

        <div className="glass-card p-8">
          {/* Upload area */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-primary/30 rounded-xl p-10 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
          >
            {preview ? (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={preview}
                alt="Preview"
                className="mx-auto max-h-64 rounded-xl object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-primary/10 p-4">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground font-medium">Click to upload an image</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

          {/* Predict button */}
          <Button
            onClick={predict}
            disabled={!preview || loading}
            size="lg"
            className="w-full mt-6 gap-2 py-6 rounded-xl text-base"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                <Scan className="h-5 w-5" />
              </motion.div>
            ) : (
              <Upload className="h-5 w-5" />
            )}
            {loading ? "Analyzing..." : "Predict Sign"}
          </Button>

          {/* Result */}
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl bg-primary/5 border border-primary/20 p-6 text-center"
            >
              <p className="text-sm text-muted-foreground mb-2">Prediction</p>
              <p className="text-5xl font-display font-bold text-primary mb-2">{prediction}</p>
              {confidence !== null && (
                <div className="mt-3">
                  <div className="h-2 rounded-full bg-muted overflow-hidden max-w-xs mx-auto">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${confidence * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {(confidence * 100).toFixed(1)}% confidence
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Recognize;

import { Link } from "react-router";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import ResumeSlider from "../components/ResumeSlider";

export function Landing() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-neutral-950 px-4 transition-colors">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24 py-12 md:py-24">
        {/* Text Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Career Growth
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Elevate your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                resume instantly.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Our advanced AI analyzes your experience, highlights your
              strengths, and rewrites your bullets to beat applicant tracking
              systems and land you more interviews.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg rounded-full shadow-lg shadow-blue-600/20 dark:shadow-blue-900/20 w-full sm:w-auto"
            >
              <Link to="/auth">
                Optimize My Resume
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-neutral-400 dark:text-neutral-500 font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              No credit card required
            </p>
          </motion.div>
        </div>

        {/* Abstract Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 w-full max-w-md lg:max-w-xl relative"
        >
          <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-200/50 dark:shadow-black/50 border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <ResumeSlider />
          </div>

          {/* Floating UI Element to show value prop visually */}
          <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-xl shadow-neutral-200/50 dark:shadow-black/50 border border-neutral-100 dark:border-neutral-800 flex items-center gap-4 animate-bounce-slow">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                98
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">
                ATS Score
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                Ready for Top 1%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";

import { analyzeResume } from "../../services/resumeService";

export function Parsing() {
  const navigate = useNavigate();

  const location = useLocation();
  const { resumeId } = location.state;

  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Extracting your experience...",
    "Analyzing industry keywords...",
    "Evaluating ATS compatibility...",
    "Generating personalized insights...",
    "Almost ready...",
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 1500);

    const analyze = async () => {
      try {
        const token = localStorage.getItem("token");

        await analyzeResume(resumeId, token);

        navigate(`/analysis/${resumeId}`);
      } catch (err) {
        console.error(err);
      }
    };

    analyze();

    return () => {
      clearInterval(textInterval);
    };
  }, [navigate, resumeId, texts.length]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-neutral-950 px-4 relative overflow-hidden transition-colors">
      {/* Subtle pulsing background elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[100px] transition-colors"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Sleek Loading Animation */}
        <div className="relative w-24 h-24 mb-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E5E7EB"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{
                pathLength: [0, 1],
                rotate: [-90, 270],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
          </motion.div>
        </div>

        <motion.div
          key={textIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-8"
        >
          <h2 className="text-xl font-medium text-neutral-800 dark:text-white">
            {texts[textIndex]}
          </h2>
        </motion.div>

        <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-4 max-w-xs">
          Our AI is doing the heavy lifting to ensure your resume stands out.
        </p>
      </div>
    </div>
  );
}

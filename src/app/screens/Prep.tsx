import { Link } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { UploadCloud, Zap, Target, ArrowRight } from "lucide-react";

export function Prep() {
  const steps = [
    {
      icon: UploadCloud,
      title: "1. Upload",
      description:
        "Securely upload your existing resume in PDF or DOCX format.",
    },
    {
      icon: Zap,
      title: "2. Analyze",
      description:
        "Our AI scans your experience against industry standards and ATS rules.",
    },
    {
      icon: Target,
      title: "3. Optimize",
      description: "Review tailored suggestions and apply them with one click.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-neutral-950 px-4 py-12 transition-colors">
      <div className="w-full max-w-3xl mx-auto space-y-16">
        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-block mb-6 text-blue-600">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.017 21L16.417 14.59C16.637 13.93 16.817 13.16 16.957 12.28C17.097 11.4 17.167 10.66 17.167 10.06V3H24.017V10.06C24.017 12.86 23.337 15.63 21.977 18.37C20.617 21.11 18.917 22.86 16.877 23.62L14.017 21ZM4.01697 21L6.41697 14.59C6.63697 13.93 6.81697 13.16 6.95697 12.28C7.09697 11.4 7.16697 10.66 7.16697 10.06V3H14.017V10.06C14.017 12.86 13.337 15.63 11.977 18.37C10.617 21.11 8.91697 22.86 6.87697 23.62L4.01697 21Z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-white italic leading-snug">
            "Your resume is the story of your potential.
            <br className="hidden md:block" /> Let's tell it perfectly."
          </h2>
        </motion.div>

        {/* Timeline Section */}
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 md:p-12 border border-neutral-100 dark:border-neutral-800 transition-colors">
          <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest text-center mb-10">
            What to expect
          </h3>

          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-0.5 bg-neutral-200 dark:bg-neutral-700" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="relative flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full border-4 border-neutral-50 dark:border-neutral-900 shadow-sm flex items-center justify-center z-10 relative transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-[200px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="h-14 px-10 text-lg rounded-full shadow-lg shadow-blue-600/20"
          >
            <Link to="/upload">
              Let's Go
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

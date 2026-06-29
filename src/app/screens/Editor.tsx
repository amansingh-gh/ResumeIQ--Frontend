import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Check, CheckCircle2, ChevronRight, X, Download } from "lucide-react";
import { getResumeById } from "../../services/resumeService";


export function Editor() {
  const [applied, setApplied] = useState<number[]>([]);
  const { resumeId } = useParams();

  const [resume, setResume] = useState<any>(null);

  const [analysis, setAnalysis] = useState<any>(null);

   useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await getResumeById(resumeId as string, token);

        setResume(data);
        setAnalysis(data.analysis);
      } catch (err) {
        console.error(err);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  const experiences = [
    {
      id: 1,
      role: "Software Engineer",
      company: "TechCorp",
      original:
        "Worked on the backend API to make it faster. Also helped with the database design and fixed a lot of bugs.",
      suggested:
        "Engineered high-performance RESTful APIs, reducing latency by 40%. Architected scalable database schemas and resolved 50+ critical production bugs.",
    },
    {
      id: 2,
      role: "Frontend Developer",
      company: "WebSolutions",
      original:
        "Made the website look better and work on mobile phones. Used React and CSS.",
      suggested:
        "Spearheaded mobile-first responsive redesign using React and Tailwind CSS, increasing user engagement by 25% and mobile conversion rate by 15%.",
    },
  ];

  const handleApply = (id: number) => {
    setApplied((prev) => [...prev, id]);
  };

  return (
    <div className="flex-1 flex flex-col bg-neutral-100">
      {/* Editor Toolbar */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-neutral-900">
            Review Suggestions
          </h1>
          <p className="text-sm text-neutral-500">
            2 sections require your attention
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full shadow-sm bg-white"
            asChild
          >
            <Link to="/analysis">Back to Dashboard</Link>
          </Button>
          <Button
            className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-sm"
            asChild
          >
            <Link to="/export">
              Finish & Export
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        <div className="space-y-8">
          {experiences.map((exp) => {
            const isApplied = applied.includes(exp.id);
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden"
              >
                <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-neutral-500">{exp.company}</p>
                  </div>
                  {isApplied && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Applied
                    </span>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row relative">
                  {/* Original Column */}
                  <div className="flex-1 p-6 lg:border-r border-neutral-200 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                        Original Text
                      </span>
                    </div>
                    <div className="relative">
                      <p
                        className={`text-sm leading-relaxed ${isApplied ? "text-neutral-400 line-through" : "text-neutral-700"}`}
                      >
                        {exp.original}
                      </p>
                    </div>
                  </div>

                  {/* VS Divider (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-neutral-200 rounded-full items-center justify-center shadow-sm z-10">
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </div>

                  {/* Suggested Column */}
                  <div
                    className={`flex-1 p-6 transition-colors duration-300 ${isApplied ? "bg-green-50/30" : "bg-blue-50/30"}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${isApplied ? "text-green-600" : "text-blue-600"}`}
                      >
                        AI Optimized
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-900 font-medium">
                      {/* Highlighted text effect */}
                      <span
                        className={isApplied ? "" : "bg-blue-100/50 rounded-sm"}
                      >
                        {exp.suggested}
                      </span>
                    </p>

                    {!isApplied && (
                      <div className="mt-6 flex justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full h-9 text-xs text-neutral-600 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full h-9 text-xs bg-green-600 hover:bg-green-700 shadow-md shadow-green-600/20"
                          onClick={() => handleApply(exp.id)}
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Apply Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

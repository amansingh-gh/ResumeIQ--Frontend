import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getResumeById } from "../../services/resumeService";

import {
  CheckCircle2,
  AlertTriangle,
  PenTool,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
// import ResumePreview from "../components/ResumePreview";

export function Analysis() {
  const { resumeId } = useParams();

  const [resume, setResume] = useState<any>(null);

  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await getResumeById(resumeId as string, token);

        console.log("Resume Data:", data);
        console.log("Analysis:", data.analysis);

        setResume(data);

        setAnalysis(data.analysis);
      } catch (error) {
        console.error("Fetch Resume Error:", error);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  if (!resume) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col bg-neutral-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Resume Preview */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">
              Resume Preview
            </h2>
            <span className="text-sm text-neutral-500 bg-white px-2.5 py-1 rounded-md border border-neutral-200">
              {resume?.originalFileName}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm overflow-hidden h-[600px]">
            {resume?.cloudinaryUrl ? (
              <iframe
                src={resume.cloudinaryUrl}
                title="Resume Preview"
                className="w-full h-full border-0"
              />
            ) : (
              <p className="text-center text-gray-500">
                Resume preview not available.
              </p>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">
              Resume Section Scores
            </h3>

            {Object.entries(analysis?.sectionScores || {}).map(
              ([section, score]: any) => (
                <div key={section} className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="capitalize font-medium">{section}</span>

                    <span>{score}%</span>
                  </div>

                  <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Missing Keywords</h3>

            <div className="flex flex-wrap gap-3">
              {analysis?.missingKeywords?.map(
                (keyword: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Analysis Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-neutral-900">
              Analysis Complete
            </h1>
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="rounded-full shadow-sm bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
              >
                <Link to={`/chat/${resumeId}`}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with AI
                </Link>
              </Button>
              {/* <Button
                asChild
                className="rounded-full shadow-sm bg-blue-600 hover:bg-blue-700"
              >
                <Link to="/editor">
                  <PenTool className="w-4 h-4 mr-2" />
                  Start Optimizing
                </Link>
              </Button> */}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* ATS Score Gauge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <h3 className="text-sm font-semibold text-neutral-500 absolute top-6 left-6">
                Overall ATS Score
              </h3>

              <div className="relative w-40 h-40 mt-8 mb-4">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#F3F4F6"
                    strokeWidth="8"
                    fill="none"
                  />

                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    animate={{
                      strokeDashoffset:
                        283 - 283 * ((analysis?.atsScore || 0) / 100),
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-neutral-900">
                    {analysis?.atsScore || 0}
                  </span>

                  <span className="text-xs text-neutral-400 font-medium">
                    / 100
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-600">
                {analysis?.summary || "Resume analysis completed"}
              </p>
            </motion.div>

            {/* Quick Actions / Summary */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm flex-1">
                <h3 className="text-sm font-semibold text-neutral-500 mb-4">
                  Keyword Match
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-neutral-700">
                        Hard Skills
                      </span>
                      <span className="text-neutral-500">
                        {analysis.keywordMatch?.hardSkills || 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${analysis.keywordMatch?.hardSkills || 0}%`,
                        }}
                        transition={{ duration: 1 }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-neutral-700">
                        Soft Skills
                      </span>
                      <span className="text-neutral-500">
                        {analysis.keywordMatch?.softSkills || 0}%
                      </span>
                    </div>

                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${analysis.keywordMatch?.softSkills || 0}%`,
                        }}
                        transition={{ duration: 1 }}
                        className="h-full bg-amber-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Recruiter Feedback
                </h3>

                <p className="text-neutral-600 leading-7">
                  {analysis?.recruiterFeedback || "No feedback available."}
                </p>
              </div>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="flex items-center text-base font-semibold text-neutral-900 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-3">
                {analysis?.strengths?.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-neutral-600 bg-green-50/50 p-3 rounded-xl border border-green-100/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="flex items-center text-base font-semibold text-neutral-900 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {analysis?.improvements?.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-neutral-600 bg-amber-50/50 p-3 rounded-xl border border-amber-100/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Suggested Job Roles
              </h3>

              <div className="flex flex-wrap gap-3">
                {analysis?.suggestedJobRoles?.map(
                  (role: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                    >
                      {role}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Strong Action Verbs
              </h3>

              <div className="flex flex-wrap gap-3">
                {analysis?.actionVerbsUsed?.map(
                  (verb: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium"
                    >
                      {verb}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

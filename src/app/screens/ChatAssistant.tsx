import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Send, Sparkles, ArrowLeft, PenTool, CheckCircle2 } from "lucide-react";
import { chatWithResume } from "../../services/chatService";
import { getResumeById } from "../../services/resumeService";

export function ChatAssistant() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm your AI career coach. I noticed your experience at TechCorp could use more quantifiable metrics. Want me to suggest some improvements?",
      type: "text",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { resumeId } = useParams();

  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await getResumeById(resumeId as string, token);

        console.log(data);

        setResume(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  const handleSend = async () => {
    console.log("Send button clicked");
    if (!question.trim()) return;

    try {
      setLoading(true);

      const userQuestion = question;

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: userQuestion,
          type: "text",
        },
      ]);

      setQuestion("");

      const token = localStorage.getItem("token");

      console.log("resumeId:", resumeId);
      console.log("Question:", userQuestion);
      console.log("Token:", token);

      const response = await chatWithResume(resumeId, userQuestion, token);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: response.answer,
          type: "text",
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex bg-neutral-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
        {/* Context / Preview Area */}
        <div className="hidden md:flex md:col-span-6 lg:col-span-5 bg-white rounded-3xl border border-neutral-200 shadow-sm flex-col overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">
                Resume Context
              </h3>
              <p className="text-xs text-neutral-500">
                Preview of your uploaded resume
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-9 rounded-full"
            >
              <Link to={`/analysis/${resumeId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Analysis
              </Link>
            </Button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            {resume?.cloudinaryUrl ? (
              <iframe
                src={`${resume.cloudinaryUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Resume Preview"
                className="w-full h-full border-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                Loading Resume...
              </div>
            )}
          </div>
        </div>

        {/* Chat UI */}
        <div className="md:col-span-6 lg:col-span-7 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
          {" "}
          <div className="p-4 border-b border-neutral-100 flex items-center gap-3 bg-white z-10 shadow-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200 shadow-sm relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHByb2Zlc3Npb25hbCUyMHJvYm90JTIwYXZhdGFyJTIwM2QlMjBpc29sYXRlZHxlbnwxfHx8fDE3ODIyMDYzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AI Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                Assist-AI <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              </h2>
              <p className="text-xs text-neutral-500">
                Real-time feedback & rewrites
              </p>
            </div>
            {/* <div className="ml-auto">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Link to="/editor">
                  <PenTool className="w-3.5 h-3.5 mr-1.5" /> Go to Editor
                </Link>
              </Button>
            </div> */}
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-50/50">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-5 py-3.5 rounded-2xl text-sm leading-7 whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-neutral-800 border border-neutral-200"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* {msg.type === "suggestion" && (
                      <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm shadow-blue-500/5">
                        <div className="p-4 border-b border-neutral-100 bg-blue-50/50">
                          <p className="text-sm text-neutral-800">{msg.text}</p>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/60 relative">
                            <div className="absolute top-0 right-0 bg-neutral-200 text-neutral-500 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl uppercase tracking-wider">
                              Original
                            </div>
                            <p className="text-sm text-neutral-500 line-through decoration-neutral-300 mt-2">
                              {msg.original}
                            </p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-xl border border-green-200 relative">
                            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-xl uppercase tracking-wider">
                              AI Suggestion
                            </div>
                            <p className="text-sm text-neutral-900 font-medium mt-2">
                              {msg.suggested}
                            </p>
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs rounded-full"
                            >
                              Dismiss
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 text-xs rounded-full bg-blue-600 hover:bg-blue-700"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                              Apply to Resume
                            </Button>
                          </div>
                        </div>
                      </div>
                    )} */}
                  {/* </div> */}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-neutral-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative flex items-center"
            >
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me to rewrite a bullet or suggest skills..."
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                disabled={!question.trim() || loading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

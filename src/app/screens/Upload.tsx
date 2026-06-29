import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { UploadCloud, File, AlertCircle } from "lucide-react";
import { uploadResume, analyzeResume } from "../../services/resumeService";

export function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate upload
    setTimeout(() => navigate("/parsing"), 500);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileSelect called");

    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const token = localStorage.getItem("token");

      // Step 1: Upload Resume
      const uploadResponse = await uploadResume(formData, token);

      navigate("/parsing", {
        state: {
          resumeId: uploadResponse.resumeId,
        },
      });

      // Step 2: Analyze Resume
      await analyzeResume(uploadResponse.resumeId, token);

      // Step 3: Navigate
      navigate(`/analysis/${uploadResponse.resumeId}`);
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">
            Upload your Resume
          </h1>
          <p className="text-neutral-500">
            We'll extract your experience and prepare it for AI analysis.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-colors bg-white
            ${isDragging ? "border-blue-500 bg-blue-50/50" : "border-neutral-300 hover:border-neutral-400"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center transition-colors
            ${isDragging ? "bg-blue-100" : "bg-neutral-100"}`}
          >
            <UploadCloud
              className={`w-10 h-10 ${isDragging ? "text-blue-600" : "text-neutral-400"}`}
            />
          </div>

          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            Drag & drop your file here
          </h3>
          <p className="text-neutral-500 mb-8 max-w-sm">
            Supported formats: PDF, DOCX. Maximum file size: 5MB.
          </p>

          <div className="relative">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
            />
            <Button size="lg" className="rounded-full px-8 pointer-events-none">
              Browse Files
            </Button>
          </div>
        </motion.div>

        <div className="mt-8 flex items-start gap-3 bg-blue-50/50 text-blue-800 p-4 rounded-xl border border-blue-100">
          <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm">
            <strong>Privacy Note:</strong> Your resume is encrypted and only
            used for this analysis session. We do not store your data
            permanently without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Download, Share2, CheckCircle, FileText, ArrowLeft } from "lucide-react";

export function ExportScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white px-4 relative overflow-hidden">
      
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-green-100/40 via-blue-100/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl shadow-neutral-200/50 border border-neutral-100 p-8 text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
              className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"
            />
            <CheckCircle className="w-12 h-12 text-green-600 relative z-10" />
          </div>

          <h2 className="text-3xl font-extrabold text-neutral-900 mb-4">
            You're All Set!
          </h2>
          <p className="text-neutral-500 mb-8 px-4">
            Your resume is now optimized for Applicant Tracking Systems and ready to impress recruiters.
          </p>

          <div className="bg-neutral-50 rounded-2xl p-4 mb-8 border border-neutral-100 flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-neutral-200 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-neutral-900 truncate">john_doe_resume_optimized.pdf</h4>
              <p className="text-xs text-neutral-500">Updated just now • 2.4 MB</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button size="lg" className="w-full h-14 text-base rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="lg" className="w-full h-14 text-base rounded-2xl border-neutral-200 hover:bg-neutral-50 text-neutral-700">
              <Share2 className="w-5 h-5 mr-2" />
              Copy Shareable Link
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-100">
            <Button variant="ghost" asChild className="text-neutral-500 hover:text-neutral-900">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

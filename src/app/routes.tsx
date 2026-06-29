import { createBrowserRouter, Outlet, Link, useLocation } from "react-router";
import { ThemeToggle } from "./components/ThemeToggle";
import { Landing } from "./screens/Landing";
import { Auth } from "./screens/Auth";
import { Prep } from "./screens/Prep";
import { Upload } from "./screens/Upload";
import { Parsing } from "./screens/Parsing";
import { Analysis } from "./screens/Analysis";
import { ChatAssistant } from "./screens/ChatAssistant";
import { Editor } from "./screens/Editor";
import { ExportScreen } from "./screens/ExportScreen";
import { cn } from "./components/ui/utils";
import { FileText } from "lucide-react";

function Root() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans flex flex-col transition-colors">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>ResumeAI</span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* User profile will come here */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "auth", Component: Auth },
      { path: "prep", Component: Prep },
      { path: "upload", Component: Upload },
      { path: "parsing", Component: Parsing },
      { path: "analysis/:resumeId", Component: Analysis },
      { path: "/chat/:resumeId", Component: ChatAssistant },
      { path: "editor", Component: Editor },
      { path: "export", Component: ExportScreen },
    ],
  },
]);

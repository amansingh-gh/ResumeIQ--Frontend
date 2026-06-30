import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove only if you store user info

    navigate("/");
  };
  return (
    <div className="flex items-center gap-3">

  <Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    className="rounded-full w-10 h-10 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
  >
    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  </Button>

  <Button
    onClick={handleLogout}
    variant="destructive"
    className="rounded-full px-5"
  >
    <LogOut className="w-4 h-4 mr-2" />
    Logout
  </Button>

</div>
  );
}

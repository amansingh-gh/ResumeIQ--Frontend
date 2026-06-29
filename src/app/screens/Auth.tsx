import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Mail, Lock, User, ArrowLeft, Github } from "lucide-react";
import { login, register } from "../../services/authService";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await login({
          email,
          password,
        });

        localStorage.setItem("token", response.user.accessToken);

        navigate("/prep");
      } else {
        const response = await register({
          username,
          email,
          password,
        });

        console.log(response);

        alert("Account created successfully");

        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 py-12 relative overflow-hidden transition-colors">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-[100px] opacity-60" />

      <div className="w-full max-w-md relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl shadow-neutral-200/50 dark:shadow-black/50 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
          {/* Toggle Header */}
          <div className="flex border-b border-neutral-100 dark:border-neutral-800">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${isLogin ? "text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"}`}
            >
              Sign In
              {isLogin && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${!isLogin ? "text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"}`}
            >
              Create Account
              {!isLogin && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {isLogin ? "Welcome back" : "Start optimizing"}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                {isLogin
                  ? "Enter your details to access your resumes."
                  : "Create an account to save your progress."}
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-medium"
                onClick={() => navigate("/prep")}
              >
                {/* SVG for Google Logo */}
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="relative flex items-center py-2 mb-8">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Or continue with email
              </span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name-input"
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="pl-10 h-12 rounded-xl"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 h-12 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <a
                      href="#"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl mt-6 text-base font-semibold shadow-md shadow-blue-600/10"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

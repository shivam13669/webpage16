import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", { signupEmail, signupPassword });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-white border-0 p-0 overflow-hidden shadow-2xl h-[650px]">
        <div className="flex h-full">
          {/* Left Side - Hero Image */}
          <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80"
              alt="Adventure experience"
              className="w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-between p-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Discover Your Next Adventure
                </h3>
                <p className="text-sm text-white/90">
                  Experience unforgettable moments with thousands of verified activities
                </p>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> 20,000+ verified activities
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> 1,500+ trusted suppliers
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Best price guarantee
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-3/5 overflow-y-auto flex flex-col bg-white">
            <Tabs defaultValue="login" className="w-full flex flex-col h-full">
              {/* Tab Headers */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                <TabsList className="w-full rounded-none bg-white p-0 h-auto flex justify-start">
                  <TabsTrigger
                    value="login"
                    className="flex-none px-8 py-4 rounded-none text-base text-gray-600 font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-4 data-[state=active]:border-orange-500 data-[state=active]:bg-white hover:text-gray-900"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="flex-none px-8 py-4 rounded-none text-base text-gray-600 font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-4 data-[state=active]:border-orange-500 data-[state=active]:bg-white hover:text-gray-900"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Login Tab */}
              <TabsContent value="login" className="mt-0 flex-1 overflow-y-auto">
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-gray-600">
                      Log in to your account and explore amazing experiences
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700">Remember me</span>
                      </label>
                      <a
                        href="#"
                        className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
                      >
                        Forgot password?
                      </a>
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      Login & Explore
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="relative flex items-center gap-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-sm text-gray-600 font-medium">
                      Or continue with
                    </span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* Google Sign In */}
                  <button className="w-full border border-gray-300 text-gray-700 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="mt-0 flex-1 overflow-y-auto">
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-gray-600">
                      Join thousands of travelers and start your adventure today
                    </p>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type={showSignupPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        >
                          {showSignupPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{" "}
                        <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">
                          Terms & Conditions
                        </a>
                      </span>
                    </label>

                    {/* Sign Up Button */}
                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      Create Account
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="relative flex items-center gap-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-sm text-gray-600 font-medium">
                      Or continue with
                    </span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* Google Sign In */}
                  <button className="w-full border border-gray-300 text-gray-700 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogClose className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

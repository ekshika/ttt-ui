import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import api from "../api/axios";
import { loginUser, registerUser, forgotPassword, googleLogin } from "../services/authService";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgot) {
        const res = await forgotPassword(form.username);
        toast.success(res.data.message || "Reset link sent!");
        setIsForgot(false);
      } else if (isLogin) {
        const res = await loginUser(form.username, form.password);
        login(res.data.accessToken);
        toast.success("Login successful");
        navigate("/");
      } else {
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        await registerUser( form.username, form.email, form.password);

        toast.success("Account created. Please log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isForgot
              ? "Forgot Password"
              : isLogin
              ? "Welcome Back!"
              : "Create Account"}
          </h1>
          <p className="text-gray-600">
            {isForgot
              ? "Enter your username to reset password"
              : isLogin
              ? "Enter your credentials to access your account"
              : "Sign up to get started with Teeny Tech Trek"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="username"
                value={form.username}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="your_username"
              />
            </div>
          </div>

          {!isForgot && !isLogin && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}

          {!isForgot && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {!isForgot && !isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading
              ? "Processing..."
              : isForgot
              ? "Reset Password"
              : isLogin
              ? "Log In"
              : "Sign Up"}
          </button>
          <GoogleLogin
            onSuccess={async (credentialResponse: CredentialResponse) => {
              if (credentialResponse.credential) {
                try {
                  const res = await googleLogin(credentialResponse.credential);
                  const token = res.data.accessToken;
                  login(token);
                  toast.success("Google login successful");
                  navigate("/");
                } catch (err: any) {
                  toast.error(
                    err.response?.data?.error || "Google login failed"
                  );
                }
              }
            }}
            onError={() => {
              toast.error("Google login failed");
            }}
            useOneTap
          />
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          {!isForgot && (
            <button
              onClick={() => setIsForgot(true)}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          )}

          {isForgot ? (
            <button
              onClick={() => setIsForgot(false)}
              className="text-blue-600 hover:underline block"
            >
              Back to Login
            </button>
          ) : (
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

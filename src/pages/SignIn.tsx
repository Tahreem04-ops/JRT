import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import bg from "../assets/auth-bg.jpg";
import { useAuth } from "../context/AuthContext";
export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign in failed";
      setError(msg);
      if (msg.toLowerCase().includes("verify")) navigate("/verify");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout bgImage={bg}>
      <h1 className="text-3xl font-extrabold text-brand mb-2">Sign In</h1>
      <p className="text-sm text-slate-600 mb-6">
        Please enter your credentials to access your account
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
    <div className="relative">
    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    <input type="email" required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-white/80 border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm" />
          </div>
        </div>
   <div>
  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
  <div className="relative">
     <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
     <input
       type={showPw ? "text" : "password"} required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-10 py-2.5 rounded-md bg-white/80 border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm"/>
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-slate-300" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-brand hover:underline">Forgot password?</Link>
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-brand hover:bg-brand-dark text-white font-semibold transition-colors disabled:opacity-60" >
          <LogIn size={16} />
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand font-medium hover:underline">
        Create an account
        </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

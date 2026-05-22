import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import bg from "../assets/auth-bg.jpg";
import { useAuth, Role } from "../context/AuthContext";
export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await signUp({ fullName, email, password, role });
      navigate("/verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout bgImage={bg}>
      <h1 className="text-3xl font-extrabold text-brand mb-2">Create Account</h1>
      <p className="text-sm text-slate-600 mb-6">Fill in the details below to get started</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="w-full px-3 py-2.5 rounded-md bg-white/80 border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm"/>
        </div>
        <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
      <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 rounded-md bg-white/80 border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm"
          />
        </div>
        <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
      <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 characters"
              className="w-full px-3 py-2.5 pr-10 rounded-md bg-white/80 border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        </div>
        </div>
        <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
        <div className="relative">
           <input
              type={showCpw ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className="w-full px-3 py-2.5 pr-10 rounded-md bg-white/80 border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm" />
            <button type="button" onClick={() => setShowCpw(!showCpw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {showCpw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-slate-700">Select Role</span>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="role" checked={role === "student"} onChange={() => setRole("student")} /> Student
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="role" checked={role === "instructor"} onChange={() => setRole("instructor")} /> Instructor
          </label>
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md bg-brand hover:bg-brand-dark text-white font-semibold transition-colors disabled:opacity-60">
          {loading ? "Creating account..." : "Sign Up"}
        </button>
     <p className="text-center text-sm text-slate-600">
         Already have an account?{" "}
      <Link to="/signin" className="text-brand font-medium hover:underline">Log in</Link>
      </p>
      </form>
    </AuthLayout>
  );
}

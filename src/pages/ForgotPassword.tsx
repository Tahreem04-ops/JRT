import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import bg from "../assets/auth-bg.jpg";
import { useAuth } from "../context/AuthContext";
export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    }
  };
  return (
    <AuthLayout bgImage={bg}>
      <h1 className="text-3xl font-extrabold text-brand mb-2">Reset Password</h1>
      <p className="text-sm text-slate-600 mb-6">
        Enter your email and we'll send you a reset link.
      </p>
      {sent ? (
        <div className="space-y-4">
          <p className="text-sm bg-green-50 text-green-700 border border-green-200 rounded-md px-3 py-3">
            A reset link has been sent to <strong>{email}</strong>.
          </p>
          <Link to="/signin" className="block text-center text-sm text-brand hover:underline">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 rounded-md bg-white/80 border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm" />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-brand hover:bg-brand-dark text-white font-semibold transition-colors">
            Send Reset Link
          </button>
          <p className="text-center text-sm text-slate-600">
            Remembered?{" "}
          <Link to="/signin" className="text-brand font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}

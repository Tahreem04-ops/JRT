import { FormEvent, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import bg from "../assets/verify-bg.jpg";
import { useAuth } from "../context/AuthContext";
export default function VerifyEmail() {
  const { pendingEmail, verify } = useAuth();
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  if (!pendingEmail) return <Navigate to="/signup" replace />;
  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 5) refs.current[i + 1]?.focus();
  };
  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const code = digits.join("");
    if (code.length !== 6) return setError("Please enter the 6-digit code.");
    const ok = await verify(code);
    if (!ok) return setError("Invalid verification code. Use 123456 for the demo.");
    navigate("/dashboard");
  };
  return (
    <AuthLayout bgImage={bg}>
      <h1 className="text-3xl font-extrabold text-brand mb-2">Verify Your Email</h1>
      <p className="text-sm text-slate-600">We've sent a 6-digit verification code to</p>
      <p className="font-semibold text-slate-900 mb-6">{pendingEmail}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Verification Code</label>
          <div className="flex gap-2">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (refs.current[i] = el)}
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                className="w-12 h-12 text-center text-lg font-semibold rounded-md bg-white/80 border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand outline-none"/>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link to="/signup" className="text-brand hover:underline">Change email</Link>
          <button
          type="button"
            onClick={() => setInfo("A new code has been sent. (Demo code: 123456)")}
        className="text-brand hover:underline">
          Resend code
          </button>
        </div>
        {info && <p className="text-sm text-slate-600">{info}</p>}
        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>}
    <button
        type="submit"
        className="w-full py-3 rounded-md bg-brand-light hover:bg-brand text-white font-semibold transition-colors">
        Verify Account
      </button>
    </form>
    </AuthLayout>
  );
}

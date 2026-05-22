import { useAuth } from "../context/AuthContext";
export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-extrabold text-slate-900">Welcome, {user.fullName}</h1>
      <p className="text-slate-600 mt-2">Role: <span className="font-semibold capitalize">{user.role}</span> · {user.email}</p>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {["My Courses", "Assignments", "Live Classes"].map((t) => (
          <div key={t} className="p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-900">{t}</h3>
        <p className="text-sm text-slate-600 mt-2">You have no items yet.</p>
        </div>
        ))}
      </div>
    </section>
  );
}

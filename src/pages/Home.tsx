import { Link } from "react-router-dom";
import { BookOpen, Users, Award, ArrowRight } from "lucide-react";
export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
        <h1 className="text-5xl font-extrabold leading-tight text-slate-900">
          Introduction About Our <br />
          <span className="text-brand">Digital Agency</span>
            </h1>
            <p className="mt-6 text-slate-600 leading-relaxed max-w-lg">
              Our Learning Management System helps you access courses, track your progress,
             and connect with instructors anytime, anywhere. Enjoy a structured, flexible,
          and engaging learning experience designed to support your academic and
          professional growth.
          </p>
        <div className="mt-8 flex gap-4">
         <Link to="/about"
            className="px-6 py-3 rounded-md border border-slate-300 text-sm font-semibold hover:bg-slate-100" >
            Learn More
          </Link>
          <Link
            to="/signup"
          className="px-6 py-3 rounded-md bg-brand text-white text-sm font-semibold hover:bg-brand-dark flex items-center gap-2">
            Get Started <ArrowRight size={16} />
          </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: BookOpen, title: "200+ Courses", desc: "Structured curriculums across streams" },
              { icon: Users, title: "Expert Tutors", desc: "Learn from qualified instructors" },
              { icon: Award, title: "Certifications", desc: "Earn recognized certificates" },
              { icon: ArrowRight, title: "Flexible Pace", desc: "Self-paced and live options" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-3">
                <Icon size={20} />
            </div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600 mt-1">{desc}</p>
          </div>
          ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Programs</h2>
        <p className="text-slate-600 mb-10">Explore our most enrolled course tracks.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {["Computer Science", "Pre-Medical", "Business & Commerce"].map((t) => (
            <div key={t} className="p-6 rounded-xl border border-slate-200 hover:border-brand transition-colors">
              <h3 className="text-lg font-semibold text-slate-900">{t}</h3>
              <p className="text-sm text-slate-600 mt-2">
                Comprehensive coursework with assessments, recorded lectures, and live sessions.
              </p>
              <Link to="/courses" className="inline-flex items-center gap-1 text-brand text-sm font-medium mt-4">
              Explore <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, BookOpen, Info, Mail, Video, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-brand" : "text-slate-700 hover:text-brand"
    }`;
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
        JRT <span className="text-brand">System</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
        <NavLink to="/" end className={linkClass}>
        <Home size={16} /> Home
        </NavLink>
      <div
        className="relative"
        onMouseEnter={() => setCoursesOpen(true)}
        onMouseLeave={() => setCoursesOpen(false)}>
    <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand">
    <BookOpen size={16} /> Courses <ChevronDown size={14} />
    </button>
   {coursesOpen && (
  <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-2">
    <div className="block px-4 py-2 text-sm hover:bg-slate-50 cursor-default">
    All Courses
    </div>
    <div className="block px-4 py-2 text-sm hover:bg-slate-50 cursor-default">
    SSC
    </div>
    <div className="block px-4 py-2 text-sm hover:bg-slate-50 cursor-default">
    HSSC
    </div>
    <div className="block px-4 py-2 text-sm hover:bg-slate-50 cursor-default">
    A/O Levels
    </div>
  </div>
)}
      </div>
          <NavLink to="/about" className={linkClass}>
          <Info size={16} /> About Us
          </NavLink>
         <div className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700">
  <Mail size={16} /> Contact
</div>
        <div className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700">
  <Video size={16} />
  <span className="text-brand">Online Tutoring (Free Trial)</span>
</div>
        </nav>
        <div className="flex items-center gap-2">
         {user ? (
         <>
        <Link
          to="/dashboard"
         className="px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors" >
        Dashboard
      </Link>
      <button
        onClick={() => {
          signOut();
          navigate("/");
          }}
        className="px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors">
        Logout </button>
        </>
      ) : (
     <Link
        to="/signup"
        className="px-5 py-2 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors">
        Join Now
       </Link>
      )}
        </div>
      </div>
    </header>
  );
}

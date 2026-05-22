import { Link } from "react-router-dom";
import {
  Home, BookOpen, Mic, Video, DollarSign, Info, MapPin, Phone, Mail,
  Globe, Linkedin, Rss, Send, Cpu, Code, Shield, Server, ShieldCheck,
  Microscope, Stethoscope, Wrench, Briefcase, GraduationCap, Book,
} from "lucide-react";
import { useState } from "react";
export default function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed: ${email}`);
    setEmail("");
  };
  return (
    <footer className="mt-20">
      <div className="bg-brand text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
        <h3 className="text-lg font-extrabold tracking-wide">JRT SYSTEM</h3>
        <p className="text-sm text-white/85">
        Top companies choose JRT SYSTEM Business to build in-demand career skills.
      </p>
      </div>
        <div className="flex items-center gap-4">
         <a href="#" aria-label="Website" className="hover:opacity-80"><Globe size={20} /></a>
          <a href="#" aria-label="LinkedIn" className="hover:opacity-80"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="bg-brand text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="flex items-center gap-2 hover:underline"><Home size={14}/> Home</Link></li>
              <li><Link to="/courses" className="flex items-center gap-2 hover:underline"><BookOpen size={14}/> Courses</Link></li>
              <li><Link to="/courses" className="flex items-center gap-2 hover:underline"><Book size={14}/> Recorded Lecture</Link></li>
              <li><Link to="/tutoring" className="flex items-center gap-2 hover:underline"><Mic size={14}/> Live Lecture</Link></li>
              <li><Link to="/pricing" className="flex items-center gap-2 hover:underline"><DollarSign size={14}/> Pricing</Link></li>
              <li><Link to="/about" className="flex items-center gap-2 hover:underline"><Info size={14}/> About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Technical Skills</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Cpu size={14}/> ChatGPT</li>
              <li className="flex items-center gap-2"><Code size={14}/> Coding</li>
              <li className="flex items-center gap-2"><Server size={14}/> Computer Science</li>
              <li className="flex items-center gap-2"><Shield size={14}/> Cybersecurity</li>
              <li className="flex items-center gap-2"><Wrench size={14}/> DevOps</li>
              <li className="flex items-center gap-2"><ShieldCheck size={14}/> Ethical Hacking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">SSC Courses</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Microscope size={14}/> SSC with Biology</li>
              <li className="flex items-center gap-2"><Server size={14}/> SSC with Computer Science</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">HSSC Courses</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Stethoscope size={14}/> Pre-Medical</li>
              <li className="flex items-center gap-2"><Wrench size={14}/> Pre-Engineering</li>
              <li className="flex items-center gap-2"><Server size={14}/> Intermediate of Computer Science (ICS)</li>
              <li className="flex items-center gap-2"><Book size={14}/> Humanities</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">A/O Level Courses</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><GraduationCap size={14}/> Science Stream</li>
              <li className="flex items-center gap-2"><Briefcase size={14}/> Commerce Stream</li>
              <li className="flex items-center gap-2"><Book size={14}/> Humanities Stream</li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin size={14}/> 123 Knowledge Road, Lahore, Pakistan</li>
              <li className="flex items-center gap-2"><Phone size={14}/> +92 300 1234567</li>
              <li className="flex items-center gap-2"><Mail size={14}/> support@JRTSYSTEM.edu</li>
            </ul>
          </div>
          <div className="md:col-span-2">
          <h4 className="font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm flex items-center gap-2 mb-3"><Rss size={14}/> Join our mailing list</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-md bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none"/>
      <button
            type="submit"
                aria-label="Subscribe"
                className="rounded-md bg-brand-dark hover:bg-blue-800 px-4 flex items-center justify-center" >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm">
            <p>© {new Date().getFullYear()} JRT SYSTEM. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

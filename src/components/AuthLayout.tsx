import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
interface Props {
  children: ReactNode;
  bgImage: string;
}
export default function AuthLayout({ children, bgImage }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section
       className="relative flex-1 min-h-[640px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative max-w-7xl mx-auto px-6 py-10 flex justify-end">
        <div className="w-full max-w-md bg-slate-100/95 backdrop-blur-sm rounded-xl shadow-xl p-8">
        {children}
        </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

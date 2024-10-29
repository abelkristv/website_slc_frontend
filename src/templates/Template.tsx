import Navbar from "../components/Navbar";
import ParticlesBackground from "./ParticlesBackground";
import { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden`}>
      <Navbar />
      <div className="flex-grow bg-gradient-to-tl from-[#00d2ff] to-[#3a7bd5]">
        <ParticlesBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

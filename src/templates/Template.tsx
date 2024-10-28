import Navbar from "../components/Navbar";
import { useLocation, Outlet } from "react-router-dom";
import ParticlesBackground from "./ParticlesBackground";

export default function Template() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden`}>
      <Navbar />
      <div className="flex-grow bg-gradient-to-tl from-[#00d2ff] to-[#3a7bd5]">
        <ParticlesBackground />
        <div
          className={
            !isHomePage
              ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10"
              : ""
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

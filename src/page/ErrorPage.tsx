import { useRouteError } from "react-router-dom";
import ParticlesBackground from "../templates/ParticlesBackground";
import Navbar from "../components/Navbar";

interface RouteError {
  statusText?: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-grow bg-gradient-to-tl from-[#00d2ff] to-[#3a7bd5] relative">
        <ParticlesBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
          <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              An unexpected error has occurred.
            </p>
            <p className="text-gray-500 italic">
              {error.statusText || error.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

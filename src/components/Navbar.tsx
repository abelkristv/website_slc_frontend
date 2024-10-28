import { useLocation, Link } from "react-router-dom";
import binus from "../assets/binus.png";
import ribbon from "../assets/ribbon.png";
import { Button, useColorModeValue } from "@chakra-ui/react";

export default function Navbar() {
  const location = useLocation();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Assistants", path: "/assistants" },
    { name: "Events", path: "/events" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const linkColor = useColorModeValue("gray-600", "gray-300");
  const linkHoverColor = useColorModeValue("black", "white");
  const activeLinkColor = useColorModeValue("blue-400", "blue-300");

  return (
    <nav className="shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <img src={ribbon} alt="" className="h-20 mb-auto" />
            <div className="py-4">
              <img src={binus} alt="" className="h-20" />
            </div>
          </div>
          <div className="hidden md:flex items-end mb-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`min-w-24 py-2 text-center ${
                  location.pathname === item.path
                    ? `font-bold text-${activeLinkColor}`
                    : `text-${linkColor} hover:text-${linkHoverColor}`
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              className="ml-6"
              bg="#3a7bd5"
              color="white"
              _hover={{ bg: "#336ab3" }}
              transition="background-color 0.3s ease"
            >
              Join Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

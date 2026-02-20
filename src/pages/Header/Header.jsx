import React, { useState, useEffect } from "react";
// Removed FaBars as we no longer need the hamburger icon
import {
  FaHome,
  FaCode,
  FaGraduationCap,
  FaLaptopCode,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";

export default function Header() {
  const [activeLink, setActiveLink] = useState("home");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Removed isMenuOpen state entirely

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { id: "home", icon: FaHome, text: "Home", targetId: "home" },
    { id: "skills", icon: FaCode, text: "Skills", targetId: "Skills" },
    {
      id: "education",
      icon: FaGraduationCap,
      text: "Education",
      targetId: "Education",
    },

    // {
    //   id: "experience",
    //   icon: FaBriefcase,
    //   text: "Experience",
    //   path: "/experience",
    // },
    {
      id: "projects",
      icon: FaLaptopCode,
      text: "Projects",
      targetId: "Projects",
    },
    { id: "contact", icon: FaEnvelope, text: "Contact", targetId: "Contact" },
  ];

  const handleScroll = (e, targetId, id) => {
    e.preventDefault();
    setActiveLink(id);

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-auto z-50">
      <div className="p-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 animate-gradient-x">
        <nav className="bg-gray-900/90 backdrop-blur-md rounded-full px-4 md:px-6 py-2 md:py-2.5">
          {/* Navigation Links - Always a row, spaced out evenly on mobile */}
          <div className="flex flex-row justify-between md:justify-center items-center gap-1 md:gap-4">
            {navLinks.map(({ id, icon: Icon, text, targetId }) => (
              <a
                key={id}
                href={`#${targetId}`}
                onClick={(e) => handleScroll(e, targetId, id)}
                title={text} // Added title for accessibility on hover/long-press
                className={`p-3 md:px-4 md:py-2 rounded-full text-sm font-medium
                  transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
                  hover:bg-white/10 
                  ${
                    activeLink === id
                      ? "bg-white/15 text-white"
                      : "text-gray-300 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`text-lg md:text-base ${
                    activeLink === id ? "scale-110" : ""
                  }`}
                />
                {/* Text is hidden on mobile, visible on medium screens and up */}
                <span className="hidden md:inline">{text}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </header>
  );
}

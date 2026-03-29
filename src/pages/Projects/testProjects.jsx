import { motion } from "framer-motion";
import { useState } from "react";
import GiveAHand from "../../assets/images/GiveAHand.png";
import TalkThread from "../../assets/images/TalkThread.png";
import HumptyDumpty from "../../assets/images/HumptyDumpty.png";
import Bhoj from "../../assets/images/Bhoj.png";
import AustCarnival from "../../assets/images/AustCarnival.png";
import CampusCrew from "../../assets/images/CampusCrew.png";

/* ─── Per-project accent palette ── */
const ACCENTS = [
  { rgb: "99,210,255", hex: "#63d2ff" }, // cyan
  { rgb: "167,139,250", hex: "#a78bfa" }, // violet
  { rgb: "52,211,153", hex: "#34d399" }, // emerald
  { rgb: "251,146,60", hex: "#fb923c" }, // orange
  { rgb: "232,121,249", hex: "#e879f9" }, // fuchsia
  { rgb: "250,204,21", hex: "#facc15" }, // yellow
];

const projects = [
  {
    title: "CampusCrew",
    subtitle: "Event Management Website",
    description:
      "An event management website with AI-powered event suggestions, pagination, and an integrated payment system.",
    link: CampusCrew,
    githubLink: "https://github.com/AsifAvaas/CampusCrew",
    liveLink: "https://campus-crew.vercel.app",
    tags: ["React", "AI", "Payments"],
  },
  {
    title: "Talk Thread",
    subtitle: "Blog Application",
    description:
      "A blogging platform with infinite scrolling and search engine optimisation (SEO) to boost visibility and discovery.",
    link: TalkThread,
    githubLink: "https://github.com/AsifAvaas/TalkThreads",
    liveLink: "https://talk-threads-seven.vercel.app",
    tags: ["Next.js", "SEO", "Infinite Scroll"],
  },
  {
    title: "Aust CSE Carnival",
    subtitle: "Event Hosting Platform",
    description:
      "An interactive website for university-hosted CSE events, including contests, hackathons, and exhibitions.",
    link: AustCarnival,
    githubLink: "https://github.com/AsifAvaas/AustCarnival",
    liveLink: "https://aust-carnival.vercel.app",
    tags: ["React", "Node.js", "Events"],
  },
  {
    title: "Give A Hand",
    subtitle: "Emergency Response Platform",
    description:
      "A platform where verified doctors, blood donors, and volunteers assist help seekers through bookings, chat, and emergency notices.",
    link: GiveAHand,
    githubLink: "https://github.com/AsifAvaas/Giva-A-Hand",
    liveLink: "https://giva-a-hand-project.vercel.app",
    tags: ["Full-Stack", "Real-time", "Healthcare"],
  },
  {
    title: "Humpty Dumpty",
    subtitle: "2D Ball Game",
    description:
      "A 2D game where players control a ball to navigate obstacles, collect stars, and complete levels — with a ranking system based on level completion speed.",
    link: HumptyDumpty,
    githubLink: "https://github.com/AsifAvaas/Humpty-Dumpty",
    liveLink: "https://www.youtube.com/watch?v=8THBytkSqf0",
    tags: ["Game Dev", "Physics", "Leaderboard"],
  },
  {
    title: "Bhoj",
    subtitle: "Food Ordering Platform",
    description:
      "A user-friendly app for online food ordering, complete with menu browsing, order history, and reviews.",
    link: Bhoj,
    githubLink: "https://github.com/sanjidasunny/VIVISTERIA",
    liveLink: "https://vivisteria.vercel.app",
    tags: ["React", "Express", "MongoDB"],
  },
];

/* ─── Icons ─── */
const GithubIcon = ({ color }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const GlobeIcon = ({ color }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* ─── Project Card Component ─── */
function ProjectCard({ project, i }) {
  const [isHovered, setIsHovered] = useState(false);
  const acc = ACCENTS[i % ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[450px] w-full rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end"
      style={{
        background: "#0a0f24",
        boxShadow: isHovered
          ? `0 20px 40px -10px rgba(${acc.rgb}, 0.3)`
          : "0 10px 30px -10px rgba(0,0,0,0.5)",
        border: `1px solid ${isHovered ? `rgba(${acc.rgb}, 0.5)` : "rgba(255,255,255,0.05)"}`,
        transition: "all 0.4s ease",
      }}
    >
      {/* Background Image with Zoom on Hover */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl z-0">
        <motion.img
          src={project.link}
          alt={project.title}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover object-top"
        />
        {/* Dynamic Gradient Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, #04081A 0%, rgba(4,8,26,0.8) 40%, rgba(4,8,26,0.2) 100%)`,
            opacity: isHovered ? 0.85 : 0.95,
          }}
        />
        {/* Accent Color Wash on Hover */}
        <div
          className="absolute inset-0 mix-blend-overlay transition-opacity duration-500"
          style={{ backgroundColor: acc.hex, opacity: isHovered ? 0.3 : 0 }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-8 flex flex-col h-full justify-end">
        {/* Ghost Index */}
        <div
          className="absolute top-6 right-6 font-mono text-4xl font-bold opacity-10 pointer-events-none"
          style={{ color: acc.hex }}
        >
          0{i + 1}
        </div>

        <div
          className="transform transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <p
            className="font-mono text-xs tracking-widest uppercase mb-2"
            style={{ color: acc.hex }}
          >
            {project.subtitle}
          </p>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tIndex) => (
              <span
                key={tIndex}
                className="px-3 py-1 rounded-md text-xs font-mono font-medium backdrop-blur-md"
                style={{
                  background: `rgba(${acc.rgb}, 0.1)`,
                  color: acc.hex,
                  border: `1px solid rgba(${acc.rgb}, 0.2)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links - Fade in on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 pt-4 border-t border-white/10"
          >
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"
              style={{ color: acc.hex }}
            >
              <GithubIcon color={acc.hex} /> Source Code
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"
              style={{ color: acc.hex }}
            >
              <GlobeIcon color={acc.hex} /> Live Demo
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─────────────────────────────────────────── */
export default function Projects1() {
  return (
    <main className="min-h-screen bg-[#04081A] relative py-24 px-6 md:px-12">
      {/* Background Mesh */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-xs tracking-widest uppercase text-cyan-400/60 mb-3">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-cyan-400 to-purple-400">
            Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} i={i} />
          ))}
        </div>
      </div>
    </main>
  );
}

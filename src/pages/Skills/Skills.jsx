import React, { useRef, useEffect, useState } from "react";
import { Code2, Database, Cloud, Cpu } from "lucide-react";
import IconCloudDemo from "@/components/globe"; // <-- Make sure this path matches your project structure
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaFigma,
  FaAws,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiJest,
  SiWebpack,
  SiRedux,
  SiFirebase,
  SiVercel,
  SiVite,
  SiBootstrap,
  SiJavascript,
  SiMysql,
  SiLaravel,
  SiExpress,
  SiFlutter,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { BsFileEarmarkCode, BsGrid1X2 } from "react-icons/bs";
import { FcWorkflow } from "react-icons/fc";

/* ─── Tilt + glow-follow card ─────────────────────────────── */
const MagneticCard = ({ children, accentRgb }) => {
  const ref = useRef(null);
  const glowRef = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(260px circle at ${x}px ${y}px, rgba(${accentRgb},0.13), transparent 70%)`;
    }
  };

  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        willChange: "transform",
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />
      {children}
    </div>
  );
};

/* ─── Skill Card ───────────────────────────────────────────── */
const SkillCard = ({ icon: Icon, title, skills, theme, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <MagneticCard accentRgb={theme.accentRgb}>
      <div
        className="skill-card"
        style={{
          height: "100%", // <-- Add this to make the gradient border stretch
          position: "relative",
          borderRadius: "20px",
          padding: "1px" /* gradient border trick */,
          background: hovered
            ? `linear-gradient(135deg, rgba(${theme.accentRgb},0.5) 0%, rgba(${theme.accentRgb},0.08) 50%, transparent 100%)`
            : "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          transition: "background 0.4s ease",
          animationDelay: `${index * 0.1}s`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Inner card */}
        <div
          style={{
            background: "linear-gradient(145deg, #0c1228 0%, #070d1f 100%)",
            borderRadius: "19px",
            padding: "28px",
            position: "relative",
            overflow: "hidden",
            height: "100%",
            zIndex: 2,
            display: "flex", // <-- Add this
            flexDirection: "column", // <-- Add this
          }}
        >
          {/* Ghost index number */}
          <span
            style={{
              position: "absolute",
              right: "-8px",
              top: "-18px",
              fontSize: "120px",
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              color: `rgba(${theme.accentRgb},0.04)`,
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              transition: "color 0.4s",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Top accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "20%",
              right: "20%",
              height: "2px",
              background: `linear-gradient(90deg, transparent, rgba(${theme.accentRgb},0.8), transparent)`,
              opacity: hovered ? 1 : 0.3,
              transition: "opacity 0.4s, left 0.4s, right 0.4s",
              ...(hovered ? { left: "5%", right: "5%" } : {}),
            }}
          />

          {/* Corner decoration */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "80px",
              height: "80px",
              background: `radial-gradient(circle at bottom right, rgba(${theme.accentRgb},0.12), transparent 70%)`,
              borderRadius: "0 0 19px 0",
            }}
          />

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "22px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: `rgba(${theme.accentRgb},0.1)`,
                border: `1px solid rgba(${theme.accentRgb},0.2)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: hovered
                  ? `0 0 18px rgba(${theme.accentRgb},0.25)`
                  : "none",
                transform: hovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              <Icon
                style={{
                  width: 22,
                  height: 22,
                  color: `rgb(${theme.accentRgb})`,
                }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: `rgba(${theme.accentRgb},0.7)`,
                  marginBottom: "2px",
                }}
              >
                {theme.label}
              </p>
              <h3
                style={{
                  fontSize: "20px",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  color: "#f0f4ff",
                  lineHeight: 1.1,
                }}
              >
                {title}
              </h3>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: `linear-gradient(90deg, rgba(${theme.accentRgb},0.3), rgba(255,255,255,0.04) 60%, transparent)`,
              marginBottom: "20px",
            }}
          />

          {/* Skills grid */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "auto",
            }}
          >
            {skills.map((skill, i) => (
              <div
                key={i}
                className="skill-badge"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  background: `rgba(${theme.accentRgb},0.05)`,
                  border: `1px solid rgba(${theme.accentRgb},0.12)`,
                  fontSize: "12px",
                  fontFamily: "'Space Mono', monospace",
                  color: "#b0bcd4",
                  cursor: "default",
                  transition: "all 0.22s ease",
                  animationDelay: `${index * 0.1 + i * 0.04}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `rgba(${theme.accentRgb},0.14)`;
                  e.currentTarget.style.borderColor = `rgba(${theme.accentRgb},0.35)`;
                  e.currentTarget.style.color = "#e8eeff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `rgba(${theme.accentRgb},0.05)`;
                  e.currentTarget.style.borderColor = `rgba(${theme.accentRgb},0.12)`;
                  e.currentTarget.style.color = "#b0bcd4";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "15px",
                  }}
                >
                  {skill.icon}
                </span>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MagneticCard>
  );
};

/* ─── Main Section ─────────────────────────────────────────── */
const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend",
      theme: {
        accentRgb: "99,210,255",
        label: "Interface",
      },
      skills: [
        { name: "React", icon: <FaReact style={{ color: "#61DAFB" }} /> },
        { name: "Next.js", icon: <SiNextdotjs style={{ color: "#fff" }} /> },
        {
          name: "JavaScript",
          icon: <SiJavascript style={{ color: "#f0db4e" }} />,
        },
        {
          name: "Tailwind",
          icon: <SiTailwindcss style={{ color: "#38B2AC" }} />,
        },
        { name: "Flutter", icon: <SiFlutter style={{ color: "#54C5F8" }} /> },
        {
          name: "HTML5/CSS3",
          icon: <BsFileEarmarkCode style={{ color: "#E34F26" }} />,
        },
      ],
    },
    {
      icon: Database,
      title: "Backend",
      theme: {
        accentRgb: "52,211,153",
        label: "Server-side",
      },
      skills: [
        { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
        { name: "Python", icon: <FaPython style={{ color: "#3776AB" }} /> },
        { name: "MongoDB", icon: <SiMongodb style={{ color: "#47A248" }} /> },
        { name: "MySQL", icon: <SiMysql style={{ color: "#00758F" }} /> },
        { name: "Express", icon: <SiExpress style={{ color: "#ccc" }} /> },
        { name: "REST APIs", icon: <BsGrid1X2 style={{ color: "#FF6C37" }} /> },
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      theme: {
        accentRgb: "251,146,60",
        label: "Infrastructure",
      },
      skills: [
        { name: "AWS", icon: <FaAws style={{ color: "#FF9900" }} /> },
        { name: "Docker", icon: <FaDocker style={{ color: "#2496ED" }} /> },
        {
          name: "Kubernetes",
          icon: <BsGrid1X2 style={{ color: "#326CE5" }} />,
        },
        { name: "CI/CD", icon: <FcWorkflow /> },
        { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
        { name: "Linux", icon: <FaLinux style={{ color: "#FCC624" }} /> },
      ],
    },
    {
      icon: Cpu,
      title: "Tools & Tech",
      theme: {
        accentRgb: "232,121,249",
        label: "Ecosystem",
      },
      skills: [
        {
          name: "VS Code",
          icon: <TbBrandVscode style={{ color: "#007ACC" }} />,
        },
        { name: "Webpack", icon: <SiWebpack style={{ color: "#8DD6F9" }} /> },
        { name: "Redux", icon: <SiRedux style={{ color: "#764ABC" }} /> },
        { name: "Firebase", icon: <SiFirebase style={{ color: "#FFCA28" }} /> },
        { name: "Vercel", icon: <SiVercel style={{ color: "#fff" }} /> },
        { name: "Vite", icon: <SiVite style={{ color: "#646CFF" }} /> },
      ],
    },
  ];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .skill-card {
          animation: fadeSlideUp 0.55s ease both;
        }
        .skill-badge {
          animation: fadeSlideUp 0.4s ease both;
        }
        .globe-container {
          animation: fadeIn 1s ease both;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px; /* Increased gap slightly to give wider cards breathing room */
          max-width: 1280px; /* Increased from 900px to stretch beautifully across the screen */
          margin: 0 auto;
        }
       
        @media (max-width: 1024px) {
          .skills-grid { 
            gap: 24px;
            max-width: 900px; 
          } 
        }

        @media (max-width: 700px) {
          .skills-grid { grid-template-columns: 1fr; }
        }

      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: "#04081A",
          position: "relative",
          overflow: "hidden",
          padding: "60px 24px",
        }}
      >
        {/* Background mesh */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Central Glow mapped to sit exactly behind the globe */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <section style={{ position: "relative", zIndex: 10 }}>
          {/* Skill Globe Container added here */}
          <div
            className="globe-container"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <IconCloudDemo />
          </div>

          <div className="skills-grid">
            {skillCategories.map((cat, i) => (
              <SkillCard key={i} index={i} {...cat} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default SkillsSection;

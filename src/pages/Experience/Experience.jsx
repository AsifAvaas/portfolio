import React, { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

/* ─── Magnetic tilt wrapper ───────────────────────────────── */
const MagneticCard = ({ children }) => {
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
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(99,210,255,0.07), transparent 60%)`;
    }
  };

  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.18s ease",
        willChange: "transform",
        position: "relative",
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
          transition: "background 0.1s",
        }}
      />
      {children}
    </div>
  );
};

/* ─── Project card ────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const [hov, setHov] = useState(false);

  const accents = [
    { rgb: "99,210,255", label: "01" },
    { rgb: "52,211,153", label: "02" },
    { rgb: "251,146,60", label: "03" },
  ];
  const acc = accents[index % accents.length];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "1px",
        background: hov
          ? `linear-gradient(135deg, rgba(${acc.rgb},0.55), rgba(${acc.rgb},0.08) 60%, transparent)`
          : "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
        transition: "background 0.35s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          background: "linear-gradient(145deg,#0c1228,#070d1f)",
          borderRadius: "15px",
          padding: "20px 22px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        {/* Number tag */}
        <div
          style={{
            flexShrink: 0,
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: `rgba(${acc.rgb},0.1)`,
            border: `1px solid rgba(${acc.rgb},0.25)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            fontWeight: 700,
            color: `rgb(${acc.rgb})`,
            marginTop: "2px",
            boxShadow: hov ? `0 0 12px rgba(${acc.rgb},0.25)` : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          {acc.label}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#e8f0ff",
              }}
            >
              {project.name}
            </span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: `rgb(${acc.rgb})`,
                  opacity: 0.7,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
              >
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13.5px",
              color: "#7a8aaa",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: hov ? "100%" : "0%",
            background: `linear-gradient(90deg, transparent, rgba(${acc.rgb},0.7), transparent)`,
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
};

/* ─── Main Section ─────────────────────────────────────────── */
const ExperienceSection = () => {
  const [cardHov, setCardHov] = useState(false);
  const arklabLogo = "https://www.arklabai.com/favicon.ico";

  const experience = {
    title: "Full-Stack Developer Intern",
    company: "Arklab AI",
    period: "March 2026 – Present",
    website: "https://www.arklabai.com",
    description:
      "Architecting and deploying full-stack web applications, integrating AI-driven intelligence, and building high-performance financial and commercial platforms.",
    projects: [
      {
        name: "IQONA",
        description:
          "Developing the MVP for an AI-powered economic intelligence system tailored for the African market, implementing comprehensive CRUD operations and secure data flows across 5 core modules.",
      },
      {
        name: "Nestguard",
        link: "https://www.nestguard.co.uk/",
        description:
          "Built and integrated a robust customer quoting and order-taking system for a UK premium wall coatings service, streamlining the conversion funnel for end-users.",
      },
      {
        name: "Super Trader",
        description:
          "Engineered backend components for a high-speed cryptocurrency arbitrage bot, focusing on ultra-low latency data processing and reliable API integrations.",
      },
    ],
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .exp-animate { animation: fadeUp 0.6s ease both; }
        .exp-animate-d1 { animation: fadeUp 0.6s 0.1s ease both; }
        .exp-animate-d2 { animation: fadeUp 0.6s 0.2s ease both; }
        .exp-animate-d3 { animation: fadeUp 0.6s 0.3s ease both; }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          background: "#04081A",
          position: "relative",
          overflow: "hidden",
          padding: "120px 24px 80px",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.028) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.028) 1px,transparent 1px)
          `,
            backgroundSize: "44px 44px",
          }}
        />
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "420px",
            background:
              "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* ── Section header ── */}
          <div
            className="exp-animate"
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(99,210,255,0.6)",
                marginBottom: "12px",
              }}
            >
              Career
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(36px, 6vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.05,
                background:
                  "linear-gradient(135deg, #e8f4ff 0%, #63d2ff 45%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
              }}
            >
              Professional Experience
            </h2>
            <div
              style={{
                width: "48px",
                height: "3px",
                background: "linear-gradient(90deg,#63d2ff,#a78bfa)",
                borderRadius: "99px",
                margin: "16px auto 0",
              }}
            />
          </div>

          {/* ── Main card ── */}
          <MagneticCard>
            <div
              onMouseEnter={() => setCardHov(true)}
              onMouseLeave={() => setCardHov(false)}
              className="exp-animate-d1"
              style={{
                position: "relative",
                borderRadius: "24px",
                padding: "1px",
                background: cardHov
                  ? "linear-gradient(135deg, rgba(99,210,255,0.45) 0%, rgba(167,139,250,0.2) 50%, transparent 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                transition: "background 0.4s ease",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(160deg, #0b1126 0%, #060c1d 100%)",
                  borderRadius: "23px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Top shimmer bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "15%",
                    right: "15%",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(99,210,255,0.6), rgba(167,139,250,0.6), transparent)",
                    opacity: cardHov ? 1 : 0.4,
                    transition: "opacity 0.4s, left 0.4s, right 0.4s",
                    ...(cardHov ? { left: "2%", right: "2%" } : {}),
                  }}
                />

                {/* Corner glow blobs */}
                <div
                  style={{
                    position: "absolute",
                    top: "-60px",
                    right: "-60px",
                    width: "200px",
                    height: "200px",
                    background:
                      "radial-gradient(circle, rgba(99,210,255,0.06), transparent 65%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-60px",
                    left: "-40px",
                    width: "180px",
                    height: "180px",
                    background:
                      "radial-gradient(circle, rgba(167,139,250,0.06), transparent 65%)",
                    pointerEvents: "none",
                  }}
                />

                {/* ── Top header band ── */}
                <div
                  style={{
                    padding: "32px 36px 28px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Logo + company */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "18px",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: cardHov
                          ? "0 0 20px rgba(99,210,255,0.15)"
                          : "none",
                        transition: "box-shadow 0.4s, transform 0.3s",
                        transform: cardHov ? "scale(1.06)" : "scale(1)",
                        padding: "8px",
                      }}
                    >
                      <img
                        src={arklabLogo}
                        alt="Arklab AI"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://ui-avatars.com/api/?name=Arklab+AI&background=0D8ABC&color=fff";
                        }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(99,210,255,0.55)",
                          margin: "0 0 4px",
                        }}
                      >
                        Company
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: "26px",
                          fontWeight: 800,
                          color: "#e8f0ff",
                          margin: 0,
                          lineHeight: 1.1,
                        }}
                      >
                        {experience.company}
                      </h3>
                      <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "11px",
                          color: "rgba(99,210,255,0.65)",
                          textDecoration: "none",
                          marginTop: "4px",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "rgb(99,210,255)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(99,210,255,0.65)")
                        }
                      >
                        arklabai.com <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>

                  {/* Role + period badges */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: "99px",
                        background: "rgba(99,210,255,0.08)",
                        border: "1px solid rgba(99,210,255,0.18)",
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#c8e8ff",
                      }}
                    >
                      {experience.title}
                    </div>
                    <div
                      style={{
                        padding: "5px 14px",
                        borderRadius: "99px",
                        background: "rgba(167,139,250,0.07)",
                        border: "1px solid rgba(167,139,250,0.18)",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "11px",
                        color: "rgba(200,180,255,0.75)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {experience.period}
                    </div>
                  </div>
                </div>

                {/* ── Body ── */}
                <div
                  style={{
                    padding: "32px 36px 36px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "36px",
                  }}
                >
                  {/* Left: description */}
                  <div style={{ flex: "1 1 220px" }}>
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9.5px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                        marginBottom: "12px",
                      }}
                    >
                      Overview
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14.5px",
                        color: "#6a7d9f",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {experience.description}
                    </p>

                    {/* Stat pills */}
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "24px",
                        flexWrap: "wrap",
                      }}
                    >
                      {[
                        { value: "3", label: "Projects" },
                        { value: "AI", label: "Powered" },
                        { value: "Full", label: "Stack" },
                      ].map((s, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "10px",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "'Syne', sans-serif",
                              fontSize: "16px",
                              fontWeight: 800,
                              color: "#63d2ff",
                            }}
                          >
                            {s.value}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "9px",
                              color: "rgba(255,255,255,0.3)",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div
                    style={{
                      width: "1px",
                      background:
                        "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)",
                      flexShrink: 0,
                      alignSelf: "stretch",
                    }}
                  />

                  {/* Right: projects */}
                  <div style={{ flex: "2 1 320px" }}>
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9.5px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                        marginBottom: "16px",
                      }}
                    >
                      Key Projects
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {experience.projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MagneticCard>
        </div>
      </section>
    </>
  );
};

export default ExperienceSection;

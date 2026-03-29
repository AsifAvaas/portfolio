import IconCloud from "./ui/icon-cloud";

const slugs = [
  // Core Web & Languages
  "typescript",
  "javascript",
  "html5",
  "css3",
  "cplusplus",
  "python",
  "dart",
  "java",
  // Frontend
  "react",
  "nextdotjs",
  "tailwindcss",
  "bootstrap",
  "vite",
  "webpack",
  "redux",
  // Backend & Database
  "nodedotjs",
  "express",
  "mongodb",
  "postgresql",
  "mysql",
  "prisma",
  "graphql",
  "laravel",
  // Cloud, DevOps & Tools
  "amazonaws",
  "firebase",
  "nginx",
  "vercel",
  "docker",
  "kubernetes",
  "git",
  "github",
  "gitlab",
  "linux",
  "ubuntu",
  // Mobile & Design
  "flutter",
  "android",
  "androidstudio",
  "figma",
  // Testing & Quality
  "testinglibrary",
  "jest",
  "cypress",
  "sonarqube",
  "jira",
  // Editors & Niche (Web3/AI)
  "visualstudiocode",
  "solidity",
  "jupyter",
];

function IconCloudDemo() {
  return (
    /* Added lg:max-w-2xl and adjusted responsive padding to let the globe scale up beautifully */
    <div className="relative flex size-full max-w-lg lg:max-w-2xl items-center justify-center overflow-hidden rounded-lg px-8 lg:px-20 pb-8 lg:pb-20 pt-8 bg-transparent">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
export default IconCloudDemo;

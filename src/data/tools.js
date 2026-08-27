import {
  SiPhp,
  SiJavascript,
  SiPython,
  SiDart,
  SiLaravel,
  SiLivewire,
  SiAlpinedotjs,
  SiTailwindcss,
  SiFlutter,
  SiCodeigniter,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiFigma,
  SiJira,
  SiVercel,
  SiSupabase,
  SiFedora,
  SiUnity,
  SiMysql
} from 'react-icons/si';
import { TbBrandCSharp, TbBrandPowershell } from 'react-icons/tb';
import { FaHtml5, FaCss3Alt } from 'react-icons/fa';

export const toolCategories = [
  {
    title: "Programming Languages",
    emoji: "💫",
    items: [
      { name: "PHP", icon: SiPhp, color: "#777bb4" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "Python", icon: SiPython, color: "#387eb8" },
      { name: "C#", icon: TbBrandCSharp, color: "#a179dc" },
      { name: "Dart", icon: SiDart, color: "#0175c2" },
      { name: "HTML5", icon: FaHtml5, color: "#e34f26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572b6" },
    ]
  },
  {
    title: "Frameworks & Libraries",
    emoji: "⚡",
    items: [
      { name: "Laravel", icon: SiLaravel, color: "#ff2d20" },
      { name: "Livewire", icon: SiLivewire, color: "#fb70a9" },
      { name: "Alpine.js", icon: SiAlpinedotjs, color: "#8bc0d0" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
      { name: "Flutter", icon: SiFlutter, color: "#54c5f8" },
      { name: "CodeIgniter", icon: SiCodeigniter, color: "#ee4326" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
    ]
  },
  {
    title: "Tools & Ecosystem",
    emoji: "🧰",
    items: [
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "GitHub", icon: SiGithub, color: "#e2e8f0" },
      { name: "Figma", icon: SiFigma, color: "#a259ff" },
      { name: "Jira", icon: SiJira, color: "#0052cc" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
      { name: "Fedora Linux", icon: SiFedora, color: "#51a2da" },
      { name: "PowerShell", icon: TbBrandPowershell, color: "#5391fe" },
      { name: "Unity", icon: SiUnity, color: "#ffffff" },
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
    ]
  }
];

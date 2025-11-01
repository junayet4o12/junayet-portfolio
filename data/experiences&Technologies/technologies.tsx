import { TechnologyCategory } from "@/type";
import {
  Database,
  Terminal,
  Globe,
  GitBranch,
  Server,
  Settings,
  Cloud,
  Layout,
  LayoutGrid,
} from "lucide-react";
import {
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaHtml5,
  FaMoneyBill,
  FaNodeJs,
  FaReact,
  FaRoute,
  FaStripe,
} from "react-icons/fa6";
import { FiBox } from "react-icons/fi";
import {
  RiNpmjsFill,
  RiTailwindCssFill,
  RiVercelLine,
} from "react-icons/ri";
import {
  SiCloudinary,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiJsonwebtokens,
  SiMui,
  SiNetlify,
  SiPostman,
  SiPrisma,
  SiRedux,
  SiSocketdotio,
  SiStrapi,
  SiStripe,
  SiTypescript,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";
import { TbBrandVite } from "react-icons/tb";
import { BiLogoReact } from "react-icons/bi";

export const technologyCategories: TechnologyCategory[] = [
  {
    name: "Backend Development",
    icon: <Server className="w-full h-full" />,
    technologies: [
      { name: "Node.js", icon: <FaNodeJs className="text-2xl" />, isCore: true },
      { name: "Express.js", icon: <SiExpress className="text-2xl" />, isCore: true },
      { name: "Prisma", icon: <SiPrisma className="text-2xl" />, isCore: true },
      { name: "Typescript", icon: <SiTypescript className="text-2xl" />, isCore: true },
      { name: "Socket.io", icon: <SiSocketdotio className="text-2xl" />, isCore: true },
      { name: "Stripe", icon: <SiStripe className="text-2xl" />, isCore: true },
      { name: "Mongoose", icon: <Database size={24} />, isCore: true },
      { name: "REST APIs", icon: <Globe size={24} />, isCore: true },
      { name: "MongoDB", icon: <Database size={24} />, isCore: true },
      { name: "JWT", icon: <SiJsonwebtokens className="text-2xl" />, isCore: true },
      { name: "Zod", icon: <FaCode className="text-2xl" />, isCore: true },
      { name: "Nodemailer", icon: <FaEnvelope className="text-2xl" />, isCore: true },
      { name: "Strapi", icon: <SiStrapi className="text-2xl" /> },
      { name: "Multer", icon: <BsFillFileEarmarkArrowUpFill className="text-2xl" />, isCore: true },
    ],
  },
  {
    name: "Frontend Development",
    icon: <Layout className="w-full h-full" />,
    technologies: [
      { name: "Next.js", icon: <Globe size={24} />, isCore: true },
      { name: "Redux", icon: <SiRedux className="text-2xl" />, isCore: true },
      { name: "RTK Query", icon: <SiRedux className="text-2xl" />, isCore: true },
      { name: "Tailwind CSS", icon: <RiTailwindCssFill className="text-2xl" />, isCore: true },
      { name: "Shadcn", icon: <LayoutGrid size={24} />, isCore: true },
      { name: "Material-UI", icon: <SiMui className="text-2xl" /> },
      { name: "TanStack Query", icon: <FaDatabase className="text-2xl" />, isCore: true },
      { name: "React Hook Form", icon: <BiLogoReact className="text-2xl" />, isCore: true },
      { name: "Framer Motion", icon: <SiFramer className="text-2xl" />, isCore: true },
      { name: "React Router DOM", icon: <FaRoute className="text-2xl" /> },
    ],
  },
  {
    name: "Development Tools",
    icon: <Settings className="w-full h-full" />,
    technologies: [
      { name: "Git", icon: <GitBranch size={24} />, isCore: true },
      { name: "GitHub", icon: <FaGithub className="text-2xl" />, isCore: true },
      { name: "VS Code", icon: <VscVscode className="text-2xl" />, isCore: true },
      { name: "Postman", icon: <SiPostman className="text-2xl" />, isCore: true },
      { name: "npm", icon: <RiNpmjsFill className="text-2xl" /> },
      { name: "MongoDB Compass", icon: <Database size={24} /> },
      { name: "Terminal", icon: <Terminal size={24} />, isCore: true },
      { name: "Cursor", icon: <FiBox className="text-2xl" /> },
      { name: "Vite", icon: <TbBrandVite className="text-2xl" />, isCore: true },
    ],
  },
  {
    name: "Deployment & Testing",
    icon: <Cloud className="w-full h-full" />,
    technologies: [
      { name: "Vercel", icon: <RiVercelLine className="text-2xl" />, isCore: true },
      { name: "Netlify", icon: <SiNetlify className="text-2xl" /> },
      { name: "SSLCommerz", icon: <FaMoneyBill className="text-2xl" />, isCore: true },
      { name: "Firebase", icon: <SiFirebase className="text-2xl" />, isCore: true },
      { name: "Stripe", icon: <FaStripe className="text-2xl" />, isCore: true },
    ],
  },
];

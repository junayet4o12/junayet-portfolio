import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Database,
  Terminal,
  Globe,
  GitBranch,
  Server,
  Settings,
  Cloud,
  Layout,
} from "lucide-react"
import { FaCss3Alt, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa6"
import { FiBox } from "react-icons/fi"
import { RiNpmjsFill, RiTailwindCssFill, RiVercelLine } from "react-icons/ri"
import { SiExpress, SiJsonwebtokens, SiMui, SiNetlify, SiPostman, SiRedux, SiSocketdotio, SiTypescript } from "react-icons/si"
import { VscVscode } from "react-icons/vsc"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface ExperienceCardProps {
  period: string
  organization: string
  description: string[]
  index: number
}

interface ExperienceData {
  period: string
  organization: string
  description: string[]
}

interface Technology {
  name: string
  icon: React.ReactNode
}

interface TechnologyCategory {
  name: string
  icon: React.ReactNode
  technologies: Technology[]
}

function ExperienceCard({ period, organization, description }: ExperienceCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-muted border-none p-6 space-y-4 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full">
        <p className="text-muted-foreground">{period}</p>
        <h3 className="text-primary text-xl font-bold">{organization}</h3>
        {description.map((line, index) => (
          <p key={index} className="text-sm text-muted-foreground">{line}</p>
        ))}
      </Card>
    </motion.div>
  );
}

function TechnologyCard({ tech }: { tech: Technology }) {
  return (
    <motion.div
      className="group flex flex-col items-center justify-center p-4 bg-muted rounded-xl hover:bg-background transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
        {tech.icon}
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
        {tech.name}
      </span>
    </motion.div>
  );
}

function CategorySection({ category }: { category: TechnologyCategory }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3">
        <div className="text-primary w-8 h-8">
          {category.icon}
        </div>
        <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {category.technologies.map((tech, index) => (
          <TechnologyCard key={index} tech={tech} />
        ))}
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const experiences: ExperienceData[] = [
    {
      period: "June 1 - September 1, 2024",
      organization: "Universe IT Institute",
      description: [
        "Completed a 3-month internship as a MERN Stack Developer.",
        "Gained hands-on experience in full-stack development using React, Node.js, MongoDB, and Express.",
        "Collaborated on real-world projects to enhance technical and teamwork skills."
      ]
    },
    {
      period: "October 2024 - Present",
      organization: "Developer Look",
      description: [
        "Currently working as a developer.",
        "Focusing on building robust and efficient web applications using the MERN stack.",
        "Enhancing coding proficiency and project management skills."
      ]
    },
    {
      period: "February - April 2024",
      organization: "Team Collaboration",
      description: [
        "Participated in a dedicated team for practicing and improving skills.",
        "Worked on problem-solving tasks and mock projects to strengthen team collaboration.",
        "Focused on continuous learning and sharing knowledge with peers."
      ]
    }
  ]

  const technologyCategories: TechnologyCategory[] = [
    {
      name: "Frontend Development",
      icon: <Layout className="w-full h-full" />,
      technologies: [
        { name: "React.js", icon: <FaReact className="text-2xl" /> },
        { name: "Next.js", icon: <Globe size={24} /> },
        { name: "TypeScript", icon: <SiTypescript className="text-2xl" />},
        { name: "Redux", icon: <SiRedux className="text-2xl" /> },
        { name: "Tailwind CSS", icon: <RiTailwindCssFill className="text-2xl" /> },
        { name: "Material-UI", icon: <SiMui className="text-2xl" />},
        { name: "HTML5", icon: <FaHtml5 className="text-2xl" /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-2xl" /> }
      ]
    },
    {
      name: "Backend Development",
      icon: <Server className="w-full h-full" />,
      technologies: [
        { name: "Node.js", icon: <FaNodeJs className="text-2xl" /> },
        { name: "Express.js", icon: <SiExpress className="text-2xl" /> },
        { name: "MongoDB", icon: <Database size={24} /> },
        { name: "Mongoose", icon: <Database size={24} /> },
        { name: "REST APIs", icon: <Globe size={24} /> },
        { name: "Socket.io", icon: <SiSocketdotio className="text-2xl" /> },
        { name: "JWT", icon: <SiJsonwebtokens className="text-2xl" /> }
      ]
    },
    {
      name: "Development Tools",
      icon: <Settings className="w-full h-full" />,
      technologies: [
        { name: "Git", icon: <GitBranch size={24} /> },
        { name: "VS Code", icon: <VscVscode className="text-2xl" /> },
        { name: "Postman", icon: <SiPostman className="text-2xl" /> },
        { name: "npm", icon: <RiNpmjsFill className="text-2xl" /> },
        { name: "MongoDB Compass", icon: <Database size={24} /> },
        { name: "GitHub", icon: <GitBranch size={24} /> },
        { name: "Terminal", icon: <Terminal size={24} /> },
        {name: 'Cursor', icon: <FiBox className="text-2xl" />}
      ]
    },
    {
      name: "Deployment & Testing",
      icon: <Cloud className="w-full h-full" />,
      technologies: [
        { name: "Vercel", icon: <RiVercelLine className="text-2xl" /> },
        { name: "Netlify", icon: <SiNetlify className="text-2xl" /> },
      ]
    }
  ]

  return (
    <section id="experience" className="text-foreground py-20">
    <div className="container mx-auto px-4">
      <div className="space-y-16">
        {/* Header */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-primary font-bold">MY EXPERIENCE</h3>
          <h2 className="text-4xl md:text-5xl font-bold">
            Experience & <span className="text-primary">Technologies</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground text-lg">
              A MERN stack developer focused on building scalable and efficient web applications
              with modern technologies.
            </p>
          </div>
        </motion.div>
  
        {/* Experience Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} index={index} />
          ))}
        </motion.div>
  
        {/* Technology Categories */}
        <div className="space-y-12">
          {technologyCategories.map((category, index) => (
            <CategorySection key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}
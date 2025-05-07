import { Card } from "@/components/ui/card"
import SectionTitle from "./section-title"
import { Technology, TechnologyCategory } from "@/type"
import { experiences } from "@/data/experiences&Technologies/experiences"
import { technologyCategories } from "@/data/experiences&Technologies/technologies"
import { motion } from "framer-motion"

// Refined animations with slightly more subtle effects
const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

interface ExperienceCardProps {
  period: string
  organization: string
  description: string[]
  index: number
}

function ExperienceCard({ period, organization, description }: ExperienceCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-background border border-border/30 p-7 space-y-4 hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden">
        {/* Subtle accent line on the left side */}
        <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
        
        <div className="pl-2">
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">{period}</p>
          <h3 className="text-foreground text-xl font-bold mt-2">{organization}</h3>
          
          <div className="mt-4 space-y-2">
            {description.map((line, index) => (
              <div key={index} className="flex items-start">
                <div className="text-primary mr-2 mt-1">•</div>
                <p className="text-muted-foreground">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function TechnologyCard({ tech }: { tech: Technology }) {
  return (
    <motion.div
      className="group flex flex-col items-center justify-center p-4 bg-background border border-border/30 rounded-lg hover:border-primary/40 transition-all duration-300"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="text-primary mb-3 transition-transform duration-300 group-hover:scale-105 text-xl">
        {tech.icon}
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
        <div className="text-primary w-8 h-8">
          {category.icon}
        </div>
        <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {category.technologies.map((tech, index) => (
          <TechnologyCard key={index} tech={tech} />
        ))}
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="text-foreground py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          {/* Header */}
          <SectionTitle
            subtitle="A MERN stack developer focused on building scalable and efficient web applications with modern technologies."
            title1="PROFESSIONAL JOURNEY"
            title2={{
              base: 'Experience &',
              active: 'Technical Expertise'
            }}
          />
          
          {/* Experience Cards */}
          <div className="relative">
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} {...exp} index={index} />
              ))}
            </motion.div>
            
            {/* Subtle decorative element */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-70" />
          </div>

          {/* Technology Categories */}
          <div className="space-y-16 pt-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                Technical <span className="text-primary">Proficiencies</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Technologies and tools I've mastered throughout my professional career
              </p>
            </div>
            
            {technologyCategories.map((category, index) => (
              <CategorySection key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
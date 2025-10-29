
import {
  Code, BrainCircuit, Laptop, BookOpen,
  Building
} from 'lucide-react';
import SectionTitle from "./section-title";
import { technologyCategories } from "@/data/experiences&Technologies/technologies";
import { experiences } from "@/data/experiences&Technologies/experiences";
import SubtleGridBg from "./subtle-grid-bg";
import ESCExperienceCard from "./experience-section-components/esc-experience-card";
import ESCTechCategory from "./experience-section-components/esc-tech-category";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-24 bg-gradient-to-tl from-background via-background to-background/90 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid background */}
        <SubtleGridBg />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30"></div>

        {/* Decorative elements */}
        <div className="absolute top-40 right-[20%] w-16 h-16 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-60 left-[15%] w-12 h-12 border border-primary/10 rounded-full"></div>
        <div className="absolute top-1/3 left-[10%] w-8 h-8 bg-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-20">
        {/* Section Header */}
        <SectionTitle
          title1="PROFESSIONAL JOURNEY"
          title2={{
            active: 'Technical Expertise ',
            base: 'Experience &'
          }}
          subtitle="A Backend developer focused on building scalable and efficient web applications with modern technologies."
        />

        {/* Experience Timeline */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Building className="w-6 h-6 text-primary" />
            Professional & Educational Background
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <ESCExperienceCard key={index} experience={exp} />
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-16 pt-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
              <BrainCircuit className="w-6 h-6 text-primary" />
              Technical Proficiencies
            </h3>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Technologies and tools I&lsquo;ve mastered throughout my professional career
            </p>
          </div>

          <div className="space-y-16">
            {technologyCategories.map((category, index) => (
              <ESCTechCategory key={index} category={category} />
            ))}
          </div>
        </div>

        {/* Highlighted Skills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
          {[
            { label: "Problem Solving", icon: <BrainCircuit className="w-5 h-5" /> },
            { label: "Clean Code", icon: <Code className="w-5 h-5" /> },
            { label: "Responsive Design", icon: <Laptop className="w-5 h-5" /> },
            { label: "Continuous Learning", icon: <BookOpen className="w-5 h-5" /> }
          ].map((skill, index) => (
            <div
              key={index}
              className="p-6 bg-background/50 border border-border rounded-xl backdrop-blur-sm shadow-lg flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 mb-3 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {skill.icon}
              </div>
              <h4 className="font-medium">{skill.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

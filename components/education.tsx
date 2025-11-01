import { Card } from "@/components/ui/card";
import {
  GraduationCap, Calendar, Medal,
  BookOpen, School
} from 'lucide-react';
import SectionTitle from "./section-title";
import SubtleGridBg from "./subtle-grid-bg";
import { educationData } from "@/data/education/education";
import { Education } from "@/type";

function EducationCard({ education, index }: { education: Education, index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative flex items-center">
      {/* Timeline content */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}>
        <Card className="bg-background/50 border border-border/60 p-6 space-y-3 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
          <div className={`flex items-center gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <School className="h-4 w-4" />
            </div>
            <p className="text-muted-foreground text-sm font-medium">{education.period}</p>
          </div>
          
          <h3 className="text-foreground text-xl font-bold">{education.institution}</h3>
          
          <div className={`space-y-2 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            <div className={`flex items-center gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
              <GraduationCap className="text-primary h-4 w-4" />
              <p className="text-muted-foreground">{education.degree}</p>
            </div>
            <div className={`flex items-center gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
              <BookOpen className="text-primary h-4 w-4" />
              <p className="text-muted-foreground">{education.field}</p>
            </div>
            <div className={`flex items-center gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
              <Medal className="text-primary h-4 w-4" />
              <p className="text-muted-foreground font-medium">{education.gpa}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Timeline dot - centered */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
    </div>
  );
}

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative py-24 bg-gradient-to-br from-background via-background to-background/90 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <SubtleGridBg />
        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        {/* Decorative elements */}
        <div className="absolute top-60 left-[20%] w-16 h-16 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-40 right-[15%] w-12 h-12 border border-primary/10 rounded-full"></div>
        <div className="absolute top-1/2 right-[10%] w-8 h-8 bg-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-20">
        {/* Section Header */}
        <SectionTitle
          title1="ACADEMIC JOURNEY"
          title2={{
            active: 'Background',
            base: 'Educational '
          }}
          subtitle="My academic path that has shaped my knowledge and technical foundation in computer technology."
        />

        {/* Education Timeline */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Education & Qualifications
          </h3>

          {/* Timeline container */}
          <div className="relative">
            {/* Vertical line - hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {educationData.map((edu, index) => (
                <EducationCard key={index} education={edu} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Educational Highlights
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
          {[
            { label: "Technical Training", icon: <School className="w-5 h-5" /> },
            { label: "Project-Based Learning", icon: <BookOpen className="w-5 h-5" /> },
            { label: "Academic Excellence", icon: <Medal className="w-5 h-5" /> },
            { label: "Continuous Learning", icon: <Calendar className="w-5 h-5" /> }
          ].map((skill, index) => (
            <div
              key={index}
              className="p-6 bg-background/50 border border-border rounded-xl backdrop-blur-sm shadow-lg flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 mb-3 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {skill.icon}
              </div>
              <h4 className="font-medium">{skill.label}</h4>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
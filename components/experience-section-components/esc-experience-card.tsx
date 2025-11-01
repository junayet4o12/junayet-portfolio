import { ExperienceData } from '@/type';
import { Card } from '../ui/card';
import { ChevronRight } from 'lucide-react';

export default function ESCExperienceCard({ experience }: { experience: ExperienceData }) {
  return (
    <Card className="bg-background/50 border border-border/60 p-7 space-y-4 hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden backdrop-blur-sm">
      {/* Subtle accent line on the left side */}
      <div className="absolute left-0 top-0 w-1 h-full bg-primary" />

      <div className="pl-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
            {experience.organization.slice(0, 1)}
          </div>
          <p className="text-muted-foreground text-sm font-medium">{experience.period}</p>
        </div>

        <h3 className="text-foreground text-xl font-bold mt-3">{experience.organization}</h3>
        <p className="text-primary/90 font-medium mt-1">{experience.role}</p>

        <div className="mt-4 space-y-2">
          {experience.description.map((line, index) => (
            <div key={index} className="flex items-start">
              <ChevronRight className="text-primary h-4 w-4 mr-2 mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

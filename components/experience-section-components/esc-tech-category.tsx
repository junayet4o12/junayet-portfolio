import { TechnologyCategory } from '@/type';
import ESCTechCard from './esc-tech-card';

export default function ESCTechCategory({ category }: { category: TechnologyCategory }) {
  const coreTechnologies = category.technologies.filter(tech => tech.isCore);
  const otherTechnologies = category.technologies.filter(tech => !tech.isCore);

  return (
    <div
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 pb-2 border-b border-border/50">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {category.icon}
        </div>
        <h3 className="text-xl font-bold">{category.name}</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {[...coreTechnologies, ...otherTechnologies].map((tech, index) => (
          <ESCTechCard key={index} tech={tech} />
        ))}
      </div>
    </div>
  );
}
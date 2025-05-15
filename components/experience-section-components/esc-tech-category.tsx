import { TechnologyCategory } from '@/type';
import {motion} from 'framer-motion'
import ESCTechCard from './esc-tech-card';
import { useState } from 'react';
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
export default function ESCTechCategory({ category }: { category: TechnologyCategory }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const coreTechnologies = category.technologies.filter(tech => tech.isCore);
  const otherTechnologies = category.technologies.filter(tech => !tech.isCore);

  return (
    <motion.div
      variants={itemVariants}
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
          <ESCTechCard index={index} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} key={`core-${index}`} tech={tech} />
        ))}
      </div>
    </motion.div>
  );
}
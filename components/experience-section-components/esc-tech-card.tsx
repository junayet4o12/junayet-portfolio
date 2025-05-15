import { Technology } from '@/type';
import { AnimatePresence, motion } from 'framer-motion'
import { Badge } from '../ui/badge';
import { Dispatch, SetStateAction } from 'react';
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};
export default function ESCTechCard({ tech, hoveredIndex, index, setHoveredIndex }: { tech: Technology; hoveredIndex: number | null; index: number; setHoveredIndex: Dispatch<SetStateAction<number | null>> }) {
    return (
        <motion.div
            initial="hidden"
            whileInView={'visible'}
            viewport={{ once: true }}
            variants={itemVariants}
            className='p-2 relative'
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <AnimatePresence>
                {hoveredIndex === index && (
                    <motion.span
                        className="absolute inset-0 h-full w-full bg-primary/10 block  rounded-lg"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.15 },
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.15, delay: 0.2 },
                        }}
                    />
                )}
            </AnimatePresence>
            <div

                className={`bg-background/50 relative border rounded-lg p-4 transition-all duration-300 backdrop-blur-sm
            ${tech.isCore
                        ? "border-primary/40 shadow-sm shadow-primary/10"
                        : "border-border/60 hover:border-primary/30"}`}>

                <div className="flex gap-2 flex-col relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${tech.isCore
                            ? "bg-primary/15 text-primary"
                            : "bg-primary/10 text-primary/80"}`}>
                        {tech.icon}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium line-clamp-1">{tech.name}</span>

                    </div>
                    {tech.isCore && (
                        <Badge variant="outline" className="bg-background/30 backdrop-blur-sm text-xs font-normal py-0 px-2 h-5 border-primary/20 absolute right-3">
                            Core
                        </Badge>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

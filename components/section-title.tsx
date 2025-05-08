

import { motion } from 'framer-motion'
type PropTypes = {
    title1: string;
    title2: {
        base: string;
        active: string;
    };
    subtitle: string;
}
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};
export default function SectionTitle({
    title1,
    title2,
    subtitle
}: PropTypes) {

    return (
        <motion.div variants={itemVariants} className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                {title1}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight">
                {title2.base} <span className="text-primary">{title2.active}</span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-lg">
                {subtitle}
            </p>
        </motion.div>
    );
}


import { motion } from 'framer-motion'
type PropTypes = {
    title1: string;
    title2: {
        base: string;
        active: string;
    };
    subtitle: string;
}
export default function SectionTitle({
    title1,
    title2,
    subtitle
}: PropTypes) {
    return (
        <div className="space-y-4">
            <motion.h3
                className="text-primary font-bold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                {title1}
            </motion.h3>
            <motion.h2
                className="text-4xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                {title2.base} <span className="text-primary">{title2.active}</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground">
                {subtitle}
            </motion.p>
        </div>
    );
}
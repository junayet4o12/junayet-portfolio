'use client'

import { motion } from 'framer-motion'
export function ImageAnimationBuble() {
    return <motion.div
        animate={{
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="absolute inset-0"
    >
        {[...Array(6)].map((_, i) => (
            <div
                key={i}
                className="absolute w-3 h-3 bg-primary rounded-full"
                style={{
                    top: `${50 + 45 * Math.sin(i * (Math.PI / 3))}%`,
                    left: `${50 + 45 * Math.cos(i * (Math.PI / 3))}%`,
                    opacity: 0.3 + (i % 3) * 0.1
                }}
            />
        ))}
    </motion.div>
}

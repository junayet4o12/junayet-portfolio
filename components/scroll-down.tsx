'use client'
import { motion, Variants } from 'framer-motion'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // ✅ Cast properly
    },
  },
};

export default function ScrollDown() {
  const handleScrollToAbout = () => {
    const projectsSection = document.querySelector('#about');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2"
    >
      <span className="text-xs text-muted-foreground">Scroll to explore</span>
      <div
        onClick={handleScrollToAbout}
        className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2 cursor-pointer"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-1.5 h-1.5 bg-primary rounded-full"
        />
      </div>
    </motion.div>
  );
}

"use client"
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > window.innerHeight * 0.5) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

  };

  return (
    <div className="w-9 ml-auto">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-8 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="icon"
              onClick={scrollToTop}
              className="bg-primary shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 text-background"
              aria-label="Scroll to top"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowUp size={20} />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
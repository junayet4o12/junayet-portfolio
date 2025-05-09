'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
import SubtleGridBg from "./subtle-grid-bg";
import { FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mounts to enable animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Individual item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <footer id="contact" className="relative bg-gradient-to-br from-background/95 via-background to-background/90 border-t border-border/50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid background */}
        <SubtleGridBg />
        {/* Gradient orb */}
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-40"></div>
      </div>



      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Logo & About */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-background shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300">
                <span className="font-bold text-lg">J</span>
              </div>
              <span className="text-foreground text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">JUNAYET</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Welcome to my portfolio! I specialize in creating dynamic and responsive web applications using the MERN stack with a focus on clean code and intuitive user experiences.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link
                href="https://www.github.com/junayet4o12"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-background/50 border border-border hover:border-primary/60 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Github size={16} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/junayet-alam/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-background/50 border border-border hover:border-primary/60 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Linkedin size={16} />
              </Link>
              <Link
                href="https://wa.me/8801632884012"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-background/50 border border-border hover:border-primary/60 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <FaWhatsapp size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <h3 className="font-bold text-foreground">Quick Links</h3>
            </div>

            <ul className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <h3 className="font-bold text-foreground">Contact Info</h3>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground group">
                <MapPin size={16} className="text-primary/70 group-hover:text-primary transition-colors duration-200" />
                <span className="group-hover:text-foreground transition-colors duration-200">Feni, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground group">
                <Phone size={16} className="text-primary/70 group-hover:text-primary transition-colors duration-200" />
                <span className="group-hover:text-foreground transition-colors duration-200">+8801632884012</span>
              </li>
              <li className="flex gap-3 text-muted-foreground group">
                <Mail size={16} className="text-primary/70 group-hover:text-primary transition-colors duration-200 mt-1" />
                <span className="group-hover:text-foreground transition-colors duration-200 break-all">muhammadjunayetmaruf@gmail.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <h3 className="font-bold text-foreground">Stay Updated</h3>
            </div>

            <p className="text-muted-foreground text-sm">
              Subscribe to receive updates about new projects and tech insights.
            </p>

            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="h-10 bg-background/50 border border-border focus:border-primary/60 rounded-l-lg px-3 outline-none text-sm flex-grow"
              />
              <button className="h-10 bg-primary/90 hover:bg-primary text-background font-medium rounded-r-lg px-4 text-sm transition-colors duration-200">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-muted-foreground/70">
              I respect your privacy. No spam, ever.
            </p>
          </motion.div> */}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <p className="text-muted-foreground text-sm">© 2025 Junayet. All rights reserved.</p>
          </div>

          {/* <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
          </div> */}
        </motion.div>
      </div>
    </footer>
  );
}
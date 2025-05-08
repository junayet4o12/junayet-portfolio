'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "./ui/badge";
import { Facebook, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
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
        delayChildren: 0.2
      }
    }
  };
  
  // Individual item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-[15%] w-20 h-20 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-32 left-[10%] w-12 h-12 border border-primary/10 rounded-full"></div>
        <div className="absolute top-1/2 left-[5%] w-6 h-6 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-[5%] w-8 h-8 bg-primary/10 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6 max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              GET IN TOUCH
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="block text-foreground">Let&apos;s talk on something</span>
              <span className="text-primary mt-2">great together</span>
            </h2>
          </motion.div>

          {/* Contact Card */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-30 blur-xl"></div>
            
            <div className="relative bg-background/60 backdrop-blur-sm border border-primary/20 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="space-y-6">
                    <h3 className="text-2xl font-bold">Contact Information</h3>
                    <p className="text-muted-foreground">
                      Feel free to reach out for collaborations, job opportunities, or just to say hello!
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-6 text-foreground">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">muhammadjunayetmaruf@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">+8801632884012</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">Feni, Bangladesh</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-6">
                    <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                    <div className="flex items-center gap-3">
                      <Link
                        href="https://www.github.com/junayet4o12"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 bg-background border border-border hover:border-primary/60 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Github size={18} />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/junayet-alam/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 bg-background border border-border hover:border-primary/60 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Linkedin size={18} />
                      </Link>
                      <Link
                        href="https://www.facebook.com/junayet4012/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 bg-background border border-border hover:border-primary/60 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Facebook size={18} />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Form */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                      Web Development
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                      Web App
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                      Problem Solving
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <Input
                      placeholder="Your name"
                      className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                    />

                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                    />

                    <Textarea
                      placeholder="Your message"
                      className="min-h-[150px] bg-background/50 border-border focus-visible:border-primary/50 rounded-xl resize-none"
                    />

                    <Button 
                      className="w-full h-12 group rounded-xl font-medium"
                    >
                      Send Message
                      <motion.div
                        className="ml-2"
                        animate={{ 
                          x: [0, 4, 0],
                          transition: { duration: 1.5, repeat: Infinity }
                        }}
                      >
                        →
                      </motion.div>
                    </Button>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      I&apos;ll get back to you as soon as possible
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
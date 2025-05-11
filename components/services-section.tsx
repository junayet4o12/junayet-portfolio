'use client'
import { motion } from "framer-motion";
import { ArrowRight, Code2, UsersRound, Workflow } from 'lucide-react';
import SectionTitle from "./section-title";
import SubtleGridBg from "./subtle-grid-bg";

export default function ServicesSection() {

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
      id="services"
      className="relative py-24 bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid background */}
        <SubtleGridBg />

        {/* Gradient orbs */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-[15%] w-20 h-20 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-32 right-[10%] w-12 h-12 border border-primary/10 rounded-full"></div>
        <div className="absolute top-1/2 right-[5%] w-6 h-6 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-1/4 left-[5%] w-8 h-8 bg-primary/10 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">

        <motion.div
          initial="hidden"
           whileInView={'visible'}
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-16"
        >
          <SectionTitle
            title1="WHAT I DO"
            title2={{
              base: 'MY SERVICES &',
              active: 'EXPERTISE'
            }}
            subtitle="I specialize in building modern web applications with clean code, scalable architecture, 
              and elegant UI using the MERN stack and Tailwind."
          />
          {/* Services Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Code2 className="h-10 w-10" />}
              title="MERN STACK DEVELOPMENT"
              description="Modern full-stack apps using MongoDB, Express, React, and Node.js with clean code, REST APIs, and secure architecture."
            />

            <ServiceCard
              icon={<Workflow className="h-10 w-10" />}
              title="INDUSTRY-STANDARD WORKFLOW"
              description="Using professional workflows including branching strategies, pull requests, code reviews, and modular design for maintainability."
              featured={true}
            />

            <ServiceCard
              icon={<UsersRound className="h-10 w-10" />}
              title="TEAM-BASED MERN PROJECTS"
              description="Built scalable MERN apps with teammates, managing roles like frontend/backend, deployment, and API design collaboratively."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

function ServiceCard({ icon, title, description, featured = false }: ServiceCardProps) {
  return (
    <div className="group relative">
      <div className={`
        relative h-full overflow-hidden rounded-2xl p-8 border 
        ${featured
          ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30'
          : 'bg-background border-border hover:border-primary/30'}
        transition-all duration-300
      `}>
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Service icon */}
        <div className={`
          mb-6 w-16 h-16 rounded-full flex items-center justify-center
          ${featured
            ? 'bg-primary/20 text-primary'
            : 'bg-primary/10 text-primary'}
          group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300
        `}>
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-4 tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          {description}
        </p>

        {/* Action link */}
        <div className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-300">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Featured indicator */}
        {featured && (
          <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Bottom glow effect for featured card */}
      {featured && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-primary/30 rounded-full blur-md"></div>
      )}
    </div>
  );
}
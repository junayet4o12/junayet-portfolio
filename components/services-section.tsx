'use client'

import { motion } from "framer-motion"
import { ArrowRight, Code2, UsersRound, Workflow } from 'lucide-react'
import SectionTitle from "./section-title";

export default function ServicesPage() {
  return (
    <div className="bg-muted/30">
      <div className="relative container mx-auto px-4 py-24 ">

        {/* Content */}
        <div className="relative z-10 space-y-16">
          {/* Header Section */}
          <SectionTitle
            subtitle="I specialize in building modern web applications with clean code, scalable architecture, and elegant UI using the MERN stack and Tailwind."
            title1="WHAT I DO"
            title2={{ base: 'MY SERVICES &', active: ' EXPERTISE' }}
          />
          {/* Services Grid */}
          <div className="pb-24">
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Code2 className="w-10 h-10 text-primary" />}
                title="MERN STACK DEVELOPMENT"
                description="Modern full-stack apps using MongoDB, Express, React, and Node.js with clean code, REST APIs, and secure architecture."
                delay={0.2}
                isActive={false}
              />

              <ServiceCard
                icon={<Workflow className="w-10 h-10 text-primary" />}
                title="INDUSTRY-STANDARD WORKFLOW"
                description="Using professional workflows including branching strategies, pull requests, code reviews, and modular design for maintainability."
                delay={0.6}
                isActive={true}
              />

              <ServiceCard
                icon={<UsersRound className="w-10 h-10 text-primary" />}
                title="TEAM-BASED MERN PROJECTS"
                description="Built scalable MERN apps with teammates, managing roles like frontend/backend, deployment, and API design collaboratively."
                delay={0.8}
                isActive={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  delay: number;
  isActive?: boolean;
  description: string;
}

function ServiceCard({ icon, title, delay, isActive = false, description }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div
        className={`
    relative group overflow-hidden rounded-2xl p-8 h-full
    ${isActive
            ? 'bg-gradient-to-br from-primary/40 to-primary/50'
            : 'bg-card hover:bg-primary/40'}
    transition-all duration-500
  `}
      >
        {/* background circles remain as-is */}
        <div className={`bg-primary/80 w-[100px] aspect-square absolute bottom-[20px] right-[20px] rounded-full  scale-0 group-hover:scale-100 transition-all duration-500 origin-bottom-right ${isActive ? 'scale-100' : ''}`} />
        <div className={`bg-primary/50 w-[150px] aspect-square absolute bottom-[0px] right-[0px] rounded-full  scale-0 group-hover:scale-100 transition-all duration-500 origin-bottom-right ${isActive ? 'scale-100' : ''}`} />
        <div className={`bg-primary/40 w-[200px] aspect-square absolute bottom-[0px] right-[0px] rounded-full  scale-0 group-hover:scale-100 transition-all duration-500 origin-bottom-right ${isActive ? 'scale-100' : ''}`} />
        <div className={`bg-primary/30 w-[300px] aspect-square absolute bottom-[-40px] right-[-40px] rounded-full scale-0 group-hover:scale-100 transition-all duration-500 origin-bottom-right ${isActive ? 'scale-100' : ''}`} />

        <div className={`
    w-16 h-16 mb-8 transition-transform duration-500
    ${isActive ? 'text-foreground' : 'text-primary group-hover:text-foreground'}
    group-hover:scale-110
  `}>
          {icon}
        </div>

        <h3 className={`relative
    text-xl font-bold mb-4 tracking-wide
    ${isActive ? 'text-foreground' : 'text-primary group-hover:text-foreground'}
  `}>
          {title}
        </h3>

        <p className={`relative
    text-sm leading-relaxed mb-8
    ${isActive ? 'text-foreground/90' : 'text-muted-foreground group-hover:text-foreground'}
  `}>
         {description}
        </p>

        <div className={`relative
    inline-flex items-center text-sm font-medium
    text-foreground
  `}>
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </div>

        {!isActive && (
          <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-primary" />
        )}
      </div>
    </motion.div>
  )
}

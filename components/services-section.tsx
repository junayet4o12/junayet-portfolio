'use client'

import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen relative">
      {/* Gradient Background */}
      <div className="relative container mx-auto px-4">

        {/* Content */}
        <div className="relative z-10">
          {/* Header Section */}
          <div className="pt-24 pb-20 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-medium tracking-wider text-sm mb-4">
                WHAT WE DO
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <motion.h1
                className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                SERVICES AND{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/70 to-primary">
                  SOLUTIONS
                </span>
              </motion.h1>

              <motion.p
                className="text-muted-foreground text-lg md:max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Sint Ratione Reprehenderit, Error Qui Enim Sit Ex Provident
              </motion.p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="pb-24">
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard
                icon={<DesignIcon />}
                title="DESIGN PRINCIPLES"
                delay={0.2}
                isActive={false}
              />
              <ServiceCard
                icon={<ValuesIcon />}
                title="UNIQUE VALUES"
                delay={0.4}
                isActive={true}
              />
              <ServiceCard
                icon={<ComponentsIcon />}
                title="STYLE COMPONENTS"
                delay={0.6}
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
}

function ServiceCard({ icon, title, delay, isActive = false }: ServiceCardProps) {
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
          Need A Project Completed By An Expert? Let&lsquo;s Go! Access A Human Resources Consultant To Answer Questions
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

function DesignIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="12" y="12" width="30" height="30" transform="rotate(15 12 12)" className="fill-current" />
      <circle cx="42" cy="42" r="15" className="fill-current opacity-50" />
    </svg>
  )
}

function ValuesIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="32" cy="32" r="25" className="fill-current" />
      <circle cx="45" cy="20" r="5" className="fill-current" />
    </svg>
  )
}

function ComponentsIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="12" y="12" width="20" height="20" className="fill-current" />
      <rect x="32" y="32" width="20" height="20" className="fill-current" />
    </svg>
  )
}

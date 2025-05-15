'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useRef, } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { projects } from '@/data/projects/projects'
import ProjectCard from './project-card'
import SectionTitle from "./section-title"
import SubtleGridBg from "./subtle-grid-bg"

export default function LatestProjectsSection() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)


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
  }

  // Individual item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section
      id="projects"
      className="relative py-24 bg-gradient-to-br from-background via-background to-background/90 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid background */}
        <SubtleGridBg />

        {/* Gradient orbs */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>

        {/* Decorative elements */}
        <div className="absolute top-40 left-[15%] w-20 h-20 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-[10%] w-12 h-12 border border-primary/10 rounded-full"></div>
        <div className="absolute top-1/3 right-[5%] w-6 h-6 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-[5%] w-8 h-8 bg-primary/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView={'visible'}
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Header */}
          <SectionTitle
            title1=" WORKING PROCESS"
            title2={{
              active: 'PROJECTS',
              base: 'LATEST WORKING &'
            }}
            subtitle="  From planning to deployment, I follow modern practices to build reliable,
              scalable, and production-ready web applications."
          />

          {/* Project Navigation */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="flex gap-3 ml-auto max-w-max">

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  ref={prevRef}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background border border-primary/20 hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  ref={nextRef}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background border border-primary/20 hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Project Cards Slider */}
            <motion.div variants={itemVariants}>
              <Swiper
                modules={[Navigation]}
                spaceBetween={27}
                slidesPerView={1}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  // @ts-expect-error: Swiper types don't allow manual assignment
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-expect-error: Swiper types don't allow manual assignment
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {projects.map((project, index) => (
                  <SwiperSlide key={index}>
                    <ProjectCard project={project} />
                  </SwiperSlide>
                ))}

              </Swiper>
            </motion.div>

            {/* Additional project stats - Optional */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8"
            >
              {[
                { label: 'Completed Projects', value: projects.filter(p => p.status === 'completed').length },
                { label: 'In Progress', value: projects.filter(p => p.status === 'in progress').length },
                { label: 'Technologies', value: '15+' },
                { label: 'Client Satisfaction', value: '100%' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-background border border-primary/10 p-4 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
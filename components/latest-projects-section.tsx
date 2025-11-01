// 'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { projects } from '@/data/projects/projects'
import ProjectCard from './project-card'
import SectionTitle from "./section-title"
import SubtleGridBg from "./subtle-grid-bg"

export default function LatestProjectsSection() {
 



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
        <div
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

          {/* Project Navigation and Carousel */}
          <div className="space-y-8">
            {/* Project Cards Carousel */}
            <div>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {projects.map((project, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <ProjectCard project={project} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Custom styled navigation buttons */}
                <div className="flex gap-3 justify-end mt-8">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full bg-background border border-primary/20 hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                  </CarouselPrevious>
                  <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full bg-background border border-primary/20 hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </CarouselNext>
                </div>
              </Carousel>
            </div>

            {/* Additional project stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-8"
            >
              {[
                { label: 'Completed Projects', value: 10},
                { label: 'In Progress', value: 3},
                { label: 'Technologies', value: '30+' },
                // { label: 'Client Satisfaction', value: '100%' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-background border border-primary/10 p-4 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { useRef } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { projects } from '@/data/projects/projects'
import ProjectCard from './project-card'



export default function LatestProjectsSection() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <section id="projects" className=" py-24">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {/* Header */}
          <motion.div
            className="flex justify-between items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <motion.h3
                className="text-primary font-bold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                WORKING PROCESS
              </motion.h3>
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                LATEST WORKING <span className="text-primary">PROJECT</span>
              </motion.h2>
            </div>
            <motion.div
              className="hidden md:flex items-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="border-l-4 border-primary pl-6 mr-8">
                <p className="text-muted-foreground text-lg">
                  Lorem Ipsum Dolor Sit Amet, Consectetur
                  Adipisicing Elit. Sint Ratione Reprehenderit
                </p>
              </div>
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    ref={prevRef}
                    variant="outline"
                    size="icon"
                    className="bg-background border hover:bg-muted"
                  >
                    <ChevronLeft  className="h-4 w-4 text-foreground" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    ref={nextRef}
                    variant="outline"
                    size="icon"
                     className="bg-background border hover:bg-muted"
                  >
                    <ChevronRight  className="h-4 w-4 text-foreground" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Project Cards Slider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={false}
              onBeforeInit={(swiper) => {
                // @ts-expect-error: Swiper types don't allow manual assignment of prevEl
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-expect-error: Swiper types don't allow manual assignment of nextEl
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
              className="!pb-12"
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Mobile Navigation */}
          <motion.div
            className="flex justify-center gap-2 md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                ref={prevRef}
                variant="outline"
                size="icon"
               className="bg-background border hover:bg-muted"
              >
                <ChevronLeft  className="h-4 w-4 text-foreground" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                ref={nextRef}
                variant="outline"
                size="icon"
                className="bg-background border hover:bg-muted"
              >
                <ChevronRight  className="h-4 w-4 text-foreground" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
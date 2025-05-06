import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { useRef } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, title, description }) => {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-background border-none overflow-hidden group h-full">
        <div className="relative h-64 md:h-80">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300"
            />
          </motion.div>
        </div>
        <motion.div
          className="p-6 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
         <h3 className="text-xl font-bold text-foreground">{title}</h3>
         <p className="text-muted-foreground">{description}</p>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default function LatestProjectsSection() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const projects = [
    {
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-10%20121120-xiYXh8v0bkNUkTNngtphblD11mxVyx.png",
      title: "Food Service Website",
      description: "We serve food but with a purpose."
    },
    {
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-10%20121120-xiYXh8v0bkNUkTNngtphblD11mxVyx.png",
      title: "Architecture Company Website",
      description: "We do big things with big ideas."
    },
    {
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-10%20121120-xiYXh8v0bkNUkTNngtphblD11mxVyx.png",
      title: "Catering Service Website",
      description: "Catering by chefs for people with taste buds."
    },
    {
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-10%20121120-xiYXh8v0bkNUkTNngtphblD11mxVyx.png",
      title: "Catering Service Website",
      description: "Catering by chefs for people with taste buds."
    },
    {
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-10%20121120-xiYXh8v0bkNUkTNngtphblD11mxVyx.png",
      title: "Catering Service Website",
      description: "Catering by chefs for people with taste buds."
    }
  ]

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
                  <ProjectCard {...project} />
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
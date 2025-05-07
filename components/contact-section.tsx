import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Facebook, Github, Linkedin } from "lucide-react"
import { Badge } from "./ui/badge"
import Link from "next/link"

export default function ContactSection() {
  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <Card className="border-none p-8 md:p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <motion.h1
                className="text-3xl md:text-4xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Let&apos;s talk on something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/70 to-primary">
                  great
                </span>{" "}
                together
              </motion.h1>

              <motion.div
                className="space-y-4 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>muhammadjunayetmaruf@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+8801632884012</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Feni, Bangladesh</span>
                </div>
              </motion.div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <Link
                  href="https://www.facebook.com/junayet4012/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <Button size={'icon'} variant={'outline'}>
                    <Facebook className="w-5 h-5" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/junayet4o12"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Button size={'icon'} variant={'outline'}>
                    <Github className="w-5 h-5" />
                  </Button>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/junayet-alam/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Button size={'icon'} variant={'outline'}>
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap gap-3">
                <Badge variant={"outline"} className="text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 bg-green-100/40 dark:bg-green-800/10 text-xs px-2 py-0.5 rounded-full shadow-sm w-fit">
                  Web Develop
                </Badge>
                <Badge variant={"outline"} className="text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 bg-green-100/40 dark:bg-green-800/10 text-xs px-2 py-0.5 rounded-full shadow-sm w-fit">
                  Web App
                </Badge>
                <Badge variant={"outline"} className="text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 bg-green-100/40 dark:bg-green-800/10 text-xs px-2 py-0.5 rounded-full shadow-sm w-fit">
                  Problem Solving
                </Badge>
              </div>

              <Input
                placeholder="Your name"
                className="h-12 rounded-xl"
              />

              <Input
                type="email"
                placeholder="your@email.com"
                className="h-12 rounded-xl"
              />

              <Textarea
                placeholder="Your message"
                className="min-h-[120px] rounded-xl"
              />

              <Button className="w-full font-medium h-12 rounded-xl">
                Send message
              </Button>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  )
}

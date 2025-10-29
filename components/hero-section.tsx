import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import Resume from "./resume";
import SubtleGridBg from "./subtle-grid-bg";
import { FaWhatsapp } from "react-icons/fa6";
import ScrollDown from "./scroll-down";
import ViewProjectBtn from "./view-project-btn";
import { ImageAnimationBuble } from "./hero-motion-components";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-112px)] flex items-center bg-gradient-to-br from-background via-background to-background/90 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid background */}
        <SubtleGridBg />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-[15%] w-20 h-20 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-32 left-[10%] w-12 h-12 border border-primary/10 rounded-full"></div>
        <div className="absolute top-1/2 left-[5%] w-6 h-6 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-[5%] w-8 h-8 bg-primary/10 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-y-8 gap-x-16 items-center">
          {/* Text content */}
          <div className="space-y-4 lg:space-y-8 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Backend Developer
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight">
                <span className="text-primary">Junayet Alam</span>
                <span className="block mt-2 text-foreground">Building digital experiences.</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed hidden lg:block">
                I create modern, responsive web applications with the MERN stack. Focusing on clean code,
                intuitive user experiences, and performance-optimized solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Resume />
              <ViewProjectBtn />
            </div>

            <div>
              <div className="flex flex-col sm:flex-row gap-6 lg:pt-6 items-start sm:items-center">
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
                    href="https://wa.me/8801632884012"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-background border border-border hover:border-primary/60 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <FaWhatsapp size={18} />
                  </Link>
                </div>

                <div className="hidden sm:block h-8 w-px bg-border/70"></div>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[
                      { tech: 'MongoDB', color: '#13AA52', letter: 'M' },
                      { tech: 'Express', color: '#303030', letter: 'E' },
                      { tech: 'React', color: '#61DAFB', letter: 'R' },
                      { tech: 'Node', color: '#339933', letter: 'N' }
                    ].map((item, i) => (
                      <div
                        key={item.tech}
                        className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center shadow-sm"
                        style={{
                          zIndex: 4 - i,
                          backgroundColor: `${item.color}20`,
                          color: item.color
                        }}
                      >
                        <span className="text-xs font-bold">{item.letter}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">MERN Stack Expertise</span>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <ScrollDown />
          </div>

          {/* Image content */}
          <div className="flex justify-center lg:justify-end relative w-full">
            <div className="relative w-full max-w-md lg:max-w-xl mx-auto lg:mr-0">
              {/* Image frame with decorative elements */}
              <div className="relative w-full aspect-square rounded-full">
                <div className="relative h-full w-full">
                  <div className="absolute -inset-3 bg-gradient-to-tr from-primary/30 via-primary/20 to-transparent rounded-full blur-lg opacity-70"></div>

                  <ImageAnimationBuble />
                  <div className="absolute inset-0 rounded-full border border-primary/30"></div>

                  <div className="absolute inset-2 bg-gradient-to-tr from-primary/10 to-background rounded-full">
                    <div className="absolute inset-2 overflow-hidden rounded-full border-4 border-background shadow-2xl">
                      <Image
                        src='/junayet-alam-profile.png'
                        alt="Junayet Alam - Backend Developer"
                        fill
                        className="object-cover object-center scale-105 mt-5 grayImg"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-4 top-1/4 bg-background shadow-lg rounded-full py-2 px-4 border border-border flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span className="font-bold">3+</span>
                </div>
                <div className="text-xs">
                  <p className="font-medium">Years of</p>
                  <p className="text-muted-foreground">Experience</p>
                </div>
              </div>
              <div
                className="absolute -left-6 bottom-1/4 bg-background shadow-lg rounded-full py-2 px-3 border border-border flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="text-xs font-medium">Currently At <Link className="underline text-blue-400" href={'https://www.linkedin.com/company/smtechnology/'} target="_blank" ><strong>SM Technology</strong></Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

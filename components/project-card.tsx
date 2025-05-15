'use client'

import { ProjectType } from "@/type";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Code, Calendar, Tag, CheckCircle,
  Clock, Info, ArrowUpRight, Github, Globe
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useEffect, useId, useRef, useState } from "react";
import { CardBody, CardContainer} from "@/components/ui/3d-card";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
export default function ProjectCard({ project }: { project: ProjectType }) {
  const [active, setActive] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") {
      return <CheckCircle className="h-4 w-4 text-primary" />;
    } else if (status === "in progress") {
      return <Clock className="h-4 w-4 text-blue-500" />;
    } else {
      return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  // Handle click outside to close expanded card
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node) && active) {
        setActive(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && active) {
        setActive(false);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    
    <>
      {/* Overlay Background */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-40"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card */}
      <AnimatePresence>
        {active ? (
          <Dialog open={active} onOpenChange={setActive}>
            <DialogContent className="!max-w-7xl">
              <DialogTitle className="hidden"></DialogTitle>
              <motion.div
                layoutId={`card-${project.name}-${id}`}
                ref={cardRef}
                className="w-full h-[90vh] flex flex-col bg-background rounded-xl overflow-hidden border border-primary/10 shadow-lg"
              >
                <ScrollArea className="h-full">
                  <div className="space-y-6 p-6">
                    {/* Project Header */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div layoutId={`thumbnail-${project.name}-${id}`} className="relative rounded-xl overflow-hidden shadow-md border border-primary/10">
                        <Carousel className="w-full">
                          <CarouselContent>
                            {project.images.map((img, index) => (
                              <CarouselItem key={index}>
                                <div className="relative aspect-[16/9] w-full overflow-hidden">
                                  <Image
                                    src={img}
                                    alt={`${project.name} image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-2 h-8 w-8 bg-background/70 hover:bg-background" />
                          <CarouselNext className="right-2 h-8 w-8 bg-background/70 hover:bg-background" />
                        </Carousel>
                      </motion.div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <motion.h3 layoutId={`title-${project.name}-${id}`} className="text-2xl font-bold text-foreground">
                            {project.name}
                          </motion.h3>
                          <Badge
                            variant={project.status === "completed" ? "default" : "secondary"}
                            className="flex items-center gap-1"
                          >
                            {getStatusIcon(project.status)}
                            <span>{project.status}</span>
                          </Badge>
                        </div>

                        {/* Full Description */}
                        <motion.div layoutId={`description-${project.name}-${id}`} className="text-muted-foreground">
                          {project.description}
                        </motion.div>

                        {/* Project Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Timeline */}
                          <div className="flex items-center space-x-2 text-sm p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <Calendar className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-xs text-muted-foreground">Duration</div>
                              <div className="font-medium">
                                {formatDate(project.duration.start)} - {project.duration.end === new Date().toLocaleString() ? "Present" : formatDate(project.duration.end)}
                              </div>
                            </div>
                          </div>

                          {/* Project Type */}
                          <div className="flex items-center space-x-2 text-sm p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <Tag className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-xs text-muted-foreground">Project Type</div>
                              <div className="font-medium capitalize">{project.projectType}</div>
                            </div>
                          </div>

                          {/* Role (if team project) */}
                          {project.projectType === "team" && (
                            <div className="flex items-center space-x-2 text-sm p-3 rounded-lg bg-primary/5 border border-primary/10">
                              <Info className="h-4 w-4 text-primary" />
                              <div>
                                <div className="text-xs text-muted-foreground">Role</div>
                                <div className="font-medium">{project.role}</div>
                              </div>
                            </div>
                          )}

                          {/* Team Size (if team project) */}
                          {project.projectType === "team" && (
                            <div className="flex items-center space-x-2 text-sm p-3 rounded-lg bg-primary/5 border border-primary/10">
                              <Info className="h-4 w-4 text-primary" />
                              <div>
                                <div className="text-xs text-muted-foreground">Team Size</div>
                                <div className="font-medium">{project.teamSize} members</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Links */}
                        <div>
                          <h3 className="text-lg font-medium mb-3">Project Links</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.live_link.frontend && (
                              <a
                                href={project.live_link.frontend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 hover:border-primary/60 hover:bg-primary/5 transition-all"
                              >
                                <Globe className="h-4 w-4 text-primary" />
                                <span>Live Frontend</span>
                                <ArrowUpRight className="h-3 w-3 ml-auto" />
                              </a>
                            )}
                            {project.live_link.backend && (
                              <a
                                href={project.live_link.backend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 hover:border-primary/60 hover:bg-primary/5 transition-all"
                              >
                                <Globe className="h-4 w-4 text-primary" />
                                <span>Live Backend</span>
                                <ArrowUpRight className="h-3 w-3 ml-auto" />
                              </a>
                            )}
                            {project.code_repo.frontend && (
                              <a
                                href={project.code_repo.frontend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 hover:border-primary/60 hover:bg-primary/5 transition-all"
                              >
                                <Github className="h-4 w-4 text-primary" />
                                <span>Frontend Repository</span>
                                <ArrowUpRight className="h-3 w-3 ml-auto" />
                              </a>
                            )}
                            {project.code_repo.backend && (
                              <a
                                href={project.code_repo.backend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 hover:border-primary/60 hover:bg-primary/5 transition-all"
                              >
                                <Github className="h-4 w-4 text-primary" />
                                <span>Backend Repository</span>
                                <ArrowUpRight className="h-3 w-3 ml-auto" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features and Technologies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Features */}
                      <div>
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Key Features
                        </h2>
                        <div className="space-y-4">
                          {project.features.map((feature, index) => (
                            <div
                              key={index}
                              className="border-l-2 border-primary/30 pl-4 py-1 hover:border-primary transition-colors"
                            >
                              <h4 className="font-medium text-foreground">{feature.title}</h4>
                              <div
                                className="text-sm text-muted-foreground mt-1"
                                dangerouslySetInnerHTML={{ __html: feature.description }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="space-y-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Technologies
                        </h2>

                        {/* Frontend */}
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <h4 className="font-medium mb-3 text-foreground flex items-center gap-1">
                            <Code className="h-4 w-4 text-primary" />
                            Frontend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technology.frontend.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-background/70">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Backend */}
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <h4 className="font-medium mb-3 text-foreground flex items-center gap-1">
                            <Code className="h-4 w-4 text-primary" />
                            Backend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technology.backend.map((tech) => (
                              <Badge key={tech} variant="outline" className="bg-background/70">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-primary/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Demo Video if exists */}
                    {project.demoVideo && (
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Demo Video
                        </h3>
                        <div className="rounded-xl overflow-hidden border border-primary/10 shadow-md">
                          <iframe
                            src={project.demoVideo}
                            className="w-full aspect-video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </motion.div>
            </DialogContent>
          </Dialog>
        ) : null}
      </AnimatePresence>

      {/* Card Thumbnail (Collapsed State) */}
      <CardContainer
        className="max-w-full"

      >
        <CardBody className="bg-background h-full flex flex-col rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer w-full">
          {/* Thumbnail Image */}
          <motion.div
            layoutId={`thumbnail-${project.name}-${id}`}
            className="relative h-64 overflow-hidden"
            onClick={() => setActive(true)}
          >
            <motion.div
              className="h-full w-full"
            >
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(project.status)}
                    <span className="text-xs uppercase tracking-wider">{project.status}</span>
                  </div>
                  <h3 className="text-lg font-bold">{project.name}</h3>
                </div>
              </div>
            </motion.div>

            {/* Badge */}
            <Badge
              variant={project.status === "completed" ? "default" : "secondary"}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
            >
              {project.status}
            </Badge>
          </motion.div>

          {/* Content */}
          <div   onClick={() => setActive(true)} className="p-6 space-y-4 flex-grow">
            <motion.h3
              layoutId={`title-${project.name}-${id}`}
              className="text-xl font-bold text-foreground group-hover:text-primary transition-colors"
            >
              {project.name}
            </motion.h3>

            <motion.p
              layoutId={`description-${project.name}-${id}`}
              className="text-sm text-muted-foreground line-clamp-3"
            >
              {project.description}
            </motion.p>

            {/* Technologies */}
            <div className="pt-1">
              <div className="flex flex-wrap gap-2">
                {project.technology.frontend.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {(project.technology.frontend.length > 3 || project.technology.backend.length > 0) && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technology.frontend.length + project.technology.backend.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                {formatDate(project.duration.start)} - {project.duration.end === new Date().toLocaleString() ? "Present" : formatDate(project.duration.end)}
              </span>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="px-6 pb-6 flex justify-between items-center">
            {/* View Details Button */}
            <Button
              onClick={() => setActive(true)}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 hover:text-primary"
            >
              <Info className="h-4 w-4" /> Details
            </Button>

            {/* External Links */}
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {project.live_link.frontend && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-primary/20 hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors"
                  asChild
                >
                  <a
                    href={project.live_link.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}

              {project.code_repo.frontend && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-primary/20 hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors"
                  asChild
                >
                  <a
                    href={project.code_repo.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
}
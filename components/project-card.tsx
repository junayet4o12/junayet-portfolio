'use client'

import { ProjectType } from "@/type";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import Image from "next/image";
import { 
  Code, Calendar, Tag, CheckCircle, 
  Clock, Info, ArrowUpRight, Github, Globe 
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useState } from "react";

export default function ProjectCard({ project }: { project: ProjectType }) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status === "in progress") {
      return <Clock className="h-4 w-4 text-blue-500" />;
    } else {
      return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <motion.div 
      variants={fadeInUp} 
      className="h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="bg-background h-full flex flex-col rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-md">
        {/* Thumbnail Image */}
        <div 
          onClick={() => setOpen(true)} 
          className="relative h-64 cursor-pointer overflow-hidden"
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
              transition: { duration: 0.4 }
            }}
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
        </div>

        {/* Content */}
        <div 
          onClick={() => setOpen(true)}
          className="p-6 space-y-4 flex-grow cursor-pointer"
        >
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
          
          <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 hover:text-primary"
              >
                <Info className="h-4 w-4" /> Details
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[80vw] max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center justify-between px-5">
                  <span className="font-bold">{project.name}</span>
                  <Badge 
                    variant={project.status === "completed" ? "default" : "secondary"} 
                    className="flex items-center gap-1"
                  >
                    {getStatusIcon(project.status)}
                    <span>{project.status}</span>
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <ScrollArea className="max-h-[calc(90vh-8rem)] px-4">
                <div className="space-y-6">
                  {/* Project Images and Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="relative rounded-xl overflow-hidden shadow-md border border-primary/10">
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
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Full Description */}
                      <div>
                        <h3 className="text-lg font-medium mb-2">Overview</h3>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>

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
            </DialogContent>
          </Dialog>

          {/* External Links */}
          <div className="flex gap-2">
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
      </Card>
    </motion.div>
  );
}
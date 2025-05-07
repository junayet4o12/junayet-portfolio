import { ProjectType } from "@/type";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import Image from "next/image";
import { Code, ExternalLink, Calendar, Tag, CheckCircle, Clock, Info, ArrowUpRight } from "lucide-react";
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
  const [open, setOpen] = useState(false)
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

  return (
    <motion.div variants={fadeInUp} className="h-full flex flex-col">
      <Card className="bg-background border-none overflow-hidden group h-full flex flex-col">
        
        <div onClick={() => setOpen(true)} className="relative h-64 md:h-80 cursor-pointer">
          <motion.div
          >
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          onClick={() => setOpen(true)}
          className="p-6 space-y-3 flex-grow cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
            <Badge variant={project.status === "completed" ? "default" : project.status === "in progress" ? "secondary" : "outline"}>
              {project.status}
            </Badge>
          </div>

          <p className="text-muted-foreground line-clamp-3">{project.description}</p>

          {/* Project Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Show timeline information */}
          <div className="flex items-center text-sm text-muted-foreground pt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {formatDate(project.duration.start)} - {project.duration.end === new Date().toLocaleString() ? "Present" : formatDate(project.duration.end)}
            </span>
          </div>
        </motion.div>

        {/* Actions Bar */}
        <div className="px-6 pb-6 pt-2 flex justify-between items-center">
          {/* View Details Button - Opens Modal */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <Info className="h-4 w-4" /> Details
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[80vw]  max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center justify-between px-5">
                  <span>{project.name}</span>
                  <Badge variant={project.status === "completed" ? "default" : project.status === "in progress" ? "secondary" : "outline"}>
                    {project.status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <ScrollArea className="max-h-[calc(90vh-8rem)] px-4">
                <div className="space-y-4 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-[calc(100%-50px)]">
                      <Carousel>
                        <CarouselContent>
                          {project.images.map((img, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
                                  <Image
                                    src={img}
                                    alt={`${project.name} image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                    <div className="space-y-6 p-1">
                      {/* Full Description */}
                      <div>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>

                      {/* Project Timeline */}
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(project.duration.start)} - {project.duration.end === new Date().toLocaleString() ? "Present" : formatDate(project.duration.end)}
                        </span>
                      </div>

                      {/* Project Type */}
                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Project Type:</span>
                          <span className="capitalize">{project.projectType}</span>
                        </div>

                        {project.projectType === "team" && (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Role:</span>
                              <span>{project.role}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Team Size:</span>
                              <span>{project.teamSize} members</span>
                            </div>
                          </>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="font-medium">Status:</span>
                          <span className="flex items-center gap-1">
                            {project.status === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : project.status === "in progress" ? (
                              <Clock className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-amber-500" />
                            )}
                            <span className="capitalize">{project.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Links */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Project Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.live_link.frontend && (
                            <a
                              href={project.live_link.frontend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-secondary/50 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Live Frontend</span>
                              <ArrowUpRight className="h-3 w-3 ml-auto" />
                            </a>
                          )}
                          {project.live_link.backend && (
                            <a
                              href={project.live_link.backend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-secondary/50 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Live Backend</span>
                              <ArrowUpRight className="h-3 w-3 ml-auto" />
                            </a>
                          )}
                          {project.code_repo.frontend && (
                            <a
                              href={project.code_repo.frontend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-secondary/50 transition-colors"
                            >
                              <Code className="h-4 w-4" />
                              <span>Frontend Repository</span>
                              <ArrowUpRight className="h-3 w-3 ml-auto" />
                            </a>
                          )}
                          {project.code_repo.backend && (
                            <a
                              href={project.code_repo.backend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-secondary/50 transition-colors"
                            >
                              <Code className="h-4 w-4" />
                              <span>Backend Repository</span>
                              <ArrowUpRight className="h-3 w-3 ml-auto" />
                            </a>
                          )}
                        </div>
                      </div>


                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h2 className="text-lg font-bold mb-3">Features</h2>
                      <div className="grid gap-4">
                        {project.features.map((feature, index) => (
                          <div key={index} className="border-l-2 border-primary pl-4">
                            <h4 className="font-medium">{feature.title}</h4>
                            <div
                              className="text-sm text-muted-foreground"
                              dangerouslySetInnerHTML={{ __html: feature.description }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="space-y-6">
                        <h2 className="text-lg font-bold mb-3">Technologies</h2>
                        <div>
                          <h4 className="font-medium mb-3">Frontend</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technology.frontend.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Backend</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technology.backend.map((tech) => (
                              <Badge key={tech} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Demo Video if exists */}
                  {project.demoVideo && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Demo Video</h3>
                      <iframe
                        src={project.demoVideo}
                        className="w-full aspect-video rounded-md"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* External Links Button */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              asChild
            >
              <a
                href={project.live_link.frontend || project.code_repo.frontend || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
import { ProjectType } from "@/type";
import { motion } from 'framer-motion'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ArrowDown, ArrowUp, Clock, Edit, Github, Globe, X } from "lucide-react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import PCTechList from "./pc-tech-list";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import PCEditProject from "./pc-edit-project";
import { toast } from "sonner";
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
const getStatusIcon = (status: string) => {
    if (status === "completed") {
        return <RiCheckboxCircleLine className="h-4 w-4 text-primary" />;
    } else if (status === "in progress") {
        return <Clock className="h-4 w-4 text-blue-500" />;
    } else {
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
};
type PropsType = {
    project: ProjectType,
    moveProject: (from: number, to: number) => void,
    index: number,
    projectsLength: number;
    setProjects: Dispatch<SetStateAction<ProjectType[]>>
}
export default function PCProjectCard({ project, moveProject, index, projectsLength, setProjects }: PropsType) {
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isDelete, setOpenIsDelete] = useState(false)
    // console.log(project);
    const handleDelete = () => {
        const toastId = toast.loading('Deleting project...');
        try {
            setProjects(prev => prev.filter(item => item.id !== project.id))
            toast.success('Project deleted successfully!', { id: toastId });
        } catch (error) {
            toast.error('Failed to delete project.', { id: toastId });
            console.error("Delete error:", error);
        }
    };

    // Handle experience reordering

    return (
        <motion.div
            layoutId={`card-${project.name}-${project.id}`}
            className="w-full flex flex-col bg-background rounded-xl overflow-hidden border border-primary/10 shadow-lg"
        >
            <div className="space-y-6 p-6">
                {/* Project Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div layoutId={`thumbnail-${project.name}-${project.id}`} className="relative rounded-xl overflow-hidden shadow-md border border-primary/10">
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

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <motion.h3 layoutId={`title-${project.name}-${project.id}`} className="text-2xl font-bold text-foreground">
                                {project.name}
                            </motion.h3>
                            <div className="flex flex-col gap-1 items-end">
                                <div className="flex gap-2 items-center">
                                    <Badge
                                        variant={'outline'}
                                        className="flex items-center gap-1"
                                    >
                                        {getStatusIcon(project.status)}
                                        <span>{project.status}</span>
                                    </Badge>
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                                        {project.projectType}
                                    </Badge>
                                </div>
                                <div className="text-xs text-foreground/70">
                                    {formatDate(project.duration.start)} - {project.duration.end === new Date().toLocaleString() ? "Present" : formatDate(project.duration.end)}
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h3 className="text-lg font-medium mb-1">Project Links</h3>
                            <div className="grid grid-cols-1 gap-1">
                                {project.live_link.frontend && (
                                    <div className="flex gap-2">
                                        <p className="flex gap-1 items-center w-[125px]"> <Globe className="h-4 w-4 text-primary" /> Live Frontend</p>
                                        <p>:</p>
                                        <a
                                            href={project.live_link.frontend}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline hover:text-primary transition-all duration-200"
                                        >

                                            <span>{project.live_link.frontend}</span>
                                        </a>
                                    </div>
                                )}
                                {project.live_link.backend && (
                                    <div className="flex gap-2">
                                        <p className="flex gap-1 items-center w-[125px]"> <Globe className="h-4 w-4 text-primary" /> Live Backend</p>
                                        <p>:</p>
                                        <a
                                            href={project.live_link.backend}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline hover:text-primary transition-all duration-200"
                                        >

                                            <span>{project.live_link.backend}</span>
                                        </a>
                                    </div>
                                )}
                                {project.code_repo.frontend && (
                                    <div className="flex gap-2">
                                        <p className="flex gap-1 items-center w-[125px]"> <Github className="h-4 w-4 text-primary" />Frontend Repo</p>
                                        <p>:</p>
                                        <a
                                            href={project.code_repo.frontend}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline hover:text-primary transition-all duration-200"
                                        >

                                            <span>{project.code_repo.frontend}</span>
                                        </a>
                                    </div>
                                )}
                                {project.code_repo.backend && (
                                    <div className="flex gap-2">
                                        <p className="flex gap-1 items-center w-[125px]"> <Github className="h-4 w-4 text-primary" />Backend Repo</p>
                                        <p>:</p>
                                        <a
                                            href={project.code_repo.backend}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline hover:text-primary transition-all duration-200"
                                        >

                                            <span>{project.code_repo.backend}</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                Technologies
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Frontend */}
                                <PCTechList tech={project.technology.frontend} name="Frontend" />
                                {/* Backend */}
                                <PCTechList tech={project.technology.backend} name="Backend" />
                            </div>
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
                        </div>
                        <div className="flex items-center justify-end gap-1.5">
                            <AlertDialog open={isDelete} onOpenChange={setOpenIsDelete}>
                                <AlertDialogTrigger asChild>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setOpenIsDelete(true)}
                                                size="icon"
                                                className="h-8 w-8 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Remove Project</TooltipContent>
                                    </Tooltip>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            project.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                            className="rounded-lg bg-destructive hover:bg-destructive/90"
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-muted-foreground transition-opacity"
                                        onClick={() => setIsOpenEdit(true)}
                                    >
                                        <Edit className="h-3.5 w-3.5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit Project</TooltipContent>
                            </Tooltip>
                            <div className="flex items-center gap-1">
                                {index > 0 && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type='button'
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => moveProject(index, index - 1)}
                                                className="h-8 w-8"
                                            >
                                                <ArrowUp className="h-3.5 w-3.5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Move up</TooltipContent>
                                    </Tooltip>
                                )}
                                {index < projectsLength - 1 && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type='button'
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => moveProject(index, index + 1)}
                                                className="h-8 w-8"
                                            >
                                                <ArrowDown className="h-3.5 w-3.5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Move down</TooltipContent>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PCEditProject project={project} isOpenModal={isOpenEdit} setIsOpenModal={setIsOpenEdit} setProjects={setProjects} />
        </motion.div>
    );
}
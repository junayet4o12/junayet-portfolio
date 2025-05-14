'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Pencil,
    Trash2,
    ChevronUp,
    ChevronDown,
    ExternalLink
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import SubtleGridBg from "@/components/subtle-grid-bg";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/section-title";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experienceFormSchema, ExperienceFormValues } from "@/schema/experience.schema";
import EFCExperienceForm from "./experience-form-components/efc-experience-form";

// Define the Experience type
type Experience = {
    id: string;
    company: string;
    role: string;
    duration: string;
    isRemote: boolean;
    offerLetterLink?: string;
    responsibilities: string[];
    projects: {
        name: string;
        link?: string;
    }[];
};

export default function ExperiencesForm() {
    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: "1",
            company: "DeveloperLook",
            role: "Junior Developer",
            duration: "October 2024 to January 2025",
            isRemote: true,
            offerLetterLink: "https://example.com/offer-letter-1",
            responsibilities: [
                "Developed and optimised responsive UI components using Next.js, ShadCN, and Tailwind CSS.",
                "Implemented AI-assisted development workflows using v0.dev to enhance efficiency.",
                "Improved prompt engineering for AI-generated components, leading to better automation.",
                "Contributed to full front-end projects, ensuring scalability and performance."
            ],
            projects: [
                { name: "DevTracker", link: "https://example.com/devtracker" },
                { name: "MyGroup.golf", link: "https://mygroup.golf" },
                { name: "Destinata-beyond", link: "https://destinata-beyond.com" },
                { name: "MyGroup.golf-landing", link: "https://landing.mygroup.golf" },
                { name: "Doctor-booking", link: "https://doctor-booking.com" },
                { name: "cc-booking", link: "" }
            ]
        },
        {
            id: "2",
            company: "Universe IT Institute",
            role: "Mern Stack Developer",
            duration: "June 2024 to October 2024",
            isRemote: true,
            offerLetterLink: "https://example.com/offer-letter-2",
            responsibilities: [
                "Implemented responsive UI components based on Figma designs, ensuring mobile and desktop compatibility.",
                "Worked on real-time projects alongside senior developers, gaining hands-on experience in the MERN stack.",
                "Enhanced interpersonal skills through team collaboration and communication."
            ],
            projects: [
                { name: "UniverseIt-Institute", link: "https://universeit.edu" }
            ]
        }
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
        company: "",
        role: "",
        duration: "",
        isRemote:  false,
        offerLetterLink: '',
        responsibilities: "",
        projects: [],
    }
});
    useEffect(() => {
        if (!isAddModalOpen && !isEditModalOpen) {
            form.reset();
        }
    }, [isAddModalOpen, isEditModalOpen, form]);

    // Set form values when editing
    useEffect(() => {
        if (currentExperience && isEditModalOpen) {
            form.reset({
                company: currentExperience.company,
                role: currentExperience.role,
                duration: currentExperience.duration,
                isRemote: currentExperience.isRemote,
                offerLetterLink: currentExperience.offerLetterLink || "",
                responsibilities: currentExperience.responsibilities.join("\n"),
                projects: currentExperience.projects,
            });
        }
    }, [currentExperience, isEditModalOpen, form]);

    // Handle form submission
    const onSubmit = async (values: ExperienceFormValues) => {
        setIsSubmitting(true);
        const toastId = toast.loading(currentExperience ? 'Updating experience...' : 'Adding experience...');

        try {
            // Convert responsibilities to array
            const responsibilities = values.responsibilities.split("\n").filter(item => item.trim() !== "");

            // Create new experience object
            const newExperience: Experience = {
                id: currentExperience?.id || Date.now().toString(),
                company: values.company,
                role: values.role,
                duration: values.duration,
                isRemote: values.isRemote || false,
                offerLetterLink: values.offerLetterLink,
                responsibilities,
                projects: values.projects || [],
            };

            // Update or add experience
            if (currentExperience) {
                const updatedExperiences = experiences.map(exp =>
                    exp.id === currentExperience.id ? newExperience : exp
                );
                setExperiences(updatedExperiences);
                toast.success('Experience updated successfully!', { id: toastId });
                setIsEditModalOpen(false);
            } else {
                setExperiences([...experiences, newExperience]);
                toast.success('Experience added successfully!', { id: toastId });
                setIsAddModalOpen(false);
            }

            // Reset the form
            form.reset();
        } catch (error) {
            toast.error(currentExperience ? 'Failed to update experience.' : 'Failed to add experience.', { id: toastId });
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle experience deletion
    const handleDelete = () => {
        if (currentExperience) {
            const toastId = toast.loading('Deleting experience...');
            try {
                const filteredExperiences = experiences.filter(exp => exp.id !== currentExperience.id);
                setExperiences(filteredExperiences);
                toast.success('Experience deleted successfully!', { id: toastId });
            } catch (error) {
                toast.error('Failed to delete experience.', { id: toastId });
                console.error("Delete error:", error);
            } finally {
                setIsDeleteAlertOpen(false);
                setCurrentExperience(null);
            }
        }
    };

    // Handle experience reordering
    const moveExperience = (id: string, direction: 'up' | 'down') => {
        const index = experiences.findIndex(exp => exp.id === id);
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === experiences.length - 1)
        ) {
            return;
        }

        const newExperiences = [...experiences];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap positions
        [newExperiences[index], newExperiences[newIndex]] = [newExperiences[newIndex], newExperiences[index]];
        setExperiences(newExperiences);
        toast.success('Experience order updated');
    };

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
    };

    // Individual item variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="relative flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden py-12">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle grid background */}
                <SubtleGridBg />

                {/* Gradient orbs */}
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>

                {/* Decorative elements */}
                <div className="absolute top-20 right-[15%] w-20 h-20 border border-primary/20 rounded-full"></div>
                <div className="absolute bottom-32 left-[10%] w-12 h-12 border border-primary/10 rounded-full"></div>
                <div className="absolute top-1/2 left-[5%] w-6 h-6 bg-primary/20 rounded-full"></div>
                <div className="absolute bottom-1/4 right-[5%] w-8 h-8 bg-primary/10 rounded-full"></div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="space-y-8 max-w-5xl mx-auto"
                >
                    {/* Header Section */}
                    <div className="flex justify-between items-center">
                        <SectionTitle
                            title1="MANAGE YOUR"
                            title2={{
                                active: 'Experiences',
                                base: 'Professional'
                            }}
                            subtitle="Add, edit, and organize your work experiences"
                        />

                        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="rounded-xl h-12 px-4 group" onClick={() => setCurrentExperience(null)}>
                                    <Plus size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                                    Add Experience
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="!max-w-5xl mx-auto">
                                <DialogHeader>
                                    <DialogTitle>Add New Experience</DialogTitle>
                                    <DialogDescription>
                                        Enter details about your professional experience
                                    </DialogDescription>
                                </DialogHeader>
                                <EFCExperienceForm
                                    form={form}
                                    onSubmit={onSubmit}
                                    isSubmitting={isSubmitting}
                                    buttonText="Add Experience"
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Experiences List */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        {experiences.map((experience, index) => (
                            <Card key={experience.id} className="overflow-hidden border border-primary/20 bg-background/60 backdrop-blur-sm shadow-lg rounded-2xl">
                                <CardHeader className="bg-primary/5 border-b border-primary/10 pb-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl font-semibold text-foreground">
                                                {experience.role} at {experience.company}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">{experience.duration}</p>
                                            <div className="flex gap-2 mt-2">
                                                {experience.isRemote && <Badge variant="outline" className="bg-primary/10">Remote</Badge>}
                                                {experience.offerLetterLink && (
                                                    <a href={experience.offerLetterLink} target="_blank" rel="noopener noreferrer">
                                                        <Badge variant="outline" className="bg-primary/10 flex items-center gap-1 hover:bg-primary/20 cursor-pointer">
                                                            Offer Letter <ExternalLink size={12} />
                                                        </Badge>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                                                onClick={() => moveExperience(experience.id, 'up')}
                                                disabled={index === 0}
                                            >
                                                <ChevronUp size={18} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                                                onClick={() => moveExperience(experience.id, 'down')}
                                                disabled={index === experiences.length - 1}
                                            >
                                                <ChevronDown size={18} />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-4 pb-3">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground mb-2">Responsibilities:</h4>
                                            <ul className="list-disc list-inside space-y-1 pl-1">
                                                {experience.responsibilities.map((resp, i) => (
                                                    <li key={i} className="text-sm text-muted-foreground">{resp}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-foreground mb-2">Projects:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {experience.projects.map((project, i) => (
                                                    project.link ? (
                                                        <a key={i} href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex">
                                                            <Badge variant="secondary" className="bg-primary/5 flex items-center gap-1 hover:bg-primary/20">
                                                                {project.name} <ExternalLink size={12} />
                                                            </Badge>
                                                        </a>
                                                    ) : (
                                                        <Badge key={i} variant="secondary" className="bg-primary/5">
                                                            {project.name}
                                                        </Badge>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="border-t border-primary/5 pt-3 flex justify-end gap-2">
                                    <Dialog open={isEditModalOpen && currentExperience?.id === experience.id} onOpenChange={(open) => {
                                        setIsEditModalOpen(open);
                                        if (!open) setCurrentExperience(null);
                                    }}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-9 rounded-lg"
                                                onClick={() => setCurrentExperience(experience)}
                                            >
                                                <Pencil size={14} className="mr-2" />
                                                Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="!max-w-5xl mx-auto">
                                            <DialogHeader>
                                                <DialogTitle>Edit Experience</DialogTitle>
                                                <DialogDescription>
                                                    Update details about your professional experience
                                                </DialogDescription>
                                            </DialogHeader>
                                            <EFCExperienceForm
                                                form={form}
                                                onSubmit={onSubmit}
                                                isSubmitting={isSubmitting}
                                                buttonText="Update Experience"
                                            />
                                        </DialogContent>
                                    </Dialog>

                                    <AlertDialog open={isDeleteAlertOpen && currentExperience?.id === experience.id} onOpenChange={(open) => {
                                        setIsDeleteAlertOpen(open);
                                        if (!open) setCurrentExperience(null);
                                    }}>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="h-9 rounded-lg"
                                                onClick={() => setCurrentExperience(experience)}
                                            >
                                                <Trash2 size={14} className="mr-2" />
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your
                                                    experience entry for {experience.role} at {experience.company}.
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
                                </CardFooter>
                            </Card>
                        ))}

                        {experiences.length === 0 && (
                            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-primary/20 rounded-xl bg-primary/5">
                                <div className="text-muted-foreground text-center space-y-2">
                                    <p>No experiences added yet</p>
                                    <p className="text-sm">Click the &quot;Add Experience&quot; button to get started</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
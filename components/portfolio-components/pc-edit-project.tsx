import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { ProjectFormValues, projectSchema } from "@/schema/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ProjectType, TechsType } from "@/type";
import PCPortfolioForm from "./pc-portfolio-form";
import { defaultTags, defaultTech } from "@/const/project.const";

type PropsType = {
    isOpenModal: boolean;
    project: ProjectType;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    setProjects: Dispatch<SetStateAction<ProjectType[]>>

}
type ImageType = string | File;
const filteredItems = (defaultTech: TechsType, newTech: string[]) => {
    return defaultTech.filter(item =>
        newTech.some(tech => tech === item.label)
    )
}
export default function PCEditProject({ isOpenModal, setIsOpenModal, project, setProjects }: PropsType) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [frontendTech, setFrontendTech] = useState<TechsType>(filteredItems(defaultTech, project.technology.frontend));
    const [backendTech, setBackendTech] = useState<TechsType>(filteredItems(defaultTech, project.technology.backend));
    const [images, setImages] = useState<ImageType[]>(project.images);
    const [thumbnail, setThumbnail] = useState<ImageType>(project.thumbnail);
    const [features, setFeatures] = useState<{
        description: string;
        title: string;
    }[]>(project.features)
    const [tags, setTags] = useState<TechsType>(filteredItems(defaultTags, project.tags))
    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
            projectType: project.projectType,
            live_link: {
                ...project.live_link
            },
            code_repo: {
                ...project.code_repo
            },
            duration: {
                ...project.duration
            },
            role: project.role,
            teamSize: project.teamSize,
            status: project.status,
            demoVideo: project.demoVideo,
            isFeatured: project.isFeatured,
        },
    });
    useEffect(() => {
        if (project) {
            form.reset({
                name: project.name,
                description: project.description,
                projectType: project.projectType,
                live_link: project.live_link,
                code_repo: project.code_repo,
                duration: project.duration,
                role: project.role,
                teamSize: project.teamSize,
                status: project.status,
                demoVideo: project.demoVideo,
                isFeatured: project.isFeatured,
            });
        }
        setBackendTech(filteredItems(defaultTech, project.technology.backend))
        setFrontendTech(filteredItems(defaultTech, project.technology.frontend))
        setTags(filteredItems(defaultTags, project.tags))
        setImages(project.images)
        setThumbnail(project.thumbnail)
        setFeatures(project.features)
    }, [project, form, isOpenModal]);
    const handleEditProject = async (values: ProjectFormValues) => {
        console.log('hello');

        setIsSubmitting(true);
        const toastId = toast.loading('Updating project...');
        const newImages = images.map(item => {
            if (item instanceof File) {
                return URL.createObjectURL(item)
            }
            return item
        })
        const newThumbnail = thumbnail instanceof File ? URL.createObjectURL(thumbnail) : thumbnail
        try {
            // Clean features with empty title or description


            const newProject: ProjectType = {
                id: project.id,
                name: values.name,
                description: values.description,
                projectType: values.projectType,
                live_link: {
                    frontend: values.live_link.frontend?.trim() || "",
                    backend: values.live_link.backend?.trim() || "",
                },
                code_repo: {
                    frontend: values.code_repo.frontend?.trim() || "",
                    backend: values.code_repo.backend?.trim() || "",
                },
                features,
                images: newImages,
                thumbnail: newThumbnail,
                duration: values.duration,
                role: values.projectType === "team" ? values.role || "" : 'Full Stack Developer',
                teamSize: values.projectType === "team" ? values.teamSize : '0',
                status: values.status,
                demoVideo: values.demoVideo?.trim() || "",
                isFeatured: values.isFeatured || false,
                createdAt: project.createdAt,
                updatedAt: new Date().toISOString(),
                technology: {
                    frontend: frontendTech.map(item => item.label),
                    backend: backendTech.map(item => item.label)
                },
                tags: tags.map(item => item.label)
            };

            setProjects(prev => prev.map(item => {
                if (item.id === newProject.id) {
                    return newProject
                }
                return item
            }));
            toast.success("Project updated successfully!", { id: toastId });
            setIsOpenModal(false);

            form.reset();
            setBackendTech([])
            setFeatures([])
            setFrontendTech([])
            setTags([])
            setImages([])
            setThumbnail('')
        } catch (error) {
            toast.error('Failed to edit project.', {
                id: toastId,
            });
            console.error("Project form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
            <DialogContent className="!max-w-7xl mx-auto max-h-[95vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>
                        Edit Project
                    </DialogTitle>
                    <DialogDescription>
                        Enter data of your desired Project
                    </DialogDescription>
                </DialogHeader>
                <PCPortfolioForm
                    form={form}
                    onSubmit={handleEditProject}
                    isSubmitting={isSubmitting}
                    buttonText="Edit Portfolio"
                    frontendTech={frontendTech}
                    setFrontendTech={setFrontendTech}
                    backendTech={backendTech}
                    setBackendTech={setBackendTech}
                    images={images}
                    setImages={setImages}
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
                    features={features}
                    setFeatures={setFeatures}
                    tags={tags}
                    setTags={setTags}
                />
            </DialogContent>
        </Dialog>
    );
}
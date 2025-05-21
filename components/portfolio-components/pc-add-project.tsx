import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { ProjectFormValues, projectSchema } from "@/schema/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ProjectType, TechsType } from "@/type";
import PCPortfolioForm from "./pc-portfolio-form";

type PropsType = {
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    projects: ProjectType[];
    setProjects: Dispatch<SetStateAction<ProjectType[]>>

}
type ImageType = string | File
export default function PCAddProject({ isOpenModal, setIsOpenModal, projects, setProjects }: PropsType) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [frontendTech, setFrontendTech] = useState<TechsType>([]);
    const [backendTech, setBackendTech] = useState<TechsType>([]);
    const [images, setImages] = useState<ImageType[]>([]);
    const [thumbnail, setThumbnail] = useState<ImageType>("");
    const [features, setFeatures] = useState<{
        description: string;
        title: string;
    }[]>([])
    const [tags, setTags] = useState<TechsType>([])
    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            projectType: "personal",
            live_link: {
                frontend: "",
                backend: "",
            },
            code_repo: {
                frontend: "",
                backend: "",
            },
            duration: {
                start: "",
                end: "",
            },
            role: "",
            teamSize: '',
            status: "in progress",
            demoVideo: "",
            isFeatured: false,
        },
    });
    const handleAddProject = async (values: ProjectFormValues) => {
        setIsSubmitting(true);
        const toastId = toast.loading('Adding project...');
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
                id: Date.now().toString(),
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
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                technology: {
                    frontend: frontendTech.map(item => item.label),
                    backend: backendTech.map(item => item.label)
                },
                tags: tags.map(item => item.label)
            };
            console.log(newProject);

            setProjects([...projects, newProject]);
            toast.success("Project added successfully!", { id: toastId });
            setIsOpenModal(false);

            form.reset();
            setBackendTech([])
            setFeatures([])
            setFrontendTech([])
            setTags([])
            setImages([])
            setThumbnail('')
        } catch (error) {
            toast.error('Failed to add project.', {
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
                        Add Project
                    </DialogTitle>
                    <DialogDescription>
                        Enter data of your desired Project
                    </DialogDescription>
                </DialogHeader>
                <PCPortfolioForm
                    form={form}
                    onSubmit={handleAddProject}
                    isSubmitting={isSubmitting}
                    buttonText="Add Portfolio"
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
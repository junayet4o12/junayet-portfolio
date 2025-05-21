import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectFormValues } from "@/schema/project.schema";
import { ArrowDown, ArrowUp, Loader2, Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import PCTechBox from "./pc-tech-box";
import PCImageBox from "./pc-image-box";
import { TechsType } from "@/type";
import { defaultTags, defaultTech } from "@/const/project.const";
import PCThumbnailBox from "./pc-thumbnail-box";

type ImageType = string | File
type Feature = {
    title: string;
    description: string;
};

type PropsType = {
    form: UseFormReturn<ProjectFormValues>;
    onSubmit: (values: ProjectFormValues) => Promise<void>;
    isSubmitting: boolean;
    buttonText: string;
    frontendTech: TechsType;
    setFrontendTech: React.Dispatch<React.SetStateAction<TechsType>>;

    backendTech: TechsType;
    setBackendTech: React.Dispatch<React.SetStateAction<TechsType>>;

    images: ImageType[];
    setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;

    thumbnail: string | File;
    setThumbnail: React.Dispatch<React.SetStateAction<string | File>>;

    features: Feature[];
    setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;

    tags: TechsType;
    setTags: React.Dispatch<React.SetStateAction<TechsType>>;
};

export default function PCPortfolioForm({
    form,
    onSubmit,
    isSubmitting,
    buttonText,
    frontendTech,
    setFrontendTech,
    backendTech,
    setBackendTech,
    images,
    setImages,
    thumbnail,
    setThumbnail,
    features,
    setFeatures,
    tags,
    setTags,
}: PropsType) {
    const removeFeatures = (index: number) => {
        const filteredFeatures = features.filter((_item, idx) => idx !== index);
        setFeatures(filteredFeatures)
    }
    const handleSetFeatureValue = (index: number, value: string, field: 'title' | 'description') => {
        const newFeaturesField = features.map((item, idx) => {
            if (index !== idx) {
                return item
            }
            const newItems = { ...item, [field]: value }
            return newItems
        })

        setFeatures(newFeaturesField)
    }
    const moveItem = (fromIndex: number, toIndex: number) => {
        const updatedFeatures = [...features];
        const [movedItem] = updatedFeatures.splice(fromIndex, 1);
        updatedFeatures.splice(toIndex, 0, movedItem);
        setFeatures(updatedFeatures);
    };

    return (
        <ScrollArea className="max-h-[calc(90vh-8rem)]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    {/* Basic Project Information */}
                    {/* Images */}
                    {/* Thumbnail */}
                    <PCThumbnailBox thumbnail={thumbnail} setThumbnail={setThumbnail} />
                    <PCImageBox images={images} setImages={setImages} />


                    <div className="grid grid-cols-2 gap-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter project name"
                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="projectType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg w-full">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="personal">Personal</SelectItem>
                                                <SelectItem value="team">Team</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg w-full">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="in progress">In Progress</SelectItem>
                                                <SelectItem value="on hold">On Hold</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => {
                            
                            return  <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe your project"
                                        className="min-h-[120px] bg-background/50 border-border focus-visible:border-primary/50 rounded-lg resize-y"
                                        
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }}
                    />

                    {/* Status and Role */}
                    <div className="grid md:grid-cols-2 gap-4">


                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Role</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your role in the project"
                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="teamSize"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team Size</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Number of team members"
                                                className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value || '')}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isFeatured"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 mt-6">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">Featured Project</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="duration.start"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. January 2023"
                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration.end"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. March 2024 or Ongoing"
                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Team Size and Featured */}

                    {/* Technologies */}
                    <div className="space-y-4">

                        <h3 className="text-lg font-medium">Technologies Used</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <PCTechBox name="Frontend Technologies" setTechs={setFrontendTech} techs={frontendTech} options={defaultTech} />
                            {/* Backend Technologies */}
                            <PCTechBox name="Backend Technologies" setTechs={setBackendTech} techs={backendTech} options={defaultTech} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">

                        <FormField
                            control={form.control}
                            name="demoVideo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Demo Video URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://youtube.com/watch?v=example"
                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <PCTechBox name="Project Tags" setTechs={setTags} techs={tags} options={defaultTags} />

                    </div>
                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Project Links</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="live_link.frontend"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Frontend Live URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://your-project.com"
                                                className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="live_link.backend"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Backend Live URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://api.your-project.com"
                                                className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="code_repo.frontend"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Frontend Repository</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://github.com/username/project"
                                                className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="code_repo.backend"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Backend Repository</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://github.com/username/project-api"
                                                className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>


                    {/* Tags */}

                    {/* Features */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <FormLabel>Project Features</FormLabel>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setFeatures([...features, { title: '', description: '' }])}
                                className="h-8 px-2 rounded-lg"
                            >
                                <Plus className="h-4 w-4 mr-1" /> Add Feature
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {features.map((field, index) => (
                                <div key={index} className="border rounded-lg px-4 py-1 pb-2 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-sm font-medium">Feature {index + 1}</h4>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFeatures(index)}
                                                className="h-8 w-8 rounded-lg"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <div className="flex items-center gap-1">
                                                {index > 0 && (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => moveItem(index, index - 1)}
                                                                className="h-8 w-8"
                                                            >
                                                                <ArrowUp className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Move up</TooltipContent>
                                                    </Tooltip>
                                                )}
                                                {index < features.length - 1 && (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => moveItem(index, index + 1)}
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Title</Label>
                                            <Input value={field.title} placeholder="Title" onChange={(e) => handleSetFeatureValue(index, e.target.value, 'title')} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea className="min-h-[80px]" value={field.description} placeholder="Description" onChange={(e) => handleSetFeatureValue(index, e.target.value, 'description')} />
                                        </div>
                                    </div>

                                </div>
                            ))}

                            {features.length === 0 && (
                                <p className="text-sm text-muted-foreground">No features added yet</p>
                            )}
                        </div>
                    </div>




                    {/* Submit Button */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button className="rounded-lg" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {buttonText}
                        </Button>
                    </div>
                </form>
            </Form>
        </ScrollArea>
    );
}
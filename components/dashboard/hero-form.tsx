'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Link as LinkIcon,
    CheckCircle,
    XCircle,
    PlusCircle,
    Loader2,
    Eye,
    ChevronUp,
    ChevronDown,
    Edit
} from "lucide-react";
import MDEditor from '@uiw/react-md-editor';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import SubtleGridBg from "@/components/subtle-grid-bg";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionTitle from "@/components/section-title";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

// Define the form schema with Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    role: z.string().min(2, { message: "Role must be at least 2 characters" }),
    title: z.string().optional(),
    importantLinks: z.array(z.object({
        name: z.string().min(1, { message: "Link name is required" }),
        link: z.string().url({ message: "Invalid URL" }),
        icon: z.string()
    })).optional(),
    experience: z.string().optional(),
    status: z.enum(["available", "unavailable"]),
    description: z.string()
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function HeroForm() {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [links, setLinks] = useState<{ name: string; link: string; icon: string }[]>([]);

    // Initialize the form with React Hook Form and Zod resolver
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            title: "",
            importantLinks: [],
            experience: "",
            status: "available",
            description: ""
        },
    });

    // Handle form submission
    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        const toastId = toast.loading('Saving profile...');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success handling
            toast.success('Profile successfully updated!', { id: toastId });
            console.log("Profile values:", { ...values, importantLinks: links });

            // You would typically handle navigation or state updates here
        } catch (error) {
            toast.error('Profile update failed. Please try again.', { id: toastId });
            console.error("Profile update error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Add a new link
    const addLink = () => {
        const newLink = { name: "", link: "", icon: "" };
        setLinks([...links, newLink]);
        setEditingIndex(links.length);
    };

    // Update a specific link
    const updateLink = (index: number, field: keyof typeof links[0], value: string | undefined) => {
        const updatedLinks = [...links];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value || '' };
        setLinks(updatedLinks);
    };

    // Remove a link
    const removeLink = (index: number) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
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
    const toggleEditMode = (index: number) => {
        setEditingIndex(editingIndex === index ? null : index);
    };
    const moveItem = (fromIndex: number, toIndex: number) => {
        const updatedLinks = [...links];
        const [movedItem] = updatedLinks.splice(fromIndex, 1);
        updatedLinks.splice(toIndex, 0, movedItem);
        setLinks(updatedLinks);
        setEditingIndex(toIndex)
    };

    return <section
        className="relative flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden"
    >
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
                <SectionTitle
                    title1="CREATE YOUR"
                    title2={{
                        active: 'Profile',
                        base: 'Professional'
                    }}
                    subtitle="Showcase your professional identity"
                />

                {/* Profile Card */}
                <motion.div
                    variants={itemVariants}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-30 blur-xl"></div>

                    <div className="relative bg-background/60 backdrop-blur-sm border border-primary/20 p-8 md:p-10 rounded-3xl shadow-lg">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name and Role */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative space-y-2">
                                                        <Label>Full Name</Label>
                                                        <Input
                                                            placeholder="Full Name"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative space-y-2">
                                                        <Label>Professional Role</Label>
                                                        <Input
                                                            placeholder="Professional Role"
                                                            className="h-12  bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative space-y-2">
                                                        <Label>Section Title</Label>
                                                        <Input
                                                            placeholder="Section Title"
                                                            className="h-12  bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Experience */}
                                    <FormField
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative space-y-2">
                                                        <Label>Professional Experience (Year)</Label>
                                                        <Input
                                                            type="number"
                                                            placeholder="Professional Experience"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative space-y-2">
                                                    <Label>Description</Label>
                                                    <Textarea
                                                        placeholder="description"
                                                        className="min-h-[100px] bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Important Links */}
                                <div className="relative bg-background/60 backdrop-blur-sm border border-primary/20 p-6 md:p-8 rounded-3xl shadow-lg">
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex items-center gap-2">
                                                <LinkIcon className="h-5 w-5 text-primary" />
                                                <span className="font-medium text-lg">Menu Items</span>
                                                <span className="text-sm text-muted-foreground ml-2">
                                                    {links.length} {links.length === 1 ? 'item' : 'items'}
                                                </span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="default"
                                                size="sm"
                                                onClick={addLink}
                                                className="flex items-center gap-2 shadow-sm"
                                            >
                                                <PlusCircle className="h-4 w-4" /> Add Item
                                            </Button>
                                        </div>

                                        <ScrollArea className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
                                            {links.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                                                    <LinkIcon className="h-10 w-10 text-muted-foreground" />
                                                    <h3 className="text-lg font-medium">No links yet</h3>
                                                    <p className="text-muted-foreground max-w-md">
                                                        Add your first profile link to start building your navigation.
                                                    </p>
                                                    <Button
                                                        type="button"
                                                        variant="default"
                                                        size="sm"
                                                        onClick={addLink}
                                                        className="mt-2 flex items-center gap-2"
                                                    >
                                                        <PlusCircle className="h-4 w-4" /> Add First Link
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-y-4">
                                                    {links.map((item, index) => (
                                                        <div key={index}>
                                                            {editingIndex === index ? (
                                                                <div className="bg-background/80 border border-border rounded-xl p-4 space-y-4">
                                                                    <div className="grid grid-cols-12 gap-3">
                                                                        <div className="col-span-5 space-y-2">
                                                                            <Label htmlFor={`name-${index}`}>Name</Label>
                                                                            <Input
                                                                                id={`name-${index}`}
                                                                                placeholder="Github"
                                                                                value={item.name}
                                                                                onChange={(e) => updateLink(index, 'name', e.target.value)}
                                                                                className="bg-background border-border focus-visible:border-primary/50 rounded-lg"
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-5 space-y-2">
                                                                            <Label htmlFor={`link-${index}`}>URL</Label>
                                                                            <Input
                                                                                id={`link-${index}`}
                                                                                placeholder="https://github/junayet4o12"
                                                                                value={item.link}
                                                                                onChange={(e) => updateLink(index, 'link', e.target.value)}
                                                                                className="bg-background border-border focus-visible:border-primary/50 rounded-lg"
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2 flex items-end justify-end gap-2">
                                                                            <Tooltip>
                                                                                <TooltipTrigger asChild>
                                                                                    <Button
                                                                                        type="button"
                                                                                        variant="ghost"
                                                                                        size="icon"
                                                                                        onClick={() => toggleEditMode(index)}
                                                                                        className="hover:bg-background"
                                                                                    >
                                                                                        <Eye className="h-4 w-4" />
                                                                                    </Button>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent>Preview</TooltipContent>
                                                                            </Tooltip>
                                                                            <Tooltip>
                                                                                <TooltipTrigger asChild>
                                                                                    <Button
                                                                                        type="button"
                                                                                        variant="ghost"
                                                                                        size="icon"
                                                                                        onClick={() => removeLink(index)}
                                                                                        className="hover:bg-destructive/10 hover:text-destructive"
                                                                                    >
                                                                                        <XCircle className="h-4 w-4" />
                                                                                    </Button>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent>Remove</TooltipContent>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-12 gap-3">
                                                                        <div className="col-span-10 space-y-2">
                                                                            <Label>Icon SVG</Label>
                                                                            <MDEditor
                                                                                preview="edit"
                                                                                hideToolbar={true}
                                                                                value={item.icon}
                                                                                onChange={(value) => updateLink(index, 'icon', value)}
                                                                                height={120}
                                                                                className="rounded-lg border-border"
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2 flex flex-col justify-between">
                                                                            <div className="space-y-2">
                                                                                <Label>Preview</Label>
                                                                                <div
                                                                                    dangerouslySetInnerHTML={{ __html: item.icon }}
                                                                                    className="flex items-center justify-center h-16 w-16 border border-border rounded-lg bg-background"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                            <span>Item {index + 1} of {links.length}</span>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            {index > 0 && (
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    type="button"
                                                                                    size="sm"
                                                                                    onClick={() => moveItem(index, index - 1)}
                                                                                    className="gap-1"
                                                                                >
                                                                                    <ChevronUp className="h-4 w-4" /> Move Up
                                                                                </Button>
                                                                            )}
                                                                            {index < links.length - 1 && (
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => moveItem(index, index + 1)}
                                                                                    className="gap-1"
                                                                                >
                                                                                    <ChevronDown className="h-4 w-4" /> Move Down
                                                                                </Button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="bg-background/50 hover:bg-background/70 border border-border rounded-xl p-4 transition-colors">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-4">
                                                                            {item.icon && (
                                                                                <div
                                                                                    dangerouslySetInnerHTML={{ __html: item.icon }}
                                                                                    className="w-5 h-5 flex-shrink-0 text-muted-foreground"
                                                                                />
                                                                            )}
                                                                            <div>
                                                                                <div className="font-medium">{item.name || 'Untitled Item'}</div>
                                                                                <div className="text-sm text-muted-foreground line-clamp-1">
                                                                                    {item.link || 'No URL provided'}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                onClick={() => toggleEditMode(index)}
                                                                                className="text-primary hover:bg-primary/10"
                                                                            >
                                                                                <Edit className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </ScrollArea>

                                        {links.length > 0 && (
                                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/50">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={addLink}
                                                    className="flex items-center gap-2"
                                                >
                                                    <PlusCircle className="h-4 w-4" /> Add Another
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>



                                {/* Status */}
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl">
                                                            <SelectValue placeholder="Select Availability" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="available" className="flex items-center gap-2">
                                                                <CheckCircle className="h-4 w-4 text-green-500" /> Available
                                                            </SelectItem>
                                                            <SelectItem value="unavailable" className="flex items-center gap-2">
                                                                <XCircle className="h-4 w-4 text-destructive" /> Unavailable
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-12 group rounded-xl font-medium"
                                    disabled={isSubmitting}
                                >{isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}</Button>
                            </form>
                        </Form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    </section>
}

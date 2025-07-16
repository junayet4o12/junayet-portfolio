'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Loader2,
    Upload,
    X
} from "lucide-react";
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
import { Label } from "../ui/label";
import Image from "next/image";

// Define the form schema with Zod
const formSchema = z.object({
    title: z.string().optional(),
    description: z.string(),
    profileImage: z
        .any()
        .refine((file) => file instanceof File || file === undefined, {
            message: "Invalid file type.",
        })
        .optional(),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function HeroForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Initialize the form with React Hook Form and Zod resolver
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    });

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue("profileImage", file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove image
    const removeImage = () => {
        form.setValue("profileImage", undefined);
        setPreviewImage(null);

        // Reset the file input
        const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    // Handle form submission
    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        const toastId = toast.loading('Saving profile...');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success handling
            toast.success('Profile successfully updated!', { id: toastId });
            console.log("Profile values:", values);

            // You would typically handle navigation or state updates here
        } catch (error) {
            toast.error('Profile update failed. Please try again.', { id: toastId });
            console.error("Profile update error:", error);
        } finally {
            setIsSubmitting(false);
        }
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
                                {/* Profile Image Upload */}
                                <div className="space-y-2">
                                    <Label>Profile Image</Label>
                                    <div className="flex items-center justify-center space-y-4 flex-col">
                                        {/* Profile Image Preview */}
                                        <div className="relative">
                                            {previewImage && (
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 bg-background text-muted-foreground hover:text-foreground rounded-full p-1 border border-border shadow-sm transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                            <div className="relative  rounded-full overflow-hidden">
                                                <div className={`w-70 aspect-square rounded-full flex items-center justify-center bg-primary/5 border-2 ${previewImage ? 'border-primary/40' : 'border-dashed border-primary/20'} overflow-hidden`}>
                                                    {previewImage ? (
                                                        <Image
                                                            src={previewImage}
                                                            alt="Junayet Alam - MERN Stack Developer"
                                                            fill
                                                            className="object-cover object-center scale-105 mt-5"
                                                            priority
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                        />
                                                    ) : (
                                                        <span className="text-muted-foreground text-xs text-center px-2">
                                                            No image selected
                                                        </span>
                                                    )}
                                                </div>

                                            </div>
                                        </div>

                                        {/* Upload Button */}
                                        <div>
                                            <div className="flex items-center space-x-2 justify-center">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-10 px-4 rounded-xl border-primary/20 hover:border-primary/40 bg-background/50"
                                                    onClick={() => document.getElementById('profile-image-input')?.click()}
                                                >
                                                    <Upload size={16} className="mr-2" />
                                                    {previewImage ? 'Change Image' : 'Upload Image'}
                                                </Button>
                                                <input
                                                    id="profile-image-input"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Recommended: Square image, at least 400x400px. Max 2MB.
                                            </p>
                                        </div>
                                    </div>
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
                                                        placeholder="Description"
                                                        className="min-h-[100px] bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                        {...field}
                                                    />
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
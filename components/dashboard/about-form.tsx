'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import SubtleGridBg from "@/components/subtle-grid-bg";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionTitle from "@/components/section-title";
import AFCLanguages from "./about-form-components/afc-languages";
import AFCSocialLinks from "./about-form-components/afc-social-links";


// Define Language type
type Language = {
    name: string;
    level: string;
};

// Define the form schema with Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    role: z.string().min(2, { message: "Role must be at least 2 characters" }),
    dateOfBirth: z.date({
        required_error: "Date of birth is required",
    }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    contactNumber: z.string().min(7, { message: "Contact number is too short" }),
    address: z.string().min(5, { message: "Please enter a valid address" }),
    nationality: z.string().min(2, { message: "Nationality is required" }),
    description: z.string().min(10, { message: "Description should be at least 10 characters" }),
    experience: z.number().min(0, { message: "Experience cannot be negative" }),
    totalProjects: z.number().min(0, { message: "Total projects cannot be negative" }),
    isAvailable: z.boolean()
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;
type SocialLinksType = {
    name: string;
    icon: string;
    link: string;
}
export default function AboutForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksType[]>([])

    // Initialize the form with React Hook Form and Zod resolver
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            dateOfBirth: undefined,
            email: "",
            contactNumber: "",
            address: "",
            nationality: "",
            description: "",
            experience: 0,
            totalProjects: 0,
            isAvailable: true
        },
    });





    // Handle form submission
    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        const toastId = toast.loading('Saving profile...');

        try {
            // Prepare data with languages array
            const submitData = {
                ...values,
                languages,
                socialLinks
            };

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success handling
            toast.success('Profile successfully updated!', { id: toastId });
            console.log("Profile values:", submitData);

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
                    title1="ABOUT"
                    title2={{
                        active: 'You',
                        base: 'TELL US'
                    }}
                    subtitle="Share your professional background and expertise"
                />

                {/* About Form Card */}
                <motion.div
                    variants={itemVariants}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-30 blur-xl"></div>

                    <div className="relative bg-background/60 backdrop-blur-sm border border-primary/20 p-8 md:p-10 rounded-3xl shadow-lg">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Basic Information Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Basic Information</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="John Doe"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Role */}
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Professional Role</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Frontend Developer"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Date of Birth */}
                                        <FormField
                                            control={form.control}
                                            name="dateOfBirth"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Date of Birth</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "h-12 w-full pl-3 text-left font-normal bg-background/50 border-border focus-visible:border-primary/50 rounded-xl",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Select date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Email */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="johndoe@example.com"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Contact Number */}
                                        <FormField
                                            control={form.control}
                                            name="contactNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Number</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="tel"
                                                            placeholder="+1 (123) 456-7890"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Nationality */}
                                        <FormField
                                            control={form.control}
                                            name="nationality"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nationality</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Canadian"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Address */}
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="123 Main Street, City, Country"
                                                        className="min-h-[80px] bg-background/50 border-border focus-visible:border-primary/50 rounded-xl resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Languages Section */}
                                <AFCLanguages languages={languages} setLanguages={setLanguages} />

                                {/* socialLinks  */}
                                <AFCSocialLinks socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
                                {/* Professional Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Professional Information</h3>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Experience */}
                                        <FormField
                                            control={form.control}
                                            name="experience"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Years of Experience</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            placeholder="5"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Total Projects */}
                                        <FormField
                                            control={form.control}
                                            name="totalProjects"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Total Projects</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            placeholder="15"
                                                            className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Availability Status */}
                                    <FormField
                                        control={form.control}
                                        name="isAvailable"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between border border-border p-4 rounded-xl bg-background/50">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Available for work</FormLabel>
                                                    <p className="text-sm text-muted-foreground">
                                                        Let potential clients know you&apos;re available for hiring
                                                    </p>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Description with standard Textarea */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>Professional Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us about your professional background, skills, and achievements..."
                                                        className="min-h-[160px] bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 group rounded-xl font-medium"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : 'Save Profile'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    </section>
}
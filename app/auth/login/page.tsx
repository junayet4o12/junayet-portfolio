'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { AtSign, KeyRound, Fingerprint } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import SubtleGridBg from "@/components/subtle-grid-bg";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SectionTitle from "@/components/section-title";

// Define the form schema with Zod
const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Initialize the form with React Hook Form and Zod resolver
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle form submission
    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        const toastId = toast.loading('Logging in...');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success handling
            toast.success('Successfully logged in!', { id: toastId });
            console.log("Login values:", values);

            // You would typically handle navigation or state updates here
        } catch (error) {
            toast.error('Login failed. Please try again.', { id: toastId });
            console.error("Login error:", error);
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

    return (
        <section
            className="relative min-h-screen flex items-center justify-center pb-24 bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden"
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
                    className="space-y-8 max-w-md mx-auto"
                >
                    {/* Header Section */}
                    <SectionTitle 
                    title1="WELCOME BACK"
                    title2={{
                        active: 'Account',
                        base: 'Sign in to your'
                    }}
                    subtitle=""
                    />
                    {/* Login Card */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-30 blur-xl"></div>

                        <div className="relative bg-background/60 backdrop-blur-sm border border-primary/20 p-8 md:p-10 rounded-3xl shadow-lg">
                            <div className="space-y-6">

                                {/* Login Form */}
                                <motion.div variants={itemVariants}>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <AtSign className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                                                <Input
                                                                    type="email"
                                                                    placeholder="Email address"
                                                                    className="h-12 pl-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
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
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                                                <Input
                                                                    type="password"
                                                                    placeholder="Password"
                                                                    className="h-12 pl-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
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
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                                                    </>
                                                ) : (
                                                    <>
                                                        Sign in
                                                        <motion.div
                                                            className="ml-2"
                                                            animate={{
                                                                x: [0, 4, 0],
                                                                transition: { duration: 1.5, repeat: Infinity }
                                                            }}
                                                        >
                                                            →
                                                        </motion.div>
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center pt-4">
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 flex items-center gap-1">
                                        <Fingerprint size={14} /> Secure Login
                                    </Badge>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
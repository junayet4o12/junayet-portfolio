"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Define the form schema with Zod
const formSchema = z.object({
    first_name: z.string().min(2, { message: "First name is required" }),
    last_name: z.string().min(2, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    subject: z.string().min(2, { message: "Subject is required" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize the form with React Hook Form and Zod resolver
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    // Handle form submission
    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        const toastId = toast.loading('Email is Sending...')
        try {
            // Replace these with your own Email.js service, template, and user IDs
            const serviceId = "service_rgs02nb";
            const templateId = "template_41ybc5r";

            await emailjs.send(serviceId, templateId, values, {
                publicKey: 'DuxJiAi_UCS8B-CFC',
            });

            toast.success(`Thank you for reaching out. I'll get back to you soon.`, { id: toastId });

            form.reset();
        } catch (error) {
            toast.error(`Your message couldn't be sent. Please try again.`, { id: toastId });
            console.error("Email.js error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="First name"
                                        className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Last name"
                                        className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Subject"
                                    className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Your message"
                                    className="min-h-[150px] bg-background/50 border-border focus-visible:border-primary/50 rounded-xl resize-none"
                                    {...field}
                                />
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
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                        </>
                    ) : (
                        <>
                            Send Message
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

                <p className="text-xs text-muted-foreground text-center pt-2">
                    I&apos;ll get back to you as soon as possible
                </p>
            </form>
        </Form>
    );
}
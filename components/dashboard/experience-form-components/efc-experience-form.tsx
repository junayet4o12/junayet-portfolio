import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ExperienceFormValues } from "@/schema/experience.schema";
import { Loader2, Plus, X } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

type PropsType = {
    form: UseFormReturn<ExperienceFormValues>,
    onSubmit: (values: ExperienceFormValues) => Promise<void>,
    isSubmitting: boolean,
    buttonText: string
}
export default function EFCExperienceForm({
    form,
    onSubmit,
    isSubmitting,
    buttonText
}: PropsType) {
    // Set up field array for projects
    const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
        control: form.control,
        name: "projects"
    });

    return (
        <ScrollArea className="max-h-[calc(90vh-8rem)]">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Company name"
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
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your position"
                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
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
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. January 2023 to March 2024"
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
                            name="isRemote"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            checked={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">Remote Position</FormLabel>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="offerLetterLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Offer Letter Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="URL to offer letter"
                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
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
                        name="responsibilities"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Responsibilities</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter responsibilities (one per line)"
                                        className="min-h-[120px] bg-background/50 border-border focus-visible:border-primary/50 rounded-lg resize-y"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                <p className="text-xs text-muted-foreground mt-1">Enter each responsibility on a new line</p>
                            </FormItem>
                        )}
                    />

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <FormLabel>Projects</FormLabel>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendProject({ name: '', link: '' })}
                                className="h-8 px-2 rounded-lg"
                            >
                                <Plus className="h-4 w-4 mr-1" /> Add Project
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {projectFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start">
                                    <div className="flex-1">
                                        <FormField
                                            control={form.control}
                                            name={`projects.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Project name"
                                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <FormField
                                            control={form.control}
                                            name={`projects.${index}.link`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Project link"
                                                            className="h-10 bg-background/50 border-border focus-visible:border-primary/50 rounded-lg"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeProject(index)}
                                        className="h-10 w-10 rounded-lg"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}

                            {projectFields.length === 0 && (
                                <p className="text-sm text-muted-foreground">No projects added yet</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="submit" className="rounded-lg" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {buttonText}
                        </Button>
                    </div>
                </form>
            </Form>
        </ScrollArea>
    );
}
import { z } from "zod";

export const projectSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    projectType: z.enum(["personal", "team"]),
    live_link: z.object({
        frontend: z.string().url().optional(),
        backend: z.string().url().optional(),
    }),
    code_repo: z.object({
        frontend: z.string().url().optional(),
        backend: z.string().url().optional(),
    }),
    duration: z.object({
        start: z.string(), // Consider using z.coerce.date() if you plan to validate as dates
        end: z.string(),
    }),
    role: z.string().optional(),
    teamSize: z.string().optional(),
    status: z.enum(["completed", "in progress", "on hold"]),
    demoVideo: z.string().url().optional(),
    isFeatured: z.boolean().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>

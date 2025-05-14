import { z } from "zod";


export const experienceFormSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  duration: z.string().min(1, "Duration is required"),
  isRemote: z.boolean(),
  offerLetterLink: z.string().optional(),  // Explicitly optional
  responsibilities: z.string().min(1, "Responsibilities are required"),
  projects: z.array(  // Required with default
    z.object({
      name: z.string().min(1, "Project name is required"),
      link: z.string().url("Must be a valid URL").optional(),
    })
  ),
})

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>

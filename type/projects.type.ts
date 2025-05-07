export type ProjectType = {
    id: string;
    name: string;
    description?: string;
    projectType: "personal" | "team";
    live_link: {
      frontend?: string;
      backend?: string;
    };
    code_repo: {
      frontend?: string;
      backend?: string;
    };
    technology: {
      frontend: string[];
      backend: string[];
    };
    features: {
      title: string;
      description: string; // can be HTML from React Quill
    }[];
    images: string[];
    thumbnail: string;
    duration: {
        start: string;
        end: string;
    };
    role?: string;         // Only if projectType === "team"
    teamSize?: number;     // Only if projectType === "team"
    status: "completed" | "in progress" | "on hold";
    tags: string[];
    demoVideo?: string;
    isFeatured?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  
  
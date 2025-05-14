export interface Technology {
    name: string;
    icon: React.ReactNode;
    isCore?: boolean
}

export interface TechnologyCategory {
    name: string;
    icon: React.ReactNode;
    technologies: Technology[];
}
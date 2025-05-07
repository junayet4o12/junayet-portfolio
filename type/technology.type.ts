export interface Technology {
    name: string
    icon: React.ReactNode
}

export interface TechnologyCategory {
    name: string
    icon: React.ReactNode
    technologies: Technology[]
}
'use client'
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";


export default function ViewProjectBtn() {
    const scrollToProjects = () => {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <Button
            variant="outline"
            className="lg:h-12 group border-primary/20 hover:border-primary/60"
            onClick={scrollToProjects}
        >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
    );
}
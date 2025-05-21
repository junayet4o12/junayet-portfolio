'use client'
import { ProjectType } from "@/type";
import SectionTitle from "../section-title";
import SubtleGridBg from "../subtle-grid-bg";
import { motion } from 'framer-motion'
import { useState } from "react";
import { projects } from "@/data/projects/projects";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import PCProjectCard from "../portfolio-components/pc-project-card";

import PCAddProject from "../portfolio-components/pc-add-project";
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.15
        }
    }
};
export default function Portfolio() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [allProjects, setAllProjects] = useState<ProjectType[]>(projects);



    const moveProject = (fromIndex: number, toIndex: number) => {
        const updatedProjects = [...allProjects];
        const [movedItem] = updatedProjects.splice(fromIndex, 1);
        updatedProjects.splice(toIndex, 0, movedItem);
        setAllProjects(updatedProjects);
    };


    return (
        <section className="relative flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden py-8">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <SubtleGridBg />
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="space-y-8 w-full"
                >
                    <div className="flex items-center justify-between">
                        <SectionTitle
                            title1="Portfolio"
                            title2={{
                                active: 'Projects',
                                base: 'Your Completed'
                            }}
                            subtitle="Add Your all projects including its all details"
                        />

                    </div>
                    <div className="space-y-4">
                        {
                            allProjects.length > 0 && <Button
                                variant="outline"
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                <Plus size={16} className="mr-2" />
                                Add One More Project
                            </Button>
                        }
                        {allProjects.length === 0 ? (
                            <div className="text-center py-20 border border-dashed border-border rounded-xl bg-muted/10">
                                <p className="text-muted-foreground mb-4">No Projects added yet</p>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddModalOpen(true)}
                                >
                                    <Plus size={16} className="mr-2" />
                                    Add your first Project
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {allProjects.map((pjt, index) => (
                                    <PCProjectCard
                                        setProjects={setAllProjects} projectsLength={allProjects.length} index={index} moveProject={moveProject} key={index} project={pjt} />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
            <PCAddProject isOpenModal={isAddModalOpen} setIsOpenModal={setIsAddModalOpen} projects={allProjects} setProjects={setAllProjects} />
        </section>
    );
}
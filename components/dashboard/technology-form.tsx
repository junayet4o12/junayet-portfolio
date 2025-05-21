'use client'

import SectionTitle from "../section-title";
import SubtleGridBg from "../subtle-grid-bg";
import { motion } from 'framer-motion'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";
import TFCCategoryForm from "./technology-form-components/tfc-category-form";
import TFCategoryCard from "./technology-form-components/tfc-category-card";

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

type Technology = {
    name: string;
    icon: string | ReactNode;
    isCore?: boolean
}

type TechCategory = {
    name: string;
    icon: string;
    technologies: Technology[];
}

export default function TechnologyForm() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [techCategories, setTechCategories] = useState<TechCategory[]>([]);
    const [currentEditingCategory, setCurrentEditingCategory] = useState<TechCategory | null>(null);
    const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

    const handleAddCategory = (newCategory: TechCategory) => {
        setTechCategories([...techCategories, newCategory]);
        setIsAddModalOpen(false);
    };

    const handleEditCategory = (index: number) => {
        setCurrentEditingCategory(techCategories[index]);
        setCurrentEditingIndex(index);
        setIsAddModalOpen(true);
    };

    const handleUpdateCategory = (updatedCategory: TechCategory) => {
        if (currentEditingIndex !== null) {
            const updatedCategories = [...techCategories];
            updatedCategories[currentEditingIndex] = updatedCategory;
            setTechCategories(updatedCategories);
            setIsAddModalOpen(false);
            setCurrentEditingCategory(null);
            setCurrentEditingIndex(null);
        }
    };

    const handleRemoveCategory = (index: number) => {
        setCategoryToDelete(index);
        setIsDeleteDialogOpen(true);
    };

    const confirmDeleteCategory = () => {
        if (categoryToDelete !== null) {
            const updatedCategories = techCategories.filter((_, i) => i !== categoryToDelete);
            setTechCategories(updatedCategories);
            setCategoryToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const moveCategory = (fromIndex: number, toIndex: number) => {
        const updatedCategories = [...techCategories];
        const [movedItem] = updatedCategories.splice(fromIndex, 1);
        updatedCategories.splice(toIndex, 0, movedItem);
        setTechCategories(updatedCategories);
    };

    const handleDialogClose = (open: boolean) => {
        setIsAddModalOpen(open);
        if (!open) {
            setCurrentEditingCategory(null);
            setCurrentEditingIndex(null);
        }
    };

    return (
        <>
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
                                title1="TECHNOLOGY"
                                title2={{
                                    active: 'Technologies',
                                    base: 'Your Explored '
                                }}
                                subtitle="Add all technologies you learnt and know as a professional."
                            />

                        </div>

                        <div className="space-y-4">
                            {
                                techCategories.length > 0 && <Button
                                    variant="outline"
                                    onClick={() => setIsAddModalOpen(true)}
                                >
                                    <Plus size={16} className="mr-2" />
                                    Add One More Category
                                </Button>
                            }
                            {techCategories.length === 0 ? (
                                <div className="text-center py-20 border border-dashed border-border rounded-xl bg-muted/10">
                                    <p className="text-muted-foreground mb-4">No tech categories added yet</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsAddModalOpen(true)}
                                    >
                                        <Plus size={16} className="mr-2" />
                                        Add your first category
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {techCategories.map((category, index) => (
                                        <TFCategoryCard
                                            key={`category-${index}`}
                                            category={category}
                                            index={index}
                                            onEdit={handleEditCategory}
                                            onDelete={handleRemoveCategory}
                                            onMoveUp={(idx) => moveCategory(idx, idx - 1)}
                                            onMoveDown={(idx) => moveCategory(idx, idx + 1)}
                                            isFirst={index === 0}
                                            isLast={index === techCategories.length - 1}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Confirmation Dialog */}
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete this technology category and all its technologies.
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={confirmDeleteCategory}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>
            <Dialog open={isAddModalOpen} onOpenChange={handleDialogClose}>
                <DialogContent className="!max-w-5xl mx-auto max-h-[95vh] overflow-x-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {currentEditingCategory ? 'Edit Tech Category' : 'Add Tech Category'}
                        </DialogTitle>
                        <DialogDescription>
                            {currentEditingCategory
                                ? 'Update the data of your tech category'
                                : 'Enter data of your desired Tech Category'}
                        </DialogDescription>
                    </DialogHeader>
                    <TFCCategoryForm
                        name={currentEditingCategory?.name || ''}
                        icon={currentEditingCategory?.icon || ''}
                        technologies={currentEditingCategory?.technologies || []}
                        onSave={(name, icon, technologies) => {
                            const categoryData = { name, icon, technologies };
                            if (currentEditingIndex !== null) {
                                handleUpdateCategory(categoryData);
                            } else {
                                handleAddCategory(categoryData);
                            }
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );

}
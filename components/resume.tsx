// import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { ArrowRight, X } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
export default function Resume() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} className="group md:h-12 md:text-base relative px-3 md:px-4">
                Resume
                <span className="bg-foreground size-6 md:size-8 flex justify-center items-center rounded-lg absolute right-3  md:right-4 group-hover:right-2 md:group-hover:right-3 transition-all duration-300">
                    <ArrowRight className="" size={16} />
                </span>
                <span className=" size-6 md:size-8 flex justify-center items-center rounded-lg bg-transparent text-transparent">
                    <ArrowRight className="" size={16} />
                </span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="!max-w-7xl w-[95vw] max-h-[90vh] p-0">
                    <DialogHeader className="p-4 flex flex-row items-center justify-between border-b sticky top-0 bg-background z-10">
                        <DialogTitle className="text-xl font-semibold">Resume</DialogTitle>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <X size={18} />
                            </Button>
                        </DialogClose>
                    </DialogHeader>
                    <ScrollArea className="flex-1 w-full h-[80vh]">
                        <div className="flex-1 w-full h-full overflow-hidden">
                            <iframe
                                src={`/junayet-resume.pdf`}
                                className="w-full h-[75vh]"
                                title="Resume"
                            />
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
}
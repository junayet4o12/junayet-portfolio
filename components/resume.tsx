'use client'
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
export default function Resume() {
    const handleShowResume = () => {
        window.open("/junayet-resume.pdf", "_blank");
    }
    return (
        <Button onClick={handleShowResume} className="group lg:h-12 lg:text-base relative px-3 lg:px-4">
            Resume
            <span className="bg-foreground size-6 lg:size-8 flex justify-center items-center rounded-lg absolute right-3  lg:right-4 group-hover:right-2 lg:group-hover:right-3 transition-all duration-300">
                <ArrowRight className="" size={16} />
            </span>
            <span className=" size-6 lg:size-8 flex justify-center items-center rounded-lg bg-transparent text-transparent">
                <ArrowRight className="" size={16} />
            </span>
        </Button>
    );
}
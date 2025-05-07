import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";


export default function Resume() {
    return (
        <Button className="group md:h-12 md:text-base relative px-3 md:px-4">
            Resume
            <span className="bg-foreground size-6 md:size-8 flex justify-center items-center rounded-lg absolute right-3  md:right-4 group-hover:right-2 md:group-hover:right-3 transition-all duration-300">
                <ArrowRight className="" size={16} />
            </span>
            <span className=" size-6 md:size-8 flex justify-center items-center rounded-lg bg-transparent text-transparent">
                <ArrowRight className="" size={16} />
            </span>
        </Button>
    );
}
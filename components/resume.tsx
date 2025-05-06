import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";


export default function Resume() {
    return (
        <Button className="group transition-all duration-300 uppercase">
            Resume
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
        </Button>
    );
}
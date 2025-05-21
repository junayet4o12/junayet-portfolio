import { Code } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";


export default function PCTechList({ tech, name }: { tech: string[], name: string }) {
    const [seeMore, setSeeMore] = useState(false)
    return (
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h4 className="font-medium mb-3 text-foreground flex items-center gap-1">
                <Code className="h-4 w-4 text-primary" />
                {name}
            </h4>
            <div className="flex flex-wrap gap-2">
                {tech.slice(0, seeMore ? tech.length : 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-background/70">
                        {tech}
                    </Badge>
                ))}
                {
                    tech.length > 3 && <Badge onClick={() => setSeeMore(!seeMore)} variant="secondary" className="bg-background/70 cursor-pointer">
                        {seeMore ? 'See less' : `See more ${tech.length - 3}+`}
                    </Badge>
                }
            </div>
        </div>

    );
}
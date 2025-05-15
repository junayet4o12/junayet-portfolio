import { ArrowDown, ArrowUp, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

type Technology = {
  name: string;
  icon: string | ReactNode;
  isCore?: boolean;
};

type TechCategory = {
  name: string;
  icon: string;
  technologies: Technology[];
};

interface TechCategoryCardProps {
  category: TechCategory;
  index: number;
  isLast: boolean;
  isFirst: boolean;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export default function TFCCategoryCard({
  category,
  index,
  isLast,
  isFirst,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: TechCategoryCardProps) {
  const coreTechnologies = category.technologies.filter((tech) => tech.isCore);

  return (
    <Card className="bg-card hover:bg-card/90 border border-border/30 transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {category.icon ? (
              <div
                dangerouslySetInnerHTML={{ __html: category.icon }}
                className="w-6 h-6 flex-shrink-0 text-primary"
              />
            ) : (
              <div className="w-6 h-6 rounded-md bg-muted flex-shrink-0"></div>
            )}
            <div className="font-medium text-base">{category.name}</div>
          </div>
          <div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {category.technologies.length} Technologies
            </Badge>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-sm text-muted-foreground mb-2">Core Technologies:</div>
          <div className="flex flex-wrap gap-2">
            {coreTechnologies.length > 0 ? (
              coreTechnologies.map((tech, techIndex) => (
                <Badge
                  key={`core-tech-${techIndex}`}
                  variant="secondary"
                  className="flex items-center gap-1.5"
                >
                  {tech.icon && typeof tech.icon === "string" ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: tech.icon }}
                      className="w-3 h-3 flex-shrink-0"
                    />
                  ) : null}
                  {tech.name}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No core technologies defined</span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center py-3 px-4 bg-muted/20 border-t border-border/30">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(index)}
                className="h-8 w-8"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit category</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onDelete(index)}
                className="h-8 w-8 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove category</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-1">
          {!isFirst && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMoveUp(index)}
                  className="h-8 w-8"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move up</TooltipContent>
            </Tooltip>
          )}
          {!isLast && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMoveDown(index)}
                  className="h-8 w-8"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move down</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
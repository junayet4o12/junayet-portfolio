import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import MDEditor from "@uiw/react-md-editor";
import { ArrowDown, ArrowUp, Check, Edit, PlusCircle, Save, X } from "lucide-react";
import { ReactNode, useState } from "react";

type Technology = {
  name: string;
  icon: string | ReactNode;
  isCore?: boolean
}

export default function TFCCategoryForm({ 
  name: incomingName = '', 
  icon: incomingIcon = '', 
  technologies: incomingTechnologies = [],
  onSave 
}: { 
  name?: string; 
  icon?: string; 
  technologies?: Technology[]; 
  onSave: (name: string, icon: string, technologies: Technology[]) => void; 
}) {
  const [name, setName] = useState(incomingName);
  const [icon, setIcon] = useState<string>(incomingIcon);
  const [technologies, setTechnologies] = useState<Technology[]>(incomingTechnologies);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSave = () => {
    onSave(name, icon, technologies);
  };

  const addTech = () => {
    const newItem: Technology = {
      name: `Tech ${technologies.length + 1}`,
      icon: "",
      isCore: false
    };
    setTechnologies([...technologies, newItem]);
    setEditingIndex(technologies.length);
  };

  const updateItem = (index: number, field: keyof Technology, value: string | boolean | undefined) => {
    const updatedTechs = [...technologies];
    updatedTechs[index] = {
      ...updatedTechs[index],
      [field]: typeof value === 'boolean' ? value : (value || '')
    };
    setTechnologies(updatedTechs);
  };

  const removeTech = (index: number) => {
    const updatedTechs = technologies.filter((_, i) => i !== index);
    setTechnologies(updatedTechs);

    if (editingIndex === index) {
      setEditingIndex(null);
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const toggleEditMode = (index: number) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedTechs = [...technologies];
    const [movedItem] = updatedTechs.splice(fromIndex, 1);
    updatedTechs.splice(toIndex, 0, movedItem);
    setTechnologies(updatedTechs);
    if (fromIndex === editingIndex) {
      setEditingIndex(toIndex);
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category Name</Label>
          <Input value={name} placeholder="Name" onChange={(e) => setName(e.target.value || '')} />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-2">
            <Label className="text-xs font-medium">Icon (SVG)</Label>
            <MDEditor
              preview="edit"
              hideToolbar={true}
              value={icon}
              onChange={(value) => setIcon(value || '')}
              height={110}
              className="rounded-md overflow-hidden"
            />
          </div>
          <div className="col-span-4 grid grid-rows-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Icon Preview</Label>
              <div className="flex items-center justify-center h-16 w-full border border-border rounded-md bg-background text-muted-foreground">
                <div
                  dangerouslySetInnerHTML={{ __html: icon }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Label>Technologies</Label>
        <div>
          {technologies.length === 0 ? (
            <div className="text-center py-5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTech}
              >
                <PlusCircle className="h-3.5 w-3.5 mr-1.5" /> Add First Tech
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="text-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTech}
                >
                  <PlusCircle className="h-3.5 w-3.5 mr-1.5" /> Add More
                </Button>
              </div>
              {technologies.map((tech, index) => (
                <div key={`tech-${index}`}>
                  {editingIndex === index ? (
                    <Card className="bg-card border-primary/10">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-6 space-y-2">
                            <Label htmlFor={`name-${index}`} className="text-xs font-medium">Technology Name</Label>
                            <Input
                              id={`name-${index}`}
                              placeholder="Technology Name"
                              value={tech.name}
                              onChange={(e) => updateItem(index, 'name', e.target.value)}
                              className="h-9 text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-8 space-y-2">
                            <Label className="text-xs font-medium">Icon (SVG)</Label>
                            <MDEditor
                              preview="edit"
                              hideToolbar={true}
                              value={tech.icon as string}
                              onChange={(value) => updateItem(index, 'icon', value)}
                              height={100}
                              className="rounded-md overflow-hidden"
                            />
                          </div>
                          <div className="col-span-4 grid grid-rows-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs font-medium">Icon Preview</Label>
                              <div
                                dangerouslySetInnerHTML={{ __html: tech.icon as string }}
                                className="flex items-center justify-center h-16 w-full border border-border rounded-md bg-background text-muted-foreground"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`core-${index}`} className="text-xs font-medium">Core</Label>
                              <Switch
                                id={`core-${index}`}
                                checked={tech.isCore || false}
                                onCheckedChange={(checked) => updateItem(index, 'isCore', checked)}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="flex justify-between items-center py-3 px-4 bg-muted/20 border-t border-border/30">
                        <div className="flex items-center gap-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleEditMode(index)}
                                className="gap-1.5 text-xs h-8"
                              >
                                <Check className="h-3.5 w-3.5" /> Done
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Save changes</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTech(index)}
                                className="h-8 w-8 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Remove tech</TooltipContent>
                          </Tooltip>

                        </div>
                        <div className="flex items-center gap-1">
                          {index > 0 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveItem(index, index - 1)}
                                  className="h-8 w-8"
                                >
                                  <ArrowUp className="h-3.5 w-3.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Move up</TooltipContent>
                            </Tooltip>
                          )}
                          {index < technologies.length - 1 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveItem(index, index + 1)}
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
                  ) : (
                    <div className="group bg-card hover:bg-card/80 border border-border/30 hover:border-primary/20 rounded-lg p-3 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {tech.icon ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: tech.icon as string }}
                              className="w-5 h-5 flex-shrink-0 text-muted-foreground"
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-md bg-muted flex-shrink-0"></div>
                          )}
                          <div>
                            <div className="font-medium text-sm">
                              {tech.name || 'Untitled Tech'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {tech.isCore && (
                            <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground py-0 h-5">
                              Core
                            </Badge>
                          )}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTech(index)}
                                className="h-8 w-8 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Remove tech</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleEditMode(index)}
                                className="h-7 w-7 text-muted-foreground"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit tech</TooltipContent>
                          </Tooltip>
                          <div className="flex items-center gap-1">
                            {index > 0 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => moveItem(index, index - 1)}
                                    className="h-8 w-8"
                                  >
                                    <ArrowUp className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Move up</TooltipContent>
                              </Tooltip>
                            )}
                            {index < technologies.length - 1 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => moveItem(index, index + 1)}
                                    className="h-8 w-8"
                                  >
                                    <ArrowDown className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Move down</TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-1">
                            <Label htmlFor={`core-${index}`} className="text-xs font-medium">Core</Label>
                            <Switch
                              id={`core-${index}`}
                              checked={tech.isCore || false}
                              onCheckedChange={(checked) => updateItem(index, 'isCore', checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-end mt-6">
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            <Save className="h-3.5 w-3.5 mr-1.5" /> Save Category
          </Button>
        </div>
      </div>
    </div>
  );
}
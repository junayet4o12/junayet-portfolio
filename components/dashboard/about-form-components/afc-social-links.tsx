import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import MDEditor from '@uiw/react-md-editor';
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, Check, Edit, ExternalLink, LinkIcon, PlusCircle, X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};
type SocialLinksType = {
    name: string;
    icon: string;
    link: string;
}
export default function AFCSocialLinks({ socialLinks, setSocialLinks }: { socialLinks: SocialLinksType[]; setSocialLinks: Dispatch<SetStateAction<SocialLinksType[]>> }) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const addLinks = () => {
        const newLink = {
            name: `Link ${socialLinks.length + 1}`,
            link: "",
            icon: "",
            hiddenInMobile: false
        };

        setSocialLinks([...socialLinks, newLink]);
        setEditingIndex(socialLinks.length);
    };

    const updateLink = (index: number, field: keyof SocialLinksType, value: string | boolean | undefined) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index] = {
            ...updatedLinks[index],
            [field]: typeof value === 'boolean' ? value : (value || '')
        };
        setSocialLinks(updatedLinks);
    };

    const removeLinks = (index: number) => {
        const updatedLinks = socialLinks.filter((_, i) => i !== index);
        setSocialLinks(updatedLinks);

        if (editingIndex === index) {
            setEditingIndex(null);
        } else if (editingIndex !== null && editingIndex > index) {
            setEditingIndex(editingIndex - 1);
        }
    };

    const toggleEditMode = (index: number) => {
        setEditingIndex(editingIndex === index ? null : index);
    };

    const moveLink = (fromIndex: number, toIndex: number) => {
        const updatedLinks = [...socialLinks];
        const [movedLink] = updatedLinks.splice(fromIndex, 1);
        updatedLinks.splice(toIndex, 0, movedLink);
        setSocialLinks(updatedLinks);
        if (fromIndex === editingIndex) {
            setEditingIndex(toIndex);
        }

    };
    return (
        <motion.div variants={itemVariants} className="relative w-full max-w-5xl mx-auto">
            <Card className="border-primary/10 shadow-md bg-background/70 backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-primary/10 p-1.5">
                                <LinkIcon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-semibold text-base">Social Links</span>
                            <Badge variant="outline" className="ml-1 text-xs font-normal">
                                {socialLinks.length} {socialLinks.length === 1 ? 'link' : 'links'}
                            </Badge>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant={socialLinks.length >= 6 ? "ghost" : "default"}
                                size="sm"
                                onClick={addLinks}
                                className="flex items-center gap-1.5 shadow-sm text-sm"
                                disabled={socialLinks.length >= 6}
                            >
                                <PlusCircle className="h-3.5 w-3.5" /> Add Link
                            </Button>
                        </div>
                    </div>
                    <Separator className="my-2" />
                </CardHeader>

                <CardContent>
                    <ScrollArea className="max-h-[60vh] overflow-x-hidden  pr-4">
                        {socialLinks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
                                <div className="rounded-full bg-muted p-3">
                                    <LinkIcon className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-base font-medium">No Social Links</h3>
                                <p className="text-sm text-muted-foreground max-w-md">
                                    Add your first social links .
                                </p>
                                <Button
                                    type="button"
                                    variant="default"
                                    size="sm"
                                    onClick={addLinks}
                                    className="mt-2 flex items-center gap-1.5"
                                >
                                    <PlusCircle className="h-3.5 w-3.5" /> Add First Social
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {socialLinks.map((link, index) => (
                                    <div key={`link-${index}`}>
                                        {editingIndex === index ? (
                                            <Card className="bg-card border-primary/10">
                                                <CardContent className="p-4 space-y-4">
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-6 space-y-2">
                                                            <Label htmlFor={`name-${index}`} className="text-xs font-medium">Link Name</Label>
                                                            <Input
                                                                id={`name-${index}`}
                                                                placeholder="About Us"
                                                                value={link.name}
                                                                onChange={(e) => updateLink(index, 'name', e.target.value)}
                                                                className="h-9 text-sm"
                                                            />
                                                        </div>
                                                        <div className="col-span-6 space-y-2">
                                                            <Label htmlFor={`link-${index}`} className="text-xs font-medium">
                                                                URL Path
                                                                <span className="ml-1 text-muted-foreground">(e.g. #https://github/junayet4o12)</span>
                                                            </Label>
                                                            <Input
                                                                id={`link-${index}`}
                                                                placeholder="/about"
                                                                value={link.link}
                                                                onChange={(e) => updateLink(index, 'link', e.target.value)}
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
                                                                value={link.icon}
                                                                onChange={(value) => updateLink(index, 'icon', value)}
                                                                height={100}
                                                                className="rounded-md overflow-hidden"
                                                            />
                                                        </div>
                                                        <div className="col-span-4 gap-4">
                                                            <div className="space-y-2">
                                                                <Label className="text-xs font-medium">Icon Preview</Label>
                                                                <div
                                                                    dangerouslySetInnerHTML={{ __html: link.icon }}
                                                                    className="flex items-center justify-center h-16 w-full border border-border rounded-md bg-background text-muted-foreground"
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
                                                                    onClick={() => removeLinks(index)}
                                                                    className="h-8 w-8 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <X className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>Remove link</TooltipContent>
                                                        </Tooltip>

                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {index > 0 && (
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        type='button'
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => moveLink(index, index - 1)}
                                                                        className="h-8 w-8"
                                                                    >
                                                                        <ArrowUp className="h-3.5 w-3.5" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Move up</TooltipContent>
                                                            </Tooltip>
                                                        )}
                                                        {index < socialLinks.length - 1 && (
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        type='button'
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => moveLink(index, index + 1)}
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
                                                        {link.icon ? (
                                                            <div
                                                                dangerouslySetInnerHTML={{ __html: link.icon }}
                                                                className="w-5 h-5 flex-shrink-0 text-muted-foreground"
                                                            />
                                                        ) : (
                                                            <div className="w-5 h-5 rounded-md bg-muted flex-shrink-0"></div>
                                                        )}
                                                        <div>
                                                            <div className="font-medium text-sm">
                                                                {link.name || 'Untitled Link'}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                                {link.link ? (
                                                                    <>
                                                                        <ExternalLink className="h-3 w-3" />
                                                                        {link.link}
                                                                    </>
                                                                ) : (
                                                                    'No link defined'
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => removeLinks(index)}
                                                                    className="h-8 w-8 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
                                                                >
                                                                    <X className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>Remove link</TooltipContent>
                                                        </Tooltip>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => toggleEditMode(index)}
                                                                    className="h-7 w-7 text-muted-foreground transition-opacity"
                                                                >
                                                                    <Edit className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>Edit link</TooltipContent>
                                                        </Tooltip>
                                                        <div className="flex items-center gap-1">
                                                            {index > 0 && (
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button
                                                                            type='button'
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() => moveLink(index, index - 1)}
                                                                            className="h-8 w-8"
                                                                        >
                                                                            <ArrowUp className="h-3.5 w-3.5" />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>Move up</TooltipContent>
                                                                </Tooltip>
                                                            )}
                                                            {index < socialLinks.length - 1 && (
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button
                                                                            type='button'
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() => moveLink(index, index + 1)}
                                                                            className="h-8 w-8"
                                                                        >
                                                                            <ArrowDown className="h-3.5 w-3.5" />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>Move down</TooltipContent>
                                                                </Tooltip>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </motion.div>
    );
}
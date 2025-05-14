'use client'
import React, { useState, useEffect } from "react";
import SubtleGridBg from "../subtle-grid-bg";
import SectionTitle from "../section-title";
import { motion } from 'framer-motion'
import {
  LinkIcon, PlusCircle, X, Edit, Eye,
  EyeOff, Save,
  Check, ExternalLink, ArrowUp, ArrowDown,
  Info, AlertCircle
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MDEditor from "@uiw/react-md-editor";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

type ItemType = {
  name: string;
  icon: string;
  link: string;
  hiddenInMobile?: boolean;
}

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const desktopPreviewVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function NavbarBuilder() {
  const [navbarItems, setNavbarItems] = useState<ItemType[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [preview, setPreview] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState("desktop");
  const [savedState, setSavedState] = useState(false);

  // Example nav items for professional appearance
  useEffect(() => {
    if (navbarItems.length === 0) {
      setNavbarItems([
        {
          name: "Home",
          link: "/",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
          hiddenInMobile: false
        },
        {
          name: "Portfolio",
          link: "/portfolio",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>',
          hiddenInMobile: false
        }
      ]);
    }
  }, []);

  const addItems = () => {
    const newItem = {
      name: `Item ${navbarItems.length + 1}`,
      link: "",
      icon: "",
      hiddenInMobile: false
    };

    setNavbarItems([...navbarItems, newItem]);
    setEditingIndex(navbarItems.length);
    setSavedState(false);
  };

  const updateItem = (index: number, field: keyof ItemType, value: string | boolean | undefined) => {
    const updatedLinks = [...navbarItems];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: typeof value === 'boolean' ? value : (value || '')
    };
    setNavbarItems(updatedLinks);
    setSavedState(false);
  };

  const removeItems = (index: number) => {
    const updatedLinks = navbarItems.filter((_, i) => i !== index);
    setNavbarItems(updatedLinks);

    if (editingIndex === index) {
      setEditingIndex(null);
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
    setSavedState(false);
  };

  const toggleEditMode = (index: number) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedLinks = [...navbarItems];
    const [movedItem] = updatedLinks.splice(fromIndex, 1);
    updatedLinks.splice(toIndex, 0, movedItem);
    setNavbarItems(updatedLinks);
    if (fromIndex === editingIndex) {
      setEditingIndex(toIndex);
    }
    setSavedState(false);
  };

  const handleSave = () => {
    // Simulate save action
    setSavedState(true);
    setTimeout(() => {
      setSavedState(false);
    }, 2000);
  };

  const renderDesktopPreview = () => (
    <motion.div
      variants={desktopPreviewVariants}
      className="rounded-xl border border-border/40 bg-card w-full p-4 shadow-md"
    >
      <div className="flex h-4 items-center justify-start space-x-1.5 px-2">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/70"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70"></div>
      </div>
      <div className="mt-3 flex h-8 w-full items-center justify-between border-b border-border/30 px-4 pb-1.5 relative w-full">
        <div className="h-3 w-24 bg-foreground/10 rounded-sm"></div>
        <div className="flex w-auto items-center justify-center rounded-full bg-muted/30 backdrop-blur-sm px-2 py-0.5 ml-auto absolute right-0">
          {navbarItems.map((item, idx) => (
            <p
              key={`desktop-${idx}`}
              className={cn(
                "relative whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium transition-all duration-200",
                idx === 0
                  ? "text-primary-foreground bg-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
              <span>{item.name}</span>
            </p>
          ))}
        </div>
        <div className="h-3 w-10 bg-foreground/10 rounded-sm"></div>
      </div>
      <div className="mt-6 flex h-28 w-full flex-col items-center justify-center space-y-2">
        <div className="h-5 w-48 bg-foreground/10 rounded-sm"></div>
        <div className="h-3 w-72 bg-foreground/5 rounded-sm"></div>
        <div className="h-8 w-36 bg-primary/20 rounded-md mt-2"></div>
      </div>
      <p className="text-xs font-medium text-muted-foreground text-center mt-4">Desktop Preview</p>
    </motion.div>
  );

  const renderMobilePreview = () => (
    <motion.div
      variants={desktopPreviewVariants}
      className="rounded-xl border border-border/40 bg-card shadow-md w-78 mx-auto overflow-hidden"
    >
      <div className="flex h-3 items-center justify-center space-x-1 px-1 py-2">
        <div className="h-1.5 w-16 rounded-full bg-foreground/10"></div>
      </div>
      <div className="h-32 w-full border-b border-border/20 flex items-center justify-center">
        <div className="h-5 w-16 bg-foreground/10 rounded-sm"></div>
      </div>
      <div className="bg-background/90 backdrop-blur-md border-t border-border w-full">
        <div className="flex items-center justify-around h-12 gap-1">
          {navbarItems.filter(item => !item.hiddenInMobile).map((item) => (
            <div
              key={item.name}
              className="relative flex flex-col items-center justify-center h-full"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${navbarItems[0].name === item.name
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}>
                <span>{React.cloneElement(<span dangerouslySetInnerHTML={{ __html: item.icon }}></span>)}</span>
              </div>
              {navbarItems[0].name === item.name && (
                <motion.div
                  layoutId="activeBottomNav"
                  className="absolute top-0 w-4/5 h-1 bg-primary rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs font-medium text-muted-foreground text-center mt-2 mb-2">Mobile Preview</p>
    </motion.div>
  );

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
          className="space-y-8 w-full "
        >
          <SectionTitle
            title1="NAVIGATION"
            title2={{
              active: 'Builder',
              base: 'Menu'
            }}
            subtitle="Customize your website navigation menu items and structure"
          />

          <div className={`gap-6 w-full ${preview ? 'grid lg:grid-cols-2' : ''}`}>
            {preview && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <Tabs
                    defaultValue="desktop"
                    value={activePreviewTab}
                    onValueChange={setActivePreviewTab}
                    className="w-auto"
                  >
                    <TabsList className="grid w-48 grid-cols-2">
                      <TabsTrigger value="desktop">Desktop</TabsTrigger>
                      <TabsTrigger value="mobile">Mobile</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-br from-background/80 to-muted/20 rounded-xl p-6">
                  {navbarItems.length < 1 ? (
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <AlertCircle className="h-8 w-8 text-muted-foreground" />
                      <h3 className="text-base font-medium">No navigation items</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Add your first menu item to start building your navigation.
                      </p>
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={addItems}
                        className="mt-1 flex items-center gap-1.5"
                      >
                        <PlusCircle className="h-3.5 w-3.5" /> Add First Item
                      </Button>
                    </div>
                  ) : (
                    <>
                      {activePreviewTab === "desktop" && renderDesktopPreview()}
                      {activePreviewTab === "mobile" && renderMobilePreview()}
                    </>
                  )}
                </div>

                {navbarItems.length > 0 && (
                  <div className="rounded-lg bg-muted/30 border border-border/30 p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Info className="h-4 w-4 text-blue-400" />
                      <span>
                        {navbarItems.filter(item => !item.hiddenInMobile).length} of {navbarItems.length} items
                        visible on mobile devices
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="relative w-full max-w-5xl mx-auto">
              <Card className="border-primary/10 shadow-md bg-background/70 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <LinkIcon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-semibold text-base">Navigation Items</span>
                      <Badge variant="outline" className="ml-1 text-xs font-normal">
                        {navbarItems.length} {navbarItems.length === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPreview(!preview)}
                        className="flex items-center gap-1.5 shadow-sm text-sm"
                      >
                        {preview ? <><EyeOff className="h-3.5 w-3.5" /> Hide Preview</> :
                          <><Eye className="h-3.5 w-3.5" /> Show Preview</>}
                      </Button>
                      <Button
                        type="button"
                        variant={navbarItems.length >= 6 ? "ghost" : "default"}
                        size="sm"
                        onClick={addItems}
                        className="flex items-center gap-1.5 shadow-sm text-sm"
                        disabled={navbarItems.length >= 6}
                      >
                        <PlusCircle className="h-3.5 w-3.5" /> Add Item
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-2" />
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[60vh] pr-4">
                    {navbarItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
                        <div className="rounded-full bg-muted p-3">
                          <LinkIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-base font-medium">No navigation menu items</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Add your first menu item to start building your site navigation. Include links to your portfolio, services, blog, or contact page.
                        </p>
                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          onClick={addItems}
                          className="mt-2 flex items-center gap-1.5"
                        >
                          <PlusCircle className="h-3.5 w-3.5" /> Add First Menu Item
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {navbarItems.map((item, index) => (
                          <div key={`item-${index}`}>
                            {editingIndex === index ? (
                              <Card className="bg-card border-primary/10">
                                <CardContent className="p-4 space-y-4">
                                  <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-6 space-y-2">
                                      <Label htmlFor={`name-${index}`} className="text-xs font-medium">Menu Label</Label>
                                      <Input
                                        id={`name-${index}`}
                                        placeholder="About Us"
                                        value={item.name}
                                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                                        className="h-9 text-sm"
                                      />
                                    </div>
                                    <div className="col-span-6 space-y-2">
                                      <Label htmlFor={`link-${index}`} className="text-xs font-medium">
                                        URL Path
                                        <span className="ml-1 text-muted-foreground">(e.g. #about)</span>
                                      </Label>
                                      <Input
                                        id={`link-${index}`}
                                        placeholder="/about"
                                        value={item.link}
                                        onChange={(e) => updateItem(index, 'link', e.target.value)}
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
                                        value={item.icon}
                                        onChange={(value) => updateItem(index, 'icon', value)}
                                        height={100}
                                        className="rounded-md overflow-hidden"
                                      />
                                    </div>
                                    <div className="col-span-4 grid grid-rows-2 gap-4">
                                      <div className="space-y-2">
                                        <Label className="text-xs font-medium">Icon Preview</Label>
                                        <div
                                          dangerouslySetInnerHTML={{ __html: item.icon }}
                                          className="flex items-center justify-center h-16 w-full border border-border rounded-md bg-background text-muted-foreground"
                                        />
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <Label htmlFor={`mobile-${index}`} className="text-xs font-medium">Show on Mobile</Label>
                                        <Switch
                                          id={`mobile-${index}`}
                                          checked={!item.hiddenInMobile}
                                          onCheckedChange={(checked) => updateItem(index, 'hiddenInMobile', !checked)}
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
                                          onClick={() => removeItems(index)}
                                          className="h-8 w-8 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
                                        >
                                          <X className="h-3.5 w-3.5" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Remove item</TooltipContent>
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
                                    {index < navbarItems.length - 1 && (
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
                                    {item.icon ? (
                                      <div
                                        dangerouslySetInnerHTML={{ __html: item.icon }}
                                        className="w-5 h-5 flex-shrink-0 text-muted-foreground"
                                      />
                                    ) : (
                                      <div className="w-5 h-5 rounded-md bg-muted flex-shrink-0"></div>
                                    )}
                                    <div>
                                      <div className="font-medium text-sm">
                                        {item.name || 'Untitled Item'}
                                        {index === 0 && (
                                          <Badge className="ml-2 bg-primary/20 text-primary border-0 text-[10px] font-normal px-1.5 py-0">Active</Badge>
                                        )}
                                      </div>
                                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                        {item.link ? (
                                          <>
                                            <ExternalLink className="h-3 w-3" />
                                            {item.link}
                                          </>
                                        ) : (
                                          'No link defined'
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {item.hiddenInMobile && (
                                      <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground py-0 h-5">
                                        Desktop Only
                                      </Badge>
                                    )}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => removeItems(index)}
                                          className="h-8 w-8 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
                                        >
                                          <X className="h-3.5 w-3.5" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Remove item</TooltipContent>
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
                                      <TooltipContent>Edit item</TooltipContent>
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
                                      {index < navbarItems.length - 1 && (
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
                                      <Label htmlFor={`mobile-${index}`} className="text-xs font-medium">Mobile</Label>
                                      <Switch
                                        id={`mobile-${index}`}
                                        checked={!item.hiddenInMobile}
                                        onCheckedChange={(checked) => updateItem(index, 'hiddenInMobile', !checked)}
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
                  </ScrollArea>
                </CardContent>

                {navbarItems.length > 0 && (
                  <CardFooter className="flex justify-between items-center pt-3 pb-3 border-t border-border/30 bg-muted/10">
                    <div className="text-xs text-muted-foreground">
                      {navbarItems.filter(item => !item.hiddenInMobile).length} of {navbarItems.length} items shown on mobile
                    </div>
                    <Button
                      type="button"
                      variant={savedState ? "outline" : "default"}
                      size="sm"
                      className={cn(
                        "flex items-center gap-1.5 shadow-sm min-w-[80px]",
                        savedState && "bg-emerald-600 text-white hover:bg-emerald-700"
                      )}
                      onClick={handleSave}
                    >
                      {savedState ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                      {savedState ? "Saved" : "Save Changes"}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
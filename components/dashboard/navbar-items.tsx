'use client'
import React, { useState } from "react";
import SubtleGridBg from "../subtle-grid-bg";
import SectionTitle from "../section-title";
import { motion } from 'framer-motion'
import { LinkIcon, PlusCircle, XCircle, Edit, Eye, ChevronDown, ChevronUp, EyeClosed, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MDEditor from "@uiw/react-md-editor";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function NavbarItems() {
  const [navbarItems, setNavbarItems] = useState<ItemType[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [preview, setPreview] = useState(false)
  const addItems = () => {
    const newItem = {
      name: `Item ${navbarItems.length + 1}`,
      link: "",
      icon: "",
      hiddenInMobile: false
    };

    setNavbarItems([...navbarItems, newItem]);
    setEditingIndex(navbarItems.length);
  };

  const updateItem = (index: number, field: keyof ItemType, value: string | boolean | undefined) => {
    const updatedLinks = [...navbarItems];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: typeof value === 'boolean' ? value : (value || '')
    };
    setNavbarItems(updatedLinks);
  };

  const removeItems = (index: number) => {
    const updatedLinks = navbarItems.filter((_, i) => i !== index);
    setNavbarItems(updatedLinks);

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
    const updatedLinks = [...navbarItems];
    const [movedItem] = updatedLinks.splice(fromIndex, 1);
    updatedLinks.splice(toIndex, 0, movedItem);
    setNavbarItems(updatedLinks);
    setEditingIndex(toIndex)
  };
  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <SubtleGridBg />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10 flex gap-4">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-8 w-full"
        >
          <SectionTitle
            title1="NAVIGATION"
            title2={{
              active: 'Builder',
              base: 'Menu'
            }}
            subtitle="Customize your website navigation menu"
          />

          <div className={`gap-4 w-full grid ${preview ? 'md:grid-cols-2' : ''}`}>
            {preview && (navbarItems.length < 1 ? <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
              <LinkIcon className="h-10 w-10 text-muted-foreground" />
              <h3 className="text-lg font-medium">No menu items yet</h3>
              <p className="text-muted-foreground max-w-md">
                Add your first menu item to start building your navigation. Include links to your portfolio, blog, or contact page.
              </p>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addItems}
                className="mt-2 flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" /> Add First Item
              </Button>
            </div> : <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-4"
            >
              <Label>Preview</Label>
              <div className=" space-y-2">
                <div className="flex w-full items-center justify-center rounded-full bg-muted/50 p-1 backdrop-blur-sm mr-4">
                  {navbarItems.map((item) => (
                    <p
                      key={item.name}
                      className={`relative w-full px-4 py-2 rounded-full flex items-center gap-1.5 text-xs font-medium transition-all duration-200 ${navbarItems[0].name === item.name
                        ? 'text-primary-foreground bg-primary'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >

                      <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                      <span>{item.name}</span>
                    </p>
                  ))}
                </div>
                <p className="text-sm font-bold text-center">(Desktop View)</p>
              </div>
              <div className="space-y-2 mt-10">
                <div className="bg-background/90 backdrop-blur-md border-t border-border shadow-lg w-full">
                  <div className="flex items-center justify-around h-14 gap-2">
                    {navbarItems.filter(item => !item.hiddenInMobile).map((item) => (
                      <p
                        key={item.name}
                        className="relative flex flex-col items-center justify-center h-full"
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${navbarItems[0].name === item.name
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                          }`}>
                          <span className="w-5 h-5">{React.cloneElement(<span dangerouslySetInnerHTML={{ __html: item.icon }}></span>, { size: 20 })}</span>
                        </div>
                        {navbarItems[0].name === item.name && (
                          <motion.div
                            layoutId="activeBottomNav"
                            className="absolute top-0 w-4/5 h-1 bg-primary rounded-full"
                          />
                        )}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-bold text-center">(Mobile View)</p>
              </div>
            </motion.div>)}
            <motion.div variants={itemVariants} className="relative w-full max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-30 blur-xl"></div>

              <div className="relative bg-background/60 backdrop-blur-sm border border-primary/20 p-6 md:p-8 rounded-3xl shadow-lg">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-primary" />
                      <span className="font-medium text-lg">Menu Items</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {navbarItems.length} {navbarItems.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPreview(!preview)}
                        className="flex items-center gap-2 shadow-sm"
                      >
                        {preview ? <><EyeClosed className="h-4 w-4" /> Close</> :
                          <><Eye className="h-4 w-4" /> Preview</>}
                      </Button>
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={addItems}
                        className="flex items-center gap-2 shadow-sm"
                      >
                        <PlusCircle className="h-4 w-4" /> Add Item
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="h-[60vh] overflow-y-auto overflow-x-hidden">
                    {navbarItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                        <LinkIcon className="h-10 w-10 text-muted-foreground" />
                        <h3 className="text-lg font-medium">No menu items yet</h3>
                        <p className="text-muted-foreground max-w-md">
                          Add your first menu item to start building your navigation. Include links to your portfolio, blog, or contact page.
                        </p>
                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          onClick={addItems}
                          className="mt-2 flex items-center gap-2"
                        >
                          <PlusCircle className="h-4 w-4" /> Add First Item
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-y-4">
                        {navbarItems.map((item, index) => (
                          <div key={item.name}>
                            {editingIndex === index ? (
                              <div className="bg-background/80 border border-border rounded-xl p-4 space-y-4">
                                <div className="grid grid-cols-12 gap-3">
                                  <div className="col-span-5 space-y-2">
                                    <Label htmlFor={`name-${index}`}>Label</Label>
                                    <Input
                                      id={`name-${index}`}
                                      placeholder="About Me"
                                      value={item.name}
                                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                                      className="bg-background border-border focus-visible:border-primary/50 rounded-lg"
                                    />
                                  </div>
                                  <div className="col-span-5 space-y-2">
                                    <Label htmlFor={`link-${index}`}>URL</Label>
                                    <Input
                                      id={`link-${index}`}
                                      placeholder="https://example.com/about"
                                      value={item.link}
                                      onChange={(e) => updateItem(index, 'link', e.target.value)}
                                      className="bg-background border-border focus-visible:border-primary/50 rounded-lg"
                                    />
                                  </div>
                                  <div className="col-span-2 flex items-end justify-end gap-2">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => toggleEditMode(index)}
                                          className="hover:bg-background"
                                        >
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Preview</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => removeItems(index)}
                                          className="hover:bg-destructive/10 hover:text-destructive"
                                        >
                                          <XCircle className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Remove</TooltipContent>
                                    </Tooltip>
                                  </div>
                                </div>

                                <div className="grid grid-cols-12 gap-3">
                                  <div className="col-span-10 space-y-2">
                                    <Label>Icon SVG</Label>
                                    <MDEditor
                                      preview="edit"
                                      hideToolbar={true}
                                      value={item.icon}
                                      onChange={(value) => updateItem(index, 'icon', value)}
                                      height={120}
                                      className="rounded-lg border-border"
                                    />
                                  </div>
                                  <div className="col-span-2 flex flex-col justify-between">
                                    <div className="space-y-2">
                                      <Label>Preview</Label>
                                      <div
                                        dangerouslySetInnerHTML={{ __html: item.icon }}
                                        className="flex items-center justify-center h-16 w-16 border border-border rounded-lg bg-background"
                                      />
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                      <Label htmlFor={`mobile-${index}`}>Mobile</Label>
                                      <Switch
                                        id={`mobile-${index}`}
                                        checked={!item.hiddenInMobile}
                                        onCheckedChange={(checked) => updateItem(index, 'hiddenInMobile', !checked)}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Item {index + 1} of {navbarItems.length}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    {index > 0 && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => moveItem(index, index - 1)}
                                        className="gap-1"
                                      >
                                        <ChevronUp className="h-4 w-4" /> Move Up
                                      </Button>
                                    )}
                                    {index < navbarItems.length - 1 && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => moveItem(index, index + 1)}
                                        className="gap-1"
                                      >
                                        <ChevronDown className="h-4 w-4" /> Move Down
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-background/50 hover:bg-background/70 border border-border rounded-xl p-4 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    {item.icon && (
                                      <div
                                        dangerouslySetInnerHTML={{ __html: item.icon }}
                                        className="w-5 h-5 flex-shrink-0 text-muted-foreground"
                                      />
                                    )}
                                    <div>
                                      <div className="font-medium">{item.name || 'Untitled Item'}</div>
                                      <div className="text-sm text-muted-foreground line-clamp-1">
                                        {item.link || 'No URL provided'}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {item.hiddenInMobile && (
                                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                                        Desktop Only
                                      </span>
                                    )}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => toggleEditMode(index)}
                                      className="text-primary hover:bg-primary/10"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>

                  {navbarItems.length > 0 && (
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/50">
                      <div className="text-sm text-muted-foreground">
                        {navbarItems.filter(item => !item.hiddenInMobile).length} visible on mobile
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" /> Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
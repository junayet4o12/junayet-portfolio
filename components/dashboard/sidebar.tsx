'use client'
import React, { useState, useEffect } from 'react';
import {
    User,
    Briefcase,
    Image as ImageIcon,
    Code,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    GalleryVertical,
    AlignJustify,
    BrainCircuit,
    Mailbox,
    PanelBottom,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../mode-toggle';
import SubtleGridBg from '../subtle-grid-bg';

const navItems = [
    { name: 'HERO', icon: <GalleryVertical size={18} />, href: '/dashboard' },
    { name: 'NAVBAR', icon: <AlignJustify size={18} />, href: '/dashboard/navbar' },
    { name: 'ABOUT', icon: <User size={18} />, href: '/dashboard/about' },
    { name: 'EXPERIENCE', icon: <Briefcase size={18} />, href: '/dashboard/experience' },
    { name: 'TECHNOLOGY', icon: <BrainCircuit size={18} />, href: '/dashboard/technology' },
    { name: 'PORTFOLIO', icon: <ImageIcon size={18} />, href: '/dashboard/portfolio' },
    { name: 'EDUCATION', icon: <BookOpen size={18} />, href: '/dashboard/education' },
    { name: 'SERVICE', icon: <Code size={18} />, href: '/dashboard/service' },
    { name: 'CONTACT', icon: <Mailbox size={18} />, href: '/dashboard/service' },
    { name: 'FOOTER', icon: <PanelBottom size={18} />, href: '/dashboard/service' },
    
    
];

export default function Sidebar() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState(pathname);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        setActiveSection(pathname);
    }, [pathname]);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const sidebarWidth = expanded ? "w-[240px] sm:w-[300px]" : "w-[80px]";

    return (
        <div className={`relative h-screen overflow-hidden ${expanded ? 'min-w-[240px] sm:min-w-[300px]' : 'min-w-[80px]'}`}>
           
            <div className={`overflow-hidden ${sidebarWidth} p-0 h-screen fixed left-0 transition-all duration-300`}>
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Subtle grid background */}
                    <SubtleGridBg />
            
                    {/* Gradient orbs */}
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
            
                    {/* Decorative elements */}
                    <div className="absolute bottom-20 right-[15%] w-20 h-20 border border-primary/20 rounded-full"></div>
                    <div className="absolute bottom-32 left-[10%] w-12 h-12 border border-primary/10 rounded-full"></div>
                    <div className="absolute bottom-1/2 left-[5%] w-6 h-6 bg-primary/20 rounded-full"></div>
                    <div className="absolute bottom-1/4 right-[5%] w-8 h-8 bg-primary/10 rounded-full"></div>
                  </div>
                <div className="flex flex-col h-full">
                    {/* Logo, collapse button and header */}
                    <div className={`border-b border-border p-4 gap-2 flex items-start justify-between ${!expanded && 'flex-col-reverse'}`}>
                        {expanded ? (
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                    <span className="font-bold text-lg">J</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-foreground text-lg font-bold leading-none tracking-wide">JUNAYET</span>
                                    <span className="text-muted-foreground text-xs">Developer</span>
                                </div>
                            </Link>
                        ) : (
                           <Link href="/">
                                <div className="flex w-full">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white">
                                        <span className="font-bold text-lg">J</span>
                                    </div>
                                </div>
                           </Link>
                        )}
                        
                        <button 
                            onClick={toggleSidebar}
                            className={`p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer ${!expanded && 'mx-auto'}`}
                            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                        </button>
                    </div>

                    {/* Navigation items */}
                    <div className="flex-1 py-6 px-4">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === item.href ? 'bg-primary/20 text-primary' : 'text-foreground'} ${!expanded && 'w-max'}`}
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    {expanded && <span>{item.name}</span>}
                                    {expanded && activeSection === item.href && (
                                        <motion.div
                                            layoutId="activeSidebarIndicator"
                                            className="ml-auto w-1.5 h-5 bg-primary rounded-full"
                                        />
                                    )}
                                    {!expanded && activeSection === item.href && (
                                        <motion.div
                                            layoutId="activeSidebarIndicator"
                                            className="ml-auto w-1.5 h-5 bg-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="border-t border-border p-4">
                        <div className="flex items-center justify-between">
                            {expanded && <p className="text-xs text-muted-foreground">© 2025 Junayet</p>}
                            <div className={expanded ? "" : "w-full flex justify-center"}>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
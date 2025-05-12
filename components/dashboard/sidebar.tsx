'use client'
import React, { useState, useEffect } from 'react';
import {
    Home,
    User,
    Briefcase,
    Image as ImageIcon,
    Code,
    BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../theme-toggle';

const navItems = [
    { name: 'DASHBOARD', icon: <Home size={18} />, href: '/dashboard' },
    { name: 'ABOUT', icon: <User size={18} />, href: '/dashboard/about' },
    { name: 'EXPERIENCE', icon: <Briefcase size={18} />, href: '/dashboard/experience' },
    { name: 'PORTFOLIO', icon: <ImageIcon size={18} />, href: '/dashboard/portfolio' },
    { name: 'SERVICE', icon: <Code size={18} />, href: '/dashboard/service' },
    { name: 'EDUCATION', icon: <BookOpen size={18} />, href: '/dashboard/education' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState(pathname);

    useEffect(() => {
        setActiveSection(pathname);
    }, [pathname]);

    return (
        <div className='min-w-[240px] sm:min-w-[300px]'>
            <div className="w-[240px] sm:w-[300px] p-0 h-screen fixed left-0">
                <div className="flex flex-col h-full">
                    {/* Logo and close button */}
                    <div className="border-b border-border p-4">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                    <span className="font-bold text-lg">J</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-foreground text-lg font-bold leading-none tracking-wide">JUNAYET</span>
                                    <span className="text-muted-foreground text-xs">Developer</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation items */}
                    <div className="flex-1 py-6 px-4">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === item.href ? 'bg-primary/20 text-primary' : 'text-foreground'}`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                    {activeSection === item.href && (
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
                            <p className="text-xs text-muted-foreground">© 2025 Junayet</p>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

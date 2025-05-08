'use client'

import { Button } from '@/components/ui/button';
import { Github, ArrowUpRight, Mail,  Code } from 'lucide-react';
import { Facebook, Linkedin } from 'lucide-react';
import { cloneElement, useEffect, useState } from 'react';
import { Home, User, Briefcase, Image as ImageIcon, FileText } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'HOME', icon: <Home size={16} />, href: '#hero' },
    { name: 'ABOUT', icon: <User size={16} />, href: '#about' },
    { name: 'EXPERIENCE', icon: <Briefcase size={16} />, href: '#experience' },
    { name: 'PORTFOLIO', icon: <ImageIcon size={16} />, href: '#projects' },
    { name: 'SERVICE', icon: <Code size={16} />, href: '#services' },
    { name: 'CONTACT', icon: <FileText size={16} />, href: '#contact' },
  ];
export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('#hero');
    const [isScrolled, setIsScrolled] = useState(false);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(href);
        }
    };

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                // Show navbar when scrolling up or at top
                if (window.scrollY < lastScrollY || window.scrollY < 10) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
                
                // Add shadow when scrolled
                if (window.scrollY > 20) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
                
                setLastScrollY(window.scrollY);
            }
        };

        // Check which section is in viewport
        const handleScroll = () => {
            const sections = navItems.map(item => item.href);
            let currentSection = '#hero';
            
            for (const section of sections) {
                const element = document.querySelector(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentSection = section;
                        break;
                    }
                }
            }
            
            setActiveSection(currentSection);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [lastScrollY]);

    return (
        <>
            {/* Status Bar */}
            <div className="bg-background border-b border-border z-20 relative h-12">
                <div className="container mx-auto px-4 h-12 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-muted-foreground text-xs sm:text-sm font-medium">
                            Available for Office Work
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://www.facebook.com/junayet4012/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                            className="text-muted-foreground hover:text-primary transition-all duration-200 opacity-70 hover:opacity-100">
                            <Facebook size={18} />
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/junayet-alam/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="text-muted-foreground hover:text-primary transition-all duration-200 opacity-70 hover:opacity-100">
                            <Linkedin size={18} />
                        </Link>
                        <Link
                            href="https://github.com/junayet4o12"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="text-muted-foreground hover:text-primary transition-all duration-200 opacity-70 hover:opacity-100">
                            <Github size={18} />
                        </Link>
                        <div className="h-4 w-px bg-border mx-2 hidden lg:block"></div>
                        <Link className='hidden lg:block' href="#contact">
                            <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90 text-xs gap-1.5 h-8">
                                <Mail size={14} />
                                Contact Me
                                <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                } ${
                    isScrolled 
                        ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50' 
                        : 'bg-background/60 backdrop-blur-sm border-b border-border'
                }`}
            >
                <nav className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                <span className="font-bold text-lg">J</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-foreground text-lg font-bold leading-none tracking-wide">JUNAYET</span>
                                <span className="text-muted-foreground text-xs">Developer</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center">
                            <div className="flex items-center rounded-full bg-muted/50 p-1 backdrop-blur-sm mr-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className={`relative px-4 py-2 rounded-full flex items-center gap-1.5 text-xs font-medium transition-all duration-200 ${
                                            activeSection === item.href 
                                                ? 'text-background bg-primary' 
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                            <ThemeToggle />
                        </div>

                        {/* Mobile ThemeToggle */}
                        <div className='md:hidden'>
                            <ThemeToggle />
                        </div>
                    </div>
                </nav>
            </header>

            {/* Right Side Navigation Bar for Mobile */}
            <div className="md:hidden fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
                <div className="flex flex-col gap-4 bg-background/90 backdrop-blur-md p-3 rounded-full border border-border shadow-lg">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="relative group"
                        >
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                                activeSection === item.href
                                    ? 'bg-primary text-background'
                                    : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                            }`}>
                                <span className="w-5 h-5">{cloneElement(item.icon, { size: 20 })}</span>
                            </div>
                            
                            {/* Tooltip for nav item names */}
                            <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-background border border-border rounded-md px-2 py-1 text-xs font-medium shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {item.name}
                            </div>
                            
                            {activeSection === item.href && (
                                <motion.div
                                    layoutId="activeRightNav"
                                    className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
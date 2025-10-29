'use client'
import React, { useEffect, useState } from 'react';
import { Home, User, Briefcase, Image as ImageIcon, Code, BookOpen, Mail } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

const navItems = [
    { name: 'HOME', icon: <Home size={16} />, href: '/' },
    { name: 'ABOUT', icon: <User size={16} />, href: '#about' },
    { name: 'EXPERIENCE', icon: <Briefcase size={16} />, href: '#experience' },
    { name: 'PORTFOLIO', icon: <ImageIcon size={16} />, href: '#projects' },
    { name: 'EDUCATION', icon: <BookOpen size={16} />, href: '#education' },

    { name: 'SERVICE', icon: <Code size={16} />, href: '#services' },
    { name: 'CONTACT', icon: <Mail size={16} />, href: '#contact', hiddenInMobile: true },
];

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('/');
    const [isScrolled, setIsScrolled] = useState(false);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (href === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('/');
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(href);
            }
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
            let currentSection = '/'; // Default to HOME when at the top

            if (window.scrollY > 50) {
                for (const section of sections) {
                    if (section !== '/') {
                        const element = document.querySelector(section);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top <= 100 && rect.bottom >= 100) {
                                currentSection = section;
                                break;
                            }
                        }
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


            {/* Navigation */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    } ${isScrolled
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
                                <span className="text-muted-foreground text-xs">Backend Developer</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center">
                            <div className="flex items-center rounded-full bg-muted/50 p-1 backdrop-blur-sm mr-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className={`relative px-4 py-2 rounded-full flex items-center gap-1.5 text-xs font-medium transition-all duration-200 ${activeSection === item.href
                                            ? 'text-primary-foreground bg-primary'
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
                        <div className='lg:hidden flex items-center gap-4'>
                            <Link
                                href={'#contact'}
                                onClick={(e) => scrollToSection(e, '#contact')}
                            >
                                <Button size="sm" className="h-8.5 text-xs">

                                    Contact Me
                                    <Mail />
                                </Button>
                            </Link>
                            <ThemeToggle />
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Bottom Navigation Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border shadow-lg">
                <div className="flex items-center justify-around h-14">
                    {navItems.filter(item => !item.hiddenInMobile).map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="relative flex flex-col items-center justify-center h-full"
                        >
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${activeSection === item.href
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                                }`}>
                                <span className="w-5 h-5">{React.cloneElement(item.icon, { size: 20 })}</span>
                            </div>
                            {activeSection === item.href && (
                                <div
                                    className="absolute top-0 w-4/5 h-1 bg-primary rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
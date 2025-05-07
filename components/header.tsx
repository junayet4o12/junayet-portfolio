'use client'
import { Button } from '@/components/ui/button';

import { Menu } from 'lucide-react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Home, User, Briefcase, Image as ImageIcon, FileText } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ThemeToggle } from './theme-toggle';
const navItems = [
    { name: 'HOME', icon: <Home size={16} />, href: '#hero' },
    { name: 'ABOUT', icon: <User size={16} />, href: '#success' },
    { name: 'EXPERIENCE', icon: <Briefcase size={16} />, href: '#experience' },
    { name: 'PORTFOLIO', icon: <ImageIcon size={16} />, href: '#projects' },
    { name: 'CONTACT', icon: <FileText size={16} />, href: '#contact' },
];
export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
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
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);
    return (
        <>
            {/* Top Bar */}
            <div className="bg-muted border-b border-border z-20 relative h-12">
                <div className="container mx-auto px-4 h-12 flex items-center justify-between">
                    <div className="text-muted-foreground text-sm">
                        ELEMENTOR IS GREAT WORDPRESS...
                    </div>
                    <div className="flex items-center gap-4">
                        {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                            <Link
                                key={index}
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                            >
                                <Icon size={16} />
                            </Link>
                        ))}
                        <Button variant="default" className="bg-primary hover:bg-primary/80 ml-4">
                            Contact Me
                        </Button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <header
                className={`sticky h-[72px] top-0 z-50 bg-background/60 backdrop-blur-sm border-b border-border transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-background font-bold">J</span>
                            </div>
                            <span className="text-foreground text-xl font-bold">JUNAYET</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="transform group-hover:scale-110 transition-transform duration-200">
                                        {item.icon}
                                    </span>
                                    <span className="relative overflow-hidden">
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                        <div className='flex gap-2'>
                            <ThemeToggle />
                            {/* Mobile Menu */}
                            <div className='md:hidden'>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" className="text-foreground">
                                            <Menu />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="backdrop-blur-sm">
                                        <SheetHeader>
                                            <SheetTitle className="text-foreground">Menu</SheetTitle>
                                        </SheetHeader>
                                        <div className="flex flex-col gap-8 mt-8 px-4 ">
                                            {navItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={(e) => scrollToSection(e, item.href)}
                                                    className="text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                                                >
                                                    <span className="transform group-hover:scale-110 transition-transform duration-200">
                                                        {item.icon}
                                                    </span>
                                                    <span className="relative overflow-hidden">
                                                        {item.name}
                                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    )
}
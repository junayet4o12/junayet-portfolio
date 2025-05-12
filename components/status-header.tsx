import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';

export default function StatusHeader() {
  return (
    <div className="bg-background border-b border-border z-20 relative h-12">
    <div className="container mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-muted-foreground text-xs sm:text-sm font-medium">
                Available for Office Work
            </span>
        </div>
        <div className="flex items-center gap-4">
            <Link
                href="https://wa.me/8801632884012"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-primary transition-all duration-200 opacity-70 hover:opacity-100">
                <FaWhatsapp size={18} />
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
                    Contact Me
                    <Mail />
                </Button>
            </Link>
        </div>
    </div>
</div>
  );
}
import Link from "next/link"
import { Facebook, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="font-bold">J</span>
              </div>
              <span className="text-white text-xl font-bold">JUNAYET</span>
            </Link>
            <p className="text-muted-foreground">
              Welcome to my portfolio! I specialize in creating dynamic and responsive web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="#experience" className="text-muted-foreground hover:text-primary">Experience</Link></li>
              <li><Link href="#projects" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Feni, Bangladesh</li>
              <li>+8801632884012</li>
              <li className="break-words">muhammadjunayetmaruf@gmail.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/junayet4012/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>

              <Link
                href="https://www.linkedin.com/in/junayet-alam/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://github.com/junayet4o12"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-primary">
                <Github size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">© 2025 Junayet. All rights reserved.</p>

        </div>
      </div>
    </footer>
  )
}


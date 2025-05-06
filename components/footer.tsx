import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="font-bold">G</span>
              </div>
              <span className="text-white text-xl font-bold">GLINT</span>
            </Link>
            <p className="text-muted-foreground">
              We create digital experiences for brands and companies by using technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text- hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Main Street</li>
              <li>New York, NY 10001</li>
              <li>+1 234 567 890</li>
              <li>info@glint.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">© 2024 Glint. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  )
}

